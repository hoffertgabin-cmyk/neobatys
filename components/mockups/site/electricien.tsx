"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Sora } from "next/font/google";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FileSignature,
  Phone,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DemoForm,
  Go,
  GoogleG,
  Photo,
  PhotoCredits,
  Pick,
  SiteFrame,
  Stars,
  useSite,
  type SiteProps,
} from "./frame";

/*
 * Volténa, électricien à Montigny-lès-Metz (entreprise fictive).
 * Un site sombre et précis, éclairé par une seule couleur : la lumière chaude.
 * Son angle : le site est relié au logiciel de devis (Pack Gestion), le client
 * suit sa demande comme un colis, du formulaire à la facture.
 */

const sora = Sora({ subsets: ["latin"], display: "swap", preload: false });

const PHONE = "06 39 98 36 52";

const vars = {
  "--nuit": "#121417",
  "--graphite": "#1c2025",
  "--ambre": "#f0b54a",
  "--ambre-t": "#8a5a00",
  "--craie": "#f4f2ed",
  "--ink-text": "#15181c",
  fontFamily: sora.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-20";

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-[15.5px] font-semibold transition-colors";
const btnAmbre = cn(btn, "bg-(--ambre) text-(--nuit) hover:bg-[#f5c46a]");
const btnGhostDark = cn(btn, "text-white ring-1 ring-white/30 ring-inset hover:ring-white/70");
const btnInk = cn(btn, "bg-(--ink-text) text-white hover:bg-black");
const btnGhost = cn(btn, "ring-1 ring-(--ink-text)/20 ring-inset hover:ring-(--ink-text)/60");

/* ---------------------------------------------------------------- Données */

const services = [
  {
    id: "normes",
    t: "Mise aux normes",
    d: "Tableau, différentiels 30 mA, terre et liaisons : votre installation conforme à la NF C 15-100.",
    from: "à partir de 890 €",
    src: "ele-tableau",
  },
  {
    id: "renovation",
    t: "Rénovation complète",
    d: "Tout refaire pièce par pièce, saignées rebouchées et murs propres avant le peintre.",
    from: "sur devis, visite offerte",
    src: "ele-mesure",
  },
  {
    id: "eclairage",
    t: "Éclairage et LED",
    d: "Spots encastrés, rubans LED, suspensions : un plan d'éclairage dessiné avec vous.",
    from: "à partir de 85 € le point",
    src: "ele-led",
  },
  {
    id: "borne",
    t: "Borne de recharge",
    d: "Installateur qualifié IRVE : la borne posée, raccordée et déclarée en une journée.",
    from: "à partir de 1 290 €",
    src: "ele-borne",
  },
  {
    id: "domotique",
    t: "Interrupteurs et domotique",
    d: "Volets, chauffage et lumière pilotés depuis le téléphone, ou de beaux interrupteurs tout simples.",
    from: "sur devis",
    src: "ele-inter",
  },
] as const;

const reviews = [
  {
    n: "Claire",
    c: "Montigny-lès-Metz",
    t: "Devis reçu le lendemain de la visite, signé sur mon téléphone le soir même. Tableau changé en une journée, aucune trace dans la maison.",
  },
  {
    n: "Julien",
    c: "Metz",
    t: "Borne de recharge posée dans le garage, câble passé proprement en goulotte. Ils ont fait la déclaration au gestionnaire du réseau pour moi.",
  },
  {
    n: "Sabrina",
    c: "Marly",
    t: "Rénovation complète d'un appartement des années 70. On savait chaque soir où en était le chantier grâce au suivi en ligne.",
  },
  {
    n: "Hervé",
    c: "Woippy",
    t: "Un plan d'éclairage pour la cuisine et le salon, très bien conseillé. Les rubans LED sous les meubles changent tout.",
  },
];

const towns = [
  "Metz",
  "Montigny-lès-Metz",
  "Marly",
  "Woippy",
  "Moulins-lès-Metz",
  "Longeville-lès-Metz",
  "Saint-Julien-lès-Metz",
  "Augny",
  "Ars-sur-Moselle",
  "Le Ban-Saint-Martin",
  "Scy-Chazelles",
  "Plappeville",
];

/* ------------------------------------------------------------- Éléments */

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[30px] leading-[1.1] font-semibold tracking-[-0.035em] text-balance @min-[900px]:text-[46px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="var(--ambre)" />
        <path d="M15.5 5 8.5 15.5h5L12.5 23l7-10.5h-5L15.5 5Z" fill="var(--nuit)" />
      </svg>
      <span
        className={cn(
          "text-[20px] font-semibold tracking-[-0.04em]",
          light ? "text-white" : "text-(--ink-text)",
        )}
      >
        Volténa
      </span>
    </span>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  const dark = page === "home";
  return (
    <header
      className={cn(
        "sticky top-0 z-30",
        dark ? "bg-(--nuit) text-white" : "border-b border-black/8 bg-white",
      )}
    >
      <div className={cn("flex h-18 items-center gap-8", pad)}>
        <Go to="home" label="Volténa, accueil">
          <Logo light={dark} />
        </Go>
        <nav className="ml-auto hidden items-center gap-1 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-[14.5px] transition-colors",
                dark
                  ? "text-white/70 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
                  : "text-black/60 hover:text-black aria-[current=page]:bg-(--craie) aria-[current=page]:text-black",
              )}
            >
              {p.label}
            </button>
          ))}
        </nav>
        <Go
          to="devis"
          className={cn(
            "hidden h-11 items-center gap-2 rounded-full px-5 text-[14.5px] font-semibold @min-[900px]:inline-flex @min-[1100px]:ml-2",
            "ml-auto bg-(--ambre) text-(--nuit) hover:bg-[#f5c46a]",
          )}
        >
          Devis sous 48 h
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className={cn(
            "ml-auto grid size-11 place-items-center rounded-full ring-1 @min-[900px]:ml-0 @min-[1100px]:hidden",
            dark ? "ring-white/25" : "ring-black/12",
          )}
        >
          {open ? (
            <X className="size-5" />
          ) : (
            <span className="text-[13px] font-semibold">Menu</span>
          )}
        </button>
      </div>
      {open && (
        <nav className="px-5 pb-5 @min-[1100px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className={cn(
                "flex w-full items-center justify-between border-b py-4 text-[18px] font-medium",
                dark ? "border-white/10" : "border-black/8",
              )}
            >
              {p.label} <ArrowRight className="size-4 opacity-40" />
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function MobileBar() {
  return (
    <div className="sticky bottom-0 z-20 grid grid-cols-[auto_1fr] gap-2 border-t border-black/8 bg-white p-3 @min-[900px]:hidden">
      <Go
        to="devis"
        label={`Appeler le ${PHONE}`}
        className="grid size-12 place-items-center rounded-full bg-(--ink-text) text-white"
      >
        <Phone className="size-5" />
      </Go>
      <Go to="devis" className={cn(btnAmbre, "h-12")}>
        Demander un devis
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--nuit) text-white/60">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.5fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <Logo light />
          <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed">
            Électricité générale, bornes de recharge et éclairage, à Montigny-lès-Metz et dans toute
            la Métropole.
          </p>
          <p className="mt-5 text-[13px]">Qualifelec · IRVE · Garantie décennale</p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Le site</p>
          <ul className="mt-3 space-y-2">
            {nav.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => go(p.id)} className="hover:text-white">
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Horaires</p>
          <p className="mt-3 leading-relaxed">
            Lundi au vendredi, 8 h – 18 h
            <br />
            Samedi matin, dépannage
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[21px] font-semibold text-white">{PHONE}</p>
          <p className="mt-1">bonjour@voltena-exemple.fr</p>
          <p className="mt-1">Montigny-lès-Metz (57)</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Volténa</span>
          <button type="button" onClick={() => go("mentions")} className="hover:text-white">
            Mentions légales et crédits photos
          </button>
        </span>
        <span>Entreprise fictive : site d&apos;exemple réalisé par NEOBATYS</span>
      </div>
    </footer>
  );
}

function PageTitle({ crumb, title, intro }: { crumb: string; title: string; intro?: string }) {
  return (
    <div className={cn("bg-(--craie) pt-10 pb-12 @min-[900px]:pt-16 @min-[900px]:pb-16", pad)}>
      <Go
        to="home"
        className="inline-flex items-center gap-1.5 text-[14px] text-black/55 hover:text-black"
      >
        <ArrowLeft className="size-4" /> Accueil
        <span className="text-black/30">/</span>
        <span className="text-black/75">{crumb}</span>
      </Go>
      <h1 className="mt-5 max-w-[780px] text-[34px] leading-[1.06] font-semibold tracking-[-0.04em] text-balance @min-[900px]:text-[54px]">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-[600px] text-[16.5px] leading-relaxed text-black/60">{intro}</p>
      )}
    </div>
  );
}

/* ------------------------------------------- Diagnostic de l'installation */

const checks = [
  { q: "Votre tableau a encore des fusibles à broches ou en porcelaine", w: 3 },
  { q: "Pas d'interrupteur différentiel 30 mA en tête de tableau", w: 3 },
  { q: "Des prises sans broche de terre dans les chambres ou la cuisine", w: 2 },
  { q: "Le disjoncteur saute quand le four et la machine tournent", w: 1 },
  { q: "L'installation a plus de 25 ans", w: 1 },
] as const;

function Diagnostic() {
  const [on, setOn] = useState<boolean[]>([true, false, true, false, true]);
  const score = checks.reduce((s, c, i) => s + (on[i] ? c.w : 0), 0);
  const verdict =
    score >= 5
      ? {
          t: "Une mise aux normes est conseillée",
          d: "Le tableau et la protection des personnes sont à revoir en priorité. Comptez une journée de travaux.",
          price: "890 à 1 650 €",
        }
      : score >= 2
        ? {
            t: "Quelques points à corriger",
            d: "Pas d'urgence, mais un contrôle permet de cibler les travaux utiles, sans tout refaire.",
            price: "290 à 690 €",
          }
        : {
            t: "Votre installation semble saine",
            d: "Un contrôle tous les 10 ans suffit. Pensez-y avant de vendre ou de louer.",
            price: "contrôle à 149 €",
          };
  return (
    <section
      className={cn(
        "grid gap-12 bg-(--craie) py-16 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-24",
        pad,
      )}
    >
      <div>
        <H2>Votre installation est&#8209;elle encore sûre&nbsp;?</H2>
        <p className="mt-4 max-w-[460px] text-[16.5px] leading-relaxed text-black/60">
          Cochez ce qui correspond à chez vous. Le résultat s&apos;affiche tout de suite, sans
          laisser vos coordonnées.
        </p>
        <ul className="mt-8 divide-y divide-black/8 border-y border-black/8">
          {checks.map((c, i) => (
            <li key={c.q}>
              <button
                type="button"
                aria-pressed={on[i]}
                onClick={() => setOn(on.map((v, k) => (k === i ? !v : v)))}
                className="flex w-full items-center gap-4 py-4 text-left text-[15.5px]"
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md ring-1 transition-colors",
                    on[i]
                      ? "bg-(--ink-text) text-(--ambre) ring-(--ink-text)"
                      : "bg-white ring-black/20",
                  )}
                >
                  {on[i] && <Check className="size-4" strokeWidth={3} />}
                </span>
                {c.q}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col overflow-hidden rounded-[18px] bg-(--nuit) text-white">
        <div className="relative h-[220px] @min-[900px]:h-[260px]">
          <Photo
            src="ele-tableau"
            alt="Tableau électrique avec disjoncteurs"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--nuit) to-transparent" />
        </div>
        <div aria-live="polite" className="flex flex-1 flex-col p-7 @min-[900px]:p-9">
          <p className="text-[14px] text-white/55">Résultat</p>
          <p className="mt-2 text-[26px] leading-tight font-semibold tracking-[-0.03em]">
            {verdict.t}
          </p>
          <p className="mt-3 text-[15.5px] leading-relaxed text-white/65">{verdict.d}</p>
          <p className="mt-6 text-[15px] text-white/60">
            Budget habituel : <b className="text-(--ambre)">{verdict.price}</b>
          </p>
          <Go to="devis" param="normes" className={cn(btnAmbre, "mt-7 self-start")}>
            Recevoir un devis précis
          </Go>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- Devis suivi comme un colis */

const steps = [
  {
    t: "Demande reçue",
    d: "Vous remplissez le formulaire : elle arrive directement dans notre logiciel.",
  },
  { t: "Visite et devis", d: "Visite sous 5 jours, devis détaillé envoyé sous 48 h." },
  { t: "Signature en ligne", d: "Vous signez depuis votre téléphone, sans imprimer." },
  { t: "Intervention", d: "Date confirmée par SMS, rappel la veille." },
  { t: "Facture et attestation", d: "Envoyées par e-mail, avec l'attestation de conformité." },
];

function QuoteDoc({ signed = false }: { signed?: boolean }) {
  return (
    <div className="rounded-[14px] bg-white p-6 text-(--ink-text) shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] @min-[900px]:p-8">
      <div className="flex items-start justify-between gap-4">
        <Logo />
        <span className="text-right text-[12.5px] text-black/50">
          Devis D-2026-118
          <br />
          14 novembre 2026
        </span>
      </div>
      <p className="mt-6 text-[17px] font-semibold">Mise aux normes du tableau électrique</p>
      <p className="text-[13.5px] text-black/50">Maison, Montigny-lès-Metz</p>
      <table className="mt-5 w-full text-[13.5px]">
        <tbody>
          {[
            ["Tableau 3 rangées, peigne et bornier", "420,00 €"],
            ["Interrupteurs différentiels 30 mA (×2)", "236,00 €"],
            ["Disjoncteurs divisionnaires (×12)", "168,00 €"],
            ["Reprise de la liaison équipotentielle", "95,00 €"],
            ["Main-d'œuvre, 1 journée", "390,00 €"],
          ].map(([l, p]) => (
            <tr key={l} className="border-b border-black/6">
              <td className="py-2.5 pr-3">{l}</td>
              <td className="py-2.5 text-right whitespace-nowrap tabular-nums">{p}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-[13px] text-black/50">TVA 10 % incluse</span>
        <span className="text-[24px] font-semibold tracking-[-0.03em] tabular-nums">
          1 439,90 €
        </span>
      </div>
      <div
        className={cn(
          "mt-5 flex items-center justify-center gap-2 rounded-full py-3 text-[14.5px] font-semibold",
          signed ? "bg-[#e8f3ec] text-[#1f6b41]" : "bg-(--ink-text) text-white",
        )}
      >
        {signed ? (
          <>
            <Check className="size-4" /> Signé le 14/11 à 21 h 07
          </>
        ) : (
          <>
            <FileSignature className="size-4" /> Signer en ligne
          </>
        )}
      </div>
    </div>
  );
}

function Suivi() {
  return (
    <section
      className={cn(
        "grid gap-14 bg-(--graphite) py-16 text-white @min-[900px]:grid-cols-[1fr_440px] @min-[900px]:gap-20 @min-[900px]:py-24",
        pad,
      )}
    >
      <div>
        <H2>Votre devis, suivi comme un colis.</H2>
        <p className="mt-4 max-w-[480px] text-[16.5px] leading-relaxed text-white/65">
          Le formulaire du site est relié à notre logiciel : pas de demande perdue, et vous savez
          toujours où en est votre chantier.
        </p>
        <ol className="mt-10 space-y-0">
          {steps.map((s, i) => (
            <li key={s.t} className="relative flex gap-5 pb-7 last:pb-0">
              {i < steps.length - 1 && (
                <span className="absolute top-8 bottom-0 left-[15px] w-px bg-white/15" />
              )}
              <span
                className={cn(
                  "relative grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold",
                  i < 3 ? "bg-(--ambre) text-(--nuit)" : "bg-white/10 text-white/60",
                )}
              >
                {i < 3 ? <Check className="size-4" strokeWidth={3} /> : i + 1}
              </span>
              <span>
                <span className="block text-[17px] font-semibold">{s.t}</span>
                <span className="mt-1 block text-[14.5px] leading-relaxed text-white/55">
                  {s.d}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <Go
          to="suivi"
          className="mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-(--ambre) hover:underline"
        >
          Suivre ma demande <ArrowRight className="size-4" />
        </Go>
      </div>
      <QuoteDoc signed />
    </section>
  );
}

/* --------------------------------------------------------------- Accueil */

function Reviews() {
  const [i, setI] = useState(0);
  const r = reviews[i];
  return (
    <section className={cn("py-16 @min-[900px]:py-24", pad)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-3 text-[15px] text-black/60">
          <GoogleG className="size-6" />
          <b className="text-[22px] font-semibold text-(--ink-text)">4,8</b>
          <Stars className="text-[16px]" /> 76 avis Google
        </p>
        <span className="flex gap-2">
          <button
            type="button"
            aria-label="Avis précédent"
            onClick={() => setI((i + reviews.length - 1) % reviews.length)}
            className="grid size-11 place-items-center rounded-full ring-1 ring-black/15 hover:ring-black/50"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Avis suivant"
            onClick={() => setI((i + 1) % reviews.length)}
            className="grid size-11 place-items-center rounded-full ring-1 ring-black/15 hover:ring-black/50"
          >
            <ChevronRight className="size-5" />
          </button>
        </span>
      </div>
      <figure aria-live="polite" className="mt-10 max-w-[980px]">
        <blockquote className="text-[24px] leading-[1.35] font-medium tracking-[-0.02em] text-balance @min-[900px]:text-[34px]">
          « {r.t} »
        </blockquote>
        <figcaption className="mt-6 text-[15px] text-black/55">
          <b className="text-(--ink-text)">{r.n}</b>, {r.c} · {i + 1} / {reviews.length}
        </figcaption>
      </figure>
    </section>
  );
}

function Home() {
  return (
    <>
      {/* Premier écran : la lumière, plein cadre */}
      <section className="relative min-h-[560px] overflow-hidden bg-(--nuit) text-white @min-[900px]:min-h-[690px]">
        <Photo
          src="ele-hero"
          alt="Cuisine sombre éclairée par un ruban LED sous les meubles"
          priority
          sizes="(min-width: 1024px) 1280px, 100vw"
          position="70% 50%"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-(--nuit) via-(--nuit)/75 to-(--nuit)/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-(--nuit) to-transparent" />
        <div
          className={cn(
            "relative flex min-h-[560px] flex-col justify-end pb-12 @min-[900px]:min-h-[690px] @min-[900px]:pb-16",
            pad,
          )}
        >
          <p className="text-[15px] text-white/65">Électricien à Montigny-lès-Metz</p>
          <h1 className="mt-4 max-w-[760px] text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance @min-[900px]:text-[72px]">
            Une installation sûre, une maison bien éclairée.
          </h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/70">
            Mise aux normes, rénovation, éclairage et bornes de recharge. Devis détaillé sous 48 h,
            à signer en ligne.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Go to="devis" className={btnAmbre}>
              Demander un devis
            </Go>
            <Go to="devis" className={btnGhostDark}>
              <Phone className="size-4" /> {PHONE}
            </Go>
          </div>
          <dl className="mt-14 grid max-w-[760px] grid-cols-2 gap-6 border-t border-white/15 pt-6 text-[14px] @min-[900px]:grid-cols-4">
            {[
              ["Qualifelec", "Électricien qualifié"],
              ["IRVE", "Bornes de recharge"],
              ["48 h", "pour recevoir le devis"],
              ["4,8 / 5", "76 avis Google"],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="text-[18px] font-semibold">{t}</dt>
                <dd className="mt-0.5 text-white/55">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Prestations : une liste nette, une photo par ligne */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2 className="max-w-[560px]">Ce que nous faisons, et à quel prix</H2>
          <Go
            to="prestations"
            className="inline-flex items-center gap-2 text-[15px] font-semibold hover:underline"
          >
            Toutes les prestations <ArrowRight className="size-4" />
          </Go>
        </div>
        <ul className="mt-10 border-t border-black/10">
          {services.map((s) => (
            <li key={s.id} className="border-b border-black/10">
              <Go
                to={s.id === "borne" ? "borne" : "prestations"}
                className="group grid w-full grid-cols-[72px_1fr_auto] items-center gap-5 py-5 text-left @min-[900px]:grid-cols-[120px_1.1fr_1.6fr_200px_24px] @min-[900px]:gap-8"
              >
                <span className="relative block h-[56px] overflow-hidden rounded-[10px] @min-[900px]:h-[76px]">
                  <Photo src={s.src} alt="" sizes="120px" />
                </span>
                <span className="text-[18px] font-semibold tracking-[-0.02em] @min-[900px]:text-[21px]">
                  {s.t}
                </span>
                <span className="hidden text-[15px] leading-relaxed text-black/60 @min-[900px]:block">
                  {s.d}
                </span>
                <span className="hidden text-[14.5px] text-(--ambre-t) @min-[900px]:block">
                  {s.from}
                </span>
                <ArrowRight className="size-5 text-black/30 transition-transform group-hover:translate-x-1 group-hover:text-black" />
              </Go>
            </li>
          ))}
        </ul>
      </section>

      <Diagnostic />
      <Suivi />
      <Reviews />

      {/* Zone */}
      <section
        className={cn(
          "grid gap-10 border-t border-black/8 py-16 @min-[900px]:grid-cols-[1fr_1.4fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <H2>Toute la Métropole de Metz, et 25 km autour</H2>
          <p className="mt-4 text-[16px] leading-relaxed text-black/60">
            Du lundi au vendredi, 8 h – 18 h. Dépannage le samedi matin.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 self-end text-[15.5px] @min-[900px]:grid-cols-3">
          {towns.map((t) => (
            <li key={t} className="border-b border-black/8 pb-3">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-(--nuit) text-white">
        <Photo src="ele-salon" alt="" sizes="1280px" className="opacity-35" />
        <div className={cn("relative py-20 @min-[900px]:py-28", pad)}>
          <H2 className="max-w-[640px]">Un projet, une panne, une question&nbsp;?</H2>
          <p className="mt-4 max-w-[480px] text-[16.5px] leading-relaxed text-white/70">
            Décrivez-le en deux minutes : le devis arrive sous 48 h, et vous le suivez en ligne.
          </p>
          <Go to="devis" className={cn(btnAmbre, "mt-8")}>
            Demander un devis
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------------- Prestations */

function Prestations() {
  return (
    <>
      <PageTitle
        crumb="Prestations"
        title="Prestations et prix indicatifs"
        intro="Les prix exacts figurent sur le devis, après la visite. Ils comprennent le matériel, la pose et le nettoyage."
      />
      <section className={cn("space-y-16 py-14 @min-[900px]:space-y-20 @min-[900px]:py-20", pad)}>
        {services.map((s, i) => (
          <article
            key={s.id}
            className={cn(
              "grid gap-8 @min-[900px]:grid-cols-2 @min-[900px]:items-center @min-[900px]:gap-16",
              i % 2 === 1 && "@min-[900px]:[&>div:first-child]:order-last",
            )}
          >
            <div className="relative h-[240px] overflow-hidden rounded-[18px] @min-[900px]:h-[340px]">
              <Photo src={s.src} alt={s.t} sizes="(min-width: 1024px) 560px, 100vw" />
            </div>
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.035em] @min-[900px]:text-[36px]">
                {s.t}
              </h2>
              <p className="mt-3 text-[16.5px] leading-relaxed text-black/62">{s.d}</p>
              <p className="mt-5 text-[16px] font-semibold text-(--ambre-t)">{s.from}</p>
              <Go
                to={s.id === "borne" ? "borne" : "devis"}
                param={s.id}
                className={cn(btnInk, "mt-6")}
              >
                {s.id === "borne" ? "Estimer ma borne" : "Demander un devis"}
              </Go>
            </div>
          </article>
        ))}
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Borne */

const powers = ["7,4 kW", "11 kW", "22 kW"] as const;
const places = ["Garage", "Allée extérieure", "Parking de copropriété"] as const;

function Borne() {
  const [power, setPower] = useState<(typeof powers)[number]>("7,4 kW");
  const [place, setPlace] = useState<(typeof places)[number]>("Garage");
  const [dist, setDist] = useState(12);
  const base = { "7,4 kW": 1090, "11 kW": 1390, "22 kW": 1790 }[power];
  const extra = { Garage: 0, "Allée extérieure": 180, "Parking de copropriété": 420 }[place];
  const total = base + extra + Math.max(0, dist - 5) * 28;
  const fmt = (n: number) => (Math.round(n / 10) * 10).toLocaleString("fr-FR");
  const chip =
    "h-11 rounded-full px-5 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 transition-colors hover:ring-black/40 aria-pressed:bg-(--ink-text) aria-pressed:text-white aria-pressed:ring-(--ink-text)";
  return (
    <>
      <PageTitle
        crumb="Borne de recharge"
        title="Combien coûte une borne chez vous ?"
        intro="Trois réglages pour une estimation. Installateur qualifié IRVE : nous déclarons la borne au gestionnaire du réseau."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="space-y-9">
          <div>
            <p className="text-[15px] font-semibold">Puissance</p>
            <Pick
              options={powers}
              value={power}
              onChange={setPower}
              className="mt-3"
              itemClassName={chip}
            />
            <p className="mt-2 text-[13.5px] text-black/50">
              7,4 kW suffit pour recharger une voiture pendant la nuit.
            </p>
          </div>
          <div>
            <p className="text-[15px] font-semibold">Emplacement</p>
            <Pick
              options={places}
              value={place}
              onChange={setPlace}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              Distance depuis le tableau <span>{dist} m</span>
            </span>
            <input
              type="range"
              min={2}
              max={40}
              value={dist}
              onChange={(e) => setDist(Number(e.target.value))}
              className="mt-4 w-full accent-(--ink-text)"
            />
          </label>
        </div>
        <div className="overflow-hidden rounded-[18px] bg-(--nuit) text-white">
          <div className="relative h-[220px]">
            <Photo src="ele-borne" alt="Borne de recharge murale" sizes="560px" />
          </div>
          <div aria-live="polite" className="p-7 @min-[900px]:p-9">
            <p className="text-[14px] text-white/55">Estimation, pose et mise en service</p>
            <p className="mt-2 text-[44px] leading-none font-semibold tracking-[-0.04em] tabular-nums">
              {fmt(total * 0.92)} – {fmt(total * 1.08)} €
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">
              Borne {power}, {place.toLowerCase()}, {dist} m de câble. Pose en une journée.
            </p>
            <Go to="devis" param="borne" className={cn(btnAmbre, "mt-7")}>
              Recevoir le devis exact
            </Go>
          </div>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------------------------------------------------------- Réalisations */

const works = [
  { src: "ele-cuisine", t: "Éclairage d'une cuisine ouverte", c: "Marly" },
  { src: "ele-led", t: "Étagères éclairées par LED", c: "Metz, Sablon" },
  { src: "ele-inter", t: "Interrupteurs à bascule en laiton", c: "Scy-Chazelles" },
  { src: "ele-tableau", t: "Tableau neuf, maison de 1965", c: "Montigny-lès-Metz" },
  { src: "ele-borne", t: "Borne 7,4 kW dans une allée", c: "Augny" },
  { src: "ele-salon", t: "Salon en lumière indirecte", c: "Woippy" },
];

function Realisations() {
  const [zoom, setZoom] = useState<number | null>(null);
  const z = zoom === null ? null : works[zoom];
  return (
    <>
      <PageTitle crumb="Réalisations" title="Chantiers récents" />
      <section
        className={cn(
          "grid gap-5 py-12 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3 @min-[900px]:py-16",
          pad,
        )}
      >
        {works.map((w, i) => (
          <button
            key={w.src}
            type="button"
            onClick={() => setZoom(i)}
            className={cn(
              "group relative overflow-hidden rounded-[16px] text-left",
              i === 0
                ? "h-[300px] @min-[900px]:col-span-2 @min-[900px]:h-[420px]"
                : "h-[300px] @min-[900px]:h-[420px]",
            )}
          >
            <Photo
              src={w.src}
              alt={w.t}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-white">
              <span className="block text-[17px] font-semibold">{w.t}</span>
              <span className="text-[14px] text-white/70">{w.c}</span>
            </span>
          </button>
        ))}
      </section>
      {z && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-black/85 p-6"
          onClick={() => setZoom(null)}
        >
          <div className="relative h-[70%] w-full max-w-[920px] overflow-hidden rounded-[12px]">
            <Photo src={z.src} alt={z.t} sizes="920px" />
          </div>
          <p className="mt-3 text-[15px] text-white">
            {z.t}, {z.c}
          </p>
        </div>
      )}
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------- Devis en 3 étapes */

const kinds = [
  "Mise aux normes",
  "Rénovation complète",
  "Éclairage et LED",
  "Borne de recharge",
  "Interrupteurs et domotique",
  "Panne ou dépannage",
] as const;
const homes = ["Maison", "Appartement", "Local professionnel"] as const;
const kindFromParam: Record<string, (typeof kinds)[number]> = {
  normes: "Mise aux normes",
  renovation: "Rénovation complète",
  eclairage: "Éclairage et LED",
  borne: "Borne de recharge",
  domotique: "Interrupteurs et domotique",
};

function Devis() {
  const { param } = useSite();
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<(typeof kinds)[number]>(
    kindFromParam[param ?? ""] ?? "Mise aux normes",
  );
  const [home, setHome] = useState<(typeof homes)[number]>("Maison");
  const chip =
    "h-11 rounded-full px-5 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 transition-colors hover:ring-black/40 aria-pressed:bg-(--ink-text) aria-pressed:text-white aria-pressed:ring-(--ink-text)";
  const field =
    "mt-2 h-12 w-full rounded-[10px] bg-white px-4 text-[16px] ring-1 ring-black/15 outline-none ring-inset placeholder:text-black/35 focus:ring-2 focus:ring-(--ink-text)";
  return (
    <>
      <PageTitle
        crumb="Devis"
        title="Votre devis sous 48 h"
        intro="Trois étapes. Votre demande arrive directement dans notre logiciel de devis : vous recevrez un numéro pour la suivre."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.3fr_1fr] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <ol className="flex gap-2 text-[13.5px]">
            {["Travaux", "Logement", "Coordonnées"].map((l, i) => (
              <li
                key={l}
                className={cn(
                  "flex-1 border-t-2 pt-2",
                  i <= step ? "border-(--ink-text) font-semibold" : "border-black/12 text-black/45",
                )}
              >
                {i + 1}. {l}
              </li>
            ))}
          </ol>
          {step === 0 && (
            <div className="mt-8">
              <p className="text-[17px] font-semibold">Quels travaux&nbsp;?</p>
              <Pick
                options={kinds}
                value={kind}
                onChange={setKind}
                className="mt-4"
                itemClassName={chip}
              />
              <button type="button" onClick={() => setStep(1)} className={cn(btnInk, "mt-9")}>
                Continuer <ArrowRight className="size-4" />
              </button>
            </div>
          )}
          {step === 1 && (
            <div className="mt-8">
              <p className="text-[17px] font-semibold">Votre logement</p>
              <Pick
                options={homes}
                value={home}
                onChange={setHome}
                className="mt-4"
                itemClassName={chip}
              />
              <label className="mt-7 block">
                <span className="text-[14.5px] font-medium">Commune</span>
                <input className={field} placeholder="Montigny-lès-Metz" />
              </label>
              <label className="mt-5 block">
                <span className="text-[14.5px] font-medium">En quelques mots (facultatif)</span>
                <textarea
                  rows={3}
                  className={cn(field, "h-auto resize-none py-3")}
                  placeholder="Maison de 1972, tableau d'origine…"
                />
              </label>
              <div className="mt-9 flex gap-3">
                <button type="button" onClick={() => setStep(0)} className={btnGhost}>
                  Retour
                </button>
                <button type="button" onClick={() => setStep(2)} className={btnInk}>
                  Continuer <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <DemoForm
              className="mt-8"
              success={{
                title: "Demande D-2026-119 enregistrée",
                text: `${kind}, ${home.toLowerCase()}. Elle est déjà dans notre logiciel : on vous appelle demain pour fixer la visite. Suivez-la avec ce numéro.`,
              }}
              submit="Envoyer ma demande"
              submitClassName={cn(btnAmbre, "mt-9")}
            >
              <div className="grid gap-5 @min-[900px]:grid-cols-2">
                <label className="block">
                  <span className="text-[14.5px] font-medium">Nom</span>
                  <input className={field} placeholder="Votre nom" />
                </label>
                <label className="block">
                  <span className="text-[14.5px] font-medium">Téléphone</span>
                  <input className={field} type="tel" placeholder="06 00 00 00 00" />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="text-[14.5px] font-medium">E-mail, pour recevoir le devis</span>
                <input className={field} type="email" placeholder="vous@exemple.fr" />
              </label>
            </DemoForm>
          )}
        </div>
        <aside className="self-start rounded-[18px] bg-(--craie) p-7">
          <p className="text-[14px] text-black/55">Votre demande</p>
          <p className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">{kind}</p>
          <p className="text-[15px] text-black/60">{home}</p>
          <ul className="mt-6 space-y-3 border-t border-black/10 pt-6 text-[14.5px]">
            {[
              "Visite sous 5 jours ouvrés",
              "Devis détaillé sous 48 h",
              "Signature en ligne",
              `Ou par téléphone : ${PHONE}`,
            ].map((l) => (
              <li key={l} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-(--ambre-t)" /> {l}
              </li>
            ))}
          </ul>
        </aside>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------- Suivi d'une demande */

function SuiviPage() {
  const [ref, setRef] = useState("D-2026-118");
  const [shown, setShown] = useState(true);
  return (
    <>
      <PageTitle
        crumb="Suivre ma demande"
        title="Où en est mon devis ?"
        intro="Entrez le numéro reçu par e-mail. Exemple : D-2026-118."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_440px] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShown(true);
            }}
            className="flex gap-2"
          >
            <input
              value={ref}
              onChange={(e) => {
                setRef(e.target.value);
                setShown(false);
              }}
              aria-label="Numéro de demande"
              className="h-13 min-w-0 flex-1 rounded-full bg-white px-5 text-[16px] ring-1 ring-black/15 outline-none ring-inset focus:ring-2 focus:ring-(--ink-text)"
            />
            <button type="submit" className={btnInk}>
              Voir
            </button>
          </form>
          {shown && (
            <ol className="mt-10">
              {steps.map((s, i) => (
                <li key={s.t} className="relative flex gap-5 pb-7 last:pb-0">
                  {i < steps.length - 1 && (
                    <span className="absolute top-8 bottom-0 left-[15px] w-px bg-black/12" />
                  )}
                  <span
                    className={cn(
                      "relative grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold",
                      i < 3
                        ? "bg-(--ink-text) text-(--ambre)"
                        : i === 3
                          ? "bg-(--ambre) text-(--nuit)"
                          : "bg-black/6 text-black/45",
                    )}
                  >
                    {i < 3 ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold">
                      {s.t}
                      {i === 3 && (
                        <span className="ml-2 text-[14px] font-normal text-(--ambre-t)">
                          jeudi 19 novembre, 8 h
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[14.5px] leading-relaxed text-black/55">
                      {s.d}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
        {shown && <QuoteDoc signed />}
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* -------------------------------------------------------------- Mentions */

function Mentions() {
  return (
    <>
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Volténa est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits
          photos={[
            "ele-hero",
            "ele-tableau",
            "ele-mesure",
            "ele-led",
            "ele-borne",
            "ele-inter",
            "ele-cuisine",
            "ele-salon",
          ]}
        />
      </section>
      <Footer />
    </>
  );
}

export function Site(props: SiteProps) {
  return (
    <SiteFrame
      {...props}
      style={vars}
      header={<Header />}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        {
          id: "prestations",
          label: "Prestations",
          path: "/prestations",
          render: () => <Prestations />,
        },
        {
          id: "borne",
          label: "Borne de recharge",
          path: "/borne-de-recharge",
          render: () => <Borne />,
        },
        {
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        { id: "suivi", label: "Suivre ma demande", path: "/suivi", render: () => <SuiviPage /> },
        { id: "devis", label: "Devis", path: "/devis", render: () => <Devis />, inNav: false },
        {
          id: "mentions",
          label: "Mentions légales",
          path: "/mentions-legales",
          render: () => <Mentions />,
          inNav: false,
        },
      ]}
    />
  );
}
