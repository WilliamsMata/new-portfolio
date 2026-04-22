import {
  chat,
  convertMessagesToModelMessages,
  maxIterations,
  toServerSentEventsResponse,
  type ModelMessage,
  type UIMessage,
} from "@tanstack/ai";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";
import { getPortfolioChatAdapter } from "@/lib/ai/config";
import { buildPortfolioSystemPrompt } from "@/lib/ai/prompt";
import { createPortfolioTools } from "@/lib/ai/server-tools";
import { chatRateLimiter } from "@/lib/redis";
import { chatRequestSchema } from "@/schema/chat-request.schema";

export const runtime = "nodejs";

function extractRequestedLocale(body: unknown) {
  if (typeof body !== "object" || body === null || !("data" in body)) {
    return undefined;
  }

  const data = body.data;

  if (typeof data !== "object" || data === null || !("locale" in data)) {
    return undefined;
  }

  return data.locale;
}

function resolveLocale(request: Request, requestedLocale?: unknown): Locale {
  if (requestedLocale === "es" || requestedLocale === "en") {
    return requestedLocale;
  }

  const rawAcceptLanguage = request.headers.get("accept-language") ?? "en";
  return rawAcceptLanguage.toLowerCase().startsWith("es") ? "es" : "en";
}

function getClientAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("cf-connecting-ip") ||
    null
  );
}

function createErrorResponse(
  message: string,
  status: number,
  statusText: string,
) {
  return new Response(message, {
    status,
    statusText,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const locale = resolveLocale(request, extractRequestedLocale(body));
  const dictionary = await getDictionary(locale);

  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    return createErrorResponse(
      dictionary.chat.errors.invalidRequest,
      400,
      "Bad Request",
    );
  }

  const adapter = getPortfolioChatAdapter();

  if (!adapter) {
    return createErrorResponse(
      dictionary.chat.errors.missingApiKey,
      500,
      "Chat Not Configured",
    );
  }

  const clientAddress = getClientAddress(request);
  const conversationId = parsed.data.data?.conversationId;
  const { success } = await chatRateLimiter.limit(
    clientAddress ?? conversationId ?? `portfolio-chat:${locale}`,
  );

  if (!success) {
    return createErrorResponse(
      dictionary.chat.errors.rateLimit,
      429,
      "Chat Rate Limit",
    );
  }

  const abortController = new AbortController();
  request.signal.addEventListener("abort", () => abortController.abort(), {
    once: true,
  });

  const recentMessages = parsed.data.messages.slice(-12) as Array<
    UIMessage | ModelMessage
  >;
  const modelMessages = convertMessagesToModelMessages(recentMessages) as never;

  const stream = chat({
    adapter,
    messages: modelMessages,
    systemPrompts: [buildPortfolioSystemPrompt(locale)],
    tools: createPortfolioTools(locale),
    agentLoopStrategy: maxIterations(4),
    abortController,
    modelOptions: {
      reasoning: {
        effort: "high",
        summary: "auto",
      },
    },
  });

  return toServerSentEventsResponse(stream, { abortController });
}
