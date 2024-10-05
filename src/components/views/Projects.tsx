import { projects } from "@/data/projects";
import dynamic from "next/dynamic";

const ProjectList = dynamic(
  () => import("../projects/ProjectList").then((mod) => mod.ProjectList),
  { ssr: false },
);

export const Projects = () => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        My Projects
      </h2>

      <ProjectList projects={projects} />
    </section>
  );
};
