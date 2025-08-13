import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { SkillContentTab } from "../skills/SkillContentTab";
import { SkillModal } from "../skills/SkillModal";
import { Tabs } from "../ui/tabs";
import { GradientText } from "../common/GradientText";

interface SkillsProps {
  dictionary: Dictionary["skills"];
}

export const Skills: FC<SkillsProps> = ({ dictionary }) => {
  const { title, skills, learnMore } = dictionary;

  const tabs = skills.map(({ title, skillsData }) => ({
    title,
    value: title,
    content: <SkillContentTab title={title} skillsData={skillsData} />,
  }));

  return (
    <section className="flex flex-col items-center [contain-intrinsic-size:1px_800px]">
      <GradientText as="h2" size="4xl" className="mb-4">
        {title}
      </GradientText>

      <SkillModal learnMoreText={learnMore}>
        <Tabs tabs={tabs} />
      </SkillModal>
    </section>
  );
};
