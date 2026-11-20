"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { ArrowRight, Check, KeyRound, Phone, ShieldCheck, X } from "lucide-react";
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
 * Clé & Fer, serrurier-métallier à Forbach (entreprise fictive).
 * Deux clients que tout oppose : celui qui est bloqué dehors et veut un prix
 * honnête tout de suite, et celui qui prend des semaines pour choisir un
 * portail. Le premier écran est coupé en deux, un côté pour chacun.
 * Acier noir, zinc, blanc cassé ; l'orange des étincelles de meulage.
 */

const condensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 57 30";

const vars = {
  "--acier": "#15171a",
  "--fer": "#2b3036",
  "--zinc": "#9aa2aa",
  "--blanc": "#f2f2f0",
  "--etincelle": "#ff6b1a",
  "--etincelle-t": "#b4470a",
  "--ink-text": "#15171a",
  "--cond": condensed.style.fontFamily,
  fontFamily: plex.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";
const cond = "font-(family-name:--cond)";

/* ---------------------------------------------------------------- Données */

const situations = [
  "Porte claquée",
  "Clé perdue, porte fermée à clé",
  "Serrure bloquée ou cassée",
  "Après effraction",
] as const;
const moments = ["En journée", "Le soir", "Dimanche et jours fériés"] as const;
type Situation = (typeof situations)[number];
type Moment = (typeof moments)[number];

const basePrice: Record<Situation, number> = {
  "Porte claquée": 89,
  "Clé perdue, porte fermée à clé": 129,
  "Serrure bloquée ou cassée": 149,
  "Après effraction": 189,
};
const surcharge: Record<Moment, number> = {
  "En journée": 0,
  "Le soir": 50,
  "Dimanche et jours fériés": 80,
};
const included: Record<Situation, string> = {
  "Porte claquée":
    "Ouverture sans casse dans 9 cas sur 10. Déplacement compris à Forbach et 15 km autour.",
  "Clé perdue, porte fermée à clé":
    "Ouverture et remplacement du cylindre si nécessaire (cylindre facturé en plus, à partir de 45 €).",
  "Serrure bloquée ou cassée":
    "Diagnostic, déblocage ou remplacement de la serrure. Le prix de la pièce est annoncé avant la pose.",
  "Après effraction":
    "Mise en sécurité le jour même, fermeture provisoire, constat photo pour votre assurance.",
};

type Work = { src: string; t: string; c: string; k: Kind; d: string };
type Kind = "Portails" | "Garde-corps et escaliers" | "Verrières";
const works: Work[] = [
  {
    src: "ser-portail",
    t: "Portail plein à motif pointes de diamant",
    c: "Forbach",
    k: "Portails",
    d: "Acier thermolaqué noir, 4,20 m",
  },
  {
    src: "ser-verriere",
    t: "Verrière d'atelier entre cuisine et séjour",
    c: "Stiring-Wendel",
    k: "Verrières",
    d: "Acier noir, verre feuilleté",
  },
  {
    src: "ser-escalier",
    t: "Escalier quart tournant et main courante",
    c: "Saint-Avold",
    k: "Garde-corps et escaliers",
    d: "Acier brut verni",
  },
  {
    src: "ser-escalier-bois",
    t: "Escalier acier, marches en chêne",
    c: "Freyming-Merlebach",
    k: "Garde-corps et escaliers",
    d: "Limon acier, chêne huilé",
  },
  {
    src: "ser-portillon",
    t: "Portillon et clôture à barreaux plats",
    c: "Behren-lès-Forbach",
    k: "Portails",
    d: "Acier thermolaqué",
  },
  {
    src: "ser-gardecorps",
    t: "Garde-corps à lisses horizontales",
    c: "Sarreguemines",
    k: "Garde-corps et escaliers",
    d: "Acier noir mat",
  },
];

const reviews = [
  {
    n: "Mélanie",
    c: "Forbach",
    t: "Porte claquée un samedi soir. Le prix annoncé au téléphone était celui de la facture, porte ouverte sans rien abîmer.",
    s: 5,
  },
  {
    n: "Thomas",
    c: "Stiring-Wendel",
    t: "Verrière posée entre la cuisine et le salon. Du sur-mesure parfait, livré dans les délais annoncés.",
    s: 5,
  },
  {
    n: "Rachid",
    c: "Saint-Avold",
    t: "Escalier et garde-corps fabriqués à l'atelier. On a pu voir les pièces avant la pose.",
    s: 5,
  },
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-[2px] px-6 text-[16px] font-semibold transition-colors";
const btnFire = cn(btn, "bg-(--etincelle) text-(--acier) hover:brightness-105");
const btnDark = cn(btn, "bg-(--acier) text-white hover:bg-black");
const btnLine = cn(btn, "ring-1 ring-inset ring-current/30 hover:ring-current");

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        cond,
        "text-[34px] leading-[1] font-semibold tracking-[-0.01em] text-balance @min-[900px]:text-[52px]",
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
    <header className="sticky top-0 z-30 bg-(--acier) text-white">
      <div className={cn("flex h-17 items-center gap-8", pad)}>
        <Go to="home" className="flex items-center gap-3 text-left" label="Clé et Fer, accueil">
          <span className="grid size-9 place-items-center rounded-[2px] bg-white text-(--acier)">
            <KeyRound className="size-5" />
          </span>
          <span className={cn(cond, "text-[23px] font-bold tracking-[0.01em]")}>Clé &amp; Fer</span>
        </Go>
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="py-2 text-[15px] text-white/65 hover:text-white aria-[current=page]:text-white aria-[current=page]:shadow-[inset_0_-2px_0_var(--etincelle)]"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <Go
          to="depannage"
          className={cn(
            btnFire,
            "ml-auto hidden h-11 px-5 text-[15px] @min-[900px]:inline-flex @min-[1100px]:ml-0",
          )}
        >
          <Phone className="size-4" /> {PHONE}
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid size-11 place-items-center rounded-[2px] ring-1 ring-white/25 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? (
            <X className="size-5" />
          ) : (
            <span className="text-[13px] font-semibold">Menu</span>
          )}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-5 pb-4 @min-[1100px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className="flex w-full items-center justify-between border-b border-white/10 py-3.5 text-[17px] font-semibold"
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
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-black/10 bg-white p-3 @min-[900px]:hidden">
      <Go to="depannage" className={cn(btnFire, "h-12 px-3 text-[15px]")}>
        <Phone className="size-4" /> Dépannage
      </Go>
      <Go to="contact" className={cn(btnDark, "h-12 px-3 text-[15px]")}>
        Devis atelier
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--acier) text-white/60">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <p className={cn(cond, "text-[24px] font-bold text-white")}>Clé &amp; Fer</p>
          <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed">
            Serrurerie et métallerie à Forbach. Atelier de fabrication, dépannage 7 jours sur 7 sur
            Forbach et 15 km autour.
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
          <p className="font-semibold text-white">Dépannage</p>
          <p className="mt-3">
            7 jours sur 7, de 7 h à 23 h
            <br />
            Prix annoncé avant de partir
            <br />
            Facture détaillée sur place
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Atelier</p>
          <p className="mt-3 text-[22px] font-semibold text-white">{PHONE}</p>
          <p className="mt-1">contact@cle-et-fer-exemple.fr</p>
          <p className="mt-1">Visite de l&apos;atelier sur rendez-vous, Forbach (57)</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Clé &amp; Fer</span>
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
  dark = false,
}: {
  crumb: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "pt-12 pb-12 @min-[900px]:pt-16 @min-[900px]:pb-16",
        pad,
        dark ? "bg-(--fer) text-white" : "bg-(--blanc)",
      )}
    >
      <p className={cn("text-[14px]", dark ? "text-white/50" : "text-black/50")}>
        <Go to="home" className={dark ? "hover:text-white" : "hover:text-black"}>
          Accueil
        </Go>{" "}
        / <span className={dark ? "text-white/80" : "text-black/75"}>{crumb}</span>
      </p>
      <h1
        className={cn(
          cond,
          "mt-5 max-w-[860px] text-[40px] leading-[0.98] font-semibold text-balance @min-[900px]:text-[64px]",
        )}
      >
        {title}
      </h1>
      {intro && (
        <p
          className={cn(
            "mt-5 max-w-[620px] text-[17px] leading-relaxed",
            dark ? "text-white/65" : "text-black/60",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      {/* Premier écran coupé en deux : l'urgence d'un côté, l'atelier de l'autre */}
      <section className="grid @min-[900px]:min-h-[620px] @min-[900px]:grid-cols-[0.9fr_1.1fr]">
        <div
          className={cn(
            "flex flex-col justify-center bg-(--blanc) py-10 @min-[900px]:py-12 @min-[900px]:pr-12",
            pad,
          )}
        >
          <p className="text-[15px] font-medium text-(--etincelle-t)">
            Dépannage à Forbach, 7 jours sur 7
          </p>
          <h1
            className={cn(
              cond,
              "mt-3 text-[42px] leading-[0.96] font-bold @min-[900px]:text-[60px]",
            )}
          >
            Bloqué dehors&nbsp;? Le prix d&apos;abord, la porte ensuite.
          </h1>
          <table className="mt-7 w-full max-w-[440px] text-[15.5px]">
            <tbody>
              {[
                ["Porte claquée", "89 €"],
                ["Porte fermée à clé", "129 €"],
                ["Serrure bloquée", "149 €"],
              ].map(([t, p]) => (
                <tr key={t} className="border-b border-black/10">
                  <td className="py-2.5">{t}</td>
                  <td className="py-2.5 text-right font-semibold">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[13.5px] text-black/50">
            TTC, déplacement compris en journée. Prix confirmé au téléphone.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Go to="depannage" className={btnFire}>
              <Phone className="size-4.5" /> {PHONE}
            </Go>
            <Go to="depannage" className={cn(btnLine, "text-(--acier)")}>
              Tous les tarifs
            </Go>
          </div>
        </div>
        <div className="relative min-h-[420px] text-white">
          <Photo
            src="ser-hero"
            alt="Étincelles de découpe sur des tubes d'acier"
            priority
            sizes="(min-width: 1024px) 700px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--acier) via-(--acier)/40 to-transparent" />
          <div className={cn("absolute inset-x-0 bottom-0 pb-10", pad)}>
            <p className="text-[15px] text-white/70">Métallerie sur mesure</p>
            <p
              className={cn(
                cond,
                "mt-2 max-w-[520px] text-[36px] leading-[1] font-semibold @min-[900px]:text-[46px]",
              )}
            >
              Portails, garde-corps et verrières fabriqués à Forbach.
            </p>
            <Go to="metallerie" className={cn(btnLine, "mt-6 text-white")}>
              Voir l&apos;atelier <ArrowRight className="size-4" />
            </Go>
          </div>
        </div>
      </section>

      {/* Confiance */}
      <section
        className={cn(
          "grid gap-6 border-b border-black/8 bg-white py-9 @min-[900px]:grid-cols-4",
          pad,
        )}
      >
        {[
          ["Une vraie adresse", "Atelier à Forbach depuis 2004, pas un numéro de plateforme."],
          ["Prix annoncé", "Au téléphone avant de partir, rien d'ajouté sur place."],
          ["Facture détaillée", "Pièces et main-d'œuvre séparées, pour votre assurance."],
          ["Garantie décennale", "Pour toute la métallerie posée."],
        ].map(([t, d]) => (
          <div key={t}>
            <p className="flex items-center gap-2 text-[16px] font-semibold">
              <ShieldCheck className="size-4.5 text-(--etincelle-t)" /> {t}
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-black/55">{d}</p>
          </div>
        ))}
      </section>

      {/* Métallerie */}
      <section className={cn("bg-white py-16 @min-[900px]:py-24", pad)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <H2 className="max-w-[620px]">
            Dessiné avec vous, soudé à l&apos;atelier, posé par nous.
          </H2>
          <Go
            to="metallerie"
            className="inline-flex items-center gap-2 text-[15px] font-semibold underline-offset-4 hover:underline"
          >
            Toutes les réalisations <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="mt-10 grid gap-4 @min-[900px]:grid-cols-3 @min-[900px]:grid-rows-[260px_260px]">
          {[works[0], works[1], works[2]].map((w, i) => (
            <Go
              key={w.src}
              to="metallerie"
              param={w.k}
              className={cn(
                "group relative h-[260px] overflow-hidden text-left text-white @min-[900px]:h-auto",
                i === 0 && "@min-[900px]:row-span-2",
              )}
            >
              <Photo
                src={w.src}
                alt={w.t}
                sizes="(min-width: 1024px) 400px, 100vw"
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-0 left-0 p-5">
                <span className="block text-[13px] text-white/70">{w.k}</span>
                <span className="mt-1 block text-[18px] font-semibold">{w.t}</span>
              </span>
            </Go>
          ))}
        </div>
      </section>

      {/* Fabrication : une vraie suite d'étapes */}
      <section className={cn("bg-(--fer) py-16 text-white @min-[900px]:py-24", pad)}>
        <H2>De la prise de cotes à la pose</H2>
        <ol className="mt-12 grid gap-10 @min-[900px]:grid-cols-4 @min-[900px]:gap-8">
          {[
            ["Prise de cotes", "Sur place, gratuite, avec photos et croquis."],
            ["Plan validé", "Vous validez le dessin, la teinte et le prix ferme."],
            ["Fabrication", "Découpe, soudure et thermolaquage : 3 à 5 semaines."],
            ["Pose", "Une demi-journée à deux jours selon l'ouvrage."],
          ].map(([t, d], i) => (
            <li key={t} className="border-t-2 border-(--etincelle) pt-5">
              <span className={cn(cond, "text-[18px] font-semibold text-(--etincelle)")}>
                Étape {i + 1}
              </span>
              <p className={cn(cond, "mt-2 text-[26px] font-semibold")}>{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/65">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Avis */}
      <section className={cn("bg-(--blanc) py-16 @min-[900px]:py-24", pad)}>
        <div className="grid gap-10 @min-[900px]:grid-cols-[280px_1fr] @min-[900px]:gap-16">
          <div>
            <p className="flex items-center gap-2 text-[15px] text-black/60">
              <GoogleG className="size-5" /> Avis Google
            </p>
            <p className={cn(cond, "mt-3 text-[84px] leading-none font-bold")}>4,8</p>
            <Stars className="mt-3 text-[18px]" />
            <p className="mt-2 text-[15px] text-black/55">112 avis</p>
          </div>
          <div className="grid gap-8 @min-[900px]:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.n} className="border-t border-black/15 pt-5">
                <Stars value={r.s} className="text-[14px]" />
                <blockquote className="mt-3 text-[16px] leading-relaxed">{r.t}</blockquote>
                <figcaption className="mt-4 text-[14px] text-black/55">
                  {r.n}, {r.c}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        className={cn(
          "grid gap-6 bg-white py-14 @min-[900px]:grid-cols-[1fr_auto] @min-[900px]:items-center",
          pad,
        )}
      >
        <p className="max-w-[640px] text-[16px] leading-relaxed text-black/60">
          <b className="text-(--ink-text)">Méfiez-vous des numéros trouvés sur des prospectus :</b>{" "}
          un serrurier sérieux annonce son prix avant de se déplacer et vous remet une facture
          détaillée. Nous ne démarchons jamais.
        </p>
        <Go to="contact" className={btnDark}>
          Nous écrire
        </Go>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------- Dépannage */

function Depannage() {
  const [situation, setSituation] = useState<Situation>("Porte claquée");
  const [moment, setMoment] = useState<Moment>("En journée");
  const price = basePrice[situation] + surcharge[moment];
  const chip =
    "min-h-11 rounded-[2px] px-4 py-2 text-left text-[15px] ring-1 ring-inset ring-white/20 hover:ring-white/50 aria-pressed:bg-white aria-pressed:text-(--acier) aria-pressed:ring-white";
  return (
    <>
      <PageTitle
        dark
        crumb="Dépannage"
        title="Nos tarifs de dépannage, sans surprise"
        intro="Choisissez votre situation : vous voyez le prix que nous vous annoncerons au téléphone."
      />
      <section
        className={cn(
          "grid gap-10 bg-(--fer) pb-16 text-white @min-[900px]:grid-cols-[1.2fr_1fr] @min-[900px]:gap-16",
          pad,
        )}
      >
        <div className="space-y-8">
          <div>
            <p className="text-[15px] font-semibold text-white/80">Votre situation</p>
            <Pick
              options={situations}
              value={situation}
              onChange={setSituation}
              className="mt-3 grid gap-2 @min-[600px]:grid-cols-2"
              itemClassName={chip}
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-white/80">Quand ?</p>
            <Pick
              options={moments}
              value={moment}
              onChange={setMoment}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
        </div>
        <div className="self-start bg-white p-7 text-(--ink-text)">
          <p className="text-[14px] text-black/55">
            {situation}, {moment.toLowerCase()}
          </p>
          <p className={cn(cond, "mt-2 text-[64px] leading-none font-bold")}>{price} €</p>
          <p className="mt-1 text-[14px] text-black/50">
            TTC, déplacement compris à Forbach et 15 km autour
          </p>
          <p className="mt-5 border-t border-black/10 pt-5 text-[15.5px] leading-relaxed">
            {included[situation]}
          </p>
          <Go to="contact" param="depannage" className={cn(btnFire, "mt-6 w-full")}>
            <Phone className="size-4.5" /> Appeler le {PHONE}
          </Go>
        </div>
      </section>
      <section
        className={cn(
          "grid gap-10 bg-white py-16 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:items-center @min-[900px]:gap-16",
          pad,
        )}
      >
        <div className="relative h-[280px] overflow-hidden @min-[900px]:h-[380px]">
          <Photo
            src="ser-cylindre"
            alt="Clé dans un cylindre de serrure"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
        <div>
          <H2>Et après l&apos;ouverture ?</H2>
          <ul className="mt-6 space-y-4 text-[16px]">
            {[
              "Cylindres de sécurité certifiés, avec carte de propriété pour refaire les clés",
              "Serrures 3 points posées en une heure, sans changer la porte",
              "Conseil gratuit pour votre assurance habitation",
            ].map((l) => (
              <li key={l} className="flex gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-(--etincelle-t)" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------- Métallerie */

const kinds = ["Tout", "Portails", "Garde-corps et escaliers", "Verrières"] as const;
const gateTypes = ["Battant", "Coulissant"] as const;
const fills = ["Barreaudé", "Plein", "Ajouré"] as const;

function Metallerie() {
  const { param } = useSite();
  const [kind, setKind] = useState<(typeof kinds)[number]>(
    (kinds as readonly string[]).includes(param ?? "") ? (param as (typeof kinds)[number]) : "Tout",
  );
  const [type, setType] = useState<(typeof gateTypes)[number]>("Battant");
  const [fill, setFill] = useState<(typeof fills)[number]>("Barreaudé");
  const [width, setWidth] = useState(3.5);
  const shown = works.filter((w) => kind === "Tout" || w.k === kind);
  const base =
    width * (fill === "Plein" ? 780 : fill === "Ajouré" ? 950 : 620) +
    (type === "Coulissant" ? 900 : 0);
  const fmt = (n: number) => (Math.round(n / 100) * 100).toLocaleString("fr-FR");
  const chip =
    "h-11 rounded-[2px] px-5 text-[15px] ring-1 ring-inset ring-black/15 hover:ring-black/40 aria-pressed:bg-(--acier) aria-pressed:text-white aria-pressed:ring-(--acier)";
  return (
    <>
      <PageTitle
        crumb="Métallerie"
        title="L'atelier : portails, escaliers, garde-corps, verrières"
        intro="Tout est dessiné, découpé et soudé à Forbach, puis thermolaqué dans la teinte de votre choix."
      />
      <section className={cn("bg-white py-14", pad)}>
        <Pick options={kinds} value={kind} onChange={setKind} itemClassName={chip} />
        <div className="mt-8 grid gap-6 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-3">
          {shown.map((w) => (
            <figure key={w.src}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo src={w.src} alt={w.t} sizes="(min-width: 1024px) 380px, 100vw" />
              </div>
              <figcaption className="mt-3">
                <span className="block text-[17px] font-semibold">{w.t}</span>
                <span className="block text-[14px] text-black/55">
                  {w.c}, {w.d}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section
        className={cn(
          "grid gap-12 bg-(--blanc) py-16 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <H2>Estimez votre portail</H2>
          <div className="mt-8 space-y-7">
            <div>
              <p className="text-[15px] font-semibold">Ouverture</p>
              <Pick
                options={gateTypes}
                value={type}
                onChange={setType}
                className="mt-3"
                itemClassName={chip}
              />
            </div>
            <div>
              <p className="text-[15px] font-semibold">Remplissage</p>
              <Pick
                options={fills}
                value={fill}
                onChange={setFill}
                className="mt-3"
                itemClassName={chip}
              />
            </div>
            <label className="block">
              <span className="flex justify-between text-[15px] font-semibold">
                Largeur du passage{" "}
                <span className="text-(--etincelle-t)">{width.toLocaleString("fr-FR")} m</span>
              </span>
              <input
                type="range"
                min={2.5}
                max={6}
                step={0.1}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="mt-4 w-full accent-(--etincelle)"
              />
            </label>
          </div>
        </div>
        <div className="self-end bg-(--acier) p-7 text-white">
          {/* Dessin du portail, mis à jour par les réglages */}
          <svg viewBox="0 0 300 120" className="w-full" aria-hidden="true">
            <rect x="0" y="112" width="300" height="2" fill="#555" />
            <rect x="8" y="20" width="10" height="92" fill="#9aa2aa" />
            <rect x="282" y="20" width="10" height="92" fill="#9aa2aa" />
            {(type === "Battant"
              ? [
                  [20, 129],
                  [151, 129],
                ]
              : [[20, 260]]
            ).map(([x, w]) => (
              <g key={x}>
                <rect
                  x={x}
                  y="30"
                  width={w}
                  height="78"
                  fill="none"
                  stroke="#f2f2f0"
                  strokeWidth="3"
                />
                {fill === "Plein" && (
                  <rect x={x + 3} y="33" width={w - 6} height="72" fill="#3a4047" />
                )}
                {fill === "Barreaudé" &&
                  Array.from({ length: Math.floor(w / 12) }).map((_, i) => (
                    <rect
                      key={i}
                      x={x + 8 + i * 12}
                      y="33"
                      width="2.5"
                      height="72"
                      fill="#f2f2f0"
                    />
                  ))}
                {fill === "Ajouré" &&
                  Array.from({ length: Math.floor(w / 18) }).map((_, i) => (
                    <path key={i} d={`M${x + 9 + i * 18} 36 l8 34 l-8 34 l8-34z`} fill="#f2f2f0" />
                  ))}
              </g>
            ))}
            {type === "Coulissant" && (
              <path
                d="M120 22 h60 m-6 -4 l6 4 l-6 4"
                stroke="#ff6b1a"
                strokeWidth="2"
                fill="none"
              />
            )}
          </svg>
          <p className="mt-6 text-[14px] text-white/60">
            Fourchette indicative, fabrication et pose, TTC
          </p>
          <p className={cn(cond, "mt-1 text-[48px] leading-none font-bold")}>
            {fmt(base * 0.9)} – {fmt(base * 1.15)} €
          </p>
          <p className="mt-3 text-[14px] text-white/60">
            Motorisation en option. Fabrication en 3 à 5 semaines après validation du plan.
          </p>
          <Go to="contact" param="portail" className={cn(btnFire, "mt-6 w-full")}>
            Demander la prise de cotes gratuite
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------------- Atelier */

function Atelier() {
  return (
    <>
      <PageTitle
        dark
        crumb="L'atelier"
        title="Trois serruriers, un atelier de 300 m²"
        intro="Nous faisons nous-mêmes le dépannage et la fabrication. Vous pouvez venir voir votre ouvrage avant la pose."
      />
      <section
        className={cn("grid gap-6 bg-(--fer) pb-16 @min-[900px]:grid-cols-[1.4fr_1fr]", pad)}
      >
        <div className="relative h-[300px] overflow-hidden @min-[900px]:h-[460px]">
          <Photo
            src="ser-meuleuse"
            alt="Meulage d'une pièce d'acier à l'atelier"
            sizes="(min-width: 1024px) 700px, 100vw"
          />
        </div>
        <div className="grid gap-6">
          <div className="relative h-[220px] overflow-hidden">
            <Photo src="ser-cle" alt="Remise des clés après la pose d'une serrure" sizes="480px" />
          </div>
          <dl className="grid grid-cols-2 gap-6 text-white">
            {[
              ["2004", "création de l'atelier"],
              ["7 j / 7", "pour le dépannage"],
              ["3 à 5 sem.", "de fabrication"],
              ["10 ans", "de garantie sur la pose"],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-white/20 pt-3">
                <dt className={cn(cond, "text-[28px] font-semibold")}>{t}</dt>
                <dd className="text-[14px] text-white/60">{d}</dd>
              </div>
            ))}
          </dl>
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
  const [subject, setSubject] = useState<
    "Dépannage" | "Portail ou clôture" | "Escalier, garde-corps, verrière"
  >(
    param === "depannage"
      ? "Dépannage"
      : param === "portail"
        ? "Portail ou clôture"
        : "Escalier, garde-corps, verrière",
  );
  const field =
    "mt-2 h-12 w-full rounded-[2px] bg-white px-4 text-[16px] ring-1 ring-inset ring-black/15 outline-none focus:ring-2 focus:ring-(--etincelle)";
  return (
    <>
      <PageTitle crumb="Contact" title="Une urgence ? Appelez. Un projet ? Écrivez-nous." />
      <section
        className={cn(
          "grid gap-12 bg-(--blanc) pb-20 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20",
          pad,
        )}
      >
        <div>
          <p className="text-[15px] text-black/55">Dépannage, 7 h – 23 h tous les jours</p>
          <p className={cn(cond, "mt-2 text-[44px] leading-none font-bold")}>{PHONE}</p>
          <dl className="mt-10 space-y-6 text-[15.5px]">
            <div>
              <dt className="font-semibold">Zone</dt>
              <dd className="mt-1 text-black/60">
                Forbach, Stiring-Wendel, Behren, Freyming-Merlebach, Saint-Avold et alentours
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Atelier</dt>
              <dd className="mt-1 text-black/60">Visite sur rendez-vous, du lundi au vendredi</dd>
            </div>
          </dl>
        </div>
        <DemoForm
          success={{
            title: "Demande envoyée",
            text:
              subject === "Dépannage"
                ? "Pour une urgence, appelez directement : nous rappelons les messages dans l'heure."
                : "Nous vous rappelons pour fixer la prise de cotes, gratuite.",
          }}
          submit="Envoyer"
          submitClassName={cn(btnDark, "mt-7 w-full")}
        >
          <Pick
            options={
              ["Dépannage", "Portail ou clôture", "Escalier, garde-corps, verrière"] as const
            }
            value={subject}
            onChange={setSubject}
            itemClassName="h-11 rounded-[2px] px-4 text-[15px] ring-1 ring-inset ring-black/15 aria-pressed:bg-(--acier) aria-pressed:text-white aria-pressed:ring-(--acier)"
          />
          <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Nom</span>
              <input className={field} />
            </label>
            <label className="block">
              <span className="text-[14px] font-medium text-black/70">Téléphone</span>
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
            <label className="block @min-[900px]:col-span-2">
              <span className="text-[14px] font-medium text-black/70">
                {subject === "Dépannage" ? "Adresse et situation" : "Dimensions, matériau, idées"}
              </span>
              <textarea rows={4} className={cn(field, "h-auto resize-none py-3")} />
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
        intro="Clé & Fer est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("bg-(--blanc) pb-20", pad)}>
        <PhotoCredits
          photos={[
            "ser-hero",
            ...works.map((w) => w.src),
            "ser-cylindre",
            "ser-meuleuse",
            "ser-cle",
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
          id: "depannage",
          label: "Dépannage et tarifs",
          path: "/depannage",
          render: () => <Depannage />,
        },
        {
          id: "metallerie",
          label: "Métallerie",
          path: "/metallerie",
          render: () => <Metallerie />,
        },
        { id: "atelier", label: "L'atelier", path: "/atelier", render: () => <Atelier /> },
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
