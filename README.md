# Jashn

Jashn is an offline-first celebration command center for weddings, birthdays,
community events, and more. Build a practical plan, then adjust the details as
the guest list and budget change.

## What it does

- Suggests themes, decor, food, music, and activities from built-in English,
  Hindi, and Hinglish templates.
- Allocates budgets by event type and shows per-guest costs as you adjust
  sliders.
- Builds a reverse timeline with real calendar dates and exports reminders as
  an `.ics` calendar file.
- Provides venue, caterer, photographer, DJ, and decorator checklists,
  questions, red flags, and ready-to-copy inquiry drafts.
- Creates rule-based Plan B steps for rain, a cancelled caterer, a guest surge,
  budget cuts, and venue changes.
- Downloads a plan as PDF and supports an English/Hindi interface toggle.
- Starts with presets for a wedding sangeet, birthday, and Diwali community
  mela.

## Run locally

Requirements: Node.js and npm.

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The planning tools work
without API keys.

## Optional AI enhancement

The local rules and templates are the primary plan and always work offline.
When the user submits the form, `/api/plan` may enhance the ideas with Gemini,
then Groq. Missing keys, provider errors, invalid JSON, and invalid AI output
leave the static ideas in place. The interface labels the current ideas as
“AI-enhanced” or “Smart templates”.

To enable AI locally, copy `.env.example` to `.env.local` and add keys obtained
from the respective providers:

```env
GEMINI_API_KEY=
GROQ_API_KEY=
GEMINI_MODEL=gemini-3.8-flash
GROQ_MODEL=
```

Keys are server-only environment variables. Do not commit `.env.local` or put
provider keys in client-side code. Gemini tries the configured model (default
`gemini-3.8-flash`) and then `gemini-3.7-flash` and `gemini-3.6-flash` on HTTP
404 or 429 responses.

## Checks

```powershell
npm run lint
npm test
npm run build
```

Vitest covers event and plan schemas, budget allocations, timeline dates and
calendar export, and crisis scenarios.

## Security and privacy

- API keys are read from server environment variables and are never included in
  responses or logs.
- API request bodies are validated with Zod; text fields are sanitized before
  being used in an AI prompt.
- The planning page does not require an account or send data anywhere unless
  optional AI is configured and the user submits a plan.
- API requests are rate-limited in memory. In-memory limits and caching are
  process-local and are not shared across serverless instances.
- Budget allocations and timelines are deterministic code, not AI output.
