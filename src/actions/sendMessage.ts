"use server";

import { sendMessageSchema } from "@/schema/send-message.schema";
import { z } from "zod";
import { EmailTemplate } from "@/components/email/send-email-template";
import { resend } from "@/lib/resend";
import { dayRateLimiter } from "@/lib/redis";
import { headers } from "next/headers";

type Input = z.infer<typeof sendMessageSchema>;

export async function sendMessage(data: Input) {
  const result = sendMessageSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = result.data;

  const ip =
    headers().get("x-forwarded-for") || headers().get("cf-connecting-ip");

  const { success } = await dayRateLimiter.limit(ip ?? email);

  if (!success) {
    return {
      errors: "You have reached the limit of 3 emails per day",
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
      errors: error.message,
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
