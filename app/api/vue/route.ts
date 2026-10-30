import { z } from "zod";

const viewSchema = z.object({ path: z.string().startsWith("/").max(200) });
const BOTS = /bot|crawl|spider|slurp|preview|lighthouse|headless/i;

/**
 * Relaie une page vue vers l'admin, qui ne garde qu'un total par jour et par page.
 * Sans ADMIN_LEADS_URL ou ADMIN_LEADS_SECRET, rien n'est envoyé. Une erreur ne gêne jamais le visiteur.
 */
export async function POST(request: Request) {
  const url = process.env.ADMIN_LEADS_URL;
  const secret = process.env.ADMIN_LEADS_SECRET;
  const parsed = viewSchema.safeParse(await request.json().catch(() => null));
  if (url && secret && parsed.success && !BOTS.test(request.headers.get("user-agent") ?? "")) {
    await fetch(new URL("/api/vues", url), {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({ path: parsed.data.path }),
      signal: AbortSignal.timeout(3000),
    }).catch((err) => console.error("[vues] Envoi impossible", err));
  }
  return new Response(null, { status: 204 });
}
