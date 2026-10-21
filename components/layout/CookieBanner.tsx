"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { openConsentManager, writeConsent, type Consent } from "@/lib/consent";

/**
 * Bandeau cookies conforme CNIL : « Refuser » aussi visible et facile que « Accepter ».
 * Il est rendu dans le HTML et masqué par CSS dès qu'un choix existe (classe posée avant
 * l'affichage dans app/layout.tsx), pour s'afficher immédiatement sans clignotement.
 * Aucun script tiers n'est chargé tant que l'utilisateur n'a pas accepté
 * (écoutez CONSENT_EVENT ou utilisez readConsent() avant d'activer un outil de mesure).
 */
export function CookieBanner() {
  function choose(value: Consent) {
    writeConsent(value);
    document.documentElement.classList.add("consent-set");
  }

  return (
    <div
      role="region"
      aria-label="Gestion des cookies"
      className="cookie-banner fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl animate-fade-up rounded-2xl bg-nuit p-5 text-white shadow-lift ring-1 ring-white/10 sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <div className="flex gap-4">
        <Cookie aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-chantier" />
        <div>
          <p className="font-display font-semibold">Un petit mot sur les cookies</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ardoise-light">
            Nous aimerions mesurer l&apos;audience du site pour l&apos;améliorer. Rien n&apos;est
            activé sans votre accord.{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-white underline underline-offset-2"
            >
              En savoir plus
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => choose("refused")}
          className="h-11 rounded-full bg-white/10 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
        >
          Tout refuser
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="h-11 rounded-full bg-white text-sm font-semibold text-nuit transition-colors hover:bg-sable"
        >
          Tout accepter
        </button>
      </div>
    </div>
  );
}

/** Lien du footer pour rouvrir le bandeau et changer d'avis. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.classList.remove("consent-set");
        openConsentManager();
      }}
      className="hover:text-white"
    >
      Gérer les cookies
    </button>
  );
}
