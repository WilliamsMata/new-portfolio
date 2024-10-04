"use client";
import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  stagerDuration?: number;
  onFinish?: () => void;
}

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  stagerDuration = 0.2,
  onFinish,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const animationTime = wordsArray.length * stagerDuration * 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(
            "span",
            {
              opacity: 1,
              filter: filter ? "blur(0px)" : "none",
            },
            {
              duration,
              delay: stagger(stagerDuration),
            },
          );

          observer.disconnect();

          if (onFinish) {
            setTimeout(onFinish, animationTime);
          }
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current, words, onFinish]);

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="opacity-0"
          style={{
            filter: filter ? "blur(10px)" : "none",
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("text-2xl font-bold", className)} ref={containerRef}>
      <div className="mt-4">
        <div className="leading-snug tracking-wide">{renderWords()}</div>
      </div>
    </div>
  );
};
