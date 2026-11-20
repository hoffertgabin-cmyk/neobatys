"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { ArrowRight, Phone, X } from "lucide-react";
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
 * Atelier Calepin, carreleur à Amnéville (entreprise fictive).
 * Le calepinage, c'est le plan de pose dessiné avant le chantier : le site
 * reprend cette idée. Photos posées en mosaïque avec de vrais joints,
 * motifs de pose dessinés en direct, estimation au m².
 * Vert émail, craie, encre ; une serif fine pour les titres.
 */

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 58 26";

const vars = {
  "--email": "#1d5945",
  "--email-d": "#123b2e",
  "--craie": "#f6f4ef",
  "--joint": "#dcd7cc",
  "--ink-text": "#1c2220",
  "--serif": serif.style.fontFamily,
  fontFamily: sans.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";
const display = "font-(family-name:--serif) font-normal tracking-[-0.01em]";

/* ---------------------------------------------------------------- Données */

type Work = { src: string; t: string; c: string; k: Kind; f: string };
type Kind = "Salle de bain" | "Cuisine" | "Sols" | "Extérieur";

const works: Work[] = [
  {
    src: "car-hero",
    t: "Banquette et sol en zellige",
    c: "Thionville",
    k: "Salle de bain",
    f: "Zellige 10 × 10",
  },
  {
    src: "car-chevron",
    t: "Douche en point de Hongrie",
    c: "Metz",
    k: "Salle de bain",
    f: "Faïence 7,5 × 30",
  },
  { src: "car-damier", t: "Damier de marbre vert", c: "Metz", k: "Sols", f: "Marbre 30 × 30" },
  {
    src: "car-cuisine",
    t: "Crédence anthracite verticale",
    c: "Rombas",
    k: "Cuisine",
    f: "Faïence 6,5 × 20",
  },
  {
    src: "car-ecailles",
    t: "Mur en écailles",
    c: "Hagondange",
    k: "Salle de bain",
    f: "Écailles émaillées",
  },
  {
    src: "car-terrazzo",
    t: "Terrazzo sous véranda",
    c: "Maizières-lès-Metz",
    k: "Extérieur",
    f: "Terrazzo 60 × 60",
  },
  {
    src: "car-sejour",
    t: "Séjour en grand format",
    c: "Amnéville",
    k: "Sols",
    f: "Grès 120 × 120",
  },
  {
    src: "car-baguettes",
    t: "Baguettes vert d'eau",
    c: "Thionville",
    k: "Cuisine",
    f: "Baguettes 2 × 15",
  },
  {
    src: "car-terrasse",
    t: "Terrasse sur plots",
    c: "Talange",
    k: "Extérieur",
    f: "Dalles 60 × 120",
  },
  {
    src: "car-sdb",
    t: "Marbre et faïence rouge",
    c: "Hayange",
    k: "Salle de bain",
    f: "Faïence 7,5 × 15",
  },
  {
    src: "car-zellige",
    t: "Zellige clair, mur de cuisine",
    c: "Amnéville",
    k: "Cuisine",
    f: "Zellige 10 × 10",
  },
];

const reviews = [
  {
    n: "Claire",
    c: "Metz",
    when: "il y a 3 semaines",
    t: "Douche en point de Hongrie : on nous avait déconseillé ce motif ailleurs. Ici, plan de pose envoyé avant de commencer, coupes parfaites aux angles.",
  },
  {
    n: "Julien",
    c: "Amnéville",
    when: "il y a 1 mois",
    t: "85 m² de grand format dans le séjour, sans un seul désaffleur. Chantier protégé, aspiré chaque soir, et délai tenu au jour près.",
  },
  {
    n: "Sophie",
    c: "Rombas",
    when: "il y a 2 mois",
    t: "Ils ont pris le temps de venir voir la cuisine deux fois avant le devis. La crédence est exactement celle du dessin.",
  },
];

/* --------------------------------------------------------- Motifs de pose */

type Motif = "Droit" | "Décalé" | "Bâtons rompus" | "Point de Hongrie";
const motifs: Motif[] = ["Droit", "Décalé", "Bâtons rompus", "Point de Hongrie"];
/** Chute à prévoir (pertes de coupe) et supplément de main-d'œuvre par m². */
const motifInfo: Record<Motif, { chute: number; extra: number; d: string }> = {
  Droit: { chute: 5, extra: 0, d: "Joints alignés, le plus sobre. Idéal pour les grands formats." },
  Décalé: {
    chute: 7,
    extra: 4,
    d: "Rangées décalées d'un tiers ou d'une moitié, comme un mur de briques.",
  },
  "Bâtons rompus": {
    chute: 12,
    extra: 22,
    d: "Carreaux rectangulaires posés à angle droit, en zigzag.",
  },
  "Point de Hongrie": {
    chute: 15,
    extra: 28,
    d: "Carreaux coupés en biais qui forment des flèches continues.",
  },
};

const tints = [
  { n: "Vert émail", c: "#2f6b55" },
  { n: "Blanc cassé", c: "#ece6da" },
  { n: "Terre cuite", c: "#b0643f" },
  { n: "Anthracite", c: "#3a3d3f" },
] as const;

/** Variation de teinte déterministe, pour l'aspect fait main du zellige. */
function shade(hex: string, i: number) {
  const v = (((i * 9301 + 49297) % 233280) / 233280 - 0.5) * 0.16;
  const n = parseInt(hex.slice(1), 16);
  const ch = (s: number) => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * (1 + v))));
  return `rgb(${ch(16)} ${ch(8)} ${ch(0)})`;
}

/** Dessin du motif de pose, recalculé à chaque choix. */
function PosePattern({
  motif,
  color,
  className,
}: {
  motif: Motif;
  color: string;
  className?: string;
}) {
  const W = 480;
  const H = 360;
  const g = 2.5; // joint
  const tiles: ReactNode[] = [];
  let i = 0;
  const rect = (x: number, y: number, w: number, h: number) =>
    tiles.push(
      <rect
        key={i}
        x={x + g / 2}
        y={y + g / 2}
        width={w - g}
        height={h - g}
        fill={shade(color, i++)}
      />,
    );

  if (motif === "Droit") {
    for (let y = 0; y < H; y += 60) for (let x = 0; x < W; x += 60) rect(x, y, 60, 60);
  } else if (motif === "Décalé") {
    for (let r = 0, y = 0; y < H; r++, y += 40)
      for (let x = r % 2 ? -60 : 0; x < W; x += 120) rect(x, y, 120, 40);
  } else if (motif === "Bâtons rompus") {
    const u = 24;
    const body: ReactNode[] = [];
    for (let s = -20; s < 20; s++)
      for (let n = -20; n < 30; n++) {
        const ox = n * u + s * 2 * u;
        const oy = n * u - s * 2 * u;
        body.push(
          <rect
            key={`h${s}-${n}`}
            x={ox + g / 2}
            y={oy + g / 2}
            width={2 * u - g}
            height={u - g}
            fill={shade(color, i++)}
          />,
          <rect
            key={`v${s}-${n}`}
            x={ox + g / 2}
            y={oy + u + g / 2}
            width={u - g}
            height={2 * u - g}
            fill={shade(color, i++)}
          />,
        );
      }
    tiles.push(
      <g key="br" transform={`translate(${W / 2} ${H / 2}) rotate(45)`}>
        {body}
      </g>,
    );
  } else {
    const w = 40;
    const h = 34;
    for (let col = 0, x = -w; x < W + w; col++, x += w)
      for (let y = -2 * w; y < H + w; y += h) {
        const up = col % 2 === 0;
        const pts = up
          ? `${x},${y + w} ${x + w},${y} ${x + w},${y + h} ${x},${y + w + h}`
          : `${x},${y} ${x + w},${y + w} ${x + w},${y + w + h} ${x},${y + h}`;
        tiles.push(
          <polygon
            key={i}
            points={pts}
            fill={shade(color, i++)}
            stroke="var(--joint)"
            strokeWidth={g}
            strokeLinejoin="round"
          />,
        );
      }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`Motif ${motif}`}>
      <rect width={W} height={H} fill="var(--joint)" />
      {tiles}
    </svg>
  );
}

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-[15.5px] font-semibold transition-colors";
const btnMain = cn(btn, "bg-(--email) text-white hover:bg-(--email-d)");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--ink-text)/25 hover:ring-(--ink-text)/60");
const chip =
  "h-10 rounded-full px-4 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 transition-colors hover:ring-black/40 aria-pressed:bg-(--ink-text) aria-pressed:text-white aria-pressed:ring-(--ink-text)";

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        display,
        "text-[38px] leading-[1.02] text-balance @min-[900px]:text-[58px]",
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
    <header className="sticky top-0 z-30 border-b border-(--joint) bg-(--craie)/95 backdrop-blur">
      <div className={cn("flex h-19 items-center gap-8", pad)}>
        <Go to="home" className="text-left leading-none" label="Atelier Calepin, accueil">
          <span className={cn(display, "block text-[30px]")}>Atelier Calepin</span>
          <span className="mt-1 block text-[12.5px] text-black/55">Carreleur à Amnéville</span>
        </Go>
        <nav className="ml-auto hidden items-center gap-1 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="rounded-full px-4 py-2 text-[15px] text-black/65 hover:text-black aria-[current=page]:bg-white aria-[current=page]:text-black aria-[current=page]:ring-1 aria-[current=page]:ring-(--joint)"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <Go
          to="estimation"
          className={cn(
            btnMain,
            "hidden h-11 px-5 text-[14.5px] @min-[900px]:ml-auto @min-[900px]:inline-flex @min-[1100px]:ml-0",
          )}
        >
          Estimer mon chantier
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid h-11 min-w-11 place-items-center rounded-full px-4 text-[14px] font-semibold ring-1 ring-black/15 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? <X className="size-5" /> : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-(--joint) px-5 pb-4 @min-[1100px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className="flex w-full items-center justify-between border-b border-(--joint) py-3.5 text-[17px] font-medium"
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
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-(--joint) bg-(--craie) p-3 @min-[900px]:hidden">
      <Go to="contact" className={cn(btnLine, "h-12 bg-white text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="estimation" className={cn(btnMain, "h-12 text-[15px]")}>
        Estimer
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--ink-text) text-white/65">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.5fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <p className={cn(display, "text-[34px] text-white")}>Atelier Calepin</p>
          <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed">
            Carrelage, faïence, zellige et terrazzo, posés par une équipe de quatre carreleurs, sans
            sous-traitance.
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
          <p className="font-semibold text-white">Showroom</p>
          <p className="mt-3 leading-relaxed">
            Amnéville, sur rendez-vous
            <br />
            Mardi au vendredi, 9 h – 18 h
            <br />
            Samedi, 9 h – 12 h
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-semibold text-white">{PHONE}</p>
          <p className="mt-1">bonjour@atelier-calepin-exemple.fr</p>
          <p className="mt-4">Qualibat, garantie décennale</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Atelier Calepin</span>
          <button type="button" onClick={() => go("mentions")} className="hover:text-white">
            Mentions légales et crédits photos
          </button>
        </span>
        <PayOnline />
        <span>Entreprise fictive : site d&apos;exemple réalisé par NEOBATYS</span>
      </div>
    </footer>
  );
}

function PageTitle({ crumb, title, intro }: { crumb: string; title: string; intro?: string }) {
  return (
    <div
      className={cn(
        "border-b border-(--joint) bg-(--craie) pt-10 pb-12 @min-[900px]:pt-14 @min-[900px]:pb-16",
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
          display,
          "mt-4 max-w-[860px] text-[44px] leading-[1] text-balance @min-[900px]:text-[72px]",
        )}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-black/60">{intro}</p>
      )}
    </div>
  );
}

/** Photos posées comme des carreaux : un joint régulier entre chaque. */
function Mosaic({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("grid gap-2 bg-(--joint) p-2", className)}>{children}</div>;
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <div className="bg-(--craie)">
      <section className={cn("pt-12 pb-10 @min-[900px]:pt-16 @min-[900px]:pb-12", pad)}>
        <div className="grid gap-8 @min-[900px]:grid-cols-[1fr_340px] @min-[900px]:items-end">
          <h1
            className={cn(
              display,
              "text-[50px] leading-[0.98] text-balance @min-[900px]:text-[96px]",
            )}
          >
            Sols et murs posés au millimètre.
          </h1>
          <div>
            <p className="text-[17px] leading-relaxed text-black/65">
              Salles de bain, cuisines, séjours et terrasses, d&apos;Amnéville à Metz. Le plan de
              pose est dessiné et validé avec vous avant la première coupe.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Go to="estimation" className={btnMain}>
                Estimer mon chantier
              </Go>
              <Go to="realisations" className={btnLine}>
                Réalisations
              </Go>
            </div>
          </div>
        </div>
      </section>
      <Mosaic className="h-[300px] grid-cols-[1.6fr_1fr] grid-rows-2 @min-[900px]:mx-16 @min-[900px]:h-[520px] @min-[900px]:grid-cols-[1.7fr_1fr_1fr]">
        <div className="relative row-span-2">
          <Photo
            src="car-hero"
            alt="Banquette et sol en zellige vert"
            priority
            sizes="(min-width: 1024px) 700px, 70vw"
          />
        </div>
        <div className="relative @min-[900px]:row-span-2">
          <Photo
            src="car-chevron"
            alt="Douche en carreaux bleus posés en point de Hongrie"
            sizes="(min-width: 1024px) 400px, 40vw"
          />
        </div>
        <div className="relative">
          <Photo
            src="car-zellige"
            alt="Mur en zellige clair"
            sizes="(min-width: 1024px) 400px, 40vw"
          />
        </div>
        <div className="relative hidden @min-[900px]:block">
          <Photo src="car-damier" alt="Sol en damier de marbre vert et blanc" sizes="400px" />
        </div>
      </Mosaic>
      <dl
        className={cn(
          "grid grid-cols-2 gap-px bg-(--joint) @min-[900px]:mx-16 @min-[900px]:grid-cols-4",
        )}
      >
        {[
          ["4,9 sur Google", "87 avis"],
          ["Devis détaillé", "sous 72 heures"],
          ["Plan de pose", "dessiné avant chantier"],
          ["Garantie décennale", "Qualibat"],
        ].map(([t, d]) => (
          <div key={t} className="bg-(--craie) px-5 py-5">
            <dt className="text-[16px] font-semibold">{t}</dt>
            <dd className="mt-0.5 text-[14px] text-black/55">{d}</dd>
          </div>
        ))}
      </dl>

      {/* Ce que nous posons */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[640px]">Une seule équipe, de la douche à la terrasse.</H2>
        <div className="mt-10 grid gap-x-6 gap-y-10 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-4">
          {[
            [
              "car-sdb",
              "Salles de bain",
              "Faïence, douches à l'italienne, étanchéité sous carrelage.",
            ],
            ["car-cuisine", "Cuisines", "Crédences, sols, plans en grès cérame."],
            ["car-sejour", "Sols de séjour", "Grands formats jusqu'à 120 × 280, ragréage compris."],
            ["car-terrasse", "Terrasses", "Dalles sur plots ou collées, pentes et évacuations."],
          ].map(([src, t, d]) => (
            <Go key={t} to="realisations" className="group flex flex-col items-stretch text-left">
              <span className="relative block aspect-[4/5] overflow-hidden">
                <Photo
                  src={src}
                  alt={t}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className={cn(display, "mt-4 block text-[28px]")}>{t}</span>
              <span className="mt-1 block text-[15px] leading-relaxed text-black/60">{d}</span>
            </Go>
          ))}
        </div>
      </section>

      <PatternSection />

      {/* Méthode : une vraie suite d'étapes */}
      <section className={cn("border-t border-(--joint) py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[720px]">Quatre étapes, et aucune coupe au hasard.</H2>
        <ol className="mt-12 grid gap-px bg-(--joint) @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-4">
          {[
            [
              "Visite et mesures",
              "Relevé de la pièce, contrôle de la planéité et de l'humidité du support.",
            ],
            [
              "Plan de pose",
              "On dessine où tombent les coupes, les joints et les seuils. Vous validez.",
            ],
            ["Préparation", "Dépose, ragréage, étanchéité : tout ce qui ne se voit pas mais dure."],
            [
              "Pose et joints",
              "Pose au laser, joints au millimètre, nettoyage de fin de chantier.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="bg-(--craie) p-6 @min-[900px]:p-8">
              <span className={cn(display, "text-[56px] leading-none text-(--email)")}>
                {i + 1}
              </span>
              <p className="mt-5 text-[18px] font-semibold">{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-black/60">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Avis */}
      <section className={cn("bg-white py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <H2>Ce qu&apos;en disent nos clients</H2>
          <p className="flex items-center gap-3 text-[15px] text-black/60">
            <GoogleG className="size-6" />
            <b className="text-[22px] text-(--ink-text)">4,9</b>
            <Stars className="text-[16px]" /> 87 avis
          </p>
        </div>
        <div className="mt-12 grid gap-10 @min-[900px]:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.n}>
              <blockquote className={cn(display, "text-[24px] leading-[1.25]")}>
                « {r.t} »
              </blockquote>
              <figcaption className="mt-5 text-[14.5px] text-black/55">
                <b className="text-(--ink-text)">{r.n}</b>, {r.c}, {r.when}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ZoneBand />
      <Footer />
      <MobileBar />
    </div>
  );
}

/** Choix du motif et de la teinte, dessinés en direct. */
function PatternSection({ full = false }: { full?: boolean }) {
  const [motif, setMotif] = useState<Motif>("Point de Hongrie");
  const [tint, setTint] = useState<(typeof tints)[number]["n"]>("Blanc cassé");
  const color = tints.find((t) => t.n === tint)?.c ?? tints[0].c;
  const info = motifInfo[motif];
  return (
    <section className={cn("bg-(--email) py-16 text-white @min-[900px]:py-24", pad)}>
      <div className="grid gap-10 @min-[900px]:grid-cols-[1fr_1.1fr] @min-[900px]:items-center @min-[900px]:gap-16">
        <div>
          <H2>{full ? "Les motifs de pose" : "Essayez un motif de pose."}</H2>
          <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-white/70">
            Le motif change l&apos;allure d&apos;une pièce, mais aussi la quantité à commander et le
            temps de pose.
          </p>
          <p className="mt-8 text-[14px] font-medium text-white/70">Motif</p>
          <Pick
            options={motifs}
            value={motif}
            onChange={setMotif}
            className="mt-3"
            itemClassName="h-10 rounded-full px-4 text-[14.5px] font-medium text-white/85 ring-1 ring-inset ring-white/30 hover:ring-white/70 aria-pressed:bg-white aria-pressed:text-(--email-d) aria-pressed:ring-white"
          />
          <p className="mt-6 text-[14px] font-medium text-white/70">Teinte</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {tints.map((t) => (
              <button
                key={t.n}
                type="button"
                aria-pressed={tint === t.n}
                onClick={() => setTint(t.n)}
                className="flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-[14px] ring-1 ring-white/25 ring-inset aria-pressed:ring-2 aria-pressed:ring-white"
              >
                <span
                  className="size-7 rounded-full ring-1 ring-white/30"
                  style={{ backgroundColor: t.c }}
                />
                {t.n}
              </button>
            ))}
          </div>
          <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-white/20 pt-6">
            <div>
              <dt className="text-[14px] text-white/60">Chute à prévoir</dt>
              <dd className={cn(display, "mt-1 text-[40px] leading-none")}>{info.chute} %</dd>
            </div>
            <div>
              <dt className="text-[14px] text-white/60">Pose</dt>
              <dd className={cn(display, "mt-1 text-[40px] leading-none")}>
                {info.extra ? `+${info.extra} €/m²` : "Tarif de base"}
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-[15px] text-white/70">{info.d}</p>
          {!full && (
            <Go
              to="estimation"
              className={cn(btn, "mt-8 bg-white text-(--email-d) hover:bg-white/90")}
            >
              Estimer avec ce motif
            </Go>
          )}
        </div>
        <div className="bg-white/10 p-3">
          <PosePattern motif={motif} color={color} className="block h-auto w-full" />
        </div>
      </div>
    </section>
  );
}

function ZoneBand() {
  return (
    <section
      className={cn(
        "grid gap-10 border-t border-(--joint) py-16 @min-[900px]:grid-cols-2 @min-[900px]:py-20",
        pad,
      )}
    >
      <div>
        <H2>Amnéville et 35 km autour</H2>
        <p className="mt-5 max-w-[460px] text-[16px] leading-relaxed text-black/60">
          Thionville, Metz, Hagondange, Rombas, Maizières-lès-Metz, Talange, Hayange, Florange et
          alentours.
        </p>
      </div>
      <div className="grid gap-6 @min-[600px]:grid-cols-2">
        <div>
          <p className="text-[15px] font-semibold">Showroom à Amnéville</p>
          <p className="mt-2 text-[15px] leading-relaxed text-black/60">
            Sur rendez-vous : 140 références en échantillons, du zellige au grès grand format.
          </p>
        </div>
        <div>
          <p className="text-[15px] font-semibold">Horaires</p>
          <p className="mt-2 text-[15px] leading-relaxed text-black/60">
            Mardi au vendredi, 9 h – 18 h
            <br />
            Samedi, 9 h – 12 h
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Estimation */

const rooms = ["Salle de bain", "Cuisine", "Séjour", "Terrasse"] as const;
const formats = ["Petit format", "30 à 60 cm", "Grand format"] as const;
const supply = ["Fourni et posé", "Pose seule"] as const;

function Estimation() {
  const [room, setRoom] = useState<(typeof rooms)[number]>("Séjour");
  const [area, setArea] = useState(25);
  const [format, setFormat] = useState<(typeof formats)[number]>("30 à 60 cm");
  const [motif, setMotif] = useState<Motif>("Droit");
  const [remove, setRemove] = useState(true);
  const [sup, setSup] = useState<(typeof supply)[number]>("Fourni et posé");
  const info = motifInfo[motif];
  const labour =
    42 +
    info.extra +
    (format === "Petit format" ? 18 : format === "Grand format" ? 14 : 0) +
    (room === "Salle de bain" ? 12 : room === "Terrasse" ? 10 : 0) +
    (remove ? 16 : 0);
  const material = sup === "Fourni et posé" ? (format === "Grand format" ? 48 : 36) : 0;
  const total = area * (labour + material * (1 + info.chute / 100));
  const r = (n: number) => (Math.round(n / 50) * 50).toLocaleString("fr-FR");
  const days = Math.ceil(area / 14) + (remove ? 1 : 0) + 1;
  return (
    <div className="bg-(--craie)">
      <PageTitle
        crumb="Estimation"
        title="Estimez votre chantier au m²"
        intro="Une première fourchette en six réglages. Le prix ferme est donné après la visite, gratuite."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="space-y-8">
          <div>
            <p className="text-[15px] font-semibold">Pièce</p>
            <Pick
              options={rooms}
              value={room}
              onChange={setRoom}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              Surface <span className="text-(--email)">{area} m²</span>
            </span>
            <input
              type="range"
              min={2}
              max={120}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-4 w-full accent-(--email)"
            />
          </label>
          <div>
            <p className="text-[15px] font-semibold">Format des carreaux</p>
            <Pick
              options={formats}
              value={format}
              onChange={setFormat}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold">Motif de pose</p>
            <Pick
              options={motifs}
              value={motif}
              onChange={setMotif}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold">Carrelage</p>
            <Pick
              options={supply}
              value={sup}
              onChange={setSup}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="flex items-center gap-3 text-[15.5px]">
            <input
              type="checkbox"
              checked={remove}
              onChange={(e) => setRemove(e.target.checked)}
              className="size-5 accent-(--email)"
            />
            Dépose de l&apos;ancien revêtement
          </label>
        </div>
        <div className="self-start bg-white p-7 ring-1 ring-(--joint) @min-[900px]:sticky @min-[900px]:top-28 @min-[900px]:p-9">
          <PosePattern motif={motif} color="#2f6b55" className="block h-auto w-full" />
          <p className="mt-7 text-[14.5px] text-black/55">Fourchette indicative, TTC</p>
          <p className={cn(display, "mt-1 text-[52px] leading-none")}>
            {r(total * 0.9)} – {r(total * 1.1)} €
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-(--joint) pt-5 text-[15px]">
            <div>
              <dt className="text-black/55">À commander</dt>
              <dd className="font-semibold">{Math.ceil(area * (1 + info.chute / 100))} m²</dd>
            </div>
            <div>
              <dt className="text-black/55">Durée du chantier</dt>
              <dd className="font-semibold">{days} jours environ</dd>
            </div>
          </dl>
          <Go to="contact" className={cn(btnMain, "mt-7 w-full")}>
            Demander la visite gratuite
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </div>
  );
}

/* ---------------------------------------------------------- Réalisations */

const kinds = ["Tout", "Salle de bain", "Cuisine", "Sols", "Extérieur"] as const;

function Realisations() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("Tout");
  const [zoom, setZoom] = useState<Work | null>(null);
  const shown = works.filter((w) => kind === "Tout" || w.k === kind);
  return (
    <div className="bg-(--craie)">
      <PageTitle
        crumb="Réalisations"
        title="Chantiers récents"
        intro="Chaque photo indique le format posé et la commune."
      />
      <section className={cn("py-12 @min-[900px]:py-16", pad)}>
        <Pick options={kinds} value={kind} onChange={setKind} itemClassName={chip} />
        <Mosaic className="mt-8 grid-cols-2 @min-[900px]:grid-cols-3">
          {shown.map((w) => (
            <button
              key={w.src}
              type="button"
              onClick={() => setZoom(w)}
              className="group relative block aspect-square overflow-hidden text-left"
            >
              <Photo
                src={w.src}
                alt={w.t}
                sizes="(min-width: 1024px) 400px, 50vw"
                className="transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-12 text-white">
                <span className="block text-[16px] font-semibold">{w.t}</span>
                <span className="block text-[13.5px] text-white/75">
                  {w.c}, {w.f}
                </span>
              </span>
            </button>
          ))}
        </Mosaic>
      </section>
      {zoom && (
        <button
          type="button"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-40 grid place-items-center bg-black/85 p-6"
          aria-label="Fermer"
        >
          <span className="relative block h-[72%] w-full max-w-[960px]">
            <Photo src={zoom.src} alt={zoom.t} sizes="960px" className="object-contain" />
          </span>
          <span className="mt-4 text-[15px] text-white">
            {zoom.t}, {zoom.c}, {zoom.f}
          </span>
        </button>
      )}
      <Footer />
      <MobileBar />
    </div>
  );
}

/* ----------------------------------------------------------- Savoir-faire */

function SavoirFaire() {
  return (
    <div className="bg-(--craie)">
      <PageTitle
        crumb="Savoir-faire"
        title="Les matériaux que nous posons"
        intro="Chaque matériau a sa colle, son joint et sa façon de vieillir. On vous aide à choisir selon la pièce."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <div className="grid gap-12 @min-[900px]:grid-cols-2">
          {[
            [
              "car-zellige",
              "Zellige",
              "Carreaux émaillés à la main, irréguliers par nature. Superbe en crédence et en douche, demande une pose experte.",
            ],
            [
              "car-terrazzo",
              "Terrazzo",
              "Éclats de marbre dans un liant, poncé. Très résistant, parfait pour les sols de passage et les vérandas.",
            ],
            [
              "car-sejour",
              "Grès cérame grand format",
              "Peu de joints, effet pierre ou béton. Exige un support parfaitement plan : on le ragrée.",
            ],
            [
              "car-ecailles",
              "Faïence décorative",
              "Écailles, baguettes, métro : pour un mur qui se remarque sans charger la pièce.",
            ],
          ].map(([src, t, d]) => (
            <article key={t} className="grid gap-5 @min-[600px]:grid-cols-[200px_1fr]">
              <span className="relative block aspect-square overflow-hidden">
                <Photo src={src} alt={t} sizes="240px" />
              </span>
              <span>
                <span className={cn(display, "block text-[32px] leading-tight")}>{t}</span>
                <span className="mt-2 block text-[15.5px] leading-relaxed text-black/62">{d}</span>
              </span>
            </article>
          ))}
        </div>
      </section>
      <PatternSection full />
      <Footer />
      <MobileBar />
    </div>
  );
}

/* --------------------------------------------------------------- Contact */

const projects = ["Salle de bain", "Cuisine", "Sol", "Terrasse", "Autre"] as const;

function Contact() {
  const [kind, setKind] = useState<(typeof projects)[number]>("Salle de bain");
  const field =
    "mt-2 h-12 w-full bg-white px-4 text-[16px] ring-1 ring-inset ring-(--joint) outline-none placeholder:text-black/35 focus:ring-2 focus:ring-(--email)";
  return (
    <div className="bg-(--craie)">
      <PageTitle crumb="Contact" title="Parlons de votre projet" />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <p className="text-[15px] text-black/55">Du mardi au samedi</p>
          <p className={cn(display, "mt-1 text-[48px] leading-none")}>{PHONE}</p>
          <dl className="mt-10 space-y-6 border-t border-(--joint) pt-8 text-[15.5px]">
            <div>
              <dt className="font-semibold">Délai de devis</dt>
              <dd className="mt-1 text-black/60">72 heures après la visite</dd>
            </div>
            <div>
              <dt className="font-semibold">Showroom</dt>
              <dd className="mt-1 text-black/60">Amnéville, sur rendez-vous</dd>
            </div>
            <div>
              <dt className="font-semibold">E-mail</dt>
              <dd className="mt-1 text-black/60">bonjour@atelier-calepin-exemple.fr</dd>
            </div>
          </dl>
        </div>
        <DemoForm
          success={{
            title: "Demande envoyée",
            text: `Projet : ${kind.toLowerCase()}. Nous vous appelons sous 48 heures pour fixer la visite.`,
          }}
          submit="Demander la visite gratuite"
          submitClassName={cn(btnMain, "mt-8 w-full")}
        >
          <p className="text-[14px] font-medium text-black/70">Votre projet</p>
          <Pick
            options={projects}
            value={kind}
            onChange={setKind}
            className="mt-3"
            itemClassName={chip}
          />
          <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Commune</span>
              <input className={field} placeholder="Amnéville" />
            </label>
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Surface approximative</span>
              <input className={field} placeholder="20 m²" />
            </label>
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Nom</span>
              <input className={field} placeholder="Votre nom" />
            </label>
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Téléphone</span>
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
          </div>
          <label className="mt-5 block">
            <span className="text-[14px] font-medium text-black/70">
              Quelques mots sur le projet
            </span>
            <textarea
              rows={4}
              className={cn(field, "h-auto py-3")}
              placeholder="Carrelage choisi, contraintes, date souhaitée…"
            />
          </label>
        </DemoForm>
      </section>
      <Footer />
      <MobileBar />
    </div>
  );
}

function Mentions() {
  return (
    <div className="bg-(--craie)">
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Atelier Calepin est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits photos={works.map((w) => w.src)} />
      </section>
      <Footer />
    </div>
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
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        {
          id: "estimation",
          label: "Estimation",
          path: "/estimation",
          render: () => <Estimation />,
        },
        {
          id: "savoir-faire",
          label: "Savoir-faire",
          path: "/savoir-faire",
          render: () => <SavoirFaire />,
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
