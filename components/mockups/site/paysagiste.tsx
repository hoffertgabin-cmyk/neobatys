"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Figtree, Newsreader } from "next/font/google";
import { ArrowRight, ImagePlus, Phone, X } from "lucide-react";
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
 * Verdance Jardins, paysagiste à Sarrebourg (entreprise fictive).
 * Un jardin se vend sur photo : grandes images, une arche comme une
 * porte de jardin au premier écran, le calendrier des saisons et un
 * calcul de contrat d'entretien.
 * Vert mousse, sauge, brume ; une serif de livre de jardin.
 */

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 62 41";

const vars = {
  "--mousse": "#26331f",
  "--feuille": "#46603a",
  "--sauge": "#a7b694",
  "--brume": "#eef1ea",
  "--lilas": "#6f5f9e",
  "--ink-text": "#1d2419",
  "--serif": newsreader.style.fontFamily,
  fontFamily: figtree.style.fontFamily,
} as CSSProperties;

const display = "font-(family-name:--serif) font-normal tracking-[-0.02em]";
const pad = "px-5 @min-[900px]:px-16";

const btn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15.5px] font-semibold transition-colors";
const btnDark = cn(btn, "bg-(--mousse) text-white hover:bg-(--feuille)");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--mousse)/25 hover:ring-(--mousse)/60");

/* ---------------------------------------------------------------- Données */

type Work = { src: string; t: string; c: string; k: string; d: string };

const works: Work[] = [
  {
    src: "pay-terrasse",
    t: "Terrasse bois et muret en pierres sèches",
    c: "Phalsbourg",
    k: "Terrasse",
    d: "Douglas, 38 m²",
  },
  {
    src: "pay-allee",
    t: "Jardin à la française",
    c: "Sarrebourg",
    k: "Création",
    d: "Buis et dalles calcaires",
  },
  {
    src: "pay-lavande",
    t: "Jardin contemporain",
    c: "Héming",
    k: "Création",
    d: "Lavandes, graminées, palissade",
  },
  {
    src: "pay-pergola",
    t: "Terrasse sous pergola",
    c: "Lorquin",
    k: "Terrasse",
    d: "Dalles grès cérame, 45 m²",
  },
  {
    src: "pay-brique",
    t: "Allée et massifs de vivaces",
    c: "Réding",
    k: "Création",
    d: "Briques de récupération",
  },
  {
    src: "pay-gravier",
    t: "Coin repas au fond du jardin",
    c: "Imling",
    k: "Terrasse",
    d: "Gravier stabilisé, 20 m²",
  },
  {
    src: "pay-mineral",
    t: "Jardin minéral sans arrosage",
    c: "Buhl-Lorraine",
    k: "Création",
    d: "Gravier, rochers, buis en boules",
  },
  {
    src: "pay-haie",
    t: "Haie taillée au cordeau",
    c: "Sarrebourg",
    k: "Entretien",
    d: "Contrat 4 passages par an",
  },
  {
    src: "pay-massif",
    t: "Massifs fleuris",
    c: "Dabo",
    k: "Entretien",
    d: "Désherbage et paillage",
  },
];

const seasons = [
  {
    s: "Printemps",
    when: "mars à mai",
    src: "pay-massif",
    create: "Semis de gazon, plantation des vivaces, pose de terrasses avant l'été.",
    care: "Première tonte, scarification, taille des arbustes à floraison d'été.",
  },
  {
    s: "Été",
    when: "juin à août",
    src: "pay-pergola",
    create: "Terrasses, allées et clôtures : le sol est sec, les chantiers vont vite.",
    care: "Tonte chaque semaine ou tous les quinze jours, arrosage, taille des haies après la nidification.",
  },
  {
    s: "Automne",
    when: "septembre à novembre",
    src: "pay-haie",
    create:
      "La meilleure saison pour planter haies, arbres et arbustes : ils s'installent pendant l'hiver.",
    care: "Ramassage des feuilles, dernière tonte, taille des haies, paillage des massifs.",
  },
  {
    s: "Hiver",
    when: "décembre à février",
    src: "pay-mineral",
    create: "Plans et devis pour le printemps, élagage, plantation à racines nues hors gel.",
    care: "Taille des fruitiers et des rosiers, protection des plantes fragiles.",
  },
] as const;

const reviews = [
  {
    n: "Hélène",
    c: "Phalsbourg",
    s: 5,
    t: "Ils ont dessiné le jardin avec nous sur trois rendez-vous. Deux ans après, tout a pris et rien ne meurt.",
  },
  {
    n: "Marc",
    c: "Sarrebourg",
    s: 5,
    t: "Contrat d'entretien depuis 2023 : on ne s'occupe plus de rien, la facture arrive avec le détail de chaque passage.",
  },
  {
    n: "Sabine",
    c: "Réding",
    s: 5,
    t: "Terrasse en bois posée en une semaine, propre et droite. Ils sont revenus resserrer les lames au printemps sans qu'on demande.",
  },
];

/* ------------------------------------------------------------ Éléments */

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        display,
        "text-[34px] leading-[1.05] text-balance @min-[900px]:text-[52px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Go to="home" className="flex items-center gap-3 text-left" label="Verdance Jardins, accueil">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <path
          d="M16 29V13"
          stroke={light ? "#fff" : "var(--mousse)"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M16 15c0-6 4-10 11-10 0 7-4 11-11 10Z" fill={light ? "#fff" : "var(--feuille)"} />
        <path
          d="M16 20c0-5-3-8-9-8 0 6 3 9 9 8Z"
          fill={light ? "#fff" : "var(--sauge)"}
          opacity={light ? 0.75 : 1}
        />
      </svg>
      <span className="leading-none">
        <span className={cn(display, "block text-[24px]", light && "text-white")}>Verdance</span>
        <span
          className={cn("mt-0.5 block text-[12.5px]", light ? "text-white/65" : "text-black/50")}
        >
          Jardins à Sarrebourg
        </span>
      </span>
    </Go>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
      <div className={cn("flex h-20 items-center gap-8 border-b border-black/6", pad)}>
        <Logo />
        <nav className="ml-auto hidden items-center gap-1 @min-[1000px]:flex">
          {nav
            .filter((p) => p.id !== "devis")
            .map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(p.id)}
                aria-current={p.id === page ? "page" : undefined}
                className="rounded-full px-4 py-2 text-[15px] text-black/65 hover:text-black aria-[current=page]:bg-(--brume) aria-[current=page]:text-black"
              >
                {p.label}
              </button>
            ))}
        </nav>
        <Go
          to="devis"
          className={cn(btnDark, "hidden h-11 px-5 text-[15px] @min-[900px]:inline-flex")}
        >
          Demander une visite
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid h-11 place-items-center rounded-full px-4 text-[14px] font-semibold ring-1 ring-black/12 @min-[900px]:ml-0 @min-[1000px]:hidden"
        >
          {open ? <X className="size-5" /> : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="border-b border-black/6 bg-white px-5 pb-4 @min-[1000px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className={cn(
                display,
                "flex w-full items-center justify-between border-b border-black/6 py-3.5 text-[22px]",
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
      <Go to="devis" className={cn(btnLine, "h-12 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="devis" className={cn(btnDark, "h-12 text-[15px]")}>
        Visite gratuite
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--mousse) text-white/65">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <Logo light />
          <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed">
            Création de jardins, terrasses et entretien au pays de Sarrebourg, depuis 2009. Huit
            jardiniers, pas de sous-traitance.
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
          <p className="font-semibold text-white">Horaires</p>
          <p className="mt-3 leading-relaxed">
            Lundi au vendredi, 7 h 30 – 17 h 30
            <br />
            Visites le samedi matin sur rendez-vous
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-semibold text-white">{PHONE}</p>
          <p className="mt-1">bonjour@verdance-jardins-exemple.fr</p>
          <p className="mt-1">Sarrebourg et 30 km autour</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Verdance Jardins</span>
          <button type="button" onClick={() => go("mentions")} className="hover:text-white">
            Mentions légales et crédits photos
          </button>
        </span>
        <span>Entreprise fictive : site d&apos;exemple réalisé par NEOBATYS</span>
      </div>
    </footer>
  );
}

function PageTitle({
  crumb,
  title,
  intro,
  src,
}: {
  crumb: string;
  title: string;
  intro?: string;
  src?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-8 bg-(--brume) pt-10 pb-12 @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:items-end @min-[900px]:pt-14 @min-[900px]:pb-14",
        pad,
      )}
    >
      <div>
        <p className="text-[14px] text-black/50">
          <Go to="home" className="hover:text-black">
            Accueil
          </Go>{" "}
          / <span className="text-black/75">{crumb}</span>
        </p>
        <h1
          className={cn(
            display,
            "mt-4 text-[40px] leading-[1.02] text-balance @min-[900px]:text-[64px]",
          )}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-black/62">{intro}</p>
        )}
      </div>
      {src && (
        <div className="relative hidden h-[240px] overflow-hidden rounded-t-[140px] @min-[900px]:block">
          <Photo src={src} alt="" sizes="520px" />
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  const [season, setSeason] = useState<(typeof seasons)[number]["s"]>("Automne");
  const cur = seasons.find((s) => s.s === season) ?? seasons[2];
  return (
    <>
      {/* Premier écran : une arche comme une porte de jardin */}
      <section
        className={cn(
          "grid gap-10 pt-10 pb-14 @min-[900px]:grid-cols-[1fr_520px] @min-[900px]:items-end @min-[900px]:gap-16 @min-[900px]:pt-14 @min-[900px]:pb-20",
          pad,
        )}
      >
        <div className="order-last @min-[900px]:order-first @min-[900px]:pb-6">
          <p className="text-[15px] text-(--feuille)">Paysagiste au pays de Sarrebourg</p>
          <h1
            className={cn(
              display,
              "mt-5 text-[46px] leading-[0.98] text-balance @min-[900px]:text-[84px]",
            )}
          >
            Des jardins qui embellissent chaque saison.
          </h1>
          <p className="mt-6 max-w-[460px] text-[17.5px] leading-relaxed text-black/62">
            Création de jardins et de terrasses, puis entretien à l&apos;année par la même équipe.
            Visite et esquisse offertes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Go to="devis" className={btnDark}>
              Demander une visite
            </Go>
            <Go to="realisations" className={btnLine}>
              Voir les jardins
            </Go>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-black/60">
            <span className="flex items-center gap-2">
              <GoogleG className="size-5" />
              <b className="text-[16px] text-(--ink-text)">4,9</b>
              <Stars className="text-[14px]" />
              <span>87 avis</span>
            </span>
            <span>Entreprise du paysage depuis 2009</span>
          </div>
        </div>
        <div className="relative h-[340px] overflow-hidden rounded-t-[200px] @min-[900px]:h-[600px] @min-[900px]:rounded-t-[260px]">
          <Photo
            src="pay-hero"
            alt="Jardin arboré avec une grande pelouse en lisière de bois"
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
          />
          <p className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/55 to-transparent px-6 pt-16 pb-5 text-[14px] text-white">
            Jardin de 1 800 m² à Phalsbourg, entretenu depuis 2021
          </p>
        </div>
      </section>

      {/* Deux métiers, deux portes d'entrée */}
      <section className={cn("grid gap-5 pb-16 @min-[900px]:grid-cols-2 @min-[900px]:pb-24", pad)}>
        {[
          {
            to: "creation",
            src: "pay-terrasse",
            t: "Créer ou refaire un jardin",
            d: "Plans, terrasses, allées, plantations et gazon, de l'esquisse à la première floraison.",
          },
          {
            to: "entretien",
            src: "pay-taille",
            t: "Faire entretenir son jardin",
            d: "Tonte, taille, désherbage et feuilles : un contrat à l'année, sans y penser.",
          },
        ].map((c) => (
          <Go
            key={c.to}
            to={c.to}
            className="group relative block h-[300px] overflow-hidden rounded-[22px] text-left @min-[900px]:h-[380px]"
          >
            <Photo
              src={c.src}
              alt=""
              sizes="(min-width: 1024px) 600px, 100vw"
              className="transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <span className="absolute right-0 bottom-0 left-0 p-7 text-white">
              <span
                className={cn(display, "block text-[32px] leading-tight @min-[900px]:text-[38px]")}
              >
                {c.t}
              </span>
              <span className="mt-2 block max-w-[420px] text-[15.5px] leading-relaxed text-white/80">
                {c.d}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold">
                En savoir plus{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Go>
        ))}
      </section>

      {/* Les saisons */}
      <section className={cn("bg-(--brume) py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <H2 className="max-w-[620px]">Au jardin, chaque saison a son travail.</H2>
          <Pick
            options={seasons.map((s) => s.s)}
            value={season}
            onChange={setSeason}
            itemClassName="h-11 rounded-full px-5 text-[15px] font-medium ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--mousse) aria-pressed:text-white aria-pressed:ring-(--mousse)"
          />
        </div>
        <div className="mt-10 grid gap-8 @min-[900px]:grid-cols-[1.1fr_1fr] @min-[900px]:gap-14">
          <div className="relative h-[260px] overflow-hidden rounded-[22px] @min-[900px]:h-[400px]">
            <Photo key={cur.src} src={cur.src} alt="" sizes="(min-width: 1024px) 620px, 100vw" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[15px] text-(--feuille)">
              {cur.s}, de {cur.when}
            </p>
            <dl className="mt-6 space-y-7">
              <div className="border-t border-black/10 pt-5">
                <dt className={cn(display, "text-[26px]")}>Côté création</dt>
                <dd className="mt-2 text-[16.5px] leading-relaxed text-black/65">{cur.create}</dd>
              </div>
              <div className="border-t border-black/10 pt-5">
                <dt className={cn(display, "text-[26px]")}>Côté entretien</dt>
                <dd className="mt-2 text-[16.5px] leading-relaxed text-black/65">{cur.care}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Réalisations en mosaïque */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2>Quelques jardins de l&apos;année</H2>
          <Go
            to="realisations"
            className="inline-flex items-center gap-2 text-[15.5px] font-semibold text-(--feuille) underline-offset-4 hover:underline"
          >
            Tous les jardins <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 @min-[900px]:h-[520px] @min-[900px]:grid-cols-4 @min-[900px]:grid-rows-2">
          {[works[1], works[2], works[3], works[4], works[6]].map((w, i) => (
            <figure
              key={w.src}
              className={cn(
                "relative h-[180px] overflow-hidden rounded-[16px] @min-[900px]:h-auto",
                i === 0 && "col-span-2 h-[260px] @min-[900px]:row-span-2",
              )}
            >
              <Photo src={w.src} alt={w.t} sizes="(min-width: 1024px) 560px, 50vw" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1.5 text-[13px]">
                {w.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Avis */}
      <section className={cn("border-t border-black/6 py-16 @min-[900px]:py-24", pad)}>
        <div className="grid gap-10 @min-[900px]:grid-cols-3 @min-[900px]:gap-12">
          {reviews.map((r) => (
            <figure key={r.n}>
              <Stars value={r.s} className="text-[15px]" />
              <blockquote className={cn(display, "mt-4 text-[23px] leading-snug")}>
                « {r.t} »
              </blockquote>
              <figcaption className="mt-4 text-[14.5px] text-black/55">
                {r.n}, {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <VisitBand />
      <Footer />
      <MobileBar />
    </>
  );
}

function VisitBand() {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-(--mousse) py-16 text-white @min-[900px]:py-24",
        pad,
      )}
    >
      <div className="grid gap-10 @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:items-center">
        <div>
          <H2>Parlons de votre jardin, sur place.</H2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-white/70">
            Une heure ensemble dans le jardin, puis une esquisse et un devis détaillé sous quinze
            jours. Sans engagement.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 @min-[900px]:justify-end">
          <Go to="devis" className={cn(btn, "bg-white text-(--mousse) hover:bg-(--brume)")}>
            Demander une visite
          </Go>
          <Go to="devis" className={cn(btn, "ring-1 ring-white/35 ring-inset hover:ring-white")}>
            <Phone className="size-4" /> {PHONE}
          </Go>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Création */

function Creation() {
  return (
    <>
      <PageTitle
        crumb="Création"
        title="De l'esquisse à la première floraison"
        intro="Jardins, terrasses, allées, clôtures et gazon. Une seule équipe dessine, construit et plante."
        src="pay-lavande"
      />
      <section
        className={cn(
          "grid gap-6 py-14 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-4 @min-[900px]:py-20",
          pad,
        )}
      >
        {[
          { src: "pay-allee", t: "Jardins", d: "Plan, terre végétale, massifs, arbres et haies." },
          { src: "pay-terrasse", t: "Terrasses", d: "Bois, pierre naturelle ou dalles sur plots." },
          { src: "pay-brique", t: "Allées et bordures", d: "Pavés, briques, gravier stabilisé." },
          {
            src: "pay-gazon",
            t: "Gazon",
            d: "Semé ou en rouleaux, avec arrosage intégré si besoin.",
          },
        ].map((s) => (
          <div key={s.t}>
            <div className="relative h-[220px] overflow-hidden rounded-t-[120px] rounded-b-[14px]">
              <Photo src={s.src} alt={s.t} sizes="(min-width: 1024px) 300px, 50vw" />
            </div>
            <p className={cn(display, "mt-4 text-[26px]")}>{s.t}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-black/60">{s.d}</p>
          </div>
        ))}
      </section>
      <section className={cn("bg-(--brume) py-14 @min-[900px]:py-20", pad)}>
        <H2>Comment se passe un projet</H2>
        <ol className="mt-10 grid gap-8 @min-[900px]:grid-cols-4">
          {[
            ["Visite", "Une heure au jardin pour comprendre vos envies, l'exposition et le sol."],
            ["Esquisse et devis", "Un plan dessiné et un devis poste par poste sous quinze jours."],
            [
              "Chantier",
              "Terrassement, maçonnerie paysagère, plantations : de 3 jours à 4 semaines.",
            ],
            [
              "Première année",
              "Un passage de contrôle à la saison suivante, plantes remplacées si besoin.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="border-t border-(--mousse)/25 pt-5">
              <span className={cn(display, "text-[40px] leading-none text-(--feuille)")}>
                {i + 1}
              </span>
              <p className="mt-3 text-[18px] font-semibold">{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-black/62">{d}</p>
            </li>
          ))}
        </ol>
      </section>
      <VisitBand />
      <Footer />
      <MobileBar />
    </>
  );
}

/* -------------------------------------------------------------- Entretien */

const visits = ["6 passages", "10 passages", "18 passages"] as const;
const visitCount = { "6 passages": 6, "10 passages": 10, "18 passages": 18 };

function Entretien() {
  const [lawn, setLawn] = useState(400);
  const [hedge, setHedge] = useState(30);
  const [freq, setFreq] = useState<(typeof visits)[number]>("10 passages");
  const n = visitCount[freq];
  // Prix d'exemple : tonte au m², taille au mètre de haie (2 tailles par an), désherbage forfaitaire.
  const perVisit = Math.round(28 + lawn * 0.055);
  const hedgeYear = Math.round(hedge * 9 * 2);
  const year = Math.round((perVisit * n + hedgeYear + 160) / 10) * 10;
  const fmt = (v: number) => v.toLocaleString("fr-FR");
  return (
    <>
      <PageTitle
        crumb="Entretien"
        title="Un jardin net toute l'année, sans y penser"
        intro="Choisissez la surface et le rythme : vous voyez tout de suite le prix d'un contrat d'exemple."
        src="pay-haie"
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="space-y-9">
          <label className="block">
            <span className="flex justify-between text-[16px] font-semibold">
              Pelouse à tondre <span className="text-(--feuille)">{lawn} m²</span>
            </span>
            <input
              type="range"
              min={100}
              max={2000}
              step={50}
              value={lawn}
              onChange={(e) => setLawn(Number(e.target.value))}
              className="mt-4 w-full accent-(--feuille)"
            />
          </label>
          <label className="block">
            <span className="flex justify-between text-[16px] font-semibold">
              Haies à tailler <span className="text-(--feuille)">{hedge} m</span>
            </span>
            <input
              type="range"
              min={0}
              max={150}
              step={5}
              value={hedge}
              onChange={(e) => setHedge(Number(e.target.value))}
              className="mt-4 w-full accent-(--feuille)"
            />
          </label>
          <div>
            <p className="text-[16px] font-semibold">Passages par an</p>
            <Pick
              options={visits}
              value={freq}
              onChange={setFreq}
              className="mt-3"
              itemClassName="h-11 rounded-full px-5 text-[15px] font-medium ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--mousse) aria-pressed:text-white aria-pressed:ring-(--mousse)"
            />
          </div>
          <ul className="space-y-2 border-t border-black/8 pt-6 text-[15px] text-black/65">
            <li>
              Compris : tonte et ramassage, bordures, taille des haies deux fois par an, ramassage
              des feuilles en automne.
            </li>
            <li>Déchets verts emportés et valorisés, pas de produit chimique.</li>
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-[22px] bg-(--brume) p-8 @min-[900px]:p-10">
          <div>
            <p className="text-[15px] text-black/55">Votre contrat d&apos;exemple</p>
            <p className={cn(display, "mt-3 text-[60px] leading-none")}>{fmt(year)} €</p>
            <p className="mt-2 text-[15px] text-black/55">
              par an, TTC, soit environ {fmt(Math.round(year / 12))} € par mois
            </p>
            <dl className="mt-8 space-y-3 border-t border-black/10 pt-6 text-[15.5px]">
              <div className="flex justify-between">
                <dt>Tonte et bordures</dt>
                <dd className="font-semibold">
                  {n} × {perVisit} €
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Taille des haies</dt>
                <dd className="font-semibold">{fmt(hedgeYear)} €</dd>
              </div>
              <div className="flex justify-between">
                <dt>Feuilles et désherbage</dt>
                <dd className="font-semibold">160 €</dd>
              </div>
            </dl>
            <p className="mt-6 text-[14px] leading-relaxed text-black/60">
              Si l&apos;entreprise y ouvre droit (déclarée pour les services à la personne), les
              petits travaux de jardinage donnent droit à un crédit d&apos;impôt de 50 %, dans la
              limite de 5 000 € de dépenses par an. À vérifier selon votre situation.
            </p>
          </div>
          <Go to="devis" className={cn(btnDark, "mt-8 self-start")}>
            Demander ce contrat
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------------- Réalisations */

const kinds = ["Tout", "Création", "Terrasse", "Entretien"] as const;

function Realisations() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("Tout");
  const [zoom, setZoom] = useState<Work | null>(null);
  const shown = works.filter((w) => kind === "Tout" || w.k === kind);
  return (
    <>
      <PageTitle
        crumb="Réalisations"
        title="Jardins du pays de Sarrebourg"
        intro="Photos prises chez nos clients, avec leur accord."
      />
      <section className={cn("py-12 @min-[900px]:py-16", pad)}>
        <Pick
          options={kinds}
          value={kind}
          onChange={setKind}
          itemClassName="h-10 rounded-full px-4 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 aria-pressed:bg-(--mousse) aria-pressed:text-white aria-pressed:ring-(--mousse)"
        />
        <div className="mt-8 columns-1 gap-5 @min-[600px]:columns-2 @min-[900px]:columns-3">
          {shown.map((w, i) => (
            <button
              key={w.src}
              type="button"
              onClick={() => setZoom(w)}
              className="group mb-6 block w-full break-inside-avoid text-left"
            >
              <span
                className={cn(
                  "relative block overflow-hidden rounded-[16px]",
                  i % 3 === 0 ? "h-[340px]" : "h-[240px]",
                )}
              >
                <Photo
                  src={w.src}
                  alt={w.t}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className={cn(display, "mt-3 block text-[22px] leading-tight")}>{w.t}</span>
              <span className="block text-[14px] text-black/55">
                {w.c}, {w.d.toLowerCase()}
              </span>
            </button>
          ))}
        </div>
      </section>
      {zoom && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-black/85 p-6"
          onClick={() => setZoom(null)}
        >
          <div className="relative h-[72%] w-full max-w-[960px] overflow-hidden rounded-[14px]">
            <Photo src={zoom.src} alt={zoom.t} sizes="960px" />
          </div>
          <p className="mt-4 text-[15px] text-white">
            {zoom.t}, {zoom.c}
          </p>
        </div>
      )}
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------------ Devis */

const projectKinds = [
  "Créer un jardin",
  "Terrasse ou allée",
  "Contrat d'entretien",
  "Autre",
] as const;
const budgets = [
  "Moins de 5 000 €",
  "5 000 à 15 000 €",
  "Plus de 15 000 €",
  "Je ne sais pas",
] as const;

function Devis() {
  const [kind, setKind] = useState<(typeof projectKinds)[number]>("Créer un jardin");
  const [budget, setBudget] = useState<(typeof budgets)[number]>("Je ne sais pas");
  const [photos, setPhotos] = useState(0);
  const chip =
    "h-10 rounded-full px-4 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--mousse) aria-pressed:text-white aria-pressed:ring-(--mousse)";
  const field =
    "mt-2 h-12 w-full rounded-[12px] bg-white px-4 text-[16px] ring-1 ring-inset ring-black/15 outline-none placeholder:text-black/35 focus:ring-2 focus:ring-(--feuille)";
  return (
    <>
      <PageTitle
        crumb="Visite gratuite"
        title="Montrez-nous votre jardin"
        intro="Quelques informations et deux ou trois photos suffisent pour préparer la visite."
        src="pay-gravier"
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.3fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <DemoForm
          success={{
            title: "Demande envoyée",
            text: `${kind} : nous vous appelons sous 48 h pour fixer la visite.`,
          }}
          submit="Envoyer ma demande"
          submitClassName={cn(btnDark, "mt-8 w-full")}
        >
          <p className="text-[15px] font-semibold">Votre projet</p>
          <Pick
            options={projectKinds}
            value={kind}
            onChange={setKind}
            className="mt-3"
            itemClassName={chip}
          />
          <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
            <label className="block">
              <span className="text-[15px] font-semibold">Commune</span>
              <input className={field} placeholder="Sarrebourg" />
            </label>
            <label className="block">
              <span className="text-[15px] font-semibold">Surface du jardin</span>
              <input className={field} placeholder="Environ 600 m²" />
            </label>
            <label className="block">
              <span className="text-[15px] font-semibold">Nom</span>
              <input className={field} placeholder="Votre nom" />
            </label>
            <label className="block">
              <span className="text-[15px] font-semibold">Téléphone</span>
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
          </div>
          <p className="mt-6 text-[15px] font-semibold">Budget envisagé</p>
          <Pick
            options={budgets}
            value={budget}
            onChange={setBudget}
            className="mt-3"
            itemClassName={chip}
          />
          <button
            type="button"
            onClick={() => setPhotos((p) => Math.min(p + 1, 6))}
            className="mt-6 flex w-full items-center gap-4 rounded-[14px] border-2 border-dashed border-black/15 px-5 py-5 text-left hover:border-(--feuille)"
          >
            <ImagePlus className="size-6 text-(--feuille)" />
            <span>
              <span className="block text-[15.5px] font-semibold">
                {photos
                  ? `${photos} photo${photos > 1 ? "s" : ""} du terrain ajoutée${photos > 1 ? "s" : ""}`
                  : "Ajouter des photos du terrain"}
              </span>
              <span className="block text-[13.5px] text-black/50">
                Vue d&apos;ensemble, coin à aménager, accès pour les engins
              </span>
            </span>
          </button>
        </DemoForm>
        <aside>
          <p className={cn(display, "text-[28px] leading-tight")}>Ou appelez-nous</p>
          <p className="mt-2 text-[34px] font-semibold tracking-[-0.02em]">{PHONE}</p>
          <dl className="mt-8 space-y-5 border-t border-black/8 pt-6 text-[15.5px]">
            <div>
              <dt className="font-semibold">Zone d&apos;intervention</dt>
              <dd className="mt-1 text-black/60">
                Sarrebourg et 30 km autour : Phalsbourg, Lorquin, Dabo, Réding, Héming
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Délais en ce moment</dt>
              <dd className="mt-1 text-black/60">
                Visite sous 10 jours, chantiers à partir de février
              </dd>
            </div>
          </dl>
        </aside>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Mentions */

function Mentions() {
  return (
    <>
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Verdance Jardins est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits
          photos={["pay-hero", "pay-taille", "pay-gazon", ...works.map((w) => w.src)]}
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
          id: "creation",
          label: "Création",
          path: "/creation-de-jardin",
          render: () => <Creation />,
        },
        { id: "entretien", label: "Entretien", path: "/entretien", render: () => <Entretien /> },
        {
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        { id: "devis", label: "Visite gratuite", path: "/visite", render: () => <Devis /> },
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
