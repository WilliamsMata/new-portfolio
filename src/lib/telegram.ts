import "server-only";
import { env } from "@/env";

type SendTelegramNotificationInput = {
  name: string;
  email: string;
  message: string;
};

type TelegramApiSuccess = {
  ok: true;
  result: {
    message_id: number;
  };
};

type TelegramApiFailure = {
  ok: false;
  description?: string;
  error_code?: number;
};

type TelegramApiResponse = TelegramApiSuccess | TelegramApiFailure;

const TELEGRAM_API_BASE_URL = "https://api.telegram.org";

function buildTelegramMessage({
  name,
  email,
  message,
}: SendTelegramNotificationInput) {
  return [
    "New portfolio contact",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

export async function sendTelegramNotification(
  input: SendTelegramNotificationInput,
) {
  const response = await fetch(
    `${TELEGRAM_API_BASE_URL}/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: buildTelegramMessage(input),
      }),
    },
  );

  const responseText = await response.text();

  let payload: TelegramApiResponse | null = null;

  if (responseText) {
    try {
      payload = JSON.parse(responseText) as TelegramApiResponse;
    } catch {
      payload = null;
    }
  }

  if (!response.ok || !payload?.ok) {
    const description =
      payload && !payload.ok && payload.description
        ? payload.description
        : responseText ||
          `Telegram API request failed with status ${response.status}`;

    throw new Error(description);
  }

  return payload.result.message_id;
}
