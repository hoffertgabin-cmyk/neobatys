"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  Check,
  Clock,
  FileText,
  Lightbulb,
  Plug,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  Choice,
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
import { ArticlesSection, Gallery } from "./extras";

const grid = {
  backgroundImage:
    "linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const services = [
  {
    I: Zap,
    t: "Mise aux normes",
    d: "Diagnostic complet, remplacement du tableau, mise à la terre et attestation de conformité.",
    points: [
      "Diagnostic offert avant devis",
      "Tableau neuf et étiqueté",
      "Attestation Consuel si besoin",
    ],
  },
  {
    I: Plug,
    t: "Bornes de recharge",
    d: "Installation de bornes pour voiture électrique en maison ou en copropriété.",
    points: ["Étude de puissance", "Borne 7 kW pilotable", "Aides et démarches expliquées"],
  },
  {
    I: Lightbulb,
    t: "Éclairage et domotique",
    d: "Éclairage LED, volets et chauffage pilotés depuis le téléphone.",
    points: ["Scénarios jour / nuit", "Pilotage à distance", "Économies d'énergie suivies"],
  },
];

function Services() {
  const { param } = useMini();
  const [tab, setTab] = useState(Number(param ?? 0));
  const s = services[tab];
  return (
    <SubPage eyebrow="Nos services" title="Ce qu'on fait pour vous" visual="tableau">
      <div className="flex flex-wrap gap-1.5">
        {services.map((x, i) => (
          <button
            key={x.t}
            type="button"
            onClick={() => setTab(i)}
            aria-pressed={tab === i}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ring-1",
              tab === i ? "bg-(--d) text-(--p) ring-(--d)" : "bg-white text-nuit/65 ring-nuit/10",
            )}
          >
            <x.I className="size-3.5" /> {x.t}
          </button>
        ))}
      </div>
      <Card className="mt-3 grid gap-4 @min-[600px]:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-[15px] font-bold text-nuit">{s.t}</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-nuit/65">{s.d}</p>
          <Btn to="devis" className="mt-4">
            Devis pour ce service <ArrowRight className="size-3.5" />
          </Btn>
        </div>
        <ul className="space-y-2 rounded-xl bg-(--s) p-3">
          {s.points.map((p) => (
            <li key={p} className="flex items-center gap-2 text-[11px] font-medium text-nuit/80">
              <span className="grid size-5 place-items-center rounded-full bg-(--d) text-(--p)">
                <Check className="size-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </Card>
    </SubPage>
  );
}

const works = [
  { t: "Tableau neuf, maison de 1975", k: "Rénovation", c: "Montigny-lès-Metz", img: "tableau" },
  { t: "Borne 7 kW en garage", k: "Borne", c: "Marly", img: "borne" },
  { t: "Éclairage d'un séjour", k: "Domotique", c: "Moulins-lès-Metz", img: "eclairage" },
  { t: "Mise aux normes d'un local", k: "Rénovation", c: "Metz", img: "electricien-chantier" },
  {
    t: "Recâblage complet d'une longère",
    k: "Rénovation",
    c: "Ars-sur-Moselle",
    img: "electricien-hero",
  },
  { t: "Spots et variateurs connectés", k: "Domotique", c: "Augny", img: "salon2" },
] as const;

const info: SiteInfo = {
  baseline: "Électricité générale · IRVE · Domotique",
  phone: "03 53 48 36 52",
  email: "devis@exemple-electricite-montigny.fr",
  address: "8 rue des Loges, 57950 Montigny-lès-Metz",
  hours: "Lun–ven 8h–18h · Dépannage sam. matin",
  zone: "Metz Métropole et 25 km autour",
  about:
    "Électriciens qualifiés pour la rénovation, la mise aux normes et la recharge de véhicules électriques. Devis détaillé sous 48 h.",
  labels: ["Qualifelec", "IRVE", "RGE", "Garantie décennale"],
  links: [
    { label: "Mise aux normes", page: "services", param: "0" },
    { label: "Bornes de recharge", page: "services", param: "1" },
    { label: "Éclairage et domotique", page: "services", param: "2" },
    { label: "Réalisations", page: "realisations" },
    { label: "Devis en ligne", page: "devis" },
  ],
  contactPage: "devis",
  articles: [
    {
      t: "Ma maison a 30 ans : faut-il refaire l'électricité ?",
      d: "Les signes qui doivent alerter et ce que coûte une mise en sécurité.",
      cat: "Rénovation",
      read: 4,
      img: "tableau",
      body: [
        "Des disjoncteurs qui sautent, des prises sans terre ou un tableau à fusibles sont les signes les plus fréquents d'une installation à reprendre.",
        "Une simple mise en sécurité (tableau neuf, différentiels, terre) coûte souvent entre 1 000 et 2 500 €.",
        "Une rénovation complète, avec reprise des circuits, se chiffre plutôt à partir de 90 € par m².",
      ],
    },
    {
      t: "Borne de recharge : les aides en 2026",
      d: "Crédit d'impôt, prime Advenir en copropriété : ce que vous pouvez récupérer.",
      cat: "Borne",
      read: 3,
      img: "borne",
      body: [
        "Le crédit d'impôt couvre 75 % du prix de la borne et de sa pose, dans la limite de 500 € par borne.",
        "En copropriété, la prime Advenir peut financer une partie de l'installation collective.",
        "Seul un installateur qualifié IRVE peut poser une borne de plus de 3,7 kW ouvrant droit aux aides.",
      ],
    },
    {
      t: "Éclairage LED : bien choisir ses spots",
      d: "Température de couleur, puissance, variation : les bons réglages pièce par pièce.",
      cat: "Éclairage",
      read: 3,
      img: "eclairage",
      body: [
        "Préférez un blanc chaud (2 700 à 3 000 K) dans le salon et les chambres, et un blanc neutre (4 000 K) dans la cuisine et le bureau.",
        "Comptez environ un spot pour 1,5 m² pour un éclairage d'ambiance homogène.",
        "Des variateurs compatibles LED évitent le scintillement et permettent d'adapter la lumière au moment.",
      ],
    },
  ],
  rating: { value: "4,8", count: 76 },
};

function Home() {
  const { project } = useMini();
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-(--d) text-white">
        <div className="absolute inset-0 opacity-[0.06]" style={grid} />
        <div className="relative grid gap-6 px-4 py-7 @min-[600px]:grid-cols-[1fr_1.05fr] @min-[600px]:items-center @min-[600px]:px-8 @min-[600px]:py-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-(--p) uppercase">
              Électricien à {project.city}
            </p>
            <p className="mt-3 font-display text-[38px] leading-[0.98] font-bold tracking-tight uppercase @min-[600px]:text-[44px]">
              Une installation <span className="text-(--p)">sûre</span>, aux normes, pensée pour
              demain
            </p>
            <p className="mt-3 max-w-[320px] text-[12px] leading-relaxed text-white/65">
              Mise aux normes NF C 15-100, tableau électrique, bornes de recharge et maison
              connectée. Devis détaillé sous 48 h.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Btn to="devis" className="rounded-md px-5 py-2.5">
                Devis gratuit en 2 min <ArrowRight className="size-3.5" />
              </Btn>
              <Btn
                to="realisations"
                tone="light"
                className="rounded-md bg-transparent px-5 py-2.5 text-white ring-white/25 hover:bg-white/10"
              >
                Nos réalisations
              </Btn>
            </div>
          </div>
          <div className="relative">
            <Photo
              src="electricien-hero"
              className="h-[250px] rounded-2xl ring-1 ring-white/10"
              caption="Câblage d'une rénovation · Marly"
            />
            <div className="absolute -bottom-3 -left-3 hidden w-44 rounded-xl bg-white p-3 text-nuit shadow-2xl @min-[600px]:block">
              <p className="flex items-center gap-1 text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                <FileText className="size-3" /> Devis n° 2026-118
              </p>
              <p className="mt-1 text-[11px] font-bold">Mise aux normes du tableau</p>
              <p className="mt-1.5 flex justify-between border-t border-nuit/10 pt-1.5 text-[11px] font-bold">
                <span>Total HT</span>
                <span>1 020 €</span>
              </p>
              <p className="mt-1 flex items-center gap-1 text-[9.5px] font-semibold text-emerald-700">
                <Check className="size-3" /> Envoyé en 48 h
              </p>
            </div>
            <div className="absolute -top-3 -right-2 hidden items-center gap-2 rounded-xl bg-(--p) px-3 py-2 text-(--op) shadow-xl @min-[600px]:flex">
              <ShieldCheck className="size-4" />
              <span className="text-[10px] leading-tight font-bold">
                Attestation
                <br />
                Consuel fournie
              </span>
            </div>
          </div>
        </div>
      </div>

      <TrustStrip
        items={[
          { I: Award, t: "Qualifelec", d: "Électriciens certifiés" },
          { I: Plug, t: "IRVE", d: "Habilités bornes de recharge" },
          { I: Clock, t: "Devis sous 48 h", d: "Détaillé poste par poste" },
          { I: ShieldCheck, t: "Décennale", d: "Travaux garantis 10 ans" },
        ]}
      />

      {/* Services */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHead kicker="Nos services" title="Trois métiers, une seule équipe" />
          <Btn to="services" tone="ghost" className="rounded-md">
            Tous nos services <ArrowRight className="size-3.5" />
          </Btn>
        </div>
        <div className="mt-5 grid gap-3 @min-[600px]:grid-cols-3">
          {services.map((s, i) => (
            <Btn
              key={s.t}
              to="services"
              param={String(i)}
              tone="light"
              className="flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left ring-nuit/8"
            >
              <Photo
                src={["tableau", "borne", "eclairage"][i]}
                alt={s.t}
                className="h-28 rounded-none"
              />
              <span className="block p-3.5">
                <span className="flex items-center gap-2 text-[13px] font-bold text-nuit">
                  <span className="grid size-6 place-items-center rounded-md bg-(--d) text-(--p)">
                    <s.I className="size-3.5" />
                  </span>
                  {s.t}
                </span>
                <span className="mt-1.5 block text-[10.5px] leading-relaxed font-normal text-nuit/60">
                  {s.d}
                </span>
              </span>
            </Btn>
          ))}
        </div>
      </Section>

      {/* Du formulaire au devis */}
      <Section className="bg-(--s)">
        <div className="grid gap-6 @min-[600px]:grid-cols-[1fr_1.15fr] @min-[600px]:items-center">
          <SectionHead
            kicker="Devis en ligne"
            title="Votre devis arrive sous 48 h, sans rendez-vous"
            intro="Décrivez votre besoin en 2 minutes. Votre demande arrive directement dans notre logiciel : on prépare le devis, on vous l'envoie par e-mail, vous signez en ligne."
          />
          <div className="flex items-center gap-2.5">
            <div className="flex-1 rounded-xl bg-white p-3 ring-1 ring-nuit/8">
              <p className="text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                Votre demande
              </p>
              <p className="mt-1.5 text-[11px] font-bold">Mise aux normes du tableau</p>
              <p className="mt-1 text-[10px] text-nuit/60">Maison 110 m² · {project.city}</p>
              <p className="mt-2.5 rounded-md bg-(--s) px-2 py-1.5 text-[10px] text-nuit/70">
                « Disjoncteur qui saute souvent »
              </p>
            </div>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--d) text-(--p)">
              <ArrowRight className="size-4" />
            </span>
            <div className="flex-1 rounded-xl bg-white p-3 ring-1 ring-nuit/8">
              <p className="flex items-center gap-1 text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                <FileText className="size-3" /> Notre devis
              </p>
              <div className="mt-2 space-y-1 text-[10px] text-nuit/65">
                <p className="flex justify-between gap-2">
                  <span>Tableau 13 mod.</span>
                  <span>640 €</span>
                </p>
                <p className="flex justify-between gap-2">
                  <span>Main d&apos;œuvre</span>
                  <span>380 €</span>
                </p>
              </div>
              <p className="mt-2 flex justify-between border-t border-nuit/10 pt-1.5 text-[11px] font-bold">
                <span>Total HT</span>
                <span>1 020 €</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Réalisations */}
      <Section>
        <SectionHead
          kicker="Réalisations"
          title="Chantiers récents autour de Metz"
          className="mb-5"
        />
        <div className="grid grid-cols-2 gap-3 @min-[600px]:grid-cols-4">
          {works.slice(0, 4).map((w) => (
            <Btn
              key={w.t}
              to="realisations"
              tone="light"
              className="flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left ring-nuit/8"
            >
              <Photo src={w.img} alt={w.t} className="h-20 rounded-none" caption={w.k} />
              <span className="block p-2.5">
                <span className="block text-[10.5px] leading-snug font-bold text-nuit">{w.t}</span>
                <span className="mt-0.5 block text-[9.5px] font-normal text-nuit/50">{w.c}</span>
              </span>
            </Btn>
          ))}
        </div>
      </Section>

      {/* Étapes */}
      <Section className="bg-(--d)">
        <SectionHead
          kicker="Comment ça marche"
          title="Un chantier sans mauvaise surprise"
          light
          className="mb-6"
        />
        <Steps
          light
          items={[
            { t: "Demande en ligne", d: "2 minutes pour décrire votre besoin, photos à l'appui." },
            { t: "Devis sous 48 h", d: "Détaillé, signé en ligne, aides déduites." },
            { t: "Travaux", d: "Date fixée ensemble, courant coupé le moins longtemps possible." },
            { t: "Attestation", d: "Schéma du tableau, Consuel et garantie remis." },
          ]}
        />
      </Section>

      <Section>
        <SectionHead kicker="Avis clients" title="4,8/5 sur 76 avis" className="mb-5" />
        <Reviews
          rating="4,8"
          count={76}
          reviews={[
            {
              n: "Julien B.",
              c: "Marly",
              when: "il y a 3 semaines",
              t: "Borne posée dans le garage en une matinée. Démarches pour la prime expliquées clairement, rien à redire.",
            },
            {
              n: "Nadia R.",
              c: "Metz",
              when: "il y a 1 mois",
              t: "Tableau électrique d'une maison de 1975 entièrement refait. Équipe ponctuelle, chantier laissé propre.",
            },
            {
              n: "Christophe H.",
              c: "Augny",
              when: "il y a 2 mois",
              t: "Devis reçu en 2 jours après la demande en ligne, très détaillé. Travaux conformes au devis.",
            },
          ]}
        />
      </Section>

      <Section className="grid gap-6 bg-(--s) @min-[600px]:grid-cols-2">
        <div>
          <SectionHead kicker="Zone d'intervention" title="Metz Métropole et alentours" />
          <ZoneMap
            className="mt-4 h-44"
            towns={[
              project.city,
              "Metz",
              "Marly",
              "Augny",
              "Ars-sur-Moselle",
              "Woippy",
              "Moulins-lès-Metz",
              "Peltre",
            ]}
          />
        </div>
        <div>
          <SectionHead kicker="Questions fréquentes" title="Vos questions" />
          <Faq
            className="mt-4"
            items={[
              {
                q: "Ma maison a plus de 15 ans, faut-il refaire l'électricité ?",
                a: "Pas forcément. Un diagnostic (offert avec le devis) permet de savoir s'il suffit de remplacer le tableau ou s'il faut reprendre des circuits.",
              },
              {
                q: "Quelles aides pour une borne de recharge ?",
                a: "Le crédit d'impôt et la prime Advenir peuvent réduire nettement le coût. On les déduit directement du devis quand c'est possible.",
              },
              {
                q: "Fournissez-vous l'attestation Consuel ?",
                a: "Oui, on s'occupe des démarches et de la visite quand elle est nécessaire.",
              },
            ]}
          />
        </div>
      </Section>

      <ArticlesSection />

      <Section className="px-0 @min-[600px]:px-0">
        <CtaBand
          title="Un projet électrique ? Parlons-en."
          text="Devis gratuit et détaillé sous 48 h."
          cta={{ label: "Demander un devis", to: "devis" }}
        />
      </Section>
      <MiniFooter />
    </>
  );
}

function Realisations() {
  const [k, setK] = useState<"Tout" | "Rénovation" | "Borne" | "Domotique">("Tout");
  const list = works.filter((w) => k === "Tout" || w.k === k);
  return (
    <SubPage eyebrow="Réalisations" title="Chantiers récents">
      <Choice
        options={["Tout", "Rénovation", "Borne", "Domotique"] as const}
        value={k}
        onChange={setK}
        activeClassName="bg-(--d) text-(--p) ring-(--d)"
      />
      <Gallery
        className="mt-3"
        itemClassName="h-32"
        items={list.map((w) => ({ src: w.img, t: `${w.t} · ${w.c}` }))}
      />
    </SubPage>
  );
}

const needs = ["Mise aux normes", "Borne de recharge", "Domotique", "Dépannage"] as const;
const homes = ["Maison", "Appartement", "Local pro"] as const;

function Devis() {
  const { project } = useMini();
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<(typeof needs)[number]>("Mise aux normes");
  const [home, setHome] = useState<(typeof homes)[number]>("Maison");
  const [area, setArea] = useState(110);
  const steps = ["Votre besoin", "Votre logement", "Vos coordonnées"];
  const lines =
    need === "Borne de recharge"
      ? [
          ["Borne 7 kW", 890],
          ["Protection dédiée", 210],
          ["Pose et mise en service", 320],
        ]
      : need === "Domotique"
        ? [
            ["Box et modules", 540],
            ["Programmation", 260],
            ["Pose", 300],
          ]
        : need === "Dépannage"
          ? [
              ["Déplacement", 60],
              ["Diagnostic et réparation", 120],
            ]
          : [
              ["Tableau 13 modules", 640],
              ["Mise à la terre", 180],
              ["Main d'œuvre", Math.round(area * 3.5)],
            ];
  const total = lines.reduce((s, [, v]) => s + Number(v), 0);

  return (
    <SubPage eyebrow="Devis gratuit" title="Votre devis en 3 étapes">
      <div className="flex gap-1.5">
        {steps.map((s, i) => (
          <span
            key={s}
            className={cn(
              "flex min-w-0 flex-1 items-center gap-1.5 rounded-lg px-2 py-1.5 text-[10px] font-semibold",
              i <= step ? "bg-(--d) text-(--p)" : "bg-white text-nuit/45 ring-1 ring-nuit/8",
            )}
          >
            <span className="grid size-4 shrink-0 place-items-center rounded-full bg-current/20 text-[9px]">
              {i < step ? <Check className="size-2.5" /> : i + 1}
            </span>
            <span className="truncate">{s}</span>
          </span>
        ))}
      </div>
      <Card className="mt-3">
        {step === 0 && (
          <>
            <p className="text-[12px] font-bold text-nuit">De quoi avez-vous besoin ?</p>
            <Choice
              options={needs}
              value={need}
              onChange={setNeed}
              className="mt-2"
              activeClassName="bg-(--d) text-(--p) ring-(--d)"
            />
          </>
        )}
        {step === 1 && (
          <>
            <p className="text-[12px] font-bold text-nuit">Votre logement</p>
            <Choice
              options={homes}
              value={home}
              onChange={setHome}
              className="mt-2"
              activeClassName="bg-(--d) text-(--p) ring-(--d)"
            />
            <label className="mt-3 block">
              <span className="flex justify-between text-[10px] font-semibold text-nuit/70">
                Surface <span>{area} m²</span>
              </span>
              <input
                type="range"
                min={20}
                max={250}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="mt-2 w-full accent-(--d)"
              />
            </label>
          </>
        )}
        {step === 2 && (
          <div className="grid gap-2.5 @min-[600px]:grid-cols-2">
            <Field label="Nom" placeholder="Votre nom" />
            <Field label="Téléphone" placeholder="06 XX XX XX XX" type="tel" />
            <Field label="Ville" defaultValue={project.city} />
            <Field label="E-mail" placeholder="vous@exemple.fr" type="email" />
          </div>
        )}
        {step === 3 && (
          <div className="grid gap-4 @min-[600px]:grid-cols-[1fr_1fr]">
            <div>
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-700">
                <Check className="size-4" /> Demande envoyée
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-nuit/65">
                Elle est arrivée dans le logiciel de l&apos;électricien, qui a préparé ce devis. Il
                vous l&apos;envoie après vérification.
              </p>
              <p className="mt-3 text-[9px] text-nuit/40">
                Démonstration : aucune donnée n&apos;est envoyée.
              </p>
            </div>
            <div className="rounded-xl bg-(--s) p-3">
              <p className="flex items-center gap-1 text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                <FileText className="size-3" /> Devis n° 2026-119 · {need}
              </p>
              <div className="mt-2 space-y-1 text-[10px] text-nuit/70">
                {lines.map(([l, v]) => (
                  <p key={String(l)} className="flex justify-between">
                    <span>{l}</span>
                    <span>{Number(v).toLocaleString("fr-FR")} €</span>
                  </p>
                ))}
              </div>
              <p className="mt-2 flex justify-between border-t border-nuit/10 pt-1.5 text-[12px] font-bold">
                <span>Total HT</span>
                <span>{total.toLocaleString("fr-FR")} €</span>
              </p>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          {step > 0 && step < 3 ? (
            <Btn tone="ghost" onClick={() => setStep(step - 1)}>
              Retour
            </Btn>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <Btn tone="dark" onClick={() => setStep(step + 1)}>
              {step === 2 ? "Envoyer ma demande" : "Continuer"} <ArrowRight className="size-3.5" />
            </Btn>
          ) : (
            <Btn tone="ghost" onClick={() => setStep(0)}>
              Nouvelle demande
            </Btn>
          )}
        </div>
      </Card>
    </SubPage>
  );
}

export function ElectricienSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={Zap}
      info={info}
      font="condensed"
      navStyle="caps"
      darkHeader
      cta={{ label: "Devis gratuit", page: "devis" }}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        { id: "services", label: "Services", path: "/services", render: () => <Services /> },
        {
          id: "realisations",
          label: "Réalisations",
          path: "/realisations",
          render: () => <Realisations />,
        },
        { id: "devis", label: "Devis", path: "/devis", render: () => <Devis /> },
      ]}
    />
  );
}
