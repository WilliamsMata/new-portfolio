"use client";

import { useState } from "react";
import type { UIMessage } from "@tanstack/ai-react";
import { ModalBody, ModalContent } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/getDictionary";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageList } from "./ChatMessageList";
import { ResetIcon, StopIcon } from "@radix-ui/react-icons";

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
    <ModalBody className="mx-3 h-[min(780px,calc(100vh-2rem))] min-h-[540px] rounded-[28px] border-none bg-transparent p-0 md:min-h-[640px] md:max-w-[860px]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/80 bg-background/85 text-foreground shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-background/80 dark:shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
        {/* Top Decorative Line */}
        <div className="absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue to-transparent opacity-80" />

        {/* Compact Modal Header */}
        <div className="relative flex h-12 shrink-0 items-center justify-between border-b border-border/40 bg-background/50 px-4 backdrop-blur-md md:px-5">
          {/* Title with Status Indicator */}
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <h2 className="truncate text-sm font-semibold text-foreground md:text-base">
              {dictionary.panel.title}
            </h2>
          </div>

          {/* Action buttons (Stop, Reset) aligned next to absolute CloseIcon */}
          <div className="flex items-center gap-1 pr-9">
            {isLoading ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onStop}
                className="h-7 gap-1 rounded-full border-destructive/40 bg-destructive/10 px-2 text-[0.75rem] font-medium text-destructive hover:bg-destructive/20 hover:text-destructive"
              >
                <StopIcon className="h-3 w-3" />
                <span>{dictionary.input.stop}</span>
              </Button>
            ) : null}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="h-7 w-7 rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              title={dictionary.input.clear}
              aria-label={dictionary.input.clear}
            >
              <ResetIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <ModalContent className="flex min-h-0 flex-1 flex-col gap-0 p-0 md:p-0">
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


