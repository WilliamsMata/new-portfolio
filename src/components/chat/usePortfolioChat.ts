"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchServerSentEvents,
  type UIMessage,
  useChat,
} from "@tanstack/ai-react";
import { Toaster } from "@/adapter/sonner.adapter";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";
import {
  CHAT_STORAGE_PREFIX,
  getConversationStorageKey,
  loadStoredState,
  persistMessages,
} from "./chatStorage";

export interface PortfolioChatProps {
  dictionary: Dictionary["chat"];
  locale: Locale;
}

interface UsePortfolioChatResult {
  messages: Array<UIMessage>;
  isLoading: boolean;
  errorMessage: string | null;
  hasOnlyWelcomeMessage: boolean;
  submitMessage: (message: string) => Promise<void>;
  resetChat: () => void;
  stop: () => void;
}

function createWelcomeMessage(content: string): UIMessage {
  return {
    id: "portfolio-chat-welcome",
    role: "assistant",
    parts: [{ type: "text", content }],
  };
}

const chatFetchClient: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  }

  let responseMessage = "";

  try {
    responseMessage = (await response.clone().text()).trim();
  } catch {
    responseMessage = "";
  }

  throw new Error(
    responseMessage ||
      `HTTP error! status: ${response.status} ${response.statusText}`,
  );
};

export function usePortfolioChat({
  dictionary,
  locale,
}: PortfolioChatProps): UsePortfolioChatResult {
  const welcomeMessage = useMemo(
    () => createWelcomeMessage(dictionary.welcome),
    [dictionary.welcome],
  );
  const [initialState] = useState(() => loadStoredState(locale, welcomeMessage));
  const [requestError, setRequestError] = useState<string | null>(null);
  const hasShownLoadErrorRef = useRef(false);

  const connection = useMemo(
    () =>
      fetchServerSentEvents("/api/chat", {
        fetchClient: chatFetchClient,
      }),
    [],
  );

  const { clear, error, isLoading, messages, sendMessage, setMessages, stop } =
    useChat({
      id: `${CHAT_STORAGE_PREFIX}:${locale}`,
      connection,
      initialMessages: initialState.messages,
      body: {
        locale,
        conversationId: initialState.conversationId,
      },
      onResponse: () => {
        setRequestError(null);
      },
      onError: (chatError) => {
        const fallbackMessage =
          chatError.message.trim() || dictionary.errors.generic;

        setRequestError(fallbackMessage);
        Toaster.error(fallbackMessage);
      },
    });

  useEffect(() => {
    window.localStorage.setItem(
      getConversationStorageKey(locale),
      initialState.conversationId,
    );
  }, [initialState.conversationId, locale]);

  useEffect(() => {
    persistMessages(locale, messages);
  }, [locale, messages]);

  useEffect(() => {
    if (!initialState.hadError || hasShownLoadErrorRef.current) {
      return;
    }

    hasShownLoadErrorRef.current = true;
    Toaster.error(dictionary.errors.loadHistory);
  }, [dictionary.errors.loadHistory, initialState.hadError]);

  const submitMessage = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setRequestError(null);
    await sendMessage(trimmedMessage);
  };

  const resetChat = () => {
    clear();
    setMessages([welcomeMessage]);
    persistMessages(locale, [welcomeMessage]);
    setRequestError(null);
  };

  const errorMessage =
    requestError ??
    (error ? error.message.trim() || dictionary.errors.generic : null);

  return {
    messages,
    isLoading,
    errorMessage,
    hasOnlyWelcomeMessage: messages.length <= 1,
    submitMessage,
    resetChat,
    stop,
  };
}
