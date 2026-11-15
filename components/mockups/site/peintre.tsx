"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Instrument_Serif, Onest } from "next/font/google";
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
 * Nuances & Murs, peintre à Woippy (entreprise fictive).
 * Le site d'un peintre montre de la couleur : l'interface reste en noir et
 * blanc, les photos et le nuancier apportent la couleur. Titres en Instrument
 * Serif, texte en Onest. Le nuancier teinte le mur d'une vraie photo
 * (masque public/images/maquettes/pei-mur-masque.png).
 */

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});
const sans = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export const desktop = true;

const PHONE = "06 39 98 14 52";

const vars = {
  "--encre": "#1d1c1a",
  "--platre": "#f1efeb",
  "--ligne": "#dedad3",
  "--bouteille": "#24423a",
  "--ink-text": "#1d1c1a",
  "--serif": serif.style.fontFamily,
  fontFamily: sans.style.fontFamily,
} as CSSProperties;

const pad = "px-5 @min-[900px]:px-16";
const display = "font-(family-name:--serif) font-normal tracking-[-0.01em]";

/* ---------------------------------------------------------------- Données */

type Tint = { name: string; hex: string; note: string };

/** Teintes du nuancier (noms inventés, pas des références de fabricant). */
const tints: Tint[] = [
  { name: "Sauge", hex: "#8fa58f", note: "Apaisant, va avec le bois clair et le lin." },
  {
    name: "Bleu de Prusse",
    hex: "#2c4a60",
    note: "Profond, idéal pour un mur de séjour ou une bibliothèque.",
  },
  {
    name: "Argile",
    hex: "#c99a7c",
    note: "Chaleureux sans être sombre, flatteur en lumière du soir.",
  },
  { name: "Rose poudré", hex: "#e2c1bb", note: "Doux pour une chambre, se marie avec le laiton." },
  { name: "Ocre jaune", hex: "#d9b066", note: "Lumineux dans une pièce exposée au nord." },
  { name: "Vert bouteille", hex: "#3f5a4b", note: "Élégant derrière un canapé clair." },
  {
    name: "Gris perle",
    hex: "#c9c7c1",
    note: "Neutre et lumineux, la teinte qui ne se démode pas.",
  },
  { name: "Terre d'ombre", hex: "#7d6a5a", note: "Brun doux, très chic avec des cadres noirs." },
  { name: "Bleu brume", hex: "#a9bcc8", note: "Frais, agrandit visuellement une petite pièce." },
  {
    name: "Lin naturel",
    hex: "#e4dccd",
    note: "Blanc cassé chaud, parfait pour tout un appartement.",
  },
  { name: "Brique", hex: "#a8644e", note: "Caractère affirmé, pour un seul mur." },
  { name: "Anthracite", hex: "#4a4b4d", note: "Graphique, à réserver aux pièces lumineuses." },
];

const finishes = ["Mat profond", "Velours", "Satin"] as const;
const finishNote: Record<(typeof finishes)[number], string> = {
  "Mat profond": "Rendu poudré qui cache les défauts. Pour les chambres et les salons.",
  Velours: "Légèrement lumineux et lessivable. Le meilleur compromis pour les pièces de vie.",
  Satin: "Résiste aux éclaboussures. Pour la cuisine, la salle de bain et les boiseries.",
};

const works = [
  { src: "pei-hero", t: "Salle à manger bleu de Prusse", c: "Woippy", k: "Intérieur" },
  { src: "pei-r1", t: "Séjour bleu canard", c: "Metz", k: "Intérieur" },
  { src: "pei-r3", t: "Coin lecture vert sauge", c: "Maizières-lès-Metz", k: "Intérieur" },
  { src: "pei-fac1", t: "Façade enduit saumon", c: "Plappeville", k: "Façade" },
  { src: "pei-r2", t: "Salon bleu nuit", c: "Lorry-lès-Metz", k: "Intérieur" },
  { src: "pei-r5", t: "Mur terre cuite", c: "Saint-Rémy", k: "Intérieur" },
  { src: "pei-fac2", t: "Ravalement rose et blanc", c: "Metz", k: "Façade" },
  { src: "pei-r6", t: "Chambre noir mat", c: "Woippy", k: "Intérieur" },
  { src: "pei-fac3", t: "Volets et encadrements", c: "Norroy-le-Veneur", k: "Façade" },
  { src: "pei-r4", t: "Salon bleu pétrole", c: "Marange-Silvange", k: "Intérieur" },
];

const reviews = [
  {
    n: "Claire",
    c: "Woippy",
    when: "il y a 3 semaines",
    s: 5,
    t: "Ils sont venus avec de vrais échantillons peints sur carton, on a choisi à la lumière de notre salon. Le bleu est exactement celui qu'on voulait.",
  },
  {
    n: "Julien",
    c: "Metz",
    when: "il y a 2 mois",
    s: 5,
    t: "Appartement entier en six jours, meubles protégés et parquet bâché. Les finitions autour des moulures sont impeccables.",
  },
  {
    n: "Martine",
    c: "Plappeville",
    when: "il y a 4 mois",
    s: 5,
    t: "Ravalement de façade avec reprise des fissures. Devis clair, délai respecté, et un chantier rangé chaque soir.",
  },
  {
    n: "Yannick",
    c: "Maizières-lès-Metz",
    when: "il y a 5 mois",
    s: 4,
    t: "Très bon travail sur la cage d'escalier. Il a fallu attendre trois semaines pour démarrer, mais ça valait le coup.",
  },
];

/* ------------------------------------------------------------ Éléments */

const btn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors";
const btnInk = cn(btn, "bg-(--encre) text-white hover:bg-black");
const btnLine = cn(btn, "ring-1 ring-inset ring-(--encre)/25 hover:ring-(--encre)");

function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        display,
        "text-[38px] leading-[1.02] text-balance @min-[900px]:text-[58px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Petite carte façon échantillon de peinture. */
function Chip({ tint, className }: { tint: Tint; className?: string }) {
  return (
    <div
      className={cn(
        "w-[170px] bg-white p-2.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      <div className="h-[92px]" style={{ backgroundColor: tint.hex }} />
      <p className="mt-2.5 text-[13px] font-semibold">{tint.name}</p>
      <p className="text-[11.5px] text-black/50">{tint.hex.toUpperCase()}</p>
    </div>
  );
}

function Header() {
  const { nav, page, go } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className={cn("flex h-[76px] items-center gap-8 border-b border-(--ligne)", pad)}>
        <Go to="home" className="text-left" label="Nuances & Murs, accueil">
          <span className={cn(display, "block text-[28px] leading-none")}>
            Nuances <span className="italic">&amp;</span> Murs
          </span>
          <span className="mt-1 block text-[12px] text-black/50">
            Peinture et décoration, Woippy
          </span>
        </Go>
        <nav className="ml-auto hidden items-center gap-7 @min-[1100px]:flex">
          {nav.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id)}
              aria-current={p.id === page ? "page" : undefined}
              className="py-2 text-[15px] text-black/60 hover:text-black aria-[current=page]:text-black aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-8"
            >
              {p.label}
            </button>
          ))}
        </nav>
        <Go
          to="devis"
          className={cn(btnInk, "ml-auto hidden h-11 @min-[900px]:inline-flex @min-[1100px]:ml-0")}
        >
          Devis gratuit
        </Go>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
          className="ml-auto grid h-11 min-w-11 place-items-center rounded-full px-4 text-[14px] font-medium ring-1 ring-black/15 @min-[900px]:ml-0 @min-[1100px]:hidden"
        >
          {open ? <X className="size-5" /> : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="border-b border-(--ligne) bg-white px-5 pb-4 @min-[1100px]:hidden">
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
                "flex w-full items-center justify-between border-b border-(--ligne) py-3 text-[26px]",
              )}
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
    <div className="sticky bottom-0 z-20 grid grid-cols-2 gap-2 border-t border-(--ligne) bg-white p-3 @min-[900px]:hidden">
      <Go to="devis" className={cn(btnLine, "h-12")}>
        <Phone className="size-4" /> Appeler
      </Go>
      <Go to="devis" className={cn(btnInk, "h-12")}>
        Devis gratuit
      </Go>
    </div>
  );
}

function Footer() {
  const { go, nav } = useSite();
  return (
    <footer className="bg-(--encre) text-white/60">
      <div className={cn("grid gap-10 py-14 @min-[900px]:grid-cols-[1.5fr_1fr_1fr_1.2fr]", pad)}>
        <div>
          <p className={cn(display, "text-[34px] leading-none text-white")}>
            Nuances <span className="italic">&amp;</span> Murs
          </p>
          <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed">
            Peinture intérieure, façades et décoration murale à Woippy et dans le nord de Metz,
            depuis 2009.
          </p>
          <p className="mt-5 text-[13px]">
            Qualibat, garantie décennale, peintures à faibles émissions
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-medium text-white">Le site</p>
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
          <p className="font-medium text-white">Horaires</p>
          <p className="mt-3 leading-relaxed">
            Lundi au vendredi, 8 h – 18 h
            <br />
            Visites de devis le samedi matin
          </p>
        </div>
        <div className="text-[14px]">
          <p className="font-medium text-white">Nous joindre</p>
          <p className="mt-3 text-[22px] font-medium text-white">{PHONE}</p>
          <p className="mt-1">bonjour@nuances-et-murs-exemple.fr</p>
          <p className="mt-1">Woippy et 25 km autour</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap justify-between gap-2 border-t border-white/10 py-5 text-[12.5px]",
          pad,
        )}
      >
        <span className="flex flex-wrap gap-x-4">
          <span>© 2026 Nuances &amp; Murs</span>
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
    <div className={cn("pt-10 pb-10 @min-[900px]:pt-16 @min-[900px]:pb-14", pad)}>
      <p className="text-[14px] text-black/45">
        <Go to="home" className="hover:text-black">
          Accueil
        </Go>{" "}
        / <span className="text-black/70">{crumb}</span>
      </p>
      <h1
        className={cn(
          display,
          "mt-5 max-w-[860px] text-[46px] leading-[0.98] text-balance @min-[900px]:text-[76px]",
        )}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-[580px] text-[17px] leading-relaxed text-black/60">{intro}</p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- Nuancier */

function Nuancier({ big = false }: { big?: boolean }) {
  const [tint, setTint] = useState<Tint>(tints[0]);
  const [finish, setFinish] = useState<(typeof finishes)[number]>("Velours");
  return (
    <div
      className={cn(
        "grid gap-8 @min-[900px]:gap-12",
        big ? "@min-[900px]:grid-cols-[1.5fr_1fr]" : "@min-[900px]:grid-cols-[1.35fr_1fr]",
      )}
    >
      <figure>
        <div className="relative aspect-[3/2] overflow-hidden bg-(--platre)">
          <Photo
            src="pei-mur"
            alt={`Salon avec le mur peint en ${tint.name.toLowerCase()}`}
            sizes="(min-width: 1024px) 760px, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply transition-[background-color] duration-500"
            style={{
              backgroundColor: tint.hex,
              maskImage: "url(/images/maquettes/pei-mur-masque.png)",
              WebkitMaskImage: "url(/images/maquettes/pei-mur-masque.png)",
              maskSize: "cover",
              WebkitMaskSize: "cover",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </div>
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[14px]">
          <span>
            Mur en <b className="font-semibold">{tint.name}</b>, finition {finish.toLowerCase()}
          </span>
          <span className="text-black/45">Aperçu indicatif, couleurs d&apos;écran</span>
        </figcaption>
      </figure>
      <div>
        <p className="text-[15px] font-medium">Choisissez une teinte</p>
        <div className="mt-4 grid grid-cols-6 gap-2">
          {tints.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setTint(t)}
              aria-pressed={tint.name === t.name}
              aria-label={t.name}
              title={t.name}
              className="aspect-square ring-1 ring-black/10 ring-offset-2 transition-shadow aria-pressed:ring-2 aria-pressed:ring-(--encre)"
              style={{ backgroundColor: t.hex }}
            />
          ))}
        </div>
        <p className={cn(display, "mt-7 text-[34px] leading-none")}>{tint.name}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-black/60">{tint.note}</p>
        <p className="mt-7 text-[15px] font-medium">Finition</p>
        <Pick
          options={finishes}
          value={finish}
          onChange={setFinish}
          className="mt-3"
          itemClassName="h-10 rounded-full px-4 text-[14px] ring-1 ring-inset ring-black/15 aria-pressed:bg-(--encre) aria-pressed:text-white aria-pressed:ring-(--encre)"
        />
        <p className="mt-3 text-[14px] leading-relaxed text-black/55">{finishNote[finish]}</p>
        <Go to="devis" param={tint.name} className={cn(btnInk, "mt-8")}>
          Recevoir un échantillon de cette teinte
        </Go>
        <p className="mt-3 text-[13px] text-black/45">
          On vient peindre un carré de 50 cm chez vous, offert avec la visite de devis.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Accueil */

function Home() {
  return (
    <>
      {/* Premier écran : la couleur en grand, une carte d'échantillon */}
      <section className="relative h-[520px] overflow-hidden @min-[900px]:h-[660px]">
        <Photo
          src="pei-hero"
          alt="Salle à manger avec un mur bleu profond et une table en bois"
          priority
          sizes="100vw"
          position="50% 45%"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5 @min-[900px]:from-black/70 @min-[900px]:via-black/20 @min-[900px]:to-transparent" />
        <div className={cn("absolute inset-x-0 bottom-0 pb-10 text-white @min-[900px]:pb-14", pad)}>
          <h1
            className={cn(
              display,
              "max-w-[820px] text-[52px] leading-[0.95] text-balance @min-[900px]:text-[92px]",
            )}
          >
            La bonne couleur, posée proprement.
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="max-w-[440px] text-[16.5px] leading-relaxed text-white/80">
              Peintre à Woippy : intérieurs, façades et conseils couleur. Échantillons peints chez
              vous avant de décider.
            </p>
            <div className="flex flex-wrap gap-3">
              <Go to="devis" className={cn(btn, "bg-white text-(--encre) hover:bg-white/90")}>
                Demander un devis
              </Go>
              <Go
                to="nuancier"
                className={cn(btn, "text-white ring-1 ring-white/50 ring-inset hover:ring-white")}
              >
                Essayer une teinte
              </Go>
            </div>
          </div>
        </div>
        <Chip
          tint={tints[1]}
          className="absolute top-8 right-16 hidden -rotate-2 @min-[900px]:block"
        />
      </section>

      {/* Preuves */}
      <section
        className={cn(
          "grid gap-6 border-b border-(--ligne) py-8 @min-[600px]:grid-cols-2 @min-[900px]:grid-cols-4",
          pad,
        )}
      >
        <p className="flex items-center gap-3 text-[14.5px] text-black/60">
          <GoogleG className="size-5" />
          <b className="text-[17px] text-(--encre)">4,9</b> <Stars className="text-[13px]" /> 64
          avis
        </p>
        <p className="text-[14.5px] text-black/60">
          <b className="font-semibold text-(--encre)">Devis en 72 h</b> après la visite
        </p>
        <p className="text-[14.5px] text-black/60">
          <b className="font-semibold text-(--encre)">Sols et meubles protégés</b>, chantier rangé
          chaque soir
        </p>
        <p className="text-[14.5px] text-black/60">
          <b className="font-semibold text-(--encre)">Qualibat</b> et garantie décennale
        </p>
      </section>

      {/* Nuancier */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <H2 className="max-w-[640px]">Essayez une teinte sur ce mur.</H2>
          <Go
            to="nuancier"
            className="inline-flex items-center gap-2 text-[15px] font-medium underline-offset-4 hover:underline"
          >
            Tout le nuancier <ArrowRight className="size-4" />
          </Go>
        </div>
        <Nuancier />
      </section>

      {/* Prestations : deux grands univers */}
      <section className="grid @min-[900px]:grid-cols-2">
        {[
          {
            src: "pei-r1",
            t: "Intérieurs",
            d: "Murs, plafonds, boiseries et cages d'escalier. Préparation soignée : rebouchage, ponçage, sous-couche.",
            to: "realisations",
          },
          {
            src: "pei-fac1",
            t: "Façades",
            d: "Nettoyage, traitement des fissures, peinture et enduits. Échafaudage et déclaration en mairie pris en charge.",
            to: "facades",
          },
        ].map((s) => (
          <Go
            key={s.t}
            to={s.to}
            className="group relative block h-[380px] overflow-hidden text-left @min-[900px]:h-[540px]"
          >
            <Photo
              src={s.src}
              alt={s.t}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-6 text-white @min-[900px]:p-10">
              <span
                className={cn(display, "block text-[44px] leading-none @min-[900px]:text-[56px]")}
              >
                {s.t}
              </span>
              <span className="mt-3 block max-w-[420px] text-[15.5px] leading-relaxed text-white/80">
                {s.d}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium">
                Voir{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Go>
        ))}
      </section>

      {/* Déroulé d'un chantier */}
      <section className={cn("bg-(--platre) py-16 @min-[900px]:py-24", pad)}>
        <H2 className="max-w-[700px]">Un chantier en trois temps, sans surprise.</H2>
        <ol className="mt-12 grid gap-10 @min-[900px]:grid-cols-3">
          {[
            [
              "Visite et échantillons",
              "On mesure, on regarde l'état des murs et on peint vos teintes sur place. Devis détaillé sous 72 h.",
            ],
            [
              "Protection et préparation",
              "Sols bâchés, meubles filmés, prises démontées. Les fissures sont reprises avant toute peinture.",
            ],
            [
              "Deux couches, puis le ménage",
              "Chaque pièce est rendue propre et rangée. Vous validez avec nous avant la facture.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="border-t border-black/15 pt-6">
              <span className={cn(display, "text-[54px] leading-none")}>{i + 1}</span>
              <p className="mt-4 text-[19px] font-medium">{t}</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-black/60">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Réalisations en mosaïque */}
      <section className={cn("py-16 @min-[900px]:py-24", pad)}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <H2>Derniers chantiers</H2>
          <Go
            to="realisations"
            className="inline-flex items-center gap-2 text-[15px] font-medium underline-offset-4 hover:underline"
          >
            Toutes les réalisations <ArrowRight className="size-4" />
          </Go>
        </div>
        <div className="grid gap-4 @min-[900px]:grid-cols-[1.3fr_1fr_1fr] @min-[900px]:grid-rows-[260px_260px]">
          {["pei-r4", "pei-r3", "pei-fac2", "pei-r2", "pei-r5"]
            .map((src) => works.find((w) => w.src === src)!)
            .map((w, i) => (
              <figure
                key={w.src}
                className={cn(
                  "relative h-[260px] overflow-hidden @min-[900px]:h-auto",
                  i === 0 && "@min-[900px]:row-span-2",
                )}
              >
                <Photo src={w.src} alt={w.t} sizes="(min-width: 1024px) 480px, 100vw" />
                <figcaption className="absolute bottom-0 left-0 bg-white px-4 py-2.5 text-[13.5px]">
                  {w.t}, <span className="text-black/50">{w.c}</span>
                </figcaption>
              </figure>
            ))}
        </div>
      </section>

      {/* Avis */}
      <section className={cn("border-t border-(--ligne) py-16 @min-[900px]:py-24", pad)}>
        <div className="grid gap-12 @min-[900px]:grid-cols-[1fr_2fr]">
          <div>
            <p className={cn(display, "text-[96px] leading-none")}>4,9</p>
            <Stars className="mt-2 text-[18px]" />
            <p className="mt-3 flex items-center gap-2 text-[15px] text-black/55">
              <GoogleG className="size-4.5" /> 64 avis Google
            </p>
            <Go
              to="avis"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium underline-offset-4 hover:underline"
            >
              Lire les avis <ArrowRight className="size-4" />
            </Go>
          </div>
          <div className="grid gap-10 @min-[900px]:grid-cols-2">
            {reviews.slice(0, 2).map((r) => (
              <figure key={r.n}>
                <blockquote className={cn(display, "text-[26px] leading-[1.2]")}>
                  « {r.t} »
                </blockquote>
                <figcaption className="mt-4 text-[14px] text-black/55">
                  {r.n}, {r.c}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <DevisBand />
      <Footer />
      <MobileBar />
    </>
  );
}

/* ------------------------------------------------------------------ Devis */

const rooms = [
  "Salon",
  "Chambre",
  "Cuisine",
  "Salle de bain",
  "Couloir et escalier",
  "Plafonds",
  "Façade",
  "Volets",
];

function DevisForm({ tint }: { tint?: string }) {
  const [picked, setPicked] = useState<string[]>(["Salon"]);
  const toggle = (r: string) =>
    setPicked((p) => (p.includes(r) ? p.filter((x) => x !== r) : [...p, r]));
  const field =
    "mt-2 h-12 w-full border-b border-black/25 bg-transparent text-[16px] outline-none placeholder:text-black/35 focus:border-(--encre)";
  return (
    <DemoForm
      success={{
        title: "Demande envoyée",
        text: `${picked.join(", ") || "Votre projet"}${tint ? `, teinte ${tint}` : ""} : on vous rappelle sous 24 h pour fixer la visite.`,
      }}
      submit="Demander ma visite gratuite"
      submitClassName={cn(btnInk, "mt-8 w-full")}
    >
      <p className="text-[15px] font-medium">Ce qu&apos;il faut peindre</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {rooms.map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={picked.includes(r)}
            onClick={() => toggle(r)}
            className="h-10 rounded-full px-4 text-[14px] ring-1 ring-black/15 transition-colors ring-inset aria-pressed:bg-(--encre) aria-pressed:text-white aria-pressed:ring-(--encre)"
          >
            {r}
          </button>
        ))}
      </div>
      {tint && (
        <p className="mt-4 text-[14px] text-black/60">
          Teinte choisie : <b className="text-(--encre)">{tint}</b>
        </p>
      )}
      <div className="mt-6 grid gap-6 @min-[900px]:grid-cols-2">
        <label className="block text-[14px] text-black/60">
          Commune
          <input className={field} placeholder="Woippy" />
        </label>
        <label className="block text-[14px] text-black/60">
          Téléphone
          <input className={field} type="tel" placeholder="06 00 00 00 00" />
        </label>
      </div>
      <label className="mt-6 block text-[14px] text-black/60">
        Quelques mots sur le projet (facultatif)
        <input
          className={field}
          placeholder="Ex. : 3 pièces, murs en bon état, vers le mois de mars"
        />
      </label>
    </DemoForm>
  );
}

function DevisBand() {
  return (
    <section
      className={cn(
        "grid gap-12 bg-(--platre) py-16 @min-[900px]:grid-cols-[1fr_1.2fr] @min-[900px]:gap-20 @min-[900px]:py-24",
        pad,
      )}
    >
      <div>
        <H2>Parlons de vos murs.</H2>
        <p className="mt-5 max-w-[420px] text-[17px] leading-relaxed text-black/60">
          Visite et échantillons offerts, devis détaillé sous 72 h. Ou appelez-nous au {PHONE}.
        </p>
        <div className="relative mt-10 hidden h-[260px] overflow-hidden @min-[900px]:block">
          <Photo src="pei-rouleau" alt="Rouleau de peinture bleue sur un mur blanc" sizes="520px" />
        </div>
      </div>
      <DevisForm />
    </section>
  );
}

function Devis() {
  const { param } = useSite();
  return (
    <>
      <PageTitle
        crumb="Devis"
        title="Votre devis, après une visite chez vous"
        intro="Dites-nous ce qu'il faut peindre. On vous rappelle sous 24 h pour fixer la visite, échantillons compris."
      />
      <section
        className={cn(
          "grid gap-12 pb-20 @min-[900px]:grid-cols-[1.3fr_1fr] @min-[900px]:gap-20",
          pad,
        )}
      >
        <DevisForm tint={param} />
        <aside className="space-y-6 border-t border-(--ligne) pt-6 text-[15px] @min-[900px]:border-t-0 @min-[900px]:border-l @min-[900px]:pt-0 @min-[900px]:pl-10">
          <div>
            <p className="text-black/50">Téléphone</p>
            <p className="mt-1 text-[26px] font-medium">{PHONE}</p>
          </div>
          <div>
            <p className="text-black/50">Zone d&apos;intervention</p>
            <p className="mt-1 leading-relaxed">
              Woippy, Metz, Maizières-lès-Metz, Marange-Silvange, Saint-Rémy, Plappeville,
              Lorry-lès-Metz, Norroy-le-Veneur
            </p>
          </div>
          <div>
            <p className="text-black/50">Délai de démarrage</p>
            <p className="mt-1">2 à 4 semaines selon la saison</p>
          </div>
        </aside>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

/* --------------------------------------------------------- Autres pages */

function NuancierPage() {
  return (
    <>
      <PageTitle
        crumb="Nuancier"
        title="Trouvez votre couleur avant de peindre"
        intro="Cliquez sur une teinte pour la voir sur un vrai mur. Lors de la visite, on peint les teintes retenues chez vous, à votre lumière."
      />
      <section className={cn("pb-20", pad)}>
        <Nuancier big />
        <div className="mt-16 grid gap-10 border-t border-(--ligne) pt-10 @min-[900px]:grid-cols-3">
          {[
            [
              "Regardez à plusieurs heures",
              "Une teinte change entre le matin et le soir. Gardez l'échantillon deux ou trois jours.",
            ],
            [
              "Un mur, pas toute la pièce",
              "Une couleur forte sur un seul mur suffit souvent. Le reste en blanc cassé.",
            ],
            ["Le plafond plus clair", "Un plafond blanc pur fait paraître la pièce plus haute."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className={cn(display, "text-[28px] leading-tight")}>{t}</p>
              <p className="mt-2 text-[15.5px] leading-relaxed text-black/60">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

const workKinds = ["Tout", "Intérieur", "Façade"] as const;

function Realisations() {
  const [kind, setKind] = useState<(typeof workKinds)[number]>("Tout");
  const [zoom, setZoom] = useState<string | null>(null);
  const shown = works.filter((w) => kind === "Tout" || w.k === kind);
  const z = works.find((w) => w.src === zoom);
  return (
    <>
      <PageTitle
        crumb="Réalisations"
        title="Nos chantiers récents"
        intro="Photos prises à la fin des travaux, avec l'accord de nos clients."
      />
      <section className={cn("pb-20", pad)}>
        <Pick
          options={workKinds}
          value={kind}
          onChange={setKind}
          itemClassName="h-10 rounded-full px-5 text-[14px] ring-1 ring-inset ring-black/15 aria-pressed:bg-(--encre) aria-pressed:text-white aria-pressed:ring-(--encre)"
        />
        <div className="mt-8 columns-1 gap-4 @min-[600px]:columns-2 @min-[900px]:columns-3">
          {shown.map((w, i) => (
            <button
              key={w.src}
              type="button"
              onClick={() => setZoom(w.src)}
              className="group mb-4 block w-full break-inside-avoid text-left"
            >
              <span
                className={cn(
                  "relative block overflow-hidden",
                  i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]",
                )}
              >
                <Photo
                  src={w.src}
                  alt={w.t}
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-2.5 block text-[15px]">
                {w.t}, <span className="text-black/50">{w.c}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
      {z && (
        <div
          role="dialog"
          aria-label={z.t}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/85 p-6"
          onClick={() => setZoom(null)}
        >
          <div className="relative h-[75%] w-full max-w-[1000px]">
            <Photo src={z.src} alt={z.t} sizes="1000px" className="object-contain" />
          </div>
          <p className="mt-4 text-[15px] text-white">
            {z.t}, {z.c}
          </p>
        </div>
      )}
      <Footer />
      <MobileBar />
    </>
  );
}

function Facades() {
  return (
    <>
      <PageTitle
        crumb="Façades"
        title="Une façade refaite, une maison qui change de visage"
        intro="Nettoyage, reprise des fissures, peinture ou enduit : on s'occupe aussi de l'échafaudage et de la déclaration préalable en mairie."
      />
      <section className={cn("grid gap-4 pb-16 @min-[900px]:grid-cols-[1.4fr_1fr]", pad)}>
        <div className="relative h-[360px] overflow-hidden @min-[900px]:h-[560px]">
          <Photo
            src="pei-fac1"
            alt="Façade enduit saumon avec porte vert de gris"
            sizes="(min-width: 1024px) 720px, 100vw"
          />
        </div>
        <div className="grid gap-4">
          <div className="relative h-[260px] overflow-hidden @min-[900px]:h-auto">
            <Photo src="pei-fac2" alt="Façade rose aux fenêtres blanches" sizes="480px" />
          </div>
          <div className="relative h-[260px] overflow-hidden @min-[900px]:h-auto">
            <Photo src="pei-fac3" alt="Fenêtre aux volets bleus" sizes="480px" />
          </div>
        </div>
      </section>
      <section
        className={cn(
          "grid gap-12 border-t border-(--ligne) py-16 @min-[900px]:grid-cols-2 @min-[900px]:py-20",
          pad,
        )}
      >
        <div>
          <H2>Ce que comprend un ravalement</H2>
          <ul className="mt-8 divide-y divide-(--ligne) border-y border-(--ligne) text-[16px]">
            {[
              "Diagnostic de la façade et photos avant travaux",
              "Démoussage et nettoyage basse pression",
              "Ouverture et rebouchage des fissures",
              "Fixateur, puis deux couches de peinture façade",
              "Encadrements, volets et ferronneries en option",
              "Échafaudage, protections et déclaration en mairie",
            ].map((l) => (
              <li key={l} className="py-3.5">
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <H2>Prix indicatifs</H2>
          <table className="mt-8 w-full text-[16px]">
            <tbody>
              {[
                ["Nettoyage et peinture", "35 à 50 € / m²"],
                ["Avec reprise de fissures", "45 à 65 € / m²"],
                ["Enduit taloché neuf", "60 à 90 € / m²"],
                ["Volets bois, la paire", "à partir de 180 €"],
              ].map(([t, p]) => (
                <tr key={t} className="border-b border-(--ligne)">
                  <td className="py-3.5">{t}</td>
                  <td className="py-3.5 text-right font-medium whitespace-nowrap">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[14px] text-black/50">
            Prix TTC, échafaudage compris. Prix ferme après visite.
          </p>
          <Go to="devis" param="Façade" className={cn(btnInk, "mt-8")}>
            Faire estimer ma façade
          </Go>
        </div>
      </section>
      <Footer />
      <MobileBar />
    </>
  );
}

function Avis() {
  const dist = [56, 6, 1, 1, 0];
  return (
    <>
      <PageTitle
        crumb="Avis"
        title="64 avis, 4,9 sur 5"
        intro="Tous publiés sur notre fiche Google. Nous répondons à chacun."
      />
      <section
        className={cn(
          "grid gap-12 pb-20 @min-[900px]:grid-cols-[300px_1fr] @min-[900px]:gap-16",
          pad,
        )}
      >
        <div>
          {dist.map((n, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 text-[14px]">
              <span className="w-16 text-black/55">{5 - i} étoiles</span>
              <span className="h-1.5 flex-1 bg-black/8">
                <span
                  className="block h-full bg-(--encre)"
                  style={{ width: `${(n / 64) * 100}%` }}
                />
              </span>
              <span className="w-6 text-right text-black/50">{n}</span>
            </div>
          ))}
          <p className="mt-6 flex items-center gap-2 text-[14px] text-black/50">
            <GoogleG className="size-4.5" /> Avis Google
          </p>
        </div>
        <div className="divide-y divide-(--ligne)">
          {reviews.map((r) => (
            <figure key={r.n} className="py-7 first:pt-0">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[15px]">
                  <b className="font-semibold">{r.n}</b>, {r.c}{" "}
                  <span className="text-black/45">· {r.when}</span>
                </span>
                <Stars value={r.s} className="text-[13px]" />
              </div>
              <blockquote className={cn(display, "mt-3 text-[25px] leading-[1.25]")}>
                « {r.t} »
              </blockquote>
            </figure>
          ))}
        </div>
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
        intro="Nuances & Murs est une entreprise fictive : ce site est un exemple réalisé par NEOBATYS. Les photos sont libres de droits."
      />
      <section className={cn("pb-20", pad)}>
        <PhotoCredits photos={[...works.map((w) => w.src), "pei-mur", "pei-rouleau"]} />
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
        { id: "nuancier", label: "Nuancier", path: "/nuancier", render: () => <NuancierPage /> },
        {
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        { id: "facades", label: "Façades", path: "/facades", render: () => <Facades /> },
        { id: "avis", label: "Avis", path: "/avis", render: () => <Avis /> },
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
