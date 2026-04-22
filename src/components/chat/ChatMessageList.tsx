"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "@tanstack/ai-react";
import { BoxArrowUp } from "@/components/icons";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/utils";
import { MarkdownMessage } from "./MarkdownMessage";

interface OfficialLinksOutput {
  links: Array<{
    label: string;
    url: string;
    kind: string;
    recommendedFor: string;
  }>;
  guidance: string;
}

interface ChatMessageListProps {
  dictionary: Dictionary["chat"];
  messages: Array<UIMessage>;
  isLoading: boolean;
  hasOnlyWelcomeMessage: boolean;
}

function hasOfficialLinksOutput(
  output: unknown,
): output is OfficialLinksOutput {
  return (
    typeof output === "object" &&
    output !== null &&
    "links" in output &&
    Array.isArray((output as { links?: unknown }).links)
  );
}

export function ChatMessageList({
  dictionary,
  messages,
  isLoading,
  hasOnlyWelcomeMessage,
}: ChatMessageListProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <div
      ref={viewportRef}
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
                {isUserMessage ? dictionary.roles.user : dictionary.roles.assistant}
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

                  if (part.type === "tool-result" && part.state === "error") {
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
  );
}
