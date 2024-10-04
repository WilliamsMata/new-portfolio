export interface Project {
  title: string;
  description: string;
  imagePath: string;
  githubUrl: string;
  projectUrl: string;
  projectTech: ProjectTech[];
}

export interface ProjectTech {
  title: string;
  color: string;
}
