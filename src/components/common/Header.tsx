"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { WMIcon } from "../icons";
import { ModeToggle } from "./ModeToggle";
import { Dictionary } from "@/i18n/getDictionary";
import { SelectLocale } from "./SelectLocale";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

interface HeaderProps {
  dictionary: Dictionary["header"];
}

export default function Header({ dictionary }: HeaderProps) {
  const lastScrollY = useRef(0);
  const controls = useAnimation();
  const pathname = usePathname();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          controls.start({ y: isScrollingDown ? "-120%" : 0 });
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll as any);
    };
  }, [controls]);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-[998] border-b bg-background shadow-md"
      initial={{ y: 0 }}
      transition={{ duration: 0.2 }}
      animate={controls}
    >
      <div className="container mx-auto flex items-center justify-between px-8 py-2">
        <Link
          href={`/${(pathname?.split("/")[1] || "").trim() || "es"}`}
          className="flex items-center"
          aria-label={dictionary.home}
        >
          <WMIcon className="h-auto w-16" />
        </Link>

        <div className="flex items-center gap-4">
          <SelectLocale dictionary={dictionary.selectLocale} />

          <Separator orientation="vertical" className="h-8" />

          <ModeToggle dictionary={dictionary.toggleMode} />
        </div>
      </div>
    </motion.header>
  );
}
