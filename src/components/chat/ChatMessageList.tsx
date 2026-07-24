"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "@tanstack/ai-react";
import { BoxArrowUp } from "@/components/icons";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/utils";
import { MarkdownMessage } from "./MarkdownMessage";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link2Icon } from "@radix-ui/react-icons";

interface OfficialLinksOutput {
  links: Array<{
    label: string;
    url?: string;
    href?: string;
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

function hasVisibleContent(message: UIMessage, isLoading: boolean): boolean {
  if (!message.parts || message.parts.length === 0) {
    return false;
  }

  return message.parts.some((part) => {
    if (part.type === "text") {
      return Boolean(part.content && part.content.trim().length > 0);
    }

    if (part.type === "thinking") {
      return isLoading;
    }

    if (part.type === "tool-call") {
      return hasOfficialLinksOutput(part.output);
    }

    if (part.type === "tool-result" && part.state === "error") {
      return Boolean(part.error || part.content);
    }

    return false;
  });
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
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {messages.map((message) => {
          if (!hasVisibleContent(message, isLoading)) {
            return null;
          }

          const isUserMessage = message.role === "user";

          return (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-1.5",
                isUserMessage ? "items-end" : "items-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm md:max-w-[80%]",
                  isUserMessage
                    ? "rounded-tr-xs bg-gradient-to-r from-blue to-purple font-medium text-white shadow-md dark:from-blue dark:to-cyan dark:text-zinc-950"
                    : "rounded-tl-xs border border-border/70 bg-card/80 text-foreground backdrop-blur-md dark:border-white/10 dark:bg-card/60",
                )}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return isUserMessage ? (
                      <p
                        key={`${message.id}-text-${index}`}
                        className="whitespace-pre-wrap break-words text-white dark:text-zinc-950"
                      >
                        {part.content}
                      </p>
                    ) : (
                      <MarkdownMessage
                        key={`${message.id}-text-${index}`}
                        content={part.content}
                      />
                    );
                  }

                  if (part.type === "thinking") {
                    return isLoading ? (
                      <div
                        key={`${message.id}-thinking-${index}`}
                        className="flex items-center gap-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s] dark:bg-cyan-400" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s] dark:bg-cyan-400" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 dark:bg-cyan-400" />
                        </span>
                        <span className="animate-pulse text-muted-foreground/90">
                          {dictionary.panel.thinking}
                        </span>
                      </div>
                    ) : null;
                  }

                  if (part.type === "tool-call") {
                    if (hasOfficialLinksOutput(part.output)) {
                      return (
                        <div
                          key={`${message.id}-links-${index}`}
                          className="mt-3 rounded-2xl border border-border/60 bg-background/60 p-3.5 backdrop-blur-md"
                        >
                          <div className="flex items-center gap-1.5">
                            <Badge
                              variant="outline"
                              className="gap-1.5 border-border/60 bg-accent/30 text-[0.68rem] font-semibold text-muted-foreground uppercase tracking-wider"
                            >
                              <Link2Icon className="h-3.5 w-3.5 text-blue dark:text-cyan" />
                              <span>{dictionary.links.official}</span>
                            </Badge>
                          </div>

                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {part.output.links.map((link) => {
                              const linkUrl = link.url ?? link.href;

                              if (!linkUrl) {
                                return null;
                              }

                              return (
                                <Button
                                  key={`${message.id}-${link.kind}-${linkUrl}`}
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  className="h-auto rounded-full px-3 py-1.5 text-xs font-semibold hover:border-blue/50 hover:text-blue dark:hover:border-cyan/50 dark:hover:text-cyan"
                                >
                                  <a
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    <span>{link.label}</span>
                                    <BoxArrowUp className="h-3 w-3" />
                                  </a>
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    return null;
                  }

                  if (part.type === "tool-result" && part.state === "error") {
                    return (
                      <p
                        key={`${message.id}-tool-error-${index}`}
                        className="mt-2 text-xs font-medium text-destructive"
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
          <div className="rounded-2xl border border-dashed border-border/60 bg-accent/30 p-4 text-center text-xs leading-relaxed text-muted-foreground backdrop-blur-sm">
            {dictionary.panel.emptyState}
          </div>
        ) : null}
      </div>
    </div>
  );
}

