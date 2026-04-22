import "server-only";
import { createOpenaiChat } from "@tanstack/ai-openai";
import { env } from "@/env";

type OpenAIChatModel = Parameters<typeof createOpenaiChat>[0];

const DEFAULT_PORTFOLIO_CHAT_MODEL: OpenAIChatModel = "gpt-5.4-nano";

export const portfolioChatModel =
  (env.OPENAI_CHAT_MODEL as OpenAIChatModel | undefined) ??
  DEFAULT_PORTFOLIO_CHAT_MODEL;

export function getPortfolioChatAdapter() {
  if (!env.OPENAI_API_KEY) {
    return null;
  }

  return createOpenaiChat(portfolioChatModel, env.OPENAI_API_KEY);
}
