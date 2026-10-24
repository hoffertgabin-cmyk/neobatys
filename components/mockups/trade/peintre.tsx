"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Brush,
  CalendarCheck,
  Globe,
  Leaf,
  MapPin,
  PaintRoller,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  DemoForm,
  Field,
  MiniFooter,
  MiniSite,
  Stars,
  scrollToSection,
  useMini,
  type SiteInfo,
  type SiteProps,
} from "./kit";
import { GoogleG, Photo, Section, SectionHead, TrustStrip, ZoneMap } from "./blocks";
import { HouseScene, LivingScene } from "./scenes";

const swatches = [
  { n: "Lin", c: "#f5efe6" },
  { n: "Argile", c: "#e8d5c4" },
  { n: "Sauge", c: "#c7d2c0" },
  { n: "Brume", c: "#9fb4c7" },
  { n: "Ardoise", c: "#5b6b8c" },
  { n: "Orage", c: "#2f3e46" },
];

const sections = ["Accueil", "Prestations", "Réalisations", "Avis", "Contact"] as const;
type Anchor = (typeof sections)[number];

const info: SiteInfo = {
  baseline: "Peinture · Décoration · Façades",
  phone: "06 39 98 14 52",
  email: "bonjour@exemple-peinture-woippy.fr",
  address: "21 route de Thionville, 57140 Woippy",
  hours: "Lun–ven 8h–18h · Devis le samedi matin",
  zone: "Metz Nord, Woippy, Maizières",
  about:
    "Peintres en bâtiment depuis 2012 : intérieurs, façades, papiers peints et enduits décoratifs. Conseil couleur offert à chaque devis.",
  labels: ["Qualibat", "Garantie décennale", "Peintures Ecolabel"],
  links: [
    { label: "Peinture intérieure", page: "home" },
    { label: "Ravalement extérieur", page: "home" },
    { label: "Papier peint", page: "home" },
    { label: "Enduits décoratifs", page: "home" },
  ],
  rating: { value: "4,9", count: 64 },
};

const services = [
  {
    I: PaintRoller,
    t: "Peinture intérieure",
    d: "Murs, plafonds, boiseries. Protection complète des sols et meubles.",
    v: <LivingScene wall="#c7d2c0" />,
  },
  {
    I: Sun,
    t: "Façades",
    d: "Nettoyage, traitement anti-mousse, peinture pliolite ou siloxane.",
    v: <HouseScene facade="#f1e4d0" roof="#6b4c3b" scaffold />,
  },
  {
    I: Brush,
    t: "Papier peint",
    d: "Pose de papiers intissés, panoramiques et toiles de verre.",
    v: <LivingScene wall="#e8d5c4" />,
  },
  {
    I: Sparkles,
    t: "Enduits décoratifs",
    d: "Béton ciré, tadelakt, chaux : des murs à la texture unique.",
    v: <LivingScene wall="#b9ab9a" />,
  },
];

function Home() {
  const { project } = useMini();
  const [active, setActive] = useState<Anchor>("Accueil");
  const [color, setColor] = useState(swatches[2]);
  const rootRef = useRef<HTMLDivElement>(null);
  const goTo = (s: Anchor) => {
    setActive(s);
    scrollToSection(rootRef.current?.querySelector<HTMLElement>(`[data-section="${s}"]`) ?? null);
  };

  return (
    <div ref={rootRef}>
      <div className="sticky top-0 z-10 flex justify-center gap-1 overflow-x-auto border-b border-nuit/8 bg-white/95 px-4 backdrop-blur">
        {sections.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => goTo(t)}
            className={cn(
              "shrink-0 border-b-2 px-3 py-2.5 text-[10.5px] font-semibold transition-colors",
              active === t
                ? "border-(--p) text-(--p)"
                : "border-transparent text-nuit/50 hover:text-nuit/80",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Hero : le mur du visuel prend la teinte choisie */}
      <section data-section="Accueil" className="relative h-[350px] overflow-hidden">
        <LivingScene className="absolute inset-0" wall={color.c} ladder />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="relative flex h-full max-w-[350px] flex-col justify-center px-4 @min-[600px]:px-8">
          <p className="text-[10px] font-bold tracking-[0.16em] text-(--p) uppercase">
            Peintre en bâtiment · {project.city}
          </p>
          <p className="mt-3 font-display text-[32px] leading-[1.03] font-bold tracking-tight text-(--d)">
            Des murs qui vous{" "}
            <span className="bg-linear-to-r from-(--p) to-(--a) bg-clip-text text-transparent">
              ressemblent
            </span>
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-nuit/65">
            Intérieurs, façades et décoration. Essayez une teinte sur le salon, on vous conseille
            gratuitement.
          </p>
          <div className="mt-4 flex gap-1.5">
            {swatches.map((s) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setColor(s)}
                aria-label={`Teinte ${s.n}`}
                aria-pressed={color.n === s.n}
                className={cn(
                  "size-8 rounded-full ring-1 ring-nuit/15 transition-transform hover:-translate-y-0.5",
                  color.n === s.n && "ring-2 ring-(--p) ring-offset-2",
                )}
                style={{ backgroundColor: s.c }}
              />
            ))}
          </div>
          <p className="mt-1.5 text-[10px] text-nuit/50">
            Teinte : <span className="font-semibold text-nuit/80">{color.n}</span>
          </p>
          <Btn onClick={() => goTo("Contact")} className="mt-4 self-start px-5 py-2.5">
            Devis gratuit <ArrowRight className="size-3.5" />
          </Btn>
        </div>
      </section>

      <TrustStrip
        items={[
          { I: CalendarCheck, t: "Devis sous 72 h", d: "Visite et conseil couleur offerts" },
          { I: ShieldCheck, t: "Sols protégés", d: "Chantier rendu propre" },
          { I: Leaf, t: "Peintures Ecolabel", d: "Sans odeur, pièces vite habitables" },
          { I: Award, t: "Décennale", d: "Qualibat, travaux garantis" },
        ]}
      />

      <Section className="bg-(--s)">
        <div data-section="Prestations" />
        <SectionHead
          kicker="Prestations"
          title="Du sol au plafond, du salon à la façade"
          center
          className="mb-6"
        />
        <div className="grid grid-cols-2 gap-3 @min-[600px]:grid-cols-4">
          {services.map(({ I, t, d, v }) => (
            <div key={t} className="overflow-hidden rounded-2xl bg-white ring-1 ring-nuit/8">
              <Photo className="h-24 rounded-none">{v}</Photo>
              <div className="p-3">
                <p className="flex items-center gap-1.5 text-[12px] font-bold text-nuit">
                  <I className="size-3.5 text-(--p)" /> {t}
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-nuit/60">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div data-section="Réalisations" />
        <SectionHead
          kicker="Réalisations"
          title="Avant, pendant, après"
          intro="Quelques chantiers récents à Woippy et autour."
          className="mb-5"
        />
        <div className="grid gap-3 @min-[600px]:grid-cols-3">
          {[
            { t: "Salon · Woippy", v: <LivingScene wall="#9fb4c7" oldWall="#e9e2d6" ladder /> },
            { t: "Chambre · Maizières", v: <LivingScene wall="#e8d5c4" oldWall="#d9d4c7" /> },
            { t: "Façade · Saint-Julien", v: <HouseScene facade="#f5efe6" roof="#5f4b3d" /> },
          ].map((r) => (
            <Photo key={r.t} className="h-32" caption={r.t}>
              {r.v}
            </Photo>
          ))}
        </div>
      </Section>

      <Section className="bg-(--s)">
        <div data-section="Avis" />
        <SectionHead kicker="Avis" title="4,9/5 sur Google" className="mb-5" />
        <div className="grid gap-3 @min-[600px]:grid-cols-[1fr_1.6fr]">
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_-16px_rgb(46_16_101/0.35)] ring-1 ring-nuit/8">
            <ZoneMap className="h-24 rounded-none ring-0" towns={[project.city]} />
            <div className="p-3.5">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold text-nuit/50">
                <GoogleG className="size-3" /> Fiche Google Business
              </p>
              <p className="mt-1 text-[14px] font-bold text-nuit">{project.brand}</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-[11px] font-semibold">4,9</span>
                <Stars />
                <span className="text-[10px] text-nuit/50">(64)</span>
              </div>
              <p className="mt-0.5 text-[10px] text-nuit/55">
                Peintre en bâtiment · {project.city} ·{" "}
                <span className="font-semibold text-emerald-700">Ouvert</span>
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
              [
                "Caroline T.",
                "il y a 1 semaine",
                "Travail soigné, chantier laissé impeccable. Le conseil couleur nous a vraiment aidés pour le salon.",
              ],
              [
                "Julien B.",
                "il y a 1 mois",
                "Trois chambres repeintes en 4 jours, rien à redire. Peinture sans odeur, on a pu dormir dedans le soir même.",
              ],
              [
                "Nathalie F.",
                "il y a 3 mois",
                "Façade refaite en une semaine, équipe agréable et ponctuelle.",
              ],
            ].map(([n, w, t], i) => (
              <Card key={n} className="p-3">
                <div className="flex items-center gap-2">
                  <span
                    className="grid size-7 place-items-center rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: ["#7c3aed", "#db2777", "#0891b2"][i] }}
                  >
                    {n[0]}
                  </span>
                  <span className="text-[11px] font-bold text-nuit">{n}</span>
                  <span className="text-[9.5px] text-nuit/45">{w}</span>
                  <Stars className="ml-auto" />
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-nuit/65">{t}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="grid gap-5 @min-[600px]:grid-cols-[1fr_1.3fr]">
        <div data-section="Contact">
          <SectionHead
            kicker="Contact"
            title="Parlons couleurs"
            intro="Visite, conseil couleur et devis gratuits. Réponse sous 24 h."
          />
          <ul className="mt-4 space-y-2 text-[11px] text-nuit/70">
            <li className="flex items-center gap-2">
              <Phone className="size-3.5 text-(--p)" /> {info.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-3.5 text-(--p)" /> {info.address}
            </li>
          </ul>
        </div>
        <Card>
          <DemoForm
            key={color.n}
            submitLabel={
              <>
                <Send className="size-3.5" /> Demander mon devis
              </>
            }
            success={{
              title: "Demande envoyée",
              text: `Teinte choisie : ${color.n}. On vous rappelle pour une visite.`,
            }}
            className="min-h-[200px]"
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
      </Section>
      <MiniFooter />
    </div>
  );
}

export function PeintreSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={PaintRoller}
      info={info}
      pages={[{ id: "home", label: "Accueil", path: "/", render: () => <Home /> }]}
    />
  );
}
