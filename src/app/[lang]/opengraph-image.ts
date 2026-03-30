import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Williams Mata logo";
export const size = {
  width: 1920,
  height: 1080,
};
export const contentType = "image/png";

export default async function Image() {
  const image = await readFile(
    join(process.cwd(), "src", "app", "[lang]", "resources", "social-card.png"),
  );

  return new Response(Uint8Array.from(image), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, immutable, no-transform, max-age=31536000",
    },
  });
}
