"use client";

import { useState } from "react";
import { ArrowRight, BrickWall, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  Choice,
  DemoForm,
  Eyebrow,
  Field,
  MiniFooter,
  MiniSite,
  SubPage,
  Title,
  useMini,
  type SiteProps,
} from "./kit";

/** Appareillage de briques décalées, joints de la couleur donnée. */
const bricks = (joint: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='28'><path d='M0 .5H56M0 14.5H56M.5 0V14M28.5 14V28' stroke='${joint}' stroke-width='2' fill='none'/></svg>`,
  )}")`;

const chantiers = [
  {
    id: "facade",
    t: "Ravalement de façade",
    k: "Façades",
    c: "Pont-à-Mousson",
    before: "#a8a29e",
    after: "#e3c9a8",
  },
  {
    id: "muret",
    t: "Muret en pierre",
    k: "Murets",
    c: "Dieulouard",
    before: "#9c958e",
    after: "#d6c7b2",
  },
  {
    id: "terrasse",
    t: "Terrasse béton désactivé",
    k: "Terrasses",
    c: "Pagny-sur-Moselle",
    before: "#8f8a84",
    after: "#d9d2c5",
  },
  {
    id: "extension",
    t: "Extension 20 m²",
    k: "Extensions",
    c: "Blénod-lès-PàM",
    before: "#b3ada6",
    after: "#eadcc8",
  },
] as const;

type Chantier = (typeof chantiers)[number];

function Compare({ c, tall = false }: { c: Chantier; tall?: boolean }) {
  const [pos, setPos] = useState(50);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl ring-1 ring-nuit/10",
        tall ? "h-[260px]" : "h-[220px]",
      )}
    >
      {/* Après (dessous) */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: c.after, backgroundImage: bricks("rgba(255,255,255,0.85)") }}
      >
        <div className="absolute inset-x-0 bottom-0 h-10 bg-(--p)/80" />
        <span className="absolute top-3 right-3 rounded-md bg-(--d) px-2 py-0.5 text-[10px] font-bold text-white">
          Après
        </span>
      </div>
      {/* Avant (dessus, rogné) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: c.before,
          backgroundImage: bricks("rgba(0,0,0,0.14)"),
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      >
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 660 230"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M60 20 L80 70 L68 110 L95 160 L84 230" stroke="#57534e" strokeWidth="2.5" />
          <path d="M260 0 L250 50 L272 90" stroke="#57534e" strokeWidth="2" />
          <path d="M430 60 L445 120 L425 170" stroke="#57534e" strokeWidth="2" />
          <rect x="140" y="120" width="70" height="40" fill="#78716c" opacity="0.5" />
          <rect x="520" y="40" width="60" height="30" fill="#78716c" opacity="0.4" />
        </svg>
        <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-nuit">
          Avant
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white"
        style={{ left: `${pos}%` }}
      />
      <span
        className="pointer-events-none absolute top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[14px] font-bold text-(--d) shadow-lg"
        style={{ left: `${pos}%` }}
      >
        ⇆
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
      <div className="bg-(--s) px-4 pt-5 pb-5 @min-[600px]:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Eyebrow className="bg-white text-(--p) ring-1 ring-nuit/10">
              Maçonnerie et rénovation · {project.city}
            </Eyebrow>
            <Title className="mt-3">Nos chantiers, avant et après</Title>
          </div>
          <Choice
            options={["Façades", "Murets", "Terrasses", "Extensions"] as const}
            value={k}
            onChange={setK}
            activeClassName="bg-(--d) text-white ring-(--d)"
          />
        </div>
        <p className="mt-2 text-[11px] text-nuit/55">Faites glisser le curseur pour comparer.</p>
        <div className="mt-3">
          <Compare key={c.id} c={c} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 @min-[600px]:grid-cols-4">
          {chantiers.map((x) => (
            <Btn
              key={x.id}
              to="galerie"
              param={x.id}
              tone="light"
              className="flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left ring-nuit/8"
            >
              <span
                className="block h-14"
                style={{
                  backgroundColor: x.after,
                  backgroundImage: bricks("rgba(255,255,255,0.7)"),
                }}
              />
              <span className="block px-2.5 py-2 text-[10px] font-semibold text-nuit">{x.t}</span>
            </Btn>
          ))}
        </div>
      </div>
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
    <SubPage eyebrow="Galerie (exemples)" title="Avant / après">
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
            <span
              className="block h-12"
              style={{ backgroundColor: x.after, backgroundImage: bricks("rgba(255,255,255,0.7)") }}
            />
            <span className="block px-2.5 py-1.5 text-[10px] font-semibold text-nuit">{x.t}</span>
            <span className="block px-2.5 pb-2 text-[9px] text-nuit/50">{x.c}</span>
          </button>
        ))}
      </div>
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
