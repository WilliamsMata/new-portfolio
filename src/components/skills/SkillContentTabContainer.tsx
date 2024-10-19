"use client";

import type { PropsWithChildren } from "react";
import { useTab } from "../ui/tabs";
import { cn } from "@/lib/utils";

interface SkillContentTabContainerProps extends PropsWithChildren {
  title: string;
}

export function SkillContentTabContainer({
  title,
  children,
}: SkillContentTabContainerProps) {
  const { activeTab } = useTab();

  const isActive = title === activeTab.value;

  return (
    <div className={cn("relative h-[20rem] w-full", isActive && "h-auto")}>
      {children}
    </div>
  );
}
