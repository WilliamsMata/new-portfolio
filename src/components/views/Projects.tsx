import type { FC } from "react";
import type { Dictionary } from "@/i18n/getDictionary";
import { ProjectList } from "../projects/ProjectList";
import { LinkPreview } from "../ui/link-preview";
import { GradientText } from "../common/GradientText";

interface ProjectsProps {
  dictionary: Dictionary["projects"];
}

export const Projects: FC<ProjectsProps> = ({ dictionary }) => {
  const { title, description, projects } = dictionary;
  return (
    <section className="flex flex-col items-center gap-8">
      <GradientText as="h2" size="4xl">
        {title}
      </GradientText>

      <p className="mx-4 text-center text-muted-foreground">
        {description}{" "}
        <LinkPreview
          url="https://github.com/WilliamsMata?tab=repositories&type=source"
          className="underline underline-offset-4"
        >
          github
        </LinkPreview>
        .
      </p>

      <ProjectList projects={projects} />
    </section>
  );
};
