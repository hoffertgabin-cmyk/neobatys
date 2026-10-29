import type { ContactData } from "@/lib/schemas";

/**
 * Transmet une demande de contact au CRM de l'outil d'administration NEOBATYS
 * (contrat : POST /api/leads, docs/CONTRAT-SITE-CRM.md du dépôt neobatys-admin).
 * Sans ADMIN_LEADS_URL ou ADMIN_LEADS_SECRET, rien n'est envoyé.
 * Ne lève jamais d'erreur : un échec est seulement écrit dans les logs, sans données personnelles.
 */
export async function sendLeadToAdmin(data: ContactData, serviceLabel: string): Promise<void> {
  const url = process.env.ADMIN_LEADS_URL;
  const secret = process.env.ADMIN_LEADS_SECRET;
  if (!url || !secret) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      // Le champ piège `company` n'est jamais transmis
      body: JSON.stringify({
        name: data.name,
        trade: data.trade,
        phone: data.phone,
        email: data.email,
        service: data.service,
        serviceLabel,
        message: data.message ?? "",
        consent: true,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) console.error(`[contact] CRM : réponse ${res.status}, demande non enregistrée.`);
  } catch (err) {
    const reason = err instanceof Error ? err.name : "erreur inconnue";
    console.error(`[contact] CRM injoignable (${reason}), demande non enregistrée.`);
  }
}
