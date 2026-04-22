"use client";

import { useState } from "react";
import type { UIMessage } from "@tanstack/ai-react";
import {
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/getDictionary";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageList } from "./ChatMessageList";

interface ChatDialogProps {
  dictionary: Dictionary["chat"];
  messages: Array<UIMessage>;
  isLoading: boolean;
  errorMessage: string | null;
  hasOnlyWelcomeMessage: boolean;
  onSubmit: (message: string) => Promise<void>;
  onReset: () => void;
  onStop: () => void;
}

export function ChatDialog({
  dictionary,
  messages,
  isLoading,
  errorMessage,
  hasOnlyWelcomeMessage,
  onSubmit,
  onReset,
  onStop,
}: ChatDialogProps) {
  const [input, setInput] = useState("");

  const handleSubmit = async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setInput("");
    await onSubmit(trimmedMessage);
  };

  const handleReset = () => {
    onReset();
    setInput("");
  };

  return (
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
                <Button variant="outline" size="sm" onClick={onStop}>
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
          <ChatMessageList
            dictionary={dictionary}
            messages={messages}
            isLoading={isLoading}
            hasOnlyWelcomeMessage={hasOnlyWelcomeMessage}
          />

          <ChatComposer
            dictionary={dictionary}
            value={input}
            onValueChange={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            hasOnlyWelcomeMessage={hasOnlyWelcomeMessage}
            errorMessage={errorMessage}
          />
        </ModalContent>
      </div>
    </ModalBody>
  );
}
