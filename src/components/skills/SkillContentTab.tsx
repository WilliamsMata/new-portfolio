import type { Skill } from "@/data/skills";
import { SkillDataCard } from "./SkillDataCard";

export function SkillContentTab({ title, skillsData }: Skill) {
  return (
    <div className="h-screen w-full">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />

        <div className="relative flex h-full flex-col items-start overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
          <h3 className="text-2xl font-semibold text-white">{title}</h3>

          <div className="flex w-full flex-row flex-wrap items-center justify-center">
            {skillsData.map((skill) => (
              <SkillDataCard {...skill} key={skill.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
