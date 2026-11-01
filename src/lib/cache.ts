import { createHash } from "node:crypto";
import type { PlanResult } from "./schemas";

const CACHE_TTL_MS = 60 * 60 * 1000;
const MAX_CACHE_ENTRIES = 100;

interface CacheEntry {
  value: PlanResult;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

export function getCacheKey(sanitizedInput: unknown): string {
  return createHash("sha256")
    .update(JSON.stringify(sanitizedInput))
    .digest("hex");
}

export function getCachedPlan(key: string): PlanResult | null {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }

  if (entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }

  cache.delete(key);
  cache.set(key, entry);
  return entry.value;
}

export function setCachedPlan(key: string, value: PlanResult): void {
  const now = Date.now();

  for (const [entryKey, entry] of cache) {
    if (entry.expiresAt <= now) {
      cache.delete(entryKey);
    }
  }

  cache.delete(key);
  cache.set(key, { value, expiresAt: now + CACHE_TTL_MS });

  while (cache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey === undefined) {
      break;
    }
    cache.delete(oldestKey);
  }
}
