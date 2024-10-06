"use client";
import { useEffect, useRef, useState } from "react";
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
  const paragraphsArray = words.split("\n");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const totalWordsCount = paragraphsArray.reduce(
    (count, paragraph) => count + paragraph.split(" ").length,
    0,
  );
  const animationTime =
    totalWordsCount * stagerDuration * 1000 + duration * 1000;

  const completeAnimation = () => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: 0,
      },
    );

    onFinish?.();
    setIsAnimating(false);
  };

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

          setTimeout(() => completeAnimation(), animationTime);
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

  const renderParagraphs = () => (
    <motion.div ref={scope}>
      {paragraphsArray.map((paragraph, pIdx) => (
        <p key={`paragraph-${pIdx}`} className="mb-4">
          {paragraph.split(" ").map((word, wIdx) => (
            <motion.span
              key={`${word}-${pIdx}-${wIdx}`}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </p>
      ))}
    </motion.div>
  );

  return (
    <div
      className={cn(
        "text-2xl font-bold",
        isAnimating ? "cursor-pointer" : "",
        className,
      )}
      ref={containerRef}
      onClick={completeAnimation}
    >
      <div className="mt-4">
        <div className="leading-snug tracking-wide">{renderParagraphs()}</div>
      </div>
    </div>
  );
};
