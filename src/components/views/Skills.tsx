"use client";
import { skills } from "@/data/skills";
import { Tabs } from "../ui/tabs";
import { SkillContentTab } from "../skills/SkillContentTab";
import { SkillModal } from "../skills/SkillModal";

const tabs = skills.map(({ title, skillsData }) => ({
  title,
  value: title,
  content: <SkillContentTab title={title} skillsData={skillsData} />,
}));

export const Skills = () => {
  return (
    <section className="flex min-h-screen flex-col items-center">
      <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        My Skills
      </h2>

      <SkillModal>
        <Tabs tabs={tabs} />
      </SkillModal>
    </section>
  );
};
