"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchServerSentEvents,
  type UIMessage,
  useChat,
} from "@tanstack/ai-react";
import { Toaster } from "@/adapter/sonner.adapter";
import { BoxArrowUp } from "@/components/icons";
import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/animated-modal";
import { Button, GradientButton } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";
import { cn } from "@/lib/utils";

interface PortfolioChatProps {
  dictionary: Dictionary["chat"];
  locale: Locale;
}

interface OfficialLinksOutput {
  links: Array<{
    label: string;
    url: string;
    kind: string;
    recommendedFor: string;
  }>;
  guidance: string;
}

const STORAGE_PREFIX = "portfolio-chat:v1";

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

function createWelcomeMessage(content: string): UIMessage {
  return {
    id: "portfolio-chat-welcome",
    role: "assistant",
    parts: [{ type: "text", content }],
  };
}

function getMessagesStorageKey(locale: Locale) {
  return `${STORAGE_PREFIX}:${locale}:messages`;
}

function getConversationStorageKey(locale: Locale) {
  return `${STORAGE_PREFIX}:${locale}:conversation-id`;
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

function loadStoredState(locale: Locale, welcomeMessage: UIMessage) {
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

function persistMessages(locale: Locale, messages: Array<UIMessage>) {
  try {
    window.localStorage.setItem(
      getMessagesStorageKey(locale),
      JSON.stringify(messages),
    );
  } catch {
    // Ignore storage failures to avoid breaking the chat UI.
  }
}

function hasOfficialLinksOutput(
  output: unknown,
): output is OfficialLinksOutput {
  if (typeof output !== "object" || output === null || !("links" in output)) {
    return false;
  }

  return Array.isArray(output.links);
}

function ChatSurface({ dictionary, locale }: PortfolioChatProps) {
  const { setOpen, open } = useModal();
  const welcomeMessage = useMemo(
    () => createWelcomeMessage(dictionary.welcome),
    [dictionary.welcome],
  );
  const initialState = useMemo(
    () => loadStoredState(locale, welcomeMessage),
    [locale, welcomeMessage],
  );
  const [input, setInput] = useState("");
  const [requestError, setRequestError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesViewportRef = useRef<HTMLDivElement>(null);

  const connection = useMemo(
    () =>
      fetchServerSentEvents("/api/chat", {
        fetchClient: chatFetchClient,
      }),
    [],
  );

  const { clear, error, isLoading, messages, sendMessage, setMessages, stop } =
    useChat({
      id: `${STORAGE_PREFIX}:${locale}`,
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
    if (!initialState.hadError) {
      return;
    }

    Toaster.error(dictionary.errors.loadHistory);
  }, [dictionary.errors.loadHistory, initialState.hadError]);

  useEffect(() => {
    const viewport = messagesViewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [open]);

  const hasOnlyWelcomeMessage = messages.length <= 1;

  const submitMessage = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setRequestError(null);
    setInput("");
    await sendMessage(trimmedMessage);
  };

  const handleReset = () => {
    clear();
    setMessages([welcomeMessage]);
    persistMessages(locale, [welcomeMessage]);
    setRequestError(null);
    setInput("");
  };

  return (
    <>
      <GradientButton
        className="portfolio-chat-launcher fixed bottom-4 left-4 z-[998] h-12 rounded-full shadow-[0_18px_40px_rgba(37,99,235,0.18)] transition-opacity duration-200 sm:bottom-6 sm:left-6 sm:h-14 md:bottom-8 md:left-8"
        onClick={() => setOpen(true)}
        aria-label={dictionary.launcher.open}
      >
        <span className="inline-flex items-center gap-2.5 sm:gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[0.65rem] font-semibold text-primary-foreground sm:h-8 sm:w-8">
            {dictionary.launcher.badge}
          </span>
          <span className="text-sm font-semibold">
            {dictionary.launcher.label}
          </span>
        </span>
      </GradientButton>

      <ModalBody className="mx-4 h-[min(760px,calc(100vh-2rem))] min-h-[520px] rounded-[28px] border-none bg-transparent p-0 md:min-h-[640px] md:max-w-[840px]">
        <div className="bg-background/95 flex h-full flex-col overflow-hidden rounded-[28px] border border-border shadow-2xl backdrop-blur-xl">
          <div className="border-b border-border px-4 py-4 md:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4 pr-8">
              <div className="max-w-2xl">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  {dictionary.panel.eyebrow}
                </p>
                <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                  {dictionary.panel.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {dictionary.panel.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Button variant="outline" size="sm" onClick={stop}>
                    {dictionary.input.stop}
                  </Button>
                ) : null}

                <Button variant="ghost" size="sm" onClick={handleReset}>
                  {dictionary.input.clear}
                </Button>
              </div>
            </div>
          </div>

          <ModalContent className="flex min-h-0 flex-1 flex-col gap-0 p-0">
            <div
              ref={messagesViewportRef}
              className="no-visible-scrollbar flex-1 overflow-y-auto px-4 py-5 md:px-6"
            >
              <div className="mx-auto flex max-w-3xl flex-col gap-5">
                {messages.map((message) => {
                  const isUserMessage = message.role === "user";

                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col gap-2",
                        isUserMessage ? "items-end" : "items-start",
                      )}
                    >
                      <span className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        {isUserMessage
                          ? dictionary.roles.user
                          : dictionary.roles.assistant}
                      </span>

                      <div
                        className={cn(
                          "max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-7 shadow-sm md:max-w-[80%]",
                          isUserMessage
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-card text-card-foreground",
                        )}
                      >
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <div key={`${message.id}-text-${index}`}>
                                {part.content
                                  .split("\n")
                                  .map((paragraph, paragraphIndex) => (
                                    <p
                                      key={`${message.id}-paragraph-${paragraphIndex}`}
                                      className={cn(
                                        paragraphIndex > 0 ? "mt-3" : "",
                                        isUserMessage
                                          ? "text-primary-foreground"
                                          : "text-card-foreground",
                                      )}
                                    >
                                      {paragraph}
                                    </p>
                                  ))}
                              </div>
                            );
                          }

                          if (part.type === "thinking") {
                            return (
                              <p
                                key={`${message.id}-thinking-${index}`}
                                className="mt-2 text-xs italic text-muted-foreground"
                              >
                                {dictionary.panel.thinking}
                              </p>
                            );
                          }

                          if (part.type === "tool-call") {
                            if (hasOfficialLinksOutput(part.output)) {
                              return (
                                <div
                                  key={`${message.id}-links-${index}`}
                                  className="bg-background/70 mt-4 rounded-2xl border border-border p-3"
                                >
                                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                                    {dictionary.links.official}
                                  </p>

                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {part.output.links.map((link) => (
                                      <a
                                        key={`${message.id}-${link.kind}-${link.url}`}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                      >
                                        <span>{link.label}</span>
                                        <BoxArrowUp className="h-3 w-3" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              );
                            }

                            return part.state !== "approval-requested" ? (
                              <p
                                key={`${message.id}-tool-call-${index}`}
                                className="mt-2 text-xs text-muted-foreground"
                              >
                                {dictionary.panel.thinking}
                              </p>
                            ) : null;
                          }

                          if (
                            part.type === "tool-result" &&
                            part.state === "error"
                          ) {
                            return (
                              <p
                                key={`${message.id}-tool-error-${index}`}
                                className="mt-2 text-xs text-destructive"
                              >
                                {part.error || part.content}
                              </p>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>
                  );
                })}

                {hasOnlyWelcomeMessage ? (
                  <div className="bg-card/50 rounded-3xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
                    {dictionary.panel.emptyState}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="bg-background/95 border-t border-border px-4 py-4 md:px-6">
              <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {hasOnlyWelcomeMessage ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {dictionary.prompts.title}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {dictionary.prompts.items.map((prompt) => (
                        <Button
                          key={prompt}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            void submitMessage(prompt);
                          }}
                          className="rounded-full"
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {requestError || error ? (
                  <p className="text-sm text-destructive">
                    {requestError ||
                      error?.message ||
                      dictionary.errors.generic}
                  </p>
                ) : null}

                <form
                  className="flex flex-col gap-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void submitMessage(input);
                  }}
                >
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void submitMessage(input);
                      }
                    }}
                    placeholder={dictionary.input.placeholder}
                    disabled={isLoading}
                    maxLength={400}
                    rows={3}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <p className="max-w-xl text-xs leading-5 text-muted-foreground">
                      {dictionary.panel.disclaimer}
                    </p>

                    <Button type="submit" disabled={!input.trim() || isLoading}>
                      {dictionary.input.send}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </ModalContent>
        </div>
      </ModalBody>
    </>
  );
}

export default function PortfolioChat(props: PortfolioChatProps) {
  return (
    <Modal>
      <ChatSurface {...props} />
    </Modal>
  );
}
