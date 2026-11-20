"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Familjen_Grotesk } from "next/font/google";
import { ArrowRight, Check, Phone, Upload, X } from "lucide-react";
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
 * Atelier Gypse, plâtrier-plaquiste à Sarreguemines (entreprise fictive).
 * Le plâtre ne se voit plus une fois peint : le site montre le travail avant
 * la peinture, parle aux particuliers comme aux professionnels, et transforme
 * une surface en devis. Blanc plâtre, graphite, et le bleu du cordeau à tracer.
 */

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 62 41";

const vars = {
  "--platre": "#f6f5f1",
  "--gypse": "#e4e1da",
  "--graphite": "#24272b",
  "--cordeau": "#2c55c9",
  "--ink-text": "#1f2226",
  fontFamily: familjen.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";

/* ---------------------------------------------------------------- Données */

type Work = { src: string; t: string; c: string; k: Kind; d: string };
type Kind = "Cloisons" | "Plafonds" | "Combles" | "Décor";

const works: Work[] = [
  {
    src: "pla-hero",
    t: "Chambre voûtée, enduit lissé",
    c: "Sarreguemines",
    k: "Décor",
    d: "38 m², 2 semaines",
  },
  {
    src: "pla-voute",
    t: "Couloir voûté en plaques cintrées",
    c: "Bitche",
    k: "Plafonds",
    d: "22 m², 9 jours",
  },
  { src: "pla-arche", t: "Enfilade d'arches", c: "Forbach", k: "Décor", d: "6 arches, 8 jours" },
  {
    src: "pla-niche",
    t: "Niche et étagères dans le doublage",
    c: "Puttelange",
    k: "Cloisons",
    d: "1 journée",
  },
  {
    src: "pla-salon",
    t: "Séjour redistribué, cloisons acoustiques",
    c: "Sarralbe",
    k: "Cloisons",
    d: "64 m², 6 jours",
  },
  {
    src: "pla-plaque",
    t: "Combles en deux chambres, avant peinture",
    c: "Rohrbach-lès-Bitche",
    k: "Combles",
    d: "46 m², 12 jours",
  },
  {
    src: "pla-bandes",
    t: "Plateau de bureaux, avant peinture",
    c: "Sarreguemines",
    k: "Plafonds",
    d: "420 m², 4 semaines",
  },
];

const services = [
  {
    t: "Cloisons et doublages",
    d: "Plaques sur ossature, cloisons acoustiques, doublages isolants.",
    delay: "dès 3 semaines",
  },
  {
    t: "Faux plafonds",
    d: "Plafonds suspendus, coupe-feu, acoustiques ou cintrés.",
    delay: "dès 3 semaines",
  },
  {
    t: "Aménagement de combles",
    d: "Rampants isolés, cloisons, trappes et habillages de fenêtres de toit.",
    delay: "dès 4 semaines",
  },
  {
    t: "Enduits et décors",
    d: "Arches, niches, voûtes et enduits lissés prêts à peindre.",
    delay: "sur rendez-vous",
  },
];

const reviews = [
  {
    n: "Claire",
    c: "Sarreguemines",
    t: "Combles aménagés en deux chambres. Les angles sont parfaits, le peintre nous a dit qu'il n'avait presque rien à reprendre.",
    s: 5,
  },
  {
    n: "Julien",
    c: "Forbach",
    t: "Devis reçu en trois jours à partir de mes plans, chantier tenu dans les dates annoncées.",
    s: 5,
  },
  {
    n: "Isabelle",
    c: "Bitche",
    t: "Plafond cintré dans le couloir, un vrai travail de précision. Chantier bâché et aspiré.",
    s: 5,
  },
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-[16px] font-semibold transition-colors";
const btnDark = cn(btn, "bg-(--graphite) text-white hover:bg-black");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--graphite)/25 hover:ring-(--graphite)");

/** Trait de cordeau : la ligne bleue que le plaquiste claque au sol avant de poser. */
function Cordeau({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative block h-px bg-(--cordeau)", className)}>
      <span className="absolute -top-[5px] left-0 h-[11px] w-px bg-(--cordeau)" />
      <span className="absolute -top-[5px] right-0 h-[11px] w-px bg-(--cordeau)" />
    </span>
  );
}

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[32px] leading-[1.05] font-semibold tracking-[-0.03em] text-balance @min-[900px]:text-[48px]",
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
    <header className="sticky top-0 z-30 bg-(--platre)/95 backdrop-blur">
      <div className={cn("flex h-18 items-center gap-8 border-b border-(--graphite)/10", pad)}>
        <Go
          to="home"
          className="flex items-baseline gap-2.5 text-left"
          label="Atelier Gypse, accueil"
        >
          <span className="text-[22px] font-bold tracking-[-0.03em]">Atelier Gypse</span>
          <span className="hidden text-[13px] text-black/50 @min-[600px]:inline">
            Plâtrerie et plaques, Sarreguemines
          </span>
        </Go>
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="text-[15px] text-black/60 hover:text-black aria-[current=page]:text-black aria-[current=page]:underline aria-[current=page]:decoration-(--cordeau) aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <Go
          to="devis"
          className={cn(
            btnDark,
            "ml-auto hidden h-11 px-5 text-[15px] @min-[900px]:inline-flex @min-[1100px]:ml-0",
          )}
        >
          Chiffrer mon chantier
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
        <nav className="border-b border-black/8 px-5 pb-4 @min-[1100px]:hidden">
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
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/8 bg-(--platre) p-3 @min-[900px]:hidden">
      <Go to="contact" className={cn(btnLine, "h-12 px-3 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="devis" className={cn(btnDark, "h-12 px-3 text-[15px]")}>
        Chiffrer
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--graphite) text-white/65">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <p className="text-[22px] font-bold tracking-[-0.03em] text-white">Atelier Gypse</p>
          <Cordeau className="mt-4 w-24" />
          <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed">
            Cloisons, plafonds, combles et enduits pour les particuliers et les professionnels de
            Moselle-Est, depuis 2009.
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
          <p className="font-semibold text-white">Garanties</p>
          <p className="mt-3">
            Assurance décennale
            <br />
            Qualibat plâtrerie et isolation
            <br />
            Attestations sur demande
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-semibold text-white">{PHONE}</p>
          <p className="mt-1">contact@atelier-gypse-exemple.fr</p>
          <p className="mt-1">Lundi au vendredi, 7 h 30 – 17 h 30</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Atelier Gypse</span>
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
    <div className={cn("pt-12 pb-12 @min-[900px]:pt-16 @min-[900px]:pb-16", pad)}>
      <p className="text-[14px] text-black/50">
        <Go to="home" className="hover:text-black">
          Accueil
        </Go>{" "}
        / <span className="text-black/75">{crumb}</span>
      </p>
      <h1 className="mt-5 max-w-[820px] text-[38px] leading-[1.02] font-semibold tracking-[-0.04em] text-balance @min-[900px]:text-[60px]">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-black/60">{intro}</p>
      )}
      <Cordeau className="mt-10" />
    </div>
  );
}

/** Cote d'architecte posée sur une photo. */
function Cote({
  label,
  vertical = false,
  className,
}: {
  label: string;
  vertical?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute flex items-center text-[12px] font-semibold text-white",
        vertical ? "flex-col" : "",
        className,
      )}
    >
      <span className={cn("bg-white/80", vertical ? "w-px flex-1" : "h-px flex-1")} />
      <span
        className={cn("rounded-sm bg-(--cordeau) px-1.5 py-0.5", vertical ? "my-1.5" : "mx-1.5")}
      >
        {label}
      </span>
      <span className={cn("bg-white/80", vertical ? "w-px flex-1" : "h-px flex-1")} />
    </span>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      {/* Premier écran : le titre, le trait de cordeau, la pièce cotée */}
      <section className={cn("bg-(--platre) pt-12 @min-[900px]:pt-16", pad)}>
        <div className="grid gap-8 @min-[900px]:grid-cols-[1fr_320px] @min-[900px]:items-end">
          <h1 className="text-[42px] leading-[0.98] font-semibold tracking-[-0.045em] text-balance @min-[900px]:text-[76px]">
            Des murs droits, des plafonds nets, des angles vifs.
          </h1>
          <div className="pb-2">
            <p className="text-[16px] leading-relaxed text-black/62">
              Plâtrerie, cloisons et faux plafonds à Sarreguemines, pour les particuliers et les
              professionnels du bâtiment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Go to="devis" className={btnDark}>
                Chiffrer mon chantier
              </Go>
            </div>
          </div>
        </div>
        <Cordeau className="mt-10 @min-[900px]:mt-12" />
        <div className="relative mt-8 h-[300px] overflow-hidden rounded-t-[4px] @min-[900px]:h-[440px]">
          <Photo
            src="pla-hero"
            alt="Chambre aux murs enduits, voûte et niche"
            priority
            sizes="(min-width: 1024px) 1150px, 100vw"
            position="50% 60%"
          />
          <Cote label="4,20 m" className="top-5 right-[8%] left-[8%] hidden @min-[900px]:flex" />
          <Cote
            label="2,50 m"
            vertical
            className="top-[14%] bottom-[10%] left-6 hidden @min-[900px]:flex"
          />
          <p className="absolute right-5 bottom-5 rounded-full bg-white/90 px-4 py-2 text-[13.5px]">
            Chambre voûtée, Sarreguemines
          </p>
        </div>
      </section>

      {/* Repères */}
      <section
        className={cn(
          "grid grid-cols-2 gap-y-6 border-b border-black/8 bg-white py-8 @min-[900px]:grid-cols-4",
          pad,
        )}
      >
        {[
          ["Démarrage", "sous 3 à 4 semaines"],
          ["Devis", "en 72 h sur plans"],
          ["Garantie", "décennale, attestations fournies"],
          ["Avis Google", "4,9 sur 5, 58 avis"],
        ].map(([t, d]) => (
          <div key={t} className="pr-4">
            <p className="text-[16px] font-semibold">{t}</p>
            <p className="mt-1 text-[14px] text-black/55">{d}</p>
          </div>
        ))}
      </section>

      {/* Avant la peinture */}
      <section
        className={cn(
          "grid gap-10 bg-white py-16 @min-[900px]:grid-cols-[1fr_1.1fr] @min-[900px]:items-center @min-[900px]:gap-16 @min-[900px]:py-24",
          pad,
        )}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 h-[220px] overflow-hidden rounded-[4px] @min-[900px]:h-[260px]">
            <Photo src="pla-bandes" alt="Plaques jointoyées avant peinture" sizes="560px" />
          </div>
          <div className="relative h-[160px] overflow-hidden rounded-[4px] @min-[900px]:h-[200px]">
            <Photo src="pla-enduit" alt="Enduit appliqué au couteau" sizes="280px" />
          </div>
          <div className="relative h-[160px] overflow-hidden rounded-[4px] @min-[900px]:h-[200px]">
            <Photo src="pla-ossature" alt="Ossature métallique de cloisons" sizes="280px" />
          </div>
        </div>
        <div>
          <H2>Ce que vous ne verrez plus une fois la peinture posée.</H2>
          <p className="mt-5 text-[17px] leading-relaxed text-black/62">
            Une cloison réussie se joue avant la peinture : ossature d&apos;aplomb, joints repris en
            trois passes, angles protégés. On vous montre chaque étape en photo.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Ossature contrôlée au niveau laser avant fermeture",
              "Joints et angles poncés, vérifiés à la lampe rasante",
              "Photos avant fermeture des cloisons, pour vos réseaux",
              "Chantier bâché, aspiré, gravats évacués",
            ].map((l) => (
              <li key={l} className="flex gap-3 text-[16px]">
                <Check className="mt-0.5 size-5 shrink-0 text-(--cordeau)" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prestations */}
      <section className={cn("bg-(--platre) py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[640px]">Ce que nous posons</H2>
        <div className="mt-10 border-t border-black/12">
          {services.map((s) => (
            <Go
              key={s.t}
              to="prestations"
              className="group grid w-full gap-1 border-b border-black/12 py-6 text-left @min-[900px]:grid-cols-[1fr_1.4fr_180px_24px] @min-[900px]:items-center @min-[900px]:gap-8"
            >
              <span className="text-[22px] font-semibold tracking-[-0.02em]">{s.t}</span>
              <span className="text-[15.5px] text-black/60">{s.d}</span>
              <span className="text-[14px] text-black/50">Démarrage {s.delay}</span>
              <ArrowRight className="hidden size-5 text-black/30 transition-transform group-hover:translate-x-1 group-hover:text-(--cordeau) @min-[900px]:block" />
            </Go>
          ))}
        </div>
      </section>

      {/* Réalisations */}
      <section className={cn("bg-white py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2>Chantiers récents</H2>
          <Go
            to="realisations"
            className="inline-flex items-center gap-2 text-[15px] font-semibold underline-offset-4 hover:underline"
          >
            Toutes les réalisations <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="mt-10 grid gap-6 @min-[900px]:grid-cols-[1.3fr_1fr_1fr]">
          {[works[1], works[2], works[3]].map((w, i) => (
            <figure key={w.src}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-[4px]",
                  i === 0 ? "h-[300px] @min-[900px]:h-[420px]" : "h-[240px] @min-[900px]:h-[420px]",
                )}
              >
                <Photo src={w.src} alt={w.t} sizes="(min-width: 1024px) 480px, 100vw" />
              </div>
              <figcaption className="mt-3 text-[16px] font-semibold">
                {w.t}
                <span className="block text-[14px] font-normal text-black/55">
                  {w.c}, {w.d}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Professionnels */}
      <section
        className={cn(
          "grid gap-10 bg-(--graphite) py-16 text-white @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <H2>Maîtres d&apos;œuvre et entreprises générales</H2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-white/65">
            Nous intervenons en sous-traitance sur vos chantiers de logements, bureaux et commerces,
            avec nos équipes et notre matériel.
          </p>
          <Go to="pros" className={cn(btn, "mt-8 bg-white text-(--graphite) hover:bg-white/90")}>
            Travailler avec nous
          </Go>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-7 self-center">
          {[
            ["4 équipes", "de 2 à 3 compagnons"],
            ["2 500 m²", "de plaques posées par mois"],
            ["Documents", "Kbis, décennale, URSSAF à jour"],
            ["Planning", "tenu et partagé chaque semaine"],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-white/20 pt-4">
              <dt className="text-[22px] font-semibold">{t}</dt>
              <dd className="mt-1 text-[14px] text-white/60">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Avis */}
      <section className={cn("bg-white py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-center gap-3 text-[15px] text-black/60">
          <GoogleG className="size-5" />
          <b className="text-[18px] text-(--ink-text)">4,9</b>
          <Stars className="text-[15px]" />
          <span>58 avis Google</span>
        </div>
        <div className="mt-8 grid gap-10 @min-[900px]:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.n}>
              <blockquote className="text-[19px] leading-snug tracking-[-0.01em]">
                « {r.t} »
              </blockquote>
              <figcaption className="mt-4 text-[14px] text-black/55">
                {r.n}, {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={cn("bg-(--platre) py-16 text-center @min-[900px]:py-20", pad)}>
        <H2 className="mx-auto max-w-[720px]">Envoyez vos plans, recevez un devis en 72 heures.</H2>
        <p className="mx-auto mt-4 max-w-[520px] text-[16px] text-black/60">
          Sarreguemines, Forbach, Bitche, Sarralbe et toute la Moselle-Est.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Go to="devis" className={btnDark}>
            Chiffrer mon chantier
          </Go>
          <Go to="contact" className={btnLine}>
            <Phone className="size-4" /> {PHONE}
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------ Prestations */

function Prestations() {
  const details = [
    {
      ...services[0],
      src: "pla-salon",
      items: [
        "Cloisons 72/48 et 98/48",
        "Cloisons acoustiques et hydrofuges",
        "Doublages collés ou sur ossature",
        "Niches, rangements intégrés",
      ],
    },
    {
      ...services[1],
      src: "pla-voute",
      items: [
        "Plafonds suspendus et sous rampants",
        "Plaques coupe-feu et acoustiques",
        "Plafonds cintrés et voûtes",
        "Trappes de visite et spots prévus",
      ],
    },
    {
      ...services[2],
      src: "pla-bandes",
      items: [
        "Isolation des rampants et pare-vapeur",
        "Cloisons et portes de placards",
        "Habillage des fenêtres de toit",
        "Coordination avec électricien et plombier",
      ],
    },
    {
      ...services[3],
      src: "pla-arche",
      items: [
        "Arches et passages cintrés",
        "Niches décoratives",
        "Enduits lissés prêts à peindre",
        "Reprise de plâtre ancien",
      ],
    },
  ];
  return (
    <>
      <PageTitle
        crumb="Prestations"
        title="Quatre métiers du plâtre, une seule équipe"
        intro="Tout est fait par nos compagnons salariés, de l'ossature au ponçage. Nous ne sous-traitons pas."
      />
      <section className={cn("space-y-16 pb-20", pad)}>
        {details.map((s, i) => (
          <div
            key={s.t}
            className="grid gap-8 @min-[900px]:grid-cols-2 @min-[900px]:items-center @min-[900px]:gap-14"
          >
            <div
              className={cn(
                "relative h-[260px] overflow-hidden rounded-[4px] @min-[900px]:h-[380px]",
                i % 2 === 1 && "@min-[900px]:order-last",
              )}
            >
              <Photo src={s.src} alt={s.t} sizes="(min-width: 1024px) 560px, 100vw" />
            </div>
            <div>
              <h2 className="text-[30px] font-semibold tracking-[-0.03em] @min-[900px]:text-[36px]">
                {s.t}
              </h2>
              <p className="mt-3 text-[16.5px] leading-relaxed text-black/60">{s.d}</p>
              <ul className="mt-6 divide-y divide-black/8 border-y border-black/8">
                {s.items.map((it) => (
                  <li key={it} className="py-3 text-[15.5px]">
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-black/50">Démarrage {s.delay}</p>
            </div>
          </div>
        ))}
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------------- Réalisations */

const kinds = ["Tout", "Cloisons", "Plafonds", "Combles", "Décor"] as const;

function Realisations() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("Tout");
  const [zoom, setZoom] = useState<Work | null>(null);
  const shown = works.filter((w) => kind === "Tout" || w.k === kind);
  return (
    <>
      <PageTitle
        crumb="Réalisations"
        title="Avant et après la peinture"
        intro="Nos chantiers photographiés à la fin de la pose, puis une fois peints quand le client nous envoie la photo."
      />
      <section className={cn("pb-20", pad)}>
        <Pick
          options={kinds}
          value={kind}
          onChange={setKind}
          itemClassName="h-10 rounded-full px-4 text-[14.5px] ring-1 ring-inset ring-black/15 aria-pressed:bg-(--graphite) aria-pressed:text-white aria-pressed:ring-(--graphite)"
        />
        {shown.length === 0 ? (
          <p className="mt-10 text-[16px] text-black/55">
            Pas encore de photos dans cette catégorie. Demandez-nous des références de combles :
            nous vous mettons en contact avec d&apos;anciens clients.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3">
            {shown.map((w) => (
              <button
                key={w.src}
                type="button"
                onClick={() => setZoom(w)}
                className="group text-left"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-[4px]">
                  <Photo
                    src={w.src}
                    alt={w.t}
                    sizes="(min-width: 1024px) 380px, 100vw"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-3 block text-[17px] font-semibold">{w.t}</span>
                <span className="block text-[14px] text-black/55">
                  {w.c}, {w.d}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
      {zoom && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-black/85 p-6"
          onClick={() => setZoom(null)}
        >
          <div className="relative h-[75%] w-full max-w-[900px] overflow-hidden rounded-[4px]">
            <Photo src={zoom.src} alt={zoom.t} sizes="900px" className="object-contain" />
          </div>
          <p className="mt-3 text-[15px] text-white">
            {zoom.t}, {zoom.c}
          </p>
        </div>
      )}
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------------------------------------------------------- Professionnels */

function Pros() {
  return (
    <>
      <PageTitle
        crumb="Professionnels"
        title="Un plaquiste qui tient votre planning"
        intro="Pour les maîtres d'œuvre, architectes, promoteurs et entreprises générales de Moselle-Est et de Sarre."
      />
      <section
        className={cn(
          "grid gap-12 pb-20 @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:gap-20",
          pad,
        )}
      >
        <div className="space-y-10">
          {[
            [
              "Consultation",
              "Envoyez le DCE ou les plans : chiffrage poste par poste sous 5 jours ouvrés, variantes acoustiques et coupe-feu si besoin.",
            ],
            [
              "Préparation",
              "Réunion de démarrage, carnet de détails, approvisionnement planifié. Un chef d'équipe unique sur le chantier.",
            ],
            [
              "Exécution",
              "Compte rendu photo chaque vendredi, avec l'avancement par zone. Autocontrôles avant fermeture des cloisons.",
            ],
            [
              "Réception",
              "Levée des réserves sous 8 jours. Dossier des ouvrages exécutés et fiches techniques fournis.",
            ],
          ].map(([t, d], i) => (
            <div key={t} className="grid grid-cols-[48px_1fr] gap-4">
              <span className="text-[34px] leading-none font-semibold text-(--cordeau)">
                {i + 1}
              </span>
              <div>
                <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t}</h2>
                <p className="mt-2 text-[16px] leading-relaxed text-black/60">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <aside className="self-start rounded-[4px] bg-(--platre) p-7">
          <h2 className="text-[20px] font-semibold">Documents disponibles</h2>
          <ul className="mt-5 space-y-3 text-[15.5px]">
            {[
              "Extrait Kbis de moins de 3 mois",
              "Attestation d'assurance décennale",
              "Attestation de vigilance URSSAF",
              "Qualification Qualibat",
              "Références de chantiers similaires",
            ].map((d) => (
              <li key={d} className="flex gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-(--cordeau)" />
                {d}
              </li>
            ))}
          </ul>
          <Go to="contact" param="pro" className={cn(btnDark, "mt-8 w-full")}>
            Nous consulter
          </Go>
        </aside>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------------ Devis */

const works2 = ["Cloison", "Doublage isolant", "Faux plafond", "Combles"] as const;
const rates: Record<(typeof works2)[number], [number, number, number]> = {
  // € / m² bas, haut, m² posés par jour pour une équipe
  Cloison: [45, 65, 28],
  "Doublage isolant": [50, 75, 30],
  "Faux plafond": [45, 70, 22],
  Combles: [70, 110, 18],
};

function Devis() {
  const [kind, setKind] = useState<(typeof works2)[number]>("Cloison");
  const [length, setLength] = useState(8);
  const [height, setHeight] = useState(2.5);
  const surface = Math.round(length * height * 10) / 10;
  const [lo, hi, perDay] = rates[kind];
  const fmt = (n: number) => (Math.round(n / 50) * 50).toLocaleString("fr-FR");
  const plates = Math.ceil((surface * (kind === "Cloison" ? 2 : 1)) / 3);
  const days = Math.max(1, Math.ceil(surface / perDay));
  const chip =
    "h-11 rounded-full px-5 text-[15px] ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--graphite) aria-pressed:text-white aria-pressed:ring-(--graphite)";
  const field =
    "mt-2 h-12 w-full rounded-[4px] bg-white px-4 text-[16px] ring-1 ring-inset ring-black/15 outline-none focus:ring-2 focus:ring-(--cordeau)";
  return (
    <>
      <PageTitle
        crumb="Devis"
        title="Chiffrez votre chantier en une minute"
        intro="Une première fourchette tout de suite, puis le devis détaillé sous 72 heures avec vos plans."
      />
      <section
        className={cn(
          "grid gap-12 pb-20 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16",
          pad,
        )}
      >
        <div className="space-y-8">
          <div>
            <p className="text-[15px] font-semibold">Type de travaux</p>
            <Pick
              options={works2}
              value={kind}
              onChange={setKind}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              {kind === "Faux plafond" || kind === "Combles"
                ? "Longueur de la pièce"
                : "Longueur des murs"}
              <span className="text-(--cordeau)">{length} m</span>
            </span>
            <input
              type="range"
              min={2}
              max={40}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-4 w-full accent-(--cordeau)"
            />
          </label>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              {kind === "Faux plafond" || kind === "Combles"
                ? "Largeur de la pièce"
                : "Hauteur sous plafond"}
              <span className="text-(--cordeau)">{height.toLocaleString("fr-FR")} m</span>
            </span>
            <input
              type="range"
              min={2}
              max={8}
              step={0.1}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-4 w-full accent-(--cordeau)"
            />
          </label>
          <div className="rounded-[4px] bg-(--platre) p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                [`${surface.toLocaleString("fr-FR")} m²`, "à poser"],
                [`${plates}`, "plaques environ"],
                [`${days} j`, "pour une équipe"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="text-[26px] font-semibold tracking-[-0.02em]">{v}</p>
                  <p className="text-[13px] text-black/55">{l}</p>
                </div>
              ))}
            </div>
            <Cordeau className="my-6" />
            <p className="text-[14px] text-black/55">
              Fourchette indicative, fourniture et pose, HT
            </p>
            <p className="mt-1 text-[40px] leading-none font-semibold tracking-[-0.04em]">
              {fmt(surface * lo)} – {fmt(surface * hi)} €
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-[24px] font-semibold tracking-[-0.02em]">
            Recevoir le devis détaillé
          </h2>
          <DemoForm
            success={{
              title: "Demande reçue",
              text: `${kind}, ${surface.toLocaleString("fr-FR")} m² : votre devis détaillé arrive sous 72 heures.`,
            }}
            submit="Envoyer ma demande"
            submitClassName={cn(btnDark, "mt-7 w-full")}
            className="mt-6"
          >
            <div className="grid gap-5 @min-[900px]:grid-cols-2">
              <label className="block">
                <span className="text-[14px] font-medium text-black/70">Nom</span>
                <input className={field} placeholder="Votre nom" />
              </label>
              <label className="block">
                <span className="text-[14px] font-medium text-black/70">Téléphone</span>
                <input className={field} type="tel" placeholder="06 00 00 00 00" />
              </label>
              <label className="block @min-[900px]:col-span-2">
                <span className="text-[14px] font-medium text-black/70">Commune du chantier</span>
                <input className={field} placeholder="Sarreguemines" />
              </label>
            </div>
            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[4px] border border-dashed border-black/25 bg-(--platre) px-4 py-8 text-center text-[15px] text-black/60 hover:border-(--cordeau)">
              <Upload className="size-6 text-(--cordeau)" />
              Déposez vos plans ou photos (PDF, JPG)
              <input type="file" className="sr-only" multiple />
            </label>
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
  const { param } = useSite();
  const [who, setWho] = useState<"Particulier" | "Professionnel">(
    param === "pro" ? "Professionnel" : "Particulier",
  );
  const field =
    "mt-2 h-12 w-full rounded-[4px] bg-white px-4 text-[16px] ring-1 ring-inset ring-black/15 outline-none focus:ring-2 focus:ring-(--cordeau)";
  return (
    <>
      <PageTitle crumb="Contact" title="Parlons de votre chantier" />
      <section
        className={cn(
          "grid gap-12 pb-20 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20",
          pad,
        )}
      >
        <div>
          <p className="text-[15px] text-black/55">Bureau, du lundi au vendredi</p>
          <p className="mt-2 text-[38px] leading-none font-semibold tracking-[-0.03em]">{PHONE}</p>
          <dl className="mt-10 space-y-6 text-[15.5px]">
            <div>
              <dt className="font-semibold">Zone d&apos;intervention</dt>
              <dd className="mt-1 text-black/60">
                Sarreguemines, Forbach, Bitche, Sarralbe, Puttelange et Sarre voisine
              </dd>
            </div>
            <div>
              <dt className="font-semibold">E-mail</dt>
              <dd className="mt-1 text-black/60">contact@atelier-gypse-exemple.fr</dd>
            </div>
          </dl>
        </div>
        <DemoForm
          success={{ title: "Message envoyé", text: "Nous vous rappelons dans la journée ouvrée." }}
          submit="Envoyer"
          submitClassName={cn(btnDark, "mt-7 w-full")}
        >
          <Pick
            options={["Particulier", "Professionnel"] as const}
            value={who}
            onChange={setWho}
            itemClassName="h-11 rounded-full px-5 text-[15px] ring-1 ring-inset ring-black/15 aria-pressed:bg-(--graphite) aria-pressed:text-white aria-pressed:ring-(--graphite)"
          />
          <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">
                {who === "Professionnel" ? "Entreprise" : "Nom"}
              </span>
              <input className={field} />
            </label>
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Téléphone</span>
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
            <label className="block @min-[900px]:col-span-2">
              <span className="text-[14px] font-medium text-black/70">Votre projet</span>
              <textarea
                rows={4}
                className={cn(field, "h-auto resize-none py-3")}
                placeholder={
                  who === "Professionnel"
                    ? "Opération, surfaces, dates de démarrage…"
                    : "Pièces, surfaces, délais souhaités…"
                }
              />
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
        intro="Atelier Gypse est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("pb-20", pad)}>
        <PhotoCredits photos={[...works.map((w) => w.src), "pla-enduit", "pla-ossature"]} />
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
      className="bg-(--platre)"
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
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        { id: "pros", label: "Professionnels", path: "/professionnels", render: () => <Pros /> },
        { id: "devis", label: "Devis", path: "/devis", render: () => <Devis /> },
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
