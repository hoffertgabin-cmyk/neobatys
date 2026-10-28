import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { faqAssistantSchema } from "@/lib/schemas";
import { systemPrompt } from "@/lib/faq-assistant";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

// Limite anti-abus (et anti-facture) : 10 questions / 10 min par adresse IP
const rateLimited = createRateLimiter({ max: 10, windowMs: 10 * 60 * 1000 });

const UNAVAILABLE =
  "L'assistant n'est pas disponible pour le moment. Posez-nous votre question via la page contact, on vous répond sous 24 h ouvrées.";

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Trop de questions d'affilée, réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = faqAssistantSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Question invalide." },
      { status: 400 },
    );
  }
  // Robot détecté (champ piège rempli) : on ne dépense rien
  if (parsed.data.company) return NextResponse.json({ ok: true, answer: UNAVAILABLE });

  // La clé reste côté serveur : elle n'est jamais envoyée au navigateur
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.info("[faq-assistant] ANTHROPIC_API_KEY absent : assistant désactivé.");
    return NextResponse.json({ ok: false, error: UNAVAILABLE }, { status: 503 });
  }

  try {
    const client = new Anthropic({ apiKey, timeout: 30_000, maxRetries: 1 });
    const response = await client.beta.messages.create({
      model: process.env.FAQ_ASSISTANT_MODEL || "claude-opus-5-5",
      max_tokens: 4000,
      output_config: { effort: "low" },
      // Si le modèle décline une question, l'API la confie automatiquement à un autre modèle
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: systemPrompt(),
      messages: [{ role: "user", content: parsed.data.question }],
    });

    const answer = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (response.stop_reason === "refusal" || !answer) {
      return NextResponse.json({
        ok: true,
        answer:
          "Je ne peux pas répondre à cette question ici. Écrivez-nous via la page contact, on vous répondra directement.",
      });
    }
    return NextResponse.json({ ok: true, answer });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      console.warn("[faq-assistant] Limite de l'API atteinte", err.message);
    } else if (err instanceof Anthropic.AuthenticationError) {
      console.error("[faq-assistant] Clé ANTHROPIC_API_KEY refusée");
    } else {
      console.error("[faq-assistant] Échec de l'appel à l'API", err);
    }
    return NextResponse.json({ ok: false, error: UNAVAILABLE }, { status: 502 });
  }
}
