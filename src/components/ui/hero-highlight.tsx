"use client";
import type { FC, PropsWithChildren } from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface HeroHighlightProps extends PropsWithChildren {
  className?: string;
  containerClassName?: string;
}

export const HeroHighlight: FC<HeroHighlightProps> = ({
  children,
  className,
  containerClassName,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "group relative flex h-[40rem] w-full items-center justify-center bg-background",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 bg-dot-thick-indigo-500 group-hover:opacity-100 dark:bg-dot-thick-indigo-500"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [ref, inView] = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  return (
    <motion.span
      ref={ref}
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: inView ? "100% 100%" : "0% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-blue-200 to-purple-200 px-1 pb-1 dark:from-blue dark:to-purple`,
        className,
      )}
    >
      {children}
    </motion.span>
  );
};
