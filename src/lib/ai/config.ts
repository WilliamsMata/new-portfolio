import "server-only";
import type { AdapterReasoning, ReasoningOptionFor } from "@tanstack/ai";
import { createOpenRouterText } from "@tanstack/ai-openrouter";
import { env } from "@/env";

type OpenRouterChatModel = Parameters<typeof createOpenRouterText>[0];

const DEFAULT_PORTFOLIO_CHAT_MODEL = "deepseek/deepseek-v4.1-flash";
const DEFAULT_REASONING_EFFORT = "low";

// El catálogo de modelos del adaptador es un snapshot; el modelo real viene de
// env y puede ser más nuevo, así que el cast es intencional.
export const portfolioChatModel = (env.OPENROUTER_CHAT_MODEL ??
  DEFAULT_PORTFOLIO_CHAT_MODEL) as OpenRouterChatModel;

export function getPortfolioChatAdapter() {
  if (!env.OPENROUTER_API_KEY) {
    return null;
  }

  return createOpenRouterText(portfolioChatModel, env.OPENROUTER_API_KEY);
}

type PortfolioChatAdapter = NonNullable<
  ReturnType<typeof getPortfolioChatAdapter>
>;

// `chat()` recorta el nivel al más cercano que soporte el modelo en runtime.
export const portfolioChatReasoning = (env.OPENROUTER_REASONING_EFFORT ??
  DEFAULT_REASONING_EFFORT) as ReasoningOptionFor<
  AdapterReasoning<PortfolioChatAdapter>
>;
