"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Epilogue } from "next/font/google";
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
} from "./frame";

/*
 * Façades Linéa, façadier à Hagondange (entreprise fictive).
 * Le site d'un façadier se juge à la couleur : une bande de teintes d'enduit
 * posée sur la photo du premier écran, un nuancier qui teinte de vraies
 * textures d'enduit, un simulateur de ravalement au m².
 * Chaux, pierre, terre cuite, anthracite ; une grotesque large.
 */

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 16 83";

const vars = {
  "--chaux": "#f3efe7",
  "--pierre": "#e2d8c6",
  "--terre": "#a8522a",
  "--terre-t": "#8f4220",
  "--anthra": "#22211f",
  "--ink-text": "#22211f",
  fontFamily: epilogue.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";

/* ---------------------------------------------------------------- Données */

type Tint = { id: string; n: string; hex: string };

/** Teintes d'enduit d'exemple (noms inventés, pas un nuancier de fabricant). */
const tints: Tint[] = [
  { id: "chaux", n: "Blanc de chaux", hex: "#f1ece2" },
  { id: "pierre", n: "Pierre de Jaumont", hex: "#d9b97c" },
  { id: "sable", n: "Sable de l'Orne", hex: "#d8c7a6" },
  { id: "ocre", n: "Ocre doré", hex: "#c9913f" },
  { id: "terre", n: "Terre cuite", hex: "#b46a43" },
  { id: "rose", n: "Rose ancien", hex: "#d7a596" },
  { id: "gris", n: "Gris perle", hex: "#bdbab2" },
  { id: "vert", n: "Vert de gris", hex: "#9aa58f" },
];

const finishes = [
  {
    id: "gratte",
    t: "Gratté",
    src: "fac-gratte",
    d: "Le plus courant : grain régulier, salit peu.",
  },
  { id: "talo", t: "Taloché", src: "fac-talo", d: "Fin et mat, pour les maisons anciennes." },
  { id: "ecrase", t: "Écrasé", src: "fac-ribbe", d: "Relief marqué, accroche la lumière." },
] as const;

type Kind = "Ravalement" | "Isolation" | "Enduit";
const works: { src: string; t: string; c: string; k: Kind; d: string }[] = [
  {
    src: "fac-hero",
    t: "Immeuble 1900, façade sur rue",
    c: "Metz",
    k: "Ravalement",
    d: "Nettoyage, reprise des modénatures, peinture minérale",
  },
  {
    src: "fac-echafaudage",
    t: "Maison bourgeoise",
    c: "Hagondange",
    k: "Ravalement",
    d: "Échafaudage 3 faces, 5 semaines",
  },
  {
    src: "fac-ite",
    t: "Isolation par l'extérieur, 180 m²",
    c: "Maizières-lès-Metz",
    k: "Isolation",
    d: "Isolant 14 cm, enduit gratté",
  },
  {
    src: "fac-blanche",
    t: "Maison des années 70",
    c: "Talange",
    k: "Isolation",
    d: "Isolation et enduit blanc de chaux",
  },
  {
    src: "fac-porte-verte",
    t: "Enduit taloché ton crème",
    c: "Amnéville",
    k: "Enduit",
    d: "Piquage, enduit chaux, teinte Sable de l'Orne",
  },
  {
    src: "fac-ocre",
    t: "Façade ocre doré",
    c: "Rombas",
    k: "Enduit",
    d: "Enduit gratté, encadrements en pierre conservés",
  },
  {
    src: "fac-maison",
    t: "Maison de ville",
    c: "Mondelange",
    k: "Enduit",
    d: "Réparation des fissures et enduit blanc",
  },
  {
    src: "fac-porte-bleue",
    t: "Ferme lorraine",
    c: "Clouange",
    k: "Ravalement",
    d: "Enduit à la chaux sur pierre, 3 couches",
  },
];

const reviews = [
  {
    n: "Sylvie",
    c: "Hagondange",
    when: "il y a 3 semaines",
    t: "Façade et pignon refaits en cinq semaines. L'échafaudage était bâché, les fenêtres protégées et tout a été nettoyé au départ. La teinte est exactement celle de l'échantillon.",
  },
  {
    n: "Marc",
    c: "Talange",
    when: "il y a 2 mois",
    t: "Isolation par l'extérieur de notre maison de 1975. On sent la différence dès les premiers froids. Ils ont monté le dossier d'aides avec nous.",
  },
  {
    n: "Nathalie",
    c: "Metz",
    when: "il y a 4 mois",
    t: "Ravalement d'un petit immeuble : la déclaration en mairie, la réservation du trottoir, tout a été pris en charge. Devis respecté.",
  },
];

const towns = [
  "Hagondange",
  "Talange",
  "Mondelange",
  "Maizières-lès-Metz",
  "Amnéville",
  "Rombas",
  "Clouange",
  "Metz",
  "Thionville",
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex items-center justify-center gap-2 h-13 px-7 text-[15.5px] font-semibold tracking-[-0.005em] transition-colors";
const btnDark = cn(btn, "bg-(--anthra) text-white hover:bg-black");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--anthra)/25 hover:ring-(--anthra)");
const chip =
  "h-11 px-5 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 transition-colors hover:ring-black/40 aria-pressed:bg-(--anthra) aria-pressed:text-white aria-pressed:ring-(--anthra)";

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[30px] leading-[1.05] font-bold tracking-[-0.035em] text-balance @min-[900px]:text-[46px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-3">
      {/* Trois lignes d'enduit : le « linéa » du nom */}
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect x="3" y="6" width="26" height="5" fill="var(--terre)" />
        <rect x="3" y="14" width="20" height="5" fill="var(--anthra)" />
        <rect x="3" y="22" width="14" height="5" fill="var(--anthra)" opacity="0.45" />
      </svg>
      <span className="leading-none">
        <span className="block text-[21px] font-extrabold tracking-[-0.04em]">Linéa</span>
        <span className="mt-1 block text-[12.5px] text-black/50">Façades et ravalement</span>
      </span>
    </span>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  const links = nav.filter((p) => p.id !== "devis" && p.id !== "mentions");
  return (
    <header className="sticky top-0 z-30 border-b border-black/8 bg-(--chaux)/95 backdrop-blur">
      <div className={cn("flex h-18 items-center gap-8", pad)}>
        <Go to="home" className="text-left" label="Façades Linéa, accueil">
          <Logo />
        </Go>
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {links.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="relative py-2 text-[15px] font-medium text-black/60 hover:text-black aria-[current=page]:text-black aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-[19px] aria-[current=page]:after:h-[3px] aria-[current=page]:after:bg-(--terre)"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <span className="ml-auto hidden text-[15px] font-semibold @min-[900px]:inline @min-[1100px]:ml-0">
          {PHONE}
        </span>
        <Go
          to="devis"
          className={cn(btnDark, "hidden h-11 px-5 text-[14.5px] @min-[900px]:inline-flex")}
        >
          Estimer ma façade
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid h-11 min-w-11 place-items-center px-3 ring-1 ring-black/15 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? (
            <X className="size-5" />
          ) : (
            <span className="text-[14px] font-semibold">Menu</span>
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
              className="flex w-full items-center justify-between border-b border-black/8 py-3.5 text-[17px] font-semibold"
            >
              {p.label} <ArrowRight className="size-4 opacity-40" />
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

/** Barre collée en bas, sur téléphone seulement. */
function MobileBar() {
  return (
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/10 bg-(--chaux) p-3 @min-[900px]:hidden">
      <Go to="devis" className={cn(btnLine, "h-12 px-3 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="devis" className={cn(btnDark, "h-12 px-3 text-[15px]")}>
        Estimer
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--anthra) text-white/65">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <p className="text-[22px] font-extrabold tracking-[-0.04em] text-white">Façades Linéa</p>
          <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed">
            Ravalement, enduits et isolation par l&apos;extérieur à Hagondange et dans la vallée de
            l&apos;Orne, depuis 2006.
          </p>
          <p className="mt-5 text-[13px]">Qualibat, RGE et garantie décennale</p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Le site</p>
          <ul className="mt-3 space-y-2">
            {nav
              .filter((p) => p.id !== "mentions")
              .map((p) => (
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
            Lundi au vendredi, 7 h 30 – 18 h
            <br />
            Visites de façade le samedi matin sur rendez-vous
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-bold text-white">{PHONE}</p>
          <p className="mt-1">contact@facades-linea-exemple.fr</p>
          <p className="mt-1">Dépôt sur rendez-vous, Hagondange (57)</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Façades Linéa</span>
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
        "border-b border-black/8 bg-(--chaux) pt-10 pb-12 @min-[900px]:pt-14 @min-[900px]:pb-16",
        pad,
      )}
    >
      <p className="text-[14px] text-black/50">
        <Go to="home" className="hover:text-black">
          Accueil
        </Go>{" "}
        / <span className="text-black/75">{crumb}</span>
      </p>
      <h1 className="mt-4 max-w-[820px] text-[36px] leading-[1.03] font-bold tracking-[-0.04em] text-balance @min-[900px]:text-[58px]">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-[620px] text-[17px] leading-relaxed text-black/60">{intro}</p>
      )}
    </div>
  );
}

/** Pastille de teinte : un carré d'enduit avec son nom. */
function Swatch({ tint, active, onClick }: { tint: Tint; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={tint.n}
      className="group text-left"
    >
      <span
        className={cn(
          "block aspect-square ring-1 ring-black/10 transition-transform group-hover:-translate-y-0.5",
          active && "ring-2 ring-(--anthra) ring-offset-2",
        )}
        style={{ backgroundColor: tint.hex }}
      />
      <span className="mt-2 block text-[13px] leading-tight font-medium">{tint.n}</span>
    </button>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  const { go } = useSite();
  return (
    <div className="bg-(--chaux)">
      {/* Premier écran : la promesse, puis la photo et la bande de teintes */}
      <section className={cn("pt-12 pb-10 @min-[900px]:pt-12 @min-[900px]:pb-12", pad)}>
        <div className="grid gap-8 @min-[900px]:grid-cols-[1.35fr_1fr] @min-[900px]:items-end">
          <div>
            <p className="text-[15px] font-medium text-(--terre-t)">
              Façadier à Hagondange et dans la vallée de l&apos;Orne
            </p>
            <h1 className="mt-4 text-[40px] leading-[0.98] font-extrabold tracking-[-0.05em] text-balance @min-[900px]:text-[68px]">
              Votre façade refaite pour trente ans.
            </h1>
          </div>
          <div>
            <p className="text-[17px] leading-relaxed text-black/62">
              Ravalement, enduit à la chaux et isolation par l&apos;extérieur. Échafaudage,
              protection des abords et nettoyage de fin de chantier compris dans le prix.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Go to="devis" className={btnDark}>
                Estimer ma façade
              </Go>
              <Go to="nuancier" className={btnLine}>
                Choisir une teinte
              </Go>
            </div>
          </div>
        </div>
      </section>
      <section className="relative">
        <div className="relative h-[300px] @min-[900px]:h-[340px]">
          <Photo
            src="fac-hero"
            alt="Façade d'immeuble ancien ravalée, ton pierre"
            priority
            sizes="(min-width: 1024px) 1280px, 100vw"
            position="50% 35%"
          />
          <p className="absolute top-4 right-5 bg-(--chaux) px-3 py-1.5 text-[12.5px] @min-[900px]:right-16">
            Immeuble 1900 à Metz, ravalé en 2025
          </p>
        </div>
        {/* Bande de teintes posée sur le bas de la photo */}
        <div className={cn("relative -mt-16 @min-[900px]:-mt-20", pad)}>
          <div className="grid grid-cols-4 gap-px bg-black/10 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.45)] @min-[900px]:grid-cols-8">
            {tints.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => go("nuancier", t.id)}
                className="group flex h-28 flex-col justify-end p-3 text-left @min-[900px]:h-36"
                style={{ backgroundColor: t.hex }}
              >
                <span className="text-[12.5px] leading-tight font-semibold text-black/75 group-hover:text-black">
                  {t.n}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-black/50">
            Touchez une teinte pour la voir sur un enduit gratté, taloché ou écrasé.
          </p>
        </div>
      </section>

      {/* Repères */}
      <section
        className={cn(
          "mt-12 grid grid-cols-2 gap-y-6 border-y border-black/10 py-8 @min-[900px]:grid-cols-4",
          pad,
        )}
      >
        {[
          ["4,8 sur 5", "94 avis Google"],
          ["RGE", "Qualibat isolation extérieure"],
          ["10 ans", "garantie décennale"],
          ["Devis en 6 jours", "après la visite de façade"],
        ].map(([v, l]) => (
          <div key={v}>
            <p className="text-[26px] font-bold tracking-[-0.03em]">{v}</p>
            <p className="mt-1 text-[14px] text-black/55">{l}</p>
          </div>
        ))}
      </section>

      {/* Prestations */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[640px]">Trois métiers de la façade, une seule équipe.</H2>
        <div className="mt-10 grid gap-8 @min-[900px]:grid-cols-3">
          {[
            {
              to: "ravalement",
              src: "fac-echafaudage",
              t: "Ravalement",
              d: "Nettoyage, traitement des fissures, enduit ou peinture minérale. On redonne à la façade son aspect d'origine.",
              p: "à partir de 45 € / m²",
            },
            {
              to: "isolation",
              src: "fac-ite",
              t: "Isolation par l'extérieur",
              d: "Un isolant sous un enduit neuf : la maison garde sa chaleur et change de visage en un seul chantier.",
              p: "à partir de 140 € / m²",
            },
            {
              to: "nuancier",
              src: "fac-ocre",
              t: "Enduits et teintes",
              d: "Enduit à la chaux, gratté ou taloché, dans la teinte choisie sur échantillon devant chez vous.",
              p: "à partir de 60 € / m²",
            },
          ].map((s) => (
            <Go key={s.t} to={s.to} className="group text-left">
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Photo
                  src={s.src}
                  alt={s.t}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-5 flex items-baseline justify-between gap-4">
                <span className="text-[21px] font-bold tracking-[-0.02em]">{s.t}</span>
                <ArrowRight className="size-5 shrink-0 text-black/30 transition-transform group-hover:translate-x-1 group-hover:text-(--terre)" />
              </span>
              <span className="mt-2 block text-[15px] leading-relaxed text-black/60">{s.d}</span>
              <span className="mt-3 block text-[14px] font-semibold text-(--terre-t)">{s.p}</span>
            </Go>
          ))}
        </div>
      </section>

      {/* Déroulé : une vraie suite d'étapes */}
      <section
        className={cn(
          "grid gap-12 bg-(--anthra) py-16 text-white @min-[900px]:grid-cols-[1fr_1.2fr] @min-[900px]:gap-16 @min-[900px]:py-24",
          pad,
        )}
      >
        <div>
          <H2>Un ravalement, du premier échafaudage au dernier coup de balai.</H2>
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden @min-[900px]:block">
            <Photo src="fac-echafaudage" alt="Maison sous échafaudage" sizes="520px" />
          </div>
        </div>
        <ol className="divide-y divide-white/12 border-y border-white/12">
          {[
            [
              "Visite et diagnostic",
              "Fissures, humidité, état de l'enduit : on vous dit ce qu'il faut faire, et ce qui peut attendre.",
            ],
            [
              "Déclaration en mairie",
              "Si votre commune la demande, nous préparons la déclaration préalable et la demande d'occupation du trottoir.",
            ],
            [
              "Échafaudage et protection",
              "Échafaudage bâché, fenêtres, sols et plantations protégés avant le premier coup de jet.",
            ],
            [
              "Nettoyage, réparation, enduit",
              "Nettoyage basse pression, reprise des fissures, puis enduit ou isolant selon le devis.",
            ],
            [
              "Réception ensemble",
              "On fait le tour de la façade avec vous, on démonte et on nettoie les abords.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[48px_1fr] gap-4 py-6">
              <span className="text-[26px] leading-none font-bold text-(--pierre)">{i + 1}</span>
              <span>
                <span className="block text-[19px] font-semibold tracking-[-0.01em]">{t}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-white/62">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Réalisations */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2 className="max-w-[560px]">Des façades de la vallée de l&apos;Orne.</H2>
          <Go
            to="realisations"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-(--terre-t)"
          >
            Toutes les réalisations <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="mt-10 grid gap-4 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-[1.4fr_1fr_1fr]">
          {works.slice(0, 3).map((w, i) => (
            <Go
              key={w.src}
              to="realisations"
              className={cn(
                "group relative block overflow-hidden text-left",
                i === 0
                  ? "aspect-[4/3] @min-[900px]:row-span-2 @min-[900px]:aspect-auto"
                  : "aspect-[4/3]",
              )}
            >
              <Photo
                src={w.src}
                alt={w.t}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-white">
                <span className="block text-[17px] font-semibold">{w.t}</span>
                <span className="text-[13.5px] text-white/75">{w.c}</span>
              </span>
            </Go>
          ))}
          <Go
            to="realisations"
            className="group relative block aspect-[4/3] overflow-hidden text-left"
          >
            <Photo
              src="fac-couleurs"
              alt="Façades colorées"
              sizes="400px"
              className="transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Go>
          <Go
            to="nuancier"
            className="flex aspect-[4/3] flex-col justify-between bg-(--terre) p-6 text-left text-white"
          >
            <span className="text-[21px] leading-tight font-bold tracking-[-0.02em]">
              Hésitez entre deux teintes ? Testez-les sur trois enduits.
            </span>
            <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
              Ouvrir le nuancier <ArrowRight className="size-4" />
            </span>
          </Go>
        </div>
      </section>

      {/* Avis */}
      <section className={cn("border-t border-black/10 py-16 @min-[900px]:py-24", pad)}>
        <div className="grid gap-10 @min-[900px]:grid-cols-[280px_1fr] @min-[900px]:gap-16">
          <div>
            <p className="flex items-center gap-2 text-[15px] text-black/60">
              <GoogleG className="size-5" /> Avis Google
            </p>
            <p className="mt-4 text-[80px] leading-none font-extrabold tracking-[-0.06em]">4,8</p>
            <Stars className="mt-3 text-[20px]" />
            <p className="mt-3 text-[15px] text-black/55">Moyenne de 94 avis</p>
          </div>
          <div className="grid gap-8 @min-[900px]:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.n} className="border-t-[3px] border-(--terre) pt-5">
                <Stars className="text-[14px]" />
                <blockquote className="mt-3 text-[15.5px] leading-relaxed">{r.t}</blockquote>
                <figcaption className="mt-4 text-[14px] text-black/55">
                  <b className="text-(--ink-text)">{r.n}</b>, {r.c}, {r.when}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Zone + appel */}
      <section
        className={cn(
          "grid gap-10 bg-(--pierre) py-16 @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:items-center @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <H2>Hagondange, Metz, Thionville et 25 km autour.</H2>
          <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-black/62">
            {towns.join(", ")} et alentours. Visite de façade gratuite, devis détaillé en six jours.
          </p>
        </div>
        <div className="flex flex-col gap-3 @min-[900px]:items-end">
          <p className="text-[34px] font-bold tracking-[-0.03em]">{PHONE}</p>
          <Go to="devis" className={btnDark}>
            Demander une visite de façade
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </div>
  );
}

/* ------------------------------------------------------------- Ravalement */

function Ravalement() {
  return (
    <>
      <PageTitle
        crumb="Ravalement"
        title="Le ravalement, ce que comprend le prix"
        intro="Un ravalement ne se résume pas à une couche de peinture. Voici ce que nous faisons, et ce que coûte chaque poste."
      />
      <section
        className={cn(
          "grid gap-12 bg-(--chaux) py-14 @min-[900px]:grid-cols-[1.3fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="divide-y divide-black/10 border-y border-black/10">
          {[
            [
              "Diagnostic de façade",
              "Relevé des fissures, des décollements et de l'humidité, avec photos. Offert avec la visite.",
            ],
            [
              "Nettoyage",
              "Basse pression ou hydrogommage pour la pierre, traitement anti-mousse si besoin.",
            ],
            [
              "Réparations",
              "Fissures ouvertes et rebouchées, éclats de béton repris, appuis de fenêtre refaits.",
            ],
            [
              "Finition",
              "Peinture minérale, enduit à la chaux ou imperméabilisation, dans la teinte choisie.",
            ],
            [
              "Démarches",
              "Déclaration préalable en mairie si votre commune la demande, occupation du trottoir.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="grid gap-2 py-6 @min-[900px]:grid-cols-[220px_1fr] @min-[900px]:gap-6"
            >
              <p className="text-[17px] font-semibold">{t}</p>
              <p className="text-[15.5px] leading-relaxed text-black/60">{d}</p>
            </div>
          ))}
        </div>
        <aside>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Photo src="fac-porte-bleue" alt="Enduit à la chaux et porte bleue" sizes="480px" />
          </div>
          <h2 className="mt-8 text-[22px] font-bold tracking-[-0.02em]">Prix indicatifs au m²</h2>
          <table className="mt-4 w-full text-[15px]">
            <tbody>
              {[
                ["Nettoyage et anti-mousse", "15 à 25 €"],
                ["Peinture minérale", "45 à 70 €"],
                ["Enduit à la chaux", "60 à 95 €"],
                ["Isolation par l'extérieur", "140 à 200 €"],
              ].map(([t, p]) => (
                <tr key={t} className="border-b border-black/10">
                  <td className="py-3">{t}</td>
                  <td className="py-3 text-right font-semibold whitespace-nowrap">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[13.5px] text-black/50">
            TTC, échafaudage compris. Le prix exact vient après la visite.
          </p>
          <Go to="devis" className={cn(btnDark, "mt-6")}>
            Estimer ma façade
          </Go>
        </aside>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------- Isolation (ITE) */

function Isolation() {
  return (
    <>
      <PageTitle
        crumb="Isolation par l'extérieur"
        title="Isoler par l'extérieur, et refaire la façade au passage"
        intro="Un isolant posé sur les murs, puis un enduit neuf : la maison garde sa chaleur, sans perdre un mètre carré à l'intérieur."
      />
      <section className={cn("bg-(--chaux) py-14 @min-[900px]:py-20", pad)}>
        <div className="grid gap-12 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:items-center @min-[900px]:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Photo
              src="fac-ite"
              alt="Façade en cours d'isolation par l'extérieur"
              sizes="(min-width: 1024px) 600px, 100vw"
            />
          </div>
          <ol className="space-y-6">
            {[
              [
                "Isolant collé et chevillé",
                "Polystyrène, laine de roche ou fibre de bois, de 12 à 20 cm selon le mur.",
              ],
              [
                "Treillis et sous-enduit",
                "Une armature noyée dans la première couche évite les fissures.",
              ],
              ["Enduit de finition", "Gratté ou taloché, dans la teinte du nuancier."],
              [
                "Détails soignés",
                "Appuis de fenêtre, angles et bas de mur protégés contre les chocs et l'eau.",
              ],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[40px_1fr] gap-4">
                <span className="grid size-9 place-items-center bg-(--anthra) text-[15px] font-bold text-white">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[18px] font-semibold">{t}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-black/60">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-14 grid gap-6 border-t border-black/10 pt-10 @min-[900px]:grid-cols-[1fr_1.4fr]">
          <H2 className="@min-[900px]:text-[34px]">Les aides, sans promesse de montant</H2>
          <div className="space-y-4 text-[15.5px] leading-relaxed text-black/65">
            <p>
              L&apos;isolation des murs par l&apos;extérieur peut ouvrir droit à MaPrimeRénov&apos;,
              aux primes énergie et à l&apos;éco-prêt à taux zéro, sous conditions de ressources et
              de logement, et seulement si l&apos;entreprise est RGE.
            </p>
            <p>
              Le montant dépend de votre situation : nous vous orientons vers un conseiller France
              Rénov&apos;, gratuit, et l&apos;aide figure noir sur blanc dans le devis.
            </p>
            <Go to="devis" className={cn(btnDark, "mt-2")}>
              Demander une visite
            </Go>
          </div>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Nuancier */

function Nuancier() {
  const { param } = useSite();
  const [tint, setTint] = useState(tints.find((t) => t.id === param) ?? tints[1]);
  const [finish, setFinish] = useState<(typeof finishes)[number]["id"]>("gratte");
  const f = finishes.find((x) => x.id === finish) ?? finishes[0];
  return (
    <>
      <PageTitle
        crumb="Nuancier"
        title="Choisissez la teinte et la finition de votre enduit"
        intro="Une première idée à l'écran ; la teinte définitive se choisit sur des échantillons posés sur votre façade."
      />
      <section
        className={cn(
          "grid gap-12 bg-(--chaux) py-14 @min-[900px]:grid-cols-[1.1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        {/* Texture réelle d'enduit, teintée par fusion « multiply » */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden ring-1 ring-black/10">
            <Photo
              key={f.src}
              src={f.src}
              alt={`Enduit ${f.t.toLowerCase()}`}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="grayscale"
            />
            <span
              className="absolute inset-0 mix-blend-multiply transition-colors duration-300"
              style={{ backgroundColor: tint.hex }}
            />
            <span className="absolute bottom-0 left-0 bg-(--chaux) px-4 py-2.5 text-[14px]">
              <b>{tint.n}</b>, enduit {f.t.toLowerCase()}
            </span>
          </div>
          <p className="mt-3 text-[13px] text-black/50">
            Rendu indicatif : l&apos;écran ne remplace pas un échantillon à la lumière du jour.
          </p>
        </div>
        <div>
          <p className="text-[15px] font-semibold">Teinte</p>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {tints.map((t) => (
              <Swatch key={t.id} tint={t} active={t.id === tint.id} onClick={() => setTint(t)} />
            ))}
          </div>
          <p className="mt-8 text-[15px] font-semibold">Finition</p>
          <Pick
            options={finishes.map((x) => x.id)}
            value={finish}
            onChange={setFinish}
            className="mt-3"
            itemClassName={cn(chip, "capitalize")}
          />
          <p className="mt-3 text-[15px] text-black/60">{f.d}</p>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-black/10 pt-8">
            <Go to="devis" param={tint.id} className={btnDark}>
              Recevoir des échantillons
            </Go>
            <Go to="realisations" className={btnLine}>
              Voir des façades
            </Go>
          </div>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------------- Réalisations */

const kinds = ["Tout", "Ravalement", "Isolation", "Enduit"] as const;

function Realisations() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("Tout");
  const [zoom, setZoom] = useState<number | null>(null);
  const shown = works.filter((w) => kind === "Tout" || w.k === kind);
  const z = zoom === null ? null : shown[zoom];
  return (
    <>
      <PageTitle
        crumb="Réalisations"
        title="Nos dernières façades"
        intro="Ravalements, isolations par l'extérieur et enduits, photographiés en fin de chantier."
      />
      <section className={cn("bg-(--chaux) py-12 @min-[900px]:py-16", pad)}>
        <Pick
          options={kinds}
          value={kind}
          onChange={(k) => {
            setKind(k);
            setZoom(null);
          }}
          itemClassName={chip}
        />
        <div className="mt-8 grid gap-6 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3">
          {shown.map((w, i) => (
            <button
              key={w.src}
              type="button"
              onClick={() => setZoom(i)}
              className="group text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Photo
                  src={w.src}
                  alt={w.t}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-3 block text-[17px] font-semibold">{w.t}</span>
              <span className="block text-[14px] text-black/55">
                {w.c}, {w.d.toLowerCase()}
              </span>
            </button>
          ))}
        </div>
      </section>
      {z && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-black/80 p-6"
          onClick={() => setZoom(null)}
        >
          <div className="relative h-[70%] w-full max-w-[900px] overflow-hidden">
            <Photo src={z.src} alt={z.t} sizes="900px" />
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

/* ------------------------------------------------------------------ Devis */

const services = [
  { id: "nettoyage", t: "Nettoyage", low: 15, high: 25, days: 0.12 },
  { id: "peinture", t: "Peinture minérale", low: 45, high: 70, days: 0.2 },
  { id: "enduit", t: "Enduit à la chaux", low: 60, high: 95, days: 0.3 },
  { id: "ite", t: "Isolation extérieure", low: 140, high: 200, days: 0.45 },
] as const;
const states = ["Bon état", "Quelques fissures", "Très abîmée"] as const;

function Devis() {
  const { param } = useSite();
  const [service, setService] = useState<(typeof services)[number]["id"]>("enduit");
  const [state, setState] = useState<(typeof states)[number]>("Quelques fissures");
  const [perimeter, setPerimeter] = useState(36);
  const [height, setHeight] = useState(6);
  const s = services.find((x) => x.id === service) ?? services[2];
  const area = Math.round(perimeter * height * 0.85); // ouvertures déduites
  const k = state === "Bon état" ? 1 : state === "Quelques fissures" ? 1.12 : 1.3;
  const round = (n: number) => (Math.round(n / 100) * 100).toLocaleString("fr-FR");
  const weeks = Math.max(1, Math.round((area * s.days) / 5 + (state === "Très abîmée" ? 1 : 0)));
  const tint = tints.find((t) => t.id === param);
  return (
    <>
      <PageTitle
        crumb="Devis"
        title="Combien coûte votre façade ?"
        intro="Quatre réglages pour une première fourchette. La visite de façade est gratuite, le devis détaillé arrive six jours après."
      />
      <section
        className={cn(
          "grid gap-12 bg-(--chaux) py-14 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="space-y-8">
          <div>
            <p className="text-[15px] font-semibold">Travaux</p>
            <Pick
              options={services.map((x) => x.t)}
              value={s.t}
              onChange={(t) => setService(services.find((x) => x.t === t)!.id)}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold">État de la façade</p>
            <Pick
              options={states}
              value={state}
              onChange={setState}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              Tour de la maison <span className="text-(--terre-t)">{perimeter} m</span>
            </span>
            <input
              type="range"
              min={12}
              max={90}
              value={perimeter}
              onChange={(e) => setPerimeter(Number(e.target.value))}
              className="mt-4 w-full accent-(--terre)"
            />
          </label>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              Hauteur des murs <span className="text-(--terre-t)">{height} m</span>
            </span>
            <input
              type="range"
              min={3}
              max={14}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-4 w-full accent-(--terre)"
            />
          </label>
          <div className="border-t border-black/10 pt-8">
            <p className="text-[15px] text-black/55">
              Environ {area} m² de façade, ouvertures déduites
            </p>
            <p className="mt-2 text-[44px] leading-none font-extrabold tracking-[-0.045em]">
              {round(area * s.low * k)} – {round(area * s.high * k)} €
            </p>
            <p className="mt-3 text-[15px] text-black/55">
              TTC, échafaudage compris. Environ {weeks} semaine{weeks > 1 ? "s" : ""} de chantier.
              {service === "ite" && " Aides possibles sous conditions, voir la page Isolation."}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 ring-1 ring-black/8 @min-[900px]:p-8">
          <p className="text-[22px] font-bold tracking-[-0.02em]">Demander une visite de façade</p>
          {tint && (
            <p className="mt-2 flex items-center gap-2 text-[14px] text-black/60">
              <span className="size-4 ring-1 ring-black/15" style={{ backgroundColor: tint.hex }} />
              Teinte choisie : {tint.n}
            </p>
          )}
          <DemoForm
            className="mt-6"
            success={{
              title: "Demande envoyée",
              text: `${s.t}, environ ${area} m² : nous vous appelons sous 48 h pour fixer la visite de façade.`,
            }}
            submit="Demander la visite"
            submitClassName={cn(btnDark, "mt-6 w-full")}
          >
            <div className="grid gap-4 @min-[600px]:grid-cols-2">
              {[
                ["Nom", "text", "Votre nom"],
                ["Téléphone", "tel", "06 00 00 00 00"],
                ["Commune", "text", "Hagondange"],
                ["E-mail", "email", "vous@exemple.fr"],
              ].map(([l, t, ph]) => (
                <label key={l} className="block">
                  <span className="text-[14px] font-medium text-black/70">{l}</span>
                  <input
                    type={t}
                    placeholder={ph}
                    className="mt-2 h-12 w-full bg-(--chaux) px-4 text-[16px] ring-1 ring-black/10 outline-none ring-inset focus:ring-2 focus:ring-(--terre)"
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="text-[14px] font-medium text-black/70">Votre projet</span>
              <textarea
                rows={3}
                placeholder="Façade avant et pignon, enduit qui s'effrite…"
                className="mt-2 w-full resize-none bg-(--chaux) px-4 py-3 text-[16px] ring-1 ring-black/10 outline-none ring-inset focus:ring-2 focus:ring-(--terre)"
              />
            </label>
          </DemoForm>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------------------------------------------------- Mentions et crédits */

function Mentions() {
  return (
    <>
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Façades Linéa est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits ; les teintes du nuancier sont inventées."
      />
      <section className={cn("bg-(--chaux) py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits
          photos={[
            ...new Set([...works.map((w) => w.src), "fac-couleurs", ...finishes.map((f) => f.src)]),
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
          id: "ravalement",
          label: "Ravalement",
          path: "/ravalement",
          render: () => <Ravalement />,
        },
        {
          id: "isolation",
          label: "Isolation extérieure",
          path: "/isolation-exterieure",
          render: () => <Isolation />,
        },
        { id: "nuancier", label: "Nuancier", path: "/nuancier", render: () => <Nuancier /> },
        {
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        { id: "devis", label: "Devis", path: "/devis", render: () => <Devis /> },
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
