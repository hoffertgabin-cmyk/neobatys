"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Instrument_Sans, Young_Serif } from "next/font/google";
import { ArrowRight, MoveHorizontal, Phone, X } from "lucide-react";
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
 * Pierre & Taloche, maçon à Pont-à-Mousson (entreprise fictive).
 * Un site éditorial : grand titre à empattements, photos en triptyque,
 * la couleur de la pierre de Jaumont et l'ardoise. Son élément fort :
 * un vrai chantier montré avant, pendant et après, à faire glisser.
 */

const serif = Young_Serif({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const sans = Instrument_Sans({ subsets: ["latin"], display: "swap", preload: false });

const PHONE = "06 39 98 47 19";

const vars = {
  "--ardoise": "#23272b",
  "--jaumont": "#c58f3d",
  "--jaumont-t": "#8c5e17",
  "--mortier": "#ecebe7",
  "--ink-text": "#23272b",
  "--serif": serif.style.fontFamily,
  fontFamily: sans.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-20";
const serifCls = "font-(family-name:--serif) font-normal";

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-[3px] px-7 text-[15.5px] font-semibold transition-colors";
const btnDark = cn(btn, "bg-(--ardoise) text-white hover:bg-black");
const btnStone = cn(btn, "bg-(--jaumont) text-(--ardoise) hover:bg-[#d29d4c]");
const btnLine = cn(btn, "ring-1 ring-(--ardoise)/25 ring-inset hover:ring-(--ardoise)");

/* ---------------------------------------------------------------- Données */

const crafts = [
  {
    id: "extension",
    t: "Extensions et agrandissements",
    d: "Fondations, élévation en blocs ou en brique, dalle et enduit : une pièce de plus, du terrassement à la remise des clés au plaquiste.",
    src: "mac-parpaing",
  },
  {
    id: "facade",
    t: "Façades et enduits à la chaux",
    d: "Piquage, rejointoiement des moellons, enduit à la chaux aérienne ou hydraulique : la façade respire et retrouve sa couleur.",
    src: "mac-chaux",
  },
  {
    id: "pierre",
    t: "Pierre et murs anciens",
    d: "Encadrements, seuils, linteaux et murs de clôture en pierre de taille ou en moellons, montés et rejointoyés à l'ancienne.",
    src: "mac-moellons",
  },
  {
    id: "exterieurs",
    t: "Murets, escaliers et terrasses",
    d: "Murs en pierre sèche, escaliers extérieurs, terrasses sur dalle : les abords de la maison, faits pour durer.",
    src: "mac-pierre-seche",
  },
] as const;

const reviews = [
  {
    n: "Isabelle",
    c: "Pont-à-Mousson",
    t: "Extension de 24 m² livrée en neuf semaines comme prévu. Le chef de chantier passait nous voir chaque vendredi pour faire le point.",
  },
  {
    n: "Marc",
    c: "Dieulouard",
    t: "Façade de 1890 piquée et refaite à la chaux. Ils ont refusé le crépi ciment que je voulais au départ, et ils avaient raison.",
  },
  {
    n: "Laure",
    c: "Blénod-lès-Pont-à-Mousson",
    t: "Un muret en pierre sèche au fond du jardin. Travail superbe, chantier rangé tous les soirs.",
  },
];

const works = [
  { src: "mac-apres", t: "Extension enduite", c: "Pont-à-Mousson", k: "Extension" },
  { src: "mac-chaux", t: "Enduit à la chaux, fenêtre en pierre", c: "Dieulouard", k: "Façade" },
  { src: "mac-moellons", t: "Mur en moellons rejointoyé", c: "Pagny-sur-Moselle", k: "Pierre" },
  { src: "mac-pierre-seche", t: "Mur en pierre sèche et terrasse", c: "Blénod", k: "Extérieurs" },
  { src: "mac-escalier", t: "Escalier extérieur en pierre", c: "Mousson", k: "Extérieurs" },
  { src: "mac-maison", t: "Maison en pierre, pignon repris", c: "Atton", k: "Pierre" },
] as const;

/* ------------------------------------------------------------- Éléments */

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        serifCls,
        "text-[32px] leading-[1.08] tracking-[-0.01em] text-balance @min-[900px]:text-[48px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={cn("flex items-baseline gap-2", light ? "text-white" : "text-(--ardoise)")}>
      <span className={cn(serifCls, "text-[23px] leading-none")}>Pierre &amp; Taloche</span>
      <span
        className={cn(
          "hidden text-[13px] @min-[600px]:inline",
          light ? "text-white/50" : "text-black/45",
        )}
      >
        maçonnerie
      </span>
    </span>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-black/8 bg-white">
      <div className={cn("flex h-18 items-center gap-8", pad)}>
        <Go to="home" label="Pierre et Taloche, accueil">
          <Logo />
        </Go>
        <nav className="ml-auto hidden items-center gap-8 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="text-[15px] text-black/60 underline-offset-[6px] hover:text-black aria-[current=page]:text-black aria-[current=page]:underline aria-[current=page]:decoration-(--jaumont) aria-[current=page]:decoration-2"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <Go
          to="visite"
          className={cn(
            btnDark,
            "ml-auto hidden h-11 px-5 text-[14.5px] @min-[900px]:inline-flex @min-[1100px]:ml-0",
          )}
        >
          Visite gratuite
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid size-11 place-items-center rounded-[3px] ring-1 ring-black/12 @min-[900px]:ml-0 @min-[1100px]:hidden"
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
                serifCls,
                "flex w-full items-center justify-between border-b border-black/8 py-4 text-[21px]",
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
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/8 bg-white p-3 @min-[900px]:hidden">
      <Go to="visite" className={cn(btnLine, "h-12 px-3 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="visite" className={cn(btnDark, "h-12 px-3 text-[15px]")}>
        Visite gratuite
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--ardoise) text-white/60">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.6fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <Logo light />
          <p className="mt-4 max-w-[320px] text-[14px] leading-relaxed">
            Maçonnerie, pierre et façades depuis 1987. Six compagnons, pas de sous-traitance.
          </p>
          <p className="mt-5 text-[13px]">Qualibat · Garantie décennale · Artisan</p>
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
          <p className="font-semibold text-white">Secteur</p>
          <p className="mt-3 leading-relaxed">
            Pont-à-Mousson, le Val de Moselle, Metz et Nancy (40 km)
          </p>
          <p className="mt-3 leading-relaxed">Lundi au vendredi, 7 h 30 – 17 h 30</p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className={cn(serifCls, "mt-3 text-[22px] text-white")}>{PHONE}</p>
          <p className="mt-1">contact@pierre-et-taloche-exemple.fr</p>
          <p className="mt-1">Dépôt sur rendez-vous, Pont-à-Mousson (54)</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Pierre &amp; Taloche</span>
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
        "border-b border-black/8 pt-10 pb-12 @min-[900px]:pt-16 @min-[900px]:pb-16",
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
          serifCls,
          "mt-5 max-w-[820px] text-[38px] leading-[1.04] text-balance @min-[900px]:text-[60px]",
        )}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-black/60">{intro}</p>
      )}
    </div>
  );
}

/* ------------------------------------------- Avant, pendant, après */

const phases = [
  { id: "Avant", src: "mac-avant", d: "Mars : arrière de la maison, ancienne véranda démolie." },
  {
    id: "Pendant",
    src: "mac-pendant",
    d: "Avril : fondations, élévation en blocs et dalle coulée.",
  },
  {
    id: "Après",
    src: "mac-apres",
    d: "Mai : extension enduite, menuiseries posées, abords dégagés.",
  },
] as const;

/** Curseur avant / après : on fait glisser la séparation (souris, doigt ou clavier). */
function BeforeAfter({ className }: { className?: string }) {
  const [pos, setPos] = useState(52);
  return (
    <div className={cn("relative overflow-hidden rounded-[4px] select-none", className)}>
      <Photo
        src="mac-apres"
        alt="Après : extension terminée et enduite"
        sizes="(min-width: 1024px) 900px, 100vw"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo
          src="mac-avant"
          alt="Avant : arrière de la maison avant les travaux"
          sizes="(min-width: 1024px) 900px, 100vw"
        />
      </div>
      <span className="pointer-events-none absolute top-4 left-4 rounded-[3px] bg-(--ardoise) px-3 py-1.5 text-[13px] font-semibold text-white">
        Avant
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-[3px] bg-white px-3 py-1.5 text-[13px] font-semibold text-(--ardoise)">
        Après
      </span>
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-(--ardoise) shadow-lg">
          <MoveHorizontal className="size-5" />
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Faire glisser pour comparer avant et après"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function ProjectStory() {
  const [phase, setPhase] = useState<(typeof phases)[number]["id"]>("Avant");
  const p = phases.find((x) => x.id === phase) ?? phases[0];
  return (
    <section className={cn("bg-(--ardoise) py-16 text-white @min-[900px]:py-24", pad)}>
      <div className="grid gap-10 @min-[900px]:grid-cols-[1fr_1.7fr] @min-[900px]:gap-16">
        <div className="flex flex-col">
          <p className="text-[15px] text-(--jaumont)">Un chantier, de mars à mai</p>
          <H2 className="mt-3">Une extension de 24 m² à Pont&#8209;à&#8209;Mousson</H2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-white/65">
            Faites glisser la photo pour comparer. Mêmes murs, même jardin, neuf semaines plus tard.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 text-[14px] @min-[900px]:mt-auto">
            {[
              ["9 sem.", "de chantier"],
              ["24 m²", "habitables"],
              ["0 €", "de dépassement"],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className={cn(serifCls, "text-[26px] text-white")}>{t}</dt>
                <dd className="text-white/55">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          {phase === "Pendant" ? (
            <div className="relative h-[280px] overflow-hidden rounded-[4px] @min-[900px]:h-[460px]">
              <Photo
                src="mac-pendant"
                alt="Pendant : élévation des murs de l'extension"
                sizes="(min-width: 1024px) 900px, 100vw"
              />
            </div>
          ) : (
            <BeforeAfter className="h-[280px] @min-[900px]:h-[460px]" />
          )}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {phases.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setPhase(x.id)}
                aria-pressed={phase === x.id}
                className="group text-left"
              >
                <span
                  className={cn(
                    "relative block h-[70px] overflow-hidden rounded-[3px] ring-2 @min-[900px]:h-[96px]",
                    phase === x.id
                      ? "ring-(--jaumont)"
                      : "opacity-70 ring-transparent group-hover:opacity-100",
                  )}
                >
                  <Photo src={x.src} alt="" sizes="200px" />
                </span>
                <span className="mt-2 block text-[14px] font-semibold">{x.id}</span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="mt-3 text-[14.5px] text-white/60">
            {p.d}
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      {/* Premier écran : le titre en grand, puis la pierre en triptyque */}
      <section className={cn("pt-12 pb-10 @min-[900px]:pt-16 @min-[900px]:pb-12", pad)}>
        <div className="grid gap-8 @min-[900px]:grid-cols-[1.6fr_1fr] @min-[900px]:items-end @min-[900px]:gap-16">
          <h1
            className={cn(
              serifCls,
              "text-[42px] leading-[1] tracking-[-0.015em] text-balance @min-[900px]:text-[76px]",
            )}
          >
            Des murs qui tiennent, des façades qui respirent.
          </h1>
          <div>
            <p className="text-[16.5px] leading-relaxed text-black/62">
              Maçon à Pont-à-Mousson depuis 1987 : extensions, façades à la chaux, pierre et murets.
              Six compagnons, aucun sous-traitant.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Go to="visite" className={btnDark}>
                Demander une visite
              </Go>
              <Go to="chantiers" className={btnLine}>
                Voir les chantiers
              </Go>
            </div>
          </div>
        </div>
      </section>
      <div
        className={cn(
          "grid h-[300px] grid-cols-[1.4fr_1fr] gap-3 @min-[900px]:h-[440px] @min-[900px]:grid-cols-[1.25fr_1fr_0.8fr]",
          pad,
        )}
      >
        <div className="relative overflow-hidden rounded-[4px]">
          <Photo
            src="mac-hero"
            alt="Façade en pierre calcaire avec lierre"
            priority
            sizes="(min-width: 1024px) 560px, 60vw"
            position="50% 40%"
          />
        </div>
        <div className="relative overflow-hidden rounded-[4px]">
          <Photo
            src="mac-moellons"
            alt="Mur en moellons et porte bleue"
            priority
            sizes="(min-width: 1024px) 420px, 40vw"
          />
        </div>
        <div className="relative hidden overflow-hidden rounded-[4px] @min-[900px]:block">
          <Photo src="mac-truelle" alt="Truelle chargée de mortier" sizes="320px" />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-8 gap-y-3 py-8 text-[14.5px] text-black/60",
          pad,
        )}
      >
        <span className="flex items-center gap-2">
          <GoogleG className="size-5" />
          <b className="text-[16px] text-(--ink-text)">4,9</b>
          <Stars className="text-[14px]" /> 58 avis
        </span>
        <span>Qualibat</span>
        <span>Garantie décennale</span>
        <span>Visite et devis sous 7 jours</span>
      </div>

      {/* Savoir-faire */}
      <section className={cn("border-t border-black/8 py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[640px]">Quatre métiers de la pierre et du mortier</H2>
        <div className="mt-12 grid gap-x-12 gap-y-14 @min-[900px]:grid-cols-2">
          {crafts.map((c) => (
            <Go
              key={c.id}
              to="savoir-faire"
              className="group grid w-full grid-cols-[110px_minmax(0,1fr)] gap-5 text-left @min-[900px]:grid-cols-[160px_minmax(0,1fr)] @min-[900px]:gap-6"
            >
              <span className="relative block h-[140px] overflow-hidden rounded-[4px] @min-[900px]:h-[190px]">
                <Photo
                  src={c.src}
                  alt=""
                  sizes="160px"
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </span>
              <span>
                <span
                  className={cn(
                    serifCls,
                    "block text-[23px] leading-tight @min-[900px]:text-[27px]",
                  )}
                >
                  {c.t}
                </span>
                <span className="mt-3 block text-[15.5px] leading-relaxed text-black/60">
                  {c.d}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-(--jaumont-t)">
                  En savoir plus{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Go>
          ))}
        </div>
      </section>

      <ProjectStory />

      {/* Avis */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2>Ce qu&apos;en disent nos clients</H2>
          <p className="flex items-center gap-2 text-[15px] text-black/60">
            <GoogleG className="size-5" /> 4,9 sur 5, 58 avis Google
          </p>
        </div>
        <div className="mt-12 grid gap-10 @min-[900px]:grid-cols-3 @min-[900px]:gap-12">
          {reviews.map((r) => (
            <figure key={r.n}>
              <Stars className="text-[15px]" />
              <blockquote className={cn(serifCls, "mt-4 text-[20px] leading-[1.45]")}>
                « {r.t} »
              </blockquote>
              <figcaption className="mt-4 text-[14.5px] text-black/55">
                <b className="text-(--ink-text)">{r.n}</b>, {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Méthode : une vraie suite d'étapes */}
      <section className={cn("bg-(--mortier) py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[600px]">Comment se passe un chantier avec nous</H2>
        <ol className="mt-12 grid gap-10 @min-[900px]:grid-cols-4 @min-[900px]:gap-8">
          {[
            ["Visite", "On vient voir le mur, la façade ou le terrain, sous 7 jours. Gratuit."],
            ["Devis ferme", "Poste par poste, avec les matériaux nommés. Il ne bouge plus."],
            ["Chantier", "Un chef de chantier unique, point avec vous chaque vendredi."],
            ["Réception", "Visite de fin de chantier, garantie décennale remise le jour même."],
          ].map(([t, d], i) => (
            <li key={t} className="border-t-2 border-(--ardoise) pt-5">
              <span className={cn(serifCls, "text-[40px] leading-none text-(--jaumont-t)")}>
                {i + 1}
              </span>
              <p className="mt-3 text-[19px] font-semibold">{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-black/60">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={cn(
          "grid gap-10 py-16 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:items-center @min-[900px]:gap-16 @min-[900px]:py-24",
          pad,
        )}
      >
        <div className="relative h-[280px] overflow-hidden rounded-[4px] @min-[900px]:h-[420px]">
          <Photo
            src="mac-pierre-seche"
            alt="Mur en pierres sèches et terrasse"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
        <div>
          <H2>Un mur, une façade, un projet d&apos;extension&nbsp;?</H2>
          <p className="mt-5 text-[17px] leading-relaxed text-black/60">
            Envoyez deux ou trois photos : on vous dit ce qui est possible, et on vient voir sous 7
            jours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Go to="visite" className={btnStone}>
              Demander une visite gratuite
            </Go>
          </div>
          <p className={cn(serifCls, "mt-8 text-[26px]")}>{PHONE}</p>
          <p className="text-[14.5px] text-black/55">Lundi au vendredi, 7 h 30 – 17 h 30</p>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------------------------------------------------------- Savoir-faire */

function SavoirFaire() {
  return (
    <>
      <PageTitle
        crumb="Savoir-faire"
        title="La pierre, la chaux, le bloc : chaque mur a sa technique"
        intro="Une maison de 1890 ne se traite pas comme un pavillon de 1975. On choisit le matériau avec vous, devis à l'appui."
      />
      {crafts.map((c, i) => (
        <section
          key={c.id}
          className={cn(
            "grid gap-8 py-14 @min-[900px]:grid-cols-2 @min-[900px]:items-center @min-[900px]:gap-16 @min-[900px]:py-16",
            i % 2 === 1 && "bg-(--mortier)",
            pad,
          )}
        >
          <div
            className={cn(
              "relative h-[260px] overflow-hidden rounded-[4px] @min-[900px]:h-[380px]",
              i % 2 === 1 && "@min-[900px]:order-last",
            )}
          >
            <Photo src={c.src} alt={c.t} sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
          <div>
            <h2 className={cn(serifCls, "text-[30px] leading-tight @min-[900px]:text-[38px]")}>
              {c.t}
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-black/62">{c.d}</p>
            <Go to="visite" param={c.id} className={cn(btnDark, "mt-7")}>
              Demander une visite
            </Go>
          </div>
        </section>
      ))}
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------- Chantiers */

const kinds = ["Tous", "Extension", "Façade", "Pierre", "Extérieurs"] as const;

function Chantiers() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("Tous");
  const [zoom, setZoom] = useState<number | null>(null);
  const shown = works.filter((w) => kind === "Tous" || w.k === kind);
  const z = zoom === null ? null : shown[zoom];
  return (
    <>
      <PageTitle
        crumb="Chantiers"
        title="Nos chantiers"
        intro="Avant, pendant, après : des photos prises par nos compagnons, avec l'accord des propriétaires."
      />
      <section className={cn("py-12 @min-[900px]:py-16", pad)}>
        <BeforeAfter className="h-[280px] @min-[900px]:h-[520px]" />
        <p className="mt-3 text-[14.5px] text-black/55">
          Extension de 24 m², Pont-à-Mousson. Faites glisser pour comparer.
        </p>
        <Pick
          options={kinds}
          value={kind}
          onChange={(k) => {
            setKind(k);
            setZoom(null);
          }}
          className="mt-12"
          itemClassName="h-10 rounded-[3px] px-4 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 aria-pressed:bg-(--ardoise) aria-pressed:text-white aria-pressed:ring-(--ardoise)"
        />
        <div className="mt-8 grid gap-x-6 gap-y-10 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3">
          {shown.map((w, i) => (
            <button
              key={w.src}
              type="button"
              onClick={() => setZoom(i)}
              className="group text-left"
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[4px]">
                <Photo
                  src={w.src}
                  alt={w.t}
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className={cn(serifCls, "mt-4 block text-[20px]")}>{w.t}</span>
              <span className="text-[14px] text-black/55">{w.c}</span>
            </button>
          ))}
        </div>
      </section>
      {z && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-black/85 p-6"
          onClick={() => setZoom(null)}
        >
          <div className="relative h-[72%] w-full max-w-[720px] overflow-hidden rounded-[4px]">
            <Photo src={z.src} alt={z.t} sizes="720px" />
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

/* ---------------------------------------------------------------- Visite */

const projects = [
  "Extension",
  "Façade ou enduit",
  "Mur en pierre",
  "Muret ou terrasse",
  "Autre",
] as const;
const projectFromParam: Record<string, (typeof projects)[number]> = {
  extension: "Extension",
  facade: "Façade ou enduit",
  pierre: "Mur en pierre",
  exterieurs: "Muret ou terrasse",
};
const delays = ["Dès que possible", "Dans 3 mois", "Dans l'année"] as const;

function Visite() {
  const { param } = useSite();
  const [project, setProject] = useState<(typeof projects)[number]>(
    projectFromParam[param ?? ""] ?? "Extension",
  );
  const [delay, setDelay] = useState<(typeof delays)[number]>("Dans 3 mois");
  const [files, setFiles] = useState<string[]>([]);
  const chip =
    "h-11 rounded-[3px] px-4 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 transition-colors hover:ring-black/40 aria-pressed:bg-(--ardoise) aria-pressed:text-white aria-pressed:ring-(--ardoise)";
  const field =
    "mt-2 h-12 w-full rounded-[3px] bg-white px-4 text-[16px] ring-1 ring-black/15 outline-none ring-inset placeholder:text-black/35 focus:ring-2 focus:ring-(--ardoise)";
  return (
    <>
      <PageTitle crumb="Visite gratuite" title="Demandez une visite, on vient sous 7 jours" />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.4fr_1fr] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <DemoForm
          success={{
            title: "Demande envoyée",
            text: `${project}, ${delay.toLowerCase()}. Le chef de chantier vous appelle sous 48 h pour fixer la visite.`,
          }}
          submit="Envoyer ma demande"
          submitClassName={cn(btnDark, "mt-9")}
        >
          <p className="text-[16px] font-semibold">Votre projet</p>
          <Pick
            options={projects}
            value={project}
            onChange={setProject}
            className="mt-3"
            itemClassName={chip}
          />
          <p className="mt-7 text-[16px] font-semibold">Pour quand&nbsp;?</p>
          <Pick
            options={delays}
            value={delay}
            onChange={setDelay}
            className="mt-3"
            itemClassName={chip}
          />
          <div className="mt-7 grid gap-5 @min-[900px]:grid-cols-2">
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
            <span className="text-[14.5px] font-medium">Commune du chantier</span>
            <input className={field} placeholder="Pont-à-Mousson" />
          </label>
          <label className="mt-5 block">
            <span className="text-[14.5px] font-medium">
              Photos du mur ou de la façade (facultatif)
            </span>
            <span className="mt-2 flex min-h-[88px] cursor-pointer flex-col items-center justify-center rounded-[3px] border border-dashed border-black/25 px-4 py-4 text-center text-[14.5px] text-black/55 hover:border-black/50">
              {files.length
                ? files.join(", ")
                : "Ajoutez 2 ou 3 photos : on vous dit déjà ce qui est possible."}
              <input
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))}
              />
            </span>
          </label>
        </DemoForm>
        <aside className="self-start">
          <div className="relative h-[240px] overflow-hidden rounded-[4px]">
            <Photo src="mac-truelle" alt="" sizes="480px" position="50% 60%" />
          </div>
          <p className={cn(serifCls, "mt-8 text-[28px]")}>{PHONE}</p>
          <p className="text-[14.5px] text-black/55">Lundi au vendredi, 7 h 30 – 17 h 30</p>
          <ul className="mt-6 space-y-2.5 border-t border-black/10 pt-6 text-[15px] text-black/70">
            <li>Visite et devis gratuits</li>
            <li>Devis ferme, poste par poste</li>
            <li>Pont-à-Mousson et 40 km autour</li>
          </ul>
        </aside>
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
        intro="Pierre & Taloche est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits
          photos={[
            "mac-hero",
            "mac-moellons",
            "mac-truelle",
            "mac-parpaing",
            "mac-chaux",
            "mac-pierre-seche",
            "mac-avant",
            "mac-pendant",
            "mac-apres",
            "mac-escalier",
            "mac-maison",
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
          id: "savoir-faire",
          label: "Savoir-faire",
          path: "/savoir-faire",
          render: () => <SavoirFaire />,
        },
        { id: "chantiers", label: "Chantiers", path: "/chantiers", render: () => <Chantiers /> },
        {
          id: "visite",
          label: "Visite gratuite",
          path: "/visite-gratuite",
          render: () => <Visite />,
        },
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
