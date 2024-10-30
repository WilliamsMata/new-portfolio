"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { GradientButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/i18n-config";

interface ExpandableContentProps {
  children: React.ReactNode;
  className?: string;
}

const dictionary: Record<Locale, string> = {
  es: "Ver más",
  en: "See more",
};

export default function ExpandableContent({
  children,
  className,
}: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [initialHeight, setInitialHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();

  const buttonText = dictionary[locale];

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        const clientHeight = contentRef.current.clientHeight;
        setIsOverflowing(scrollHeight > clientHeight);
        setContentHeight(scrollHeight);
        setInitialHeight(clientHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  return (
    <div className="relative">
      <motion.div
        ref={contentRef}
        initial={{ height: initialHeight || "auto" }}
        animate={{
          height:
            isExpanded && contentHeight
              ? contentHeight
              : (initialHeight ?? "auto"),
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "overflow-hidden pb-4",
          !isExpanded && className,
          isExpanded && "h-auto",
        )}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isOverflowing && !isExpanded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-background to-transparent pb-4 pt-16"
          >
            <GradientButton
              onClick={() => setIsExpanded(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              {buttonText} <ArrowDownIcon className="h-4 w-4" />
            </GradientButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
