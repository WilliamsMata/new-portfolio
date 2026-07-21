import { toolDefinition, type JSONSchema } from "@tanstack/ai";

const stringArraySchema: JSONSchema = {
  type: "array",
  items: {
    type: "string",
  },
};

const profileOverviewSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    headline: { type: "string" },
    summary: { type: "string" },
    experienceYears: { type: "integer", minimum: 0 },
    specialties: stringArraySchema,
    recruiterHighlights: stringArraySchema,
    workHistoryNote: { type: "string" },
  },
  required: [
    "name",
    "headline",
    "summary",
    "experienceYears",
    "specialties",
    "recruiterHighlights",
    "workHistoryNote",
  ],
};

const projectSummarySchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    tech: stringArraySchema,
    projectUrl: { type: "string", format: "uri" },
    githubUrl: { type: "string", format: "uri" },
  },
  required: ["title", "description", "tech"],
};

const skillSummarySchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    category: { type: "string" },
    description: { type: "string" },
    url: { type: "string", format: "uri" },
  },
  required: ["title", "category", "description", "url"],
};

const officialLinkSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    label: { type: "string" },
    url: { type: "string", format: "uri" },
    kind: { type: "string" },
    recommendedFor: { type: "string" },
  },
  required: ["label", "url", "kind", "recommendedFor"],
};

const profileOverviewInputSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    focus: {
      type: "string",
      enum: ["general", "experience", "recruiter"],
    },
  },
  required: [],
};

const searchProjectsInputSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    query: { type: "string" },
    limit: {
      type: "integer",
      minimum: 1,
      maximum: 6,
    },
  },
  required: [],
};

const searchSkillsInputSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    query: { type: "string" },
    category: { type: "string" },
    limit: {
      type: "integer",
      minimum: 1,
      maximum: 8,
    },
  },
  required: [],
};

const officialLinksInputSchema: JSONSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    purpose: {
      type: "string",
      enum: ["all", "contact", "github", "linkedin", "telegram", "resume"],
    },
  },
  required: [],
};

export const getProfileOverviewDef = toolDefinition({
  name: "get_profile_overview",
  description:
    "Get a grounded overview of Williams Mata's public profile, experience, and recruiter-relevant highlights from the portfolio.",
  inputSchema: profileOverviewInputSchema,
  outputSchema: profileOverviewSchema,
});

export const searchProjectsDef = toolDefinition({
  name: "search_projects",
  description:
    "Search Williams Mata's public portfolio projects by topic, technology, or use case.",
  inputSchema: searchProjectsInputSchema,
  outputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      projects: {
        type: "array",
        items: projectSummarySchema,
      },
      total: {
        type: "integer",
        minimum: 0,
      },
      note: { type: "string" },
    },
    required: ["projects", "total"],
  },
});

export const searchSkillsDef = toolDefinition({
  name: "search_skills",
  description:
    "Search Williams Mata's public skills by category, technology name, or keyword.",
  inputSchema: searchSkillsInputSchema,
  outputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      skills: {
        type: "array",
        items: skillSummarySchema,
      },
      total: {
        type: "integer",
        minimum: 0,
      },
      note: { type: "string" },
    },
    required: ["skills", "total"],
  },
});

export const getOfficialLinksDef = toolDefinition({
  name: "get_official_links",
  description:
    "Get Williams Mata's official public links. Use for recruiting, hiring, collaboration, resume, GitHub, LinkedIn, or Telegram requests.",
  inputSchema: officialLinksInputSchema,
  outputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      links: {
        type: "array",
        items: officialLinkSchema,
      },
      guidance: { type: "string" },
    },
    required: ["links", "guidance"],
  },
});

export const submitContactLeadDef = toolDefinition({
  name: "submit_contact_lead",
  description:
    "Submit a direct contact lead or message to Williams Mata's personal Telegram when a recruiter or client wants to schedule an interview or discuss a project.",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      message: { type: "string" },
      company: { type: "string" },
    },
    required: ["name", "email", "message"],
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      success: { type: "boolean" },
      statusMessage: { type: "string" },
    },
    required: ["success", "statusMessage"],
  },
});

export const getWorkPreferencesDef = toolDefinition({
  name: "get_work_preferences",
  description:
    "Get Williams Mata's work preferences, remote availability, notice period, timezone (UTC-4/Caracas/EST), and accepted contract types (B2B/USD).",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {},
    required: [],
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      workMode: { type: "string" },
      availability: { type: "string" },
      noticePeriod: { type: "string" },
      timezone: { type: "string" },
      scheduleFlexibility: { type: "string" },
      contractTypes: stringArraySchema,
    },
    required: [
      "workMode",
      "availability",
      "noticePeriod",
      "timezone",
      "scheduleFlexibility",
      "contractTypes",
    ],
  },
});

export const getArchitectureDeepDiveDef = toolDefinition({
  name: "get_architecture_deep_dive",
  description:
    "Get in-depth architectural details, design patterns (Hexagonal Architecture, DDD, SOLID), and technical trade-offs for Williams Mata's projects.",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      projectTitle: { type: "string" },
    },
    required: [],
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      deepDives: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            project: { type: "string" },
            architecturePattern: { type: "string" },
            keyHighlights: stringArraySchema,
            decouplingStrategy: { type: "string" },
          },
          required: [
            "project",
            "architecturePattern",
            "keyHighlights",
            "decouplingStrategy",
          ],
        },
      },
    },
    required: ["deepDives"],
  },
});

export const portfolioChatToolDefinitions = [
  getProfileOverviewDef,
  searchProjectsDef,
  searchSkillsDef,
  getOfficialLinksDef,
  submitContactLeadDef,
  getWorkPreferencesDef,
  getArchitectureDeepDiveDef,
] as const;
