"use client";

import { skills } from "@/data/skills";
import dynamic from "next/dynamic";
import { SkillContentTab } from "../skills/SkillContentTab";
import { SkillModal } from "../skills/SkillModal";

const Tabs = dynamic(() => import("../ui/tabs").then((mod) => mod.Tabs), {
  ssr: false,
});

const tabs = skills.map(({ title, skillsData }) => ({
  title,
  value: title,
  content: <SkillContentTab title={title} skillsData={skillsData} />,
}));

export const Skills = () => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        My Skills
      </h2>

      <SkillModal>
        <Tabs tabs={tabs} />
      </SkillModal>

      <div className="h-[46rem]"></div>
    </section>
  );
};
