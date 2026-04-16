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

export const portfolioChatToolDefinitions = [
  getProfileOverviewDef,
  searchProjectsDef,
  searchSkillsDef,
  getOfficialLinksDef,
] as const;
