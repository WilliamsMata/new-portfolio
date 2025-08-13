import { z } from "zod";

export const sendMessageSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),

  email: z.string({ message: "Email is required" }).email(),

  message: z
    .string({ message: "Message is required" })
    .min(2, { message: "Message is too short" })
    .max(500, { message: "Message is too long" }),
});
