"use client";

import { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Dictionary } from "@/i18n/getDictionary";
import { LanguageIcon } from "../icons/LanguageIcon";
import { useLocale } from "@/hooks/useLocale";

interface ModeToggleProps {
  dictionary: Dictionary["header"]["selectLocale"];
}

function SelectLocaleComponent({ dictionary }: ModeToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { setLocale } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LanguageIcon className="h-6 w-6" />
          <span className="sr-only">{dictionary.title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[999]" align="end">
        <DropdownMenuItem onClick={() => setLocale("es")}>
          {dictionary.spanish}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("en")}>
          {dictionary.english}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const SelectLocale = memo(SelectLocaleComponent);
