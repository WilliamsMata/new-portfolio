"use client";

import { useEffect, useMemo, useRef, useState, type ComponentPropsWithoutRef } from "react";
import {
  fetchServerSentEvents,
  type UIMessage,
  useChat,
} from "@tanstack/ai-react";
import ReactMarkdown, { type Components } from "react-markdown";
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
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

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

const markdownComponents: Components = {
  a: ({ className, href, children, node, ...props }) => {
    void node;

    const isExternal = typeof href === "string" && /^https?:\/\//i.test(href);

    return (
      <a
        {...props}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        className={cn(
          "font-medium text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary",
          className,
        )}
      >
        {children}
      </a>
    );
  },
  code: ({ inline, className, children, node, ...props }: MarkdownCodeProps) => {
    void node;

    if (!inline) {
      return (
        <code
          {...props}
          className={cn("font-mono text-[0.9em] leading-6", className)}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        {...props}
        className={cn(
          "rounded-md border border-zinc-200 bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-neutral-50",
          className,
        )}
      >
        {children}
      </code>
    );
  },
  pre: ({ className, children, node, ...props }) => {
    void node;

    return (
      <pre
        {...props}
        className={cn(
          "my-3 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-100 p-4 text-[0.85rem] leading-6 text-zinc-900 shadow-sm dark:border-white/10 dark:bg-black/40 dark:text-neutral-50",
          className,
        )}
      >
        {children}
      </pre>
    );
  },
  table: ({ className, children, node, ...props }) => {
    void node;

    return (
      <div className="my-3 w-full overflow-x-auto">
        <table
          {...props}
          className={cn("w-full border-collapse text-left text-sm", className)}
        >
          {children}
        </table>
      </div>
    );
  },
};

type MarkdownCodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  node?: unknown;
};

const assistantMarkdownClassName = cn(
  "prose prose-sm max-w-none text-zinc-900 dark:text-neutral-50",
  "prose-zinc dark:prose-invert",
  "prose-p:my-1 prose-headings:my-2 prose-headings:font-semibold prose-headings:tracking-tight",
  "prose-h1:text-lg prose-h2:text-base prose-h3:text-sm",
  "prose-ul:my-2 prose-ol:my-2 prose-li:my-0 prose-li:leading-7",
  "prose-blockquote:my-2 prose-hr:my-4",
  "prose-img:my-3 prose-img:rounded-2xl",
);

function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className={assistantMarkdownClassName}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
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
        <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white text-zinc-950 shadow-[0_30px_80px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-50">
          <div className="border-b border-zinc-200/80 px-4 py-4 dark:border-white/10 md:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4 pr-8">
              <div className="max-w-2xl">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-zinc-500 dark:text-neutral-400">
                  {dictionary.panel.eyebrow}
                </p>
                <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                  {dictionary.panel.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-neutral-400">
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
                        <span className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-neutral-400">
                          {isUserMessage
                            ? dictionary.roles.user
                            : dictionary.roles.assistant}
                        </span>

                      <div
                        className={cn(
                          "max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-7 shadow-sm md:max-w-[80%]",
                          isUserMessage
                            ? "bg-primary text-primary-foreground"
                            : "border border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-50",
                        )}
                      >
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <div key={`${message.id}-text-${index}`}>
                                {isUserMessage ? (
                                  <p className="whitespace-pre-wrap break-words text-primary-foreground">
                                    {part.content}
                                  </p>
                                ) : (
                                  <MarkdownMessage content={part.content} />
                                )}
                              </div>
                            );
                          }

                          if (part.type === "thinking") {
                            return (
                              <p
                                key={`${message.id}-thinking-${index}`}
                                className="mt-2 text-xs italic text-zinc-500 dark:text-neutral-400"
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
                                  className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-neutral-950"
                                >
                                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-neutral-400">
                                    {dictionary.links.official}
                                  </p>

                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {part.output.links.map((link) => (
                                      <a
                                        key={`${message.id}-${link.kind}-${link.url}`}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
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
                                className="mt-2 text-xs text-zinc-500 dark:text-neutral-400"
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
                  <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/80 px-4 py-4 text-sm text-zinc-600 dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-400">
                    {dictionary.panel.emptyState}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-zinc-200/80 bg-zinc-50/90 px-4 py-4 dark:border-white/10 dark:bg-neutral-950 md:px-6">
              <div className="mx-auto flex max-w-3xl flex-col gap-4">
                {hasOnlyWelcomeMessage ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-neutral-400">
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
                          className="rounded-full border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
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
                    className="border border-zinc-200 bg-white text-zinc-950 shadow-[0_12px_32px_rgba(15,23,42,0.08)] placeholder:text-zinc-400 focus-visible:ring-zinc-300 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-50 dark:placeholder:text-neutral-500 dark:focus-visible:ring-neutral-600"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <p className="max-w-xl text-xs leading-5 text-zinc-500 dark:text-neutral-400">
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
