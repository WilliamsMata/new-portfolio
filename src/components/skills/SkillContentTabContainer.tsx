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
    <div
      className={cn(
        "relative h-[46rem] w-full md:h-[20rem]",
        isActive && "h-auto md:h-auto",
      )}
    >
      {children}
    </div>
  );
}
