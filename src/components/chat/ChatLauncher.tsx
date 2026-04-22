"use client";

import { useModal } from "@/components/ui/animated-modal";
import { GradientButton } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/getDictionary";

interface ChatLauncherProps {
  dictionary: Dictionary["chat"];
}

export function ChatLauncher({ dictionary }: ChatLauncherProps) {
  const { setOpen } = useModal();

  return (
    <GradientButton
      className="portfolio-chat-launcher fixed bottom-4 left-4 z-[998] h-12 rounded-full shadow-[0_18px_40px_rgba(37,99,235,0.18)] transition-opacity duration-200 sm:bottom-6 sm:left-6 sm:h-14 md:bottom-8 md:left-8"
      onClick={() => setOpen(true)}
      aria-label={dictionary.launcher.open}
    >
      <span className="inline-flex items-center gap-2.5 sm:gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[0.65rem] font-semibold text-primary-foreground sm:h-8 sm:w-8">
          {dictionary.launcher.badge}
        </span>
        <span className="text-sm font-semibold">{dictionary.launcher.label}</span>
      </span>
    </GradientButton>
  );
}
