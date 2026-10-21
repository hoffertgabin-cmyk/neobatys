"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Brush,
  Globe,
  MapPin,
  PaintRoller,
  Phone,
  Send,
  Sparkles,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  DemoForm,
  Eyebrow,
  Field,
  MiniFooter,
  MiniSite,
  Stars,
  scrollToSection,
  useMini,
  type SiteProps,
} from "./kit";

const swatches = [
  { n: "Lin", c: "#f5efe6" },
  { n: "Argile", c: "#e8d5c4" },
  { n: "Sauge", c: "#c7d2c0" },
  { n: "Brume", c: "#9fb4c7" },
  { n: "Ardoise", c: "#5b6b8c" },
  { n: "Orage", c: "#2f3e46" },
];

const sections = ["Prestations", "Nuancier", "Réalisations", "Avis", "Contact"] as const;
type Section = (typeof sections)[number];

/** Pièce dessinée dont le mur prend la couleur choisie. */
function Room({ wall }: { wall: string }) {
  return (
    <div
      className="relative h-40 overflow-hidden rounded-2xl ring-1 ring-nuit/10 transition-colors duration-500"
      style={{ backgroundColor: wall }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-10 bg-[#c8a27a]"
        style={{
          backgroundImage: "linear-gradient(90deg, rgb(0 0 0/0.08) 1px, transparent 1px)",
          backgroundSize: "40px 100%",
        }}
      />
      <span className="absolute top-6 left-8 h-16 w-12 rounded-sm bg-white/80 ring-4 ring-white" />
      <span className="absolute right-10 bottom-10 h-9 w-28 rounded-t-2xl bg-[#3f3f46]" />
      <span className="absolute right-6 bottom-10 h-14 w-4 rounded-t-full bg-[#3f3f46]" />
      <span className="absolute right-[8.5rem] bottom-10 h-14 w-4 rounded-t-full bg-[#3f3f46]" />
      <span className="absolute top-4 right-16 h-12 w-px bg-nuit/30" />
      <span className="absolute top-16 right-[3.6rem] size-4 rounded-full bg-amber-200 shadow-[0_0_20px_6px_rgb(253_230_138/0.6)]" />
    </div>
  );
}

function Home() {
  const { project } = useMini();
  const [active, setActive] = useState<Section>("Nuancier");
  const [color, setColor] = useState(swatches[3]);
  const rootRef = useRef<HTMLDivElement>(null);
  const goTo = (s: Section) => {
    setActive(s);
    scrollToSection(rootRef.current?.querySelector<HTMLElement>(`[data-section="${s}"]`) ?? null);
  };

  return (
    <div ref={rootRef}>
      <div className="sticky top-0 z-10 flex overflow-x-auto bg-white">
        {sections.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => goTo(t)}
            className={cn(
              "min-w-[90px] flex-1 border-b-2 py-2 text-center text-[10px] font-semibold transition-colors",
              active === t
                ? "border-(--p) text-(--p)"
                : "border-nuit/8 text-nuit/45 hover:text-nuit/70",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Hero + nuancier */}
      <section
        data-section="Nuancier"
        className="grid gap-5 px-4 pt-6 @min-[600px]:grid-cols-[1.1fr_1fr] @min-[600px]:px-8"
      >
        <div>
          <Eyebrow className="bg-(--s) text-(--p)">Peintre en bâtiment · {project.city}</Eyebrow>
          <p className="mt-3 font-display text-[30px] leading-[1.05] font-bold tracking-tight text-(--d)">
            Intérieur, extérieur,
            <br />
            <span className="bg-linear-to-r from-(--p) to-(--a) bg-clip-text text-transparent">
              finitions soignées
            </span>
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-nuit/60">
            Testez une teinte sur le mur ci-contre, puis demandez votre devis.
          </p>
          <p className="mt-4 text-[10px] font-semibold tracking-wide text-nuit/50 uppercase">
            Le nuancier de la saison
          </p>
          <div className="mt-2 flex gap-2">
            {swatches.map((s) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setColor(s)}
                aria-label={`Teinte ${s.n}`}
                aria-pressed={color.n === s.n}
                className={cn(
                  "h-14 flex-1 rounded-lg ring-1 ring-nuit/10 transition-transform hover:-translate-y-0.5",
                  color.n === s.n && "ring-2 ring-(--p) ring-offset-2",
                )}
                style={{ backgroundColor: s.c }}
              />
            ))}
          </div>
          <Btn onClick={() => goTo("Contact")} className="mt-4">
            Devis pour la teinte « {color.n} » <ArrowRight className="size-3.5" />
          </Btn>
        </div>
        <div>
          <Room wall={color.c} />
          <p className="mt-2 text-center text-[10px] text-nuit/50">
            Aperçu : salon en teinte <span className="font-semibold text-nuit/75">{color.n}</span>
          </p>
        </div>
      </section>

      <section data-section="Prestations" className="px-4 pt-8 @min-[600px]:px-8">
        <p className="font-display text-[18px] font-bold text-(--d)">Prestations</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5 @min-[600px]:grid-cols-4">
          {[
            { I: PaintRoller, t: "Peinture intérieure" },
            { I: Sun, t: "Ravalement extérieur" },
            { I: Brush, t: "Papier peint" },
            { I: Sparkles, t: "Enduits décoratifs" },
          ].map(({ I, t }) => (
            <Card key={t} className="p-3">
              <span className="grid size-8 place-items-center rounded-lg bg-(--s) text-(--p)">
                <I className="size-4" />
              </span>
              <p className="mt-2 text-[11px] font-bold text-nuit">{t}</p>
            </Card>
          ))}
        </div>
      </section>

      <section data-section="Réalisations" className="px-4 pt-8 @min-[600px]:px-8">
        <p className="font-display text-[18px] font-bold text-(--d)">Réalisations (exemples)</p>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {[
            ["Chambre · Woippy", "#e8d5c4", "#c7d2c0"],
            ["Cuisine · Maizières", "#f5efe6", "#9fb4c7"],
            ["Façade · Saint-Julien", "#d6d3d1", "#f5efe6"],
          ].map(([t, a, b]) => (
            <div key={t} className="overflow-hidden rounded-xl ring-1 ring-nuit/8">
              <div className="flex h-16">
                <span className="flex-1" style={{ backgroundColor: a }} />
                <span className="flex-1" style={{ backgroundColor: b }} />
              </div>
              <p className="bg-white px-2 py-1.5 text-[10px] font-semibold text-nuit">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        data-section="Avis"
        className="grid gap-3 px-4 pt-8 @min-[600px]:grid-cols-[1fr_1.1fr] @min-[600px]:px-8"
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_-16px_rgb(46_16_101/0.35)] ring-1 ring-nuit/8">
          <div
            className="relative h-20 bg-[#e8eef3]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(255 255 255/0.9) 2px, transparent 2px), linear-gradient(rgb(255 255 255/0.9) 2px, transparent 2px)",
              backgroundSize: "34px 34px",
            }}
          >
            <span className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--p) text-white shadow-lg">
              <PaintRoller className="size-4" />
            </span>
          </div>
          <div className="p-3.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold text-nuit/50">
              <Globe className="size-3" /> Fiche Google Business
            </p>
            <p className="mt-1 text-[14px] font-bold text-nuit">{project.brand}</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="text-[11px] font-semibold">4,9</span>
              <Stars />
            </div>
            <p className="mt-0.5 text-[10px] text-nuit/55">
              Peintre en bâtiment · {project.city} · Ouvert
            </p>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {[
                { I: MapPin, t: "Itinéraire" },
                { I: Phone, t: "Appeler" },
                { I: Globe, t: "Site web" },
              ].map(({ I, t }) => (
                <span
                  key={t}
                  className="flex flex-col items-center gap-1 rounded-lg bg-(--s) py-1.5 text-[9px] font-semibold text-(--p)"
                >
                  <I className="size-3.5" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            ["C. T.", "Travail soigné, chantier laissé impeccable."],
            ["J. B.", "De très bons conseils sur les couleurs, rendu superbe."],
            ["N. F.", "Façade refaite en une semaine, équipe agréable."],
          ].map(([n, t]) => (
            <Card key={n} className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-nuit">{n}</span>
                <Stars />
              </div>
              <p className="mt-1 text-[11px] text-nuit/65">« {t} »</p>
            </Card>
          ))}
          <p className="text-[9px] text-nuit/40">Avis d&apos;exemple</p>
        </div>
      </section>

      <section data-section="Contact" className="px-4 pt-8 @min-[600px]:px-8">
        <Card>
          <p className="text-[14px] font-bold text-nuit">Devis gratuit</p>
          <DemoForm
            key={color.n}
            submitLabel={
              <>
                <Send className="size-3.5" /> Envoyer
              </>
            }
            success={{
              title: "Demande envoyée",
              text: `Teinte choisie : ${color.n}. On vous rappelle pour une visite.`,
            }}
            className="mt-2 min-h-[200px]"
          >
            <div className="grid gap-2.5 @min-[600px]:grid-cols-3">
              <Field label="Nom" placeholder="Votre nom" />
              <Field label="Téléphone" placeholder="06 XX XX XX XX" type="tel" />
              <Field label="Teinte" defaultValue={color.n} />
            </div>
            <div className="mt-2.5">
              <Field label="Pièces à peindre" placeholder="Ex. : salon 25 m² et couloir" />
            </div>
          </DemoForm>
        </Card>
      </section>
      <MiniFooter />
    </div>
  );
}

export function PeintreSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={PaintRoller}
      pages={[{ id: "home", label: "Accueil", path: "/", render: () => <Home /> }]}
    />
  );
}
