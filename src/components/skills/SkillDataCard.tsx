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
            needInvertColor ? "invert" : ""
          }`}
        >
          <Image src={iconPath} alt={title} fill />
        </div>

        <h3 className="mt-2 text-center text-lg font-semibold text-white">
          {title}
        </h3>
      </div>
    </SkillModalTrigger>
  );
}
