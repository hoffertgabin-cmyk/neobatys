import { MapPin, Phone, Star } from "lucide-react";
import { BrowserMockup } from "./BrowserMockup";

/** Aperçu d'un site d'artisan, entièrement dessiné en code (aucune image). */
export function SiteMockup({ className }: { className?: string }) {
  return (
    <BrowserMockup className={className} url="plomberie-votre-ville.fr">
      <div aria-hidden="true" className="text-nuit select-none">
        {/* Barre de navigation */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="size-5 rounded-md bg-sky-700" />
            <span className="text-[11px] font-bold">Votre Entreprise</span>
          </div>
          <div className="hidden gap-3 text-[9px] text-ardoise-dark sm:flex">
            <span>Services</span>
            <span>Réalisations</span>
            <span>Avis</span>
          </div>
          <span className="rounded-full bg-sky-700 px-2.5 py-1 text-[9px] font-semibold text-white">
            Devis gratuit
          </span>
        </div>
        {/* Hero */}
        <div className="relative mx-3 overflow-hidden rounded-xl bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 px-5 py-6 text-white">
          <div className="absolute inset-0 bg-blueprint-dark opacity-60" />
          <div className="relative">
            <p className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[8px]">
              <MapPin className="size-2.5" /> Votre ville et alentours
            </p>
            <p className="mt-2 text-[15px] leading-tight font-bold">
              Votre plombier
              <br />
              disponible 7j/7
            </p>
            <p className="mt-1.5 max-w-[70%] text-[9px] text-white/75">
              Dépannage, rénovation de salle de bain, chauffe-eau.
            </p>
            <div className="mt-3 flex gap-1.5">
              <span className="rounded-full bg-chantier px-2.5 py-1 text-[9px] font-semibold text-nuit">
                Demander un devis
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[9px]">
                <Phone className="size-2.5" /> Appeler
              </span>
            </div>
          </div>
        </div>
        {/* Avis + avant / après */}
        <div className="grid grid-cols-3 gap-2 p-3">
          <div className="col-span-1 rounded-lg bg-sable p-2.5">
            <div className="flex gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-2.5 fill-current" />
              ))}
            </div>
            <p className="mt-1 text-[13px] font-bold">4,9/5</p>
            <p className="text-[8px] text-ardoise-dark">Avis Google</p>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-1.5">
            <div className="rounded-lg bg-gradient-to-br from-stone-300 to-stone-400 p-1.5">
              <span className="rounded bg-white/80 px-1 text-[7px] font-semibold">Avant</span>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-sky-200 to-sky-400 p-1.5">
              <span className="rounded bg-white/80 px-1 text-[7px] font-semibold">Après</span>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}
