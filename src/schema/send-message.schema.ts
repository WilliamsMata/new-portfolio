import { z } from "zod";

const isValidEmail = (email: string) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo|protonmail)\.com$/;
  return emailRegex.test(email);
};

export const sendMessageSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),

  email: z
    .string({ message: "Email is required" })
    .email()
    .refine(isValidEmail, {
      message: "Invalid email address",
    }),

  message: z
    .string({ message: "Message is required" })
    .min(2, { message: "Message is too short" })
    .max(500, { message: "Message is too long" }),
});
