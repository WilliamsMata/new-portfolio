import { projects } from "@/data/projects";
import { ProjectList } from "../projects/ProjectList";
import { LinkPreview } from "../ui/link-preview";

export const Projects = () => {
  return (
    <section className="flex flex-col items-center gap-8">
      <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-semibold text-transparent">
        My Projects
      </h2>

      <p className="mx-4 text-center text-muted-foreground">
        Only personal projects are listed here. These are not all I have, you
        can find more on my{" "}
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
