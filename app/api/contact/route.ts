import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, services } from "@/lib/schemas";
import { site } from "@/content/site";

// Limite simple anti-abus : 5 envois / 10 min par adresse IP (mémoire du serveur)
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes, réessayez plus tard." },
      { status: 429 },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Formulaire invalide." }, { status: 400 });
  }

  const data = parsed.data;
  // Robot détecté (champ piège rempli) : on répond OK sans rien envoyer
  if (data.company) return NextResponse.json({ ok: true });

  const serviceLabel = services.find((s) => s.value === data.service)?.label ?? data.service;
  const lines = [
    ["Nom", data.name],
    ["Métier", data.trade],
    ["Téléphone", data.phone],
    ["E-mail", data.email],
    ["Service", serviceLabel],
    ["Message", data.message || "—"],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // Mode placeholder : sans clé Resend, la demande est seulement affichée dans les logs du serveur
  if (!apiKey || !to) {
    console.info(
      "[contact] RESEND_API_KEY ou CONTACT_TO_EMAIL absent : demande non envoyée par e-mail.",
      Object.fromEntries(lines),
    );
    return NextResponse.json({ ok: true, mode: "placeholder" });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
      to: to.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `Nouvelle demande : ${serviceLabel} · ${data.name} (${data.trade})`,
      text: lines.map(([k, v]) => `${k} : ${v}`).join("\n"),
      html: `<h2>Nouvelle demande depuis le site</h2><table cellpadding="6">${lines
        .map(
          ([k, v]) => `<tr><td><b>${k}</b></td><td>${escape(v).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}</table>`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Échec d'envoi Resend", err);
    return NextResponse.json({ ok: false, error: "Envoi impossible." }, { status: 502 });
  }
}
