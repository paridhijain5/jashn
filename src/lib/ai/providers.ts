interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

interface GroqResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export interface ProviderResponse {
  text: string;
  model: string;
  status: number;
}

export class ProviderError extends Error {
  constructor(
    readonly provider: "gemini" | "groq",
    readonly model: string,
    readonly status?: number,
  ) {
    super(`${provider} request failed`);
    this.name = "ProviderError";
  }
}

const GEMINI_FALLBACK_MODELS = ["gemini-3.7-flash", "gemini-3.6-flash"];

export async function callGemini(prompt: string): Promise<ProviderResponse> {
  const configuredModel =
    process.env.GEMINI_MODEL?.trim() || "gemini-3.8-flash";
  const models = [...new Set([configuredModel, ...GEMINI_FALLBACK_MODELS])];
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new ProviderError("gemini", configuredModel);
  }

  for (const [index, model] of models.entries()) {
    const url = new URL(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    );
    url.searchParams.set("key", apiKey);

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      throw new ProviderError("gemini", model);
    }

    if (!response.ok) {
      if (
        (response.status === 404 || response.status === 429) &&
        index < models.length - 1
      ) {
        console.warn(
          `[ai] provider=gemini model=${model} status=${response.status} failed`,
        );
        continue;
      }
      throw new ProviderError("gemini", model, response.status);
    }

    let payload: GeminiResponse;
    try {
      payload = (await response.json()) as GeminiResponse;
    } catch {
      throw new ProviderError("gemini", model, response.status);
    }

    const text = payload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!text) {
      throw new ProviderError("gemini", model, response.status);
    }

    return { text, model, status: response.status };
  }

  throw new ProviderError(
    "gemini",
    models[models.length - 1],
    404,
  );
}

export async function callGroq(prompt: string): Promise<ProviderResponse> {
  const model = process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile";
  const apiKey = process.env.GROQ_API_KEY?.trim();

  if (!apiKey) {
    throw new ProviderError("groq", model);
  }

  let response: Response;
  try {
    response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    throw new ProviderError("groq", model);
  }

  if (!response.ok) {
    throw new ProviderError("groq", model, response.status);
  }

  let payload: GroqResponse;
  try {
    payload = (await response.json()) as GroqResponse;
  } catch {
    throw new ProviderError("groq", model, response.status);
  }

  const text = payload.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new ProviderError("groq", model, response.status);
  }

  return { text, model, status: response.status };
}
