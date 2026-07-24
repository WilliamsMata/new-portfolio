"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { Dictionary } from "@/i18n/getDictionary";
import { LightningBoltIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

const MAX_MESSAGE_LENGTH = 500;

const chatComposerSchema = z.object({
  message: z.string().max(MAX_MESSAGE_LENGTH),
});

type ChatComposerFormValues = z.infer<typeof chatComposerSchema>;

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
  const [rows, setRows] = useState(1);

  const form = useForm<ChatComposerFormValues>({
    resolver: zodResolver(chatComposerSchema),
    defaultValues: {
      message: value,
    },
    values: {
      message: value,
    },
  });

  const getRowCount = useCallback((text: string) => {
    const lineCount = (text.match(/\n/g) || []).length + 1;
    return Math.min(Math.max(lineCount, 1), 4);
  }, []);

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

    if (!trimmedMessage || message.length > MAX_MESSAGE_LENGTH || isLoading) {
      return;
    }

    await onSubmit(trimmedMessage);
  };

  const handleFormSubmit = form.handleSubmit((data) => {
    void submitMessage(data.message);
  });

  return (
    <div className="border-t border-border/50 bg-background/50 backdrop-blur-xl px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {hasOnlyWelcomeMessage ? (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <Badge
                variant="outline"
                className="gap-1.5 border-blue/30 bg-blue/10 px-2.5 py-1 text-[0.68rem] font-semibold text-blue dark:border-cyan/30 dark:bg-cyan/10 dark:text-cyan uppercase tracking-wider"
              >
                <LightningBoltIcon className="h-3.5 w-3.5" />
                <span>{dictionary.prompts.title || "Sugerencias"}</span>
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {dictionary.prompts.items.map((prompt) => (
                <Button
                  key={prompt}
                  type="button"
                  variant="outline"
                  onClick={() => {
                    void submitMessage(prompt);
                  }}
                  className="group flex h-auto w-full items-center justify-between gap-2 text-wrap rounded-xl border-border/60 bg-card/60 px-3.5 py-2.5 text-left text-xs font-medium text-foreground backdrop-blur-sm transition-all hover:border-blue/50 hover:bg-accent/60 hover:shadow-sm dark:hover:border-cyan/50"
                >
                  <span className="line-clamp-2">{prompt}</span>
                  <span className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-blue dark:group-hover:text-cyan">
                    →
                  </span>
                </Button>
              ))}
            </div>
          </div>
        ) : null}

        {errorMessage ? (
          <p className="text-xs font-medium text-destructive">{errorMessage}</p>
        ) : null}

        <Form {...form}>
          <form
            className="flex w-full flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void handleFormSubmit(e);
            }}
          >
            <div className="group relative flex items-end gap-2 rounded-2xl border border-border/80 bg-card/80 p-2 shadow-sm backdrop-blur-md transition-all focus-within:border-blue/60 focus-within:ring-2 focus-within:ring-blue/20 dark:focus-within:border-cyan/60 dark:focus-within:ring-cyan/20">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0">
                    <FormControl>
                      <Textarea
                        {...field}
                        ref={(e) => {
                          field.ref(e);
                          textareaRef.current = e;
                        }}
                        onChange={(event) => {
                          field.onChange(event);
                          onValueChange(event.target.value);
                          setRows(getRowCount(event.target.value));
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            void handleFormSubmit();
                          }
                        }}
                        placeholder={dictionary.input.placeholder}
                        disabled={isLoading}
                        maxLength={MAX_MESSAGE_LENGTH}
                        rows={rows}
                        className="flex-1 resize-none border-none bg-transparent px-2.5 py-1 text-sm text-foreground shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={!value.trim() || isLoading}
                size="icon"
                className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-r from-blue to-purple text-white shadow-sm transition-all hover:opacity-95 active:scale-95 disabled:opacity-40 dark:from-blue dark:to-cyan"
                aria-label={dictionary.input.send}
              >
                <PaperPlaneIcon className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}


