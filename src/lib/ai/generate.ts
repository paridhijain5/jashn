import { z } from "zod";
import {
  callGemini,
  callGroq,
  ProviderError,
  type ProviderResponse,
} from "./providers";

type ProviderSource = "gemini" | "groq";

interface Provider {
  source: ProviderSource;
  call: (prompt: string) => Promise<ProviderResponse>;
}

const providers: Provider[] = [
  { source: "gemini", call: callGemini },
  { source: "groq", call: callGroq },
];

export async function generateJson<T>(
  prompt: string,
  schema: z.ZodType<T>,
): Promise<{ data: T; source: ProviderSource } | null> {
  for (const provider of providers) {
    try {
      const response = await provider.call(prompt);
      let parsed: unknown;
      try {
        parsed = JSON.parse(response.text);
      } catch {
        console.warn(
          `[ai] provider=${provider.source} model=${response.model} status=${response.status} failed: invalid JSON`,
        );
        continue;
      }

      const result = schema.safeParse(parsed);

      if (result.success) {
        console.info(
          `[ai] provider=${provider.source} model=${response.model} status=${response.status} succeeded`,
        );
        return { data: result.data, source: provider.source };
      }

      console.warn(
        `[ai] provider=${provider.source} model=${response.model} status=${response.status} failed: schema mismatch`,
      );
    } catch (error) {
      if (error instanceof ProviderError) {
        console.warn(
          `[ai] provider=${error.provider} model=${error.model} status=${error.status ?? "unavailable"} failed`,
        );
      } else {
        console.warn(
          `[ai] provider=${provider.source} model=unknown status=unavailable failed`,
        );
      }
    }
  }

  return null;
}
