"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Hammer, Ruler, Send, ShieldCheck, Trees } from "lucide-react";
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
import { ArticlesSection, Gallery, Pic, UploadField } from "./extras";

const essences = {
  Chêne: "#b7793f",
  Hêtre: "#d1a172",
  Noyer: "#6f4426",
  "Pin des Landes": "#d9b07a",
} as const;
type Essence = keyof typeof essences;

const wood = (base: string) => ({
  backgroundColor: base,
  backgroundImage:
    "repeating-linear-gradient(90deg, rgb(255 255 255/0.07) 0 2px, transparent 2px 9px), repeating-linear-gradient(90deg, rgb(0 0 0/0.08) 0 1px, transparent 1px 23px), linear-gradient(180deg, rgb(255 255 255/0.12), transparent)",
});

const items = [
  {
    id: "escaliers",
    t: "Escaliers",
    c: "#b7793f",
    shape: "stairs",
    d: "Droits, quart tournant ou suspendus, limon central ou crémaillère.",
  },
  {
    id: "cuisines",
    t: "Cuisines",
    c: "#c9925a",
    shape: "kitchen",
    d: "Façades bois massif, plans de travail et rangements sur mesure.",
  },
  {
    id: "dressings",
    t: "Dressings",
    c: "#a86b34",
    shape: "doors",
    d: "Sous pente, en niche ou en îlot, portes battantes ou coulissantes.",
  },
  {
    id: "portes",
    t: "Portes",
    c: "#8a5527",
    shape: "door",
    d: "Portes intérieures et d'entrée, isolation et serrures 3 points.",
  },
  {
    id: "bibliotheques",
    t: "Bibliothèques",
    c: "#bf8547",
    shape: "shelves",
    d: "Du sol au plafond, avec éclairage intégré ou banquette.",
  },
  {
    id: "terrasses",
    t: "Terrasses bois",
    c: "#9c6431",
    shape: "deck",
    d: "Lames en pin traité, douglas ou bois exotique, sur lambourdes.",
  },
] as const;

type Item = (typeof items)[number];

function Shape({ shape }: { shape: Item["shape"] }) {
  return (
    <>
      {shape === "stairs" && (
        <div className="absolute right-4 bottom-0 flex items-end">
          {[14, 28, 42, 56].map((h) => (
            <span key={h} className="w-7 bg-(--d)/45" style={{ height: h }} />
          ))}
        </div>
      )}
      {shape === "kitchen" && (
        <div className="absolute inset-x-4 bottom-3 grid grid-cols-4 gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="h-10 rounded-sm bg-white/30 ring-1 ring-(--d)/30" />
          ))}
        </div>
      )}
      {shape === "doors" && (
        <div className="absolute inset-x-6 inset-y-3 grid grid-cols-3 gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="rounded-sm ring-1 ring-(--d)/40" />
          ))}
        </div>
      )}
      {shape === "door" && (
        <span className="absolute inset-y-3 left-1/2 w-12 -translate-x-1/2 rounded-t-md ring-2 ring-(--d)/40">
          <span className="absolute top-1/2 right-1.5 size-1.5 rounded-full bg-amber-200" />
        </span>
      )}
      {shape === "shelves" && (
        <div className="absolute inset-x-6 inset-y-3 flex flex-col justify-between">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="h-1.5 rounded-sm bg-(--d)/40" />
          ))}
        </div>
      )}
      {shape === "deck" && (
        <div className="absolute inset-0 flex flex-col justify-evenly">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-px bg-(--d)/40" />
          ))}
        </div>
      )}
    </>
  );
}

function Grid() {
  return (
    <div className="grid grid-cols-2 gap-3 @min-[600px]:grid-cols-3">
      {items.map((it) => (
        <Btn
          key={it.id}
          to="catalogue"
          param={it.id}
          tone="light"
          className="flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left ring-(--p)/15"
        >
          <span className="relative block h-[78px]" style={wood(it.c)}>
            <Shape shape={it.shape} />
          </span>
          <span className="flex items-center justify-between px-3 py-2">
            <span className="text-[12px] font-bold text-nuit">{it.t}</span>
            <span className="text-[10px] font-semibold text-(--p)">Voir →</span>
          </span>
        </Btn>
      ))}
    </div>
  );
}

const info: SiteInfo = {
  baseline: "Menuiserie d'agencement · Sur mesure",
  phone: "03 53 48 62 30",
  email: "atelier@exemple-menuiserie-boulay.fr",
  address: "3 chemin du Moulin, 57220 Boulay-Moselle",
  hours: "Atelier ouvert lun–ven 8h–18h · Sam sur rendez-vous",
  zone: "Moselle-Est, Metz et Saint-Avold",
  about:
    "Atelier de menuiserie fondé en 2004. Escaliers, cuisines, dressings et bibliothèques dessinés, fabriqués et posés par la même équipe.",
  labels: ["Bois PEFC", "Artisan d'art", "Garantie décennale"],
  links: items.slice(0, 5).map((it) => ({ label: it.t, page: "catalogue", param: it.id })),
  contactPage: "contact",
  articles: [
    {
      t: "Chêne, hêtre ou noyer : quel bois pour votre escalier ?",
      d: "Dureté, teinte et budget : notre comparatif d'atelier.",
      cat: "Escaliers",
      read: 4,
      img: "escalier",
      body: [
        "Le chêne est le bois roi des escaliers : très dur, il résiste aux chocs et se patine joliment.",
        "Le hêtre, plus clair et moins cher, convient bien aux escaliers peints ou vernis.",
        "Le noyer, plus rare, apporte une teinte chaude et profonde pour un escalier qui se remarque.",
      ],
    },
    {
      t: "Cuisine sur mesure : les étapes d'un projet réussi",
      d: "De la prise de mesures à la pose, combien de temps prévoir.",
      cat: "Cuisines",
      read: 4,
      img: "cuisine-bois",
      body: [
        "Tout commence par une visite pour relever les cotes, les arrivées d'eau et d'électricité.",
        "Les plans 3D permettent de valider les volumes et les finitions avant la fabrication.",
        "Comptez 6 à 8 semaines entre la validation et la pose.",
      ],
    },
    {
      t: "Entretenir un meuble en bois huilé",
      d: "Les bons gestes pour garder un bois beau pendant des années.",
      cat: "Entretien",
      read: 2,
      img: "atelier",
      body: [
        "Dépoussiérez avec un chiffon sec, sans produit ménager agressif.",
        "Une fois par an, passez une fine couche d'huile d'entretien et essuyez l'excédent.",
        "Les petites rayures s'effacent avec un léger ponçage au grain fin, suivi d'une couche d'huile.",
      ],
    },
  ],
  rating: { value: "5,0", count: 41 },
};

function Home() {
  const { project } = useMini();
  return (
    <>
      {/* Hero */}
      <div className="relative h-[340px] overflow-hidden bg-(--d)">
        <Pic src="cuisine-bois" alt="Cuisine en bois massif sur mesure" priority sizes="100vw" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-(--s) via-(--s)/90 to-transparent @min-[600px]:w-[70%]" />
        <div className="relative flex h-full max-w-[360px] flex-col justify-center px-4 @min-[600px]:px-8">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-(--p) uppercase">
            Atelier de menuiserie · {project.city}
          </p>
          <p className="mt-3 font-display text-[34px] leading-[1.02] font-semibold tracking-tight text-(--d)">
            Le bois, façonné à la main, <em className="text-(--p)">posé chez vous.</em>
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-nuit/65">
            Escaliers, cuisines, dressings et bibliothèques en bois massif, dessinés et fabriqués
            dans notre atelier.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Btn to="contact" className="rounded-none px-5 py-2.5">
              Parler de mon projet
            </Btn>
            <Btn
              to="catalogue"
              tone="light"
              className="rounded-none bg-transparent px-5 py-2.5 ring-(--d)/25"
            >
              Nos créations <ArrowRight className="size-3.5" />
            </Btn>
          </div>
        </div>
      </div>

      <TrustStrip
        items={[
          { I: Trees, t: "Bois français", d: "Chêne et hêtre PEFC" },
          { I: Hammer, t: "Fait à l'atelier", d: "À Boulay, rien n'est sous-traité" },
          { I: Ruler, t: "Plans 3D offerts", d: "Avant toute commande" },
          { I: ShieldCheck, t: "Pose comprise", d: "Garantie décennale" },
        ]}
      />

      <Section className="bg-(--s)">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHead kicker="Nos créations" title="Tout ce que l'on fabrique" />
          <p className="max-w-[200px] text-[11px] leading-relaxed text-nuit/60">
            Choisissez une création pour configurer l&apos;essence et la finition.
          </p>
        </div>
        <div className="mt-5">
          <Grid />
        </div>
      </Section>

      {/* L'atelier */}
      <Section className="grid gap-6 @min-[600px]:grid-cols-2 @min-[600px]:items-center">
        <div>
          <SectionHead
            kicker="L'atelier"
            title="400 m² d'atelier, quatre menuisiers"
            intro="On débite, on assemble et on ponce chaque pièce à Boulay. Les finitions à l'huile sont passées à la main, la pose est faite par ceux qui ont fabriqué."
          />
          <Stats
            className="mt-5 @min-[600px]:grid-cols-3"
            items={[
              { v: "20 ans", l: "de métier" },
              { v: "4", l: "menuisiers" },
              { v: "100 %", l: "fabriqué ici" },
            ]}
          />
          <Btn to="atelier" tone="dark" className="mt-5 rounded-none">
            Visiter l&apos;atelier <ArrowRight className="size-3.5" />
          </Btn>
        </div>
        <Photo src="atelier" className="h-56 rounded-none" caption="Notre atelier de Boulay" />
      </Section>

      {/* Réalisation à la une */}
      <Section className="bg-(--d)">
        <div className="grid gap-6 @min-[600px]:grid-cols-[1.1fr_1fr] @min-[600px]:items-center">
          <Photo src="escalier" className="h-56 rounded-none" caption="Escalier chêne · Créhange" />
          <div>
            <SectionHead
              light
              kicker="Réalisation à la une"
              title="Un escalier qui devient la pièce maîtresse"
            />
            <p className="mt-4 font-display text-[15px] leading-snug text-white/85 italic">
              « On voulait de la lumière et du bois. Ils ont dessiné un escalier suspendu avec un
              garde-corps en verre : c&apos;est la première chose qu&apos;on regarde en entrant. »
            </p>
            <p className="mt-3 text-[10.5px] text-white/55">Claire et Mathieu, Créhange</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          kicker="Comment on travaille"
          title="De l'esquisse à la pose"
          className="mb-6"
        />
        <Steps
          items={[
            { t: "Rencontre", d: "Chez vous ou à l'atelier, on prend les mesures et vos envies." },
            { t: "Plans 3D", d: "Vous validez les volumes, l'essence et la finition." },
            { t: "Fabrication", d: "4 à 8 semaines dans notre atelier selon le projet." },
            { t: "Pose", d: "Par l'équipe qui a fabriqué, chantier laissé propre." },
          ]}
        />
      </Section>

      <Section className="bg-(--s)">
        <SectionHead kicker="Avis clients" title="5,0 sur 41 avis" className="mb-5" />
        <Reviews
          rating="5,0"
          count={41}
          reviews={[
            {
              n: "Hélène W.",
              c: "Boulay-Moselle",
              when: "il y a 1 mois",
              t: "Dressing sous pente parfaitement ajusté, finitions superbes. On sent le travail d'artisan.",
            },
            {
              n: "Marc D.",
              c: "Metz",
              when: "il y a 2 mois",
              t: "Cuisine en chêne massif livrée et posée dans les temps. Les plans 3D nous ont beaucoup aidés à choisir.",
            },
            {
              n: "Isabelle F.",
              c: "Saint-Avold",
              when: "il y a 5 mois",
              t: "Bibliothèque sur tout un mur avec banquette. Magnifique, et un vrai conseil sur le choix du bois.",
            },
          ]}
        />
      </Section>

      <Section className="grid gap-6 @min-[600px]:grid-cols-2">
        <div>
          <SectionHead kicker="Zone d'intervention" title="Moselle-Est et Metz" />
          <ZoneMap
            className="mt-4 h-44"
            towns={[
              project.city,
              "Metz",
              "Saint-Avold",
              "Créhange",
              "Bouzonville",
              "Faulquemont",
              "Courcelles",
              "Falck",
            ]}
          />
        </div>
        <div>
          <SectionHead kicker="Questions fréquentes" title="Bon à savoir" />
          <Faq
            className="mt-4"
            items={[
              {
                q: "Quel délai pour une cuisine sur mesure ?",
                a: "Comptez 6 à 8 semaines entre la validation des plans et la pose.",
              },
              {
                q: "Peut-on venir voir l'atelier ?",
                a: "Oui, sur rendez-vous du lundi au samedi. Vous verrez les essences et les finitions en vrai.",
              },
              {
                q: "Travaillez-vous avec d'autres corps de métier ?",
                a: "Pour une cuisine, on coordonne le plombier et l'électricien si vous le souhaitez.",
              },
            ]}
          />
        </div>
      </Section>

      <ArticlesSection />

      <Section className="px-0 pt-0 @min-[600px]:px-0 @min-[600px]:pt-0">
        <CtaBand
          className="rounded-none"
          title="Un projet sur mesure ?"
          text="Rendez-vous à l'atelier ou chez vous, plans 3D offerts."
          cta={{ label: "Parler de mon projet", to: "contact" }}
        />
      </Section>
      <MiniFooter />
    </>
  );
}

function Catalogue() {
  const { param, go } = useMini();
  const it = items.find((x) => x.id === param);
  const [essence, setEssence] = useState<Essence>("Chêne");
  const [finish, setFinish] = useState<"Huilé" | "Vernis mat" | "Brut">("Huilé");
  const [width, setWidth] = useState(120);

  if (!it) {
    return (
      <SubPage
        eyebrow="Catalogue"
        title="Nos réalisations sur mesure"
        intro="Choisissez une famille pour configurer votre projet."
      >
        <Grid />
      </SubPage>
    );
  }
  return (
    <SubPage eyebrow={`Catalogue · ${it.t}`} title={it.t} intro={it.d}>
      <button
        type="button"
        onClick={() => go("catalogue")}
        className="mb-3 flex items-center gap-1 text-[11px] font-semibold text-(--p)"
      >
        <ArrowLeft className="size-3.5" /> Tout le catalogue
      </button>
      <div className="grid gap-4 @min-[600px]:grid-cols-[1.1fr_1fr]">
        <div
          className="relative h-48 overflow-hidden rounded-2xl ring-1 ring-(--p)/15"
          style={wood(essences[essence])}
        >
          <div
            className={cn(
              "absolute inset-0",
              finish === "Vernis mat" && "bg-white/10",
              finish === "Brut" && "bg-white/20 mix-blend-soft-light",
            )}
          />
          <div className="absolute inset-0 origin-bottom scale-[1.6]">
            <Shape shape={it.shape} />
          </div>
          <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-nuit">
            {essence} · {finish.toLowerCase()}
          </span>
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-(--d)/80 px-2 py-0.5 text-[10px] font-semibold text-white">
            <Ruler className="size-3" /> {width} cm
          </span>
        </div>
        <Card className="space-y-3">
          <div>
            <p className="text-[10px] font-semibold text-nuit/70">Essence de bois</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {(Object.keys(essences) as Essence[]).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEssence(e)}
                  aria-pressed={essence === e}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-1 text-[11px] font-semibold ring-1",
                    essence === e
                      ? "bg-(--d) text-white ring-(--d)"
                      : "bg-white text-nuit/70 ring-nuit/10",
                  )}
                >
                  <span className="size-4 rounded-full" style={wood(essences[e])} /> {e}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-nuit/70">Finition</p>
            <Choice
              options={["Huilé", "Vernis mat", "Brut"] as const}
              value={finish}
              onChange={setFinish}
              className="mt-1.5"
            />
          </div>
          <label className="block">
            <span className="flex justify-between text-[10px] font-semibold text-nuit/70">
              Largeur <span className="text-(--p)">{width} cm</span>
            </span>
            <input
              type="range"
              min={60}
              max={300}
              step={10}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-2 w-full accent-(--p)"
            />
          </label>
          <Btn
            to="contact"
            param={`${it.t} en ${essence.toLowerCase()}, ${finish.toLowerCase()}, ${width} cm`}
            tone="dark"
          >
            Demander un devis pour ce modèle <ArrowRight className="size-3.5" />
          </Btn>
        </Card>
      </div>
    </SubPage>
  );
}

const steps = [
  { t: "Prise de mesures", d: "On vient chez vous, on mesure et on écoute vos envies. Gratuit." },
  {
    t: "Plans 3D",
    d: "Vous recevez les plans et le devis. On ajuste jusqu'à ce que ce soit parfait.",
  },
  { t: "Fabrication", d: "Le bois est choisi, débité et assemblé dans notre atelier." },
  { t: "Pose", d: "Pose soignée en une à deux journées, chantier laissé propre." },
];

function Atelier() {
  const [step, setStep] = useState(0);
  return (
    <SubPage
      eyebrow="L'atelier"
      title="De la mesure à la pose"
      intro="Quatre étapes, un seul interlocuteur du début à la fin."
      visual="menuisier-outils"
    >
      <div className="grid grid-cols-4 gap-1.5">
        {steps.map((s, i) => (
          <button
            key={s.t}
            type="button"
            onClick={() => setStep(i)}
            aria-pressed={step === i}
            className={cn(
              "rounded-xl px-2 py-3 text-center text-[10px] font-semibold ring-1 transition-colors",
              i <= step ? "bg-(--p) text-(--op) ring-(--p)" : "bg-white text-nuit/55 ring-nuit/10",
            )}
          >
            <span className="block text-[16px] font-bold">{i + 1}</span>
            {s.t}
          </button>
        ))}
      </div>
      <Card className="mt-3 flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-(--s) text-(--p)">
          <Hammer className="size-5" />
        </span>
        <span>
          <span className="block text-[13px] font-bold text-nuit">
            Étape {step + 1} · {steps[step].t}
          </span>
          <span className="mt-1 block text-[11px] leading-relaxed text-nuit/65">
            {steps[step].d}
          </span>
        </span>
      </Card>
      <div className="mt-3 flex justify-between">
        <Btn tone="ghost" onClick={() => setStep(Math.max(0, step - 1))}>
          Précédente
        </Btn>
        <Btn tone="dark" onClick={() => setStep(Math.min(3, step + 1))}>
          Suivante <ArrowRight className="size-3.5" />
        </Btn>
      </div>
      <p className="mt-6 text-[13px] font-bold text-nuit">L&apos;atelier en images</p>
      <Gallery
        className="mt-3"
        items={[
          { src: "atelier", t: "L'atelier de Boulay" },
          { src: "menuisier-hero", t: "Ponçage d'un plan de travail" },
          { src: "menuisier-outils", t: "Rabots et outils à main" },
          { src: "escalier", t: "Escalier chêne · Créhange" },
          { src: "cuisine-bois", t: "Cuisine bois massif · Boulay" },
          { src: "cuisine-moderne", t: "Agencement de cuisine · Metz" },
        ]}
      />
    </SubPage>
  );
}

function Contact() {
  const { param, project } = useMini();
  return (
    <SubPage eyebrow="Contact" title="Votre projet sur mesure">
      <Card>
        <DemoForm
          submitLabel={
            <>
              <Send className="size-3.5" /> Envoyer ma demande
            </>
          }
          success={{
            title: "Demande envoyée",
            text: "On vous recontacte pour fixer la prise de mesures.",
          }}
          className="min-h-[240px]"
        >
          <div className="grid gap-2.5 @min-[600px]:grid-cols-3">
            <Field label="Nom" placeholder="Votre nom" />
            <Field label="Téléphone" placeholder="06 XX XX XX XX" type="tel" />
            <Field label="Ville" defaultValue={project.city} />
          </div>
          <div className="mt-2.5">
            <Field
              label="Votre projet"
              textarea
              defaultValue={param}
              placeholder="Ex. : dressing sous pente de 2,40 m"
            />
          </div>
          <div className="mt-2.5">
            <UploadField />
          </div>
        </DemoForm>
      </Card>
    </SubPage>
  );
}

export function MenuisierSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={Hammer}
      info={info}
      font="serif"
      navStyle="underline"
      cta={{ label: "Votre projet", page: "contact" }}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        { id: "catalogue", label: "Catalogue", path: "/catalogue", render: () => <Catalogue /> },
        { id: "atelier", label: "Atelier", path: "/atelier", render: () => <Atelier /> },
        { id: "contact", label: "Contact", path: "/contact", render: () => <Contact /> },
      ]}
    />
  );
}
