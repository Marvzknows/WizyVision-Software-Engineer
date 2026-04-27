import { GoogleGenAI } from "@google/genai";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) return err("Server is missing GEMINI_API_KEY.", 500);

  const ai = new GoogleGenAI({ apiKey });
  const form = await request.formData().catch(() => null);
  if (!form) return err("Request must be multipart/form-data.", 400);

  const image = form.get("image");
  const question = (form.get("question") as string)?.trim();

  if (!(image instanceof File)) return err("Missing image file.", 400);
  if (!question) return err("Question cannot be empty.", 400);
  if (question.length > 1000)
    return err("Question exceeds 1000 characters.", 400);
  if (!["image/jpeg", "image/png"].includes(image.type))
    return err("Only JPEG or PNG accepted.", 415);
  if (image.size > 5 * 1024 * 1024) return err("Image exceeds 5 MB.", 413);

  const data = Buffer.from(await image.arrayBuffer()).toString("base64");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { inlineData: { mimeType: image.type, data } },
            { text: question },
          ],
        },
      ],
    });

    const answer = response.text?.trim();
    if (!answer) return err("Model returned an empty response.", 502);

    return Response.json({ answer });
  } catch (e) {
    return err(
      `Gemini request failed: ${e instanceof Error ? e.message : e}`,
      502,
    );
  }
}

function err(error: string, status: number) {
  return Response.json({ error }, { status });
}
