import type { FC } from "react";
import type { Project } from "@/data/projects";
import { PinContainer } from "../ui/3d-pin";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { title, imagePath, projectTech, description, projectUrl } = project;
  return (
    <PinContainer
      href={projectUrl}
      title={projectUrl}
      containerClassName="w-[20rem] h-[32rem]"
    >
      <div className="flex h-[32rem] w-[20rem] basis-full flex-col tracking-tight sm:basis-1/2">
        <div className="relative aspect-video w-full">
          <Image
            src={imagePath}
            alt={title}
            fill
            className="h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
          />
        </div>

        <div className="px-4">
          <div className="flex flex-wrap justify-center gap-2 px-6 pt-4">
            {projectTech.map((tech) => (
              <Badge
                key={tech.title}
                className="text-black"
                style={{ backgroundColor: tech.color }}
              >
                {tech.title}
              </Badge>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </PinContainer>
  );
};
