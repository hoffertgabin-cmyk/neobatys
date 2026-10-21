"use client";

import { useState } from "react";
import {
  Bath,
  ChevronDown,
  Droplets,
  MapPin,
  Phone,
  Send,
  Siren,
  Thermometer,
  Wrench,
} from "lucide-react";
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
  Stars,
  SubPage,
  useMini,
  type SiteProps,
} from "./kit";

const problems = ["Fuite", "WC bouché", "Chauffe-eau", "Autre"] as const;

function UrgentForm({ compact = false }: { compact?: boolean }) {
  const [kind, setKind] = useState<(typeof problems)[number]>("Fuite");
  return (
    <DemoForm
      submitLabel={
        <>
          <Send className="size-3.5" /> Envoyer la demande
        </>
      }
      success={{
        title: "Demande envoyée",
        text: `Problème : ${kind.toLowerCase()}. Un plombier vous rappelle dans les 15 minutes.`,
      }}
      className={cn(compact ? "min-h-[250px]" : "min-h-[300px]")}
    >
      <p className="text-[10px] font-semibold text-nuit/70">Type de problème</p>
      <Choice options={problems} value={kind} onChange={setKind} className="mt-1.5" />
      <div className="mt-3 space-y-2.5">
        <Field label="Adresse" placeholder="12 rue des Jardins, Thionville" />
        <Field label="Téléphone" placeholder="06 XX XX XX XX" type="tel" />
      </div>
    </DemoForm>
  );
}

function Home() {
  const { project } = useMini();
  return (
    <>
      <div className="flex items-center justify-center gap-2 bg-(--d) px-4 py-2 text-center text-[11px] font-medium text-white">
        <Siren className="size-3.5 shrink-0 text-(--a)" />
        Fuite, panne d&apos;eau chaude ? Intervention sous 2 h, 7j/7
      </div>
      <div className="grid gap-6 bg-(--s) px-4 pt-6 pb-5 @min-[600px]:grid-cols-[1.15fr_1fr] @min-[600px]:px-8">
        <div>
          <Eyebrow className="bg-white text-(--p) ring-1 ring-(--p)/15">
            <MapPin className="size-3" /> Plombier à {project.city} et alentours
          </Eyebrow>
          <p className="mt-4 font-display text-[34px] leading-[1.05] font-bold tracking-tight text-(--d)">
            Une fuite ?
            <br />
            On arrive vite.
          </p>
          <p className="mt-3 max-w-[300px] text-[12px] leading-relaxed text-nuit/65">
            Dépannage, rénovation de salle de bain et chauffe-eau. Devis clair avant toute
            intervention.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Btn to="depannage">
              <Siren className="size-3.5" /> Dépannage urgent
            </Btn>
            <Btn tone="light" to="urgence">
              <Phone className="size-3.5" /> 03 82 XX XX XX
            </Btn>
          </div>
          <Btn tone="ghost" to="avis" className="mt-5 bg-transparent px-0 hover:bg-transparent">
            <Stars />
            <span className="text-[11px] font-semibold text-nuit">4,9/5</span>
            <span className="text-[10px] font-normal text-nuit/55">· Voir les avis</span>
          </Btn>
        </div>
        <Card className="shadow-[0_20px_40px_-16px_rgb(3_105_161/0.35)]">
          <p className="mb-3 flex items-center gap-1.5 text-[13px] font-bold text-(--d)">
            <Droplets className="size-4 text-(--p)" /> Demande de dépannage
          </p>
          <UrgentForm compact />
        </Card>
      </div>
      <div className="grid gap-3 px-4 py-4 @min-[600px]:grid-cols-3 @min-[600px]:px-8">
        {[
          { I: Droplets, t: "Dépannage", d: "Fuites, canalisations", to: "depannage" },
          { I: Bath, t: "Salle de bain", d: "Rénovation complète", to: "sdb" },
          { I: Thermometer, t: "Chauffe-eau", d: "Pose et entretien", to: "depannage" },
        ].map(({ I, t, d, to }) => (
          <Btn
            key={t}
            to={to}
            tone="light"
            className="justify-start gap-3 rounded-xl p-3 text-left ring-nuit/8"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-(--s) text-(--p)">
              <I className="size-4.5" />
            </span>
            <span>
              <span className="block text-[12px] font-bold text-nuit">{t}</span>
              <span className="block text-[10px] font-normal text-nuit/55">{d}</span>
            </span>
          </Btn>
        ))}
      </div>
      <MiniFooter />
    </>
  );
}

const urgencies = [
  {
    t: "Fuite d'eau",
    d: "Sous 2 h",
    tips: [
      "Coupez l'arrivée d'eau au compteur",
      "Coupez l'électricité si l'eau approche des prises",
      "Épongez et prenez une photo pour l'assurance",
    ],
  },
  {
    t: "WC ou évier bouché",
    d: "Dans la journée",
    tips: [
      "N'utilisez plus l'évacuation",
      "Évitez les produits chimiques agressifs",
      "Notez depuis quand le problème dure",
    ],
  },
  {
    t: "Plus d'eau chaude",
    d: "Sous 24 h",
    tips: [
      "Vérifiez le disjoncteur du chauffe-eau",
      "Relevez la marque et le modèle",
      "Regardez s'il y a une fuite sous la cuve",
    ],
  },
  {
    t: "Canalisation qui goutte",
    d: "Sous 48 h",
    tips: [
      "Placez un récipient dessous",
      "Serrez légèrement le raccord à la main",
      "Prenez une photo du raccord",
    ],
  },
];

function Depannage() {
  const [open, setOpen] = useState(0);
  return (
    <SubPage
      eyebrow="Dépannage 7j/7"
      title="Que faire en attendant le plombier ?"
      intro="Choisissez votre problème : on vous dit quoi faire tout de suite et sous quel délai on intervient."
    >
      <div className="space-y-2">
        {urgencies.map((u, i) => (
          <div key={u.t} className="overflow-hidden rounded-xl bg-white ring-1 ring-nuit/8">
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="text-[12px] font-bold text-nuit">{u.t}</span>
              <span className="flex items-center gap-2">
                <span className="rounded-full bg-(--s) px-2 py-0.5 text-[10px] font-semibold text-(--p)">
                  {u.d}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 text-nuit/40 transition-transform",
                    open === i && "rotate-180",
                  )}
                />
              </span>
            </button>
            {open === i && (
              <div className="border-t border-nuit/6 px-4 py-3">
                <ol className="space-y-1.5">
                  {u.tips.map((tip, k) => (
                    <li key={tip} className="flex gap-2 text-[11px] text-nuit/75">
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-(--p) text-[9px] font-bold text-(--op)">
                        {k + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ol>
                <Btn to="urgence" className="mt-3">
                  <Siren className="size-3.5" /> Demander une intervention
                </Btn>
              </div>
            )}
          </div>
        ))}
      </div>
    </SubPage>
  );
}

const layouts = ["Douche à l'italienne", "Baignoire", "Accessible PMR"] as const;
const styles = ["Moderne", "Nature", "Classique"] as const;

function SalleDeBain() {
  const [layout, setLayout] = useState<(typeof layouts)[number]>("Douche à l'italienne");
  const [style, setStyle] = useState<(typeof styles)[number]>("Moderne");
  const [area, setArea] = useState(6);
  const wall = { Moderne: "#dbe4ea", Nature: "#e8dfcf", Classique: "#f1ece4" }[style];
  return (
    <SubPage
      eyebrow="Rénovation de salle de bain"
      title="Imaginez votre future salle de bain"
      intro="Composez votre projet en trois choix, on vous rappelle avec une proposition."
    >
      <div className="grid gap-4 @min-[600px]:grid-cols-[1fr_1fr]">
        <Card className="space-y-3">
          <div>
            <p className="text-[10px] font-semibold text-nuit/70">Aménagement</p>
            <Choice options={layouts} value={layout} onChange={setLayout} className="mt-1.5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-nuit/70">Style</p>
            <Choice options={styles} value={style} onChange={setStyle} className="mt-1.5" />
          </div>
          <label className="block">
            <span className="flex justify-between text-[10px] font-semibold text-nuit/70">
              Surface <span className="text-(--p)">{area} m²</span>
            </span>
            <input
              type="range"
              min={3}
              max={15}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-2 w-full accent-(--p)"
            />
          </label>
        </Card>
        <Card className="flex flex-col p-0">
          <div
            className="relative h-36 overflow-hidden rounded-t-2xl"
            style={{ backgroundColor: wall }}
          >
            <div
              className="absolute inset-x-0 bottom-0 h-10"
              style={{
                backgroundColor: style === "Nature" ? "#b89a74" : "#9aa7b1",
                backgroundImage:
                  "linear-gradient(90deg, rgb(255 255 255/0.5) 1px, transparent 1px)",
                backgroundSize: "22px 100%",
              }}
            />
            {layout === "Baignoire" ? (
              <span className="absolute bottom-6 left-6 h-12 w-36 rounded-t-md rounded-b-3xl bg-white shadow-md" />
            ) : (
              <>
                <span className="absolute top-4 bottom-10 left-8 w-24 rounded-t-md bg-white/50 ring-2 ring-white" />
                <span className="absolute top-4 left-[4.5rem] h-6 w-1 rounded-full bg-nuit/40" />
              </>
            )}
            {layout === "Accessible PMR" && (
              <span className="absolute top-10 right-8 h-1.5 w-16 rounded-full bg-nuit/50" />
            )}
            <span className="absolute right-8 bottom-10 h-14 w-16 rounded-t-lg bg-white shadow-md" />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <p className="text-[10px] font-semibold tracking-wide text-nuit/50 uppercase">
              Votre projet
            </p>
            <p className="mt-1 text-[13px] font-bold text-nuit">
              {layout} · style {style.toLowerCase()} · {area} m²
            </p>
            <p className="mt-1 text-[11px] text-nuit/60">
              Délai indicatif : {area > 8 ? "2 semaines" : "8 à 10 jours"} de travaux
            </p>
            <Btn to="urgence" className="mt-auto self-start">
              Demander une proposition
            </Btn>
          </div>
        </Card>
      </div>
    </SubPage>
  );
}

const reviews = [
  {
    n: "A. M.",
    c: "Yutz",
    s: 5,
    t: "Intervenu un dimanche pour une fuite, rapide et très propre.",
  },
  {
    n: "S. K.",
    c: "Thionville",
    s: 5,
    t: "Salle de bain refaite en 10 jours, devis respecté au centime.",
  },
  { n: "P. L.", c: "Hayange", s: 4, t: "Bon contact, explications claires sur le chauffe-eau." },
  { n: "M. R.", c: "Florange", s: 5, t: "Disponible et de bon conseil, je recommande." },
];

function Avis() {
  const [filter, setFilter] = useState<"Tous" | "5 étoiles" | "4 étoiles">("Tous");
  const [mine, setMine] = useState(0);
  const shown = reviews.filter((r) => filter === "Tous" || r.s === Number(filter[0]));
  return (
    <SubPage eyebrow="Avis clients (exemples)" title="Ils nous ont fait confiance">
      <div className="grid gap-4 @min-[600px]:grid-cols-[1.3fr_1fr]">
        <div>
          <Choice
            options={["Tous", "5 étoiles", "4 étoiles"] as const}
            value={filter}
            onChange={setFilter}
          />
          <div className="mt-3 space-y-2">
            {shown.map((r) => (
              <Card key={r.n} className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-nuit">
                    {r.n} · <span className="font-normal text-nuit/55">{r.c}</span>
                  </span>
                  <Stars value={r.s} />
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-nuit/70">« {r.t} »</p>
              </Card>
            ))}
          </div>
        </div>
        <Card>
          <p className="text-[13px] font-bold text-nuit">Laisser un avis</p>
          <DemoForm
            submitLabel="Publier mon avis"
            success={{
              title: "Merci pour votre avis !",
              text: "Il apparaîtra après vérification.",
            }}
            className="mt-2 min-h-[200px]"
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                  onClick={() => setMine(n)}
                  className={cn(
                    "text-[22px] leading-none",
                    n <= mine ? "text-amber-400" : "text-nuit/15",
                  )}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="mt-2">
              <Field label="Votre message" textarea placeholder="Racontez votre expérience" />
            </div>
          </DemoForm>
        </Card>
      </div>
    </SubPage>
  );
}

function Urgence() {
  return (
    <SubPage
      eyebrow="Urgence 7j/7"
      title="Un plombier chez vous sous 2 h"
      intro="Appelez-nous ou laissez votre demande : on vous rappelle dans les 15 minutes."
    >
      <div className="grid gap-4 @min-[600px]:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl bg-(--d) p-5 text-white">
          <Phone className="size-6 text-(--a)" />
          <p className="mt-3 text-[11px] text-white/60">Ligne d&apos;urgence</p>
          <p className="font-display text-[24px] font-bold">03 82 XX XX XX</p>
          <ul className="mt-4 space-y-1.5 text-[11px] text-white/80">
            <li>• Thionville et 30 km autour</li>
            <li>• Devis annoncé avant intervention</li>
            <li>• Paiement sur place ou en ligne</li>
          </ul>
        </div>
        <Card>
          <UrgentForm />
        </Card>
      </div>
    </SubPage>
  );
}

export function PlombierSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={Wrench}
      cta={{ label: "Urgence 7j/7", page: "urgence" }}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        { id: "depannage", label: "Dépannage", path: "/depannage", render: () => <Depannage /> },
        {
          id: "sdb",
          label: "Salle de bain",
          path: "/salle-de-bain",
          render: () => <SalleDeBain />,
        },
        { id: "avis", label: "Avis", path: "/avis", render: () => <Avis /> },
        {
          id: "urgence",
          label: "Urgence",
          path: "/urgence",
          render: () => <Urgence />,
          inNav: false,
        },
      ]}
    />
  );
}
