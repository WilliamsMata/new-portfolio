"use client";

import * as React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { MotionConfig, LazyMotion, domAnimation } from "framer-motion";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
