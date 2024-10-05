import type { SkillData } from "@/interfaces";
import { SkillModalTrigger } from "./SkillModal";
import { SkillImage } from "./SkillImage";

interface SkillDataCardProps {
  skill: SkillData;
  parentTitle: string;
}

export function SkillDataCard({ skill, parentTitle }: SkillDataCardProps) {
  const { title, iconPath, needInvertColor } = skill;

  return (
    <SkillModalTrigger skill={skill} key={title}>
      <div
        className={`relative aspect-square w-full ${
          needInvertColor ? "dark:invert" : ""
        }`}
      >
        <SkillImage
          parentTitle={parentTitle}
          title={title}
          iconPath={iconPath}
        />
      </div>

      <h3 className="mt-2 text-center text-lg font-semibold">{title}</h3>
    </SkillModalTrigger>
  );
}
