import { FC } from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";

interface GenerateTextProps {
  text: string;
}

export const GenerateText: FC<GenerateTextProps> = ({ text }) => {
  return (
    <div className="mx-8 flex flex-col items-center justify-center gap-4">
      <TextGenerateEffect
        words={text}
        className="text-center text-lg font-normal md:text-2xl"
        stagerDuration={0.15}
      />
    </div>
  );
};
