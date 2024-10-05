/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { sendMessageSchema } from "@/schema/send-message.schema";
import { z } from "zod";
import { EmailTemplate } from "@/components/email/send-email-template";
import { resend } from "@/lib/resend";

type Input = z.infer<typeof sendMessageSchema>;

export async function sendMessage(data: Input) {
  const result = sendMessageSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = result.data;

  try {
    const { data, error } = await resend.emails.send({
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
      data,
      name,
      email,
      message,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      errors: error.message,
    };
  }
}
