import type { Skill } from "@/interfaces";
import { SkillDataCard } from "./SkillDataCard";

export function SkillContentTab({ title, skillsData }: Skill) {
  return (
    <div className="h-[46rem] w-full md:h-[37rem]">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />

        <div className="border-gray-t00 relative flex h-full flex-col items-start overflow-hidden overflow-y-auto rounded-2xl border bg-blue-100 px-4 py-8 shadow-xl dark:bg-zinc-950">
          <h3 className="text-2xl font-semibold">{title}</h3>

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
