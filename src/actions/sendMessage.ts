/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { sendMessageSchema } from "@/schema/send-message.schema";
import { z } from "zod";
import { EmailTemplate } from "@/components/email/send-email-template";
import { resend } from "@/lib/resend";
import { dayRateLimiter, oneHourRateLimiter } from "@/lib/redis";
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

  if (ip) {
    const { success: oneHourIpSuccess } = await oneHourRateLimiter.limit(ip);
    if (!oneHourIpSuccess) {
      return {
        errors: "You have reached the limit of emails per hour by IP address",
      };
    }
  } else {
    const { success: oneHourSuccess } = await oneHourRateLimiter.limit(email);

    if (!oneHourSuccess) {
      return {
        errors:
          "You have reached the limit of emails per hour by email address",
      };
    }
  }

  if (ip) {
    const { success: dayIpSuccess } = await dayRateLimiter.limit(ip);

    if (!dayIpSuccess) {
      return {
        errors: "You have reached the limit of 3 emails per day by IP address",
      };
    }
  } else {
    const { success: daySuccess } = await dayRateLimiter.limit(email);

    if (!daySuccess) {
      return {
        errors:
          "You have reached the limit of 3 emails per day by email address",
      };
    }
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
