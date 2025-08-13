"use client";

import { useEffect, useRef, useState } from "react";
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
  const [animateHeader, setAnimateHeader] = useState(true);

  useEffect(() => {
    const mqlPointer = window.matchMedia("(pointer: fine)");
    setAnimateHeader(mqlPointer.matches);
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          if (animateHeader)
            controls.start({ y: isScrollingDown ? "-120%" : 0 });
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    if (animateHeader)
      window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll as any);
    };
  }, [controls, animateHeader]);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-[998] border-b bg-background shadow-md"
      initial={{ y: 0 }}
      transition={{ duration: 0.2 }}
      animate={animateHeader ? controls : { y: 0 }}
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
