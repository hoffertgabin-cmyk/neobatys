"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bath,
  Calculator,
  Grid3x3,
  Home as HomeIcon,
  Layers,
  Ruler,
  Send,
  ShieldCheck,
  Store,
  Sun,
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
  Steps,
  TrustStrip,
  ZoneMap,
} from "./blocks";
import { ArticlesSection, Gallery, Pic, UploadField } from "./extras";
import { TileCloseUp } from "./scenes";

const types = ["Carrelage sol", "Faïence murale", "Grand format"] as const;
const motifs = ["Droit", "Diagonale", "Chevron"] as const;
type Type = (typeof types)[number];
type Motif = (typeof motifs)[number];

/** Prix au m² fourni-posé, exemple. */
const tarif: Record<Type, number> = {
  "Carrelage sol": 55,
  "Faïence murale": 48,
  "Grand format": 72,
};
const surcout: Record<Motif, number> = { Droit: 0, Diagonale: 8, Chevron: 14 };

const tileMotif = { Droit: "droit", Diagonale: "diagonale", Chevron: "chevron" } as const;

/** Calepinage selon le motif, en gros plan. */
function Pattern({
  motif,
  className,
  color = "#c9d6cf",
}: {
  motif: Motif;
  className?: string;
  color?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <TileCloseUp motif={tileMotif[motif]} color={color} />
    </div>
  );
}

const info: SiteInfo = {
  baseline: "Carrelage · Faïence · Terrasses",
  phone: "03 53 48 58 26",
  email: "devis@exemple-carrelage-amneville.fr",
  address: "40 rue de Metz, 57360 Amnéville",
  hours: "Lun–ven 8h–18h · Showroom sam. 9h–12h",
  zone: "Amnéville, Thionville et Metz",
  about:
    "Carreleurs depuis 2013 : salles de bain, grands formats et terrasses. Calepinage dessiné avant la pose, joints réguliers, chantier rendu propre.",
  labels: ["Qualibat", "Garantie décennale", "Pose certifiée SPEC"],
  links: [
    { label: "Salle de bain", page: "prestations" },
    { label: "Pièces de vie", page: "prestations" },
    { label: "Terrasses", page: "prestations" },
    { label: "Galerie", page: "galerie" },
    { label: "Estimer mon chantier", page: "home" },
  ],
  contactPage: "contact",
  articles: [
    {
      t: "Grand format : les pièges à éviter",
      d: "Planéité, colle, joints : ce qui change avec des carreaux de 120 cm.",
      cat: "Pose",
      read: 4,
      img: "carrelage",
      body: [
        "Les grands formats exigent un support parfaitement plan : un ragréage est souvent nécessaire.",
        "Le double encollage (sur le sol et sur le carreau) évite les creux et les casses.",
        "Des joints fins de 2 mm mettent en valeur le grand format mais demandent une pose très précise.",
      ],
    },
    {
      t: "Faïence de salle de bain : bien choisir",
      d: "Formats, finitions, entretien : nos conseils.",
      cat: "Salle de bain",
      read: 3,
      img: "faience",
      body: [
        "Les carreaux zellige ou métro apportent du relief, les grands formats agrandissent la pièce.",
        "Une finition mate glisse moins mais se nettoie un peu moins facilement que la brillante.",
        "Un joint époxy dans la douche résiste aux moisissures bien mieux qu'un joint ciment.",
      ],
    },
    {
      t: "Carrelage extérieur : quelle classe d'antidérapant ?",
      d: "R10, R11, R12 : comprendre les normes pour une terrasse sûre.",
      cat: "Terrasses",
      read: 3,
      img: "terrasse-carrelage",
      body: [
        "Pour une terrasse, choisissez au minimum un carrelage classé R11.",
        "Autour d'une piscine, privilégiez le classement A+B+C pour pieds nus.",
        "Un carrelage ingélif est indispensable en Moselle, où les hivers sont rudes.",
      ],
    },
  ],
  rating: { value: "4,9", count: 89 },
};

function Simulator({ motif, setMotif }: { motif: Motif; setMotif: (m: Motif) => void }) {
  const [surface, setSurface] = useState(24);
  const [type, setType] = useState<Type>("Carrelage sol");
  const [depose, setDepose] = useState(false);
  const unit = tarif[type] + surcout[motif] + (depose ? 12 : 0);
  const low = Math.round((surface * unit * 0.9) / 10) * 10;
  const high = Math.round((surface * unit * 1.12) / 10) * 10;
  const fmt = (n: number) => n.toLocaleString("fr-FR");
  return (
    <Card className="shadow-[0_24px_50px_-20px_rgb(4_47_46/0.4)]">
      <p className="flex items-center gap-1.5 text-[13px] font-bold text-nuit">
        <Calculator className="size-4 text-(--p)" /> Estimez votre chantier
      </p>
      <label className="mt-3 block">
        <span className="flex items-center justify-between text-[10px] font-semibold text-nuit/60">
          Surface <span className="text-[13px] font-bold text-(--d)">{surface} m²</span>
        </span>
        <input
          type="range"
          min={4}
          max={120}
          value={surface}
          onChange={(e) => setSurface(Number(e.target.value))}
          className="mt-1 w-full accent-(--p)"
        />
      </label>
      <p className="mt-2 text-[10px] font-semibold text-nuit/60">Type</p>
      <Choice
        options={types}
        value={type}
        onChange={setType}
        className="mt-1"
        itemClassName="px-2.5 py-1 text-[10px]"
      />
      <p className="mt-2 text-[10px] font-semibold text-nuit/60">Pose</p>
      <Choice
        options={motifs}
        value={motif}
        onChange={setMotif}
        className="mt-1"
        itemClassName="px-2.5 py-1 text-[10px]"
      />
      <label className="mt-2.5 flex items-center gap-2 text-[11px] text-nuit/70">
        <input
          type="checkbox"
          checked={depose}
          onChange={(e) => setDepose(e.target.checked)}
          className="accent-(--p)"
        />
        Dépose de l&apos;ancien revêtement
      </label>
      <div className="mt-3 flex items-end justify-between rounded-xl bg-(--s) p-3">
        <div>
          <p className="text-[9px] text-nuit/50">Estimation fourni-posé</p>
          <p className="font-display text-[20px] font-bold text-(--d)">
            {fmt(low)} – {fmt(high)} €
          </p>
        </div>
        <p className="text-right text-[9px] text-nuit/50">
          ≈ {unit} € / m²
          <br />
          indicatif
        </p>
      </div>
      <Btn
        to="contact"
        param={`${type}, pose ${motif.toLowerCase()}, ${surface} m²${depose ? ", avec dépose" : ""}`}
        tone="dark"
        className="mt-2.5 w-full"
      >
        Recevoir le devis détaillé
      </Btn>
    </Card>
  );
}

function Home() {
  const { project } = useMini();
  const [motif, setMotif] = useState<Motif>("Droit");
  return (
    <>
      {/* Hero : visuel + simulateur */}
      <div className="grid @min-[600px]:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden bg-(--d)">
          <Pic
            src="carreleur-hero"
            alt="Salle d'eau carrelée du sol au plafond"
            priority
            sizes="60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--d) via-(--d)/60 to-(--d)/10" />
          <div className="relative flex h-full flex-col justify-end p-4 text-white @min-[600px]:p-6">
            <p className="text-[10px] font-bold tracking-[0.16em] text-(--a) uppercase">
              Carreleur à {project.city}
            </p>
            <p className="mt-2 font-display text-[30px] leading-[1.04] font-bold tracking-tight">
              Sols et murs, posés au millimètre
            </p>
            <p className="mt-2 max-w-[300px] text-[11.5px] leading-relaxed text-white/70">
              Salles de bain, grands formats et terrasses. Calepinage dessiné avant la pose.
            </p>
            <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-white/10 p-2 ring-1 ring-white/15 backdrop-blur">
              <Pattern motif={motif} className="size-10 shrink-0 rounded-lg" />
              <span className="min-w-0 text-[10.5px] leading-tight">
                <span className="block font-semibold">Pose « {motif.toLowerCase()} »</span>
                <span className="block text-white/60">Changez le motif dans l&apos;estimation</span>
              </span>
            </div>
          </div>
        </div>
        <div className="bg-(--s) p-4 @min-[600px]:p-5">
          <Simulator motif={motif} setMotif={setMotif} />
        </div>
      </div>

      <TrustStrip
        items={[
          { I: Calculator, t: "Prix en 30 s", d: "Estimation fourni-posé" },
          { I: Ruler, t: "Calepinage", d: "Plan de pose avant chantier" },
          { I: Store, t: "Showroom", d: "200 références à Amnéville" },
          { I: ShieldCheck, t: "Décennale", d: "Étanchéité garantie 10 ans" },
        ]}
      />

      <Section>
        <SectionHead
          kicker="Prestations"
          title="Tout ce qui se pose, de la douche à la terrasse"
          intro="Fourniture conseillée dans notre showroom ou pose de votre carrelage."
        />
        <div className="mt-5 grid grid-cols-2 gap-3 @min-[600px]:grid-cols-4">
          {prestations.map(({ I, t, d }, i) => (
            <Btn
              key={t}
              to="prestations"
              tone="light"
              className="flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left ring-nuit/8"
            >
              <Photo
                src={["carreleur-hero", "carrelage", "terrasse-carrelage", "faience"][i]}
                alt={t}
                className="h-24 rounded-none"
              />
              <span className="block p-3">
                <span className="flex items-center gap-1.5 text-[12px] font-bold text-nuit">
                  <I className="size-3.5 text-(--p)" /> {t}
                </span>
                <span className="mt-1 block text-[10px] leading-relaxed font-normal text-nuit/55">
                  {d}
                </span>
              </span>
            </Btn>
          ))}
        </div>
      </Section>

      <Section className="bg-(--d)">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHead light kicker="Galerie" title="Nos derniers chantiers" />
          <Btn
            to="galerie"
            tone="light"
            className="bg-white/10 text-white ring-white/20 hover:bg-white/20"
          >
            Toute la galerie <ArrowRight className="size-3.5" />
          </Btn>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 @min-[600px]:grid-cols-[1.4fr_1fr_1fr]">
          <Photo
            className="col-span-2 h-40 @min-[600px]:col-span-1 @min-[600px]:row-span-2 @min-[600px]:h-auto"
            caption="Douche à l'italienne · Amnéville"
            src="plombier-sdb"
          />
          <Photo src="carrelage" className="h-28" caption="Pose d'un sol · Rombas" />
          <Photo src="faience" className="h-28" caption="Parement effet brique · Talange" />
          <Photo src="carreleur-sol" className="h-28" caption="Pierre naturelle · Mondelange" />
          <Photo src="terrasse-carrelage" className="h-28" caption="Grand format · Hagondange" />
        </div>
      </Section>

      <Section>
        <SectionHead kicker="Notre méthode" title="Une pose sans surprise" className="mb-6" />
        <Steps
          items={[
            { t: "Estimation", d: "En ligne en 30 secondes, puis visite gratuite." },
            { t: "Calepinage", d: "Plan de pose dessiné : coupes, joints, seuils." },
            { t: "Préparation", d: "Dépose, ragréage et étanchéité si nécessaire." },
            { t: "Pose et joints", d: "Nettoyage complet avant la remise des clés." },
          ]}
        />
      </Section>

      <Section className="bg-(--s)">
        <SectionHead kicker="Avis clients" title="4,9/5 sur 89 avis" className="mb-5" />
        <Reviews
          count={89}
          reviews={[
            {
              n: "Émilie V.",
              c: "Amnéville",
              when: "il y a 2 semaines",
              t: "Douche à l'italienne parfaite, joints impeccables. L'estimation en ligne était juste à 50 € près.",
            },
            {
              n: "Thomas R.",
              c: "Hagondange",
              when: "il y a 1 mois",
              t: "45 m² de grand format 120 × 60 posés en 4 jours, pas un défaut de planéité. Très pro.",
            },
            {
              n: "Sophie L.",
              c: "Rombas",
              when: "il y a 3 mois",
              t: "Terrasse sur plots superbe, bons conseils pour le choix du carrelage antidérapant.",
            },
          ]}
        />
      </Section>

      <Section className="grid gap-6 @min-[600px]:grid-cols-2">
        <div>
          <SectionHead kicker="Zone d'intervention" title="Entre Thionville et Metz" />
          <ZoneMap
            className="mt-4 h-44"
            towns={[
              project.city,
              "Hagondange",
              "Rombas",
              "Talange",
              "Mondelange",
              "Maizières",
              "Moyeuvre",
              "Thionville",
            ]}
          />
        </div>
        <div>
          <SectionHead kicker="Questions fréquentes" title="Avant de carreler" />
          <Faq
            className="mt-4"
            items={[
              {
                q: "Peut-on poser sur l'ancien carrelage ?",
                a: "Souvent oui, si l'ancien est bien adhérent et plan. On le vérifie lors de la visite.",
              },
              {
                q: "Combien de temps pour une salle de bain ?",
                a: "Comptez 4 à 6 jours pour une salle de bain de 6 m² avec douche à l'italienne.",
              },
              {
                q: "Fournissez-vous le carrelage ?",
                a: "Oui, notre showroom propose 200 références. Vous pouvez aussi fournir le vôtre.",
              },
            ]}
          />
        </div>
      </Section>

      <ArticlesSection />

      <Section className="px-0 pt-0 @min-[600px]:px-0 @min-[600px]:pt-0">
        <CtaBand
          title="Votre prix en 30 secondes"
          text="Estimation en ligne, puis visite et devis détaillé gratuits."
          cta={{ label: "Estimer mon chantier", to: "home" }}
        />
      </Section>
      <MiniFooter />
    </>
  );
}

const prestations = [
  { I: Bath, t: "Salle de bain", d: "Faïence, douche à l'italienne, étanchéité sous carrelage." },
  { I: HomeIcon, t: "Pièces de vie", d: "Grands formats, imitation parquet, ragréage du support." },
  { I: Sun, t: "Terrasses", d: "Carrelage extérieur antidérapant, pose sur plots ou collée." },
  { I: Layers, t: "Rénovation", d: "Dépose, reprise des supports, pose sur ancien carrelage." },
];

function Prestations() {
  const [open, setOpen] = useState(0);
  return (
    <SubPage
      eyebrow="Prestations"
      title="Ce que nous posons"
      intro="Fourniture conseillée ou posée avec votre carrelage."
      visual="carreleur-hero"
    >
      <div className="space-y-2">
        {prestations.map(({ I, t, d }, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setOpen(i)}
            aria-expanded={open === i}
            className="block w-full rounded-xl bg-white p-3.5 text-left ring-1 ring-nuit/8"
          >
            <span className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-lg",
                  open === i ? "bg-(--p) text-white" : "bg-(--s) text-(--p)",
                )}
              >
                <I className="size-4" />
              </span>
              <span className="text-[12px] font-bold text-nuit">{t}</span>
            </span>
            {open === i && (
              <span className="mt-2 block pl-[42px] text-[11px] leading-relaxed text-nuit/60">
                {d}
              </span>
            )}
          </button>
        ))}
      </div>
      <Btn to="home" className="mt-4">
        <Calculator className="size-3.5" /> Estimer mon chantier
      </Btn>
    </SubPage>
  );
}

const realisations = [
  {
    t: "Douche à l'italienne",
    c: "Amnéville",
    k: "Salle de bain",
    m: "Droit" as Motif,
    img: "plombier-sdb",
  },
  {
    t: "Séjour 45 m² grand format",
    c: "Hagondange",
    k: "Pièces de vie",
    m: "Droit" as Motif,
    img: "terrasse-carrelage",
  },
  {
    t: "Terrasse 30 m²",
    c: "Rombas",
    k: "Terrasses",
    m: "Diagonale" as Motif,
    img: "carreleur-sol",
  },
  {
    t: "Entrée en chevron",
    c: "Talange",
    k: "Pièces de vie",
    m: "Chevron" as Motif,
    img: "carrelage",
  },
  {
    t: "Crédence de cuisine",
    c: "Mondelange",
    k: "Rénovation",
    m: "Chevron" as Motif,
    img: "faience",
  },
  {
    t: "Salle d'eau",
    c: "Moyeuvre-Grande",
    k: "Salle de bain",
    m: "Diagonale" as Motif,
    img: "carreleur-hero",
  },
];
const filtres = ["Tout", "Salle de bain", "Pièces de vie", "Terrasses", "Rénovation"] as const;

function Galerie() {
  const [f, setF] = useState<(typeof filtres)[number]>("Tout");
  const list = realisations.filter((r) => f === "Tout" || r.k === f);
  return (
    <SubPage eyebrow="Galerie" title="Chantiers récents">
      <Choice options={filtres} value={f} onChange={setF} />
      <Gallery
        className="mt-3"
        itemClassName="h-32"
        items={list.map((r) => ({ src: r.img, t: `${r.t} · ${r.c} · pose ${r.m.toLowerCase()}` }))}
      />
    </SubPage>
  );
}

function Contact() {
  const { param } = useMini();
  return (
    <SubPage eyebrow="Contact" title="Votre devis détaillé">
      <div className="grid gap-3 @min-[600px]:grid-cols-[1.3fr_1fr]">
        <Card>
          <DemoForm
            submitLabel={
              <>
                <Send className="size-3.5" /> Envoyer ma demande
              </>
            }
            success={{
              title: "Demande envoyée",
              text: "Nous passons prendre les mesures et vous envoyons le devis.",
            }}
            className="min-h-[240px]"
          >
            <div className="grid gap-2.5 @min-[600px]:grid-cols-2">
              <Field label="Nom" placeholder="Votre nom" />
              <Field label="Téléphone" placeholder="06 XX XX XX XX" type="tel" />
            </div>
            <div className="mt-2.5">
              <Field
                label="Votre projet"
                textarea
                defaultValue={param}
                placeholder="Ex. : salle de bain 8 m²"
              />
            </div>
            <div className="mt-2.5">
              <UploadField />
            </div>
          </DemoForm>
        </Card>
        <div className="rounded-2xl bg-(--d) p-4 text-white">
          <p className="flex items-center gap-1.5 text-[12px] font-bold">
            <Grid3x3 className="size-4 text-(--a)" /> Visite et métré offerts
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-white/65">
            Amnéville, Hagondange, Rombas, Talange, Mondelange et alentours.
          </p>
        </div>
      </div>
    </SubPage>
  );
}

export function CarreleurSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={Grid3x3}
      info={info}
      navStyle="underline"
      cta={{ label: "Estimer mon chantier", page: "home" }}
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
