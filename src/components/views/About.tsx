import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { GenerateText } from "../about/GenerateText";
import { LampContainer } from "../ui/lamp";

interface AboutProps {
  dictionary: Dictionary["about"];
}

export const About: FC<AboutProps> = ({ dictionary }) => {
  const { title, text } = dictionary;
  return (
    <section className="flex h-full flex-col items-center">
      <h2 className="z-[100] translate-y-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        {title}
      </h2>

      <LampContainer>
        <GenerateText text={text} />
      </LampContainer>
    </section>
  );
};
