import "server-only";
import {
  buildPortfolioProfileOverview,
  findPortfolioProjects,
  findPortfolioSkills,
  getPortfolioKnowledge,
  selectOfficialLinks,
} from "@/lib/ai/knowledge";
import {
  getOfficialLinksDef,
  getProfileOverviewDef,
  searchProjectsDef,
  searchSkillsDef,
} from "@/lib/ai/tool-definitions";
import type { Locale } from "@/i18n/i18n-config";

export function createPortfolioTools(locale: Locale) {
  const knowledgePromise = getPortfolioKnowledge(locale);

  const getProfileOverview = getProfileOverviewDef.server(async (args) => {
    const knowledge = await knowledgePromise;
    const { focus } = (args ?? {}) as {
      focus?: "general" | "experience" | "recruiter";
    };

    return buildPortfolioProfileOverview(knowledge, focus);
  });

  const searchProjects = searchProjectsDef.server(async (args) => {
    const knowledge = await knowledgePromise;
    const { query, limit } = (args ?? {}) as {
      query?: string;
      limit?: number;
    };

    return findPortfolioProjects(knowledge, query, limit);
  });

  const searchSkills = searchSkillsDef.server(async (args) => {
    const knowledge = await knowledgePromise;
    const { query, category, limit } = (args ?? {}) as {
      query?: string;
      category?: string;
      limit?: number;
    };

    return findPortfolioSkills(knowledge, query, category, limit);
  });

  const getOfficialLinks = getOfficialLinksDef.server(async (args) => {
    const knowledge = await knowledgePromise;
    const { purpose } = (args ?? {}) as {
      purpose?:
        | "all"
        | "contact"
        | "github"
        | "linkedin"
        | "telegram"
        | "resume";
    };

    return selectOfficialLinks(knowledge, purpose);
  });

  return [getProfileOverview, searchProjects, searchSkills, getOfficialLinks];
}
