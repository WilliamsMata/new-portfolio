"use client";

import * as React from "react";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({ children }: React.PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
