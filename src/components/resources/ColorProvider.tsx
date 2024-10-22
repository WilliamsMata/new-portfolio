"use client";

import { createContext, useState, useContext, useCallback } from "react";
import { hexToHsl, hexToRgb } from "@/helpers";

export type Mode = "hex" | "hsl" | "rgb";

interface ColorContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  getColorFromHex: (hex: string) => string;
  copyColorToClipboard: (hex: string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("hex");

  const getColorFromHex = useCallback(
    (hex: string) => {
      switch (mode) {
        case "hex":
          return hex;
        case "hsl":
          const { h, s, l } = hexToHsl(hex);
          return `hsl(${h}, ${s}%, ${l}%)`;
        case "rgb":
          const { r, g, b } = hexToRgb(hex);
          return `rgb(${r}, ${g}, ${b})`;
      }
    },
    [mode],
  );

  const copyColorToClipboard = useCallback(
    (hex: string) => {
      const value = getColorFromHex(hex);

      navigator.clipboard.writeText(value);
    },
    [getColorFromHex],
  );

  return (
    <ColorContext.Provider
      value={{ mode, setMode, getColorFromHex, copyColorToClipboard }}
    >
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
