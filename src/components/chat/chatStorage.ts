import type { UIMessage } from "@tanstack/ai-react";
import type { Locale } from "@/i18n/i18n-config";

export const CHAT_STORAGE_PREFIX = "portfolio-chat:v1";

interface StoredChatState {
  hadError: boolean;
  messages: Array<UIMessage>;
  conversationId: string;
}

export function getMessagesStorageKey(locale: Locale) {
  return `${CHAT_STORAGE_PREFIX}:${locale}:messages`;
}

export function getConversationStorageKey(locale: Locale) {
  return `${CHAT_STORAGE_PREFIX}:${locale}:conversation-id`;
}

function hydrateMessages(value: unknown) {
  if (!Array.isArray(value)) {
    return null;
  }

  return value.map((message) => {
    if (
      typeof message === "object" &&
      message !== null &&
      "createdAt" in message &&
      typeof message.createdAt === "string"
    ) {
      return {
        ...message,
        createdAt: new Date(message.createdAt),
      } as UIMessage;
    }

    return message as UIMessage;
  });
}

export function loadStoredState(
  locale: Locale,
  welcomeMessage: UIMessage,
): StoredChatState {
  let hadError = false;
  let messages = [welcomeMessage];

  try {
    const rawMessages = window.localStorage.getItem(
      getMessagesStorageKey(locale),
    );

    if (rawMessages) {
      const parsedMessages = hydrateMessages(JSON.parse(rawMessages));

      if (parsedMessages && parsedMessages.length > 0) {
        messages = parsedMessages;
      }
    }
  } catch {
    hadError = true;
  }

  const existingConversationId = window.localStorage.getItem(
    getConversationStorageKey(locale),
  );

  return {
    hadError,
    messages,
    conversationId: existingConversationId ?? crypto.randomUUID(),
  };
}

export function persistMessages(locale: Locale, messages: Array<UIMessage>) {
  try {
    window.localStorage.setItem(
      getMessagesStorageKey(locale),
      JSON.stringify(messages),
    );
  } catch {
    // Ignore storage failures to avoid breaking the chat UI.
  }
}
