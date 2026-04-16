"use client";
import dynamic from "next/dynamic";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";

const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((m) => m.Toaster),
  { ssr: false },
);
const ConsoleLog = dynamic(
  () => import("@/components/common/ConsoleLog").then((m) => m.ConsoleLog),
  { ssr: false },
);
const FloatingDockComponent = dynamic(
  () => import("@/components/common/FloatingDockComponent"),
  { ssr: false },
);
const PortfolioChat = dynamic(() => import("@/components/chat/PortfolioChat"), {
  ssr: false,
});

interface LayoutClientExtrasProps {
  chatDictionary: Dictionary["chat"];
  locale: Locale;
}

export default function LayoutClientExtras({
  chatDictionary,
  locale,
}: LayoutClientExtrasProps) {
  return (
    <>
      <FloatingDockComponent />
      <PortfolioChat key={locale} dictionary={chatDictionary} locale={locale} />
      <Toaster />
      <ConsoleLog />
    </>
  );
}
