const WINDOW_MS = 60 * 1000;
const REQUEST_LIMIT = 10;
const MAX_TRACKED_IPS = 10_000;

interface RateLimitEntry {
  count: number;
  windowStartedAt: number;
}

const requestsByIp = new Map<string, RateLimitEntry>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestsByIp.get(ip);

  if (!entry || now - entry.windowStartedAt >= WINDOW_MS) {
    if (requestsByIp.size >= MAX_TRACKED_IPS) {
      for (const [trackedIp, trackedEntry] of requestsByIp) {
        if (now - trackedEntry.windowStartedAt >= WINDOW_MS) {
          requestsByIp.delete(trackedIp);
        }
      }

      if (requestsByIp.size >= MAX_TRACKED_IPS) {
        const oldestIp = requestsByIp.keys().next().value;
        if (oldestIp !== undefined) {
          requestsByIp.delete(oldestIp);
        }
      }
    }

    requestsByIp.set(ip, { count: 1, windowStartedAt: now });
    return false;
  }

  entry.count += 1;
  return entry.count > REQUEST_LIMIT;
}
