import "server-only";
import {
  buildPortfolioProfileOverview,
  findPortfolioProjects,
  findPortfolioSkills,
  getArchitectureDeepDives,
  getPortfolioKnowledge,
  getWorkPreferences,
  selectOfficialLinks,
} from "@/lib/ai/knowledge";
import {
  getArchitectureDeepDiveDef,
  getOfficialLinksDef,
  getProfileOverviewDef,
  getWorkPreferencesDef,
  searchProjectsDef,
  searchSkillsDef,
  submitContactLeadDef,
} from "@/lib/ai/tool-definitions";
import { sendTelegramNotification } from "@/lib/telegram";
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

  const submitContactLead = submitContactLeadDef.server(async (args) => {
    const { name, email, message, company } = (args ?? {}) as {
      name: string;
      email: string;
      message: string;
      company?: string;
    };

    if (!name || !email || !message) {
      return {
        success: false,
        statusMessage:
          locale === "es"
            ? "Nombre, correo y mensaje son requeridos."
            : "Name, email, and message are required.",
      };
    }

    try {
      const fullMessage = company
        ? `[Portfolio Chat Lead from ${company}]\n${message}`
        : `[Portfolio Chat Lead]\n${message}`;

      await sendTelegramNotification({
        name,
        email,
        message: fullMessage,
      });

      return {
        success: true,
        statusMessage:
          locale === "es"
            ? "Mensaje enviado exitosamente al Telegram de Williams."
            : "Message successfully sent to Williams' Telegram.",
      };
    } catch (error) {
      console.error("Error sending chat lead to Telegram:", error);
      return {
        success: false,
        statusMessage:
          locale === "es"
            ? "No se pudo enviar la notificación en este momento."
            : "Could not send the notification at this time.",
      };
    }
  });

  const fetchWorkPreferences = getWorkPreferencesDef.server(async () => {
    return getWorkPreferences(locale);
  });

  const getArchitectureDeepDive = getArchitectureDeepDiveDef.server(
    async (args) => {
      const { projectTitle } = (args ?? {}) as { projectTitle?: string };
      return getArchitectureDeepDives(locale, projectTitle);
    },
  );

  return [
    getProfileOverview,
    searchProjects,
    searchSkills,
    getOfficialLinks,
    submitContactLead,
    fetchWorkPreferences,
    getArchitectureDeepDive,
  ];
}
