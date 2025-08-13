"use client";
import dynamic from "next/dynamic";

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

export default function LayoutClientExtras() {
  return (
    <>
      <FloatingDockComponent />
      <Toaster />
      <ConsoleLog />
    </>
  );
}
