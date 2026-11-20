"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Figtree, Newsreader } from "next/font/google";
import { ArrowRight, Check, X } from "lucide-react";
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
 * Maisons Orée, constructeur et entreprise générale à Château-Salins
 * (entreprise fictive). Faire construire est un projet long : le site montre
 * les maisons en grand, explique chaque étape du terrain aux clés et prépare
 * le premier rendez-vous. Serif éditoriale, bleu ardoise, brume.
 */

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 71 28";

const vars = {
  "--encre": "#18222b",
  "--ardoise": "#33506a",
  "--brume": "#eef1ef",
  "--pierre": "#d8d4cb",
  "--ink-text": "#18222b",
  "--serif": newsreader.style.fontFamily,
  fontFamily: figtree.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";
const serif = "font-(family-name:--serif) font-normal";

/* ---------------------------------------------------------------- Données */

type Step = { id: string; t: string; time: string; d: string; src: string };

const steps: Step[] = [
  {
    id: "terrain",
    t: "Le terrain",
    time: "1 à 2 mois",
    d: "Nous visitons le terrain avec vous : orientation, pente, règles du plan local d'urbanisme, raccordements. Si vous n'en avez pas encore, nous vous signalons ceux que nous connaissons.",
    src: "con-fondations",
  },
  {
    id: "plans",
    t: "Les plans",
    time: "1 mois",
    d: "Esquisse, puis plans détaillés et prix ferme. Vous gardez la main sur chaque pièce, chaque fenêtre et chaque finition.",
    src: "con-plans",
  },
  {
    id: "permis",
    t: "Le permis",
    time: "2 à 3 mois",
    d: "Nous montons et déposons le permis de construire, puis suivons l'instruction en mairie. Le contrat est signé avec ses garanties.",
    src: "con-plans",
  },
  {
    id: "chantier",
    t: "Le chantier",
    time: "8 à 10 mois",
    d: "Un conducteur de travaux unique, une visite de chantier avec vous chaque mois et des photos chaque semaine dans votre espace client.",
    src: "con-murs",
  },
  {
    id: "cles",
    t: "Les clés",
    time: "Le grand jour",
    d: "Réception des travaux ensemble, réserves notées et levées, remise des clés et des notices. La garantie de parfait achèvement démarre.",
    src: "con-sejour",
  },
];

type Model = {
  id: string;
  name: string;
  kind: string;
  src: string;
  m2: number;
  rooms: number;
  from: string;
  d: string;
};

const models: Model[] = [
  {
    id: "plain-pied",
    name: "Orée 95",
    kind: "Plain-pied",
    src: "con-patio",
    m2: 95,
    rooms: 3,
    from: "189 000 €",
    d: "Tout sur un niveau, pièce de vie traversante et suite parentale. Pensée pour vieillir chez soi.",
  },
  {
    id: "etage",
    name: "Orée 130",
    kind: "À étage",
    src: "con-hero",
    m2: 130,
    rooms: 4,
    from: "236 000 €",
    d: "Pignon vitré, séjour double hauteur, quatre chambres à l'étage. Pour une famille sur un terrain compact.",
  },
  {
    id: "contemporaine",
    name: "Orée 150",
    kind: "Contemporaine",
    src: "con-moderne",
    m2: 150,
    rooms: 4,
    from: "289 000 €",
    d: "Toit plat, garage intégré et grandes baies sur le jardin. Chaque volume se décline selon votre terrain.",
  },
];

const reviews = [
  {
    n: "Aurélie et Mathieu",
    c: "Dieuze",
    t: "Quatorze mois du premier rendez-vous aux clés, comme annoncé. Les photos du chantier chaque semaine nous ont évité bien des allers-retours.",
  },
  {
    n: "Françoise",
    c: "Château-Salins",
    t: "Une maison de plain-pied pour notre retraite. Ils ont adapté la salle de bain et les seuils sans faire de supplément au moindre détail.",
  },
  {
    n: "Karim",
    c: "Vic-sur-Seille",
    t: "Rénovation complète d'une maison de 1930 : un seul interlocuteur pour sept corps de métier. Le budget a tenu.",
  },
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-[15.5px] font-semibold transition-colors";
const btnDark = cn(btn, "bg-(--encre) text-white hover:bg-(--ardoise)");
const btnLine = cn(btn, "ring-1 ring-inset ring-current/25 hover:ring-current/60");

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        serif,
        "text-[34px] leading-[1.05] tracking-[-0.015em] text-balance @min-[900px]:text-[52px]",
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
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <path d="M4 18 16 7l12 11" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M2 25h28" stroke={light ? "#9fb6cb" : "var(--ardoise)"} strokeWidth="2.2" />
        <circle
          cx="16"
          cy="25"
          r="5"
          fill="none"
          stroke={light ? "#9fb6cb" : "var(--ardoise)"}
          strokeWidth="2.2"
        />
      </svg>
      <span className="leading-none">
        <span className={cn(serif, "block text-[25px] tracking-[-0.01em]")}>Maisons Orée</span>
        <span className={cn("mt-1 block text-[12.5px]", light ? "text-white/55" : "text-black/50")}>
          Constructeur en Saulnois
        </span>
      </span>
    </span>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-black/6 bg-white/95 backdrop-blur">
      <div className={cn("flex h-19 items-center gap-8", pad)}>
        <Go to="home" label="Maisons Orée, accueil" className="text-left">
          <Logo />
        </Go>
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {nav
            .filter((p) => p.id !== "projet")
            .map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(p.id)}
                aria-current={p.id === page ? "page" : undefined}
                className="py-2 text-[15px] font-medium text-black/60 underline-offset-[10px] hover:text-black aria-[current=page]:text-black aria-[current=page]:underline"
              >
                {p.label}
              </button>
            ))}
        </nav>
        <Go
          to="projet"
          className={cn(
            btnDark,
            "ml-auto hidden h-11 px-6 text-[15px] @min-[900px]:inline-flex @min-[1100px]:ml-0",
          )}
        >
          Prendre rendez-vous
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid h-11 min-w-11 place-items-center rounded-full px-4 text-[14px] font-semibold ring-1 ring-black/12 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? <X className="size-5" /> : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="px-5 pb-3 @min-[1100px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className="flex w-full items-center justify-between border-t border-black/6 py-3.5 text-[17px] font-semibold"
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
    <div className="sticky bottom-0 z-20 border-t border-black/8 bg-white p-3 @min-[900px]:hidden">
      <Go to="projet" className={cn(btnDark, "h-12 w-full")}>
        Prendre rendez-vous
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--encre) text-white/65">
      <div className={cn("grid gap-10 py-16 @min-[900px]:grid-cols-[1.5fr_1fr_1fr_1.2fr]", pad)}>
        <div className="text-white">
          <Logo light />
          <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-white/60">
            Maisons individuelles, extensions et rénovations complètes dans le Saulnois et autour de
            Metz et Nancy.
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
          <p className="font-semibold text-white">Agence</p>
          <p className="mt-3 leading-relaxed">
            Sur rendez-vous, du lundi au samedi
            <br />
            Château-Salins (57)
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-semibold text-white">{PHONE}</p>
          <p className="mt-1">contact@maisons-oree-exemple.fr</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Maisons Orée</span>
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

function PageTitle({ crumb, title, intro }: { crumb: string; title: string; intro?: string }) {
  return (
    <div className={cn("bg-(--brume) pt-12 pb-14 @min-[900px]:pt-16 @min-[900px]:pb-20", pad)}>
      <p className="text-[14px] text-black/50">
        <Go to="home" className="hover:text-black">
          Accueil
        </Go>{" "}
        / <span className="text-black/75">{crumb}</span>
      </p>
      <h1
        className={cn(
          serif,
          "mt-5 max-w-[860px] text-[40px] leading-[1.02] tracking-[-0.02em] text-balance @min-[900px]:text-[66px]",
        )}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-[620px] text-[17.5px] leading-relaxed text-black/60">{intro}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------ Étapes interactives */

function Timeline({ withPhoto = true }: { withPhoto?: boolean }) {
  const [active, setActive] = useState("terrain");
  const i = steps.findIndex((s) => s.id === active);
  const s = steps[i];
  return (
    <div>
      <ol className="relative grid grid-cols-5 gap-2">
        <span
          className="absolute top-[11px] right-[10%] left-[10%] h-px bg-black/15"
          aria-hidden="true"
        />
        <span
          className="absolute top-[11px] left-[10%] h-px bg-(--ardoise) transition-[width] duration-500"
          style={{ width: `${i * 20}%` }}
          aria-hidden="true"
        />
        {steps.map((st, k) => (
          <li key={st.id} className="relative text-center">
            <button
              type="button"
              onClick={() => setActive(st.id)}
              aria-pressed={st.id === active}
              className="group w-full"
            >
              <span
                className={cn(
                  "mx-auto grid size-[23px] place-items-center rounded-full border-2 bg-white transition-colors",
                  k <= i
                    ? "border-(--ardoise) bg-(--ardoise)"
                    : "border-black/20 group-hover:border-black/45",
                )}
              >
                {k < i && <Check className="size-3 text-white" />}
              </span>
              <span
                className={cn(
                  "mt-3 block text-[12px] leading-tight font-semibold @min-[900px]:text-[16px]",
                  st.id === active ? "text-(--encre)" : "text-black/50",
                )}
              >
                {st.t}
              </span>
              <span className="mt-0.5 hidden text-[13px] text-black/45 @min-[900px]:block">
                {st.time}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div
        className={cn(
          "mt-10 grid gap-8",
          withPhoto &&
            "@min-[900px]:grid-cols-[1fr_1.1fr] @min-[900px]:items-center @min-[900px]:gap-14",
        )}
      >
        <div>
          <p className="text-[14.5px] font-semibold text-(--ardoise)">
            Étape {i + 1} sur 5, {s.time.toLowerCase()}
          </p>
          <p className={cn(serif, "mt-3 text-[34px] leading-tight")}>{s.t}</p>
          <p className="mt-3 max-w-[480px] text-[17px] leading-relaxed text-black/62">{s.d}</p>
          {i < steps.length - 1 && (
            <button
              type="button"
              onClick={() => setActive(steps[i + 1].id)}
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-(--ardoise) hover:underline"
            >
              Étape suivante : {steps[i + 1].t.toLowerCase()} <ArrowRight className="size-4" />
            </button>
          )}
        </div>
        {withPhoto && (
          <div className="relative h-[240px] overflow-hidden rounded-[4px] @min-[900px]:h-[340px]">
            <Photo key={s.src} src={s.src} alt={s.t} sizes="(min-width: 1024px) 600px, 100vw" />
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      {/* Premier écran : la maison en grand, la promesse en serif */}
      <section className="grid @min-[900px]:min-h-[620px] @min-[900px]:grid-cols-[1.35fr_1fr]">
        <div className="relative h-[300px] @min-[900px]:h-auto">
          <Photo
            src="con-hero"
            alt="Maison à pignon vitré avec volets en bois"
            priority
            sizes="(min-width: 1024px) 760px, 100vw"
            position="50% 40%"
          />
          <p className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-[13.5px] @min-[900px]:left-16">
            Orée 130, livrée à Dieuze en 2025
          </p>
        </div>
        <div
          className={cn(
            "flex flex-col justify-center bg-(--brume) px-5 py-12 @min-[900px]:py-0 @min-[900px]:pr-16 @min-[900px]:pl-14",
          )}
        >
          <h1
            className={cn(
              serif,
              "text-[42px] leading-[1.02] tracking-[-0.02em] text-balance @min-[900px]:text-[64px]",
            )}
          >
            Votre maison, du terrain aux clés.
          </h1>
          <p className="mt-6 max-w-[420px] text-[17.5px] leading-relaxed text-black/62">
            Maisons sur mesure et rénovations complètes dans le Saulnois. Un seul interlocuteur, un
            prix ferme avant le permis, des photos du chantier chaque semaine.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Go to="projet" className={btnDark}>
              Prendre rendez-vous
            </Go>
            <Go to="maisons" className={btnLine}>
              Voir nos maisons
            </Go>
          </div>
          <p className="mt-10 flex items-center gap-2 border-t border-black/10 pt-6 text-[14.5px] text-black/55">
            <GoogleG className="size-5" /> <b className="text-(--encre)">4,9</b>{" "}
            <Stars className="text-[14px]" /> 87 avis de propriétaires
          </p>
        </div>
      </section>

      {/* Étapes */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2 className="max-w-[640px]">Douze à seize mois, cinq étapes, un seul interlocuteur.</H2>
          <Go
            to="methode"
            className="inline-flex items-center gap-2 text-[15.5px] font-semibold text-(--ardoise) hover:underline"
          >
            Notre méthode en détail <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="mt-14">
          <Timeline />
        </div>
      </section>

      {/* Maisons */}
      <section className={cn("bg-(--brume) py-16 @min-[900px]:py-24", pad)}>
        <H2>Trois maisons pour commencer, toutes modifiables</H2>
        <div className="mt-12 grid gap-8 @min-[900px]:grid-cols-3">
          {models.map((m) => (
            <Go key={m.id} to="maisons" param={m.id} className="group text-left">
              <span className="relative block aspect-[4/3] overflow-hidden rounded-[4px]">
                <Photo
                  src={m.src}
                  alt={`Maison ${m.name}`}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-5 flex items-baseline justify-between gap-3">
                <span className={cn(serif, "text-[28px]")}>{m.name}</span>
                <span className="text-[14px] text-black/55">{m.kind}</span>
              </span>
              <span className="mt-1 block text-[15px] text-black/60">
                {m.m2} m², {m.rooms} chambres, à partir de {m.from}
              </span>
            </Go>
          ))}
        </div>
        <p className="mt-8 text-[13.5px] text-black/50">
          Prix TTC indicatifs, hors terrain, raccordements et aménagements extérieurs.
        </p>
      </section>

      {/* Rénovation */}
      <section className="grid @min-[900px]:grid-cols-[1fr_1fr]">
        <div className="relative h-[280px] @min-[900px]:h-[560px]">
          <Photo
            src="con-renovation"
            alt="Maison en rénovation complète, étais en place"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </div>
        <div
          className={cn(
            "flex flex-col justify-center py-14 @min-[900px]:py-0 @min-[900px]:pl-16",
            pad,
          )}
        >
          <H2>Une maison ancienne à reprendre entièrement&nbsp;?</H2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-black/62">
            En entreprise générale, nous coordonnons tous les corps de métier : gros œuvre, toiture,
            menuiseries, isolation, plomberie, électricité et finitions. Vous signez un seul
            contrat.
          </p>
          <ul className="mt-7 grid max-w-[480px] grid-cols-2 gap-x-6 gap-y-3 text-[15.5px]">
            {[
              "Rénovation complète",
              "Extension",
              "Surélévation",
              "Mise aux normes",
              "Rénovation énergétique",
              "Aménagement de combles",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <Check className="size-4 text-(--ardoise)" /> {t}
              </li>
            ))}
          </ul>
          <Go to="renovation" className={cn(btnLine, "mt-9 self-start")}>
            Rénovation et extension
          </Go>
        </div>
      </section>

      {/* Avis */}
      <section className={cn("bg-(--encre) py-16 text-white @min-[900px]:py-24", pad)}>
        <div className="grid gap-12 @min-[900px]:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.n} className="border-t border-white/20 pt-6">
              <blockquote className={cn(serif, "text-[22px] leading-snug")}>« {r.t} »</blockquote>
              <figcaption className="mt-5 text-[14.5px] text-white/60">
                {r.n}, {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ProjectBand />
      <Footer />
      <MobileBar />
    </>
  );
}

function ProjectBand() {
  return (
    <section className={cn("py-16 @min-[900px]:py-24", pad)}>
      <div className="grid gap-8 @min-[900px]:grid-cols-[1.4fr_1fr] @min-[900px]:items-end">
        <H2>
          Un premier rendez-vous d&apos;une heure, sans engagement, avec votre terrain et votre
          budget.
        </H2>
        <div className="@min-[900px]:text-right">
          <Go to="projet" className={btnDark}>
            Préparer mon rendez-vous
          </Go>
          <p className="mt-3 text-[14.5px] text-black/55">Ou appelez le {PHONE}</p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Nos maisons */

function Maisons() {
  const { param } = useSite();
  const [id, setId] = useState(models.find((m) => m.id === param)?.id ?? models[0].id);
  const m = models.find((x) => x.id === id) ?? models[0];
  return (
    <>
      <PageTitle
        crumb="Nos maisons"
        title="Trois points de départ, une maison à vous"
        intro="Chaque modèle s'adapte au terrain, à l'orientation et à votre façon de vivre. Le prix ferme est donné avec les plans, avant le permis."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <Pick
          options={models.map((x) => x.name)}
          value={m.name}
          onChange={(n) => setId(models.find((x) => x.name === n)?.id ?? id)}
          itemClassName="h-11 rounded-full px-5 text-[15px] font-medium ring-1 ring-inset ring-black/15 aria-pressed:bg-(--encre) aria-pressed:text-white aria-pressed:ring-(--encre)"
        />
        <div className="mt-10 grid gap-10 @min-[900px]:grid-cols-[1.5fr_1fr] @min-[900px]:gap-14">
          <div className="relative h-[280px] overflow-hidden rounded-[4px] @min-[900px]:h-[480px]">
            <Photo
              key={m.src}
              src={m.src}
              alt={`Maison ${m.name}`}
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>
          <div>
            <p className="text-[15px] text-black/55">{m.kind}</p>
            <p className={cn(serif, "mt-1 text-[48px] leading-none")}>{m.name}</p>
            <p className="mt-5 text-[17px] leading-relaxed text-black/62">{m.d}</p>
            <dl className="mt-8 grid grid-cols-3 border-y border-black/10 py-6 text-center">
              {[
                [`${m.m2} m²`, "habitables"],
                [String(m.rooms), "chambres"],
                [m.from, "à partir de"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-[13.5px] text-black/50">{l}</dt>
                  <dd className="mt-1 text-[20px] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 space-y-2.5 text-[15.5px]">
              {[
                "Réglementation environnementale RE2020",
                "Pompe à chaleur et plancher chauffant",
                "Menuiseries alu à rupture de pont thermique",
                "Garage ou carport en option",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Check className="size-4 text-(--ardoise)" /> {t}
                </li>
              ))}
            </ul>
            <Go to="projet" className={cn(btnDark, "mt-8")}>
              En parler en rendez-vous
            </Go>
          </div>
        </div>
      </section>
      <section className={cn("bg-(--brume) py-14 @min-[900px]:py-20", pad)}>
        <H2>Livrées récemment</H2>
        <div className="mt-10 grid gap-6 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-4">
          {[
            ["con-neuve", "Morhange"],
            ["con-plainpied", "Delme"],
            ["con-baie", "Vic-sur-Seille"],
            ["con-sejour", "Dieuze"],
          ].map(([src, c]) => (
            <figure key={src}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
                <Photo
                  src={src}
                  alt={`Maison livrée à ${c}`}
                  sizes="(min-width: 1024px) 300px, 100vw"
                />
              </div>
              <figcaption className="mt-3 text-[14.5px] text-black/60">{c}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------------------------------------------------------- Rénovation */

function Renovation() {
  return (
    <>
      <PageTitle
        crumb="Rénovation et extension"
        title="Rénover entièrement, agrandir, surélever"
        intro="Une entreprise générale qui coordonne tous les corps de métier, avec un contrat, un planning et un interlocuteur."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="relative h-[300px] overflow-hidden rounded-[4px] @min-[900px]:h-[520px]">
          <Photo
            src="con-renovation"
            alt="Rénovation complète d'une maison"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
        <div>
          <h2 className={cn(serif, "text-[32px] leading-tight")}>Ce que nous coordonnons</h2>
          <ul className="mt-6 divide-y divide-black/8 border-y border-black/8">
            {[
              ["Diagnostic de départ", "Structure, humidité, réseaux et performance énergétique."],
              ["Gros œuvre", "Ouvertures, reprises, dalles, extension maçonnée ou bois."],
              [
                "Clos et couvert",
                "Toiture, menuiseries, isolation par l'intérieur ou l'extérieur.",
              ],
              ["Second œuvre", "Plomberie, électricité, chauffage, plâtrerie, sols, peinture."],
              ["Suivi", "Réunion de chantier hebdomadaire et compte rendu envoyé le jour même."],
            ].map(([t, d]) => (
              <li key={t} className="py-4">
                <p className="text-[17px] font-semibold">{t}</p>
                <p className="mt-1 text-[15px] text-black/58">{d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-relaxed text-black/60">
            Pour une rénovation énergétique, nous vous orientons vers un accompagnateur France
            Rénov&apos; et intégrons ses préconisations au devis.
          </p>
          <Go to="projet" className={cn(btnDark, "mt-8")}>
            Parler de ma rénovation
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Méthode */

function Methode() {
  return (
    <>
      <PageTitle
        crumb="Méthode et garanties"
        title="Comment se passe votre projet"
        intro="Cinq étapes, des délais annoncés et les garanties prévues par la loi pour un contrat de construction de maison individuelle."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <Timeline />
      </section>
      <section className={cn("bg-(--brume) py-14 @min-[900px]:py-20", pad)}>
        <div className="grid gap-12 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-16">
          <div>
            <H2>Les garanties de votre contrat</H2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-black/60">
              Pour une maison neuve, nous signons un contrat de construction de maison individuelle
              (CCMI). La loi y attache les garanties ci-contre. Votre conseiller vous remet les
              attestations avant la signature.
            </p>
          </div>
          <dl className="divide-y divide-black/10 border-y border-black/10">
            {[
              [
                "Garantie de livraison",
                "Si le constructeur fait défaut, un garant fait achever la maison au prix et dans les délais convenus.",
              ],
              [
                "Assurance dommages-ouvrage",
                "Les réparations relevant de la décennale sont préfinancées sans attendre de décision de justice.",
              ],
              [
                "Parfait achèvement, 1 an",
                "Tous les défauts signalés à la réception ou dans l'année sont repris.",
              ],
              [
                "Bon fonctionnement, 2 ans",
                "Les équipements dissociables : volets, robinetterie, radiateurs.",
              ],
              [
                "Décennale, 10 ans",
                "Les dommages qui touchent la solidité ou rendent la maison inhabitable.",
              ],
            ].map(([t, d]) => (
              <div
                key={t}
                className="grid gap-1 py-5 @min-[900px]:grid-cols-[220px_1fr] @min-[900px]:gap-6"
              >
                <dt className="text-[16.5px] font-semibold">{t}</dt>
                <dd className="text-[15.5px] leading-relaxed text-black/60">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section
        className={cn(
          "grid gap-4 py-14 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-4 @min-[900px]:py-20",
          pad,
        )}
      >
        {[
          ["con-fondations", "Fondations"],
          ["con-murs", "Élévation des murs"],
          ["con-charpente", "Charpente"],
          ["con-echafaudage", "Hors d'eau, hors d'air"],
        ].map(([src, t]) => (
          <figure key={src}>
            <div className="relative aspect-square overflow-hidden rounded-[4px]">
              <Photo src={src} alt={t} sizes="(min-width: 1024px) 300px, 100vw" />
            </div>
            <figcaption className="mt-3 text-[15px] font-medium">{t}</figcaption>
          </figure>
        ))}
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------------- Votre projet */

const projectKinds = ["Maison neuve", "Extension", "Rénovation complète"] as const;
const land = ["J'ai un terrain", "Je cherche un terrain"] as const;
const budgets = ["Moins de 200 k€", "200 à 280 k€", "280 à 350 k€", "Plus de 350 k€"] as const;
const rates = { "Maison neuve": 1950, Extension: 2300, "Rénovation complète": 1350 };
const months = {
  "Maison neuve": [2, 1, 3, 9],
  Extension: [1, 1, 2, 4],
  "Rénovation complète": [1, 1, 1, 6],
};

function Projet() {
  const [kind, setKind] = useState<(typeof projectKinds)[number]>("Maison neuve");
  const [m2, setM2] = useState(120);
  const [hasLand, setHasLand] = useState<(typeof land)[number]>("J'ai un terrain");
  const [budget, setBudget] = useState<(typeof budgets)[number]>("200 à 280 k€");
  const min = kind === "Extension" ? 15 : 60;
  const max = kind === "Extension" ? 60 : 220;
  const area = Math.min(Math.max(m2, min), max);
  const mid = rates[kind] * area;
  const k = (n: number) => `${Math.round(n / 1000).toLocaleString("fr-FR")} 000 €`;
  const plan = months[kind];
  const total = plan.reduce((a, b) => a + b, 0);
  const chip =
    "h-11 rounded-full px-5 text-[15px] font-medium ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--encre) aria-pressed:text-white aria-pressed:ring-(--encre)";
  const field =
    "mt-2 h-12 w-full rounded-[4px] bg-white px-4 text-[16px] ring-1 ring-black/15 outline-none placeholder:text-black/35 focus:ring-2 focus:ring-(--ardoise)";
  return (
    <>
      <PageTitle
        crumb="Votre projet"
        title="Préparer votre premier rendez-vous"
        intro="Une première idée du budget et du calendrier, puis le rendez-vous à l'agence ou sur votre terrain."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="space-y-8">
          <div>
            <p className="text-[15px] font-semibold">Votre projet</p>
            <Pick
              options={projectKinds}
              value={kind}
              onChange={setKind}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              Surface <span className="text-(--ardoise)">{area} m²</span>
            </span>
            <input
              type="range"
              min={min}
              max={max}
              value={area}
              onChange={(e) => setM2(Number(e.target.value))}
              className="mt-4 w-full accent-(--ardoise)"
            />
          </label>
          <div className="rounded-[4px] bg-(--brume) p-6">
            <p className="text-[14.5px] text-black/55">Budget indicatif des travaux, TTC</p>
            <p className={cn(serif, "mt-2 text-[44px] leading-none")}>
              {k(mid * 0.9)} – {k(mid * 1.1)}
            </p>
            <p className="mt-6 text-[14.5px] text-black/55">Calendrier, environ {total} mois</p>
            <div className="mt-3 flex h-9 overflow-hidden rounded-[4px] text-[12.5px] font-medium text-white">
              {["Plans", "Validation", "Permis", "Travaux"].map((t, i) => (
                <span
                  key={t}
                  className="flex items-center justify-center px-1"
                  style={{
                    width: `${(plan[i] / total) * 100}%`,
                    backgroundColor: ["#8fa6ba", "#6a8aa6", "#4c6c88", "#18222b"][i],
                  }}
                >
                  {plan[i] >= 2 ? t : ""}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-black/50">
              Hors terrain et raccordements. Le prix ferme est donné avec les plans.
            </p>
          </div>
        </div>
        <div>
          <h2 className={cn(serif, "text-[32px] leading-tight")}>Votre rendez-vous</h2>
          <DemoForm
            success={{
              title: "Demande envoyée",
              text: `${kind}, environ ${area} m² : votre conseiller vous appelle sous 48 h pour fixer le rendez-vous. Pensez à apporter le plan cadastral si vous l'avez.`,
            }}
            submit="Demander mon rendez-vous"
            submitClassName={cn(btnDark, "mt-8 w-full")}
            className="mt-6"
          >
            <p className="text-[15px] font-semibold">Terrain</p>
            <Pick
              options={land}
              value={hasLand}
              onChange={setHasLand}
              className="mt-3"
              itemClassName={chip}
            />
            <p className="mt-6 text-[15px] font-semibold">Budget global</p>
            <Pick
              options={budgets}
              value={budget}
              onChange={setBudget}
              className="mt-3"
              itemClassName={chip}
            />
            <div className="mt-6 grid gap-5 @min-[600px]:grid-cols-2">
              <label className="block">
                <span className="text-[15px] font-semibold">
                  {hasLand === "J'ai un terrain" ? "Commune du terrain" : "Communes souhaitées"}
                </span>
                <input className={field} placeholder="Château-Salins" />
              </label>
              <label className="block">
                <span className="text-[15px] font-semibold">Téléphone</span>
                <input className={field} type="tel" placeholder="06 00 00 00 00" />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-[15px] font-semibold">Nom</span>
              <input className={field} placeholder="Votre nom" />
            </label>
          </DemoForm>
        </div>
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
        intro="Maisons Orée est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits
          photos={[
            "con-hero",
            "con-moderne",
            "con-patio",
            "con-plainpied",
            "con-neuve",
            "con-baie",
            "con-sejour",
            "con-renovation",
            "con-fondations",
            "con-murs",
            "con-charpente",
            "con-echafaudage",
            "con-plans",
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
        { id: "maisons", label: "Nos maisons", path: "/nos-maisons", render: () => <Maisons /> },
        {
          id: "renovation",
          label: "Rénovation et extension",
          path: "/renovation",
          render: () => <Renovation />,
        },
        {
          id: "methode",
          label: "Méthode et garanties",
          path: "/methode",
          render: () => <Methode />,
        },
        { id: "projet", label: "Votre projet", path: "/votre-projet", render: () => <Projet /> },
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
