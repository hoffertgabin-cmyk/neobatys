"use client";

import { useState } from "react";
import { Bath, Calculator, Grid3x3, Home as HomeIcon, Layers, Send, Sun } from "lucide-react";
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
  useMini,
  type SiteProps,
} from "./kit";

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

/** Calepinage dessiné selon le motif. */
function Pattern({ motif, className }: { motif: Motif; className?: string }) {
  const line = "rgb(255 255 255 / 0.55)";
  const style =
    motif === "Droit"
      ? {
          backgroundImage: `linear-gradient(90deg, ${line} 2px, transparent 2px), linear-gradient(${line} 2px, transparent 2px)`,
          backgroundSize: "44px 44px",
        }
      : motif === "Diagonale"
        ? {
            backgroundImage: `repeating-linear-gradient(45deg, ${line} 0 2px, transparent 2px 32px), repeating-linear-gradient(-45deg, ${line} 0 2px, transparent 2px 32px)`,
          }
        : {
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='22'><path d='M0 21 L20 1 L40 21 M20 1 V22' stroke='rgba(255,255,255,0.6)' stroke-width='2' fill='none'/></svg>",
            )}")`,
            backgroundSize: "40px 22px",
          };
  return (
    <div className={cn("relative overflow-hidden bg-linear-to-br from-(--p) to-(--d)", className)}>
      <div className="absolute inset-0" style={style} />
    </div>
  );
}

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
      <div className="grid @min-[600px]:grid-cols-[1fr_1.05fr]">
        <div className="relative min-h-[220px] overflow-hidden">
          <Pattern motif={motif} className="absolute inset-0" />
          <div className="relative m-4 rounded-2xl bg-(--d)/90 p-4 text-white @min-[600px]:m-6 @min-[600px]:p-5">
            <Eyebrow className="bg-white/10 text-(--a)">Carreleur · {project.city}</Eyebrow>
            <p className="mt-3 font-display text-[24px] leading-[1.08] font-bold @min-[600px]:text-[26px]">
              Sols et murs,
              <br />
              posés au millimètre
            </p>
            <p className="mt-2 text-[11px] text-white/65">
              Pose « {motif.toLowerCase()} » affichée. Changez-la :
            </p>
            <Choice
              options={motifs}
              value={motif}
              onChange={setMotif}
              className="mt-2"
              itemClassName="px-2.5 py-1 text-[10px]"
              inactiveClassName="bg-white/10 text-white/80 ring-white/15 hover:text-white"
              activeClassName="bg-(--a) text-(--d) ring-(--a)"
            />
          </div>
        </div>
        <div className="bg-(--s) p-4 @min-[600px]:p-6">
          <Simulator motif={motif} setMotif={setMotif} />
        </div>
      </div>
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
  { t: "Douche à l'italienne", c: "Amnéville", k: "Salle de bain", m: "Droit" as Motif },
  { t: "Séjour 45 m² grand format", c: "Hagondange", k: "Pièces de vie", m: "Droit" as Motif },
  { t: "Terrasse 30 m²", c: "Rombas", k: "Terrasses", m: "Diagonale" as Motif },
  { t: "Entrée en chevron", c: "Talange", k: "Pièces de vie", m: "Chevron" as Motif },
  { t: "Crédence de cuisine", c: "Mondelange", k: "Rénovation", m: "Chevron" as Motif },
  { t: "Salle d'eau", c: "Moyeuvre-Grande", k: "Salle de bain", m: "Diagonale" as Motif },
];
const filtres = ["Tout", "Salle de bain", "Pièces de vie", "Terrasses", "Rénovation"] as const;

function Galerie() {
  const [f, setF] = useState<(typeof filtres)[number]>("Tout");
  const list = realisations.filter((r) => f === "Tout" || r.k === f);
  return (
    <SubPage eyebrow="Galerie (exemples)" title="Chantiers récents">
      <Choice options={filtres} value={f} onChange={setF} />
      <div className="mt-3 grid grid-cols-2 gap-2.5 @min-[600px]:grid-cols-3">
        {list.map((r) => (
          <div key={r.t} className="overflow-hidden rounded-xl bg-white ring-1 ring-nuit/8">
            <Pattern motif={r.m} className="h-20" />
            <p className="px-2.5 pt-2 text-[11px] font-bold text-nuit">{r.t}</p>
            <p className="px-2.5 pb-2 text-[10px] text-nuit/50">
              {r.c} · pose {r.m.toLowerCase()}
            </p>
          </div>
        ))}
      </div>
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
