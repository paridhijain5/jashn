const INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+)?(?:the\s+)?previous\s+instructions/gi,
  /system\s+prompt/gi,
  /reveal\s+(?:your\s+)?(?:api\s+)?key/gi,
];

export function sanitizeText(value: string, maxLength: number): string {
  let sanitized = value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, "")
    .trim();

  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[filtered]");
  }

  return sanitized.slice(0, maxLength);
}
