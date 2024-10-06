"use client";

import Image from "next/image";
import { useTab } from "../ui/tabs";

interface SkillDataCardProps {
  parentTitle: string;
  title: string;
  iconPath: string;
}

export function SkillImage({
  parentTitle,
  title,
  iconPath,
}: SkillDataCardProps) {
  const { activeTab } = useTab();

  const isActive = activeTab.value === parentTitle;

  if (!isActive) return null;

  return (
    <Image
      src={iconPath}
      alt={title}
      fill
      sizes="(max-width: 768px) 60vw, (max-width: 1200px) 33vw, 20vw"
    />
  );
}
