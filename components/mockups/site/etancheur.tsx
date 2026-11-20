"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Familjen_Grotesk } from "next/font/google";
import { ArrowRight, Camera, Phone, X } from "lucide-react";
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
  PayOnline,
} from "./frame";

/*
 * Calfeutre, étancheur à Metz (entreprise fictive).
 * Toitures-terrasses, balcons, toitures végétalisées. Le métier se voit en
 * coupe : une toiture-terrasse est un empilement de couches, que l'on peut
 * ouvrir une à une. Anthracite de membrane, vert sedum, béton clair.
 */

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 62 40";

const vars = {
  "--membrane": "#202326",
  "--membrane-2": "#2c3035",
  "--sedum": "#86a64a",
  "--sedum-t": "#4c6a24",
  "--beton": "#ebeae5",
  "--ink-text": "#1c1f22",
  fontFamily: familjen.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";

/* ---------------------------------------------------------------- Données */

const places = [
  "Toiture-terrasse",
  "Balcon ou loggia",
  "Terrasse sur local",
  "Toiture végétalisée",
] as const;

type Layer = { id: string; t: string; d: string; h: number; fill: string; pattern?: string };

/** Coupe d'une toiture-terrasse accessible, du support à la protection. */
const layers: Layer[] = [
  {
    id: "protection",
    t: "Protection",
    d: "Dalles sur plots, gravillons ou substrat végétalisé : la couche qui marche, qui pousse ou qui protège la membrane des UV.",
    h: 58,
    fill: "#b9b6ab",
    pattern: "dalles",
  },
  {
    id: "membrane",
    t: "Membrane d'étanchéité",
    d: "Deux couches de bitume élastomère soudées à la flamme, ou une membrane synthétique. C'est elle qui arrête l'eau, relevés compris.",
    h: 30,
    fill: "#202326",
  },
  {
    id: "isolant",
    t: "Isolant",
    d: "Panneaux rigides de polyuréthane ou de laine de roche, posés en pente vers les évacuations. Épaisseur calculée pour la réglementation.",
    h: 92,
    fill: "#e2cf7e",
    pattern: "isolant",
  },
  {
    id: "vapeur",
    t: "Pare-vapeur",
    d: "Un film bitumineux qui empêche l'humidité de la maison de mouiller l'isolant par en dessous.",
    h: 16,
    fill: "#6c7177",
  },
  {
    id: "support",
    t: "Support béton",
    d: "La dalle existante, vérifiée et réparée avant tout : fissures, pente, état des évacuations.",
    h: 78,
    fill: "#a9aba7",
    pattern: "beton",
  },
];

type Job = {
  src: string;
  t: string;
  c: string;
  k: "Toiture-terrasse" | "Végétalisée" | "Balcon" | "Copropriété";
  m2: string;
  steps: string[];
};

const jobs: Job[] = [
  {
    src: "eta-hero",
    t: "Toiture-terrasse végétalisée",
    c: "Immeuble de bureaux",
    k: "Végétalisée",
    m2: "420 m²",
    steps: [
      "Dépose de l'ancienne étanchéité et du gravier",
      "Isolant en pente et membrane anti-racines",
      "Substrat et tapis de sedum, chemins en dalles",
    ],
  },
  {
    src: "eta-terrasse",
    t: "Terrasse accessible sur garage",
    c: "Montigny-lès-Metz",
    k: "Toiture-terrasse",
    m2: "64 m²",
    steps: [
      "Recherche de fuite au gaz traceur",
      "Reprise des relevés et du seuil de porte-fenêtre",
      "Dalles sur plots réglables",
    ],
  },
  {
    src: "eta-balcon",
    t: "Balcons d'une résidence",
    c: "Woippy",
    k: "Balcon",
    m2: "18 balcons",
    steps: [
      "Diagnostic photo balcon par balcon",
      "Résine d'étanchéité sous carrelage",
      "Remplacement des nez de dalle",
    ],
  },
  {
    src: "eta-copro",
    t: "Copropriété de 42 logements",
    c: "Metz, Queuleu",
    k: "Copropriété",
    m2: "680 m²",
    steps: [
      "Visite avec le conseil syndical",
      "Chantier sans coupure pour les habitants",
      "Rapport final remis au syndic",
    ],
  },
  {
    src: "eta-vegetal",
    t: "Toit vert sur maison",
    c: "Ars-sur-Moselle",
    k: "Végétalisée",
    m2: "95 m²",
    steps: [
      "Contrôle de la charge admissible",
      "Membrane anti-racines",
      "Sedum précultivé posé en rouleaux",
    ],
  },
  {
    src: "eta-villa",
    t: "Maison à toit plat",
    c: "Marly",
    k: "Toiture-terrasse",
    m2: "140 m²",
    steps: ["Isolation par l'extérieur", "Membrane synthétique blanche", "Couvertines alu"],
  },
];

const reviews = [
  {
    n: "Claire",
    c: "Metz",
    t: "L'eau passait au plafond du salon depuis deux hivers. Ils ont trouvé l'origine en une matinée : un relevé décollé derrière la jardinière.",
  },
  {
    n: "Thomas, conseil syndical",
    c: "Woippy",
    t: "Dix-huit balcons faits en trois semaines, un rapport photo par logement. Les copropriétaires ont tout vu sans monter sur un échafaudage.",
  },
  {
    n: "Jean-Marc",
    c: "Marly",
    t: "Devis clair, couche par couche. Personne d'autre ne m'avait expliqué pourquoi mon isolant était mouillé.",
  },
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-12 items-center justify-center gap-2 px-6 text-[15.5px] font-semibold transition-colors";
const btnDark = cn(btn, "bg-(--membrane) text-white hover:bg-black");
const btnSedum = cn(btn, "bg-(--sedum) text-(--membrane) hover:brightness-105");
const btnLine = cn(btn, "ring-1 ring-inset ring-current/30 hover:ring-current/70");

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[30px] leading-[1.05] font-bold tracking-[-0.025em] text-balance @min-[900px]:text-[46px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 34 34" className="size-8.5" aria-hidden="true">
        <rect x="2" y="21" width="30" height="4" fill="var(--sedum)" />
        <rect x="2" y="26" width="30" height="3" fill={light ? "#ffffff" : "var(--membrane)"} />
        <path
          d="M17 3c3.6 4.7 6 7.9 6 10.6a6 6 0 0 1-12 0C11 10.9 13.4 7.7 17 3Z"
          fill={light ? "#ffffff" : "var(--membrane)"}
        />
      </svg>
      <span className="leading-none">
        <span className="block text-[22px] font-bold tracking-[-0.02em]">Calfeutre</span>
        <span className={cn("mt-1 block text-[12.5px]", light ? "text-white/60" : "text-black/50")}>
          Étanchéité à Metz
        </span>
      </span>
    </span>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className={cn("flex h-18 items-center gap-8 border-b border-black/8", pad)}>
        <Go to="home" label="Calfeutre, accueil" className="text-left">
          <Logo />
        </Go>
        <nav className="ml-auto hidden items-center gap-1 @min-[1100px]:flex">
          {nav
            .filter((p) => p.id !== "signaler")
            .map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(p.id)}
                aria-current={p.id === page ? "page" : undefined}
                className="h-10 px-3.5 text-[15px] font-medium text-black/60 hover:text-black aria-[current=page]:bg-(--beton) aria-[current=page]:text-black"
              >
                {p.label}
              </button>
            ))}
        </nav>
        <span className="ml-auto hidden text-[14.5px] font-semibold @min-[900px]:inline @min-[1100px]:ml-0">
          {PHONE}
        </span>
        <Go
          to="signaler"
          className={cn(btnDark, "hidden h-11 px-5 text-[15px] @min-[900px]:inline-flex")}
        >
          Signaler une infiltration
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid h-11 min-w-11 place-items-center px-3 text-[14px] font-semibold ring-1 ring-black/12 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? <X className="size-5" /> : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="border-b border-black/8 px-5 pb-3 @min-[1100px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className="flex w-full items-center justify-between border-b border-black/6 py-3.5 text-[17px] font-semibold last:border-0"
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
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/8 bg-white p-3 @min-[900px]:hidden">
      <Go to="signaler" className={cn(btnDark, "h-12 px-3 text-[15px]")}>
        Signaler une fuite
      </Go>
      <Go to="signaler" className={cn(btnLine, "h-12 px-3 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--membrane) text-white/65">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div className="text-white">
          <Logo light />
          <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed text-white/65">
            Toitures-terrasses, balcons et toits végétalisés en Moselle, pour les particuliers et
            les copropriétés.
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
        <div className="text-[14px]">
          <p className="font-semibold text-white">Garanties</p>
          <p className="mt-3 leading-relaxed">
            Assurance décennale
            <br />
            Qualification Qualibat étanchéité
            <br />
            Membranes sous avis technique
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-bold text-white">{PHONE}</p>
          <p className="mt-1">contact@calfeutre-exemple.fr</p>
          <p className="mt-1">Metz et 40 km autour</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Calfeutre</span>
          <button type="button" onClick={() => go("credits")} className="hover:text-white">
            Mentions légales et crédits photos
          </button>
        </span>
        <PayOnline />
        <span>Entreprise fictive : site d&apos;exemple réalisé par NEOBATYS</span>
      </div>
    </footer>
  );
}

function PageTitle({
  crumb,
  title,
  intro,
  dark = false,
}: {
  crumb: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "pt-10 pb-12 @min-[900px]:pt-14 @min-[900px]:pb-16",
        pad,
        dark ? "bg-(--membrane) text-white" : "bg-(--beton)",
      )}
    >
      <p className={cn("text-[14px]", dark ? "text-white/55" : "text-black/50")}>
        <Go to="home" className={dark ? "hover:text-white" : "hover:text-black"}>
          Accueil
        </Go>{" "}
        / <span className={dark ? "text-white/80" : "text-black/75"}>{crumb}</span>
      </p>
      <h1 className="mt-4 max-w-[820px] text-[36px] leading-[1.03] font-bold tracking-[-0.03em] text-balance @min-[900px]:text-[56px]">
        {title}
      </h1>
      {intro && (
        <p
          className={cn(
            "mt-4 max-w-[620px] text-[17px] leading-relaxed",
            dark ? "text-white/65" : "text-black/60",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------- Coupe interactive */

/** Position verticale de chaque couche dans la coupe (calculée une fois). */
const rows = layers.reduce<(Layer & { y: number })[]>(
  (acc, l) => [
    ...acc,
    { ...l, y: acc.length ? acc[acc.length - 1].y + acc[acc.length - 1].h : 30 },
  ],
  [],
);
const stackHeight = rows[rows.length - 1].y + rows[rows.length - 1].h;

function Section({
  active,
  onPick,
  compact = false,
}: {
  active: string;
  onPick: (id: string) => void;
  compact?: boolean;
}) {
  const W = 560;
  const y = stackHeight;
  const current = layers.find((l) => l.id === active) ?? layers[0];
  return (
    <div
      className={cn(
        "grid gap-8",
        !compact &&
          "@min-[900px]:grid-cols-[1.15fr_1fr] @min-[900px]:items-center @min-[900px]:gap-14",
      )}
    >
      <svg
        viewBox={`0 0 ${W} ${y + 20}`}
        className="w-full"
        role="img"
        aria-label="Coupe d'une toiture-terrasse"
      >
        <defs>
          <pattern id="eta-isolant" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 14 L14 0" stroke="#c9b45f" strokeWidth="1.2" />
          </pattern>
          <pattern id="eta-beton" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="5" r="1.4" fill="#8d8f8b" />
            <circle cx="12" cy="13" r="1" fill="#8d8f8b" />
          </pattern>
          <pattern id="eta-dalles" width="70" height="34" patternUnits="userSpaceOnUse">
            <rect width="66" height="26" fill="#c9c6bc" />
            <rect x="30" y="26" width="6" height="8" fill="#6c7177" />
          </pattern>
        </defs>
        {/* Relevé contre l'acrotère */}
        <rect x={W - 46} y={10} width={30} height={y - 10} fill="#a9aba7" />
        <rect x={W - 52} y={8} width={42} height={8} fill="#8a8d90" />
        {rows.map((l) => {
          const on = l.id === active;
          return (
            <g
              key={l.id}
              role="button"
              tabIndex={0}
              aria-label={l.t}
              aria-pressed={on}
              onClick={() => onPick(l.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPick(l.id)}
              className="cursor-pointer outline-none"
              style={{
                transform: on ? "translateX(-14px)" : undefined,
                transition: "transform .25s ease",
              }}
            >
              <rect x={20} y={l.y} width={W - 70} height={l.h} fill={l.fill} />
              {l.pattern && (
                <rect x={20} y={l.y} width={W - 70} height={l.h} fill={`url(#eta-${l.pattern})`} />
              )}
              {l.id === "membrane" && (
                <rect x={W - 50} y={14} width={6} height={l.y + l.h - 14} fill="#202326" />
              )}
              <rect
                x={20}
                y={l.y}
                width={W - 70}
                height={l.h}
                fill="none"
                stroke={on ? "var(--sedum)" : "transparent"}
                strokeWidth={3}
              />
            </g>
          );
        })}
      </svg>
      <div>
        <div className="flex flex-wrap gap-2">
          {layers.map((l, i) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onPick(l.id)}
              aria-pressed={l.id === active}
              className="h-9 px-3 text-[13.5px] font-medium ring-1 ring-black/15 ring-inset aria-pressed:bg-(--membrane) aria-pressed:text-white aria-pressed:ring-(--membrane)"
            >
              {i + 1}. {l.t}
            </button>
          ))}
        </div>
        <p className="mt-6 text-[24px] font-bold tracking-[-0.02em]">{current.t}</p>
        <p className="mt-2 max-w-[460px] text-[16px] leading-relaxed text-black/62">{current.d}</p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  const [layer, setLayer] = useState("membrane");
  return (
    <>
      {/* Premier écran : le toit en grand, la question qui amène le client */}
      <section className="relative">
        <div className="relative h-[280px] @min-[900px]:h-[350px]">
          <Photo
            src="eta-hero"
            alt="Grande toiture-terrasse végétalisée avec lanterneaux"
            priority
            sizes="(min-width: 1024px) 1280px, 100vw"
            position="50% 60%"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <p className="absolute top-4 right-5 bg-black/35 px-2.5 py-1 text-[13px] text-white/90 @min-[900px]:right-16">
            Toiture végétalisée de 420 m²
          </p>
        </div>
        <div className="bg-(--membrane) text-white">
          <div
            className={cn(
              "grid gap-8 py-10 @min-[900px]:grid-cols-[1.45fr_1fr] @min-[900px]:items-end @min-[900px]:gap-14 @min-[900px]:py-12",
              pad,
            )}
          >
            <div>
              <h1 className="text-[36px] leading-[1.02] font-bold tracking-[-0.035em] text-balance @min-[900px]:text-[52px]">
                L&apos;eau passe par le toit&nbsp;? On trouve d&apos;où, et on la fait arrêter.
              </h1>
              <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-white/65">
                Toitures-terrasses, balcons et toits végétalisés, à Metz et 40 km autour. Diagnostic
                sous 5 jours, devis détaillé couche par couche.
              </p>
            </div>
            <div>
              <p className="text-[14.5px] text-white/60">Où se trouve le problème&nbsp;?</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {places.map((p) => (
                  <Go
                    key={p}
                    to="signaler"
                    param={p}
                    className="flex h-12 items-center justify-between gap-2 px-4 text-left text-[15px] font-medium ring-1 ring-white/25 ring-inset hover:bg-white hover:text-(--membrane)"
                  >
                    {p} <ArrowRight className="size-4 shrink-0 opacity-60" />
                  </Go>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preuves */}
      <section
        className={cn(
          "grid gap-6 border-b border-black/8 py-10 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-4",
          pad,
        )}
      >
        {[
          ["Sous 5 jours", "pour le diagnostic sur place"],
          ["10 ans", "de garantie décennale sur l'étanchéité"],
          ["Rapport photo", "remis après chaque chantier"],
          ["4,8 sur Google", "54 avis de particuliers et syndics"],
        ].map(([t, d]) => (
          <div key={t} className="border-l-2 border-(--sedum) pl-4">
            <p className="text-[21px] font-bold tracking-[-0.01em]">{t}</p>
            <p className="mt-1 text-[14.5px] text-black/55">{d}</p>
          </div>
        ))}
      </section>

      {/* Coupe */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[720px]">
          Une terrasse étanche, c&apos;est cinq couches. Il suffit d&apos;une pour que l&apos;eau
          passe.
        </H2>
        <p className="mt-4 max-w-[600px] text-[17px] leading-relaxed text-black/60">
          Touchez une couche pour voir son rôle. Nos devis détaillent chacune d&apos;elles, avec la
          marque et l&apos;épaisseur.
        </p>
        <div className="mt-12">
          <Section active={layer} onPick={setLayer} />
        </div>
      </section>

      {/* Prestations en photos */}
      <section className={cn("bg-(--beton) py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2>Ce que nous rendons étanche</H2>
          <Go
            to="terrasses"
            className="inline-flex items-center gap-2 text-[15.5px] font-semibold text-(--sedum-t) hover:underline"
          >
            Toutes les prestations <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="mt-10 grid gap-5 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-[1.3fr_1fr_1fr]">
          {[
            {
              src: "eta-terrasse",
              t: "Toitures-terrasses",
              d: "Accessibles ou non, sur maison, garage ou immeuble.",
              to: "terrasses",
            },
            {
              src: "eta-balcon",
              t: "Balcons et loggias",
              d: "Résine sous carrelage, reprise des nez de dalle.",
              to: "terrasses",
            },
            {
              src: "eta-vegetal",
              t: "Toits végétalisés",
              d: "Membrane anti-racines et sedum, avec contrôle de charge.",
              to: "terrasses",
            },
          ].map((s, i) => (
            <Go key={s.t} to={s.to} className="group bg-white text-left">
              <span
                className={cn(
                  "relative block overflow-hidden",
                  i === 0 ? "h-[300px]" : "h-[220px] @min-[900px]:h-[300px]",
                )}
              >
                <Photo
                  src={s.src}
                  alt={s.t}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="block p-5">
                <span className="block text-[19px] font-semibold">{s.t}</span>
                <span className="mt-1 block text-[15px] text-black/58">{s.d}</span>
              </span>
            </Go>
          ))}
        </div>
      </section>

      {/* Chantier documenté */}
      <section
        className={cn(
          "grid gap-10 py-16 @min-[900px]:grid-cols-[1fr_1.1fr] @min-[900px]:items-center @min-[900px]:gap-16 @min-[900px]:py-24",
          pad,
        )}
      >
        <div className="relative h-[280px] @min-[900px]:h-[480px]">
          <Photo
            src="eta-chantier"
            alt="Équipe en réfection sur un toit plat"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
        <div>
          <H2>Une fois recouverte, l&apos;étanchéité ne se voit plus. Nos photos, si.</H2>
          <p className="mt-5 text-[17px] leading-relaxed text-black/62">
            À chaque étape, l&apos;équipe photographie la couche posée avant de la recouvrir. Vous
            recevez le rapport complet à la réception : c&apos;est la preuve du travail fait, pour
            vous ou pour votre assureur.
          </p>
          <ol className="mt-8 space-y-4 border-t border-black/8 pt-8">
            {[
              "Support réparé et nettoyé",
              "Pare-vapeur et isolant en pente",
              "Membrane en deux couches, relevés compris",
              "Essai d'eau avant la protection",
            ].map((s, i) => (
              <li key={s} className="flex items-baseline gap-4 text-[16.5px]">
                <span className="w-6 text-[15px] font-bold text-(--sedum-t)">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <Go to="chantiers" className={cn(btnDark, "mt-9")}>
            Voir des chantiers documentés
          </Go>
        </div>
      </section>

      {/* Syndics */}
      <section className="grid bg-(--membrane) text-white @min-[900px]:grid-cols-[1fr_1fr]">
        <div className={cn("py-16 @min-[900px]:py-20", pad)}>
          <p className="text-[15px] text-(--sedum)">Syndics, gestionnaires, conseils syndicaux</p>
          <H2 className="mt-4">Une copropriété suivie dans la durée, pas seulement réparée.</H2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-white/65">
            Visite annuelle des toitures, nettoyage des évacuations, rapport photo transmis au
            syndic avant l&apos;assemblée générale.
          </p>
          <Go to="syndics" className={cn(btnSedum, "mt-8")}>
            Notre offre pour les copropriétés
          </Go>
        </div>
        <div className="relative h-[260px] @min-[900px]:h-auto">
          <Photo
            src="eta-copro"
            alt="Immeuble en brique avec balcons"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </div>
      </section>

      {/* Avis */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-center gap-3 text-[15px] text-black/60">
          <GoogleG className="size-5" />
          <b className="text-[18px] text-(--ink-text)">4,8</b>
          <Stars className="text-[15px]" />
          <span>54 avis Google</span>
        </div>
        <div className="mt-10 grid gap-10 @min-[900px]:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.n}>
              <blockquote className="text-[18px] leading-relaxed">« {r.t} »</blockquote>
              <figcaption className="mt-4 text-[14.5px] text-black/55">
                <b className="text-(--ink-text)">{r.n}</b>, {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={cn("border-t border-black/8 bg-(--beton) py-14", pad)}>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-[26px] font-bold tracking-[-0.02em] @min-[900px]:text-[32px]">
              Une tache au plafond, une flaque qui reste&nbsp;?
            </p>
            <p className="mt-2 text-[16.5px] text-black/60">
              Envoyez deux photos : on vous dit si c&apos;est urgent.
            </p>
          </div>
          <Go to="signaler" className={btnDark}>
            Signaler une infiltration
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------ Toitures-terrasses */

function Terrasses() {
  const [layer, setLayer] = useState("isolant");
  const offers = [
    {
      src: "eta-terrasse-verre",
      t: "Toiture-terrasse accessible",
      d: "Isolant, membrane bicouche et dalles sur plots. Seuils et relevés repris sous les menuiseries.",
      p: "à partir de 120 € HT / m²",
    },
    {
      src: "eta-villa",
      t: "Toit plat non accessible",
      d: "Membrane synthétique ou bitume autoprotégé, couvertines et évacuations neuves.",
      p: "à partir de 85 € HT / m²",
    },
    {
      src: "eta-pente",
      t: "Toiture végétalisée",
      d: "Membrane anti-racines, drainage, substrat et sedum. Entretien une fois par an.",
      p: "à partir de 140 € HT / m²",
    },
    {
      src: "eta-balcon",
      t: "Balcons et loggias",
      d: "Résine circulable ou sous carrelage, traitement des fissures et des nez de dalle.",
      p: "à partir de 650 € HT / balcon",
    },
  ];
  return (
    <>
      <PageTitle
        crumb="Toitures-terrasses"
        title="Toitures-terrasses, balcons, toits végétalisés"
        intro="Neuf ou réfection, chaque devis détaille le support, l'isolant, la membrane et la protection."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <div className="grid gap-10 @min-[900px]:grid-cols-2">
          {offers.map((o) => (
            <article key={o.t}>
              <div className="relative h-[240px] @min-[900px]:h-[300px]">
                <Photo src={o.src} alt={o.t} sizes="(min-width: 1024px) 560px, 100vw" />
              </div>
              <h2 className="mt-5 text-[23px] font-bold tracking-[-0.015em]">{o.t}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-black/60">{o.d}</p>
              <p className="mt-3 text-[15px] font-semibold text-(--sedum-t)">{o.p}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[13.5px] text-black/50">
          Prix indicatifs, hors dépose et accès difficile. Le prix ferme est donné après visite.
        </p>
      </section>
      <section className={cn("bg-(--beton) py-16 @min-[900px]:py-20", pad)}>
        <H2>La coupe, couche par couche</H2>
        <div className="mt-10">
          <Section active={layer} onPick={setLayer} />
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Chantiers */

const kinds = ["Tous", "Toiture-terrasse", "Végétalisée", "Balcon", "Copropriété"] as const;

function Chantiers() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("Tous");
  const [open, setOpen] = useState<string | null>(null);
  const shown = jobs.filter((j) => kind === "Tous" || j.k === kind);
  const job = jobs.find((j) => j.src === open);
  return (
    <>
      <PageTitle
        crumb="Chantiers"
        title="Des chantiers documentés, étape par étape"
        intro="Chaque chantier a son rapport photo. En voici quelques-uns, avec l'accord des clients."
      />
      <section className={cn("py-12 @min-[900px]:py-16", pad)}>
        <Pick
          options={kinds}
          value={kind}
          onChange={(k) => {
            setKind(k);
            setOpen(null);
          }}
          itemClassName="h-10 px-4 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 aria-pressed:bg-(--membrane) aria-pressed:text-white aria-pressed:ring-(--membrane)"
        />
        {job && (
          <article className="mt-8 grid gap-8 bg-(--beton) p-5 @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:p-8">
            <div className="relative h-[260px] @min-[900px]:h-[380px]">
              <Photo src={job.src} alt={job.t} sizes="(min-width: 1024px) 640px, 100vw" />
            </div>
            <div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="text-[14px] text-black/55 hover:text-black"
              >
                Fermer ×
              </button>
              <h2 className="mt-3 text-[28px] font-bold tracking-[-0.02em]">{job.t}</h2>
              <p className="mt-1 text-[15px] text-black/55">
                {job.c}, {job.m2}
              </p>
              <ol className="mt-6 space-y-4">
                {job.steps.map((s, i) => (
                  <li key={s} className="flex gap-4 border-t border-black/10 pt-4 text-[16px]">
                    <span className="flex items-center gap-1.5 text-[14px] font-semibold text-(--sedum-t)">
                      <Camera className="size-4" /> {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </article>
        )}
        <div className="mt-8 grid gap-6 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3">
          {shown.map((j) => (
            <button
              key={j.src}
              type="button"
              onClick={() => setOpen(j.src)}
              className="group text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Photo
                  src={j.src}
                  alt={j.t}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-3 block text-[17.5px] font-semibold">{j.t}</span>
              <span className="block text-[14px] text-black/55">
                {j.c}, {j.m2}, {j.steps.length} étapes photographiées
              </span>
            </button>
          ))}
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------------------- Syndics */

function Syndics() {
  return (
    <>
      <PageTitle
        dark
        crumb="Copropriétés"
        title="Pour les syndics et les conseils syndicaux"
        intro="Une seule entreprise pour les toitures-terrasses, les balcons et les infiltrations de l'immeuble, avec des rapports que l'on peut présenter en assemblée générale."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <h2 className="text-[26px] font-bold tracking-[-0.02em]">Le contrat d&apos;entretien</h2>
          <ul className="mt-6 divide-y divide-black/8 border-y border-black/8">
            {[
              ["Visite annuelle", "Toitures, relevés, joints et évacuations, au printemps."],
              ["Nettoyage", "Évacuations, chéneaux et toits végétalisés désherbés."],
              ["Rapport photo", "Envoyé au syndic, avec les points à surveiller et leur coût."],
              [
                "Intervention prioritaire",
                "Sous 48 h en cas d'infiltration chez un copropriétaire.",
              ],
            ].map(([t, d]) => (
              <li key={t} className="py-4">
                <p className="text-[17px] font-semibold">{t}</p>
                <p className="mt-1 text-[15px] text-black/58">{d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15px] text-black/55">
            À partir de 0,90 € HT par m² de toiture et par an.
          </p>
        </div>
        <div>
          <div className="relative h-[260px]">
            <Photo
              src="eta-facade"
              alt="Façade d'immeuble à balcons"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <h2 className="mt-8 text-[26px] font-bold tracking-[-0.02em]">
            Demande de visite pour un immeuble
          </h2>
          <DemoForm
            success={{
              title: "Demande reçue",
              text: "Un responsable vous rappelle pour fixer la visite avec le gardien ou le conseil syndical.",
            }}
            submit="Demander la visite"
            submitClassName={cn(btnDark, "mt-6 w-full")}
            className="mt-5"
          >
            <div className="grid gap-4 @min-[600px]:grid-cols-2">
              {[
                ["Cabinet ou syndic", "Nom du cabinet"],
                ["Adresse de l'immeuble", "Rue, commune"],
                ["Nombre de logements", "42"],
                ["Téléphone", "06 00 00 00 00"],
              ].map(([l, ph]) => (
                <label key={l} className="block">
                  <span className="text-[14px] font-medium text-black/70">{l}</span>
                  <input
                    placeholder={ph}
                    className="mt-2 h-12 w-full bg-white px-4 text-[16px] ring-1 ring-black/15 outline-none placeholder:text-black/35 focus:ring-2 focus:ring-(--membrane)"
                  />
                </label>
              ))}
            </div>
          </DemoForm>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------ Signaler infiltration */

const since = ["Cette semaine", "Ce mois-ci", "Depuis plusieurs mois"] as const;
const who = ["Particulier", "Syndic ou gestionnaire"] as const;

function Signaler() {
  const { param } = useSite();
  const [place, setPlace] = useState<(typeof places)[number]>(
    places.find((p) => p === param) ?? "Toiture-terrasse",
  );
  const [when, setWhen] = useState<(typeof since)[number]>("Cette semaine");
  const [me, setMe] = useState<(typeof who)[number]>("Particulier");
  const [photos, setPhotos] = useState(0);
  const chip =
    "h-11 px-4 text-[15px] font-medium ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--membrane) aria-pressed:text-white aria-pressed:ring-(--membrane)";
  const field =
    "mt-2 h-12 w-full bg-white px-4 text-[16px] ring-1 ring-black/15 outline-none placeholder:text-black/35 focus:ring-2 focus:ring-(--membrane)";
  return (
    <>
      <PageTitle
        crumb="Signaler une infiltration"
        title="Signaler une infiltration"
        intro="Quatre questions et deux photos : on vous rappelle sous 24 h pour vous dire si c'est urgent et fixer le diagnostic."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.4fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <DemoForm
          success={{
            title: "Signalement envoyé",
            text: `${place}, ${when.toLowerCase()} : un technicien vous rappelle sous 24 h. En attendant, placez un récipient sous l'écoulement et éloignez les appareils électriques.`,
          }}
          submit="Envoyer le signalement"
          submitClassName={cn(btnDark, "mt-8 w-full")}
        >
          <p className="text-[15px] font-semibold">Où voyez-vous l&apos;eau&nbsp;?</p>
          <Pick
            options={places}
            value={place}
            onChange={setPlace}
            className="mt-3"
            itemClassName={chip}
          />
          <p className="mt-7 text-[15px] font-semibold">Depuis quand&nbsp;?</p>
          <Pick
            options={since}
            value={when}
            onChange={setWhen}
            className="mt-3"
            itemClassName={chip}
          />
          <p className="mt-7 text-[15px] font-semibold">Vous êtes</p>
          <Pick options={who} value={me} onChange={setMe} className="mt-3" itemClassName={chip} />
          <div className="mt-7 grid gap-5 @min-[600px]:grid-cols-2">
            <label className="block">
              <span className="text-[15px] font-semibold">Commune</span>
              <input className={field} placeholder="Metz" />
            </label>
            <label className="block">
              <span className="text-[15px] font-semibold">Téléphone</span>
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
          </div>
          <p className="mt-7 text-[15px] font-semibold">Photos de la tache et du toit</p>
          <button
            type="button"
            onClick={() => setPhotos((n) => Math.min(n + 1, 4))}
            className="mt-3 flex h-24 w-full items-center justify-center gap-3 border-2 border-dashed border-black/20 text-[15px] text-black/60 hover:border-black/40"
          >
            <Camera className="size-5" />
            {photos
              ? `${photos} photo${photos > 1 ? "s" : ""} ajoutée${photos > 1 ? "s" : ""} (exemple)`
              : "Ajouter des photos"}
          </button>
        </DemoForm>
        <aside className="bg-(--beton) p-6 @min-[900px]:p-8">
          <div className="relative h-[200px]">
            <Photo src="eta-flaque" alt="Eau stagnante sur un toit plat" sizes="420px" />
          </div>
          <h2 className="mt-6 text-[22px] font-bold tracking-[-0.02em]">
            En attendant notre passage
          </h2>
          <ol className="mt-4 space-y-3 text-[15.5px] leading-relaxed">
            {[
              "Placez un récipient sous l'écoulement et protégez le sol.",
              "Coupez l'électricité de la pièce si l'eau approche d'un plafonnier.",
              "Ne montez pas sur le toit par temps de pluie.",
              "Prenez des photos datées pour votre assureur.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="font-bold text-(--sedum-t)">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[14px] text-black/55">Ou appelez directement</p>
          <p className="text-[26px] font-bold">{PHONE}</p>
        </aside>
      </section>
      <Footer />
    </>
  );
}

/* --------------------------------------------------------------- Crédits */

function Credits() {
  return (
    <>
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Calfeutre est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits
          photos={[
            "eta-hero",
            "eta-vegetal",
            "eta-terrasse",
            "eta-terrasse-verre",
            "eta-balcon",
            "eta-copro",
            "eta-flaque",
            "eta-chantier",
            "eta-villa",
            "eta-facade",
            "eta-pente",
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
          id: "terrasses",
          label: "Toitures-terrasses",
          path: "/toitures-terrasses",
          render: () => <Terrasses />,
        },
        { id: "chantiers", label: "Chantiers", path: "/chantiers", render: () => <Chantiers /> },
        { id: "syndics", label: "Copropriétés", path: "/coproprietes", render: () => <Syndics /> },
        {
          id: "signaler",
          label: "Signaler une infiltration",
          path: "/signaler-une-infiltration",
          render: () => <Signaler />,
        },
        {
          id: "credits",
          label: "Mentions légales",
          path: "/mentions-legales",
          render: () => <Credits />,
          inNav: false,
        },
      ]}
    />
  );
}
