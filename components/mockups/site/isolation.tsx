"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Figtree, Fraunces } from "next/font/google";
import { ArrowRight, Check, Phone, ShieldCheck, X } from "lucide-react";
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
 * Cocon Isolation, entreprise d'isolation à Creutzwald (entreprise fictive).
 * Après des années de démarchage abusif, la confiance est le sujet : une
 * entreprise locale qui ne démarche pas, un label vérifiable, des aides
 * expliquées sans promesse de montant. Le geste fort : la maison en coupe
 * où l'on voit par où part la chaleur.
 * Laine, brun chaud, braise ; une serif douce pour les titres.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 74 18";

const vars = {
  "--laine": "#f5efe6",
  "--sable": "#e8dccb",
  "--brun": "#2e241d",
  "--braise": "#c8562d",
  "--braise-t": "#a2421f",
  "--froid": "#3f6f9a",
  "--ink-text": "#2e241d",
  "--serif": fraunces.style.fontFamily,
  fontFamily: figtree.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";
const serif = "font-(family-name:--serif) font-normal tracking-[-0.02em]";

/* ---------------------------------------------------------------- Données */

/** Répartition des pertes de chaleur d'une maison non isolée (ordres de grandeur ADEME). */
type Zone = {
  id: string;
  t: string;
  share: string;
  solution: string;
  price: string;
  delay: string;
  src: string;
};
const zones: Zone[] = [
  {
    id: "toit",
    t: "Toit et combles",
    share: "25 à 30 %",
    solution: "Laine soufflée en combles perdus, ou isolation des rampants sous plaques.",
    price: "25 à 45 € / m²",
    delay: "1 journée en combles perdus",
    src: "iso-combles",
  },
  {
    id: "murs",
    t: "Murs",
    share: "20 à 25 %",
    solution: "Doublage isolant par l'intérieur, ou isolation par l'extérieur sous enduit.",
    price: "60 à 180 € / m²",
    delay: "1 à 3 semaines",
    src: "iso-murs",
  },
  {
    id: "air",
    t: "Renouvellement d'air",
    share: "20 à 25 %",
    solution: "Étanchéité à l'air soignée et ventilation adaptée, contrôlées en fin de chantier.",
    price: "selon logement",
    delay: "pendant les travaux",
    src: "iso-comble-fenetre",
  },
  {
    id: "fenetres",
    t: "Fenêtres",
    share: "10 à 15 %",
    solution:
      "Calfeutrement et reprise des tableaux. Nous travaillons avec un menuisier partenaire pour les remplacements.",
    price: "sur devis",
    delay: "selon fabrication",
    src: "iso-interieur",
  },
  {
    id: "sol",
    t: "Planchers bas",
    share: "7 à 10 %",
    solution:
      "Panneaux isolants projetés ou collés sous la dalle, depuis la cave ou le vide sanitaire.",
    price: "30 à 60 € / m²",
    delay: "1 à 2 jours",
    src: "iso-fibre",
  },
];

const reviews = [
  {
    n: "Nathalie",
    c: "Creutzwald",
    t: "Ils ne nous ont pas démarchés, c'est nous qui les avons trouvés. Combles soufflés en une journée, et la différence s'est sentie dès le premier hiver.",
    s: 5,
  },
  {
    n: "Patrice",
    c: "Boulay",
    t: "Visite d'une heure, explications claires sur les aides sans promettre de chiffres. Devis détaillé reçu le lendemain.",
    s: 5,
  },
  {
    n: "Sonia",
    c: "Saint-Avold",
    t: "Isolation des murs par l'intérieur pièce par pièce, on a pu rester dans la maison.",
    s: 5,
  },
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-[16px] font-semibold transition-colors";
const btnWarm = cn(btn, "bg-(--braise) text-white hover:bg-(--braise-t)");
const btnDark = cn(btn, "bg-(--brun) text-white hover:bg-black");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--brun)/25 hover:ring-(--brun)");

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        serif,
        "text-[34px] leading-[1.05] text-balance @min-[900px]:text-[50px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-(--laine)/95 backdrop-blur">
      <div className={cn("flex h-18 items-center gap-8", pad)}>
        <Go
          to="home"
          className="flex items-center gap-2.5 text-left"
          label="Cocon Isolation, accueil"
        >
          <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
            <path
              d="M4 15 16 5l12 10v12H4z"
              fill="none"
              stroke="var(--brun)"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M9 26c0-6 3-10 7-10s7 4 7 10" fill="var(--braise)" />
          </svg>
          <span className={cn(serif, "text-[24px] leading-none")}>Cocon Isolation</span>
        </Go>
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="text-[15px] text-black/60 hover:text-black aria-[current=page]:font-semibold aria-[current=page]:text-black"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <Go
          to="estimation"
          className={cn(
            btnWarm,
            "ml-auto hidden h-11 px-5 text-[15px] @min-[900px]:inline-flex @min-[1100px]:ml-0",
          )}
        >
          Visite gratuite
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid size-11 place-items-center rounded-full ring-1 ring-black/15 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? (
            <X className="size-5" />
          ) : (
            <span className="text-[13px] font-semibold">Menu</span>
          )}
        </button>
      </div>
      {open && (
        <nav className="border-t border-black/8 px-5 pb-4 @min-[1100px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className="flex w-full items-center justify-between border-b border-black/6 py-3.5 text-[17px] font-semibold"
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
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/8 bg-(--laine) p-3 @min-[900px]:hidden">
      <Go to="contact" className={cn(btnLine, "h-12 px-3 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="estimation" className={cn(btnWarm, "h-12 px-3 text-[15px]")}>
        Visite gratuite
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--brun) text-white/65">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <p className={cn(serif, "text-[26px] text-white")}>Cocon Isolation</p>
          <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed">
            Isolation des combles, des murs et des sols à Creutzwald et en Moselle-Est. Nous ne
            démarchons jamais, ni par téléphone ni à domicile.
          </p>
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
        <div className="text-[14px] leading-relaxed">
          <p className="font-semibold text-white">Qualifications</p>
          <p className="mt-3">
            RGE Qualibat, n° E-E000000 (exemple)
            <br />
            Garantie décennale
            <br />
            Vérifiable sur france-renov.gouv.fr
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-semibold text-white">{PHONE}</p>
          <p className="mt-1">contact@cocon-isolation-exemple.fr</p>
          <p className="mt-1">Lundi au vendredi, 8 h – 18 h</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Cocon Isolation</span>
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
    <div
      className={cn(
        "bg-(--laine) pt-12 pb-14 text-center @min-[900px]:pt-16 @min-[900px]:pb-20",
        pad,
      )}
    >
      <p className="text-[14px] text-black/50">
        <Go to="home" className="hover:text-black">
          Accueil
        </Go>{" "}
        / <span className="text-black/75">{crumb}</span>
      </p>
      <h1
        className={cn(
          serif,
          "mx-auto mt-5 max-w-[820px] text-[40px] leading-[1.02] text-balance @min-[900px]:text-[62px]",
        )}
      >
        {title}
      </h1>
      {intro && (
        <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-black/60">
          {intro}
        </p>
      )}
    </div>
  );
}

/** Maison en coupe : chaque zone se sélectionne et dit combien de chaleur elle laisse partir. */
function HeatHouse({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  // Coupe de maison : toit, murs, fenêtres, plancher bas et courants d'air.
  const shapes: Record<string, ReactNode> = {
    toit: <path d="M58 168 200 62l142 106" fill="none" strokeWidth="22" strokeLinejoin="round" />,
    murs: <path d="M80 176v126M320 176v126" fill="none" strokeWidth="18" />,
    fenetres: (
      <>
        <rect x="118" y="200" width="54" height="56" rx="3" strokeWidth="0" />
        <rect x="228" y="200" width="54" height="56" rx="3" strokeWidth="0" />
      </>
    ),
    sol: <path d="M71 314h258" fill="none" strokeWidth="16" />,
    air: (
      <path
        d="M356 112c18-10 30 2 48-8M352 140c22-10 36 2 58-8M356 168c18-10 30 2 48-8"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
      />
    ),
  };
  const labels: Record<string, { x: number; y: number; anchor: "start" | "middle" | "end" }> = {
    toit: { x: 200, y: 44, anchor: "middle" },
    murs: { x: 60, y: 244, anchor: "end" },
    fenetres: { x: 200, y: 284, anchor: "middle" },
    sol: { x: 200, y: 346, anchor: "middle" },
    air: { x: 380, y: 196, anchor: "middle" },
  };
  return (
    <svg
      viewBox="-20 20 440 340"
      className="w-full"
      role="group"
      aria-label="Pertes de chaleur d'une maison non isolée"
    >
      <rect x="89" y="160" width="222" height="146" fill="#fbf7f1" />
      {zones.map((z) => {
        const on = active === z.id;
        const color = on ? "var(--braise)" : "#d9c4ad";
        const l = labels[z.id];
        return (
          <g
            key={z.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${z.t}, ${z.share} des pertes`}
            onClick={() => onPick(z.id)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPick(z.id)}
            className="cursor-pointer outline-none"
          >
            <g fill={color} stroke={color} style={{ transition: "fill .2s, stroke .2s" }}>
              {shapes[z.id]}
            </g>
            <text
              x={l.x}
              y={l.y}
              textAnchor={l.anchor}
              fontSize="14"
              fontWeight={on ? 700 : 600}
              fill={on ? "var(--braise-t)" : "#7a6756"}
            >
              {z.share.replace(" à ", "–")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  const [zone, setZone] = useState("toit");
  const z = zones.find((x) => x.id === zone) ?? zones[0];
  return (
    <>
      {/* Premier écran centré, photo en arche */}
      <section className={cn("bg-(--laine) pt-12 text-center @min-[900px]:pt-16", pad)}>
        <p className="text-[15px] text-black/55">Isolation à Creutzwald et en Moselle-Est</p>
        <h1
          className={cn(
            serif,
            "mx-auto mt-4 max-w-[900px] text-[46px] leading-[0.98] text-balance @min-[900px]:text-[74px]",
          )}
        >
          Une maison qui garde sa chaleur.
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-black/62">
          Combles, murs et planchers isolés par nos équipes salariées. Visite et devis gratuits,
          aides expliquées sans promesse.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Go to="estimation" className={btnWarm}>
            Demander une visite gratuite
          </Go>
          <Go to="aides" className={btnLine}>
            Comprendre les aides
          </Go>
        </div>
        <div className="relative mx-auto mt-10 h-[280px] max-w-[1080px] overflow-hidden rounded-t-[200px] @min-[900px]:h-[420px] @min-[900px]:rounded-t-[400px]">
          <Photo
            src="iso-hero"
            alt="Maison sous la neige"
            priority
            sizes="(min-width: 1024px) 1080px, 100vw"
            position="50% 55%"
          />
        </div>
      </section>

      {/* Confiance */}
      <section
        className={cn("grid gap-6 bg-(--brun) py-10 text-white @min-[900px]:grid-cols-4", pad)}
      >
        {[
          ["Nous ne démarchons jamais", "Ni par téléphone, ni à votre porte."],
          ["RGE Qualibat", "Numéro vérifiable sur france-renov.gouv.fr."],
          ["Équipes salariées", "Pas de sous-traitance, un chef de chantier unique."],
          ["Entreprise locale", "À Creutzwald depuis 2012."],
        ].map(([t, d]) => (
          <div key={t}>
            <p className="flex items-center gap-2 text-[16px] font-semibold">
              <ShieldCheck className="size-4.5 text-(--braise)" /> {t}
            </p>
            <p className="mt-1.5 text-[14px] text-white/60">{d}</p>
          </div>
        ))}
      </section>

      {/* Par où part la chaleur */}
      <section
        className={cn(
          "grid gap-12 bg-white py-16 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:items-center @min-[900px]:gap-16 @min-[900px]:py-24",
          pad,
        )}
      >
        <div>
          <H2>Par où part votre chaleur ?</H2>
          <p className="mt-4 text-[16px] text-black/60">Touchez une partie de la maison.</p>
          <div className="mt-6 max-w-[460px]">
            <HeatHouse active={zone} onPick={setZone} />
          </div>
          <p className="mt-3 text-[12.5px] text-black/45">
            Part des pertes d&apos;une maison non isolée, ordres de grandeur publiés par
            l&apos;ADEME.
          </p>
        </div>
        <div>
          <div className="relative h-[220px] overflow-hidden rounded-[20px] @min-[900px]:h-[260px]">
            <Photo key={z.src} src={z.src} alt={z.t} sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
          <p className="mt-6 text-[15px] font-semibold text-(--braise-t)">{z.share} des pertes</p>
          <h3 className={cn(serif, "mt-1 text-[34px] leading-tight")}>{z.t}</h3>
          <p className="mt-3 text-[16.5px] leading-relaxed text-black/65">{z.solution}</p>
          <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-black/10 pt-5 text-[15px]">
            <div>
              <dt className="text-black/50">Prix indicatif</dt>
              <dd className="mt-1 font-semibold">{z.price}</dd>
            </div>
            <div>
              <dt className="text-black/50">Durée</dt>
              <dd className="mt-1 font-semibold">{z.delay}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Aides */}
      <section
        className={cn(
          "grid gap-10 bg-(--sable) py-16 @min-[900px]:grid-cols-[1.1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <H2>Les aides, expliquées honnêtement</H2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-black/65">
            Elles existent et peuvent réduire nettement la facture. Mais leur montant dépend de vos
            revenus, de votre logement et des règles du moment : personne ne peut vous le garantir
            au téléphone.
          </p>
          <Go to="aides" className={cn(btnDark, "mt-8")}>
            Lire notre page aides
          </Go>
        </div>
        <ul className="space-y-4 self-center">
          {[
            "Le montant exact figure dans votre devis, poste par poste",
            "Nous vous aidons à monter les dossiers, sans frais",
            "Simulateur officiel : france-renov.gouv.fr",
            "TVA réduite à 5,5 % sur les travaux d'isolation",
          ].map((l) => (
            <li key={l} className="flex gap-3 text-[16.5px]">
              <Check className="mt-0.5 size-5 shrink-0 text-(--braise-t)" />
              {l}
            </li>
          ))}
        </ul>
      </section>

      {/* Avis */}
      <section className={cn("bg-(--laine) py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[15px] text-black/60">
          <GoogleG className="size-5" />
          <b className="text-[18px] text-(--ink-text)">4,9</b>
          <Stars className="text-[15px]" />
          <span>87 avis Google</span>
        </div>
        <div className="mt-10 grid gap-10 @min-[900px]:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.n} className="text-center">
              <blockquote className={cn(serif, "text-[21px] leading-snug")}>« {r.t} »</blockquote>
              <figcaption className="mt-4 text-[14px] text-black/55">
                {r.n}, {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className={cn(
          "grid gap-8 bg-white py-16 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:items-center @min-[900px]:gap-16",
          pad,
        )}
      >
        <div className="relative h-[260px] overflow-hidden rounded-[20px] @min-[900px]:h-[340px]">
          <Photo
            src="iso-cocon"
            alt="Plaid et tasse chaude près d'une fenêtre"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
        <div>
          <H2>Une visite d&apos;une heure, un devis le lendemain.</H2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-black/60">
            Creutzwald, Saint-Avold, Boulay, Bouzonville, Faulquemont et alentours.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Go to="estimation" className={btnWarm}>
              Demander une visite gratuite
            </Go>
            <Go to="contact" className={btnLine}>
              <Phone className="size-4" /> {PHONE}
            </Go>
          </div>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------------------------------------------------------- Nos isolations */

function Isolations() {
  return (
    <>
      <PageTitle
        crumb="Nos isolations"
        title="Ce qu'on isole, et comment"
        intro="Des matériaux choisis pour votre maison : laines minérales, fibre de bois, ouate de cellulose."
      />
      <section className={cn("space-y-14 bg-white py-16 @min-[900px]:py-20", pad)}>
        {zones
          .filter((z) => z.id !== "air")
          .map((z, i) => (
            <div
              key={z.id}
              className="grid gap-8 @min-[900px]:grid-cols-2 @min-[900px]:items-center @min-[900px]:gap-14"
            >
              <div
                className={cn(
                  "relative h-[260px] overflow-hidden rounded-[20px] @min-[900px]:h-[340px]",
                  i % 2 === 1 && "@min-[900px]:order-last",
                )}
              >
                <Photo src={z.src} alt={z.t} sizes="(min-width: 1024px) 560px, 100vw" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-(--braise-t)">{z.share} des pertes</p>
                <h2 className={cn(serif, "mt-1 text-[36px] leading-tight")}>{z.t}</h2>
                <p className="mt-3 text-[16.5px] leading-relaxed text-black/65">{z.solution}</p>
                <p className="mt-5 text-[15px]">
                  <b>{z.price}</b> <span className="text-black/50">· {z.delay}</span>
                </p>
              </div>
            </div>
          ))}
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------------ Aides */

function Aides() {
  const aids = [
    [
      "MaPrimeRénov'",
      "Aide de l'État, selon vos revenus et les travaux. Les règles évoluent chaque année : nous vérifions avec vous celles en vigueur à la date du devis.",
    ],
    [
      "Primes énergie (CEE)",
      "Versées par les fournisseurs d'énergie. Nous les déduisons du devis quand c'est possible, et le montant y figure noir sur blanc.",
    ],
    [
      "Éco-prêt à taux zéro",
      "Un prêt sans intérêts pour financer le reste à charge, à demander à votre banque avec notre devis.",
    ],
    [
      "TVA à 5,5 %",
      "Appliquée directement sur nos factures de travaux d'isolation dans les logements de plus de deux ans.",
    ],
  ];
  return (
    <>
      <PageTitle
        crumb="Aides"
        title="Les aides à l'isolation, sans promesse intenable"
        intro="Ce que nous pouvons vous dire, et ce que personne ne peut vous garantir au téléphone."
      />
      <section
        className={cn(
          "grid gap-12 bg-white py-16 @min-[900px]:grid-cols-[1.4fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="divide-y divide-black/10 border-y border-black/10">
          {aids.map(([t, d]) => (
            <div key={t} className="py-6">
              <h2 className={cn(serif, "text-[28px]")}>{t}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-black/65">{d}</p>
            </div>
          ))}
        </div>
        <aside className="self-start rounded-[20px] bg-(--sable) p-7">
          <h2 className={cn(serif, "text-[26px]")}>Méfiez-vous si l&apos;on vous promet&hellip;</h2>
          <ul className="mt-5 space-y-3 text-[15.5px]">
            {[
              "une isolation « à 1 € » ou gratuite",
              "un montant d'aide garanti avant toute visite",
              "une signature le jour même",
              "un appel non sollicité « de la part de l'État »",
            ].map((l) => (
              <li key={l} className="flex gap-3">
                <X className="mt-0.5 size-5 shrink-0 text-(--braise-t)" />
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14.5px] leading-relaxed text-black/60">
            Pour un conseil neutre et gratuit, contactez France Rénov&apos; (france-renov.gouv.fr).
          </p>
        </aside>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------------------------------------------------------- Réalisations */

function Realisations() {
  const items = [
    { src: "iso-combles", t: "Combles perdus soufflés, 90 m²", c: "Creutzwald", d: "1 journée" },
    { src: "iso-murs", t: "Doublage des murs pièce par pièce", c: "Saint-Avold", d: "2 semaines" },
    { src: "iso-comble-fenetre", t: "Rampants isolés sous pare-vapeur", c: "Boulay", d: "4 jours" },
    { src: "iso-fibre", t: "Fibre de bois sous plancher", c: "Bouzonville", d: "2 jours" },
    {
      src: "iso-maison",
      t: "Maison des années 50, isolation complète",
      c: "Ham-sous-Varsberg",
      d: "5 semaines",
    },
    {
      src: "iso-laine",
      t: "Laine minérale en sous-face de toiture",
      c: "Faulquemont",
      d: "3 jours",
    },
  ];
  return (
    <>
      <PageTitle crumb="Réalisations" title="Des maisons plus chaudes autour de Creutzwald" />
      <section
        className={cn(
          "grid gap-6 bg-white py-16 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3",
          pad,
        )}
      >
        {items.map((w) => (
          <figure key={w.src}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
              <Photo src={w.src} alt={w.t} sizes="(min-width: 1024px) 380px, 100vw" />
            </div>
            <figcaption className="mt-3">
              <span className="block text-[17px] font-semibold">{w.t}</span>
              <span className="block text-[14px] text-black/55">
                {w.c}, {w.d}
              </span>
            </figcaption>
          </figure>
        ))}
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------- Estimation */

const housing = ["Maison", "Appartement"] as const;
const what = [
  "Combles perdus",
  "Rampants",
  "Murs par l'intérieur",
  "Murs par l'extérieur",
  "Plancher bas",
] as const;
const rate: Record<(typeof what)[number], [number, number]> = {
  "Combles perdus": [25, 45],
  Rampants: [55, 90],
  "Murs par l'intérieur": [60, 95],
  "Murs par l'extérieur": [130, 190],
  "Plancher bas": [30, 60],
};

function Estimation() {
  const [home, setHome] = useState<(typeof housing)[number]>("Maison");
  const [item, setItem] = useState<(typeof what)[number]>("Combles perdus");
  const [area, setArea] = useState(80);
  const [lo, hi] = rate[item];
  const fmt = (n: number) => (Math.round(n / 100) * 100).toLocaleString("fr-FR");
  const chip =
    "h-11 rounded-full px-5 text-[15px] ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--brun) aria-pressed:text-white aria-pressed:ring-(--brun)";
  const field =
    "mt-2 h-12 w-full rounded-[12px] bg-white px-4 text-[16px] ring-1 ring-inset ring-black/15 outline-none focus:ring-2 focus:ring-(--braise)";
  return (
    <>
      <PageTitle crumb="Visite gratuite" title="Une première idée du prix, puis une vraie visite" />
      <section
        className={cn(
          "grid gap-12 bg-white py-16 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16",
          pad,
        )}
      >
        <div className="space-y-8">
          <div>
            <p className="text-[15px] font-semibold">Logement</p>
            <Pick
              options={housing}
              value={home}
              onChange={setHome}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold">À isoler</p>
            <Pick
              options={what}
              value={item}
              onChange={setItem}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              Surface <span className="text-(--braise-t)">{area} m²</span>
            </span>
            <input
              type="range"
              min={10}
              max={200}
              step={5}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-4 w-full accent-(--braise)"
            />
          </label>
          <div className="rounded-[20px] bg-(--laine) p-6">
            <p className="text-[14px] text-black/55">Fourchette indicative, TTC, avant aides</p>
            <p className={cn(serif, "mt-1 text-[48px] leading-none")}>
              {fmt(area * lo)} – {fmt(area * hi)} €
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-black/60">
              Le montant des aides dépend de vos revenus et des règles en vigueur : il sera calculé
              dans votre devis, après la visite.
            </p>
          </div>
        </div>
        <div>
          <h2 className={cn(serif, "text-[30px]")}>Demander la visite</h2>
          <DemoForm
            success={{
              title: "Demande reçue",
              text: `${item}, ${area} m² : nous vous appelons pour fixer la visite, gratuite et sans engagement.`,
            }}
            submit="Demander la visite gratuite"
            submitClassName={cn(btnWarm, "mt-7 w-full")}
            className="mt-6"
          >
            <div className="grid gap-5 @min-[900px]:grid-cols-2">
              <label className="block">
                <span className="text-[14px] font-medium text-black/70">Nom</span>
                <input className={field} />
              </label>
              <label className="block">
                <span className="text-[14px] font-medium text-black/70">Téléphone</span>
                <input className={field} type="tel" placeholder="06 00 00 00 00" />
              </label>
              <label className="block">
                <span className="text-[14px] font-medium text-black/70">Commune</span>
                <input className={field} placeholder="Creutzwald" />
              </label>
              <label className="block">
                <span className="text-[14px] font-medium text-black/70">Chauffage actuel</span>
                <select className={field} defaultValue="Gaz">
                  {["Gaz", "Fioul", "Électrique", "Bois", "Pompe à chaleur"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>
          </DemoForm>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Contact */

function Contact() {
  const field =
    "mt-2 h-12 w-full rounded-[12px] bg-white px-4 text-[16px] ring-1 ring-inset ring-black/15 outline-none focus:ring-2 focus:ring-(--braise)";
  return (
    <>
      <PageTitle
        crumb="Contact"
        title="Une question avant de vous décider ?"
        intro="Nous répondons nous-mêmes, sans centre d'appel."
      />
      <section
        className={cn(
          "grid gap-12 bg-white py-16 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20",
          pad,
        )}
      >
        <div>
          <p className="text-[15px] text-black/55">Du lundi au vendredi, 8 h – 18 h</p>
          <p className={cn(serif, "mt-2 text-[44px] leading-none")}>{PHONE}</p>
          <dl className="mt-10 space-y-6 text-[15.5px]">
            <div>
              <dt className="font-semibold">Zone d&apos;intervention</dt>
              <dd className="mt-1 text-black/60">
                Creutzwald et 40 km autour : Saint-Avold, Boulay, Bouzonville, Faulquemont
              </dd>
            </div>
            <div>
              <dt className="font-semibold">E-mail</dt>
              <dd className="mt-1 text-black/60">contact@cocon-isolation-exemple.fr</dd>
            </div>
          </dl>
        </div>
        <DemoForm
          success={{ title: "Message envoyé", text: "Nous vous répondons sous 24 heures ouvrées." }}
          submit="Envoyer"
          submitClassName={cn(btnDark, "mt-7 w-full")}
        >
          <div className="grid gap-5 @min-[900px]:grid-cols-2">
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Nom</span>
              <input className={field} />
            </label>
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Téléphone ou e-mail</span>
              <input className={field} />
            </label>
            <label className="block @min-[900px]:col-span-2">
              <span className="text-[14px] font-medium text-black/70">Votre question</span>
              <textarea rows={4} className={cn(field, "h-auto resize-none py-3")} />
            </label>
          </div>
        </DemoForm>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

function Mentions() {
  return (
    <>
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Cocon Isolation est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Le numéro RGE affiché est un exemple. Les photos sont libres de droits."
      />
      <section className={cn("bg-white py-14", pad)}>
        <PhotoCredits
          photos={[
            "iso-hero",
            "iso-combles",
            "iso-murs",
            "iso-comble-fenetre",
            "iso-interieur",
            "iso-fibre",
            "iso-maison",
            "iso-laine",
            "iso-cocon",
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
      className="bg-(--laine)"
      header={<Header />}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        {
          id: "isolations",
          label: "Nos isolations",
          path: "/isolations",
          render: () => <Isolations />,
        },
        { id: "aides", label: "Aides", path: "/aides", render: () => <Aides /> },
        {
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        {
          id: "estimation",
          label: "Visite gratuite",
          path: "/visite-gratuite",
          render: () => <Estimation />,
        },
        { id: "contact", label: "Contact", path: "/contact", render: () => <Contact /> },
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
