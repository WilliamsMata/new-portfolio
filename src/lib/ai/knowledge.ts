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

function buildSpecialties(specialties: Array<string>) {
  return specialties;
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

function buildWorkHistoryNote(
  locale: Locale,
  entries: Dictionary["experience"]["entries"],
) {
  if (entries.length === 0) {
    return locale === "es"
      ? "No hay historial laboral registrado en el portfolio."
      : "No work history is recorded in the portfolio.";
  }

  const history = entries.map((entry) => {
    const period = locale === "es" ? entry.period : entry.period;
    const role = entry.role;
    const company = entry.company;
    return `${period}: ${role} at ${company}`;
  });

  if (locale === "es") {
    return `Experiencia laboral: ${history.join(" | ")}.`;
  }

  return `Work history: ${history.join(" | ")}.`;
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
    specialties: buildSpecialties(dictionary.about.specialties),
    recruiterHighlights: buildRecruiterHighlights(
      locale,
      experienceYears,
      projects.length,
    ),
    workHistoryNote: buildWorkHistoryNote(
      locale,
      dictionary.experience.entries,
    ),
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
      kind: link.kind,
      label: link.label,
      url: link.href,
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

export function getWorkPreferences(locale: Locale) {
  if (locale === "es") {
    return {
      workMode: "100% Remoto (Siempre remoto)",
      availability: "Disponible con preaviso profesional",
      noticePeriod: "Preaviso estándar de 2 semanas",
      timezone: "UTC-4 (Hora Caracas / EST)",
      scheduleFlexibility:
        "Flexibilidad total de horarios para solapar jornadas con US East/West y Europa.",
      contractTypes: [
        "B2B Contractor (USD)",
        "Full-Time Remote",
        "Proyectos Freelance de alto impacto",
      ],
    };
  }

  return {
    workMode: "100% Remote (Always remote)",
    availability: "Available with professional notice",
    noticePeriod: "Standard 2-week notice period",
    timezone: "UTC-4 (Caracas / EST)",
    scheduleFlexibility:
      "Full schedule flexibility to overlap working hours with US East/West and Europe.",
    contractTypes: [
      "B2B Contractor (USD)",
      "Full-Time Remote",
      "High-impact Freelance Projects",
    ],
  };
}

export function getArchitectureDeepDives(
  locale: Locale,
  projectTitle?: string,
) {
  const isEs = locale === "es";

  const allDeepDives = [
    {
      project: "TLDR Bot",
      architecturePattern: isEs
        ? "Arquitectura Hexagonal (Puertos y Adaptadores) & DDD"
        : "Hexagonal Architecture (Ports & Adapters) & DDD",
      keyHighlights: isEs
        ? [
            "Motor RAG de dominio completamente desacoplado de la capa de presentación (Telegram / Discord)",
            "Búsqueda Híbrida combinando pgvector semántico y tsvector léxico con capa de Re-ranking",
            "Adaptadores de proveedores LLM desacoplados para alternar entre Gemini u OpenAI sin tocar la lógica central",
          ]
        : [
            "Core RAG domain decoupled from presentation adapters (Telegram / Discord)",
            "Hybrid Search combining semantic pgvector and lexical tsvector with Re-ranking layer",
            "LLM provider adapters decoupled to switch between Gemini, OpenAI, or custom models seamlessly",
          ],
      decouplingStrategy: isEs
        ? "La lógica de negocio reside en el núcleo del dominio. Los adaptadores de entrada gestionan eventos de Telegram/Discord y los adaptadores de salida manejan la vectorización y la persistencia en base de datos."
        : "Core business logic lives inside the domain core. Primary adapters handle Telegram/Discord webhooks while secondary adapters manage vectorization and database persistence.",
    },
    {
      project: "Loadify AI",
      architecturePattern: isEs
        ? "Sistema de Agentes Autónomos (Patrón ReAct) & Voice AI"
        : "Autonomous Agent System (ReAct Pattern) & Voice AI",
      keyHighlights: isEs
        ? [
            "Agentes conversacionales de voz en tiempo real con RetellAI para negociación de cargas",
            "Ciclos ReAct con Tool-Calling para consulta autónoma de datos y gestión de errores",
            "Orquestación resiliente en n8n reduciendo la carga operativa manual en un 90%",
          ]
        : [
            "Real-time voice conversational agents with RetellAI for rate negotiation",
            "ReAct loops with Tool-Calling for autonomous data verification and error handling",
            "Resilient n8n orchestration reducing manual operational load by 90%",
          ],
      decouplingStrategy: isEs
        ? "Arquitectura event-driven donde la IA de voz ejecuta funciones validadas a través de APIs desacopladas sin comprometer la base de datos de producción."
        : "Event-driven architecture where Voice AI executes validated functions through decoupled APIs without exposing production database layers.",
    },
    {
      project: "Event-Driven Microservices Architecture",
      architecturePattern: isEs
        ? "Microservicios Orientados a Eventos (NestJS + NATS + Clean Architecture)"
        : "Event-Driven Microservices (NestJS + NATS + Clean Architecture)",
      keyHighlights: isEs
        ? [
            "Comunicación asíncrona entre microservicios usando NATS Broker para baja latencia",
            "Persistencia híbrida (PostgreSQL para transacciones, MongoDB para logs/eventos)",
            "Integración transaccional con Stripe empaquetada bajo contenedores Docker",
          ]
        : [
            "Low-latency asynchronous inter-service communication via NATS Broker",
            "Hybrid persistence (PostgreSQL for transactional data, MongoDB for audit logs)",
            "Resilient Stripe payment processing packaged within Docker orchestration",
          ],
      decouplingStrategy: isEs
        ? "Desacoplamiento total entre servicios mediante publicación/suscripción de eventos NATS e interfaces limpias siguiendo principios SOLID."
        : "Complete service decoupling via NATS publish/subscribe topics and clean interfaces enforcing SOLID principles.",
    },
    {
      project: "Graggle",
      architecturePattern: isEs
        ? "Serverless de Alta Concurrencia (Next.js Server Actions + Redis)"
        : "High-Concurrency Serverless App (Next.js Server Actions + Redis)",
      keyHighlights: isEs
        ? [
            "Gestión de estado asíncrona en memoria con Redis para concurrencia masiva en tiempo real",
            "Dashboard analítico en vivo para ajuste de la economía del juego",
            "Mutaciones atómicas con Next.js Server Actions sin sobrecarga de API tradicional",
          ]
        : [
            "High-speed in-memory state management with Redis for massive real-time concurrency",
            "Live analytics dashboard for game economy monitoring and parameter tuning",
            "Atomic mutations with Next.js Server Actions avoiding traditional API overhead",
          ],
      decouplingStrategy: isEs
        ? "Separación estricta entre el almacenamiento relacional permanente (PostgreSQL) y la capa de estado volátil en tiempo real (Redis)."
        : "Strict separation between persistent relational storage (PostgreSQL) and the fast volatile state layer (Redis).",
    },
  ];

  if (!projectTitle) {
    return { deepDives: allDeepDives };
  }

  const query = projectTitle.toLowerCase().trim();
  const filtered = allDeepDives.filter(
    (item) =>
      item.project.toLowerCase().includes(query) ||
      item.architecturePattern.toLowerCase().includes(query),
  );

  return {
    deepDives: filtered.length > 0 ? filtered : allDeepDives,
  };
}
