"use client";

import { hexToHsl, hexToRgb } from "@/helpers/colors";
import { createContext, useState, useContext, useCallback } from "react";

type Mode = "hex" | "hsl" | "rgb";

interface ColorContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  copyColorToClipboard: (hex: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("hex");

  const copyColorToClipboard = useCallback(
    (hex: string) => {
      let value: string;

      switch (mode) {
        case "hex":
          value = hex;
          break;
        case "hsl":
          const hsl = hexToHsl(hex);
          value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
          break;
        case "rgb":
          const rgb = hexToRgb(hex);
          value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          break;
      }

      navigator.clipboard.writeText(value);
    },
    [mode],
  );

  return (
    <ColorContext.Provider value={{ mode, setMode, copyColorToClipboard }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
