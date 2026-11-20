"use client";

import { useState, type CSSProperties } from "react";
import {
  ArrowRight,
  ChevronDown,
  Droplet,
  Droplets,
  Flame,
  Phone,
  ShowerHead,
  Toilet,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteFonts } from "./fonts";
import {
  DemoForm,
  Go,
  GoogleG,
  Photo,
  Pick,
  SiteFrame,
  Stars,
  useSite,
  PhotoCredits,
  type SiteProps,
  PayOnline,
} from "./frame";

/*
 * Hydrélia, plombier à Thionville (entreprise fictive).
 * Le site d'un dépanneur : le numéro et le délai d'abord, la salle de bain ensuite.
 * Bleu pétrole et laiton (la couleur des raccords), carrelage blanc.
 */

const PHONE = "06 39 98 21 07";

const vars = {
  "--pet": "#0f3d4c",
  "--pet-d": "#092a35",
  "--laiton": "#c9a05a",
  "--laiton-t": "#86601f",
  "--carreau": "#f1f4f3",
  "--ink-text": "#13222a",
  fontFamily: siteFonts.plombier,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-20";

/* ---------------------------------------------------------------- Données */

type Problem = { id: string; t: string; delay: string; I: LucideIcon };

const problems: Problem[] = [
  { id: "fuite", t: "Fuite d'eau", delay: "Sous 2 h", I: Droplets },
  { id: "wc", t: "WC bouché", delay: "Sous 2 h", I: Toilet },
  { id: "eau-chaude", t: "Plus d'eau chaude", delay: "Dans la journée", I: Flame },
  { id: "evier", t: "Évier ou douche bouché", delay: "Dans la journée", I: ShowerHead },
  { id: "robinet", t: "Robinet qui goutte", delay: "Sous 48 h", I: Droplet },
  { id: "autre", t: "Autre problème", delay: "On vous rappelle", I: Wrench },
];

const reviews = [
  {
    n: "Amandine",
    c: "Yutz",
    when: "il y a 2 semaines",
    s: 5,
    t: "Fuite sous l'évier un dimanche matin. Rappelée en dix minutes, le plombier était là avant midi. Le prix annoncé au téléphone a été respecté.",
  },
  {
    n: "Stéphane",
    c: "Thionville",
    when: "il y a 1 mois",
    s: 5,
    t: "Salle de bain refaite en neuf jours, douche à l'italienne. Chantier bâché et aspiré chaque soir, rien à redire.",
  },
  {
    n: "Patrick",
    c: "Hayange",
    when: "il y a 2 mois",
    s: 5,
    t: "Ballon d'eau chaude changé dans la journée. On m'a expliqué la différence avec un thermodynamique sans me pousser à la dépense.",
  },
  {
    n: "Nadia",
    c: "Florange",
    when: "il y a 3 mois",
    s: 4,
    t: "Intervention rapide pour un WC bouché. Un peu d'attente pour la facture par e-mail, sinon parfait.",
  },
];

const works = [
  { src: "plb-italienne", t: "Douche à l'italienne", c: "Yutz", d: "9 jours", k: "Salle de bain" },
  {
    src: "plb-r1",
    t: "Double vasque et grès brun",
    c: "Thionville",
    d: "11 jours",
    k: "Salle de bain",
  },
  {
    src: "plb-r2",
    t: "Bois et éclairage indirect",
    c: "Hettange-Grande",
    d: "12 jours",
    k: "Salle de bain",
  },
  { src: "plb-r3", t: "Douche en marbre", c: "Florange", d: "8 jours", k: "Salle de bain" },
  {
    src: "plb-baignoire",
    t: "Baignoire et meuble noyer",
    c: "Terville",
    d: "10 jours",
    k: "Salle de bain",
  },
  {
    src: "plb-metro",
    t: "Douche en carreaux métro",
    c: "Fameck",
    d: "6 jours",
    k: "Salle de bain",
  },
  {
    src: "plb-laiton",
    t: "Nourrice et vannes refaites",
    c: "Hayange",
    d: "1 journée",
    k: "Chauffe-eau",
  },
  { src: "plb-r4", t: "Vasque et robinetterie", c: "Uckange", d: "3 heures", k: "Dépannage" },
  { src: "plb-fuite", t: "Fuite sur robinet extérieur", c: "Yutz", d: "1 heure", k: "Dépannage" },
];

const towns = [
  "Thionville",
  "Yutz",
  "Hayange",
  "Florange",
  "Fameck",
  "Uckange",
  "Hettange-Grande",
  "Cattenom",
  "Terville",
  "Illange",
];

const hours = [
  ["Lundi", "7 h 30 – 19 h"],
  ["Mardi", "7 h 30 – 19 h"],
  ["Mercredi", "7 h 30 – 19 h"],
  ["Jeudi", "7 h 30 – 19 h"],
  ["Vendredi", "7 h 30 – 19 h"],
  ["Samedi", "8 h – 12 h"],
  ["Dimanche", "Urgences seulement"],
] as const;

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex items-center justify-center gap-2 rounded-[6px] px-6 h-13 text-[16px] font-semibold transition-colors";
const btnDark = cn(btn, "bg-(--pet) text-white hover:bg-(--pet-d)");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--ink-text)/20 hover:ring-(--ink-text)/50");

function CallButton({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Go
      to="contact"
      className={cn(
        btn,
        light
          ? "bg-white text-(--pet) hover:bg-white/90"
          : "bg-(--pet) text-white hover:bg-(--pet-d)",
        className,
      )}
    >
      <Phone className="size-4.5" /> {PHONE}
    </Go>
  );
}

function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[30px] leading-[1.08] font-bold tracking-[-0.03em] text-balance @min-[900px]:text-[44px]",
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
    <header className="sticky top-0 z-30 border-b border-black/6 bg-white/95 backdrop-blur">
      <div className={cn("flex h-18 items-center gap-8", pad)}>
        <Go to="home" className="flex items-center gap-3 text-left" label="Hydrélia, accueil">
          <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
            <path d="M16 3c5 6.5 9 11.2 9 16a9 9 0 0 1-18 0c0-4.8 4-9.5 9-16Z" fill="var(--pet)" />
            <path
              d="M11.5 19.5a4.5 4.5 0 0 0 4.5 4.5"
              stroke="var(--laiton)"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span className="leading-none">
            <span className="block text-[21px] font-extrabold tracking-[-0.03em]">Hydrélia</span>
            <span className="mt-1 block text-[12.5px] text-black/50">Plombier à Thionville</span>
          </span>
        </Go>
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="relative py-2 text-[15px] font-medium text-black/65 hover:text-black aria-[current=page]:text-black aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-[19px] aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-(--pet)"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <span className="ml-auto hidden items-center gap-2 text-[13px] text-black/60 @min-[900px]:flex @min-[1100px]:ml-0">
          <span className="size-2 rounded-full bg-[#2f8f5b]" />
          Urgences jusqu&apos;à 22 h
        </span>
        <CallButton className="hidden h-11 px-5 text-[15px] @min-[900px]:inline-flex" />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid size-11 place-items-center rounded-md ring-1 ring-black/10 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? (
            <X className="size-5" />
          ) : (
            <span className="text-[13px] font-semibold">Menu</span>
          )}
        </button>
      </div>
      {open && (
        <nav className="border-t border-black/6 px-5 pb-4 @min-[1100px]:hidden">
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

/** Barre d'appel collée en bas, sur téléphone seulement. */
function MobileBar() {
  return (
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/8 bg-white p-3 @min-[900px]:hidden">
      <Go to="contact" className={cn(btnDark, "h-12 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="contact" className={cn(btnLine, "h-12 text-[15px]")}>
        Être rappelé
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--pet-d) text-white/65">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <p className="text-[22px] font-extrabold tracking-[-0.03em] text-white">Hydrélia</p>
          <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed">
            Plomberie, salles de bain et chauffe-eau à Thionville et 30 km autour, depuis 2011.
          </p>
          <p className="mt-5 text-[13px]">Qualibat · RGE · Garantie décennale</p>
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
            Lundi au vendredi, 7 h 30 – 19 h
            <br />
            Samedi, 8 h – 12 h
            <br />
            Urgences 7 jours sur 7 jusqu&apos;à 22 h
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-bold text-white">{PHONE}</p>
          <p className="mt-1">contact@hydrelia-exemple.fr</p>
          <p className="mt-1">Atelier sur rendez-vous, Thionville (57)</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Hydrélia</span>
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

/** Bandeau-titre des pages intérieures. */
function PageTitle({ crumb, title, intro }: { crumb: string; title: string; intro?: string }) {
  return (
    <div
      className={cn(
        "border-b border-black/6 bg-(--carreau) pt-10 pb-12 @min-[900px]:pt-14 @min-[900px]:pb-16",
        pad,
      )}
    >
      <p className="text-[14px] text-black/50">
        <Go to="home" className="hover:text-black">
          Accueil
        </Go>{" "}
        / <span className="text-black/75">{crumb}</span>
      </p>
      <h1 className="mt-4 max-w-[760px] text-[36px] leading-[1.04] font-bold tracking-[-0.035em] text-balance @min-[900px]:text-[56px]">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-[600px] text-[17px] leading-relaxed text-black/60">{intro}</p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      {/* Premier écran : le délai, le numéro, la preuve */}
      <section className="grid @min-[900px]:min-h-[652px] @min-[900px]:grid-cols-[1fr_1fr]">
        <div className="relative order-first h-[260px] @min-[900px]:order-last @min-[900px]:h-auto">
          <Photo
            src="plb-hero"
            alt="Salle de bain claire avec baignoire îlot et douche vitrée"
            priority
            sizes="(min-width: 1024px) 640px, 100vw"
            position="40% 50%"
          />
          <div className="absolute bottom-6 left-6 hidden w-[300px] rounded-[10px] bg-white p-5 shadow-[0_20px_50px_-20px_rgb(9_42_53/0.5)] @min-[900px]:block">
            <p className="text-[13px] text-black/55">Prochain créneau d&apos;urgence</p>
            <p className="mt-1 text-[22px] font-bold tracking-[-0.02em]">
              Aujourd&apos;hui, 14 h 30
            </p>
            <p className="mt-2 border-t border-black/8 pt-2 text-[13px] text-black/60">
              Un plombier est à Yutz ce matin, à 10 minutes de Thionville.
            </p>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col justify-center py-10 @min-[900px]:py-0 @min-[900px]:pr-14",
            pad,
          )}
        >
          <p className="text-[15px] font-medium text-(--laiton-t)">Thionville et 30 km autour</p>
          <h1 className="mt-4 text-[38px] leading-[1.02] font-bold tracking-[-0.04em] text-balance @min-[900px]:text-[62px]">
            Une fuite&nbsp;? Un plombier chez vous en moins de 2&nbsp;heures.
          </h1>
          <p className="mt-5 max-w-[470px] text-[17px] leading-relaxed text-black/62">
            Dépannage 7 jours sur 7, salles de bain clé en main et chauffe-eau. Le prix est annoncé
            avant de commencer, pas après.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <Go to="contact" className={btnLine}>
              Décrire mon problème
            </Go>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/8 pt-6 text-[14px] text-black/60">
            <span className="flex items-center gap-2">
              <GoogleG className="size-5" />
              <b className="text-[16px] text-(--ink-text)">4,9</b>
              <Stars className="text-[14px]" />
              <span>132 avis</span>
            </span>
            <span>Qualibat et RGE</span>
            <span>Garantie décennale</span>
          </div>
        </div>
      </section>

      {/* Que se passe-t-il ? */}
      <section className={cn("bg-(--carreau) py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2 className="max-w-[560px]">Que se passe&#8209;t&#8209;il chez vous&nbsp;?</H2>
          <p className="max-w-[360px] text-[16px] leading-relaxed text-black/60">
            Choisissez votre problème : on vous dit sous quel délai on vient, et quoi faire en
            attendant.
          </p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] bg-black/8 ring-1 ring-black/8 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3">
          {problems.map(({ id, t, delay, I }) => (
            <Go
              key={id}
              to="depannage"
              param={id}
              className="group flex items-center gap-4 bg-white p-6 text-left transition-colors hover:bg-[#fbfcfc] @min-[900px]:p-7"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-(--carreau) text-(--pet) transition-colors group-hover:bg-(--pet) group-hover:text-white">
                <I className="size-5.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[18px] font-semibold tracking-[-0.01em]">{t}</span>
                <span className="mt-0.5 block text-[14px] text-black/55">{delay}</span>
              </span>
              <ArrowRight className="size-5 text-black/25 transition-transform group-hover:translate-x-1 group-hover:text-(--pet)" />
            </Go>
          ))}
        </div>
      </section>

      {/* Salle de bain */}
      <section
        className={cn(
          "grid gap-10 py-16 @min-[900px]:grid-cols-[1.15fr_1fr] @min-[900px]:items-center @min-[900px]:gap-16 @min-[900px]:py-24",
          pad,
        )}
      >
        <div className="relative h-[280px] overflow-hidden rounded-[10px] @min-[900px]:h-[520px]">
          <Photo
            src="plb-italienne"
            alt="Douche à l'italienne avec paroi vitrée et meuble vasque"
            sizes="(min-width: 1024px) 680px, 100vw"
          />
          <p className="absolute bottom-0 left-0 rounded-tr-[10px] bg-white px-5 py-3.5 text-[14px]">
            <b>Douche à l&apos;italienne à Yutz</b>{" "}
            <span className="text-black/55">en 9 jours</span>
          </p>
        </div>
        <div>
          <H2>Votre salle de bain refaite en 10 jours, par une seule équipe.</H2>
          <p className="mt-5 text-[17px] leading-relaxed text-black/62">
            Plomberie, carrelage, électricité et meubles : vous n&apos;avez qu&apos;un
            interlocuteur, de la dépose au dernier joint.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-black/8 pt-8">
            {[
              ["Visite et devis", "offerts, sous 7 jours"],
              ["Prix ferme", "détaillé poste par poste"],
              ["Chantier propre", "bâché et aspiré chaque soir"],
              ["MaPrimeAdapt'", "dossier monté pour vous"],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="text-[16px] font-semibold">{t}</dt>
                <dd className="mt-1 text-[14.5px] text-black/55">{d}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-wrap gap-3">
            <Go to="sdb" className={btnDark}>
              Estimer ma salle de bain
            </Go>
            <Go to="realisations" className={btnLine}>
              Voir les réalisations
            </Go>
          </div>
        </div>
      </section>

      {/* Déroulé d'un dépannage : une vraie suite d'étapes */}
      <section className={cn("bg-(--pet) py-16 text-white @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[640px]">Un dépannage, comment ça se passe&nbsp;?</H2>
        <ol className="mt-12 grid gap-10 @min-[900px]:grid-cols-3 @min-[900px]:gap-12">
          {[
            [
              "Vous appelez ou écrivez",
              "Un plombier décroche, pas un standard. Il vous donne le délai et le prix du déplacement.",
            ],
            [
              "Le prix avant les travaux",
              "Sur place, il trouve la panne et vous annonce le prix de la réparation. Vous acceptez ou non.",
            ],
            [
              "Réparé, facture par e-mail",
              "Paiement sur place par carte ou virement. Facture et photos envoyées le jour même.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="border-t border-white/20 pt-6">
              <span className="text-[44px] leading-none font-bold text-(--laiton)">{i + 1}</span>
              <p className="mt-4 text-[20px] font-semibold tracking-[-0.01em]">{t}</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-white/65">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-[15px] text-white/65">
          Déplacement : 49 € en journée, 89 € le soir et le week-end. Déduit si vous faites les
          travaux avec nous.
        </p>
      </section>

      {/* Avis */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="grid gap-10 @min-[900px]:grid-cols-[300px_1fr] @min-[900px]:gap-16">
          <div>
            <p className="flex items-center gap-2 text-[15px] text-black/60">
              <GoogleG className="size-5" /> Avis Google
            </p>
            <p className="mt-4 text-[88px] leading-none font-bold tracking-[-0.05em]">4,9</p>
            <Stars className="mt-3 text-[20px]" />
            <p className="mt-3 text-[15px] text-black/55">Moyenne de 132 avis</p>
            <Go
              to="avis"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-(--pet) underline-offset-4 hover:underline"
            >
              Lire tous les avis <ArrowRight className="size-4" />
            </Go>
          </div>
          <div className="grid gap-8 @min-[900px]:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <figure key={r.n} className="border-t-2 border-(--ink-text) pt-5">
                <Stars className="text-[14px]" />
                <blockquote className="mt-3 text-[16px] leading-relaxed">{r.t}</blockquote>
                <figcaption className="mt-4 text-[14px] text-black/55">
                  <b className="text-(--ink-text)">{r.n}</b>, {r.c} · {r.when}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ZoneAndHours />
      <CallbackBand />
      <Footer />
      <MobileBar />
    </>
  );
}

/** Carte de la zone d'intervention (dessinée, sans fond de carte réel) et horaires. */
function ZoneAndHours() {
  // Lundi : jour affiché comme « aujourd'hui » pour que la maquette reste fixe.
  const today = 0;
  return (
    <section
      className={cn(
        "grid gap-12 border-t border-black/6 bg-(--carreau) py-16 @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-24",
        pad,
      )}
    >
      <div>
        <H2>Thionville et 30 km autour</H2>
        <p className="mt-4 max-w-[480px] text-[16px] leading-relaxed text-black/60">
          Deux camionnettes équipées tournent sur le secteur : dans 9 cas sur 10, la réparation se
          fait au premier passage.
        </p>
        <div className="relative mt-8 h-[300px] overflow-hidden rounded-[10px] bg-white ring-1 ring-black/6">
          <svg
            viewBox="0 0 600 300"
            className="absolute inset-0 size-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              d="M-10 40 C 120 70, 180 30, 260 110 S 380 230, 470 210 S 580 260, 620 300"
              stroke="#cfe0e4"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <circle
              cx="300"
              cy="150"
              r="130"
              fill="var(--pet)"
              fillOpacity="0.06"
              stroke="var(--pet)"
              strokeOpacity="0.35"
              strokeDasharray="5 6"
            />
            {[
              [300, 150, "Thionville", true],
              [345, 165, "Yutz"],
              [215, 125, "Hayange"],
              [250, 175, "Florange"],
              [230, 92, "Fameck"],
              [282, 205, "Uckange"],
              [348, 78, "Hettange-Grande"],
              [395, 55, "Cattenom"],
              [262, 140, "Terville"],
              [370, 122, "Illange"],
            ].map(([x, y, n, main]) => (
              <g key={n as string}>
                <circle
                  cx={x as number}
                  cy={y as number}
                  r={main ? 7 : 4}
                  fill={main ? "var(--pet)" : "#13222a"}
                />
                <text
                  x={(x as number) + 10}
                  y={(y as number) + 4}
                  fontSize={main ? 15 : 12.5}
                  fontWeight={main ? 700 : 500}
                  fill="#13222a"
                >
                  {n as string}
                </text>
              </g>
            ))}
          </svg>
          <p className="absolute right-4 bottom-3 text-[11px] text-black/40">Plan simplifié</p>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-black/55">
          {towns.join(", ")} et alentours.
        </p>
      </div>
      <div>
        <H2>Horaires</H2>
        <table className="mt-8 w-full text-[16px]">
          <tbody>
            {hours.map(([d, h], i) => (
              <tr key={d} className={cn("border-b border-black/8", i === today && "font-semibold")}>
                <td className="py-3.5">
                  {d}
                  {i === today && (
                    <span className="ml-2 text-[13px] font-medium text-[#2f8f5b]">ouvert</span>
                  )}
                </td>
                <td className="py-3.5 text-right text-black/70">{h}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-[15px] leading-relaxed text-black/60">
          En dehors de ces horaires, la ligne d&apos;urgence répond de 7 h à 22 h, tous les jours,
          jours fériés compris.
        </p>
      </div>
    </section>
  );
}

const callbackSlots = ["Dès que possible", "Ce soir", "Demain matin"] as const;

function CallbackForm({ initial = "fuite", dark = false }: { initial?: string; dark?: boolean }) {
  const [problem, setProblem] = useState(
    problems.find((p) => p.id === initial)?.t ?? problems[0].t,
  );
  const [slot, setSlot] = useState<(typeof callbackSlots)[number]>("Dès que possible");
  const chip = cn(
    "h-10 rounded-full px-4 text-[14px] font-medium ring-1 ring-inset transition-colors",
    dark
      ? "text-white/80 ring-white/25 hover:ring-white/60 aria-pressed:bg-white aria-pressed:text-(--pet) aria-pressed:ring-white"
      : "ring-black/15 hover:ring-black/40 aria-pressed:bg-(--pet) aria-pressed:text-white aria-pressed:ring-(--pet)",
  );
  const field = cn(
    "mt-2 h-12 w-full rounded-[6px] px-4 text-[16px] outline-none ring-1 ring-inset focus:ring-2",
    dark
      ? "bg-white/8 text-white ring-white/20 placeholder:text-white/40 focus:ring-(--laiton)"
      : "bg-white ring-black/15 placeholder:text-black/35 focus:ring-(--pet)",
  );
  const label = cn("text-[14px] font-medium", dark ? "text-white/75" : "text-black/70");
  return (
    <DemoForm
      success={{
        title: "Demande envoyée",
        text: `${problem} : un plombier vous rappelle ${slot === "Dès que possible" ? "dans les 15 minutes" : slot.toLowerCase()}.`,
      }}
      submit={
        <>
          <Phone className="size-4.5" /> Être rappelé
        </>
      }
      submitClassName={cn(
        btn,
        "mt-7 w-full",
        dark
          ? "bg-(--laiton) text-(--pet-d) hover:brightness-105"
          : "bg-(--pet) text-white hover:bg-(--pet-d)",
      )}
      className={dark ? "text-white" : undefined}
    >
      <p className={label}>Votre problème</p>
      <Pick
        options={problems.map((p) => p.t)}
        value={problem}
        onChange={setProblem}
        className="mt-3"
        itemClassName={chip}
      />
      <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
        <label className="block">
          <span className={label}>Commune</span>
          <input className={field} placeholder="Thionville" />
        </label>
        <label className="block">
          <span className={label}>Téléphone</span>
          <input className={field} type="tel" placeholder="06 00 00 00 00" />
        </label>
      </div>
      <p className={cn(label, "mt-6")}>On vous rappelle</p>
      <Pick
        options={callbackSlots}
        value={slot}
        onChange={setSlot}
        className="mt-3"
        itemClassName={chip}
      />
    </DemoForm>
  );
}

function CallbackBand() {
  return (
    <section
      className={cn(
        "grid gap-12 bg-(--pet) py-16 text-white @min-[900px]:grid-cols-[1fr_1.15fr] @min-[900px]:gap-20 @min-[900px]:py-24",
        pad,
      )}
    >
      <div>
        <H2>Décrivez le problème, on vous rappelle en 15 minutes.</H2>
        <p className="mt-5 max-w-[420px] text-[17px] leading-relaxed text-white/65">
          Ou appelez directement : c&apos;est un plombier qui décroche.
        </p>
        <CallButton light className="mt-8" />
      </div>
      <CallbackForm dark />
    </section>
  );
}

/* ------------------------------------------------------------- Dépannage */

const tips: Record<string, string[]> = {
  fuite: [
    "Fermez le robinet d'arrêt général, près du compteur ou sous l'évier.",
    "Si l'eau approche d'une prise, coupez le disjoncteur général.",
    "Photographiez la fuite et les dégâts : votre assureur les demandera.",
  ],
  wc: [
    "Ne tirez plus la chasse, l'eau pourrait déborder.",
    "Évitez les produits chimiques : ils abîment les joints.",
    "Fermez le petit robinet d'arrivée derrière la cuvette.",
  ],
  "eau-chaude": [
    "Vérifiez le disjoncteur du chauffe-eau dans le tableau électrique.",
    "Relevez la marque et le modèle sur l'étiquette du ballon.",
    "Regardez s'il y a de l'eau sous la cuve.",
  ],
  evier: [
    "Retirez l'eau stagnante avec un récipient.",
    "Essayez une ventouse, sans produit chimique.",
    "Notez depuis quand l'eau s'écoule mal.",
  ],
  robinet: [
    "Fermez le robinet d'arrêt sous l'évier ou la vasque.",
    "Placez un récipient pour mesurer le débit de la fuite.",
    "Prenez une photo du robinet et de sa marque.",
  ],
  autre: [
    "Décrivez ce que vous voyez et entendez.",
    "Prenez une ou deux photos.",
    "On vous rappelle pour vous dire si c'est urgent.",
  ],
};

function Depannage() {
  const { param } = useSite();
  const [open, setOpen] = useState(param ?? "fuite");
  return (
    <>
      <PageTitle
        crumb="Dépannage"
        title="Que faire en attendant le plombier ?"
        intro="Choisissez votre problème : les bons gestes tout de suite, et le délai d'intervention."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.3fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="divide-y divide-black/8 border-y border-black/8">
          {problems.map(({ id, t, delay, I }) => (
            <div key={id}>
              <button
                type="button"
                onClick={() => setOpen(open === id ? "" : id)}
                aria-expanded={open === id}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <I className="size-5.5 text-(--pet)" />
                <span className="flex-1 text-[19px] font-semibold tracking-[-0.01em]">{t}</span>
                <span className="text-[14px] text-black/55">{delay}</span>
                <ChevronDown
                  className={cn(
                    "size-5 text-black/35 transition-transform",
                    open === id && "rotate-180",
                  )}
                />
              </button>
              {open === id && (
                <div className="pb-6 pl-10">
                  <ol className="space-y-3">
                    {tips[id].map((tip, k) => (
                      <li key={tip} className="flex gap-3 text-[16px] leading-relaxed">
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-(--carreau) text-[14px] font-bold text-(--pet)">
                          {k + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ol>
                  <Go to="contact" param={id} className={cn(btnDark, "mt-6")}>
                    Demander une intervention
                  </Go>
                </div>
              )}
            </div>
          ))}
        </div>
        <aside>
          <div className="relative h-[220px] overflow-hidden rounded-[10px]">
            <Photo src="plb-fuite" alt="Robinet en laiton qui fuit" sizes="480px" />
          </div>
          <h2 className="mt-8 text-[24px] font-bold tracking-[-0.02em]">Nos tarifs de dépannage</h2>
          <table className="mt-4 w-full text-[15.5px]">
            <tbody>
              {[
                ["Déplacement en journée", "49 €"],
                ["Déplacement soir et week-end", "89 €"],
                ["Débouchage WC ou évier", "à partir de 90 €"],
                ["Recherche de fuite avec rapport", "à partir de 180 €"],
                ["Remplacement de mitigeur", "à partir de 140 €"],
              ].map(([t, p]) => (
                <tr key={t} className="border-b border-black/8">
                  <td className="py-3">{t}</td>
                  <td className="py-3 text-right font-semibold whitespace-nowrap">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[13.5px] text-black/50">
            Prix TTC, pièces en plus. Le prix exact est annoncé avant de commencer.
          </p>
        </aside>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------- Salle de bain */

const layouts = [
  { t: "Douche à l'italienne", src: "plb-italienne", base: 900 },
  { t: "Baignoire", src: "plb-baignoire", base: 850 },
  { t: "Douche et carreaux métro", src: "plb-metro", base: 820 },
] as const;
const finishes = ["Essentiel", "Confort", "Haut de gamme"] as const;
const finishRate = { Essentiel: 1, Confort: 1.25, "Haut de gamme": 1.6 };

function SalleDeBain() {
  const [layout, setLayout] = useState<(typeof layouts)[number]["t"]>(layouts[0].t);
  const [finish, setFinish] = useState<(typeof finishes)[number]>("Confort");
  const [area, setArea] = useState(6);
  const l = layouts.find((x) => x.t === layout) ?? layouts[0];
  const mid = (l.base * area + 2200) * finishRate[finish];
  const round = (n: number) => Math.round(n / 100) * 100;
  const fmt = (n: number) => round(n).toLocaleString("fr-FR");
  const chip =
    "h-11 rounded-full px-5 text-[15px] font-medium ring-1 ring-inset ring-black/15 transition-colors hover:ring-black/40 aria-pressed:bg-(--pet) aria-pressed:text-white aria-pressed:ring-(--pet)";
  return (
    <>
      <PageTitle
        crumb="Salle de bain"
        title="Combien coûte votre salle de bain ?"
        intro="Trois réglages pour une première fourchette. Le prix ferme vient après la visite, offerte."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div className="space-y-9">
          <div>
            <p className="text-[15px] font-semibold">Aménagement</p>
            <Pick
              options={layouts.map((x) => x.t)}
              value={layout}
              onChange={setLayout}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold">Finitions</p>
            <Pick
              options={finishes}
              value={finish}
              onChange={setFinish}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[15px] font-semibold">
              Surface de la pièce <span className="text-(--pet)">{area} m²</span>
            </span>
            <input
              type="range"
              min={3}
              max={14}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-4 w-full accent-(--pet)"
            />
          </label>
          <div className="border-t border-black/10 pt-8">
            <p className="text-[15px] text-black/55">Fourchette indicative, pose comprise</p>
            <p className="mt-2 text-[44px] leading-none font-bold tracking-[-0.04em]">
              {fmt(mid * 0.88)} – {fmt(mid * 1.12)} €
            </p>
            <p className="mt-3 text-[15px] text-black/55">
              Environ {area > 8 ? "2 semaines" : "8 à 10 jours"} de travaux. MaPrimeAdapt&apos;
              possible pour une douche de plain-pied.
            </p>
            <Go to="contact" className={cn(btnDark, "mt-7")}>
              Demander la visite gratuite
            </Go>
          </div>
        </div>
        <div className="relative h-[320px] overflow-hidden rounded-[10px] @min-[900px]:h-auto @min-[900px]:min-h-[520px]">
          <Photo key={l.src} src={l.src} alt={layout} sizes="(min-width: 1024px) 600px, 100vw" />
          <p className="absolute bottom-0 left-0 rounded-tr-[10px] bg-white px-5 py-3 text-[14px]">
            Exemple de réalisation : <b>{layout.toLowerCase()}</b>
          </p>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ----------------------------------------------------------- Réalisations */

const workKinds = ["Tout", "Salle de bain", "Chauffe-eau", "Dépannage"] as const;

function Realisations() {
  const [kind, setKind] = useState<(typeof workKinds)[number]>("Tout");
  const [zoom, setZoom] = useState<number | null>(null);
  const shown = works.filter((w) => kind === "Tout" || w.k === kind);
  const z = zoom === null ? null : shown[zoom];
  return (
    <>
      <PageTitle
        crumb="Réalisations"
        title="Nos derniers chantiers"
        intro="Photos prises en fin de chantier, avec l'accord des clients."
      />
      <section className={cn("py-12 @min-[900px]:py-16", pad)}>
        <Pick
          options={workKinds}
          value={kind}
          onChange={(k) => {
            setKind(k);
            setZoom(null);
          }}
          itemClassName="h-10 rounded-full px-4 text-[14.5px] font-medium ring-1 ring-inset ring-black/15 aria-pressed:bg-(--ink-text) aria-pressed:text-white aria-pressed:ring-(--ink-text)"
        />
        <div className="mt-8 grid gap-6 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3">
          {shown.map((w, i) => (
            <button
              key={w.src}
              type="button"
              onClick={() => setZoom(i)}
              className="group text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-[8px]">
                <Photo
                  src={w.src}
                  alt={w.t}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-3 block text-[17px] font-semibold">{w.t}</span>
              <span className="block text-[14px] text-black/55">
                {w.c}, {w.d} de travaux
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
          <div className="relative h-[70%] w-full max-w-[900px] overflow-hidden rounded-[8px]">
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

/* ------------------------------------------------------------------ Avis */

function Avis() {
  const dist = [112, 15, 3, 1, 1];
  return (
    <>
      <PageTitle
        crumb="Avis"
        title="132 avis Google, 4,9 sur 5"
        intro="Les avis sont publiés sur notre fiche Google. Nous répondons à chacun, y compris aux moins bons."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[320px_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          {dist.map((n, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 text-[14px]">
              <span className="w-14 text-black/60">{5 - i} étoiles</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-black/8">
                <span
                  className="block h-full rounded-full bg-[#f4b400]"
                  style={{ width: `${(n / 132) * 100}%` }}
                />
              </span>
              <span className="w-8 text-right text-black/55">{n}</span>
            </div>
          ))}
          <p className="mt-6 flex items-center gap-2 text-[14px] text-black/55">
            <GoogleG className="size-5" /> Avis vérifiés par Google
          </p>
        </div>
        <div className="divide-y divide-black/8">
          {reviews.map((r) => (
            <figure key={r.n} className="py-6 first:pt-0">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-(--carreau) text-[15px] font-bold text-(--pet)">
                  {r.n[0]}
                </span>
                <span>
                  <b className="block text-[15.5px]">
                    {r.n}, {r.c}
                  </b>
                  <span className="text-[13px] text-black/50">{r.when}</span>
                </span>
                <Stars value={r.s} className="ml-auto text-[14px]" />
              </div>
              <blockquote className="mt-3 text-[16px] leading-relaxed">{r.t}</blockquote>
            </figure>
          ))}
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
      <PageTitle crumb="Contact" title="Un plombier vous rappelle en 15 minutes" />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <p className="text-[15px] text-black/55">Ligne directe, 7 h – 22 h tous les jours</p>
          <p className="mt-2 text-[40px] leading-none font-bold tracking-[-0.03em]">{PHONE}</p>
          <dl className="mt-10 space-y-6 border-t border-black/8 pt-8 text-[15.5px]">
            <div>
              <dt className="font-semibold">Zone d&apos;intervention</dt>
              <dd className="mt-1 text-black/60">
                Thionville et 30 km autour, de Cattenom à Hayange
              </dd>
            </div>
            <div>
              <dt className="font-semibold">E-mail</dt>
              <dd className="mt-1 text-black/60">contact@hydrelia-exemple.fr</dd>
            </div>
            <div>
              <dt className="font-semibold">Paiement</dt>
              <dd className="mt-1 text-black/60">
                Carte, virement ou chèque. Facture payable en ligne, par carte ou en 3 fois sans
                frais jusqu&apos;à 3 000 €.
              </dd>
            </div>
          </dl>
        </div>
        <CallbackForm initial={param} />
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

function Credits() {
  return (
    <>
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Hydrélia est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <PhotoCredits photos={works.map((w) => w.src).concat("plb-hero")} />
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
        { id: "depannage", label: "Dépannage", path: "/depannage", render: () => <Depannage /> },
        {
          id: "sdb",
          label: "Salle de bain",
          path: "/salle-de-bain",
          render: () => <SalleDeBain />,
        },
        {
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        { id: "avis", label: "Avis", path: "/avis", render: () => <Avis /> },
        { id: "contact", label: "Contact", path: "/contact", render: () => <Contact /> },
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
