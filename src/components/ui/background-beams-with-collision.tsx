"use client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

interface Beam {
  initialX: number;
  translateX: number;
  duration: number;
  repeatDelay: number;
  delay?: number;
  className?: string;
}

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [beams, setBeams] = useState<Beam[]>([]);

  useEffect(() => {
    const calculateRelativePosition = (percentage: number) => {
      return (window.innerWidth * percentage) / 100;
    };

    setBeams([
      {
        initialX: calculateRelativePosition(1),
        translateX: calculateRelativePosition(1),
        duration: 7,
        repeatDelay: 3,
        delay: 2,
      },
      {
        initialX: calculateRelativePosition(10),
        translateX: calculateRelativePosition(10),
        duration: 7,
        repeatDelay: 7,
        className: "h-6",
      },
      {
        initialX: calculateRelativePosition(25),
        translateX: calculateRelativePosition(25),
        duration: 8,
        repeatDelay: 14,
        className: "h-12",
        delay: 2,
      },
      {
        initialX: calculateRelativePosition(40),
        translateX: calculateRelativePosition(40),
        duration: 5,
        repeatDelay: 14,
        delay: 4,
      },
      {
        initialX: calculateRelativePosition(60),
        translateX: calculateRelativePosition(60),
        duration: 3,
        repeatDelay: 3,
        delay: 4,
      },
      {
        initialX: calculateRelativePosition(80),
        translateX: calculateRelativePosition(80),
        duration: 11,
        repeatDelay: 2,
        className: "h-20",
      },
      {
        initialX: calculateRelativePosition(100),
        translateX: calculateRelativePosition(100),
        duration: 3,
        repeatDelay: 2,
        className: "h-12",
      },
    ]);
  }, []);

  const { isIntersecting, ref } = useIntersectionObserver();

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background",
        className,
      )}
    >
      <div ref={ref}>
        {beams.map((beam) => (
          <CollisionMechanism
            key={beam.initialX + "beam-idx"}
            beamOptions={beam}
            containerRef={containerRef}
            parentRef={parentRef}
            isIntersecting={isIntersecting}
          />
        ))}
      </div>

      {children}
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full bg-neutral-100"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
    isIntersecting: boolean;
  }
>(({ parentRef, containerRef, beamOptions = {}, isIntersecting }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  const [relativeCollisionPointY, setRelativeCollisionPointY] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (isIntersecting && parentRef.current && containerRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const relativeTop = containerRect.top - parentRect.top;
      setRelativeCollisionPointY(relativeTop);
    }
  }, [isIntersecting, parentRef, containerRef]);

  useEffect(() => {
    if (relativeCollisionPointY === null) return;

    let rafId: number;
    let lastCheckTime = 0;
    const checkInterval = 100;

    const checkCollision = () => {
      const now = performance.now();

      if (now - lastCheckTime >= checkInterval) {
        lastCheckTime = now;

        if (beamRef.current && parentRef.current && !cycleCollisionDetected) {
          const beamRect = beamRef.current.getBoundingClientRect();
          const parentRect = parentRef.current.getBoundingClientRect();

          const beamRelativeBottom = beamRect.bottom - parentRect.top;

          if (beamRelativeBottom >= relativeCollisionPointY) {
            const relativeX =
              beamRect.left - parentRect.left + beamRect.width / 2;
            const relativeY = beamRect.bottom - parentRect.top;

            setCollision({
              detected: true,
              coordinates: { x: relativeX, y: relativeY },
            });
            setCycleCollisionDetected(true);
          }
        }
      }

      rafId = requestAnimationFrame(checkCollision);
    };

    if (isIntersecting) {
      rafId = requestAnimationFrame(checkCollision);
    }

    return () => cancelAnimationFrame(rafId);
  }, [
    cycleCollisionDetected,
    parentRef,
    isIntersecting,
    relativeCollisionPointY,
  ]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          y: beamOptions.initialY || "-200px",
          x: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            y: beamOptions.translateY || "1800px",
            x: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-blue via-purple to-transparent will-change-transform",
          beamOptions.className,
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="will-change-opacity absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-blue to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="will-change-transform-opacity absolute h-1 w-1 rounded-full bg-gradient-to-b from-blue to-purple"
        />
      ))}
    </div>
  );
};
