"use client";
import { type FC } from "react";
import { useColor } from "./ColorProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toaster } from "@/adapter/sonner.adapter";

export interface Color {
  name: string;
  hex: string;
}

export interface ColorListProps {
  colors: Color[];
}

export const ColorList: FC<ColorListProps> = ({ colors }) => {
  const { getColorFromHex, copyColorToClipboard } = useColor();

  const handleColorClick = (hex: string) => {
    copyColorToClipboard(hex);
    Toaster.success("Color copied to clipboard");
  };

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {colors.map((color) => (
          <Tooltip key={color.name}>
            <TooltipTrigger>
              <div
                className="flex h-full w-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-border bg-background p-4 shadow-lg transition duration-200 hover:scale-105 hover:border-foreground/50 hover:shadow-xl active:scale-90"
                onClick={() => handleColorClick(color.hex)}
              >
                <div
                  className="flex aspect-square h-full w-full items-center justify-center rounded-lg bg-background"
                  style={{
                    backgroundColor: color.hex,
                  }}
                />

                <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className="text-center font-semibold">{color.name}</h3>
                  <p className="text-center text-sm">
                    {getColorFromHex(color.hex)}
                  </p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="z-[999]">
              <div className="flex flex-col items-center justify-center gap-4">
                <h3 className="text-center font-semibold">Click to copy</h3>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
