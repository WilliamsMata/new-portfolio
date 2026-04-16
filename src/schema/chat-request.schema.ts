import { z } from "zod";
import { i18n } from "@/i18n/i18n-config";

export const chatRequestSchema = z.object({
  messages: z.array(z.unknown()).max(40),
  data: z
    .object({
      locale: z.enum(i18n.locales).optional(),
      conversationId: z.string().min(1).max(120).optional(),
    })
    .optional(),
});
