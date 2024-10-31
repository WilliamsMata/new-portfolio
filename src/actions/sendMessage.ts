"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendMessageSchema } from "@/schema/send-message.schema";
import { resend } from "@/lib/resend";
import { dayRateLimiter } from "@/lib/redis";
import { EmailTemplate } from "@/components/email/send-email-template";
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

  const ip =
    headerStore.get("x-forwarded-for") || headerStore.get("cf-connecting-ip");

  const lang = headerStore.get("accept-language")?.split(",")[0] as Locale;

  const [dictionary, { success }] = await Promise.all([
    getDictionary(lang),
    dayRateLimiter.limit(ip ?? email),
  ]);

  if (!success && dictionary?.contact.form.action.errors.limitReached) {
    return {
      error: dictionary.contact.form.action.errors.limitReached,
      getLimit: true,
    };
  } else if (!success) {
    return {
      error: "You have reached the limit of 3 emails per day",
      getLimit: true,
    };
  }

  const { data: emailData, error } = await resend.emails.send({
    from: "message@williamsmata.com",
    to: "williams.rm99@gmail.com",
    subject: `New message from ${name}`,
    react: EmailTemplate({ name, email, message }),
  });

  if (error) {
    console.error(error);
    return {
      error: "Something went wrong, please try again later",
    };
  }

  console.log({
    emailData,
    name,
    email,
    message,
  });

  return {
    success: true,
  };
}
