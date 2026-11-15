"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Archivo } from "next/font/google";
import {
  ArrowRight,
  Camera,
  Check,
  CircleAlert,
  FileText,
  Menu,
  Phone,
  Umbrella,
  X,
} from "lucide-react";
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
 * Toitures Horizon, couvreur à Hayange (entreprise fictive).
 * Le site d'un couvreur de vallée : ardoise et zinc, titres larges comme une ligne de faîtage,
 * l'urgence fuite toujours à portée, un diagnostic en trois questions.
 */

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 47 19";

const vars = {
  "--ardoise": "#1d262d",
  "--ardoise-2": "#27323a",
  "--zinc": "#8a979f",
  "--brume": "#eef1f3",
  "--tuile": "#b4472a",
  "--ink-text": "#1d262d",
  fontFamily: archivo.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";
/** Titres larges (axe de chasse de la police). */
const wide = "font-extrabold tracking-[-0.025em] [font-stretch:122%]";

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-[4px] px-6 text-[15.5px] font-semibold transition-colors";

/* ---------------------------------------------------------------- Données */

const roofs = [
  { t: "Tuiles terre cuite", src: "cou-terre-cuite", rate: 1 },
  { t: "Tuiles béton", src: "cou-tuiles-noires", rate: 0.9 },
  { t: "Ardoise", src: "cou-ardoise", rate: 1.45 },
  { t: "Zinc", src: "cou-zinc", rate: 1.3 },
] as const;
type Roof = (typeof roofs)[number]["t"];

const issues = [
  "Fuite ou tache au plafond",
  "Tuiles ou ardoises cassées",
  "Mousse et lichens",
  "Gouttière qui déborde",
  "Toit ancien à refaire",
] as const;
type Issue = (typeof issues)[number];

const ages = ["Moins de 15 ans", "15 à 30 ans", "30 à 50 ans", "Plus de 50 ans"] as const;
type Age = (typeof ages)[number];

function diagnose(roof: Roof, issue: Issue, age: Age) {
  const old = age === "30 à 50 ans" || age === "Plus de 50 ans";
  const r = roofs.find((x) => x.t === roof)?.rate ?? 1;
  const eur = (a: number, b: number) =>
    `${Math.round((a * r) / 50) * 50} – ${Math.round((b * r) / 50) * 50} €`.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      " ",
    );
  if (
    issue === "Toit ancien à refaire" ||
    (age === "Plus de 50 ans" && issue !== "Gouttière qui déborde")
  )
    return {
      t: "Réfection complète de la couverture",
      d: "Dépose, contrôle de la charpente, écran sous toiture et nouvelle couverture. C'est aussi le moment d'isoler par l'extérieur.",
      p: `${eur(120, 190)} par m²`,
      w: "Visite sous 10 jours, chantier de 1 à 3 semaines",
    };
  if (issue === "Fuite ou tache au plafond")
    return old
      ? {
          t: "Recherche de fuite et remplacement partiel",
          d: "Sur un toit de cet âge, la fuite vient souvent des fixations ou de l'écran usé : on remplace la zone touchée et on vous dit ce qui tiendra encore.",
          p: eur(600, 2400),
          w: "Bâchage sous 24 h si besoin, réparation sous 2 semaines",
        }
      : {
          t: "Recherche de fuite et réparation",
          d: "Solin, faîtage ou élément déplacé : la plupart des fuites se réparent en une demi-journée.",
          p: eur(250, 900),
          w: "Intervention sous 72 h",
        };
  if (issue === "Tuiles ou ardoises cassées")
    return {
      t: "Remplacement des éléments abîmés",
      d: "On remplace à l'identique et on contrôle le reste du pan : photos à l'appui.",
      p: eur(180, 650),
      w: "Intervention sous 1 semaine",
    };
  if (issue === "Mousse et lichens")
    return {
      t: "Démoussage et traitement hydrofuge",
      d: "Nettoyage à basse pression, traitement anti-mousse puis hydrofuge incolore. Garanti 10 ans.",
      p: `${eur(14, 24)} par m²`,
      w: "D'avril à octobre, par temps sec",
    };
  return {
    t: "Remplacement des gouttières en zinc",
    d: "Gouttières et descentes en zinc façonnées sur place, crochets inox, raccordement aux évacuations.",
    p: `${eur(45, 75)} par mètre`,
    w: "Pose en 1 à 2 jours",
  };
}

const works = [
  {
    src: "cou-mansarde",
    pos: "50% 82%",
    t: "Ardoise et lucarnes",
    c: "Thionville",
    m: "Ardoise",
    s: "180 m², 3 semaines",
  },
  {
    src: "cou-maison",
    t: "Tuiles plates anciennes",
    c: "Fontoy",
    m: "Tuiles",
    s: "140 m², 2 semaines",
  },
  {
    src: "cou-neuf",
    t: "Deux maisons neuves",
    c: "Florange",
    m: "Tuiles",
    s: "2 × 110 m², 10 jours",
  },
  {
    src: "cou-zinc",
    t: "Toiture zinc à joints debout",
    c: "Hayange",
    m: "Zinc",
    s: "220 m², 4 semaines",
  },
  {
    src: "cou-ecailles",
    t: "Ardoise en écailles",
    c: "Knutange",
    m: "Ardoise",
    s: "Tourelle, 9 jours",
  },
  {
    src: "cou-velux",
    t: "Fenêtres de toit",
    c: "Algrange",
    m: "Ardoise",
    s: "3 fenêtres, 2 jours",
  },
];

const reviews = [
  {
    n: "Sébastien",
    c: "Knutange",
    t: "Fuite un samedi de tempête : toit bâché le dimanche matin, réparé le jeudi. Les photos avant et après étaient dans la facture.",
  },
  {
    n: "Isabelle",
    c: "Thionville",
    t: "Réfection complète en ardoise. On voyait l'avancement du chantier chaque soir dans l'espace client, sans avoir à appeler.",
  },
  {
    n: "Marc",
    c: "Fontoy",
    t: "Devis clair poste par poste, et l'équipe a laissé le jardin plus propre qu'à son arrivée.",
  },
];

/* ------------------------------------------------------------ Éléments */

function Logo({ light }: { light?: boolean }) {
  return (
    <Go to="home" className="flex items-center gap-3 text-left" label="Toitures Horizon, accueil">
      <svg viewBox="0 0 40 24" className="h-6 w-10" aria-hidden="true">
        <path
          d="M2 22 L20 4 L38 22"
          fill="none"
          stroke={light ? "#fff" : "var(--ardoise)"}
          strokeWidth="3.5"
          strokeLinejoin="miter"
        />
        <path d="M27 11 V5 h4 v10" fill={light ? "#fff" : "var(--ardoise)"} />
      </svg>
      <span className="leading-none">
        <span className={cn(wide, "block text-[19px]")}>Toitures Horizon</span>
        <span className={cn("mt-1 block text-[12.5px]", light ? "text-white/60" : "text-black/50")}>
          Couvreur à Hayange
        </span>
      </span>
    </Go>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-(--ardoise) text-white">
      <div className={cn("flex h-19 items-center gap-8", pad)}>
        <Logo light />
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {nav
            .filter((p) => p.id !== "urgence" && p.id !== "contact")
            .map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(p.id)}
                aria-current={p.id === page ? "page" : undefined}
                className="py-2 text-[15px] text-white/70 hover:text-white aria-[current=page]:text-white aria-[current=page]:shadow-[inset_0_-2px_0_white]"
              >
                {p.label}
              </button>
            ))}
        </nav>
        <Go
          to="urgence"
          className="ml-auto hidden items-center gap-2 text-[15px] font-semibold text-[#f08a6c] hover:text-white @min-[900px]:inline-flex @min-[1100px]:ml-0"
        >
          <Umbrella className="size-4.5" /> Urgence fuite
        </Go>
        <Go
          to="contact"
          className={cn(
            btn,
            "hidden h-11 bg-white px-5 text-(--ardoise) hover:bg-white/90 @min-[900px]:inline-flex",
          )}
        >
          Devis gratuit
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid size-11 place-items-center @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-5 pb-5 @min-[1100px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className={cn(
                wide,
                "flex w-full items-center justify-between border-b border-white/10 py-4 text-[20px]",
              )}
            >
              {p.label} <ArrowRight className="size-5 opacity-50" />
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

/** Barre d'appel collée en bas, sur téléphone seulement. */
function MobileBar() {
  return (
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/10 bg-white p-3 @min-[900px]:hidden">
      <Go to="urgence" className={cn(btn, "h-12 bg-(--tuile) text-[15px] text-white")}>
        <Phone className="size-4" /> Urgence fuite
      </Go>
      <Go to="contact" className={cn(btn, "h-12 bg-(--ardoise) text-[15px] text-white")}>
        Devis gratuit
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--ardoise) text-white/60">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.5fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <Logo light />
          <p className="mt-5 max-w-[320px] text-[14.5px] leading-relaxed">
            Couverture, zinguerie et fenêtres de toit dans la vallée de la Fensch et le pays
            thionvillois, depuis 1998.
          </p>
          <p className="mt-5 text-[13.5px]">Qualibat couverture · RGE · Garantie décennale</p>
        </div>
        <div className="text-[14.5px]">
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
        <div className="text-[14.5px] leading-relaxed">
          <p className="font-semibold text-white">Horaires</p>
          <p className="mt-3">
            Lundi au vendredi, 7 h 30 – 18 h
            <br />
            Samedi matin pour les visites
            <br />
            Urgence fuite 7 jours sur 7
          </p>
        </div>
        <div className="text-[14.5px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className={cn(wide, "mt-3 text-[22px] text-white")}>{PHONE}</p>
          <p className="mt-1">contact@toitures-horizon-exemple.fr</p>
          <p className="mt-1">Dépôt à Hayange (57)</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-3 border-t border-white/10 py-5 text-[13px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-5">
          <span>© 2026 Toitures Horizon</span>
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
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-(--ardoise) pt-12 pb-14 text-white @min-[900px]:pt-16 @min-[900px]:pb-20",
        pad,
      )}
    >
      <h1
        className={cn(
          wide,
          "max-w-[900px] text-[34px] leading-[1.02] text-balance @min-[900px]:text-[58px]",
        )}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-white/65">{intro}</p>
      )}
      {children}
    </div>
  );
}

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        wide,
        "text-[28px] leading-[1.05] text-balance @min-[900px]:text-[42px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      <section className="bg-(--ardoise) text-white">
        <div
          className={cn(
            "grid gap-10 pt-12 pb-12 @min-[900px]:grid-cols-[2fr_1fr] @min-[900px]:gap-14 @min-[900px]:pt-12 @min-[900px]:pb-12",
            pad,
          )}
        >
          <div>
            <h1
              className={cn(
                wide,
                "text-[40px] leading-[0.98] text-balance @min-[900px]:text-[56px]",
              )}
            >
              Votre toit réparé avant la prochaine pluie.
            </h1>
            <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-white/70">
              Tuiles, ardoise et zinc à Hayange et dans toute la vallée de la Fensch. Visite et
              photos de votre toit offertes, devis sous 5 jours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Go
                to="diagnostic"
                className={cn(btn, "bg-white text-(--ardoise) hover:bg-white/90")}
              >
                Faire le diagnostic de mon toit
              </Go>
              <Go
                to="contact"
                className={cn(btn, "text-white ring-1 ring-white/35 ring-inset hover:ring-white")}
              >
                Demander un devis
              </Go>
            </div>
          </div>
          <Go
            to="urgence"
            className="group flex flex-col justify-between self-end rounded-[6px] bg-(--tuile) p-6 text-left"
          >
            <span className="flex items-center gap-2 text-[15px] font-semibold">
              <Umbrella className="size-5" /> Une fuite en ce moment ?
            </span>
            <span className="mt-4 block">
              <span className={cn(wide, "block text-[30px] leading-none")}>Bâché sous 24 h</span>
              <span className="mt-3 block text-[15px] text-white/85">
                7 jours sur 7, même le dimanche. Appelez le{" "}
                <span className="whitespace-nowrap">{PHONE}</span>.
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold underline underline-offset-4">
                Que faire en attendant{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Go>
        </div>
        <div className="relative h-[300px] @min-[900px]:h-[440px]">
          <Photo
            src="cou-hero"
            alt="Deux couvreurs posent des tuiles sur les liteaux d'un toit en réfection"
            priority
            sizes="100vw"
            position="50% 45%"
          />
          <ul
            className={cn(
              "absolute inset-x-0 bottom-0 hidden grid-cols-4 bg-[linear-gradient(0deg,rgb(29_38_45/0.85),rgb(29_38_45/0))] pt-16 pb-6 text-white @min-[900px]:grid",
              pad,
            )}
          >
            {[
              "Couverture neuve et réfection",
              "Recherche de fuite",
              "Zinguerie et gouttières",
              "Fenêtres de toit",
            ].map((t) => (
              <li key={t} className="border-l border-white/30 pl-4 text-[15px] font-medium">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Diagnostic : entrée par le matériau du toit */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <H2 className="max-w-[640px]">De quoi est fait votre toit ?</H2>
          <p className="max-w-[380px] text-[16px] leading-relaxed text-black/60">
            Trois questions et vous avez une première idée des travaux, du prix et du délai.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 @min-[900px]:grid-cols-4 @min-[900px]:gap-5">
          {roofs.map((r) => (
            <Go key={r.t} to="diagnostic" param={r.t} className="group block text-left">
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[6px]">
                <Photo
                  src={r.src}
                  alt={r.t}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="mt-3 flex items-center justify-between text-[17px] font-semibold">
                {r.t}{" "}
                <ArrowRight className="size-4 opacity-40 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
              </span>
            </Go>
          ))}
        </div>
      </section>

      {/* Réalisations */}
      <section className={cn("bg-(--brume) py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <H2>Chantiers récents</H2>
          <Go
            to="realisations"
            className="inline-flex items-center gap-2 text-[15.5px] font-semibold underline underline-offset-4"
          >
            Toutes les réalisations <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="mt-10 grid gap-5 @min-[900px]:grid-cols-[1.5fr_1fr]">
          <WorkTile w={works[0]} big />
          <div className="grid gap-5">
            <WorkTile w={works[1]} />
            <WorkTile w={works[4]} />
          </div>
        </div>
      </section>

      {/* Garanties : ce que le client reçoit vraiment */}
      <section
        className={cn(
          "grid gap-12 py-16 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20 @min-[900px]:py-24",
          pad,
        )}
      >
        <div>
          <H2>Vous voyez votre toit avant, pendant et après.</H2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-black/60">
            On ne vous demande pas de monter sur l&apos;échelle : chaque étape est photographiée et
            vous la retrouvez dans votre espace client.
          </p>
          <Go
            to="suivi"
            className="mt-7 inline-flex items-center gap-2 text-[15.5px] font-semibold underline underline-offset-4"
          >
            Voir un exemple de suivi de chantier <ArrowRight className="size-4" />
          </Go>
        </div>
        <ol className="grid gap-8 @min-[700px]:grid-cols-3">
          {[
            ["Avant", "Visite gratuite, photos du toit et devis détaillé par poste sous 5 jours."],
            ["Pendant", "Photos chaque soir, toit bâché si la pluie arrive, chantier rangé."],
            ["Après", "Photos de réception, garantie décennale et rappel d'entretien à 5 ans."],
          ].map(([t, d], i) => (
            <li key={t} className="border-t-[3px] border-(--ardoise) pt-5">
              <span className="text-[14px] text-black/50">{i + 1}</span>
              <p className={cn(wide, "mt-1 text-[24px]")}>{t}</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-black/62">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Avis */}
      <section className={cn("bg-(--ardoise-2) py-16 text-white @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-center gap-4">
          <GoogleG className="size-6" />
          <span className={cn(wide, "text-[34px]")}>4,8</span>
          <Stars className="text-[18px]" />
          <span className="text-[15px] text-white/60">sur 76 avis Google</span>
        </div>
        <div className="mt-10 grid gap-10 @min-[900px]:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.n} className="border-t border-white/20 pt-6">
              <blockquote className="text-[17px] leading-relaxed">« {r.t} »</blockquote>
              <figcaption className="mt-4 text-[14px] text-white/55">
                {r.n}, {r.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <QuoteBand />
      <Footer />
      <MobileBar />
    </>
  );
}

function WorkTile({
  w,
  big = false,
}: {
  w: { src: string; t: string; c: string; s: string; pos?: string };
  big?: boolean;
}) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[6px]",
        big ? "min-h-[340px] @min-[900px]:min-h-[520px]" : "min-h-[250px]",
      )}
    >
      <Photo
        src={w.src}
        alt={w.t}
        position={w.pos}
        sizes={big ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 460px, 100vw"}
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(29_38_45/0.85),rgb(29_38_45/0))] px-5 pt-14 pb-5 text-white">
        <span className={cn(wide, "block text-[20px]")}>{w.t}</span>
        <span className="text-[14px] text-white/75">
          {w.c}, {w.s}
        </span>
      </figcaption>
    </figure>
  );
}

function QuoteForm({ dark = false, initial }: { dark?: boolean; initial?: string }) {
  const [roof, setRoof] = useState<Roof>(
    roofs.some((r) => r.t === initial) ? (initial as Roof) : "Tuiles terre cuite",
  );
  const field = cn(
    "mt-2 h-12 w-full rounded-[4px] px-4 text-[16px] outline-none ring-1 ring-inset focus:ring-2",
    dark
      ? "bg-white/8 text-white ring-white/20 placeholder:text-white/35"
      : "bg-white ring-black/15 placeholder:text-black/35 focus:ring-(--ardoise)",
  );
  const label = cn("text-[14px] font-medium", dark ? "text-white/75" : "text-black/70");
  return (
    <DemoForm
      success={{
        title: "Demande envoyée",
        text: `Toit en ${roof.toLowerCase()} : nous vous appelons sous 48 h pour fixer la visite et les photos.`,
      }}
      submit="Demander ma visite gratuite"
      submitClassName={cn(
        btn,
        "mt-7 w-full",
        dark
          ? "bg-white text-(--ardoise) hover:bg-white/90"
          : "bg-(--ardoise) text-white hover:bg-black",
      )}
      className={dark ? "text-white" : undefined}
    >
      <p className={label}>Votre toit</p>
      <Pick
        options={roofs.map((r) => r.t)}
        value={roof}
        onChange={setRoof}
        className="mt-3"
        itemClassName={cn(
          "h-10 rounded-[4px] px-4 text-[14.5px] ring-1 ring-inset",
          dark
            ? "text-white/80 ring-white/25 aria-pressed:bg-white aria-pressed:text-(--ardoise) aria-pressed:ring-white"
            : "ring-black/15 aria-pressed:bg-(--ardoise) aria-pressed:text-white aria-pressed:ring-(--ardoise)",
        )}
      />
      <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
        <label className="block">
          <span className={label}>Commune</span>
          <input className={field} placeholder="Hayange" />
        </label>
        <label className="block">
          <span className={label}>Téléphone</span>
          <input className={field} type="tel" placeholder="06 00 00 00 00" />
        </label>
      </div>
      <label className="mt-5 block">
        <span className={label}>Ce que vous avez remarqué</span>
        <textarea
          rows={3}
          className={cn(field, "h-auto resize-none py-3")}
          placeholder="Tache au plafond de la chambre après les orages…"
        />
      </label>
    </DemoForm>
  );
}

function QuoteBand() {
  return (
    <section
      className={cn(
        "grid gap-12 py-16 @min-[900px]:grid-cols-[1fr_1.2fr] @min-[900px]:gap-20 @min-[900px]:py-24",
        pad,
      )}
    >
      <div>
        <H2>Visite, photos et devis offerts.</H2>
        <p className="mt-5 max-w-[420px] text-[16.5px] leading-relaxed text-black/60">
          Hayange, Thionville, Fontoy, Algrange, Knutange, Florange, Nilvange et 25 km autour.
        </p>
        <p className="mt-8 text-[14.5px] text-black/55">Ou appelez-nous</p>
        <p className={cn(wide, "text-[30px]")}>{PHONE}</p>
      </div>
      <QuoteForm />
    </section>
  );
}

/* ------------------------------------------------------------ Diagnostic */

function Diagnostic() {
  const { param } = useSite();
  const [roof, setRoof] = useState<Roof>(
    roofs.some((r) => r.t === param) ? (param as Roof) : "Tuiles terre cuite",
  );
  const [issue, setIssue] = useState<Issue>("Fuite ou tache au plafond");
  const [age, setAge] = useState<Age>("15 à 30 ans");
  const res = diagnose(roof, issue, age);
  const src = roofs.find((r) => r.t === roof)?.src ?? "cou-terre-cuite";
  const chip =
    "h-11 rounded-[4px] px-4 text-[15px] ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--ardoise) aria-pressed:text-white aria-pressed:ring-(--ardoise)";
  return (
    <>
      <PageTitle
        title="Diagnostic de toiture en 3 questions"
        intro="Une première orientation, sans engagement. Le diagnostic précis se fait sur place, photos à l'appui."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="space-y-9">
          <Step n={1} label="Le matériau de votre toit">
            <Pick
              options={roofs.map((r) => r.t)}
              value={roof}
              onChange={setRoof}
              itemClassName={chip}
            />
          </Step>
          <Step n={2} label="Ce qui vous inquiète">
            <Pick options={issues} value={issue} onChange={setIssue} itemClassName={chip} />
          </Step>
          <Step n={3} label="L'âge de la couverture">
            <Pick options={ages} value={age} onChange={setAge} itemClassName={chip} />
          </Step>
        </div>
        <div className="overflow-hidden rounded-[6px] bg-(--ardoise) text-white">
          <div className="relative h-[180px]">
            <Photo key={src} src={src} alt={roof} sizes="560px" />
          </div>
          <div className="p-7" aria-live="polite">
            <p className="text-[14px] text-white/55">Notre orientation</p>
            <p className={cn(wide, "mt-2 text-[26px] leading-[1.1]")}>{res.t}</p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-white/70">{res.d}</p>
            <dl className="mt-6 grid gap-4 border-t border-white/15 pt-5 text-[15px] @min-[600px]:grid-cols-2">
              <div>
                <dt className="text-white/55">Prix indicatif</dt>
                <dd className="mt-1 font-semibold">{res.p}</dd>
              </div>
              <div>
                <dt className="text-white/55">Délai</dt>
                <dd className="mt-1 font-semibold">{res.w}</dd>
              </div>
            </dl>
            <Go
              to="contact"
              param={roof}
              className={cn(btn, "mt-7 w-full bg-white text-(--ardoise) hover:bg-white/90")}
            >
              Recevoir la visite gratuite
            </Go>
          </div>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

function Step({ n, label, children }: { n: number; label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-3 text-[16px] font-semibold">
        <span className="grid size-7 place-items-center rounded-full bg-(--ardoise) text-[13px] text-white">
          {n}
        </span>
        {label}
      </p>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- Urgence */

function Urgence() {
  return (
    <>
      <div
        className={cn(
          "bg-(--tuile) pt-12 pb-14 text-white @min-[900px]:pt-16 @min-[900px]:pb-16",
          pad,
        )}
      >
        <p className="flex items-center gap-2 text-[15px] font-semibold">
          <Umbrella className="size-5" /> Urgence fuite, 7 jours sur 7
        </p>
        <h1
          className={cn(
            wide,
            "mt-4 max-w-[860px] text-[36px] leading-[1.02] @min-[900px]:text-[58px]",
          )}
        >
          Une fuite ? On bâche votre toit sous 24 heures.
        </h1>
        <Go to="contact" className={cn(btn, "mt-8 bg-white text-(--tuile) hover:bg-white/90")}>
          <Phone className="size-5" /> {PHONE}
        </Go>
      </div>
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <H2>En attendant notre équipe</H2>
          <ol className="mt-8 space-y-6">
            {[
              [
                "Ne montez pas sur le toit",
                "Tuiles mouillées et vent : c'est la première cause de chute. On s'en occupe.",
              ],
              [
                "Protégez l'intérieur",
                "Bassine sous la goutte, meubles déplacés, et coupez l'électricité de la pièce si l'eau approche d'un plafonnier.",
              ],
              [
                "Photographiez",
                "Le plafond, les traces et si possible le toit depuis la rue : votre assureur les demandera.",
              ],
              [
                "Appelez-nous",
                "Nous vous donnons l'heure de passage. Le bâchage d'urgence est facturé 290 € TTC, déduit si nous faisons la réparation.",
              ],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-5">
                <span className={cn(wide, "text-[28px] leading-none text-(--tuile)")}>{i + 1}</span>
                <span>
                  <span className="block text-[18px] font-semibold">{t}</span>
                  <span className="mt-1 block text-[15.5px] leading-relaxed text-black/62">
                    {d}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="space-y-5">
          <div className="relative h-[260px] overflow-hidden rounded-[6px]">
            <Photo
              src="cou-chantier"
              alt="Tuiles empilées sur un toit en cours de réparation"
              sizes="480px"
            />
          </div>
          <div className="rounded-[6px] bg-(--brume) p-6">
            <p className="flex items-center gap-2 text-[16px] font-semibold">
              <CircleAlert className="size-5 text-(--tuile)" /> Pour votre assurance
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-black/62">
              Nous vous remettons un rapport avec photos, cause de la fuite et devis de réparation,
              à joindre à votre déclaration de sinistre.
            </p>
          </div>
        </aside>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------------- Réalisations */

function Realisations() {
  const [m, setM] = useState<"Tout" | "Tuiles" | "Ardoise" | "Zinc">("Tout");
  const shown = works.filter((w) => m === "Tout" || w.m === m);
  return (
    <>
      <PageTitle
        title="Réalisations"
        intro="Des toits refaits dans la vallée de la Fensch et autour de Thionville, photographiés à la réception."
      />
      <section className={cn("py-12 @min-[900px]:py-16", pad)}>
        <Pick
          options={["Tout", "Tuiles", "Ardoise", "Zinc"] as const}
          value={m}
          onChange={setM}
          itemClassName="h-10 rounded-[4px] px-5 text-[15px] ring-1 ring-inset ring-black/15 aria-pressed:bg-(--ardoise) aria-pressed:text-white aria-pressed:ring-(--ardoise)"
        />
        <div className="mt-8 grid gap-5 @min-[700px]:grid-cols-2 @min-[1100px]:grid-cols-3">
          {shown.map((w) => (
            <WorkTile key={w.src} w={w} />
          ))}
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ---------------------------------------------------- Suivi de chantier */

const steps = [
  { t: "Devis signé en ligne", d: "12 octobre", done: true },
  { t: "Acompte reçu", d: "14 octobre", done: true },
  { t: "Ardoises livrées", d: "3 novembre", done: true },
  { t: "Dépose de l'ancienne couverture", d: "5 et 6 novembre", done: true },
  { t: "Pose des ardoises", d: "en cours, 60 %", done: false, now: true },
  { t: "Zinguerie et faîtage", d: "prévu le 18 novembre", done: false },
  { t: "Réception et photos finales", d: "prévue le 20 novembre", done: false },
];

function Suivi() {
  return (
    <>
      <PageTitle
        title="Suivi de chantier"
        intro="Chaque client reçoit un lien personnel : avancement, photos du jour, documents et factures, sans avoir à nous appeler. Voici un exemple."
      />
      <section className={cn("py-12 @min-[900px]:py-16", pad)}>
        <div className="rounded-[8px] ring-1 ring-black/10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 px-6 py-5">
            <div>
              <p className="text-[14px] text-black/55">Chantier de la famille R., Knutange</p>
              <p className={cn(wide, "text-[22px]")}>Réfection en ardoise, 96 m²</p>
            </div>
            <span className="rounded-full bg-(--brume) px-4 py-2 text-[14px] font-semibold">
              Jour 8 sur 12
            </span>
          </div>
          <div className="grid @min-[900px]:grid-cols-[1fr_1.15fr]">
            <ol className="border-black/10 px-6 py-6 @min-[900px]:border-r">
              {steps.map((s) => (
                <li key={s.t} className="flex gap-4 pb-5 last:pb-0">
                  <span
                    className={cn(
                      "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                      s.done
                        ? "bg-(--ardoise) text-white"
                        : s.now
                          ? "ring-2 ring-(--tuile) ring-inset"
                          : "ring-1 ring-black/20 ring-inset",
                    )}
                  >
                    {s.done && <Check className="size-3.5" />}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block text-[16px]",
                        s.now ? "font-semibold" : s.done ? "" : "text-black/50",
                      )}
                    >
                      {s.t}
                    </span>
                    <span className={cn("text-[14px]", s.now ? "text-(--tuile)" : "text-black/50")}>
                      {s.d}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="space-y-6 px-6 py-6">
              <div>
                <p className="flex items-center gap-2 text-[15px] font-semibold">
                  <Camera className="size-4.5" /> Photos d&apos;hier soir
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                    <Photo src="cou-ardoise" alt="Ardoises posées" sizes="280px" />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                    <Photo src="cou-zinguerie" alt="Pose d'une gouttière" sizes="280px" />
                  </div>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-2 text-[15px] font-semibold">
                  <FileText className="size-4.5" /> Documents
                </p>
                <ul className="mt-3 divide-y divide-black/8 text-[15px]">
                  {[
                    ["Devis signé n° 2026-142", "Signé le 12/10"],
                    ["Facture d'acompte, 30 %", "Payée"],
                    ["Facture de solde", "Envoyée à la réception"],
                  ].map(([t, d]) => (
                    <li key={t} className="flex justify-between gap-4 py-2.5">
                      <span>{t}</span>
                      <span className="text-black/55">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="rounded-[4px] bg-(--brume) p-4 text-[14.5px] leading-relaxed text-black/70">
                Pluie annoncée jeudi : le pan nord sera bâché mercredi soir. Rien à faire de votre
                côté.
              </p>
            </div>
          </div>
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
  return (
    <>
      <PageTitle
        title="Visite, photos et devis offerts"
        intro="Nous passons voir votre toit, le photographions et vous envoyons un devis détaillé sous 5 jours."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <dl className="space-y-6 text-[15.5px]">
          <div>
            <dt className="text-black/55">Téléphone</dt>
            <dd className={cn(wide, "mt-1 text-[30px]")}>{PHONE}</dd>
          </div>
          <div>
            <dt className="text-black/55">Secteur</dt>
            <dd className="mt-1">Vallée de la Fensch, Thionville et 25 km autour</dd>
          </div>
          <div>
            <dt className="text-black/55">E-mail</dt>
            <dd className="mt-1">contact@toitures-horizon-exemple.fr</dd>
          </div>
          <div>
            <dt className="text-black/55">Aides</dt>
            <dd className="mt-1">
              Entreprise RGE : isolation de toiture éligible à MaPrimeRénov&apos;.
            </dd>
          </div>
        </dl>
        <QuoteForm initial={param} />
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
        title="Mentions légales et crédits photos"
        intro="Toitures Horizon est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14", pad)}>
        <PhotoCredits
          photos={[
            "cou-hero",
            ...roofs.map((r) => r.src),
            ...works.map((w) => w.src).filter((s) => s !== "cou-zinc"),
            "cou-chantier",
            "cou-zinguerie",
          ]}
        />
      </section>
      <Footer />
    </>
  );
}

export const desktop = true;

export function Site(props: SiteProps) {
  return (
    <SiteFrame
      {...props}
      style={vars}
      header={<Header />}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        {
          id: "diagnostic",
          label: "Diagnostic",
          path: "/diagnostic-toiture",
          render: () => <Diagnostic />,
        },
        {
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        {
          id: "suivi",
          label: "Suivi de chantier",
          path: "/suivi-de-chantier",
          render: () => <Suivi />,
        },
        {
          id: "urgence",
          label: "Urgence fuite",
          path: "/urgence-fuite",
          render: () => <Urgence />,
        },
        { id: "contact", label: "Devis gratuit", path: "/devis", render: () => <Contact /> },
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
