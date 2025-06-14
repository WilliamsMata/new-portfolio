"use client";
import { useEffect, useState } from "react";
import { type AnimationOptions, motion, stagger } from "framer-motion";
import { cn } from "@/lib/utils";
import useSafeAnimate from "@/hooks/useSafeAnimate";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

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
  const [scope, animate] = useSafeAnimate();
  const paragraphsArray = words.split("\n");

  const [isAnimating, setIsAnimating] = useState(true);

  const [ref, inView] = useIntersectionObserver({
    freezeOnceVisible: true,
    threshold: 0.1,
  });

  const totalWordsCount = paragraphsArray.reduce(
    (count, paragraph) => count + paragraph.split(" ").length,
    0,
  );
  const animationTime =
    totalWordsCount * stagerDuration * 1000 + duration * 1000;

  const animateSpan = (options?: AnimationOptions) => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: 0,
        ...options,
      },
    );
  };

  const completeAnimation = () => {
    animateSpan();
    onFinish?.();
    setIsAnimating(false);
  };

  useEffect(() => {
    if (inView) {
      animateSpan({
        duration,
        delay: stagger(stagerDuration),
      });

      setTimeout(() => completeAnimation(), animationTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const renderParagraphs = () => (
    <motion.div ref={scope}>
      {paragraphsArray.map((paragraph, pIdx) => (
        <p key={`paragraph-${pIdx}`} className="mb-4">
          {paragraph.split(" ").map((word, wIdx) => (
            <motion.span
              key={`${word}-${pIdx}-${wIdx}`}
              className="will-change-filter-opacity opacity-0"
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
      ref={ref}
      className={cn(
        "text-2xl font-bold",
        isAnimating ? "cursor-pointer" : "",
        className,
      )}
      onClick={completeAnimation}
    >
      <div className="mt-4">
        <div className="leading-snug tracking-wide">{renderParagraphs()}</div>
      </div>
    </div>
  );
};
