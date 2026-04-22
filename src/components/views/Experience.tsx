import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { Timeline } from "../ui/timeline";
import { GradientText } from "../common/GradientText";

interface ExperienceProps {
  dictionary: Dictionary["experience"];
}

export const Experience: FC<ExperienceProps> = ({ dictionary }) => {
  const { title, entries } = dictionary;

  const data = entries.map((entry) => ({
    title: entry.period,
    content: (
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-xl font-bold text-neutral-500 dark:text-neutral-300">
          {entry.role}
        </h3>
        <p className="font-medium text-neutral-500 dark:text-neutral-400">
          {entry.company}
        </p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 md:text-base">
          {entry.responsibilities}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {entry.tech.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section className="flex flex-col items-center">
      <GradientText as="h2" size="4xl" className="z-[100] md:translate-y-12">
        {title}
      </GradientText>

      <Timeline data={data} />
    </section>
  );
};
