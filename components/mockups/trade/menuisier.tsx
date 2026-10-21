"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Hammer, Ruler, Send } from "lucide-react";
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

function Home() {
  const { project } = useMini();
  return (
    <>
      <div className="bg-(--s) px-4 pt-5 pb-5 @min-[600px]:px-8">
        <div className="grid items-end gap-3 @min-[600px]:grid-cols-[1fr_auto] @min-[600px]:gap-6">
          <div>
            <Eyebrow className="bg-(--p)/10 text-(--p)">
              Atelier de menuiserie · {project.city}
            </Eyebrow>
            <p className="mt-3 font-display text-[27px] leading-[1.05] font-bold tracking-tight text-(--d)">
              Sur mesure, de l&apos;atelier à chez vous
            </p>
          </div>
          <p className="max-w-[190px] text-[11px] leading-relaxed text-nuit/60 @min-[600px]:text-right">
            Bois massif, finitions à la main, pose comprise.
          </p>
        </div>
        <div className="mt-4">
          <Grid />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-(--d) px-4 py-2.5 text-white">
          <span className="text-[12px] font-semibold">Un projet sur mesure ? Parlons-en.</span>
          <Btn to="contact" className="bg-(--a) py-1.5 text-(--d)">
            Demander un devis
          </Btn>
        </div>
      </div>
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
