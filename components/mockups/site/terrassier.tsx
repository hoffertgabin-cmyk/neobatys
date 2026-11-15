"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Anybody, Public_Sans } from "next/font/google";
import { ArrowRight, FileUp, Phone, X } from "lucide-react";
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
 * Socle TP, terrassier à Bouzonville (entreprise fictive).
 * Un site solide : la photo d'engin plein cadre et le panneau de chantier
 * au premier écran, deux publics (particuliers, professionnels), le parc
 * matériel et un calcul de volume de terre.
 * Basalte, béton, jaune engin ; une grotesque étroite et lourde.
 */

const anybody = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 74 08";

const vars = {
  "--basalte": "#1a1b1d",
  "--argile": "#2f261f",
  "--engin": "#f2b300",
  "--beton": "#ecebe6",
  "--ink-text": "#17181a",
  "--cond": anybody.style.fontFamily,
  fontFamily: publicSans.style.fontFamily,
} as CSSProperties;

/** Titres : Anybody resserrée (axe de largeur) et très grasse. */
const display = "font-(family-name:--cond) font-extrabold [font-stretch:64%] tracking-[-0.01em]";
const pad = "px-5 @min-[900px]:px-16";

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-[4px] px-6 text-[15.5px] font-bold transition-colors";
const btnYellow = cn(btn, "bg-(--engin) text-(--basalte) hover:brightness-105");
const btnDark = cn(btn, "bg-(--basalte) text-white hover:bg-black");
const btnLine = cn(
  btn,
  "ring-2 ring-inset ring-(--basalte)/80 hover:bg-(--basalte) hover:text-white",
);

/* ---------------------------------------------------------------- Données */

const services = [
  {
    id: "fouilles",
    src: "ter-terrain",
    t: "Terrassement et fouilles",
    d: "Décapage, fouilles de fondation, sous-sols, plateformes et remblais compactés.",
  },
  {
    id: "reseaux",
    src: "ter-reseau",
    t: "Réseaux et VRD",
    d: "Tranchées et raccordements eau, électricité, télécom, eaux usées et pluviales.",
  },
  {
    id: "assainissement",
    src: "ter-drain",
    t: "Assainissement non collectif",
    d: "Fosse toutes eaux, filtre à sable ou micro-station, selon l'étude de sol.",
  },
  {
    id: "acces",
    src: "ter-acces",
    t: "Accès et cours",
    d: "Empierrement, enrobé, pavés drainants, murets de soutènement.",
  },
];

const machines = [
  {
    src: "ter-jardin",
    t: "Mini-pelle 2,7 t",
    d: "Passe un portail de 1,50 m. Jardins, tranchées, terrains déjà clos.",
    spec: [
      ["Largeur", "1,50 m"],
      ["Profondeur de fouille", "2,80 m"],
    ],
  },
  {
    src: "ter-hero",
    t: "Pelle sur chenilles 21 t",
    d: "Fouilles en pleine masse, sous-sols, gros volumes.",
    spec: [
      ["Rendement", "jusqu'à 300 m³ par jour"],
      ["Profondeur de fouille", "6,50 m"],
    ],
  },
  {
    src: "ter-pneus",
    t: "Pelle sur pneus 16 t",
    d: "Se déplace sur route : réseaux en voirie, lotissements.",
    spec: [
      ["Vitesse sur route", "35 km/h"],
      ["Profondeur de fouille", "5,20 m"],
    ],
  },
  {
    src: "ter-chargeuse",
    t: "Chargeuse sur pneus",
    d: "Chargement des camions, stocks de matériaux, déneigement.",
    spec: [
      ["Godet", "2,3 m³"],
      ["Poids", "13 t"],
    ],
  },
  {
    src: "ter-bull",
    t: "Bouteur",
    d: "Nivellement et réglage des plateformes au laser.",
    spec: [
      ["Lame", "3,40 m"],
      ["Guidage", "laser rotatif"],
    ],
  },
  {
    src: "ter-aerien",
    t: "Camions 6×4 et compacteurs",
    d: "Évacuation des terres, apport de grave, compactage par couches.",
    spec: [
      ["Benne", "14 m³"],
      ["Camions", "3"],
    ],
  },
] as const;

const jobs = [
  {
    t: "Maison individuelle à Freistroff",
    who: "Particulier, avec le constructeur",
    d: "Décapage de la terre végétale, fouilles en rigole, raccordement aux réseaux et empierrement de l'accès.",
    photos: ["ter-terrain", "ter-reseau", "ter-acces"],
    facts: [
      ["Volume sorti", "420 m³"],
      ["Durée", "6 jours"],
      ["Délai de devis", "48 h"],
    ],
  },
  {
    t: "Lotissement de 12 lots à Kédange-sur-Canner",
    who: "Aménageur privé",
    d: "Voirie provisoire, réseaux secs et humides, plateformes des lots réglées au laser.",
    photos: ["ter-lotissement", "ter-aerien", "ter-bouteur"],
    facts: [
      ["Linéaire de réseaux", "1 150 m"],
      ["Durée", "9 semaines"],
      ["Équipe", "5 personnes"],
    ],
  },
  {
    t: "Assainissement à Waldweistroff",
    who: "Particulier, maison des années 1970",
    d: "Remplacement d'une fosse septique par une filière agréée, selon l'étude de sol, avec le contrôle du service d'assainissement.",
    photos: ["ter-drain", "ter-jardin", "ter-pneus"],
    facts: [
      ["Filière", "filtre à sable"],
      ["Durée", "4 jours"],
      ["Jardin", "remis en état"],
    ],
  },
];

const audiences = {
  "Je fais construire": {
    t: "Votre terrain prêt avant l'arrivée du maçon.",
    points: [
      "Un interlocuteur qui parle avec votre constructeur et votre architecte",
      "Le devis détaillé sous 72 h, sur visite du terrain",
      "Les terres évacuées ou régalées sur place, selon votre choix",
    ],
    cta: "Faire étudier mon terrain",
  },
  "Je suis un professionnel": {
    t: "Une équipe qui tient votre planning.",
    points: [
      "Constructeurs, architectes, aménageurs et communes",
      "Attestations d'assurance et Kbis envoyés avec le devis",
      "Réponse aux consultations sous 5 jours ouvrés",
    ],
    cta: "Nous consulter",
  },
} as const;
type Audience = keyof typeof audiences;

/* ------------------------------------------------------------ Éléments */

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        display,
        "text-[40px] leading-[0.95] text-balance @min-[900px]:text-[64px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Go to="home" className="flex items-center gap-3 text-left" label="Socle TP, accueil">
      <span className="grid size-10 place-items-center rounded-[4px] bg-(--engin)">
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
          <path
            d="M3 18h18M5 18l3-6h8l3 6M9 12V7h6v5"
            stroke="#1a1b1d"
            strokeWidth="2.2"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className={cn(display, "block text-[28px] leading-none", light && "text-white")}>
          Socle TP
        </span>
        <span className={cn("mt-1 block text-[12.5px]", light ? "text-white/60" : "text-black/50")}>
          Terrassement à Bouzonville
        </span>
      </span>
    </Go>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-(--basalte) text-white">
      <div className={cn("flex h-20 items-center gap-8", pad)}>
        <Logo light />
        <nav className="ml-auto hidden items-center gap-7 @min-[1050px]:flex">
          {nav
            .filter((p) => p.id !== "devis")
            .map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(p.id)}
                aria-current={p.id === page ? "page" : undefined}
                className="relative py-2 text-[15px] font-semibold text-white/70 hover:text-white aria-[current=page]:text-white aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-[22px] aria-[current=page]:after:h-1 aria-[current=page]:after:bg-(--engin)"
              >
                {p.label}
              </button>
            ))}
        </nav>
        <span className="ml-auto hidden text-[15px] font-semibold @min-[900px]:inline @min-[1050px]:ml-0">
          {PHONE}
        </span>
        <Go
          to="devis"
          className={cn(btnYellow, "hidden h-11 px-5 text-[15px] @min-[900px]:inline-flex")}
        >
          Demander un devis
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid h-11 place-items-center rounded-[4px] px-4 text-[14px] font-bold ring-1 ring-white/25 @min-[900px]:ml-0 @min-[1050px]:hidden"
        >
          {open ? <X className="size-5" /> : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-5 pb-4 @min-[1050px]:hidden">
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
                "flex w-full items-center justify-between border-b border-white/10 py-3.5 text-[26px]",
              )}
            >
              {p.label} <ArrowRight className="size-5 text-(--engin)" />
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function MobileBar() {
  return (
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/10 bg-white p-3 @min-[900px]:hidden">
      <Go to="devis" className={cn(btnDark, "h-12 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="devis" className={cn(btnYellow, "h-12 text-[15px]")}>
        Devis
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--basalte) text-white/60">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <Logo light />
          <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed">
            Terrassement, réseaux et assainissement dans le pays de Bouzonville et le nord mosellan,
            depuis 1998.
          </p>
          <p className="mt-4 text-[13px]">Assurance décennale et responsabilité civile à jour</p>
        </div>
        <div className="text-[14px]">
          <p className="font-bold text-white">Le site</p>
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
          <p className="font-bold text-white">Horaires</p>
          <p className="mt-3 leading-relaxed">
            Lundi au vendredi, 7 h – 17 h
            <br />
            Visites de terrain le samedi matin sur rendez-vous
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-bold text-white">Nous joindre</p>
          <p className={cn(display, "mt-3 text-[30px] leading-none text-(--engin)")}>{PHONE}</p>
          <p className="mt-2">devis@socle-tp-exemple.fr</p>
          <p className="mt-1">Bouzonville et 40 km autour</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Socle TP</span>
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
  src: string;
}) {
  return (
    <div className="relative overflow-hidden bg-(--basalte) text-white">
      <Photo src={src} alt="" sizes="1280px" className="opacity-40" />
      <div className={cn("relative pt-12 pb-14 @min-[900px]:pt-16 @min-[900px]:pb-20", pad)}>
        <p className="text-[14px] text-white/60">
          <Go to="home" className="hover:text-white">
            Accueil
          </Go>{" "}
          / <span className="text-white/85">{crumb}</span>
        </p>
        <h1
          className={cn(
            display,
            "mt-4 max-w-[860px] text-[46px] leading-[0.94] text-balance @min-[900px]:text-[84px]",
          )}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-white/75">{intro}</p>
        )}
      </div>
    </div>
  );
}

/** Le panneau de chantier, comme ceux posés à l'entrée des terrains. */
function SiteSign({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[4px] bg-white text-(--ink-text) shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <div className="flex items-center justify-between bg-(--engin) px-5 py-3">
        <span className={cn(display, "text-[24px] leading-none")}>Socle TP</span>
        <span className="text-[13px] font-semibold">Entreprise de terrassement</span>
      </div>
      <dl className="divide-y divide-black/10 px-5 text-[14.5px]">
        {[
          ["Nature des travaux", "Terrassement, réseaux, assainissement, accès"],
          ["Secteur", "Bouzonville et 40 km autour"],
          ["Devis", "Sous 72 h, après visite du terrain"],
          ["Joindre l'entreprise", PHONE],
        ].map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] gap-3 py-3">
            <dt className="text-black/50">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  const [who, setWho] = useState<Audience>("Je fais construire");
  const a = audiences[who];
  return (
    <>
      {/* Premier écran : l'engin plein cadre et le panneau de chantier */}
      <section className="relative bg-(--basalte) text-white @min-[900px]:min-h-[660px]">
        <div className="relative h-[280px] @min-[900px]:absolute @min-[900px]:inset-0 @min-[900px]:h-auto">
          <Photo
            src="ter-hero"
            alt="Pelle hydraulique sur un remblai de terre"
            priority
            sizes="100vw"
            position="60% 50%"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-(--basalte) via-(--basalte)/70 to-transparent max-[899px]:hidden" />
        </div>
        <div
          className={cn(
            "relative grid gap-10 py-10 @min-[900px]:min-h-[660px] @min-[900px]:grid-cols-[1fr_400px] @min-[900px]:items-end @min-[900px]:py-16",
            pad,
          )}
        >
          <div>
            <p className="text-[15px] font-semibold text-(--engin)">
              Terrassier dans le pays de Bouzonville
            </p>
            <h1
              className={cn(
                display,
                "mt-4 text-[54px] leading-[0.9] text-balance @min-[900px]:text-[108px]",
              )}
            >
              Votre terrain prêt à construire.
            </h1>
            <p className="mt-6 max-w-[480px] text-[17.5px] leading-relaxed text-white/75">
              Fouilles, réseaux, assainissement et accès, pour les particuliers qui font construire
              et pour les professionnels.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Go to="devis" className={btnYellow}>
                Faire étudier mon terrain
              </Go>
              <Go
                to="materiel"
                className={cn(btn, "ring-2 ring-white/40 ring-inset hover:ring-white")}
              >
                Voir le matériel
              </Go>
            </div>
          </div>
          <SiteSign className="hidden @min-[900px]:block" />
        </div>
      </section>

      {/* Chiffres et avis, sur une ligne */}
      <section
        className={cn(
          "grid grid-cols-2 gap-px bg-black/10 @min-[900px]:grid-cols-4",
          "border-b border-black/10",
        )}
      >
        {[
          ["28 ans", "de terrassement en Moselle"],
          ["12 engins", "de 2,7 à 21 tonnes"],
          ["72 h", "pour recevoir le devis"],
          ["4,8 / 5", "sur 54 avis Google"],
        ].map(([v, l], i) => (
          <div key={l} className="bg-white px-6 py-7 @min-[900px]:px-10">
            <p className={cn(display, "flex items-center gap-2 text-[40px] leading-none")}>
              {v}
              {i === 3 && <GoogleG className="size-6" />}
            </p>
            <p className="mt-2 text-[14.5px] text-black/55">{l}</p>
          </div>
        ))}
      </section>

      {/* Deux publics */}
      <section className={cn("bg-(--beton) py-16 @min-[900px]:py-24", pad)}>
        <Pick
          options={Object.keys(audiences) as Audience[]}
          value={who}
          onChange={setWho}
          className="gap-0 overflow-hidden rounded-[4px] ring-2 ring-(--basalte) @min-[600px]:inline-flex"
          itemClassName="h-12 flex-1 px-6 text-[15.5px] font-bold whitespace-nowrap aria-pressed:bg-(--basalte) aria-pressed:text-white"
        />
        <div className="mt-10 grid gap-10 @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:gap-16">
          <div>
            <H2>{a.t}</H2>
            <ul className="mt-8 space-y-4">
              {a.points.map((p) => (
                <li
                  key={p}
                  className="flex gap-4 border-t-2 border-(--basalte) pt-4 text-[17px] font-medium"
                >
                  {p}
                </li>
              ))}
            </ul>
            <Go to="devis" param={who} className={cn(btnDark, "mt-9")}>
              {a.cta} <ArrowRight className="size-4" />
            </Go>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-[4px] @min-[900px]:h-auto">
            <Photo
              key={who}
              src={who === "Je fais construire" ? "ter-jardin" : "ter-lotissement"}
              alt=""
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[760px]">Du décapage au raccordement</H2>
        <div className="mt-12 grid gap-8 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-4 @min-[900px]:gap-6">
          {services.map((s) => (
            <Go key={s.id} to="prestations" className="group text-left">
              <span className="relative block h-[220px] overflow-hidden rounded-[4px]">
                <Photo
                  src={s.src}
                  alt={s.t}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </span>
              <span className={cn(display, "mt-5 block text-[28px] leading-none")}>{s.t}</span>
              <span className="mt-2 block text-[15px] leading-relaxed text-black/60">{s.d}</span>
            </Go>
          ))}
        </div>
      </section>

      <Volume />

      {/* Avis */}
      <section className={cn("grid gap-10 py-16 @min-[900px]:grid-cols-3 @min-[900px]:py-24", pad)}>
        {[
          {
            n: "Julien",
            c: "Freistroff",
            t: "Fouilles faites en deux jours, le maçon a pu commencer comme prévu. Terres évacuées, terrain propre.",
          },
          {
            n: "Claire",
            c: "Launstroff",
            t: "Ils ont géré l'assainissement avec le contrôleur du syndicat, on n'a rien eu à faire.",
          },
          {
            n: "Thomas",
            c: "Constructeur, Metz",
            t: "On travaille avec eux sur une vingtaine de maisons par an : devis rapides et plateformes à la cote.",
          },
        ].map((r) => (
          <figure key={r.n} className="border-t-4 border-(--engin) pt-5">
            <Stars className="text-[15px]" />
            <blockquote className="mt-3 text-[17px] leading-relaxed">{r.t}</blockquote>
            <figcaption className="mt-4 text-[14.5px] font-semibold text-black/60">
              {r.n}, {r.c}
            </figcaption>
          </figure>
        ))}
      </section>

      <QuoteBand />
      <Footer />
      <MobileBar />
    </>
  );
}

/** Calcul indicatif du volume de terre d'une fouille. */
function Volume() {
  const [l, setL] = useState(12);
  const [w, setW] = useState(9);
  const [d, setD] = useState(1.2);
  const inPlace = l * w * d;
  const loose = inPlace * 1.25; // foisonnement d'une terre ordinaire
  const trucks = Math.ceil(loose / 14);
  const days = Math.max(1, Math.ceil(inPlace / 150));
  const fmt = (n: number) => Math.round(n).toLocaleString("fr-FR");
  const sliders = [
    { k: "Longueur", v: l, set: setL, min: 4, max: 30, step: 1, u: "m" },
    { k: "Largeur", v: w, set: setW, min: 4, max: 20, step: 1, u: "m" },
    { k: "Profondeur", v: d, set: setD, min: 0.4, max: 3, step: 0.1, u: "m" },
  ];
  return (
    <section
      className={cn(
        "grid gap-12 bg-(--argile) py-16 text-white @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-20 @min-[900px]:py-24",
        pad,
      )}
    >
      <div>
        <H2>Combien de terre faut-il sortir&nbsp;?</H2>
        <p className="mt-5 max-w-[440px] text-[16.5px] leading-relaxed text-white/65">
          Réglez les dimensions de la fouille : vous voyez le volume, le nombre de camions et la
          durée. Une estimation pour se faire une idée, le devis vient après la visite.
        </p>
        <div className="mt-9 space-y-7">
          {sliders.map((s) => (
            <label key={s.k} className="block">
              <span className="flex justify-between text-[15.5px] font-semibold">
                {s.k}
                <span className="text-(--engin)">
                  {s.v.toLocaleString("fr-FR")} {s.u}
                </span>
              </span>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={s.v}
                onChange={(e) => s.set(Number(e.target.value))}
                className="mt-3 w-full accent-(--engin)"
              />
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px self-center overflow-hidden rounded-[4px] bg-white/15">
        {[
          [fmt(inPlace) + " m³", "de terre en place"],
          [fmt(loose) + " m³", "une fois foisonnée"],
          [String(trucks), trucks > 1 ? "camions de 14 m³" : "camion de 14 m³"],
          [days + (days > 1 ? " jours" : " jour"), "de pelle environ"],
        ].map(([v, k]) => (
          <div key={k} className="bg-(--argile) p-7">
            <p className={cn(display, "text-[52px] leading-none text-(--engin)")}>{v}</p>
            <p className="mt-2 text-[15px] text-white/65">{k}</p>
          </div>
        ))}
        <Go
          to="devis"
          className="col-span-2 flex items-center justify-between bg-(--engin) px-7 py-5 text-[16px] font-bold text-(--basalte)"
        >
          Demander le devis de cette fouille <ArrowRight className="size-5" />
        </Go>
      </div>
    </section>
  );
}

function QuoteBand() {
  return (
    <section className={cn("bg-(--engin) py-14 text-(--basalte) @min-[900px]:py-20", pad)}>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <H2 className="max-w-[720px]">
          Un terrain à préparer&nbsp;? Envoyez l&apos;adresse et le plan.
        </H2>
        <div className="flex flex-wrap gap-3">
          <Go to="devis" className={btnDark}>
            Demander un devis
          </Go>
          <Go to="devis" className={btnLine}>
            <Phone className="size-4" /> {PHONE}
          </Go>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Prestations */

function Prestations() {
  return (
    <>
      <PageTitle
        crumb="Prestations"
        title="Ce que nous faisons, de la terre au raccordement"
        src="ter-terrain"
      />
      <section className={cn("py-6 @min-[900px]:py-10", pad)}>
        {services.map((s, i) => (
          <article
            key={s.id}
            className="grid gap-8 border-b border-black/10 py-12 @min-[900px]:grid-cols-[1fr_1.1fr] @min-[900px]:items-center @min-[900px]:gap-16"
          >
            <div
              className={cn(
                "relative h-[260px] overflow-hidden rounded-[4px] @min-[900px]:h-[340px]",
                i % 2 === 1 && "@min-[900px]:order-last",
              )}
            >
              <Photo src={s.src} alt={s.t} sizes="(min-width: 1024px) 560px, 100vw" />
            </div>
            <div>
              <h2 className={cn(display, "text-[40px] leading-[0.95] @min-[900px]:text-[52px]")}>
                {s.t}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-black/65">{s.d}</p>
              <ul className="mt-6 space-y-2 text-[15.5px]">
                {{
                  fouilles: [
                    "Implantation avec le géomètre",
                    "Terre végétale mise de côté pour le jardin",
                    "Remblais compactés par couches de 30 cm",
                  ],
                  reseaux: [
                    "Coordination avec les concessionnaires",
                    "Grillage avertisseur et lit de sable",
                    "Plan de récolement fourni",
                  ],
                  assainissement: [
                    "Selon l'étude de sol et l'avis du service d'assainissement",
                    "Pose de la filière agréée",
                    "Jardin remis en état",
                  ],
                  acces: [
                    "Empierrement 0/31,5 sur géotextile",
                    "Enrobé ou pavés drainants",
                    "Gestion des eaux de pluie à la parcelle",
                  ],
                }[s.id]?.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 bg-(--engin)" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <QuoteBand />
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Matériel */

function Materiel() {
  return (
    <>
      <PageTitle
        crumb="Matériel"
        title="Douze engins, entretenus à l'atelier"
        intro="Le bon engin pour chaque terrain : une mini-pelle pour un jardin clos, une 21 tonnes pour un sous-sol."
        src="ter-chargeuse"
      />
      <section
        className={cn(
          "grid gap-x-8 gap-y-14 py-14 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3 @min-[900px]:py-20",
          pad,
        )}
      >
        {machines.map((m) => (
          <article key={m.t}>
            <div className="relative h-[230px] overflow-hidden rounded-[4px]">
              <Photo src={m.src} alt={m.t} sizes="(min-width: 1024px) 380px, 50vw" />
            </div>
            <h2 className={cn(display, "mt-5 text-[32px] leading-none")}>{m.t}</h2>
            <p className="mt-2 text-[15.5px] leading-relaxed text-black/62">{m.d}</p>
            <dl className="mt-4 divide-y divide-black/10 border-y border-black/10 text-[14.5px]">
              {m.spec.map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5">
                  <dt className="text-black/55">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </section>
      <QuoteBand />
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Chantiers */

function Chantiers() {
  const [zoom, setZoom] = useState<string | null>(null);
  return (
    <>
      <PageTitle crumb="Chantiers" title="Trois chantiers de l'année" src="ter-lotissement" />
      <section className={cn("py-6 @min-[900px]:py-10", pad)}>
        {jobs.map((j) => (
          <article key={j.t} className="border-b border-black/10 py-12">
            <div className="grid gap-6 @min-[900px]:grid-cols-[1fr_1.4fr] @min-[900px]:gap-16">
              <div>
                <p className="text-[14.5px] font-semibold text-black/50">{j.who}</p>
                <h2 className={cn(display, "mt-2 text-[40px] leading-[0.95]")}>{j.t}</h2>
                <p className="mt-4 text-[16.5px] leading-relaxed text-black/65">{j.d}</p>
                <dl className="mt-6 grid grid-cols-3 gap-4">
                  {j.facts.map(([k, v]) => (
                    <div key={k} className="border-t-4 border-(--engin) pt-3">
                      <dd className={cn(display, "text-[26px] leading-none")}>{v}</dd>
                      <dt className="mt-1 text-[13px] text-black/55">{k}</dt>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {j.photos.map((src, k) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setZoom(src)}
                    aria-label={`Agrandir la photo ${k + 1}`}
                    className="relative h-[180px] overflow-hidden rounded-[4px] @min-[900px]:h-[280px]"
                  >
                    <Photo src={src} alt="" sizes="(min-width: 1024px) 240px, 33vw" />
                    <span className="absolute top-2 left-2 rounded-[3px] bg-(--engin) px-2 py-0.5 text-[12px] font-bold text-(--basalte)">
                      {["Avant", "Pendant", "Fini"][k]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
      {zoom && (
        <div
          className="fixed inset-0 z-40 grid place-items-center bg-black/85 p-6"
          onClick={() => setZoom(null)}
        >
          <div className="relative h-[75%] w-full max-w-[960px] overflow-hidden rounded-[4px]">
            <Photo src={zoom} alt="" sizes="960px" />
          </div>
        </div>
      )}
      <QuoteBand />
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------------ Devis */

const works = ["Fouilles", "Réseaux", "Assainissement", "Accès ou cour", "Autre"] as const;
const permits = ["Permis obtenu", "Permis en cours", "Pas encore"] as const;

function Devis() {
  const { param } = useSite();
  const [who, setWho] = useState<Audience>(
    param === "Je suis un professionnel" ? "Je suis un professionnel" : "Je fais construire",
  );
  const [work, setWork] = useState<(typeof works)[number]>("Fouilles");
  const [permit, setPermit] = useState<(typeof permits)[number]>("Permis obtenu");
  const [plan, setPlan] = useState(false);
  const chip =
    "h-10 rounded-[4px] px-4 text-[14.5px] font-semibold ring-1 ring-inset ring-black/20 hover:ring-black/50 aria-pressed:bg-(--basalte) aria-pressed:text-white aria-pressed:ring-(--basalte)";
  const field =
    "mt-2 h-12 w-full rounded-[4px] bg-white px-4 text-[16px] ring-1 ring-inset ring-black/20 outline-none placeholder:text-black/35 focus:ring-2 focus:ring-(--engin)";
  const pro = who === "Je suis un professionnel";
  return (
    <>
      <PageTitle
        crumb="Devis"
        title="L'adresse du terrain, le plan, et on s'occupe du reste"
        intro="Devis sous 72 h après la visite du terrain. Gratuit et sans engagement."
        src="ter-bouteur"
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.35fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <DemoForm
          success={{
            title: "Demande envoyée",
            text: `${work} : un conducteur de travaux vous rappelle sous 24 h pour fixer la visite du terrain.`,
          }}
          submit="Envoyer ma demande"
          submitClassName={cn(btnYellow, "mt-8 w-full")}
        >
          <Pick
            options={Object.keys(audiences) as Audience[]}
            value={who}
            onChange={setWho}
            className="gap-0 overflow-hidden rounded-[4px] ring-2 ring-(--basalte) @min-[600px]:inline-flex"
            itemClassName="h-11 flex-1 px-5 text-[15px] font-bold whitespace-nowrap aria-pressed:bg-(--basalte) aria-pressed:text-white"
          />
          <p className="mt-7 text-[15px] font-bold">Travaux</p>
          <Pick
            options={works}
            value={work}
            onChange={setWork}
            className="mt-3"
            itemClassName={chip}
          />
          <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
            <label className="block @min-[900px]:col-span-2">
              <span className="text-[15px] font-bold">Adresse du terrain</span>
              <input className={field} placeholder="Rue, lieu-dit, commune" />
            </label>
            <label className="block">
              <span className="text-[15px] font-bold">Parcelle cadastrale (facultatif)</span>
              <input className={field} placeholder="Section et numéro" />
            </label>
            <label className="block">
              <span className="text-[15px] font-bold">
                {pro ? "Entreprise ou collectivité" : "Nom"}
              </span>
              <input className={field} placeholder={pro ? "Raison sociale" : "Votre nom"} />
            </label>
            <label className="block">
              <span className="text-[15px] font-bold">Téléphone</span>
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
            <label className="block">
              <span className="text-[15px] font-bold">
                {pro ? "Date de démarrage" : "Début souhaité"}
              </span>
              <input className={field} placeholder="Mars 2027" />
            </label>
          </div>
          {!pro && (
            <>
              <p className="mt-6 text-[15px] font-bold">Permis de construire</p>
              <Pick
                options={permits}
                value={permit}
                onChange={setPermit}
                className="mt-3"
                itemClassName={chip}
              />
            </>
          )}
          <button
            type="button"
            onClick={() => setPlan(true)}
            className="mt-6 flex w-full items-center gap-4 rounded-[4px] border-2 border-dashed border-black/20 px-5 py-5 text-left hover:border-(--basalte)"
          >
            <FileUp className="size-6" />
            <span>
              <span className="block text-[15.5px] font-bold">
                {plan
                  ? "plan-de-masse.pdf ajouté"
                  : pro
                    ? "Ajouter le dossier de consultation"
                    : "Ajouter le plan de masse"}
              </span>
              <span className="block text-[13.5px] text-black/50">PDF ou photo, 20 Mo au plus</span>
            </span>
          </button>
        </DemoForm>
        <aside>
          <SiteSign />
          <p className="mt-8 text-[15.5px] leading-relaxed text-black/62">
            Communes desservies : Bouzonville, Freistroff, Launstroff, Waldweistroff,
            Kédange-sur-Canner, Boulay-Moselle, Thionville et alentours.
          </p>
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
        intro="Socle TP est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
        src="ter-terrain"
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits
          photos={[
            "ter-hero",
            "ter-drain",
            "ter-jardin",
            "ter-chargeuse",
            "ter-pneus",
            "ter-aerien",
            "ter-bouteur",
            "ter-bull",
            "ter-reseau",
            "ter-terrain",
            "ter-lotissement",
            "ter-acces",
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
        { id: "materiel", label: "Matériel", path: "/materiel", render: () => <Materiel /> },
        { id: "chantiers", label: "Chantiers", path: "/chantiers", render: () => <Chantiers /> },
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
