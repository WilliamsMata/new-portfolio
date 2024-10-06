import { z } from "zod";

// Función de validación personalizada para verificar si el correo es de Gmail o Hotmail
const isValidEmail = (email: string) => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const hotmailRegex = /^[a-zA-Z0-9._%+-]+@hotmail\.com$/;
  const outlookRegex = /^[a-zA-Z0-9._%+-]+@outlook\.com$/;
  const yahooRegex = /^[a-zA-Z0-9._%+-]+@yahoo\.com$/;
  const protonmailRegex = /^[a-zA-Z0-9._%+-]+@protonmail\.com$/;

  return (
    gmailRegex.test(email) ||
    hotmailRegex.test(email) ||
    outlookRegex.test(email) ||
    yahooRegex.test(email) ||
    protonmailRegex.test(email)
  );
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
