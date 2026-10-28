/**
 * Limite simple anti-abus par adresse IP (mémoire du serveur).
 * Chaque appel à createRateLimiter crée sa propre table : une route n'entame pas le quota d'une autre.
 */
export function createRateLimiter({ max, windowMs }: { max: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function rateLimited(ip: string) {
    const now = Date.now();
    // Purge des IP inactives pour que la table ne grossisse pas indéfiniment
    if (hits.size > 1000) {
      for (const [key, times] of hits)
        if (now - times[times.length - 1] >= windowMs) hits.delete(key);
    }
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > max;
  };
}

export const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
