"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { dayRateLimiter } from "@/lib/redis";
import { sendTelegramNotification } from "@/lib/telegram";
import { sendMessageSchema } from "@/schema/send-message.schema";
import type { Locale } from "@/i18n/i18n-config";
import { getDictionary } from "@/i18n/getDictionary";

type Input = z.infer<typeof sendMessageSchema>;

export async function sendMessage(data: Input) {
  const result = sendMessageSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.message,
    };
  }

  const { name, email, message } = result.data;

  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    headerStore.get("cf-connecting-ip") ||
    null;

  const rawAccept = headerStore.get("accept-language")?.split(",")[0] ?? "en";
  const locale: Locale = rawAccept.split("-")[0] === "es" ? "es" : "en";

  const [dictionary, { success }] = await Promise.all([
    getDictionary(locale),
    dayRateLimiter.limit(ip ?? email),
  ]);

  if (!success) {
    return {
      error: dictionary.contact.form.action.errors.limitReached,
      getLimit: true,
    };
  }

  try {
    await sendTelegramNotification({
      name,
      email,
      message,
    });
  } catch (error) {
    console.error(error);
    return {
      error: dictionary.contact.form.action.errors.notificationError,
    };
  }

  return {
    success: true,
  };
}
