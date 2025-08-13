import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { GenerateText } from "../about/GenerateText";
import { LampContainer } from "../ui/lamp";
import { GradientText } from "../common/GradientText";

interface AboutProps {
  dictionary: Dictionary["about"];
}

export const About: FC<AboutProps> = ({ dictionary }) => {
  const { title, text } = dictionary;
  return (
    <section className="flex h-full flex-col items-center [contain-intrinsic-size:1px_600px]">
      <GradientText as="h2" size="4xl" className="z-[100] translate-y-12">
        {title}
      </GradientText>

      <LampContainer>
        <GenerateText text={text} />
      </LampContainer>
    </section>
  );
};
