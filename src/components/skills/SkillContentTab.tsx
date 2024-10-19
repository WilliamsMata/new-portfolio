import type { Skill } from "@/interfaces";
import { SkillDataCard } from "./SkillDataCard";
import { SkillContentTabContainer } from "./SkillContentTabContainer";

export function SkillContentTab({ title, skillsData }: Skill) {
  return (
    <SkillContentTabContainer title={title}>
      <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />

      <div className="border-gray-t00 relative flex h-full flex-col items-start overflow-y-auto rounded-2xl border bg-blue-100 shadow-xl dark:bg-zinc-950">
        <h3 className="px-4 pt-8 text-2xl font-semibold">{title}</h3>

        <div className="flex w-full flex-row flex-wrap items-center justify-center overflow-hidden px-4 pb-8 pt-4">
          {skillsData.map((skill) => (
            <SkillDataCard
              skill={skill}
              parentTitle={title}
              key={skill.title}
            />
          ))}
        </div>
      </div>
    </SkillContentTabContainer>
  );
}
