"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { ArrowRight, Check, Phone, X } from "lucide-react";
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
 * Thermalis, chauffagiste à Saint-Avold (entreprise fictive).
 * Pompes à chaleur, chaudières et contrats d'entretien. Le site répond aux deux
 * questions des clients : « combien ça me coûte, aides déduites ? » (simulateur)
 * et « quand pouvez-vous venir faire l'entretien ? » (prise de rendez-vous).
 * Bleu nuit, blanc givre et une seule couleur chaude, la braise.
 */

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

const PHONE = "06 39 98 75 64";

const vars = {
  "--nuit": "#17202a",
  "--givre": "#eef2f5",
  "--braise": "#d4521c",
  "--braise-t": "#a83c0c",
  "--ink-text": "#17202a",
  fontFamily: bricolage.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";

/* ---------------------------------------------------------------- Données */

const surfaces = ["80 m²", "120 m²", "160 m²"] as const;
const energies = ["Fioul", "Gaz", "Électrique"] as const;
const incomes = ["Très modestes", "Modestes", "Intermédiaires", "Supérieurs"] as const;

const reviews = [
  {
    n: "Sandrine",
    c: "Saint-Avold",
    when: "il y a 3 semaines",
    s: 5,
    t: "Remplacement de notre vieille chaudière fioul par une pompe à chaleur. Dossier d'aides monté par eux, pose en trois jours, maison chaude dès le premier soir.",
  },
  {
    n: "Thierry",
    c: "Creutzwald",
    when: "il y a 1 mois",
    s: 5,
    t: "Rendez-vous d'entretien pris en ligne un dimanche soir, technicien à l'heure le mardi. Rappel automatique l'an prochain, c'est pratique.",
  },
  {
    n: "Fatima",
    c: "Forbach",
    when: "il y a 2 mois",
    s: 5,
    t: "Panne de chaudière un samedi de janvier : dépanné dans l'après-midi. Le technicien a expliqué ce qui avait lâché, photo à l'appui.",
  },
  {
    n: "Laurent",
    c: "Faulquemont",
    when: "il y a 4 mois",
    s: 4,
    t: "Plancher chauffant bien réalisé. Un peu de délai pour la mise en service finale, mais un suivi sérieux.",
  },
];

const plans = [
  {
    t: "Essentiel",
    p: "12",
    d: "Chaudière gaz ou fioul",
    f: ["Visite annuelle obligatoire", "Attestation d'entretien", "Rappel avant la date"],
  },
  {
    t: "Confort",
    p: "18",
    d: "Chaudière ou pompe à chaleur",
    f: ["Tout l'Essentiel", "Dépannage sous 24 h", "Main-d'œuvre et déplacement inclus"],
    best: true,
  },
  {
    t: "Sérénité",
    p: "26",
    d: "Pompe à chaleur",
    f: ["Tout le Confort", "Pièces d'usure incluses", "Contrôle d'étanchéité du circuit"],
  },
];

const towns = [
  "Saint-Avold",
  "Forbach",
  "Creutzwald",
  "Freyming-Merlebach",
  "Faulquemont",
  "Hombourg-Haut",
  "L'Hôpital",
  "Longeville-lès-Saint-Avold",
  "Boulay-Moselle",
  "Carling",
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-13 items-center justify-center gap-2 rounded-[10px] px-6 text-[16px] font-semibold transition-colors";
const btnHot = cn(btn, "bg-(--braise) text-white hover:bg-(--braise-t)");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--nuit)/20 hover:ring-(--nuit)/60");
const chip =
  "h-11 rounded-[10px] px-4 text-[15px] font-medium ring-1 ring-inset ring-(--nuit)/15 transition-colors hover:ring-(--nuit)/40 aria-pressed:bg-(--nuit) aria-pressed:text-white aria-pressed:ring-(--nuit)";

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-[32px] leading-[1.02] font-bold tracking-[-0.035em] text-balance @min-[900px]:text-[48px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

const euros = (n: number) => `${(Math.round(n / 100) * 100).toLocaleString("fr-FR")} €`;

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? "#fff" : "var(--nuit)"} />
        <path
          d="M16 7c3.6 4.3 6 7.4 6 11a6 6 0 0 1-12 0c0-2 .9-3.8 2.4-5.6.4 1.6 1.3 2.7 2.4 3.1C14.6 12.8 15 9.8 16 7Z"
          fill="var(--braise)"
        />
      </svg>
      <span className={cn("text-[22px] font-extrabold tracking-[-0.04em]", light && "text-white")}>
        Thermalis
      </span>
    </span>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white shadow-[0_1px_0_rgb(23_32_42/0.08)]">
      <div className={cn("flex h-[74px] items-center gap-8", pad)}>
        <Go to="home" label="Thermalis, accueil">
          <Logo />
        </Go>
        <nav className="hidden items-center gap-1 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="rounded-[8px] px-3 py-2 text-[15px] font-medium text-(--nuit)/65 hover:text-(--nuit) aria-[current=page]:bg-(--givre) aria-[current=page]:text-(--nuit)"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <span className="ml-auto hidden text-right leading-tight @min-[900px]:block">
          <span className="block text-[12.5px] text-(--nuit)/55">Dépannage 6 jours sur 7</span>
          <span className="block text-[17px] font-bold">{PHONE}</span>
        </span>
        <Go
          to="entretien"
          className={cn(btnHot, "hidden h-11 px-5 text-[15px] @min-[900px]:inline-flex")}
        >
          Réserver un entretien
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid h-11 min-w-11 place-items-center rounded-[10px] px-3 text-[14px] font-semibold ring-1 ring-(--nuit)/15 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? <X className="size-5" /> : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-(--nuit)/8 px-5 pb-4 @min-[1100px]:hidden">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOpen(false);
                go(p.id);
              }}
              className="flex w-full items-center justify-between border-b border-(--nuit)/8 py-3.5 text-[18px] font-semibold"
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
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-(--nuit)/10 bg-white p-3 @min-[900px]:hidden">
      <Go to="contact" className={cn(btnLine, "h-12 text-[15px]")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="entretien" className={cn(btnHot, "h-12 text-[15px]")}>
        Rendez-vous
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--nuit) text-white/60">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.4fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <Logo light />
          <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed">
            Pompes à chaleur, chaudières et entretien à Saint-Avold et dans le bassin houiller,
            depuis 2008.
          </p>
          <p className="mt-5 text-[13px]">RGE QualiPAC, Professionnel du Gaz, garantie décennale</p>
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
            Lundi au vendredi, 8 h – 18 h
            <br />
            Dépannage le samedi, 8 h – 17 h
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-semibold text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-bold text-white">{PHONE}</p>
          <p className="mt-1">contact@thermalis-exemple.fr</p>
          <p className="mt-1">Saint-Avold et 30 km autour</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Thermalis</span>
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
  photo,
}: {
  crumb: string;
  title: string;
  intro?: string;
  photo?: string;
}) {
  return (
    <div
      className={cn(
        "grid bg-(--givre) @min-[900px]:grid-cols-[1.2fr_1fr]",
        !photo && "@min-[900px]:grid-cols-1",
      )}
    >
      <div className={cn("py-10 @min-[900px]:py-16", pad)}>
        <p className="text-[14px] text-(--nuit)/50">
          <Go to="home" className="hover:text-(--nuit)">
            Accueil
          </Go>{" "}
          / <span className="text-(--nuit)/75">{crumb}</span>
        </p>
        <h1 className="mt-4 max-w-[760px] text-[36px] leading-[1.02] font-bold tracking-[-0.04em] text-balance @min-[900px]:text-[54px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-(--nuit)/65">{intro}</p>
        )}
      </div>
      {photo && (
        <div className="relative hidden @min-[900px]:block">
          <Photo src={photo} alt="" sizes="560px" />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- Simulateur */

function Simulateur() {
  const [surface, setSurface] = useState<(typeof surfaces)[number]>("120 m²");
  const [energy, setEnergy] = useState<(typeof energies)[number]>("Fioul");
  const [income, setIncome] = useState<(typeof incomes)[number]>("Modestes");
  const m2 = parseInt(surface);
  const price = 9000 + m2 * 35;
  const aid =
    { "Très modestes": 9000, Modestes: 7000, Intermédiaires: 4000, Supérieurs: 1500 }[income] +
    (energy === "Fioul" ? 1000 : 0);
  const rest = Math.max(price - aid, 0);
  const saving = m2 * { Fioul: 14, Gaz: 7, Électrique: 11 }[energy];
  return (
    <div className="grid overflow-hidden rounded-[16px] ring-1 ring-(--nuit)/10 @min-[900px]:grid-cols-[1.1fr_1fr]">
      <div className="space-y-7 bg-white p-6 @min-[900px]:p-10">
        <div>
          <p className="text-[15px] font-semibold">Surface chauffée</p>
          <Pick
            options={surfaces}
            value={surface}
            onChange={setSurface}
            className="mt-3"
            itemClassName={chip}
          />
        </div>
        <div>
          <p className="text-[15px] font-semibold">Chauffage actuel</p>
          <Pick
            options={energies}
            value={energy}
            onChange={setEnergy}
            className="mt-3"
            itemClassName={chip}
          />
        </div>
        <div>
          <p className="text-[15px] font-semibold">Revenus du foyer</p>
          <Pick
            options={incomes}
            value={income}
            onChange={setIncome}
            className="mt-3"
            itemClassName={chip}
          />
          <p className="mt-2 text-[13px] text-(--nuit)/50">
            Selon les plafonds de l&apos;Anah, qui dépendent du nombre de personnes.
          </p>
        </div>
      </div>
      <div className="flex flex-col bg-(--nuit) p-6 text-white @min-[900px]:p-10">
        <p className="text-[15px] text-white/60">
          Pompe à chaleur air-eau, posée et mise en service
        </p>
        <dl className="mt-6 divide-y divide-white/12 text-[16px]">
          <div className="flex justify-between py-3">
            <dt className="text-white/70">Prix posé</dt>
            <dd className="font-semibold">{euros(price)}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-white/70">Aides estimées</dt>
            <dd className="font-semibold">– {euros(aid)}</dd>
          </div>
          <div className="flex items-baseline justify-between py-4">
            <dt className="text-white/70">Reste à payer</dt>
            <dd className="text-[40px] leading-none font-bold tracking-[-0.03em]">{euros(rest)}</dd>
          </div>
        </dl>
        <p className="mt-2 rounded-[10px] bg-white/8 px-4 py-3 text-[15px]">
          Économie de chauffage : environ <b>{euros(saving)} par an</b> par rapport au{" "}
          {energy.toLowerCase()}.
        </p>
        <Go to="pac" className={cn(btnHot, "mt-auto w-full")}>
          Obtenir mon étude gratuite
        </Go>
        <p className="mt-3 text-[12.5px] text-white/45">
          Estimation indicative. Montants exacts après visite et simulation officielle des aides.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      {/* Premier écran : photo en bandeau, panneau blanc qui la chevauche */}
      <section className="relative">
        <div className="relative h-[260px] @min-[900px]:h-[440px]">
          <Photo
            src="chf-hero"
            alt="Pompe à chaleur installée devant une maison blanche"
            priority
            sizes="100vw"
            position="50% 60%"
          />
        </div>
        <div className={cn("relative @min-[900px]:-mt-[180px]", pad)}>
          <div className="grid gap-8 bg-white py-8 @min-[900px]:grid-cols-[1.7fr_1fr] @min-[900px]:gap-12 @min-[900px]:rounded-t-[18px] @min-[900px]:px-12 @min-[900px]:pt-11 @min-[900px]:pb-4">
            <div>
              <p className="text-[15px] font-semibold text-(--braise-t)">
                Chauffagiste RGE à Saint-Avold
              </p>
              <h1 className="mt-3 text-[38px] leading-[1] font-extrabold tracking-[-0.045em] text-balance @min-[900px]:text-[54px]">
                Sortez du fioul. Votre pompe à chaleur posée en 3 jours.
              </h1>
              <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-(--nuit)/65">
                Étude gratuite, aides déduites du devis, puis entretien chaque année. Un seul
                interlocuteur, de la visite au premier hiver.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Go to="pac" className={btnHot}>
                  Estimer mes aides
                </Go>
                <Go to="entretien" className={btnLine}>
                  Réserver un entretien
                </Go>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-(--nuit)/10 pt-6 @min-[900px]:mt-10 @min-[900px]:h-fit @min-[900px]:border-t-0 @min-[900px]:border-l @min-[900px]:pt-0 @min-[900px]:pl-10">
              {[
                ["340", "pompes à chaleur posées"],
                ["24 h", "dépannage sous contrat"],
                ["4,8", "sur 203 avis Google"],
                ["RGE", "QualiPAC, aides possibles"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-[30px] leading-none font-bold tracking-[-0.03em]">{v}</dt>
                  <dd className="mt-1.5 text-[14px] leading-snug text-(--nuit)/55">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Saison d'entretien */}
      <section className={cn("pt-4 pb-2", pad)}>
        <Go
          to="entretien"
          className="group flex w-full flex-wrap items-center justify-between gap-3 rounded-[12px] bg-(--givre) px-6 py-4 text-left"
        >
          <span className="text-[16px]">
            <b className="font-semibold">Entretien annuel :</b> prochains créneaux libres dès le
            mardi 17 novembre.
          </span>
          <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-(--braise-t)">
            Choisir un créneau{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Go>
      </section>

      {/* Simulateur */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="mb-10 grid gap-4 @min-[900px]:grid-cols-[1fr_1fr] @min-[900px]:items-end">
          <H2>Combien coûte une pompe à chaleur, aides déduites&nbsp;?</H2>
          <p className="text-[16.5px] leading-relaxed text-(--nuit)/60 @min-[900px]:pl-10">
            Trois réponses, une première estimation. On affine ensuite pendant la visite, offerte et
            sans engagement.
          </p>
        </div>
        <Simulateur />
      </section>

      {/* Prestations */}
      <section className={cn("bg-(--givre) py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[640px]">Tout le chauffage de la maison</H2>
        <div className="mt-10 grid gap-5 @min-[900px]:grid-cols-3">
          {[
            {
              src: "chf-pac2",
              t: "Pompe à chaleur",
              d: "Air-eau ou air-air, dimensionnée pour votre maison, avec dossier d'aides.",
              to: "pac",
            },
            {
              src: "chf-chaufferie",
              t: "Chaudières et entretien",
              d: "Entretien annuel, réparation et remplacement, gaz et fioul.",
              to: "entretien",
            },
            {
              src: "chf-radiateur",
              t: "Radiateurs et plancher chauffant",
              d: "Remplacement, équilibrage et thermostats programmables.",
              to: "contact",
            },
          ].map((s) => (
            <Go
              key={s.t}
              to={s.to}
              className="group overflow-hidden rounded-[14px] bg-white text-left"
            >
              <span className="relative block h-[220px] overflow-hidden">
                <Photo
                  src={s.src}
                  alt={s.t}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </span>
              <span className="block p-6">
                <span className="block text-[21px] font-bold tracking-[-0.02em]">{s.t}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-(--nuit)/60">
                  {s.d}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-(--braise-t)">
                  En savoir plus <ArrowRight className="size-4" />
                </span>
              </span>
            </Go>
          ))}
        </div>
      </section>

      {/* Contrats */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="grid gap-10 @min-[900px]:grid-cols-[1fr_2fr] @min-[900px]:gap-14">
          <div>
            <H2>Un contrat, et on pense à l&apos;entretien pour vous.</H2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-(--nuit)/60">
              L&apos;entretien d&apos;une chaudière est obligatoire chaque année. Avec un contrat,
              on vous rappelle, on vient, et l&apos;attestation arrive par e-mail.
            </p>
          </div>
          <Plans />
        </div>
      </section>

      {/* Avis + photo */}
      <section className="grid @min-[900px]:grid-cols-[1fr_1.2fr]">
        <div className="relative h-[300px] @min-[900px]:h-auto">
          <Photo
            src="chf-salon"
            alt="Salon lumineux et chaud en hiver"
            sizes="(min-width: 1024px) 580px, 100vw"
          />
        </div>
        <div className={cn("bg-(--nuit) py-16 text-white @min-[900px]:py-20", pad)}>
          <p className="flex items-center gap-3 text-[15px] text-white/65">
            <GoogleG className="size-5" /> <b className="text-[22px] text-white">4,8</b>{" "}
            <Stars className="text-[15px]" /> 203 avis
          </p>
          <div className="mt-10 space-y-10">
            {reviews.slice(0, 2).map((r) => (
              <figure key={r.n}>
                <blockquote className="text-[21px] leading-[1.4] font-medium tracking-[-0.01em]">
                  « {r.t} »
                </blockquote>
                <figcaption className="mt-3 text-[14px] text-white/55">
                  {r.n}, {r.c}
                </figcaption>
              </figure>
            ))}
          </div>
          <Go
            to="avis"
            className="mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
          >
            Tous les avis <ArrowRight className="size-4" />
          </Go>
        </div>
      </section>

      {/* Zone */}
      <section
        className={cn("grid gap-8 py-16 @min-[900px]:grid-cols-[1fr_2fr] @min-[900px]:py-20", pad)}
      >
        <H2>Où intervenons&#8209;nous&nbsp;?</H2>
        <div>
          <ul className="flex flex-wrap gap-2">
            {towns.map((t) => (
              <li key={t} className="rounded-[8px] bg-(--givre) px-3.5 py-2 text-[15px]">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15.5px] text-(--nuit)/60">
            Et toutes les communes à moins de 30 km de Saint-Avold. Pas de frais de déplacement sous
            contrat.
          </p>
        </div>
      </section>

      <Footer />
      <MobileBar />
    </>
  );
}

function Plans() {
  return (
    <div className="grid gap-4 @min-[900px]:grid-cols-3">
      {plans.map((p) => (
        <div
          key={p.t}
          className={cn(
            "flex flex-col rounded-[14px] p-6 ring-1",
            p.best ? "bg-(--nuit) text-white ring-(--nuit)" : "ring-(--nuit)/12",
          )}
        >
          <p className="text-[18px] font-bold">{p.t}</p>
          <p className={cn("mt-1 text-[14px]", p.best ? "text-white/60" : "text-(--nuit)/55")}>
            {p.d}
          </p>
          <p className="mt-5">
            <span className="text-[42px] leading-none font-bold tracking-[-0.03em]">{p.p} €</span>
            <span className={cn("text-[14px]", p.best ? "text-white/60" : "text-(--nuit)/55")}>
              {" "}
              / mois
            </span>
          </p>
          <ul className="mt-5 space-y-2.5 text-[14.5px]">
            {p.f.map((f) => (
              <li key={f} className="flex gap-2">
                <Check
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    p.best ? "text-(--braise)" : "text-(--braise-t)",
                  )}
                />{" "}
                {f}
              </li>
            ))}
          </ul>
          <Go
            to="entretien"
            param={p.t}
            className={cn(p.best ? btnHot : btnLine, "mt-7 h-11 w-full text-[15px]")}
          >
            Choisir {p.t}
          </Go>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------- Prise de rendez-vous */

const equipments = [
  "Chaudière gaz",
  "Chaudière fioul",
  "Pompe à chaleur",
  "Poêle à granulés",
] as const;
const days = [
  { d: "Mar.", n: "17 nov.", slots: ["8 h 30", "10 h 30", "14 h"], taken: ["8 h 30"] },
  {
    d: "Mer.",
    n: "18 nov.",
    slots: ["8 h 30", "10 h 30", "14 h", "16 h"],
    taken: ["10 h 30", "14 h"],
  },
  { d: "Jeu.", n: "19 nov.", slots: ["8 h 30", "10 h 30", "14 h", "16 h"], taken: [] },
  { d: "Ven.", n: "20 nov.", slots: ["8 h 30", "10 h 30", "14 h"], taken: ["8 h 30", "10 h 30"] },
  { d: "Lun.", n: "23 nov.", slots: ["8 h 30", "10 h 30", "14 h", "16 h"], taken: ["16 h"] },
];

function Entretien() {
  const { param } = useSite();
  const [equipment, setEquipment] = useState<(typeof equipments)[number]>("Chaudière gaz");
  const [day, setDay] = useState(2);
  const [slot, setSlot] = useState<string | null>(null);
  const d = days[day];
  const field =
    "mt-2 h-12 w-full rounded-[10px] bg-white px-4 text-[16px] ring-1 ring-inset ring-(--nuit)/15 outline-none placeholder:text-(--nuit)/35 focus:ring-2 focus:ring-(--nuit)";
  return (
    <>
      <PageTitle
        crumb="Entretien"
        title="Réservez votre entretien en ligne"
        intro="Choisissez l'appareil et un créneau. Vous recevez une confirmation par SMS, puis l'attestation d'entretien par e-mail."
        photo="chf-manometre"
      />
      <section
        className={cn(
          "grid gap-12 py-12 @min-[900px]:grid-cols-[1.4fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-16",
          pad,
        )}
      >
        <div className="space-y-9">
          <div>
            <p className="text-[15px] font-semibold">1. Votre appareil</p>
            <Pick
              options={equipments}
              value={equipment}
              onChange={setEquipment}
              className="mt-3"
              itemClassName={chip}
            />
          </div>
          <div>
            <p className="text-[15px] font-semibold">2. Le jour</p>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {days.map((x, i) => (
                <button
                  key={x.n}
                  type="button"
                  aria-pressed={day === i}
                  onClick={() => {
                    setDay(i);
                    setSlot(null);
                  }}
                  className="rounded-[10px] py-3 text-center ring-1 ring-(--nuit)/15 transition-colors ring-inset hover:ring-(--nuit)/40 aria-pressed:bg-(--nuit) aria-pressed:text-white aria-pressed:ring-(--nuit)"
                >
                  <span className="block text-[13px] opacity-70">{x.d}</span>
                  <span className="block text-[16px] font-semibold">{x.n}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[15px] font-semibold">3. L&apos;heure d&apos;arrivée</p>
            <div className="mt-3 grid grid-cols-2 gap-2 @min-[600px]:grid-cols-4">
              {d.slots.map((s) => {
                const taken = d.taken.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={taken}
                    aria-pressed={slot === s}
                    onClick={() => setSlot(s)}
                    className="h-12 rounded-[10px] text-[16px] font-medium ring-1 ring-(--nuit)/15 transition-colors ring-inset hover:ring-(--nuit)/40 disabled:bg-(--givre) disabled:text-(--nuit)/30 disabled:line-through disabled:ring-0 aria-pressed:bg-(--braise) aria-pressed:text-white aria-pressed:ring-(--braise)"
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[13px] text-(--nuit)/50">
              Le technicien arrive dans l&apos;heure qui suit. Durée : 1 h environ.
            </p>
          </div>
        </div>
        <aside className="h-fit rounded-[16px] bg-(--givre) p-6 @min-[900px]:p-8">
          <p className="text-[15px] text-(--nuit)/55">Votre rendez-vous</p>
          <p className="mt-2 text-[24px] leading-tight font-bold tracking-[-0.02em]">
            {equipment}
            <br />
            {d.d.replace(".", "")} {d.n} {slot ? `à ${slot}` : ""}
          </p>
          {param && <p className="mt-2 text-[14.5px] text-(--nuit)/60">Avec le contrat {param}</p>}
          <DemoForm
            success={{
              title: "Rendez-vous confirmé",
              text: `${equipment}, ${d.d.replace(".", "")} ${d.n}${slot ? ` à ${slot}` : ""}. Un SMS de confirmation vous est envoyé, et un rappel la veille.`,
            }}
            submit="Confirmer le rendez-vous"
            submitClassName={cn(btnHot, "mt-6 w-full disabled:opacity-40")}
            className="mt-6"
          >
            <label className="block text-[14px] font-medium text-(--nuit)/70">
              Nom
              <input className={field} placeholder="Votre nom" />
            </label>
            <label className="mt-4 block text-[14px] font-medium text-(--nuit)/70">
              Téléphone
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
            <label className="mt-4 block text-[14px] font-medium text-(--nuit)/70">
              Commune
              <input className={field} placeholder="Saint-Avold" />
            </label>
          </DemoForm>
          <p className="mt-4 text-[13.5px] text-(--nuit)/55">
            Entretien chaudière gaz : 129 € TTC, attestation comprise. Inclus dans les contrats.
          </p>
        </aside>
      </section>
      <section className={cn("border-t border-(--nuit)/8 py-16", pad)}>
        <H2 className="mb-10">Nos contrats d&apos;entretien</H2>
        <Plans />
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------ Autres pages */

function PompeAChaleur() {
  return (
    <>
      <PageTitle
        crumb="Pompe à chaleur"
        title="Une pompe à chaleur bien dimensionnée, posée en 3 jours"
        intro="On calcule les besoins de votre maison pièce par pièce. Une pompe trop puissante consomme plus et s'use plus vite."
        photo="chf-pac3"
      />
      <section className={cn("py-14 @min-[900px]:py-20", pad)}>
        <Simulateur />
      </section>
      <section className={cn("bg-(--givre) py-16 @min-[900px]:py-20", pad)}>
        <H2>De la visite au premier hiver</H2>
        <ol className="mt-10 grid gap-8 @min-[900px]:grid-cols-4">
          {[
            [
              "Visite et étude",
              "Relevé des pièces, des radiateurs et de l'isolation. Étude thermique offerte.",
            ],
            [
              "Devis et aides",
              "Devis ferme, aides déduites. On monte le dossier MaPrimeRénov' et CEE avec vous.",
            ],
            [
              "Pose en 3 jours",
              "Dépose de l'ancienne chaudière, pose, raccordements et mise en service.",
            ],
            [
              "Suivi la première année",
              "Réglages après un mois, puis entretien annuel et dépannage sous contrat.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="border-t-2 border-(--nuit) pt-5">
              <span className="text-[15px] font-semibold text-(--braise-t)">Étape {i + 1}</span>
              <p className="mt-2 text-[20px] font-bold tracking-[-0.02em]">{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-(--nuit)/60">{d}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={cn("grid gap-5 py-16 @min-[900px]:grid-cols-3", pad)}>
        {[
          ["chf-hero", "Pompe air-eau, Creutzwald"],
          ["chf-pac2", "Unité extérieure contre bardage, Faulquemont"],
          ["chf-cuivre", "Raccordement hydraulique, Forbach"],
        ].map(([src, t]) => (
          <figure key={src}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[12px]">
              <Photo src={src} alt={t} sizes="(min-width: 1024px) 400px, 100vw" />
            </div>
            <figcaption className="mt-2.5 text-[14.5px] text-(--nuit)/65">{t}</figcaption>
          </figure>
        ))}
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

const symptoms = [
  "Plus de chauffage",
  "Plus d'eau chaude",
  "Chaudière en sécurité",
  "Radiateurs froids",
  "Fuite ou bruit",
  "Pompe à chaleur en défaut",
] as const;

function Depannage() {
  const [symptom, setSymptom] = useState<(typeof symptoms)[number]>("Plus de chauffage");
  return (
    <>
      <PageTitle
        crumb="Dépannage"
        title="Panne de chauffage ? Un technicien dans la journée"
        intro="Du lundi au samedi. Sous contrat Confort ou Sérénité, intervention sous 24 h sans frais de déplacement."
        photo="chf-thermostat"
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1.3fr_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <p className="text-[15px] font-semibold">Que se passe&#8209;t&#8209;il ?</p>
          <Pick
            options={symptoms}
            value={symptom}
            onChange={setSymptom}
            className="mt-3"
            itemClassName={chip}
          />
          <div className="mt-8 rounded-[14px] bg-(--givre) p-6">
            <p className="text-[18px] font-bold">Avant d&apos;appeler, vérifiez :</p>
            <ul className="mt-4 space-y-3 text-[15.5px]">
              {(symptom === "Pompe à chaleur en défaut"
                ? [
                    "Le disjoncteur de la pompe dans le tableau",
                    "Le code affiché sur la commande",
                    "Que rien n'obstrue l'unité extérieure (neige, feuilles)",
                  ]
                : [
                    "La pression du circuit, entre 1 et 2 bars",
                    "Le thermostat et ses piles",
                    "Le bouton de réarmement de la chaudière, une seule fois",
                  ]
              ).map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 size-4.5 shrink-0 text-(--braise-t)" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <Go to="contact" className={cn(btnHot, "mt-8")}>
            <Phone className="size-4.5" /> Demander un dépannage
          </Go>
        </div>
        <div>
          <H2 className="text-[28px] @min-[900px]:text-[32px]">Tarifs</H2>
          <table className="mt-6 w-full text-[15.5px]">
            <tbody>
              {[
                ["Déplacement et diagnostic", "79 €"],
                ["Samedi", "+ 30 €"],
                ["Sous contrat Confort ou Sérénité", "inclus"],
                ["Main-d'œuvre, l'heure", "62 €"],
              ].map(([t, p]) => (
                <tr key={t} className="border-b border-(--nuit)/10">
                  <td className="py-3.5">{t}</td>
                  <td className="py-3.5 text-right font-semibold">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[13.5px] text-(--nuit)/50">
            Prix TTC. Le montant des pièces est annoncé avant réparation.
          </p>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

function Avis() {
  const dist = [178, 18, 4, 2, 1];
  return (
    <>
      <PageTitle
        crumb="Avis"
        title="203 avis Google, 4,8 sur 5"
        intro="Nous répondons à chaque avis, y compris aux moins bons."
      />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[300px_1fr] @min-[900px]:gap-16 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          {dist.map((n, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 text-[14px]">
              <span className="w-16 text-(--nuit)/55">{5 - i} étoiles</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-(--givre)">
                <span
                  className="block h-full rounded-full bg-[#f4b400]"
                  style={{ width: `${(n / 203) * 100}%` }}
                />
              </span>
              <span className="w-8 text-right text-(--nuit)/50">{n}</span>
            </div>
          ))}
        </div>
        <div className="divide-y divide-(--nuit)/10">
          {reviews.map((r) => (
            <figure key={r.n} className="py-6 first:pt-0">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-(--givre) text-[15px] font-bold">
                  {r.n[0]}
                </span>
                <span>
                  <b className="block text-[15.5px]">
                    {r.n}, {r.c}
                  </b>
                  <span className="text-[13px] text-(--nuit)/50">{r.when}</span>
                </span>
                <Stars value={r.s} className="ml-auto text-[14px]" />
              </div>
              <blockquote className="mt-3 text-[16.5px] leading-relaxed">{r.t}</blockquote>
            </figure>
          ))}
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

const subjects = ["Pompe à chaleur", "Entretien", "Dépannage", "Radiateurs", "Autre"] as const;

function Contact() {
  const [subject, setSubject] = useState<(typeof subjects)[number]>("Pompe à chaleur");
  const field =
    "mt-2 h-12 w-full rounded-[10px] bg-white px-4 text-[16px] ring-1 ring-inset ring-(--nuit)/15 outline-none placeholder:text-(--nuit)/35 focus:ring-2 focus:ring-(--nuit)";
  return (
    <>
      <PageTitle crumb="Contact" title="Parlons de votre chauffage" />
      <section
        className={cn(
          "grid gap-12 py-14 @min-[900px]:grid-cols-[1fr_1.3fr] @min-[900px]:gap-20 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <p className="text-[15px] text-(--nuit)/55">Du lundi au samedi, 8 h – 18 h</p>
          <p className="mt-2 text-[40px] leading-none font-bold tracking-[-0.03em]">{PHONE}</p>
          <dl className="mt-10 space-y-6 border-t border-(--nuit)/10 pt-8 text-[15.5px]">
            <div>
              <dt className="font-semibold">Zone d&apos;intervention</dt>
              <dd className="mt-1 text-(--nuit)/60">
                Saint-Avold et 30 km autour, de Forbach à Boulay
              </dd>
            </div>
            <div>
              <dt className="font-semibold">E-mail</dt>
              <dd className="mt-1 text-(--nuit)/60">contact@thermalis-exemple.fr</dd>
            </div>
          </dl>
        </div>
        <DemoForm
          success={{
            title: "Message envoyé",
            text: `${subject} : on vous rappelle dans la journée.`,
          }}
          submit="Envoyer ma demande"
          submitClassName={cn(btnHot, "mt-7 w-full")}
        >
          <p className="text-[14px] font-medium text-(--nuit)/70">Sujet</p>
          <Pick
            options={subjects}
            value={subject}
            onChange={setSubject}
            className="mt-3"
            itemClassName={chip}
          />
          <div className="mt-6 grid gap-5 @min-[900px]:grid-cols-2">
            <label className="block text-[14px] font-medium text-(--nuit)/70">
              Commune
              <input className={field} placeholder="Saint-Avold" />
            </label>
            <label className="block text-[14px] font-medium text-(--nuit)/70">
              Téléphone
              <input className={field} type="tel" placeholder="06 00 00 00 00" />
            </label>
          </div>
          <label className="mt-5 block text-[14px] font-medium text-(--nuit)/70">
            Votre message
            <textarea
              rows={4}
              className={cn(field, "h-auto resize-none py-3")}
              placeholder="Marque et âge de votre appareil, ce que vous constatez…"
            />
          </label>
        </DemoForm>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

const photos = [
  "chf-hero",
  "chf-pac2",
  "chf-pac3",
  "chf-chaufferie",
  "chf-cuivre",
  "chf-radiateur",
  "chf-salon",
  "chf-thermostat",
  "chf-manometre",
];

function Mentions() {
  return (
    <>
      <PageTitle
        crumb="Mentions légales"
        title="Mentions légales et crédits photos"
        intro="Thermalis est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("py-14", pad)}>
        <PhotoCredits photos={photos} />
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
          id: "pac",
          label: "Pompe à chaleur",
          path: "/pompe-a-chaleur",
          render: () => <PompeAChaleur />,
        },
        { id: "entretien", label: "Entretien", path: "/entretien", render: () => <Entretien /> },
        { id: "depannage", label: "Dépannage", path: "/depannage", render: () => <Depannage /> },
        { id: "avis", label: "Avis", path: "/avis", render: () => <Avis /> },
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
