import type { FC } from "react";
import type { Project } from "@/interfaces";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-12">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
};
