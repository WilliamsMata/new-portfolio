"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useColor, type Mode } from "./ColorProvider";

const modes: Mode[] = ["hex", "rgb", "hsl"];

export const SelectMode = () => {
  const { mode, setMode } = useColor();

  return (
    <Select value={mode} onValueChange={(value) => setMode(value as Mode)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Mode" />
      </SelectTrigger>

      <SelectContent>
        {modes.map((mode) => (
          <SelectItem key={mode} value={mode}>
            {mode}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
