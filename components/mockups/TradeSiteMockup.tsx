import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  Axe,
  Bath,
  Bell,
  BrickWall,
  CalendarCheck,
  Check,
  Droplets,
  FileText,
  Flame,
  Globe,
  Grid2x2,
  Hammer,
  House,
  LayoutDashboard,
  Lightbulb,
  MapPin,
  MessageCircle,
  PaintRoller,
  Phone,
  Plug,
  Send,
  Siren,
  Sparkles,
  Star,
  Thermometer,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Project, TradeMockup } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Maquettes de sites d'artisans, dessinées en code à la taille fixe
 * MOCKUP_WIDTH × MOCKUP_HEIGHT puis mises à l'échelle par ScaledCanvas.
 * Les couleurs viennent du `theme` du projet via des variables CSS :
 * --p (principale), --op (texte sur principale), --d (sombre), --s (clair), --a (appoint).
 */
export const MOCKUP_WIDTH = 720;
export const MOCKUP_HEIGHT = 540;

const icons: Record<TradeMockup, LucideIcon> = {
  plombier: Wrench,
  electricien: Zap,
  macon: BrickWall,
  menuisier: Hammer,
  couvreur: House,
  peintre: PaintRoller,
  chauffagiste: Flame,
  carreleur: Grid2x2,
  charpentier: Axe,
};

const navLinks: Record<TradeMockup, string[]> = {
  plombier: ["Dépannage", "Salle de bain", "Avis"],
  electricien: ["Services", "Réalisations", "Devis"],
  macon: ["Prestations", "Galerie", "Contact"],
  menuisier: ["Catalogue", "Atelier", "Contact"],
  couvreur: [],
  peintre: [],
  chauffagiste: ["Entretien", "Installation", "Contrats"],
  carreleur: ["Prestations", "Estimation", "Galerie"],
  charpentier: ["Charpente", "Ossature bois", "Contact"],
};

const ctaLabels: Record<TradeMockup, string> = {
  plombier: "Urgence 7j/7",
  electricien: "Devis gratuit",
  macon: "Demander un devis",
  menuisier: "Votre projet",
  couvreur: "",
  peintre: "Devis gratuit",
  chauffagiste: "Prendre rendez-vous",
  carreleur: "Estimer mon chantier",
  charpentier: "Demander un devis",
};

function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex gap-0.5 text-amber-400", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3 fill-current" />
      ))}
    </span>
  );
}

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
        className,
      )}
    >
      {children}
    </p>
  );
}

function Field({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-nuit/70">{label}</p>
      <p
        className={cn(
          "mt-1 rounded-lg bg-white px-3 py-2 text-[11px] text-nuit ring-1",
          active ? "ring-2 ring-(--p)" : "ring-nuit/10",
        )}
      >
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- Plombier */

function Plombier({ p }: { p: Project }) {
  return (
    <>
      <div className="flex items-center justify-center gap-2 bg-(--d) py-2 text-[11px] font-medium text-white">
        <Siren className="size-3.5 text-(--a)" />
        Fuite, panne d&apos;eau chaude ? Intervention sous 2 h, 7j/7
      </div>
      <div className="grid grid-cols-[1.15fr_1fr] gap-6 bg-(--s) px-8 pt-6 pb-5">
        <div>
          <Eyebrow className="bg-white text-(--p) ring-1 ring-(--p)/15">
            <MapPin className="size-3" /> Plombier à {p.city} et alentours
          </Eyebrow>
          <p className="mt-4 font-display text-[34px] leading-[1.05] font-bold tracking-tight text-(--d)">
            Une fuite ?
            <br />
            On arrive vite.
          </p>
          <p className="mt-3 max-w-[300px] text-[12px] leading-relaxed text-nuit/65">
            Dépannage, rénovation de salle de bain et chauffe-eau. Devis clair avant toute
            intervention.
          </p>
          <div className="mt-5 flex gap-2">
            <Pill className="bg-(--p) text-(--op)">
              <Siren className="size-3.5" /> Dépannage urgent
            </Pill>
            <Pill className="bg-white text-(--d) ring-1 ring-nuit/10">
              <Phone className="size-3.5" /> 03 87 XX XX XX
            </Pill>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Stars />
            <span className="text-[11px] font-semibold text-nuit">4,9/5</span>
            <span className="text-[10px] text-nuit/55">· Avis Google</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-[0_20px_40px_-16px_rgb(3_105_161/0.35)] ring-1 ring-nuit/5">
          <p className="flex items-center gap-1.5 text-[13px] font-bold text-(--d)">
            <Droplets className="size-4 text-(--p)" /> Demande de dépannage
          </p>
          <p className="mt-3 text-[10px] font-semibold text-nuit/70">Type de problème</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {["Fuite", "WC bouché", "Chauffe-eau", "Autre"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  i === 0 ? "bg-(--p) text-(--op)" : "bg-(--s) text-nuit/70",
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 space-y-2.5">
            <Field label="Adresse" value="12 rue …, [Ville]" />
            <Field label="Quand ?" value="Aujourd'hui, dès que possible" active />
          </div>
          <p className="mt-3.5 flex items-center justify-center gap-1.5 rounded-xl bg-(--d) py-2.5 text-[11px] font-semibold text-white">
            <Send className="size-3.5" /> Envoyer la demande
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 px-8 py-4">
        {[
          { I: Droplets, t: "Dépannage", d: "Fuites, canalisations" },
          { I: Bath, t: "Salle de bain", d: "Rénovation complète" },
          { I: Thermometer, t: "Chauffe-eau", d: "Pose et entretien" },
        ].map(({ I, t, d }) => (
          <div key={t} className="flex items-center gap-3 rounded-xl p-3 ring-1 ring-nuit/8">
            <span className="grid size-9 place-items-center rounded-lg bg-(--s) text-(--p)">
              <I className="size-4.5" />
            </span>
            <span>
              <span className="block text-[12px] font-bold text-nuit">{t}</span>
              <span className="block text-[10px] text-nuit/55">{d}</span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------- Électricien */

function Electricien() {
  return (
    <>
      <div className="relative overflow-hidden bg-(--d) px-8 pt-10 pb-10 text-white">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-20 -right-10 size-64 rounded-full bg-(--p)/25 blur-3xl" />
        <div className="relative grid grid-cols-[1fr_1.2fr] items-center gap-6">
          <div>
            <Eyebrow className="bg-(--p)/15 text-(--p)">
              <Zap className="size-3" /> Électricien certifié
            </Eyebrow>
            <p className="mt-4 font-display text-[30px] leading-[1.08] font-bold tracking-tight">
              Du dépannage à la <span className="text-(--p)">rénovation complète</span>
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-white/65">
              Mise aux normes, tableau électrique, bornes de recharge et domotique.
            </p>
            <Pill className="mt-5 bg-(--p) text-(--op)">
              Demander un devis <ArrowRight className="size-3.5" />
            </Pill>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex-1 rounded-xl bg-white p-3 text-nuit">
              <p className="text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                Formulaire du site
              </p>
              <p className="mt-1.5 text-[11px] font-bold">Mise aux normes du tableau</p>
              <p className="mt-1 text-[10px] text-nuit/60">Maison 110 m² · [Ville]</p>
              <p className="mt-2.5 rounded-md bg-(--s) px-2 py-1.5 text-[10px] text-nuit/70">
                « Disjoncteur qui saute souvent »
              </p>
            </div>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--p) text-(--op)">
              <ArrowRight className="size-4" />
            </span>
            <div className="flex-1 rounded-xl bg-white p-3 text-nuit">
              <p className="flex items-center gap-1 text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                <FileText className="size-3" /> Logiciel
              </p>
              <p className="mt-1.5 text-[11px] font-bold">Devis n° 2026-118</p>
              <div className="mt-2 space-y-1 text-[10px] text-nuit/65">
                <p className="flex justify-between">
                  <span>Tableau 13 mod.</span>
                  <span>640 €</span>
                </p>
                <p className="flex justify-between">
                  <span>Main d&apos;œuvre</span>
                  <span>380 €</span>
                </p>
              </div>
              <p className="mt-2 flex justify-between border-t border-nuit/10 pt-1.5 text-[11px] font-bold">
                <span>Total HT</span>
                <span>1 020 €</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-8 py-5">
        {[
          { I: Zap, t: "Mise aux normes" },
          { I: Plug, t: "Bornes de recharge" },
          { I: Lightbulb, t: "Éclairage et domotique" },
        ].map(({ I, t }) => (
          <div
            key={t}
            className="flex flex-1 items-center gap-2.5 rounded-xl bg-(--s) p-3 ring-1 ring-(--p)/30"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-(--d) text-(--p)">
              <I className="size-4" />
            </span>
            <span className="text-[12px] font-bold text-nuit">{t}</span>
          </div>
        ))}
      </div>
      <p className="mx-8 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-[11px] font-semibold text-emerald-800">
        <Check className="size-3.5" /> Chaque demande du site arrive directement dans le logiciel de
        devis
      </p>
    </>
  );
}

/* ------------------------------------------------------------------- Maçon */

/** Appareillage de briques décalées, joints de la couleur donnée. */
const bricks = (joint: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='28'><path d='M0 .5H56M0 14.5H56M.5 0V14M28.5 14V28' stroke='${joint}' stroke-width='2' fill='none'/></svg>`,
  )}")`;
const stone = bricks("rgba(0,0,0,0.12)");

function Macon() {
  return (
    <div className="bg-(--s) px-8 pt-6 pb-6">
      <div className="flex items-end justify-between">
        <div>
          <Eyebrow className="bg-white text-(--p) ring-1 ring-nuit/10">
            Maçonnerie et rénovation
          </Eyebrow>
          <p className="mt-3 font-display text-[28px] leading-[1.08] font-bold tracking-tight text-(--d)">
            Nos chantiers, avant et après
          </p>
        </div>
        <div className="flex gap-1.5">
          {["Tous", "Façades", "Murets", "Terrasses"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-3 py-1.5 text-[10px] font-semibold",
                i === 1 ? "bg-(--d) text-white" : "bg-white text-nuit/65 ring-1 ring-nuit/10",
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-5 h-[230px] overflow-hidden rounded-2xl ring-1 ring-nuit/10">
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{ backgroundColor: "#a8a29e", backgroundImage: stone }}
        >
          <svg className="absolute inset-0 size-full" viewBox="0 0 330 230" fill="none">
            <path
              d="M60 20 L80 70 L68 110 L95 160 L84 230"
              stroke="#57534e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M210 0 L200 50 L222 90" stroke="#57534e" strokeWidth="2" />
            <rect x="140" y="120" width="70" height="40" fill="#78716c" opacity="0.5" />
          </svg>
          <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-nuit">
            Avant
          </span>
        </div>
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{
            backgroundColor: "#e3c9a8",
            backgroundImage: bricks("rgba(255,255,255,0.85)"),
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-10 bg-(--p)/80" />
          <span className="absolute top-3 right-3 rounded-md bg-(--d) px-2 py-0.5 text-[10px] font-bold text-white">
            Après
          </span>
        </div>
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-white" />
        <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-(--d) shadow-lg">
          <span className="text-[14px] font-bold">⇆</span>
        </span>
        <p className="absolute bottom-3 left-3 rounded-lg bg-(--d)/85 px-3 py-1.5 text-[11px] font-semibold text-white">
          Ravalement de façade · [Ville]
        </p>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {[
          { t: "Muret en pierre", c: "#d6d3d1" },
          { t: "Terrasse béton", c: "#e7e5e4" },
          { t: "Extension", c: "#e9d5bd" },
          { t: "Escalier extérieur", c: "#d8c3a5" },
        ].map(({ t, c }) => (
          <div key={t} className="overflow-hidden rounded-xl bg-white ring-1 ring-nuit/8">
            <div className="h-14" style={{ backgroundColor: c, backgroundImage: stone }} />
            <p className="px-2.5 py-2 text-[10px] font-semibold text-nuit">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Menuisier */

const wood = (base: string) => ({
  backgroundColor: base,
  backgroundImage:
    "repeating-linear-gradient(90deg, rgb(255 255 255/0.07) 0 2px, transparent 2px 9px), repeating-linear-gradient(90deg, rgb(0 0 0/0.08) 0 1px, transparent 1px 23px), linear-gradient(180deg, rgb(255 255 255/0.12), transparent)",
});

function Menuisier() {
  const items = [
    { t: "Escaliers", c: "#b7793f", shape: "stairs" },
    { t: "Cuisines", c: "#c9925a", shape: "kitchen" },
    { t: "Dressings", c: "#a86b34", shape: "doors" },
    { t: "Portes", c: "#8a5527", shape: "door" },
    { t: "Bibliothèques", c: "#bf8547", shape: "shelves" },
    { t: "Terrasses bois", c: "#9c6431", shape: "deck" },
  ] as const;
  return (
    <div className="bg-(--s) px-8 pt-5 pb-5">
      <div className="grid grid-cols-[1fr_auto] items-end gap-6">
        <div>
          <Eyebrow className="bg-(--p)/10 text-(--p)">Atelier de menuiserie · {"[Ville]"}</Eyebrow>
          <p className="mt-3 font-display text-[27px] leading-[1.05] font-bold tracking-tight text-(--d)">
            Sur mesure, de l&apos;atelier à chez vous
          </p>
        </div>
        <p className="max-w-[190px] text-right text-[11px] leading-relaxed text-nuit/60">
          Bois massif, finitions à la main, pose comprise.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {items.map(({ t, c, shape }) => (
          <div key={t} className="overflow-hidden rounded-xl bg-white ring-1 ring-(--p)/15">
            <div className="relative h-[78px]" style={wood(c)}>
              {shape === "stairs" && (
                <div className="absolute right-4 bottom-0 flex items-end">
                  {[14, 28, 42, 56].map((h) => (
                    <span key={h} className="w-7 bg-(--d)/45" style={{ height: h }} />
                  ))}
                </div>
              )}
              {shape === "kitchen" && (
                <div className="absolute inset-x-4 bottom-3 grid grid-cols-4 gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="h-10 rounded-sm bg-white/30 ring-1 ring-(--d)/30" />
                  ))}
                </div>
              )}
              {shape === "doors" && (
                <div className="absolute inset-x-6 inset-y-3 grid grid-cols-3 gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className="rounded-sm ring-1 ring-(--d)/40" />
                  ))}
                </div>
              )}
              {shape === "door" && (
                <span className="absolute inset-y-3 left-1/2 w-12 -translate-x-1/2 rounded-t-md ring-2 ring-(--d)/40">
                  <span className="absolute top-1/2 right-1.5 size-1.5 rounded-full bg-amber-200" />
                </span>
              )}
              {shape === "shelves" && (
                <div className="absolute inset-x-6 inset-y-3 flex flex-col justify-between">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className="h-1.5 rounded-sm bg-(--d)/40" />
                  ))}
                </div>
              )}
              {shape === "deck" && (
                <div className="absolute inset-0 flex flex-col justify-evenly">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="h-px bg-(--d)/40" />
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[12px] font-bold text-nuit">{t}</span>
              <span className="text-[10px] font-semibold text-(--p)">Voir →</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-(--d) px-4 py-2.5 text-white">
        <span className="text-[12px] font-semibold">Un projet sur mesure ? Parlons-en.</span>
        <Pill className="bg-(--a) py-1.5 text-(--d)">Demander un devis</Pill>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Couvreur */

function Couvreur() {
  const rows = [
    { c: "Réfection toiture 120 m²", a: "18 400 €", s: "Signé", k: "ok" },
    { c: "Remplacement gouttières", a: "2 350 €", s: "Relance J+3", k: "wait" },
    { c: "Démoussage et hydrofuge", a: "1 680 €", s: "Envoyé", k: "sent" },
    { c: "Pose de 2 fenêtres de toit", a: "3 900 €", s: "Relance J+7", k: "wait" },
    { c: "Réparation faîtage", a: "960 €", s: "Signé", k: "ok" },
    { c: "Isolation des combles", a: "6 200 €", s: "Envoyé", k: "sent" },
    { c: "Zinguerie et noues", a: "2 780 €", s: "Relance J+3", k: "wait" },
  ] as const;
  const tone = {
    ok: "bg-emerald-100 text-emerald-800",
    wait: "bg-amber-100 text-amber-800",
    sent: "bg-slate-200 text-slate-700",
  };
  return (
    <div className="flex h-full">
      <aside className="flex w-[64px] flex-col items-center gap-4 bg-(--d) py-5">
        <span className="grid size-9 place-items-center rounded-lg bg-(--a) text-white">
          <House className="size-4.5" />
        </span>
        {[LayoutDashboard, FileText, Users, Bell].map((I, i) => (
          <span
            key={i}
            className={cn(
              "grid size-9 place-items-center rounded-lg",
              i === 1 ? "bg-white/15 text-white" : "text-white/45",
            )}
          >
            <I className="size-4" />
          </span>
        ))}
      </aside>
      <div className="flex-1 bg-(--s) px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-nuit/50">Votre Couverture · Logiciel</p>
            <p className="font-display text-[20px] font-bold text-(--d)">Devis en cours</p>
          </div>
          <Pill className="bg-(--a) py-1.5 text-white">+ Nouveau devis</Pill>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { l: "Devis envoyés ce mois", v: "14" },
            { l: "Signés", v: "9" },
            { l: "Relances automatiques", v: "5" },
          ].map(({ l, v }) => (
            <div key={l} className="rounded-xl bg-white p-3 ring-1 ring-nuit/8">
              <p className="text-[10px] text-nuit/55">{l}</p>
              <p className="mt-1 font-display text-[22px] font-bold text-(--d)">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-[1.45fr_1fr] gap-3">
          <div className="rounded-xl bg-white ring-1 ring-nuit/8">
            {rows.map((r, i) => (
              <div
                key={r.c}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5",
                  i > 0 && "border-t border-nuit/6",
                )}
              >
                <FileText className="size-3.5 shrink-0 text-(--p)/60" />
                <span className="flex-1 truncate text-[11px] font-semibold text-nuit">{r.c}</span>
                <span className="text-[11px] text-nuit/70">{r.a}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold", tone[r.k])}>
                  {r.s}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="rounded-xl bg-(--d) p-3.5 text-white">
              <p className="flex items-center gap-1.5 text-[11px] font-bold">
                <Bell className="size-3.5 text-(--a)" /> Relance envoyée automatiquement
              </p>
              <p className="mt-2 rounded-lg bg-white/10 p-2.5 text-[10px] leading-relaxed text-white/80">
                « Bonjour, avez-vous pu consulter notre devis pour vos gouttières ? Nous restons
                disponibles pour en parler. »
              </p>
            </div>
            <div className="rounded-xl bg-white p-3.5 ring-1 ring-nuit/8">
              <p className="text-[10px] text-nuit/55">Taux de signature</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-(--s)">
                <span className="block h-full w-[64%] rounded-full bg-(--a)" />
              </div>
              <p className="mt-1.5 text-[11px] font-bold text-(--d)">64 %</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Peintre */

const swatches = ["#f5efe6", "#e8d5c4", "#c7d2c0", "#9fb4c7", "#5b6b8c", "#2f3e46"];

function Peintre({ p }: { p: Project }) {
  return (
    <>
      <div className="flex gap-0">
        {["Prestations", "Nuancier", "Réalisations", "Avis", "Contact"].map((t, i) => (
          <span
            key={t}
            className={cn(
              "flex-1 border-b-2 py-2 text-center text-[10px] font-semibold",
              i === 1 ? "border-(--p) text-(--p)" : "border-nuit/8 text-nuit/45",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-[1.2fr_1fr] gap-6 px-8 pt-7">
        <div>
          <Eyebrow className="bg-(--s) text-(--p)">Peintre en bâtiment · {p.city}</Eyebrow>
          <p className="mt-3 font-display text-[30px] leading-[1.05] font-bold tracking-tight text-(--d)">
            Intérieur, extérieur,
            <br />
            <span className="bg-linear-to-r from-(--p) to-(--a) bg-clip-text text-transparent">
              finitions soignées
            </span>
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-nuit/60">
            Peinture, enduits, papier peint et ravalement. Protection des sols et chantier propre.
          </p>
          <p className="mt-5 text-[10px] font-semibold tracking-wide text-nuit/50 uppercase">
            Le nuancier de la saison
          </p>
          <div className="mt-2 flex gap-2">
            {swatches.map((c, i) => (
              <span
                key={c}
                className={cn(
                  "h-16 flex-1 rounded-lg ring-1 ring-nuit/10",
                  i === 3 && "ring-2 ring-(--p) ring-offset-2",
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="mt-5 flex items-center gap-4">
            <Pill className="bg-(--p) text-(--op)">
              Devis gratuit <ArrowRight className="size-3.5" />
            </Pill>
            <span className="text-[10px] leading-relaxed text-nuit/55">
              Sols protégés
              <br />
              Chantier rendu propre
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_-16px_rgb(46_16_101/0.35)] ring-1 ring-nuit/8">
          <div
            className="relative h-[110px] bg-[#e8eef3]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(255 255 255/0.9) 2px, transparent 2px), linear-gradient(rgb(255 255 255/0.9) 2px, transparent 2px)",
              backgroundSize: "34px 34px",
            }}
          >
            <span className="absolute top-[42%] left-[10%] h-2 w-[80%] -rotate-12 rounded bg-white" />
            <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-full place-items-center rounded-full bg-(--p) text-white shadow-lg">
              <PaintRoller className="size-4" />
            </span>
          </div>
          <div className="p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold text-nuit/50">
              <Globe className="size-3" /> Fiche Google Business
            </p>
            <p className="mt-1 text-[15px] font-bold text-nuit">{p.brand}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-[11px] font-semibold">4,9</span>
              <Stars />
              <span className="text-[10px] text-nuit/50">(avis)</span>
            </div>
            <p className="mt-1 text-[10px] text-nuit/55">Peintre en bâtiment · Ouvert</p>
            <p className="mt-3 rounded-lg bg-(--s) px-3 py-2 text-[10px] leading-relaxed text-nuit/70 italic">
              « Travail soigné, chantier laissé impeccable. »
            </p>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {[
                { I: MapPin, t: "Itinéraire" },
                { I: Phone, t: "Appeler" },
                { I: Globe, t: "Site web" },
              ].map(({ I, t }) => (
                <span
                  key={t}
                  className="flex flex-col items-center gap-1 rounded-lg bg-(--s) py-2 text-[9px] font-semibold text-(--p)"
                >
                  <I className="size-3.5" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------ Chauffagiste */

function Chauffagiste() {
  const days = ["Lun 12", "Mar 13", "Mer 14", "Jeu 15", "Ven 16"];
  const slots = ["8 h 30", "10 h 00", "14 h 00", "16 h 30"];
  return (
    <div className="grid h-full grid-cols-[1fr_1.15fr]">
      <div className="relative overflow-hidden bg-(--d) px-7 pt-8 text-white">
        <div className="absolute -bottom-24 -left-16 size-72 rounded-full bg-(--p)/40 blur-3xl" />
        <div className="relative">
          <Eyebrow className="bg-white/10 text-(--a)">
            <Flame className="size-3" /> Chauffagiste · [Ville]
          </Eyebrow>
          <p className="mt-4 font-display text-[30px] leading-[1.06] font-bold tracking-tight">
            Entretien de chaudière et pompe à chaleur
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-white/65">
            Réservez votre créneau en ligne. On vous rappelle chaque année avant la date
            d&apos;entretien.
          </p>
          <div className="mt-6 space-y-2">
            {["Attestation d'entretien remise", "Dépannage chauffage 6j/7", "Contrats annuels"].map(
              (t) => (
                <p key={t} className="flex items-center gap-2 text-[11px] text-white/85">
                  <Check className="size-3.5 text-(--a)" /> {t}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="bg-(--s) px-6 pt-6">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-nuit/8">
          <p className="flex items-center gap-1.5 text-[13px] font-bold text-nuit">
            <CalendarCheck className="size-4 text-(--p)" /> Choisir un créneau
          </p>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {days.map((d, i) => (
              <span
                key={d}
                className={cn(
                  "rounded-lg py-2 text-center text-[10px] font-semibold",
                  i === 1 ? "bg-(--p) text-(--op)" : "bg-(--s) text-nuit/65",
                )}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {slots.map((s, i) => (
              <span
                key={s}
                className={cn(
                  "rounded-lg py-2 text-center text-[11px] font-semibold ring-1",
                  i === 1 ? "bg-(--p)/10 text-(--p) ring-(--p)" : "text-nuit/70 ring-nuit/10",
                  i === 3 && "text-nuit/30 line-through",
                )}
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-(--s) px-3 py-2 text-[10px] text-nuit/70">
            Mardi 13 · 10 h 00 · Entretien chaudière gaz
          </p>
          <p className="mt-3 rounded-xl bg-(--p) py-2.5 text-center text-[11px] font-semibold text-(--op)">
            Confirmer le rendez-vous
          </p>
        </div>
        <div className="mt-3 flex items-start gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-nuit/8">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-(--a)/15 text-(--p)">
            <Bell className="size-4" />
          </span>
          <span>
            <span className="block text-[11px] font-bold text-nuit">Rappel automatique</span>
            <span className="block text-[10px] leading-relaxed text-nuit/60">
              « Votre entretien annuel arrive dans 30 jours. Réservez en un clic. »
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Carreleur */

function Carreleur() {
  return (
    <div className="grid h-full grid-cols-[1fr_1.1fr]">
      <div
        className="relative bg-(--p)"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(255 255 255/0.55) 2px, transparent 2px), linear-gradient(rgb(255 255 255/0.55) 2px, transparent 2px), conic-gradient(rgb(255 255 255/0.12) 25%, transparent 0 50%, rgb(255 255 255/0.12) 0 75%, transparent 0)",
          backgroundSize: "46px 46px, 46px 46px, 92px 92px",
        }}
      >
        <div className="relative m-6 rounded-2xl bg-(--d)/90 p-5 text-white shadow-xl">
          <Eyebrow className="bg-white/10 text-(--a)">Carreleur · [Ville]</Eyebrow>
          <p className="mt-4 font-display text-[32px] leading-[1.05] font-bold tracking-tight">
            Carrelage, faïence et terrasses
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-white/75">
            Calepinage précis, joints réguliers, chantier rendu propre.
          </p>
        </div>
      </div>
      <div className="bg-(--s) px-6 pt-6">
        <p className="font-display text-[17px] font-bold text-(--d)">Estimez votre chantier</p>
        <p className="text-[10px] text-nuit/55">Réponse indicative en 30 secondes</p>
        <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-nuit/8">
          <p className="flex justify-between text-[10px] font-semibold text-nuit/70">
            <span>Surface</span>
            <span className="text-(--p)">18 m²</span>
          </p>
          <div className="relative mt-2 h-2 rounded-full bg-(--s)">
            <span className="absolute inset-y-0 left-0 w-[36%] rounded-full bg-(--p)" />
            <span className="absolute top-1/2 left-[36%] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-(--p) bg-white" />
          </div>
          <p className="mt-4 text-[10px] font-semibold text-nuit/70">Type de pose</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {["Sol intérieur", "Faïence", "Terrasse"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-lg py-2 text-center text-[10px] font-semibold ring-1",
                  i === 0 ? "bg-(--p) text-(--op) ring-(--p)" : "text-nuit/65 ring-nuit/10",
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[10px] font-semibold text-nuit/70">Motif</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {["Droit", "Diagonale", "Chevron"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-lg py-2 text-center text-[10px] font-semibold ring-1",
                  i === 2 ? "bg-(--p)/10 text-(--p) ring-(--p)" : "text-nuit/65 ring-nuit/10",
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 rounded-2xl bg-(--d) p-4 text-white">
          <p className="text-[10px] text-white/60">Estimation fourniture et pose</p>
          <p className="mt-1 font-display text-[22px] font-bold">
            1 150 € <span className="text-[13px] font-medium text-white/60">à</span> 1 480 € HT
          </p>
          <p className="mt-1 text-[9px] text-white/50">Devis précis après visite gratuite</p>
        </div>
        <div className="mt-3 flex gap-4 px-1 text-[10px] font-semibold text-(--p)">
          <span className="flex items-center gap-1">
            <Check className="size-3.5" /> Visite gratuite
          </span>
          <span className="flex items-center gap-1">
            <Check className="size-3.5" /> Devis détaillé sous 48 h
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Charpentier */

function Charpentier() {
  return (
    <div className="grid h-full grid-cols-[1fr_1.05fr]">
      <div className="relative overflow-hidden bg-(--s) px-7 pt-7">
        <svg
          className="absolute right-0 bottom-0 w-[95%] text-(--p)"
          viewBox="0 0 320 170"
          fill="none"
        >
          <path d="M10 165 L160 30 L310 165" stroke="currentColor" strokeWidth="6" />
          <path d="M45 134 L275 134" stroke="currentColor" strokeWidth="5" />
          <path d="M160 30 L160 134" stroke="currentColor" strokeWidth="4" />
          <path d="M90 102 L160 134 L230 102" stroke="currentColor" strokeWidth="3.5" />
          <path d="M10 165 L310 165" stroke="var(--a)" strokeWidth="6" />
        </svg>
        <div className="relative">
          <Eyebrow className="bg-(--p)/10 text-(--p)">
            <Axe className="size-3" /> Charpentier · [Ville]
          </Eyebrow>
          <p className="mt-4 font-display text-[30px] leading-[1.05] font-bold tracking-tight text-(--d)">
            Charpente, ossature bois et extensions
          </p>
          <div className="mt-4 flex gap-1.5">
            {["Site", "Logiciel", "Assistant IA"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-(--p) ring-1 ring-(--p)/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white px-5 pt-5">
        <div className="flex items-center gap-2.5 rounded-xl bg-(--d) px-3.5 py-2.5 text-white">
          <span className="grid size-8 place-items-center rounded-full bg-(--a) text-(--d)">
            <Sparkles className="size-4" />
          </span>
          <span>
            <span className="block text-[12px] font-bold">Assistant de Votre Charpente</span>
            <span className="flex items-center gap-1 text-[9px] text-white/60">
              <span className="size-1.5 rounded-full bg-emerald-400" /> Répond 24 h/24
            </span>
          </span>
        </div>
        <div className="mt-3 space-y-2 text-[11px] leading-relaxed">
          <p className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-(--s) px-3 py-2 text-nuit">
            Bonjour, je voudrais un devis pour un carport en bois.
          </p>
          <p className="max-w-[82%] rounded-2xl rounded-bl-sm bg-(--p) px-3 py-2 text-(--op)">
            Avec plaisir ! Quelles dimensions environ, et à quelle adresse ?
          </p>
          <p className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-(--s) px-3 py-2 text-nuit">
            5 × 3 m, à [Ville].
          </p>
          <p className="max-w-[82%] rounded-2xl rounded-bl-sm bg-(--p) px-3 py-2 text-(--op)">
            Merci, c&apos;est noté. Votre devis arrive sous 24 h.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5 border-t border-nuit/8 pt-3">
          {["Demande reçue", "Devis préparé", "RDV proposé"].map((t, i) => (
            <span key={t} className="flex flex-col items-center gap-1 text-center">
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full",
                  i < 2 ? "bg-(--p) text-(--op)" : "bg-(--s) text-nuit/40 ring-1 ring-nuit/10",
                )}
              >
                {i < 2 ? <Check className="size-3.5" /> : <MessageCircle className="size-3.5" />}
              </span>
              <span className="text-[9px] font-semibold text-nuit/65">{t}</span>
            </span>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-(--s) px-3 py-2.5 text-[10px] font-semibold text-(--p)">
          <FileText className="size-3.5" /> La demande arrive dans le logiciel, prête à chiffrer
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Cadre */

const bodies: Record<TradeMockup, (p: Project) => ReactNode> = {
  plombier: (p) => <Plombier p={p} />,
  electricien: () => <Electricien />,
  macon: () => <Macon />,
  menuisier: () => <Menuisier />,
  couvreur: () => <Couvreur />,
  peintre: (p) => <Peintre p={p} />,
  chauffagiste: () => <Chauffagiste />,
  carreleur: () => <Carreleur />,
  charpentier: () => <Charpentier />,
};

export function TradeSiteMockup({ project }: { project: Project }) {
  const { theme, mockup } = project;
  const Icon = icons[mockup];
  const vars = {
    "--p": theme.primary,
    "--op": theme.onPrimary,
    "--d": theme.dark,
    "--s": theme.soft,
    "--a": theme.accent,
  } as CSSProperties;
  const isApp = mockup === "couvreur";

  return (
    <div
      aria-hidden="true"
      style={{ ...vars, width: MOCKUP_WIDTH, height: MOCKUP_HEIGHT }}
      className="flex flex-col overflow-hidden bg-white font-sans text-nuit select-none"
    >
      {/* Barre du navigateur */}
      <div className="flex h-9 shrink-0 items-center gap-3 border-b border-nuit/8 bg-[#f3f4f6] px-4">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex h-6 w-[46%] items-center justify-center rounded-md bg-white text-[10px] text-nuit/55 ring-1 ring-nuit/8">
          {project.domain}
        </span>
      </div>
      {/* En-tête du site */}
      {!isApp && (
        <div className="flex h-14 shrink-0 items-center justify-between px-8">
          <span className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-(--p) text-(--op)">
              <Icon className="size-4.5" />
            </span>
            <span className="font-display text-[14px] font-bold text-(--d)">{project.brand}</span>
          </span>
          <span className="flex items-center gap-5 text-[11px] font-medium text-nuit/60">
            {navLinks[mockup].map((l) => (
              <span key={l}>{l}</span>
            ))}
            <span className="rounded-full bg-(--d) px-3.5 py-1.5 text-[11px] font-semibold text-white">
              {ctaLabels[mockup]}
            </span>
          </span>
        </div>
      )}
      <div className="relative min-h-0 flex-1">{bodies[mockup](project)}</div>
    </div>
  );
}
