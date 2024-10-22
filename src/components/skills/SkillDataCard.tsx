import type { SkillData } from "@/interfaces";
import { SkillModalTrigger } from "./SkillModal";
import { SkillImage } from "./SkillImage";
import { cn } from "@/lib/utils";

interface SkillDataCardProps {
  skill: SkillData;
  parentTitle: string;
}

export function SkillDataCard({ skill, parentTitle }: SkillDataCardProps) {
  const { title, iconPath, needInvertColor } = skill;

  return (
    <SkillModalTrigger
      skill={skill}
      className="hover:shadow-purple w-4/12 cursor-pointer rounded-xl p-4 transition-all hover:p-2 hover:shadow-2xl active:scale-90 sm:w-4/12 md:w-3/12 md:p-6 lg:w-2/12"
    >
      <div
        className={cn(
          "relative aspect-square w-full",
          needInvertColor && "dark:invert",
        )}
      >
        <SkillImage
          parentTitle={parentTitle}
          title={title}
          iconPath={iconPath}
        />
      </div>

      <h3 className="mt-2 text-center text-sm font-semibold md:text-lg">
        {title}
      </h3>
    </SkillModalTrigger>
  );
}
