"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { WMIcon } from "../icons";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const lastScrollY = useRef(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      controls.start({ y: isScrollingDown ? "-120%" : 0 });

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
        <div className="flex items-center">
          <WMIcon className="h-auto w-16" />
        </div>
        <ModeToggle />
      </div>
    </motion.header>
  );
}
