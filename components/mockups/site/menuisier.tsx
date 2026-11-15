"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { ArrowLeft, ArrowRight, Menu, Paperclip, X } from "lucide-react";
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
 * Atelier Chêne & Fil, menuisier à Boulay-Moselle (entreprise fictive).
 * Un site de catalogue : la photo et le bois d'abord, comme un livre d'atelier.
 * Serif fin pour les titres, brou de noix et chêne, beaucoup de blanc.
 */

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});
const sans = Instrument_Sans({ subsets: ["latin"], display: "swap", preload: false });

const PHONE = "06 39 98 62 30";

const vars = {
  "--noyer": "#2b2018",
  "--chene": "#c49a6c",
  "--chene-t": "#8a5f33",
  "--lin": "#eeebe5",
  "--ink-text": "#2b2018",
  "--serif": serif.style.fontFamily,
  fontFamily: sans.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";
const display = "font-(family-name:--serif) font-normal tracking-[-0.01em]";

/* ---------------------------------------------------------------- Données */

const kinds = ["Cuisines", "Escaliers", "Bibliothèques", "Dressings"] as const;
type Kind = (typeof kinds)[number];

type Work = {
  src: string;
  t: string;
  k: Kind;
  c: string;
  wood: string;
  finish: string;
  weeks: number;
  d: string;
};

const works: Work[] = [
  {
    src: "men-cuisine",
    t: "Cuisine aux angles arrondis",
    k: "Cuisines",
    c: "Metz",
    wood: "Chêne",
    finish: "huile naturelle",
    weeks: 9,
    d: "Les façades sont cintrées à l'atelier sur gabarit, pour suivre le mur courbe de l'entrée. Plan de travail en quartzite.",
  },
  {
    src: "men-escalier",
    t: "Escalier hélicoïdal",
    k: "Escaliers",
    c: "Saint-Avold",
    wood: "Chêne",
    finish: "vernis mat",
    weeks: 11,
    d: "Limon et marches en lamellé-collé, cintrés d'une seule pièce. Le ruban lumineux est intégré sous la main courante.",
  },
  {
    src: "men-biblio",
    t: "Bibliothèque du sol au plafond",
    k: "Bibliothèques",
    c: "Boulay-Moselle",
    wood: "Frêne",
    finish: "huile blanche",
    weeks: 5,
    d: "Quatre-vingts cases réglables, posées sans une vis apparente. Le socle cache les plinthes et les prises.",
  },
  {
    src: "men-noyer",
    t: "Cuisine en noyer",
    k: "Cuisines",
    c: "Creutzwald",
    wood: "Noyer",
    finish: "huile cire",
    weeks: 10,
    d: "Façades sans poignées, ouvertes par une feuillure de 8 mm. Le noyer a été choisi en grume avec les clients.",
  },
  {
    src: "men-escalier2",
    t: "Escalier droit et garde-corps verre",
    k: "Escaliers",
    c: "Faulquemont",
    wood: "Chêne",
    finish: "vernis mat",
    weeks: 6,
    d: "Marches de 45 mm d'épaisseur, fixées dans le mur par des tiges cachées. Garde-corps en verre feuilleté.",
  },
  {
    src: "men-cuisine2",
    t: "Cuisine longue en chêne clair",
    k: "Cuisines",
    c: "Bouzonville",
    wood: "Chêne",
    finish: "huile incolore",
    weeks: 8,
    d: "Sept mètres de linéaire et un îlot. Un ruban de lumière sous les meubles bas éclaire le sol la nuit.",
  },
  {
    src: "men-echelle",
    t: "Bibliothèque avec échelle",
    k: "Bibliothèques",
    c: "Metz",
    wood: "Chêne",
    finish: "huile naturelle",
    weeks: 6,
    d: "Échelle coulissante sur rail laiton, pour atteindre les rayonnages hauts d'un séjour de 3,40 m sous plafond.",
  },
  {
    src: "men-niche",
    t: "Dressing et bureau en niche",
    k: "Dressings",
    c: "Boulay-Moselle",
    wood: "Noyer",
    finish: "vernis satiné",
    weeks: 7,
    d: "Un mur entier en noyer : penderie, tiroirs et un bureau éclairé par des niches à LED.",
  },
];

const reviews = [
  {
    n: "Claire",
    c: "Metz",
    t: "Ils sont venus trois fois prendre les cotes de notre mur courbe. La cuisine est tombée au millimètre, et on a pu voir les façades à l'atelier avant la pose.",
  },
  {
    n: "Julien",
    c: "Saint-Avold",
    t: "L'escalier est devenu la pièce qu'on montre en premier. Délai annoncé de onze semaines, posé en onze semaines.",
  },
  {
    n: "Martine",
    c: "Boulay",
    t: "Bibliothèque magnifique et chantier très propre. Le menuisier nous a expliqué comment entretenir l'huile.",
  },
];

/* ------------------------------------------------------------ Éléments */

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  const overPhoto = page === "home" && !open;
  return (
    <header
      className={cn(
        "top-0 z-30 w-full",
        overPhoto ? "absolute text-white" : "sticky border-b border-black/8 bg-white",
      )}
    >
      <div className={cn("flex h-20 items-center gap-10", pad)}>
        <Go to="home" className="text-left leading-none" label="Atelier Chêne & Fil, accueil">
          <span className={cn(display, "block text-[28px]")}>Chêne &amp; Fil</span>
          <span
            className={cn(
              "mt-1 block text-[12.5px]",
              overPhoto ? "text-white/70" : "text-black/50",
            )}
          >
            Atelier de menuiserie à Boulay
          </span>
        </Go>
        <nav className="ml-auto hidden items-center gap-8 @min-[1000px]:flex">
          {nav
            .filter((p) => p.id !== "projet")
            .map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(p.id)}
                aria-current={p.id === page ? "page" : undefined}
                className={cn(
                  "text-[15.5px] underline-offset-[6px] hover:underline aria-[current=page]:underline",
                  overPhoto ? "text-white/85 hover:text-white" : "text-black/65 hover:text-black",
                )}
              >
                {p.label}
              </button>
            ))}
        </nav>
        <Go
          to="projet"
          className={cn(
            "hidden h-11 items-center rounded-full px-6 text-[15px] font-medium transition-colors @min-[1000px]:inline-flex",
            overPhoto
              ? "bg-white text-(--noyer) hover:bg-white/90"
              : "bg-(--noyer) text-white hover:bg-black",
          )}
        >
          Parler de mon projet
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid size-11 place-items-center @min-[1000px]:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-black/8 bg-white px-5 pb-6 @min-[1000px]:hidden">
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
                "block w-full border-b border-black/8 py-4 text-left text-[28px]",
              )}
            >
              {p.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--noyer) text-white/65">
      <div className={cn("grid gap-10 py-16 @min-[900px]:grid-cols-[1.6fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <p className={cn(display, "text-[34px] leading-none text-white")}>Chêne &amp; Fil</p>
          <p className="mt-4 max-w-[320px] text-[14.5px] leading-relaxed">
            Menuiserie d&apos;agencement en bois massif depuis 2004. Dessin, fabrication et pose,
            sans sous-traitance.
          </p>
        </div>
        <div className="text-[14.5px]">
          <p className="text-white">Le site</p>
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
        <div className="text-[14.5px] leading-relaxed">
          <p className="text-white">L&apos;atelier</p>
          <p className="mt-3">
            Lundi au vendredi, 8 h – 18 h
            <br />
            Visite le samedi matin, sur rendez-vous
            <br />
            Boulay-Moselle (57)
          </p>
        </div>
        <div className="text-[14.5px]">
          <p className="text-white">Nous joindre</p>
          <p className="mt-3 text-[20px] text-white">{PHONE}</p>
          <p className="mt-1">atelier@chene-et-fil-exemple.fr</p>
          <p className="mt-4">Bois PEFC · Garantie décennale</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-3 border-t border-white/10 py-5 text-[13px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-5">
          <span>© 2026 Atelier Chêne &amp; Fil</span>
          <button type="button" onClick={() => go("mentions")} className="hover:text-white">
            Mentions légales et crédits photos
          </button>
        </span>
        <span>Entreprise fictive : site d&apos;exemple réalisé par NEOBATYS</span>
      </div>
    </footer>
  );
}

function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className={cn("pt-14 pb-12 @min-[900px]:pt-20 @min-[900px]:pb-16", pad)}>
      <h1
        className={cn(
          display,
          "max-w-[900px] text-[48px] leading-[1] text-balance @min-[900px]:text-[80px]",
        )}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-black/60">{intro}</p>
      )}
    </div>
  );
}

function WorkCard({ w, i, tall = false }: { w: Work; i: number; tall?: boolean }) {
  return (
    <Go to="fiche" param={String(i)} className="group block text-left">
      <span
        className={cn(
          "relative block overflow-hidden bg-(--lin)",
          tall ? "aspect-[3/4]" : "aspect-[4/3]",
        )}
      >
        <Photo
          src={w.src}
          alt={w.t}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-4">
        <span className={cn(display, "text-[24px] leading-tight")}>{w.t}</span>
        <span className="shrink-0 text-[14px] text-black/50">{w.c}</span>
      </span>
      <span className="mt-1 block text-[14px] text-black/55">
        {w.wood}, {w.finish}
      </span>
    </Go>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      <section className="relative h-[640px] overflow-hidden bg-(--noyer) text-white @min-[900px]:h-[760px]">
        <Photo
          src="men-hero"
          alt="Mains qui tracent au crayon un assemblage sur une planche de chêne"
          priority
          sizes="100vw"
          position="50% 40%"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_14_9/0.55)_0%,rgb(20_14_9/0)_28%,rgb(20_14_9/0)_45%,rgb(20_14_9/0.82)_100%)]" />
        <div className="absolute inset-0 bg-[rgb(20_14_9/0.35)] @min-[900px]:hidden" />
        <div className={cn("absolute inset-x-0 bottom-0 pb-12 @min-[900px]:pb-16", pad)}>
          <h1
            className={cn(
              display,
              "max-w-[880px] text-[52px] leading-[0.98] text-balance @min-[900px]:text-[96px]",
            )}
          >
            Le bois massif, dessiné pour votre maison.
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-[520px] text-[17px] leading-relaxed text-white/80">
              Cuisines, escaliers, bibliothèques et dressings fabriqués dans notre atelier de
              Boulay, et posés par ceux qui les ont faits.
            </p>
            <div className="flex flex-wrap gap-3">
              <Go
                to="realisations"
                className="inline-flex h-13 items-center rounded-full bg-white px-7 text-[16px] font-medium text-(--noyer) hover:bg-white/90"
              >
                Voir les réalisations
              </Go>
              <Go
                to="projet"
                className="inline-flex h-13 items-center rounded-full px-7 text-[16px] font-medium text-white ring-1 ring-white/50 ring-inset hover:ring-white"
              >
                Parler de mon projet
              </Go>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue : mise en page de livre, une grande photo et deux petites */}
      <section className={cn("py-16 @min-[900px]:py-28", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className={cn(display, "text-[40px] leading-none @min-[900px]:text-[60px]")}>
            Dernières pièces sorties de l&apos;atelier
          </h2>
          <Go
            to="realisations"
            className="inline-flex items-center gap-2 text-[15.5px] underline underline-offset-[6px]"
          >
            Les {works.length} réalisations <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="mt-12 grid gap-10 @min-[900px]:grid-cols-[1.15fr_1fr] @min-[900px]:gap-14">
          <WorkCard w={works[0]} i={0} tall />
          <div className="grid gap-10">
            <WorkCard w={works[1]} i={1} />
            <WorkCard w={works[2]} i={2} />
          </div>
        </div>
      </section>

      {/* L'atelier */}
      <section className="bg-(--noyer) text-white">
        <div className="grid @min-[900px]:grid-cols-2">
          <div className={cn("py-16 @min-[900px]:py-24 @min-[900px]:pr-16", pad)}>
            <h2 className={cn(display, "text-[40px] leading-[1.02] @min-[900px]:text-[60px]")}>
              Tout est fabriqué ici, à 25 minutes de Metz.
            </h2>
            <p className="mt-6 max-w-[460px] text-[17px] leading-relaxed text-white/70">
              Six menuisiers, 600 m² d&apos;atelier et un séchoir à bois. Nous achetons le chêne et
              le frêne dans les scieries des Vosges, le noyer en grume.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/15 pt-8">
              {[
                ["Plans 3D", "offerts avant toute commande"],
                ["4 à 11 semaines", "de fabrication selon la pièce"],
                ["Bois PEFC", "chêne, frêne et noyer"],
                ["Pose comprise", "par l'équipe qui a fabriqué"],
              ].map(([t, d]) => (
                <div key={t}>
                  <dt className={cn(display, "text-[26px] text-(--chene)")}>{t}</dt>
                  <dd className="mt-1 text-[14.5px] text-white/60">{d}</dd>
                </div>
              ))}
            </dl>
            <Go
              to="atelier"
              className="mt-10 inline-flex items-center gap-2 text-[15.5px] underline underline-offset-[6px]"
            >
              Visiter l&apos;atelier <ArrowRight className="size-4" />
            </Go>
          </div>
          <div className="grid grid-rows-[1.3fr_1fr]">
            <div className="relative min-h-[260px]">
              <Photo
                src="men-atelier"
                alt="Établi de l'atelier à la lumière du matin"
                sizes="640px"
              />
            </div>
            <div className="relative min-h-[200px]">
              <Photo src="men-rabots" alt="Rabots alignés sur le mur de l'atelier" sizes="640px" />
            </div>
          </div>
        </div>
      </section>

      {/* Déroulé : une vraie suite d'étapes */}
      <section className={cn("py-16 @min-[900px]:py-28", pad)}>
        <h2
          className={cn(display, "max-w-[700px] text-[40px] leading-none @min-[900px]:text-[60px]")}
        >
          De la prise de cotes à la pose
        </h2>
        <ol className="mt-14 grid gap-10 @min-[700px]:grid-cols-2 @min-[1100px]:grid-cols-4">
          {[
            [
              "Visite et relevé",
              "On vient chez vous mesurer, toucher les murs et parler de l'usage.",
            ],
            ["Plans et devis", "Plans 3D, échantillons d'essences et prix ferme sous 10 jours."],
            ["Fabrication", "À l'atelier, avec une visite possible avant la finition."],
            ["Pose", "En 1 à 4 jours, chantier protégé, finitions faites sur place."],
          ].map(([t, d], i) => (
            <li key={t} className="border-t border-black/15 pt-6">
              <span className={cn(display, "text-[44px] leading-none text-(--chene-t) italic")}>
                {i + 1}
              </span>
              <p className="mt-4 text-[19px] font-semibold">{t}</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-black/60">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Avis */}
      <section className={cn("bg-(--lin) py-16 @min-[900px]:py-24", pad)}>
        <div className="grid gap-12 @min-[900px]:grid-cols-[1.4fr_1fr] @min-[900px]:gap-20">
          <figure>
            <blockquote
              className={cn(display, "text-[32px] leading-[1.15] @min-[900px]:text-[44px]")}
            >
              « {reviews[0].t} »
            </blockquote>
            <figcaption className="mt-6 text-[15px] text-black/60">
              {reviews[0].n}, cuisine à {reviews[0].c}
            </figcaption>
          </figure>
          <div className="space-y-8">
            <p className="flex items-center gap-3 text-[15px]">
              <GoogleG className="size-5" />
              <b className="text-[18px]">5,0</b>
              <Stars className="text-[15px]" />
              <span className="text-black/55">41 avis Google</span>
            </p>
            {reviews.slice(1).map((r) => (
              <figure key={r.n} className="border-t border-black/12 pt-6">
                <blockquote className="text-[16px] leading-relaxed">{r.t}</blockquote>
                <figcaption className="mt-3 text-[14px] text-black/55">
                  {r.n}, {r.c}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <VisitBand />
      <Footer />
    </>
  );
}

function VisitBand() {
  return (
    <section className="grid @min-[900px]:grid-cols-2">
      <div className="relative min-h-[300px]">
        <Photo src="men-mesure" alt="Mains qui vérifient un assemblage au réglet" sizes="640px" />
      </div>
      <div className={cn("flex flex-col justify-center py-16 @min-[900px]:pl-16", pad)}>
        <h2 className={cn(display, "text-[38px] leading-[1.02] @min-[900px]:text-[52px]")}>
          Venez voir le bois avant de choisir.
        </h2>
        <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-black/60">
          L&apos;atelier ouvre le samedi matin sur rendez-vous : échantillons d&apos;essences et
          pièces en cours de fabrication.
        </p>
        <Go
          to="projet"
          className="mt-8 inline-flex h-13 w-fit items-center rounded-full bg-(--noyer) px-7 text-[16px] font-medium text-white hover:bg-black"
        >
          Prendre rendez-vous
        </Go>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Réalisations */

function Realisations() {
  const [kind, setKind] = useState<"Tout" | Kind>("Tout");
  const shown = works.map((w, i) => ({ w, i })).filter(({ w }) => kind === "Tout" || w.k === kind);
  return (
    <>
      <PageTitle
        title="Réalisations"
        intro="Chaque pièce est dessinée pour un lieu. Touchez une photo pour voir l'essence, la finition et le temps de fabrication."
      />
      <section className={cn("pb-20", pad)}>
        <Pick
          options={["Tout", ...kinds] as const}
          value={kind}
          onChange={setKind}
          itemClassName="h-10 rounded-full px-5 text-[15px] ring-1 ring-black/15 ring-inset hover:ring-black/40 aria-pressed:bg-(--noyer) aria-pressed:text-white aria-pressed:ring-(--noyer)"
        />
        <div className="mt-10 grid gap-x-10 gap-y-14 @min-[700px]:grid-cols-2 @min-[1100px]:grid-cols-3">
          {shown.map(({ w, i }) => (
            <WorkCard key={w.src} w={w} i={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

function Fiche() {
  const { param } = useSite();
  const i = Math.min(Math.max(Number(param) || 0, 0), works.length - 1);
  const w = works[i];
  const next = (i + 1) % works.length;
  return (
    <>
      <div className={cn("pt-8", pad)}>
        <Go
          to="realisations"
          className="inline-flex items-center gap-2 text-[15px] text-black/60 hover:text-black"
        >
          <ArrowLeft className="size-4" /> Toutes les réalisations
        </Go>
      </div>
      <section
        className={cn(
          "grid gap-10 py-10 @min-[900px]:grid-cols-[1.5fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-12",
          pad,
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-(--lin) @min-[900px]:aspect-auto @min-[900px]:min-h-[620px]">
          <Photo src={w.src} alt={w.t} sizes="(min-width: 1024px) 760px, 100vw" priority />
        </div>
        <div className="flex flex-col">
          <p className="text-[15px] text-(--chene-t)">
            {w.k.slice(0, -1)} à {w.c}
          </p>
          <h1 className={cn(display, "mt-3 text-[44px] leading-[1.02] @min-[900px]:text-[58px]")}>
            {w.t}
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-black/65">{w.d}</p>
          <dl className="mt-8 divide-y divide-black/10 border-y border-black/10 text-[15.5px]">
            {[
              ["Essence", w.wood],
              ["Finition", w.finish],
              ["Fabrication", `${w.weeks} semaines à l'atelier`],
              ["Lieu", w.c],
            ].map(([t, d]) => (
              <div key={t} className="flex justify-between py-3.5">
                <dt className="text-black/55">{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
          <Go
            to="projet"
            param={w.k}
            className="mt-8 inline-flex h-13 w-fit items-center rounded-full bg-(--noyer) px-7 text-[16px] font-medium text-white hover:bg-black"
          >
            Un projet dans cet esprit
          </Go>
          <Go
            to="fiche"
            param={String(next)}
            className="mt-10 flex items-center justify-between gap-4 border-t border-black/10 pt-6 text-left @min-[900px]:mt-auto"
          >
            <span>
              <span className="block text-[13.5px] text-black/50">Réalisation suivante</span>
              <span className={cn(display, "text-[24px]")}>{works[next].t}</span>
            </span>
            <ArrowRight className="size-5" />
          </Go>
        </div>
      </section>
      <Footer />
    </>
  );
}

/* --------------------------------------------------------------- Atelier */

function Atelier() {
  return (
    <>
      <PageTitle
        title="Un atelier, six menuisiers, aucun sous-traitant."
        intro="Nous dessinons, débitons, assemblons et finissons chaque pièce à Boulay-Moselle. Ce qui sort de l'atelier est posé par la même équipe."
      />
      <section className={cn("grid gap-4 @min-[900px]:grid-cols-[2fr_1fr_1fr]", pad)}>
        <div className="relative aspect-[4/3] @min-[900px]:aspect-auto @min-[900px]:h-[440px]">
          <Photo
            src="men-atelier"
            alt="Établi de l'atelier"
            sizes="(min-width: 1024px) 620px, 100vw"
          />
        </div>
        <div className="relative aspect-[3/4] @min-[900px]:aspect-auto @min-[900px]:h-[440px]">
          <Photo src="men-ciseau" alt="Ciseau à bois qui creuse une planche" sizes="320px" />
        </div>
        <div className="relative aspect-[3/4] @min-[900px]:aspect-auto @min-[900px]:h-[440px]">
          <Photo src="men-gouges" alt="Gouges posées sur un plateau" sizes="320px" />
        </div>
      </section>
      <section className={cn("grid gap-14 py-16 @min-[900px]:grid-cols-3 @min-[900px]:py-24", pad)}>
        {[
          [
            "Les essences",
            "Chêne et frêne des Vosges, séchés deux ans à l'air puis au séchoir. Noyer acheté en grume, que vous pouvez venir choisir.",
          ],
          [
            "Les assemblages",
            "Tenons, queues d'aronde et lamellos : pas d'agrafes ni de panneaux de particules dans les parties visibles.",
          ],
          [
            "Les finitions",
            "Huiles naturelles sans solvant, vernis à l'eau, cire. Nous vous laissons un pot et la notice d'entretien.",
          ],
        ].map(([t, d]) => (
          <div key={t}>
            <h2 className={cn(display, "text-[34px] leading-none")}>{t}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-black/62">{d}</p>
          </div>
        ))}
      </section>
      <VisitBand />
      <Footer />
    </>
  );
}

/* ---------------------------------------------------------- Votre projet */

const woods = ["Chêne", "Frêne", "Noyer"] as const;
const sizes = ["Compact", "Moyen", "Grand"] as const;
const estimate: Record<Kind, { base: number; weeks: string; src: string; unit: string[] }> = {
  Cuisines: {
    base: 14000,
    weeks: "8 à 10",
    src: "men-cuisine2",
    unit: ["3 m", "5 m", "7 m et îlot"],
  },
  Escaliers: {
    base: 9000,
    weeks: "6 à 11",
    src: "men-escalier",
    unit: ["droit", "quart tournant", "hélicoïdal"],
  },
  Bibliothèques: {
    base: 4200,
    weeks: "4 à 6",
    src: "men-biblio",
    unit: ["2 m", "4 m", "mur entier"],
  },
  Dressings: {
    base: 5200,
    weeks: "5 à 7",
    src: "men-niche",
    unit: ["1,5 m", "3 m", "pièce entière"],
  },
};
const woodRate = { Chêne: 1, Frêne: 0.92, Noyer: 1.35 };
const sizeRate = { Compact: 0.7, Moyen: 1, Grand: 1.55 };

function Projet() {
  const { param } = useSite();
  const [kind, setKind] = useState<Kind>(
    kinds.includes(param as Kind) ? (param as Kind) : "Cuisines",
  );
  const [wood, setWood] = useState<(typeof woods)[number]>("Chêne");
  const [size, setSize] = useState<(typeof sizes)[number]>("Moyen");
  const e = estimate[kind];
  const mid = e.base * woodRate[wood] * sizeRate[size];
  const fmt = (n: number) => (Math.round(n / 500) * 500).toLocaleString("fr-FR");
  const chip =
    "h-11 rounded-full px-5 text-[15px] ring-1 ring-black/15 ring-inset hover:ring-black/40 aria-pressed:bg-(--noyer) aria-pressed:text-white aria-pressed:ring-(--noyer)";
  const field =
    "mt-2 h-12 w-full border-b border-black/20 bg-transparent text-[17px] outline-none placeholder:text-black/30 focus:border-(--noyer)";
  return (
    <>
      <PageTitle
        title="Parlons de votre projet"
        intro="Trois choix pour une première idée du budget. Le prix ferme vient après la visite, avec les plans."
      />
      <section
        className={cn(
          "grid gap-12 pb-16 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:pb-24",
          pad,
        )}
      >
        <div className="space-y-8">
          <Row label="Ce que vous imaginez">
            <Pick options={kinds} value={kind} onChange={setKind} itemClassName={chip} />
          </Row>
          <Row label="Essence">
            <Pick options={woods} value={wood} onChange={setWood} itemClassName={chip} />
          </Row>
          <Row label={`Taille (${e.unit[sizes.indexOf(size)]})`}>
            <Pick options={sizes} value={size} onChange={setSize} itemClassName={chip} />
          </Row>
          <div className="border-t border-black/12 pt-8">
            <p className="text-[15px] text-black/55">Budget indicatif, fabrication et pose</p>
            <p className={cn(display, "mt-2 text-[54px] leading-none")}>
              {fmt(mid * 0.85)} – {fmt(mid * 1.15)} €
            </p>
            <p className="mt-3 text-[15px] text-black/55">
              {e.weeks} semaines de fabrication · plans 3D offerts
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-(--lin) @min-[900px]:aspect-auto">
          <Photo key={e.src} src={e.src} alt={kind} sizes="(min-width: 1024px) 600px, 100vw" />
        </div>
      </section>
      <section className={cn("bg-(--lin) py-16 @min-[900px]:py-24", pad)}>
        <div className="grid gap-12 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20">
          <div>
            <h2 className={cn(display, "text-[40px] leading-none @min-[900px]:text-[56px]")}>
              Envoyez-nous vos idées
            </h2>
            <p className="mt-5 max-w-[400px] text-[17px] leading-relaxed text-black/60">
              Une photo de la pièce, un croquis ou une image trouvée ailleurs suffisent. Nous vous
              rappelons sous 48 heures pour fixer la visite.
            </p>
            <p className="mt-8 text-[15px] text-black/55">Ou appelez l&apos;atelier</p>
            <p className={cn(display, "text-[34px]")}>{PHONE}</p>
          </div>
          <DemoForm
            success={{
              title: "Demande envoyée",
              text: `${kind}, ${wood.toLowerCase()} : nous vous rappelons sous 48 heures pour fixer la visite.`,
            }}
            submit="Envoyer ma demande"
            submitClassName="mt-10 inline-flex h-13 items-center rounded-full bg-(--noyer) px-8 text-[16px] font-medium text-white hover:bg-black"
          >
            <div className="grid gap-8 @min-[700px]:grid-cols-2">
              <label className="block text-[14px] text-black/60">
                Prénom et nom
                <input className={field} placeholder="Claire Martin" />
              </label>
              <label className="block text-[14px] text-black/60">
                Téléphone
                <input className={field} type="tel" placeholder="06 00 00 00 00" />
              </label>
              <label className="block text-[14px] text-black/60">
                Commune
                <input className={field} placeholder="Boulay-Moselle" />
              </label>
              <label className="block text-[14px] text-black/60">
                Délai souhaité
                <input className={field} placeholder="Avant l'été" />
              </label>
            </div>
            <label className="mt-8 block text-[14px] text-black/60">
              Votre projet
              <textarea
                rows={3}
                className={cn(field, "h-auto resize-none py-2")}
                placeholder="Une bibliothèque autour de la fenêtre du séjour…"
              />
            </label>
            <span className="mt-6 inline-flex items-center gap-2 text-[15px] underline underline-offset-4">
              <Paperclip className="size-4" /> Joindre des photos ou un plan
            </span>
          </DemoForm>
        </div>
      </section>
      <Footer />
    </>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[15px] font-semibold">{label}</p>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- Mentions */

function Mentions() {
  return (
    <>
      <PageTitle
        title="Mentions légales et crédits photos"
        intro="Atelier Chêne & Fil est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("pb-20", pad)}>
        <PhotoCredits
          photos={[
            "men-hero",
            ...works.map((w) => w.src),
            "men-atelier",
            "men-rabots",
            "men-ciseau",
            "men-gouges",
            "men-mesure",
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
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        { id: "atelier", label: "L'atelier", path: "/atelier", render: () => <Atelier /> },
        { id: "projet", label: "Votre projet", path: "/votre-projet", render: () => <Projet /> },
        {
          id: "fiche",
          label: "Réalisation",
          path: "/realisations/fiche",
          render: () => <Fiche />,
          inNav: false,
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
