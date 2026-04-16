import "server-only";
import { getYearsOfExperience } from "@/helpers/experience";
import { getDictionary, type Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/i18n-config";
import { getProfileLinks, type ProfileLink } from "@/lib/profile-links";

export interface PortfolioProjectSummary {
  title: string;
  description: string;
  tech: Array<string>;
  projectUrl?: string;
  githubUrl?: string;
}

export interface PortfolioSkillSummary {
  title: string;
  category: string;
  description: string;
  url: string;
}

export interface PortfolioKnowledge {
  locale: Locale;
  name: string;
  headline: string;
  about: string;
  experienceYears: number;
  specialties: Array<string>;
  recruiterHighlights: Array<string>;
  workHistoryNote: string;
  projects: Array<PortfolioProjectSummary>;
  skills: Array<PortfolioSkillSummary>;
  links: Array<ProfileLink>;
}

function getExperienceUnit(locale: Locale, years: number) {
  if (locale === "es") {
    return years === 1 ? "ano de experiencia" : "anos de experiencia";
  }

  return years === 1 ? "year of experience" : "years of experience";
}

function renderAboutText(text: string, locale: Locale, years: number) {
  return text.replaceAll(
    "{{experienceYears}}",
    `${years} ${getExperienceUnit(locale, years)}`,
  );
}

function buildHeadline(hero: Dictionary["hero"]) {
  return `${hero.description.first} ${hero.description.highlight} ${hero.description.second}`
    .replace(/\s+/g, " ")
    .trim();
}

function buildSpecialties(locale: Locale) {
  if (locale === "es") {
    return [
      "Desarrollo full-stack para web y mobile",
      "Arquitecturas escalables con DDD y patrones de diseno",
      "Automatizacion e integracion de IA con n8n",
      "Software mantenible con foco en rendimiento",
    ];
  }

  return [
    "Full-stack web and mobile development",
    "Scalable architectures with DDD and design patterns",
    "Automation and AI integration with n8n",
    "Maintainable software with a performance focus",
  ];
}

function buildRecruiterHighlights(
  locale: Locale,
  years: number,
  projectCount: number,
) {
  if (locale === "es") {
    return [
      `${years} ${getExperienceUnit(locale, years)} en desarrollo de software.`,
      "Perfil full-stack con trabajo visible en web, backend y mobile.",
      "Enfasis publico en escalabilidad, automatizacion e integracion de IA.",
      `${projectCount} proyectos personales publicados en el portfolio.`,
    ];
  }

  return [
    `${years} ${getExperienceUnit(locale, years)} in software development.`,
    "Full-stack profile with visible work across web, backend, and mobile.",
    "Public emphasis on scalability, automation, and AI integration.",
    `${projectCount} personal projects are publicly visible in the portfolio.`,
  ];
}

function buildWorkHistoryNote(locale: Locale) {
  if (locale === "es") {
    return "El portfolio no enumera empresas ni cargos por empresa; la evidencia publica se centra en anos de experiencia, stack, automatizacion y proyectos.";
  }

  return "The portfolio does not list companies or company-by-company roles; the public evidence focuses on years of experience, stack, automation, and projects.";
}

function normalize(value?: string) {
  return value?.toLowerCase().trim() ?? "";
}

function tokenize(value?: string) {
  return normalize(value)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function clamp(limit: number | undefined, fallback: number, max: number) {
  if (!Number.isFinite(limit)) {
    return fallback;
  }

  return Math.min(max, Math.max(1, Math.trunc(limit ?? fallback)));
}

function scoreMatch(haystack: string, tokens: Array<string>) {
  if (tokens.length === 0) {
    return 1;
  }

  return tokens.reduce((score, token) => {
    if (!haystack.includes(token)) {
      return score;
    }

    if (haystack.startsWith(token)) {
      return score + 4;
    }

    return score + 2;
  }, 0);
}

export async function getPortfolioKnowledge(
  locale: Locale,
): Promise<PortfolioKnowledge> {
  const dictionary = await getDictionary(locale);
  const experienceYears = getYearsOfExperience();

  const projects = dictionary.projects.projects.map((project) => ({
    title: project.title,
    description: project.description,
    tech: project.projectTech.map((tech) => tech.title),
    projectUrl: project.projectUrl,
    githubUrl: project.githubUrl,
  }));

  const skills = dictionary.skills.skills.flatMap((category) =>
    category.skillsData.map((skill) => ({
      title: skill.title,
      category: category.title,
      description: skill.description,
      url: skill.url,
    })),
  );

  return {
    locale,
    name: "Williams Mata",
    headline: buildHeadline(dictionary.hero),
    about: renderAboutText(dictionary.about.text, locale, experienceYears),
    experienceYears,
    specialties: buildSpecialties(locale),
    recruiterHighlights: buildRecruiterHighlights(
      locale,
      experienceYears,
      projects.length,
    ),
    workHistoryNote: buildWorkHistoryNote(locale),
    projects,
    skills,
    links: getProfileLinks(locale),
  };
}

export function buildPortfolioProfileOverview(
  knowledge: PortfolioKnowledge,
  focus?: "general" | "experience" | "recruiter",
) {
  const summaryByFocus = {
    general: knowledge.about,
    experience: `${knowledge.about} ${knowledge.workHistoryNote}`,
    recruiter: `${knowledge.about} ${knowledge.recruiterHighlights.join(" ")}`,
  } satisfies Record<NonNullable<typeof focus>, string>;

  return {
    name: knowledge.name,
    headline: knowledge.headline,
    summary: focus ? summaryByFocus[focus] : knowledge.about,
    experienceYears: knowledge.experienceYears,
    specialties: knowledge.specialties,
    recruiterHighlights: knowledge.recruiterHighlights,
    workHistoryNote: knowledge.workHistoryNote,
  };
}

export function findPortfolioProjects(
  knowledge: PortfolioKnowledge,
  query?: string,
  limit?: number,
) {
  const normalizedTokens = tokenize(query);
  const cappedLimit = clamp(limit, 4, 6);

  const rankedProjects = knowledge.projects
    .map((project) => {
      const haystack = normalize(
        [project.title, project.description, ...project.tech].join(" "),
      );

      return {
        project,
        score: scoreMatch(haystack, normalizedTokens),
      };
    })
    .filter((entry) => normalizedTokens.length === 0 || entry.score > 0)
    .sort((left, right) => right.score - left.score);

  const projects = rankedProjects
    .slice(0, cappedLimit)
    .map((entry) => entry.project);

  const note =
    projects.length > 0
      ? undefined
      : knowledge.locale === "es"
        ? "No hubo una coincidencia exacta en los proyectos visibles del portfolio."
        : "There was no exact match in the public projects listed in the portfolio.";

  return {
    projects,
    total: projects.length,
    note,
  };
}

export function findPortfolioSkills(
  knowledge: PortfolioKnowledge,
  query?: string,
  category?: string,
  limit?: number,
) {
  const normalizedTokens = tokenize(query);
  const normalizedCategory = normalize(category);
  const cappedLimit = clamp(limit, 6, 8);

  const rankedSkills = knowledge.skills
    .map((skill) => {
      const haystack = normalize(
        [skill.title, skill.category, skill.description].join(" "),
      );
      const categoryScore = normalizedCategory
        ? scoreMatch(normalize(skill.category), [normalizedCategory])
        : 1;

      return {
        skill,
        score: scoreMatch(haystack, normalizedTokens) + categoryScore,
      };
    })
    .filter((entry) => {
      const matchesCategory = normalizedCategory
        ? normalize(entry.skill.category).includes(normalizedCategory)
        : true;

      if (normalizedTokens.length === 0) {
        return matchesCategory;
      }

      return matchesCategory && entry.score > 0;
    })
    .sort((left, right) => right.score - left.score);

  const skills = rankedSkills.slice(0, cappedLimit).map((entry) => entry.skill);

  const note =
    skills.length > 0
      ? undefined
      : knowledge.locale === "es"
        ? "No hubo una coincidencia exacta en las habilidades visibles del portfolio."
        : "There was no exact match in the public skills listed in the portfolio.";

  return {
    skills,
    total: skills.length,
    note,
  };
}

export function selectOfficialLinks(
  knowledge: PortfolioKnowledge,
  purpose?: "all" | "contact" | "github" | "linkedin" | "telegram" | "resume",
) {
  const selection = purpose ?? "all";

  const links = knowledge.links.filter((link) => {
    if (selection === "all") {
      return true;
    }

    if (selection === "contact") {
      return ["linkedin", "telegram", "github", "resume"].includes(link.kind);
    }

    return link.kind === selection;
  });

  const guidance =
    knowledge.locale === "es"
      ? "Comparte enlaces oficiales y evita inventar canales privados no visibles en el portfolio."
      : "Share official links only and avoid inventing private channels that are not visible in the portfolio.";

  return {
    links: links.map((link) => ({
      ...link,
      recommendedFor:
        link.kind === "linkedin"
          ? knowledge.locale === "es"
            ? "perfil profesional"
            : "professional profile"
          : link.kind === "github"
            ? knowledge.locale === "es"
              ? "codigo y proyectos"
              : "code and projects"
            : link.kind === "telegram"
              ? knowledge.locale === "es"
                ? "contacto rapido"
                : "quick contact"
              : knowledge.locale === "es"
                ? "CV publico"
                : "public resume",
    })),
    guidance,
  };
}
