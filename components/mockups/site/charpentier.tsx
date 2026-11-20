"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { ArrowRight, ArrowUp, Phone, X } from "lucide-react";
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
 * Futaie Charpente, charpentier à Faulquemont (entreprise fictive).
 * Un atelier de taille : la photo de charpente plein écran, les étapes du
 * tronc au levage, un estimateur d'extension bois et un assistant qui
 * répond aux questions sur sa propre page.
 * Vert sapin, bois clair, copeau ; une grotesque à caractère.
 */

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 93 15";

const vars = {
  "--foret": "#17201a",
  "--sapin": "#2c4a36",
  "--bois": "#d9b27c",
  "--copeau": "#f3ede3",
  "--ink-text": "#1a1f1b",
  fontFamily: bricolage.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";

/* ---------------------------------------------------------------- Données */

type Work = { src: string; t: string; c: string; k: string; d: string };
const works: Work[] = [
  {
    src: "cha-noire",
    t: "Maison ossature bois, bardage brûlé",
    c: "Saint-Avold",
    k: "Ossature bois",
    d: "140 m², levage en 4 jours",
  },
  {
    src: "cha-comble",
    t: "Charpente traditionnelle apparente",
    c: "Faulquemont",
    k: "Charpente",
    d: "Sapin des Vosges, 11 fermes",
  },
  {
    src: "cha-extension",
    t: "Extension de 32 m²",
    c: "Boulay-Moselle",
    k: "Extension",
    d: "Mélèze naturel, 7 semaines",
  },
  {
    src: "cha-pignon",
    t: "Surélévation à pignon vitré",
    c: "Metz",
    k: "Extension",
    d: "Un étage en plus, 9 semaines",
  },
  {
    src: "cha-ancienne",
    t: "Restauration d'une charpente de 1890",
    c: "Créhange",
    k: "Charpente",
    d: "Pièces remplacées à l'identique",
  },
  {
    src: "cha-ossature",
    t: "Murs à ossature préfabriqués",
    c: "Morhange",
    k: "Ossature bois",
    d: "Taillés et isolés en atelier",
  },
  {
    src: "cha-fermettes",
    t: "Fermettes d'un garage double",
    c: "Longeville-lès-Saint-Avold",
    k: "Charpente",
    d: "Pose en une journée",
  },
  {
    src: "cha-lamelle",
    t: "Préau en lamellé-collé",
    c: "Faulquemont",
    k: "Extension",
    d: "Portée de 9 mètres",
  },
];

const reviews = [
  {
    n: "Thomas",
    c: "Boulay-Moselle",
    when: "il y a 1 mois",
    t: "Extension de 32 m² montée en trois jours, hors d'eau le vendredi. L'atelier nous a envoyé les plans 3D avant de tailler, aucune surprise.",
  },
  {
    n: "Isabelle",
    c: "Créhange",
    when: "il y a 2 mois",
    t: "Charpente de 1890 sauvée alors qu'un autre artisan voulait tout refaire. Ils ont remplacé seulement les pièces abîmées, au même profil.",
  },
  {
    n: "Marc",
    c: "Saint-Avold",
    when: "il y a 4 mois",
    t: "Maison ossature bois : chantier propre, équipe ponctuelle, et un suivi par photos chaque semaine. On recommande sans réserve.",
  },
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-[4px] px-6 text-[15.5px] font-semibold transition-colors";
const btnWood = cn(btn, "bg-(--bois) text-(--foret) hover:brightness-105");
const btnDark = cn(btn, "bg-(--sapin) text-white hover:bg-(--foret)");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--ink-text)/25 hover:ring-(--ink-text)/60");
const chip =
  "h-10 rounded-[4px] px-4 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 transition-colors hover:ring-black/40 aria-pressed:bg-(--sapin) aria-pressed:text-white aria-pressed:ring-(--sapin)";

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[32px] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance @min-[900px]:text-[50px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Logo({ light }: { light?: boolean }) {
  return (
    <Go to="home" className="flex items-center gap-3 text-left" label="Futaie Charpente, accueil">
      <svg viewBox="0 0 36 36" className="size-9" aria-hidden="true">
        <path
          d="M18 4 33 26H3Z"
          fill="none"
          stroke={light ? "#fff" : "var(--sapin)"}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M18 4v22M10.5 15h15" stroke="var(--bois)" strokeWidth="3" />
        <path d="M5 31h26" stroke={light ? "#fff" : "var(--sapin)"} strokeWidth="3" />
      </svg>
      <span className="leading-none">
        <span
          className={cn(
            "block text-[21px] font-extrabold tracking-[-0.03em]",
            light && "text-white",
          )}
        >
          Futaie
        </span>
        <span
          className={cn("mt-0.5 block text-[12.5px]", light ? "text-white/70" : "text-black/55")}
        >
          Charpente et ossature bois
        </span>
      </span>
    </Go>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  const onHome = page === "home";
  return (
    <header
      className={cn(
        "top-0 z-30 w-full",
        onHome
          ? "absolute bg-linear-to-b from-black/55 to-transparent text-white"
          : "sticky border-b border-black/8 bg-(--copeau)/95 backdrop-blur",
      )}
    >
      <div className={cn("flex h-20 items-center gap-8", pad)}>
        <Logo light={onHome} />
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className={cn(
                "py-2 text-[15px] font-medium aria-[current=page]:underline aria-[current=page]:decoration-(--bois) aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8",
                onHome ? "text-white/80 hover:text-white" : "text-black/65 hover:text-black",
              )}
            >
              {p.label}
            </button>
          ))}
        </nav>
        <Go
          to="contact"
          className={cn(
            btnWood,
            "hidden h-11 px-5 text-[14.5px] @min-[900px]:ml-auto @min-[900px]:inline-flex @min-[1100px]:ml-0",
          )}
        >
          Demander une visite
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className={cn(
            "ml-auto grid h-11 min-w-11 place-items-center rounded-[4px] px-4 text-[14px] font-semibold ring-1 @min-[900px]:ml-0 @min-[1100px]:hidden",
            onHome ? "ring-white/40" : "ring-black/15",
          )}
        >
          {open ? <X className="size-5" /> : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="bg-(--copeau) px-5 pb-4 text-(--ink-text) @min-[1100px]:hidden">
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

function MobileBar() {
  return (
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/8 bg-(--copeau) p-3 @min-[900px]:hidden">
      <Go to="contact" className={cn(btnLine, "h-12 bg-white text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="contact" className={cn(btnDark, "h-12 text-[15px]")}>
        Visite gratuite
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--foret) text-white/65">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.5fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <Logo light />
          <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed">
            Atelier de taille de 800 m² à Faulquemont. Sapin et douglas des Vosges, mélèze pour les
            bardages.
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
          <p className="font-semibold text-white">Atelier</p>
          <p className="mt-3 leading-relaxed">
            Lundi au vendredi, 7 h 30 – 17 h 30
            <br />
            Visites sur rendez-vous
            <br />
            Moselle-Est et nord de la Meurthe-et-Moselle
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-bold text-white">{PHONE}</p>
          <p className="mt-1">atelier@futaie-charpente-exemple.fr</p>
          <p className="mt-4">Qualibat charpente et ossature, garantie décennale</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Futaie Charpente</span>
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
    <div className="grid border-b border-black/8 bg-(--copeau) @min-[900px]:grid-cols-[1.3fr_1fr]">
      <div className={cn("pt-10 pb-12 @min-[900px]:pt-16 @min-[900px]:pb-20", pad)}>
        <p className="text-[14px] text-black/50">
          <Go to="home" className="hover:text-black">
            Accueil
          </Go>{" "}
          / <span className="text-black/75">{crumb}</span>
        </p>
        <h1 className="mt-4 max-w-[720px] text-[38px] leading-[1] font-extrabold tracking-[-0.04em] text-balance @min-[900px]:text-[60px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-black/60">{intro}</p>
        )}
      </div>
      {src && (
        <div className="relative hidden @min-[900px]:block">
          <Photo src={src} alt="" sizes="520px" />
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <div className="bg-(--copeau)">
      {/* Premier écran : la charpente plein cadre */}
      <section className="relative flex min-h-[620px] flex-col justify-end text-white @min-[900px]:min-h-[760px]">
        <Photo
          src="cha-hero"
          alt="Combles sous une grande charpente en bois éclairée"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-(--foret) via-(--foret)/45 to-black/10" />
        <div className={cn("relative pb-10 @min-[900px]:pb-14", pad)}>
          <h1 className="max-w-[900px] text-[44px] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance @min-[900px]:text-[92px]">
            Charpentes et maisons bois, taillées à Faulquemont.
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <div className="flex flex-wrap gap-3">
              <Go to="extension" className={btnWood}>
                Estimer une extension
              </Go>
              <Go
                to="realisations"
                className={cn(btn, "ring-1 ring-white/40 ring-inset hover:ring-white")}
              >
                Voir les chantiers
              </Go>
            </div>
            <dl className="grid grid-cols-3 gap-6 text-[14px] @min-[900px]:gap-10">
              {[
                ["32 ans", "d'atelier"],
                ["800 m²", "de taille à couvert"],
                ["4,9", "sur Google, 61 avis"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-[26px] leading-none font-extrabold tracking-[-0.03em] @min-[900px]:text-[32px]">
                    {v}
                  </dt>
                  <dd className="mt-1.5 text-white/70">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Trois métiers */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[680px]">Trois métiers, un seul atelier.</H2>
        <div className="mt-12 grid gap-10 @min-[900px]:grid-cols-3 @min-[900px]:gap-8">
          {[
            [
              "cha-comble",
              "Charpente",
              "Neuve ou restaurée, traditionnelle ou en fermettes. Traitement et renforts compris.",
            ],
            [
              "cha-ossature",
              "Ossature bois",
              "Maisons et murs préfabriqués en atelier, isolés avant d'arriver sur le chantier.",
            ],
            [
              "cha-extension",
              "Extensions et surélévations",
              "Des mètres carrés en plus, montés hors d'eau en quelques jours.",
            ],
          ].map(([src, t, d], i) => (
            <Go
              key={t}
              to={i === 2 ? "extension" : "realisations"}
              className={cn(
                "group flex flex-col items-stretch text-left",
                i === 1 && "@min-[900px]:mt-16",
              )}
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[4px]">
                <Photo
                  src={src}
                  alt={t}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-5 flex items-center justify-between text-[22px] font-bold tracking-[-0.02em]">
                {t}{" "}
                <ArrowRight className="size-5 text-(--sapin) transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-2 block text-[15.5px] leading-relaxed text-black/60">{d}</span>
            </Go>
          ))}
        </div>
      </section>

      <Steps />

      {/* Estimation d'extension */}
      <section
        className={cn(
          "grid gap-10 py-16 @min-[900px]:grid-cols-[1.1fr_1fr] @min-[900px]:items-center @min-[900px]:gap-16 @min-[900px]:py-24",
          pad,
        )}
      >
        <div className="relative h-[300px] overflow-hidden rounded-[4px] @min-[900px]:h-[520px]">
          <Photo
            src="cha-noire"
            alt="Maison bois à bardage noir et pignon vitré"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </div>
        <div>
          <H2>Combien coûte une extension en bois&nbsp;?</H2>
          <p className="mt-5 text-[17px] leading-relaxed text-black/62">
            Choisissez le type de projet, la surface et le bardage : vous obtenez une fourchette et
            le calendrier, de l&apos;étude au levage.
          </p>
          <p className="mt-8 border-l-4 border-(--bois) pl-5 text-[16px]">
            Exemple : extension de plain-pied de 30 m², bardage mélèze
            <br />
            <b className="text-[24px] tracking-[-0.02em]">entre 55 000 et 67 000 € TTC</b>
          </p>
          <Go to="extension" className={cn(btnDark, "mt-8")}>
            Estimer mon projet
          </Go>
        </div>
      </section>

      {/* Avis */}
      <section className={cn("bg-white py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <H2>Ils ont fait monter leur projet</H2>
          <p className="flex items-center gap-3 text-[15px] text-black/60">
            <GoogleG className="size-6" />
            <b className="text-[22px] text-(--ink-text)">4,9</b>
            <Stars className="text-[16px]" /> 61 avis
          </p>
        </div>
        <div className="mt-12 grid gap-8 @min-[900px]:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.n} className="border-t-4 border-(--bois) pt-6">
              <blockquote className="text-[17px] leading-relaxed">{r.t}</blockquote>
              <figcaption className="mt-5 text-[14.5px] text-black/55">
                <b className="text-(--ink-text)">{r.n}</b>, {r.c}, {r.when}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Assistant */}
      <section className={cn("bg-(--sapin) py-14 text-white @min-[900px]:py-20", pad)}>
        <div className="grid gap-8 @min-[900px]:grid-cols-[1fr_1.2fr] @min-[900px]:items-center">
          <div>
            <H2>Une question, même le soir&nbsp;?</H2>
            <p className="mt-4 max-w-[440px] text-[16.5px] leading-relaxed text-white/70">
              L&apos;assistant de l&apos;atelier répond tout de suite aux questions courantes. Un
              charpentier reprend la conversation le lendemain si besoin.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {questions.slice(0, 3).map((q, i) => (
              <Go
                key={q.q}
                to="assistant"
                param={String(i)}
                className="flex items-center justify-between gap-4 rounded-[4px] bg-white/8 px-5 py-4 text-left text-[16px] ring-1 ring-white/15 hover:bg-white/14"
              >
                {q.q} <ArrowRight className="size-4 shrink-0 text-(--bois)" />
              </Go>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileBar />
    </div>
  );
}

/** Du tronc au levage : les étapes réelles d'un chantier bois. */
function Steps() {
  return (
    <section className={cn("bg-(--foret) py-16 text-white @min-[900px]:py-24", pad)}>
      <div className="grid gap-12 @min-[900px]:grid-cols-[1fr_1.4fr] @min-[900px]:gap-16">
        <div>
          <H2>Du relevé au levage, en quatre étapes.</H2>
          <div className="relative mt-10 hidden h-[340px] overflow-hidden rounded-[4px] @min-[900px]:block">
            <Photo src="cha-levage" alt="Levage d'un panneau d'ossature bois" sizes="460px" />
          </div>
        </div>
        <ol className="divide-y divide-white/15 border-y border-white/15">
          {[
            [
              "Relevé et étude",
              "2 à 6 semaines",
              "Visite, relevé laser, plans 3D et calcul de structure. Dépôt du permis si besoin.",
            ],
            [
              "Taille en atelier",
              "2 à 3 semaines",
              "Chaque pièce est taillée et numérotée à Faulquemont, au sec, avant d'arriver chez vous.",
            ],
            [
              "Levage",
              "1 à 4 jours",
              "La structure est assemblée sur place à la grue. Le soir du dernier jour, c'est hors d'eau.",
            ],
            [
              "Couverture et finitions",
              "1 à 3 semaines",
              "Bardage, menuiseries, isolation : on coordonne les autres corps de métier.",
            ],
          ].map(([t, d, p], i) => (
            <li
              key={t}
              className="grid grid-cols-[56px_1fr] gap-4 py-7 @min-[900px]:grid-cols-[72px_1fr_auto]"
            >
              <span className="text-[40px] leading-none font-extrabold text-(--bois)">{i + 1}</span>
              <span>
                <span className="block text-[20px] font-bold tracking-[-0.01em]">{t}</span>
                <span className="mt-2 block text-[15.5px] leading-relaxed text-white/65">{p}</span>
              </span>
              <span className="col-start-2 text-[14px] text-white/60 @min-[900px]:col-start-3 @min-[900px]:pt-1.5">
                {d}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Extension */

const types = [
  "Extension de plain-pied",
  "Surélévation",
  "Préau ou carport",
  "Charpente de toit",
] as const;
const claddings = ["Mélèze naturel", "Douglas", "Bardage brûlé noir"] as const;
const rates: Record<(typeof types)[number], number> = {
  "Extension de plain-pied": 1900,
  Surélévation: 2300,
  "Préau ou carport": 520,
  "Charpente de toit": 210,
};

function Extension() {
  const [type, setType] = useState<(typeof types)[number]>("Extension de plain-pied");
  const [area, setArea] = useState(30);
  const [clad, setClad] = useState<(typeof claddings)[number]>("Mélèze naturel");
  const isRoof = type === "Charpente de toit";
  const cladRate = clad === "Douglas" ? 0.97 : clad === "Bardage brûlé noir" ? 1.08 : 1;
  const mid = area * rates[type] * (isRoof ? 1 : cladRate) + (isRoof ? 2500 : 4000);
  const r = (n: number) => (Math.round(n / 500) * 500).toLocaleString("fr-FR");
  const studyWeeks = type === "Surélévation" || type === "Extension de plain-pied" ? 6 : 2;
  const workshop = Math.max(1, Math.round(area / 15));
  const lift = Math.max(1, Math.min(5, Math.round(area / 12)));
  const finishing = isRoof || type === "Préau ou carport" ? 1 : Math.max(2, Math.round(area / 12));
  const total = studyWeeks + workshop + 1 + finishing;
  const bars = [
    ["Étude et permis", studyWeeks],
    ["Taille en atelier", workshop],
    ["Levage", 1],
    ["Finitions", finishing],
  ] as const;
  return (
    <div className="bg-(--copeau)">
      <PageTitle
        crumb="Extension"
        title="Estimez votre projet bois"
        intro="Type de projet, surface, bardage : une fourchette et un calendrier. Le prix ferme vient après la visite, gratuite."
        src="cha-extension"
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1.1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="space-y-8">
          <div>
            <p className="text-[15px] font-semibold">Projet</p>
            <Pick
              options={types}
              value={type}
              onChange={setType}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              Surface {isRoof ? "de toiture" : "au sol"}{" "}
              <span className="text-(--sapin)">{area} m²</span>
            </span>
            <input
              type="range"
              min={10}
              max={isRoof ? 200 : 80}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-4 w-full accent-(--sapin)"
            />
          </label>
          {!isRoof && (
            <div>
              <p className="text-[15px] font-semibold">Bardage</p>
              <Pick
                options={claddings}
                value={clad}
                onChange={setClad}
                className="mt-3"
                itemClassName={chip}
              />
            </div>
          )}
          <p className="text-[14.5px] leading-relaxed text-black/55">
            Prix TTC, structure, isolation et bardage compris. Hors fondations, menuiseries et
            aménagement intérieur.
          </p>
        </div>
        <div className="bg-white p-7 ring-1 ring-black/8 @min-[900px]:p-9">
          <p className="text-[14.5px] text-black/55">Fourchette indicative</p>
          <p className="mt-1 text-[44px] leading-none font-extrabold tracking-[-0.04em]">
            {r(mid * 0.9)} – {r(mid * 1.1)} €
          </p>
          <p className="mt-8 text-[15px] font-semibold">Calendrier, environ {total} semaines</p>
          <div className="mt-4 space-y-3">
            {bars.map(([t, w], i) => {
              const before = bars.slice(0, i).reduce((s, b) => s + b[1], 0);
              return (
                <div key={t} className="grid grid-cols-[130px_1fr] items-center gap-3 text-[14px]">
                  <span className="text-black/65">{t}</span>
                  <span className="relative h-7 rounded-[3px] bg-(--copeau)">
                    <span
                      className={cn(
                        "absolute inset-y-0 rounded-[3px]",
                        t === "Levage" ? "bg-(--bois)" : "bg-(--sapin)",
                      )}
                      style={{
                        left: `${(before / total) * 100}%`,
                        width: `${Math.max((w / total) * 100, 3)}%`,
                      }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-[14.5px] text-black/60">
            Levage en {lift} jour{lift > 1 ? "s" : ""} : votre maison reste ouverte moins d&apos;une
            semaine.
          </p>
          <Go to="contact" className={cn(btnDark, "mt-7 w-full")}>
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

const kinds = ["Tout", "Charpente", "Ossature bois", "Extension"] as const;

function Realisations() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("Tout");
  const [zoom, setZoom] = useState<Work | null>(null);
  const shown = works.filter((w) => kind === "Tout" || w.k === kind);
  return (
    <div className="bg-(--copeau)">
      <PageTitle
        crumb="Réalisations"
        title="Chantiers sortis de l'atelier"
        intro="Moselle-Est, de Metz à Saint-Avold."
      />
      <section className={cn("py-12 @min-[900px]:py-16", pad)}>
        <Pick options={kinds} value={kind} onChange={setKind} itemClassName={chip} />
        <div className="mt-8 grid gap-x-6 gap-y-10 @min-[600px]:grid-cols-2">
          {shown.map((w, i) => (
            <button
              key={w.src}
              type="button"
              onClick={() => setZoom(w)}
              className={cn("group text-left", i % 2 === 1 && "@min-[600px]:mt-14")}
            >
              <span className="relative block aspect-[3/2] overflow-hidden rounded-[4px]">
                <Photo
                  src={w.src}
                  alt={w.t}
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-4 block text-[19px] font-bold tracking-[-0.01em]">{w.t}</span>
              <span className="block text-[14.5px] text-black/55">
                {w.c}. {w.d}
              </span>
            </button>
          ))}
        </div>
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
            {zoom.t}, {zoom.c}
          </span>
        </button>
      )}
      <Footer />
      <MobileBar />
    </div>
  );
}

/* ---------------------------------------------------------------- Atelier */

function Atelier() {
  return (
    <div className="bg-(--copeau)">
      <PageTitle
        crumb="L'atelier"
        title="Le bois arrive en grume, il repart en charpente"
        intro="Sept charpentiers, un bureau d'étude intégré et une taille numérique pour les pièces complexes."
        src="cha-lamelle"
      />
      <section className={cn("grid gap-12 py-14 @min-[900px]:grid-cols-3 @min-[900px]:py-20", pad)}>
        {[
          [
            "Bois des Vosges",
            "Sapin et douglas achetés à une scierie à 70 km, séchés et certifiés PEFC. Mélèze pour les bardages extérieurs.",
          ],
          [
            "Bureau d'étude",
            "Plans 3D et calculs de structure faits sur place : vous voyez votre charpente avant qu'on la taille.",
          ],
          [
            "Taille à couvert",
            "800 m² d'atelier : les pièces sont taillées au sec et arrivent prêtes à assembler.",
          ],
        ].map(([t, d]) => (
          <div key={t} className="border-t-4 border-(--sapin) pt-6">
            <p className="text-[22px] font-bold tracking-[-0.02em]">{t}</p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-black/62">{d}</p>
          </div>
        ))}
      </section>
      <section
        className={cn(
          "grid gap-6 pb-16 @min-[900px]:grid-cols-[1.4fr_1fr] @min-[900px]:pb-24",
          pad,
        )}
      >
        <div className="relative h-[280px] overflow-hidden rounded-[4px] @min-[900px]:h-[440px]">
          <Photo
            src="cha-fermettes"
            alt="Fermettes de toiture posées"
            sizes="(min-width: 1024px) 700px, 100vw"
          />
        </div>
        <div className="relative h-[280px] overflow-hidden rounded-[4px] @min-[900px]:h-[440px]">
          <Photo
            src="cha-ancienne"
            alt="Ancienne charpente à restaurer"
            sizes="(min-width: 1024px) 480px, 100vw"
          />
        </div>
      </section>
      <Steps />
      <Footer />
      <MobileBar />
    </div>
  );
}

/* -------------------------------------------------------------- Assistant */

const questions = [
  {
    q: "Ma charpente est-elle à traiter ?",
    a: "Si vous voyez de petits trous ronds, de la sciure fine au sol ou des pièces qui sonnent creux, c'est probablement des insectes. Nous faisons un diagnostic gratuit en Moselle-Est : on sonde chaque pièce et on vous dit s'il faut traiter, renforcer ou remplacer.",
  },
  {
    q: "Faut-il un permis pour une extension bois ?",
    a: "En zone urbaine d'un PLU, une déclaration préalable suffit jusqu'à 40 m². Au-delà, ou si la surface totale dépasse 150 m², il faut un permis et un architecte. Notre bureau d'étude prépare les plans et le dossier.",
  },
  {
    q: "Combien de temps dure un levage ?",
    a: "De 1 jour pour un préau à 4 jours pour une maison de 140 m². Tout est taillé à l'atelier avant : sur place, on assemble. Le dernier soir, la structure est hors d'eau.",
  },
  {
    q: "Travaillez-vous avec du bois local ?",
    a: "Oui : sapin et douglas des Vosges, achetés à une scierie à 70 km, certifiés PEFC. Pour les bardages, nous conseillons le mélèze, qui grisaille joliment sans entretien.",
  },
];

type Msg = { from: "bot" | "me"; t: string };

function Assistant() {
  const { param } = useSite();
  const first = param !== undefined ? questions[Number(param)] : undefined;
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      from: "bot",
      t: "Bonjour, je suis l'assistant de l'atelier Futaie. Posez votre question sur une charpente, une ossature ou une extension.",
    },
    ...(first
      ? ([
          { from: "me", t: first.q },
          { from: "bot", t: first.a },
        ] as Msg[])
      : []),
  ]);
  const [draft, setDraft] = useState("");
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);
  const ask = (t: string) => {
    const known = questions.find((q) => q.q === t);
    setMsgs((m) => [
      ...m,
      { from: "me", t },
      {
        from: "bot",
        t:
          known?.a ??
          "Bonne question. Je préfère qu'un charpentier vous réponde : laissez votre numéro dans la page Contact, l'atelier vous rappelle le jour ouvré suivant.",
      },
    ]);
  };
  return (
    <div className="bg-(--copeau)">
      <PageTitle
        crumb="Assistant"
        title="Posez votre question à l'atelier"
        intro="Réponses immédiates aux questions courantes. Pour un devis, un charpentier vous rappelle."
      />
      <section
        className={cn(
          "grid gap-10 py-12 @min-[900px]:grid-cols-[1fr_320px] @min-[900px]:py-16",
          pad,
        )}
      >
        <div className="flex h-[520px] flex-col overflow-hidden rounded-[6px] bg-white ring-1 ring-black/8">
          <div ref={list} className="flex-1 space-y-4 overflow-y-auto p-6">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={cn(
                  "max-w-[80%] rounded-[10px] px-4 py-3 text-[15.5px] leading-relaxed",
                  m.from === "bot" ? "bg-(--copeau)" : "ml-auto bg-(--sapin) text-white",
                )}
              >
                {m.t}
              </p>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-black/8 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (draft.trim()) ask(draft.trim());
              setDraft("");
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Votre question…"
              className="h-12 flex-1 rounded-[4px] bg-(--copeau) px-4 text-[16px] outline-none focus:ring-2 focus:ring-(--sapin)"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              className="grid size-12 place-items-center rounded-[4px] bg-(--sapin) text-white"
            >
              <ArrowUp className="size-5" />
            </button>
          </form>
        </div>
        <div>
          <p className="text-[15px] font-semibold">Questions fréquentes</p>
          <div className="mt-4 flex flex-col gap-2">
            {questions.map((q) => (
              <button
                key={q.q}
                type="button"
                onClick={() => ask(q.q)}
                className="rounded-[4px] bg-white px-4 py-3.5 text-left text-[15px] ring-1 ring-black/8 hover:ring-(--sapin)"
              >
                {q.q}
              </button>
            ))}
          </div>
          <p className="mt-6 text-[13.5px] leading-relaxed text-black/50">
            Assistant automatique : ses réponses sont générales et relues par l&apos;atelier. Seul
            un devis signé engage l&apos;entreprise.
          </p>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </div>
  );
}

/* --------------------------------------------------------------- Contact */

const projectKinds = [
  "Charpente",
  "Ossature bois",
  "Extension",
  "Surélévation",
  "Diagnostic",
] as const;

function Contact() {
  const [kind, setKind] = useState<(typeof projectKinds)[number]>("Extension");
  const field =
    "mt-2 h-12 w-full rounded-[4px] bg-white px-4 text-[16px] ring-1 ring-inset ring-black/12 outline-none placeholder:text-black/35 focus:ring-2 focus:ring-(--sapin)";
  return (
    <div className="bg-(--copeau)">
      <PageTitle crumb="Contact" title="Une visite gratuite, sous 10 jours" src="cha-pignon" />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <p className="text-[15px] text-black/55">Atelier, du lundi au vendredi</p>
          <p className="mt-2 text-[40px] leading-none font-extrabold tracking-[-0.03em]">{PHONE}</p>
          <dl className="mt-10 space-y-6 border-t border-black/8 pt-8 text-[15.5px]">
            <div>
              <dt className="font-semibold">Zone</dt>
              <dd className="mt-1 text-black/60">Moselle-Est et nord de la Meurthe-et-Moselle</dd>
            </div>
            <div>
              <dt className="font-semibold">E-mail</dt>
              <dd className="mt-1 text-black/60">atelier@futaie-charpente-exemple.fr</dd>
            </div>
            <div>
              <dt className="font-semibold">Visites d&apos;atelier</dt>
              <dd className="mt-1 text-black/60">Le vendredi après-midi, sur rendez-vous</dd>
            </div>
          </dl>
        </div>
        <DemoForm
          success={{
            title: "Demande envoyée",
            text: `Projet : ${kind.toLowerCase()}. L'atelier vous appelle pour fixer la visite.`,
          }}
          submit="Demander la visite"
          submitClassName={cn(btnDark, "mt-8 w-full")}
        >
          <p className="text-[14px] font-medium text-black/70">Votre projet</p>
          <Pick
            options={projectKinds}
            value={kind}
            onChange={setKind}
            className="mt-3"
            itemClassName={chip}
          />
          <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Commune du chantier</span>
              <input className={field} placeholder="Faulquemont" />
            </label>
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Téléphone</span>
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
          </div>
          <label className="mt-5 block">
            <span className="text-[14px] font-medium text-black/70">
              Votre projet en quelques mots
            </span>
            <textarea
              rows={4}
              className={cn(field, "h-auto py-3")}
              placeholder="Surface, délai souhaité, plans existants…"
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
    <div className="bg-(--copeau)">
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Futaie Charpente est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits photos={["cha-hero", ...works.map((w) => w.src), "cha-levage"]} />
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
          id: "extension",
          label: "Extension",
          path: "/estimer-une-extension",
          render: () => <Extension />,
        },
        { id: "atelier", label: "L'atelier", path: "/atelier", render: () => <Atelier /> },
        { id: "assistant", label: "Assistant", path: "/assistant", render: () => <Assistant /> },
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
