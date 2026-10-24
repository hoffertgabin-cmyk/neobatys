"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  BrickWall,
  CalendarCheck,
  MapPin,
  MoveHorizontal,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  Choice,
  DemoForm,
  Field,
  MiniFooter,
  MiniSite,
  SubPage,
  useMini,
  type SiteInfo,
  type SiteProps,
} from "./kit";
import {
  CtaBand,
  Faq,
  Photo,
  Reviews,
  Section,
  SectionHead,
  Stats,
  Steps,
  TrustStrip,
  ZoneMap,
} from "./blocks";
import { ArticlesSection, Gallery, UploadField } from "./extras";
import { HouseScene } from "./scenes";

const chantiers = [
  {
    id: "facade",
    t: "Ravalement de façade",
    k: "Façades",
    c: "Pont-à-Mousson",
    img: "facade",
    before: <HouseScene cracked facade="#cdc2b3" roof="#6f5e55" />,
    after: <HouseScene facade="#efe2cc" roof="#8b4a35" />,
  },
  {
    id: "muret",
    t: "Muret en pierre",
    k: "Murets",
    c: "Dieulouard",
    img: "muret",
    before: <HouseScene cracked facade="#e6dccd" roof="#7c4a3a" />,
    after: <HouseScene stoneWall facade="#e9dfcf" roof="#7c4a3a" />,
  },
  {
    id: "terrasse",
    t: "Terrasse béton désactivé",
    k: "Terrasses",
    c: "Pagny-sur-Moselle",
    img: "terrasse",
    before: <HouseScene facade="#ddd5c8" roof="#5f5f5f" />,
    after: <HouseScene terrace="#cfc6b6" facade="#ece6dc" roof="#5f5f5f" />,
  },
  {
    id: "extension",
    t: "Extension 20 m²",
    k: "Extensions",
    c: "Blénod-lès-PàM",
    img: "maison",
    before: <HouseScene facade="#d9cfbf" roof="#8b4a35" />,
    after: <HouseScene timber facade="#efe5d6" roof="#8b4a35" />,
  },
];

type Chantier = (typeof chantiers)[number];

const info: SiteInfo = {
  baseline: "Maçonnerie · Façades · Extérieurs",
  phone: "03 53 48 47 19",
  email: "contact@exemple-maconnerie-pontamousson.fr",
  address: "ZA du Breuil, 54700 Pont-à-Mousson",
  hours: "Lun–ven 7h30–17h30",
  zone: "Pont-à-Mousson, Metz et Nancy",
  about:
    "Maçons depuis trois générations : ravalement, murets, terrasses et extensions. Chaque chantier commence par une visite gratuite.",
  labels: ["Qualibat", "Garantie décennale", "Artisan", "Devis gratuit"],
  links: [
    { label: "Ravalement de façade", page: "prestations" },
    { label: "Murets et clôtures", page: "prestations" },
    { label: "Terrasses", page: "prestations" },
    { label: "Extensions", page: "prestations" },
    { label: "Galerie avant / après", page: "galerie" },
  ],
  contactPage: "contact",
  articles: [
    {
      t: "Ravalement de façade : quand et comment ?",
      d: "Fissures, salissures, enduit qui se décolle : les bons moments pour intervenir.",
      cat: "Façades",
      read: 4,
      img: "facade",
      body: [
        "Un ravalement est conseillé tous les 10 à 15 ans, ou plus tôt si des fissures laissent passer l'eau.",
        "Sur les maisons anciennes, un enduit à la chaux laisse respirer les murs et évite l'humidité.",
        "Une déclaration préalable en mairie est souvent nécessaire, surtout si la couleur change.",
      ],
    },
    {
      t: "Muret en pierre : sèche ou maçonnée ?",
      d: "Avantages, prix et durée de vie des deux techniques.",
      cat: "Extérieurs",
      read: 3,
      img: "muret",
      body: [
        "La pierre sèche, sans mortier, draine naturellement l'eau et convient aux murets de soutènement bas.",
        "La pierre maçonnée est plus solide pour les clôtures hautes et les murets en limite de propriété.",
        "Comptez de 250 à 450 € par m² selon la pierre et les fondations.",
      ],
    },
    {
      t: "Terrasse béton : désactivé, imprimé ou dalles ?",
      d: "Trois finitions, trois budgets : comparez avant de choisir.",
      cat: "Terrasses",
      read: 3,
      img: "terrasse",
      body: [
        "Le béton désactivé laisse apparaître les graviers : antidérapant et très résistant, il convient aux allées et plages de piscine.",
        "Le béton imprimé imite la pierre ou le bois pour un prix plus bas qu'un dallage.",
        "Les dalles sur plots s'installent sans béton et restent démontables.",
      ],
    },
  ],
  rating: { value: "4,9", count: 58 },
};

function Compare({ c, tall = false }: { c: Chantier; tall?: boolean }) {
  const [pos, setPos] = useState(50);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl ring-1 ring-nuit/10",
        tall ? "h-[280px]" : "h-[250px]",
      )}
    >
      {/* Après (dessous) */}
      <div className="absolute inset-0">
        {c.after}
        <span className="absolute top-3 right-3 rounded-md bg-(--d) px-2 py-0.5 text-[10px] font-bold text-white">
          Après
        </span>
      </div>
      {/* Avant (dessus, rogné) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="absolute inset-0 saturate-[0.6]">{c.before}</div>
        <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-nuit">
          Avant
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white"
        style={{ left: `${pos}%` }}
      />
      <span
        className="pointer-events-none absolute top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-(--d) shadow-lg"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal className="size-4" />
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparer avant et après"
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-(--d)/85 px-3 py-1.5 text-[11px] font-semibold text-white">
        {c.t} · {c.c}
      </p>
    </div>
  );
}

function Home() {
  const { project } = useMini();
  const [k, setK] = useState<Chantier["k"]>("Façades");
  const c = chantiers.find((x) => x.k === k) ?? chantiers[0];
  return (
    <>
      {/* Hero */}
      <div className="bg-(--s) px-4 pt-6 pb-6 @min-[600px]:px-8">
        <div className="grid gap-5 @min-[600px]:grid-cols-[0.9fr_1.1fr] @min-[600px]:items-center">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-(--ink) uppercase">
              Maçon à {project.city} depuis 1987
            </p>
            <p className="mt-3 font-display text-[30px] leading-[1.04] font-extrabold tracking-tight text-(--d)">
              Façades, murets et terrasses <span className="text-(--a)">faits pour durer</span>
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-nuit/65">
              Ravalement, enduits à la chaux, maçonnerie de pierre, terrasses et extensions. Une
              équipe de 6 compagnons, pas de sous-traitance.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Btn to="contact" tone="dark" className="rounded-md px-5 py-2.5">
                Visite gratuite <ArrowRight className="size-3.5" />
              </Btn>
              <Btn to="galerie" tone="light" className="rounded-md px-5 py-2.5">
                Voir nos chantiers
              </Btn>
            </div>
          </div>
          <div>
            <Compare key={c.id} c={c} />
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
              <Choice
                options={["Façades", "Murets", "Terrasses", "Extensions"] as const}
                value={k}
                onChange={setK}
                activeClassName="bg-(--d) text-white ring-(--d)"
              />
              <span className="text-[10px] text-nuit/50">Glissez pour comparer</span>
            </div>
          </div>
        </div>
      </div>

      <TrustStrip
        items={[
          { I: CalendarCheck, t: "Visite gratuite", d: "Sous 7 jours, devis écrit" },
          { I: Users, t: "Nos compagnons", d: "Aucune sous-traitance" },
          { I: Award, t: "Qualibat", d: "Maçonnerie et façades" },
          { I: ShieldCheck, t: "Décennale", d: "Ouvrages garantis 10 ans" },
        ]}
      />

      {/* Prestations */}
      <Section>
        <SectionHead
          kicker="Savoir-faire"
          title="Ce que nous construisons"
          intro="Des petits travaux aux chantiers complets, toujours avec des matériaux adaptés au bâti lorrain."
        />
        <div className="mt-5 grid grid-cols-2 gap-3 @min-[600px]:grid-cols-4">
          {chantiers.map((x, i) => (
            <Btn
              key={x.id}
              to="galerie"
              param={x.id}
              tone="light"
              className="flex-col items-stretch gap-0 overflow-hidden rounded-lg p-0 text-left ring-nuit/8"
            >
              <Photo src={x.img} alt={x.t} className="h-24 rounded-none" />
              <span className="block p-3">
                <span className="block text-[12px] font-bold text-nuit">{prestations[i].t}</span>
                <span className="mt-1 block text-[10px] leading-relaxed font-normal text-nuit/55">
                  {prestations[i].d}
                </span>
              </span>
            </Btn>
          ))}
        </div>
      </Section>

      {/* Entreprise */}
      <Section className="bg-(--d)">
        <div className="grid gap-6 @min-[600px]:grid-cols-2 @min-[600px]:items-center">
          <Photo
            src="macon-hero"
            className="h-48"
            caption="Montage d'un mur en parpaings · Dieulouard"
          />
          <div>
            <SectionHead
              light
              kicker="L'entreprise"
              title="Trois générations de maçons à Pont-à-Mousson"
              intro="Fondée par Gérard en 1987, reprise par ses fils : on connaît la pierre de Jaumont, les enduits à la chaux et les maisons de la vallée."
            />
            <Stats
              light
              className="mt-5 @min-[600px]:grid-cols-2"
              items={[
                { v: "38 ans", l: "d'expérience" },
                { v: "6", l: "compagnons" },
                { v: "900+", l: "chantiers livrés" },
                { v: "10 ans", l: "de garantie" },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead kicker="Notre méthode" title="Un chantier en 4 étapes" className="mb-6" />
        <Steps
          items={[
            { t: "Visite gratuite", d: "On mesure, on écoute, on regarde l'état du bâti." },
            { t: "Devis détaillé", d: "Sous 10 jours, avec les matériaux et le planning." },
            { t: "Chantier", d: "Protégé, rangé chaque soir, un chef de chantier dédié." },
            { t: "Réception", d: "Visite de fin de chantier et remise des garanties." },
          ]}
        />
      </Section>

      <Section className="bg-(--s)">
        <SectionHead kicker="Avis clients" title="Ce que disent nos clients" className="mb-5" />
        <Reviews
          count={58}
          reviews={[
            {
              n: "Martine G.",
              c: "Pont-à-Mousson",
              when: "il y a 3 semaines",
              t: "Façade de notre maison de 1930 refaite à la chaux. Le résultat est magnifique, les voisins nous demandent le contact.",
            },
            {
              n: "Olivier T.",
              c: "Dieulouard",
              when: "il y a 2 mois",
              t: "Muret de 18 m en pierre sèche. Travail soigné, délais tenus, équipe très sympathique.",
            },
            {
              n: "Sandrine P.",
              c: "Pagny-sur-Moselle",
              when: "il y a 4 mois",
              t: "Terrasse en béton désactivé de 40 m², propre et bien finie. Devis respecté.",
            },
          ]}
        />
      </Section>

      <Section className="grid gap-6 @min-[600px]:grid-cols-2">
        <div>
          <SectionHead kicker="Zone d'intervention" title="Entre Metz et Nancy" />
          <ZoneMap className="mt-4 h-44" towns={towns} />
        </div>
        <div>
          <SectionHead kicker="Questions fréquentes" title="Avant de vous lancer" />
          <Faq
            className="mt-4"
            items={[
              {
                q: "Faut-il une autorisation pour refaire ma façade ?",
                a: "Une déclaration préalable est souvent nécessaire, surtout si la couleur change. On prépare le dossier avec vous.",
              },
              {
                q: "Quelle est la meilleure période pour un ravalement ?",
                a: "Du printemps à l'automne, hors gel et fortes chaleurs. Les plannings se remplissent dès février.",
              },
              {
                q: "Travaillez-vous la pierre de Jaumont ?",
                a: "Oui, en rejointoiement comme en construction neuve de murets.",
              },
            ]}
          />
        </div>
      </Section>

      <ArticlesSection />

      <Section className="px-0 pt-0 @min-[600px]:px-0 @min-[600px]:pt-0">
        <CtaBand
          title="Un projet de maçonnerie ?"
          text="Visite et devis gratuits, sous 7 jours."
          cta={{ label: "Demander une visite", to: "contact" }}
        />
      </Section>
      <MiniFooter />
    </>
  );
}
const prestations = [
  {
    t: "Ravalement et enduits",
    d: "Nettoyage, réparation des fissures, enduit à la chaux ou monocouche.",
  },
  { t: "Murets et clôtures", d: "Pierre, parpaing enduit ou gabions, avec fondations adaptées." },
  { t: "Terrasses et dallages", d: "Béton désactivé, dalles sur plots, escaliers extérieurs." },
  {
    t: "Extensions et ouvertures",
    d: "Agrandissement, création d'ouverture avec linteau, reprise en sous-œuvre.",
  },
];

function Prestations() {
  const [open, setOpen] = useState(0);
  return (
    <SubPage
      eyebrow="Prestations"
      title="Du petit muret à l'extension"
      visual="macon-chantier"
      intro="Chaque chantier commence par une visite gratuite et un devis détaillé."
    >
      <div className="grid gap-2.5 @min-[600px]:grid-cols-2">
        {prestations.map((p, i) => (
          <button
            key={p.t}
            type="button"
            onClick={() => setOpen(i)}
            aria-pressed={open === i}
            className={cn(
              "rounded-xl p-4 text-left ring-1 transition-colors",
              open === i ? "bg-(--d) text-white ring-(--d)" : "bg-white text-nuit ring-nuit/8",
            )}
          >
            <span className="flex items-center gap-2 text-[12px] font-bold">
              <BrickWall className={cn("size-4", open === i ? "text-(--a)" : "text-(--p)")} /> {p.t}
            </span>
            <span
              className={cn(
                "mt-1.5 block text-[11px] leading-relaxed",
                open === i ? "text-white/70" : "text-nuit/60",
              )}
            >
              {p.d}
            </span>
          </button>
        ))}
      </div>
      <Btn to="contact" tone="dark" className="mt-4">
        Demander une visite <ArrowRight className="size-3.5" />
      </Btn>
    </SubPage>
  );
}

function Galerie() {
  const { param } = useMini();
  const [sel, setSel] = useState(param ?? chantiers[0].id);
  const c = chantiers.find((x) => x.id === sel) ?? chantiers[0];
  return (
    <SubPage eyebrow="Galerie" title="Avant / après">
      <Compare key={c.id} c={c} tall />
      <div className="mt-3 grid grid-cols-2 gap-2 @min-[600px]:grid-cols-4">
        {chantiers.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setSel(x.id)}
            aria-pressed={sel === x.id}
            className={cn(
              "overflow-hidden rounded-xl bg-white text-left ring-1",
              sel === x.id ? "ring-2 ring-(--p)" : "ring-nuit/8",
            )}
          >
            <span className="block h-14">{x.after}</span>
            <span className="block px-2.5 py-1.5 text-[10px] font-semibold text-nuit">{x.t}</span>
            <span className="block px-2.5 pb-2 text-[9px] text-nuit/50">{x.c}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-[13px] font-bold text-nuit">Photos de chantier</p>
      <p className="mt-0.5 text-[10.5px] text-nuit/55">
        Cliquez sur une photo pour l&apos;agrandir.
      </p>
      <Gallery
        className="mt-3"
        items={[
          { src: "facade", t: "Ravalement terminé · Pont-à-Mousson" },
          { src: "macon-hero", t: "Mur en parpaings · Dieulouard" },
          { src: "muret", t: "Muret en pierre sèche · Dieulouard" },
          { src: "terrasse", t: "Terrasse et allée · Pagny-sur-Moselle" },
          { src: "macon-mur", t: "Rejointoiement de briques · Metz" },
          { src: "macon-chantier", t: "Fondations d'une extension · Blénod" },
        ]}
      />
    </SubPage>
  );
}

const towns = [
  "Pont-à-Mousson",
  "Dieulouard",
  "Pagny-sur-Moselle",
  "Blénod-lès-PàM",
  "Corny-sur-Moselle",
  "Metz",
];

function Contact() {
  return (
    <SubPage eyebrow="Contact" title="Parlons de votre chantier">
      <div className="grid gap-4 @min-[600px]:grid-cols-[1.2fr_1fr]">
        <Card>
          <DemoForm
            submitLabel={
              <>
                <Send className="size-3.5" /> Demander une visite gratuite
              </>
            }
            success={{
              title: "Demande reçue",
              text: "On vous appelle pour fixer la visite du chantier.",
            }}
            className="min-h-[260px]"
          >
            <div className="grid gap-2.5 @min-[600px]:grid-cols-2">
              <Field label="Nom" placeholder="Votre nom" />
              <Field label="Téléphone" placeholder="06 XX XX XX XX" type="tel" />
            </div>
            <div className="mt-2.5">
              <Field label="Votre projet" textarea placeholder="Ex. : muret de 12 m en pierre" />
            </div>
            <div className="mt-2.5">
              <UploadField />
            </div>
          </DemoForm>
        </Card>
        <div className="rounded-2xl bg-(--d) p-4 text-white">
          <p className="flex items-center gap-1.5 text-[12px] font-bold">
            <MapPin className="size-4 text-(--a)" /> Zone d&apos;intervention
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {towns.map((t) => (
              <li key={t} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SubPage>
  );
}

export function MaconSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={BrickWall}
      info={info}
      navStyle="caps"
      cta={{ label: "Demander un devis", page: "contact" }}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        {
          id: "prestations",
          label: "Prestations",
          path: "/prestations",
          render: () => <Prestations />,
        },
        { id: "galerie", label: "Galerie", path: "/galerie", render: () => <Galerie /> },
        { id: "contact", label: "Contact", path: "/contact", render: () => <Contact /> },
      ]}
    />
  );
}
