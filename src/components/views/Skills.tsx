import { Skill, SkillData, skills } from "@/data/skills";
import { Tabs } from "../ui/tabs";
import Image from "next/image";

const tabs = skills.map(({ title, skillsData }) => ({
  title,
  value: title,
  content: <ContentTab title={title} skillsData={skillsData} />,
}));

export const Skills = () => {
  return (
    <section className="flex min-h-screen flex-col items-center">
      <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        My Skills
      </h2>

      <Tabs tabs={tabs} />
    </section>
  );
};

function ContentTab({ title, skillsData }: Skill) {
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

function SkillDataCard({ iconPath, needInvertColor, title }: SkillData) {
  return (
    <div
      className="w-6/12 cursor-pointer rounded-xl p-4 transition-all hover:p-2 hover:shadow-2xl hover:shadow-purple-600 active:scale-90 sm:w-4/12 md:w-3/12 md:p-6 lg:w-2/12"
      key={title}
    >
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
    </div>
  );
}
