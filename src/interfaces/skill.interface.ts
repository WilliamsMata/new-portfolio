export interface Skill {
  title: string;
  skillsData: SkillData[];
}

export interface SkillData {
  title: string;
  iconPath: string;
  url: string;
  description: string;
  needInvertColor?: boolean;
}
