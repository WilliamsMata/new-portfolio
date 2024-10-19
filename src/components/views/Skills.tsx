import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { SkillContentTab } from "../skills/SkillContentTab";
import { SkillModal } from "../skills/SkillModal";
import { Tabs } from "../ui/tabs";

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
    <section className="flex flex-col items-center">
      <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        {title}
      </h2>

      <SkillModal learnMoreText={learnMore}>
        <Tabs tabs={tabs} />
      </SkillModal>
    </section>
  );
};
