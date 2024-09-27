import Image from "next/image";

import type { SkillData } from "@/data/skills";
import { SkillModalTrigger } from "./SkillModal";

export function SkillDataCard(skill: SkillData) {
  const { title, iconPath, needInvertColor } = skill;
  return (
    <SkillModalTrigger skill={skill} key={title}>
      <div>
        <div
          className={`relative aspect-square w-full ${
            needInvertColor ? "dark:invert" : ""
          }`}
        >
          <Image
            src={iconPath}
            alt={title}
            fill
            sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 33vw"
          />
        </div>

        <h3 className="mt-2 text-center text-lg font-semibold">{title}</h3>
      </div>
    </SkillModalTrigger>
  );
}
