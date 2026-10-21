"use client";

import { useState } from "react";
import { ArrowRight, Check, FileText, Lightbulb, Plug, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  Choice,
  Eyebrow,
  Field,
  MiniFooter,
  MiniSite,
  SubPage,
  useMini,
  type SiteProps,
} from "./kit";

const grid = {
  backgroundImage:
    "linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

function Home() {
  const { project } = useMini();
  return (
    <>
      <div className="relative overflow-hidden bg-(--d) px-4 pt-8 pb-8 text-white @min-[600px]:px-8 @min-[600px]:pt-10 @min-[600px]:pb-10">
        <div className="absolute inset-0 opacity-[0.07]" style={grid} />
        <div className="absolute -top-20 -right-10 size-64 rounded-full bg-(--p)/25 blur-3xl" />
        <div className="relative grid items-center gap-6 @min-[600px]:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow className="bg-(--p)/15 text-(--p)">
              <Zap className="size-3" /> Électricien à {project.city}
            </Eyebrow>
            <p className="mt-4 font-display text-[30px] leading-[1.08] font-bold tracking-tight">
              Du dépannage à la <span className="text-(--p)">rénovation complète</span>
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-white/65">
              Mise aux normes, tableau électrique, bornes de recharge et domotique.
            </p>
            <Btn to="devis" className="mt-5">
              Demander un devis <ArrowRight className="size-3.5" />
            </Btn>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex-1 rounded-xl bg-white p-3 text-nuit">
              <p className="text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                Formulaire du site
              </p>
              <p className="mt-1.5 text-[11px] font-bold">Mise aux normes du tableau</p>
              <p className="mt-1 text-[10px] text-nuit/60">Maison 110 m² · {project.city}</p>
              <p className="mt-2.5 rounded-md bg-(--s) px-2 py-1.5 text-[10px] text-nuit/70">
                « Disjoncteur qui saute souvent »
              </p>
            </div>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--p) text-(--op)">
              <ArrowRight className="size-4" />
            </span>
            <div className="flex-1 rounded-xl bg-white p-3 text-nuit">
              <p className="flex items-center gap-1 text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                <FileText className="size-3" /> Logiciel
              </p>
              <p className="mt-1.5 text-[11px] font-bold">Devis n° 2026-118</p>
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
      </div>
      <div className="grid gap-3 px-4 py-5 @min-[600px]:grid-cols-3 @min-[600px]:px-8">
        {services.map(({ I, t }, i) => (
          <Btn
            key={t}
            to="services"
            param={String(i)}
            tone="ghost"
            className="justify-start gap-2.5 rounded-xl p-3 ring-1 ring-(--p)/30"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-(--d) text-(--p)">
              <I className="size-4" />
            </span>
            <span className="text-[12px] font-bold text-nuit">{t}</span>
          </Btn>
        ))}
      </div>
      <p className="mx-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-[11px] font-semibold text-emerald-800 @min-[600px]:mx-8">
        <Check className="size-3.5 shrink-0" /> Chaque demande du site arrive directement dans le
        logiciel de devis
      </p>
      <MiniFooter />
    </>
  );
}

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
    <SubPage eyebrow="Nos services" title="Ce qu'on fait pour vous">
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
  { t: "Tableau neuf, maison de 1975", k: "Rénovation", c: "Montigny-lès-Metz" },
  { t: "Borne 7 kW en garage", k: "Borne", c: "Marly" },
  { t: "Volets et chauffage connectés", k: "Domotique", c: "Moulins-lès-Metz" },
  { t: "Mise aux normes d'un local", k: "Rénovation", c: "Metz" },
  { t: "2 bornes en copropriété", k: "Borne", c: "Ars-sur-Moselle" },
  { t: "Éclairage LED extérieur", k: "Domotique", c: "Augny" },
] as const;

function Realisations() {
  const [k, setK] = useState<"Tout" | "Rénovation" | "Borne" | "Domotique">("Tout");
  const list = works.filter((w) => k === "Tout" || w.k === k);
  return (
    <SubPage eyebrow="Réalisations (exemples)" title="Chantiers récents">
      <Choice
        options={["Tout", "Rénovation", "Borne", "Domotique"] as const}
        value={k}
        onChange={setK}
        activeClassName="bg-(--d) text-(--p) ring-(--d)"
      />
      <div className="mt-3 grid grid-cols-2 gap-3 @min-[600px]:grid-cols-3">
        {list.map((w) => (
          <div key={w.t} className="overflow-hidden rounded-xl bg-white ring-1 ring-nuit/8">
            <div className="relative h-16 bg-(--d)">
              <div className="absolute inset-0 opacity-10" style={grid} />
              <span className="absolute top-2 left-2 rounded bg-(--p) px-1.5 py-0.5 text-[9px] font-bold text-(--op)">
                {w.k}
              </span>
            </div>
            <div className="p-2.5">
              <p className="text-[11px] leading-snug font-bold text-nuit">{w.t}</p>
              <p className="mt-0.5 text-[10px] text-nuit/50">{w.c}</p>
            </div>
          </div>
        ))}
      </div>
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
