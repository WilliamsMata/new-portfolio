"use client";

import * as React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { MotionConfig } from "framer-motion";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
