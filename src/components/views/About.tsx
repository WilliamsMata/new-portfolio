import type { FC } from "react";
import { getYearsOfExperience } from "@/helpers";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";
import { GenerateText } from "../about/GenerateText";
import { LampContainer } from "../ui/lamp";
import { GradientText } from "../common/GradientText";

interface AboutProps {
  dictionary: Dictionary["about"];
  locale: Locale;
}

function getExperienceUnit(locale: Locale, years: number) {
  if (locale === "es") {
    return years === 1 ? "año" : "años";
  }

  return years === 1 ? "year" : "years";
}

export const About: FC<AboutProps> = ({ dictionary, locale }) => {
  const { title, text } = dictionary;
  const yearsOfExperience = getYearsOfExperience();
  const experienceUnit = getExperienceUnit(locale, yearsOfExperience);
  const renderedText = text.replaceAll(
    "{{experienceYears}}",
    `${yearsOfExperience} ${experienceUnit}`,
  );

  return (
    <section className="flex h-full flex-col items-center [contain-intrinsic-size:1px_600px]">
      <GradientText as="h2" size="4xl" className="z-[100] translate-y-12">
        {title}
      </GradientText>

      <LampContainer>
        <GenerateText text={renderedText} />
      </LampContainer>
    </section>
  );
};
