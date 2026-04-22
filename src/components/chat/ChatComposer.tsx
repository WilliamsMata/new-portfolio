"use client";

import { useEffect, useRef } from "react";
import { useModal } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/getDictionary";

interface ChatComposerProps {
  dictionary: Dictionary["chat"];
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: (message: string) => void | Promise<void>;
  isLoading: boolean;
  hasOnlyWelcomeMessage: boolean;
  errorMessage: string | null;
}

export function ChatComposer({
  dictionary,
  value,
  onValueChange,
  onSubmit,
  isLoading,
  hasOnlyWelcomeMessage,
  errorMessage,
}: ChatComposerProps) {
  const { open } = useModal();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const submitMessage = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    await onSubmit(trimmedMessage);
  };

  return (
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

        {errorMessage ? (
          <p className="text-sm text-destructive">{errorMessage}</p>
        ) : null}

        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            void submitMessage(value);
          }}
        >
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void submitMessage(value);
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

            <Button type="submit" disabled={!value.trim() || isLoading}>
              {dictionary.input.send}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
