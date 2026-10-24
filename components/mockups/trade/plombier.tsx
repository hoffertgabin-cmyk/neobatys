"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  BadgeEuro,
  Check,
  ChevronDown,
  Clock,
  Droplets,
  Phone,
  Send,
  ShieldCheck,
  Siren,
  Wrench,
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
  Stars,
  SubPage,
  useMini,
  type SiteInfo,
  type SiteProps,
} from "./kit";
import {
  CtaBand,
  Faq,
  GoogleG,
  Photo,
  Reviews,
  Section,
  SectionHead,
  Stats,
  TrustStrip,
  ZoneMap,
  type Review,
} from "./blocks";
import { BathroomScene, BoilerScene, PipesScene } from "./scenes";

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

const info: SiteInfo = {
  baseline: "Plomberie · Sanitaire · Dépannage",
  phone: "03 53 48 21 07",
  email: "contact@exemple-plomberie-thionville.fr",
  address: "14 rue de la Paix, 57100 Thionville",
  hours: "Lun–ven 7h30–19h · Sam 8h–12h · Urgences 7j/7",
  zone: "Thionville et 30 km autour",
  about:
    "Entreprise familiale de plomberie depuis 2011 : dépannage, salles de bain clé en main et chauffe-eau, pour les particuliers et les syndics.",
  labels: ["RGE", "Qualibat", "Garantie décennale", "Artisan"],
  links: [
    { label: "Dépannage et fuites", page: "depannage" },
    { label: "Salle de bain", page: "sdb" },
    { label: "Chauffe-eau", page: "depannage" },
    { label: "Avis clients", page: "avis" },
    { label: "Urgence 7j/7", page: "urgence" },
  ],
  rating: { value: "4,9", count: 132 },
};

const homeReviews: Review[] = [
  {
    n: "Amandine M.",
    c: "Yutz",
    when: "il y a 2 semaines",
    t: "Fuite sous l'évier un dimanche matin : rappelée en 10 minutes, technicien sur place en moins d'une heure. Travail propre, prix annoncé respecté.",
  },
  {
    n: "Stéphane K.",
    c: "Thionville",
    when: "il y a 1 mois",
    t: "Salle de bain entièrement refaite en 9 jours. Douche à l'italienne superbe, chantier nettoyé chaque soir. Je recommande sans hésiter.",
  },
  {
    n: "Patrick L.",
    c: "Hayange",
    when: "il y a 2 mois",
    t: "Remplacement du ballon d'eau chaude dans la journée. Bonnes explications sur le choix du modèle thermodynamique.",
  },
];

function Home() {
  const { project } = useMini();
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[360px] overflow-hidden bg-(--d)">
        <BathroomScene className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-(--d)/95 via-(--d)/75 to-(--d)/5" />
        <div className="relative grid gap-5 px-4 py-7 @min-[600px]:grid-cols-[1.25fr_1fr] @min-[600px]:items-center @min-[600px]:px-8 @min-[600px]:py-9">
          <div className="text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold ring-1 ring-white/15">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative size-2 rounded-full bg-emerald-400" />
              </span>
              Disponible aujourd&apos;hui · intervention sous 2 h
            </p>
            <p className="mt-4 font-display text-[30px] leading-[1.05] font-bold tracking-tight @min-[600px]:text-[34px]">
              Plombier à {project.city}, <span className="text-(--a)">dépannage 7j/7</span>
            </p>
            <p className="mt-3 max-w-[340px] text-[12px] leading-relaxed text-white/70">
              Fuites, canalisations bouchées, chauffe-eau en panne ou salle de bain à refaire : un
              artisan qualifié, un prix annoncé avant de commencer.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Btn to="urgence" className="px-5 py-2.5">
                <Siren className="size-3.5" /> Demander un dépannage
              </Btn>
              <Btn tone="light" to="urgence" className="px-5 py-2.5 ring-0">
                <Phone className="size-3.5" /> {info.phone}
              </Btn>
            </div>
            <div className="mt-5 flex items-center gap-2 text-[10.5px] text-white/70">
              <GoogleG className="size-4" />
              <Stars />
              <span>
                <b className="text-white">4,9/5</b> · 132 avis Google
              </span>
            </div>
          </div>
          <Card className="hidden shadow-2xl @min-[600px]:block">
            <p className="flex items-center gap-1.5 text-[13px] font-bold text-(--d)">
              <Droplets className="size-4 text-(--p)" /> Être rappelé en 15 min
            </p>
            <p className="mt-0.5 mb-3 text-[10px] text-nuit/50">Gratuit et sans engagement</p>
            <UrgentForm compact />
          </Card>
        </div>
      </div>

      <TrustStrip
        items={[
          { I: Clock, t: "Sous 2 h", d: "Urgences 7j/7, même le dimanche" },
          { I: BadgeEuro, t: "Prix annoncé", d: "Devis gratuit avant intervention" },
          { I: Award, t: "Artisan qualifié", d: "RGE et Qualibat" },
          { I: ShieldCheck, t: "Garantie décennale", d: "Travaux assurés 10 ans" },
        ]}
      />

      {/* Prestations */}
      <Section className="bg-(--s)">
        <SectionHead
          kicker="Nos prestations"
          title="Du dépannage urgent à la salle de bain clé en main"
          intro="Une seule équipe pour tous vos travaux de plomberie, de la petite fuite au chantier complet."
        />
        <div className="mt-5 grid gap-3 @min-[600px]:grid-cols-3">
          {[
            {
              t: "Dépannage et fuites",
              d: "Recherche de fuite, robinetterie, WC et canalisations débouchées.",
              to: "depannage",
              v: <PipesScene />,
              tag: "Sous 2 h",
            },
            {
              t: "Salle de bain",
              d: "Douche à l'italienne, PMR, meuble vasque : conception et pose.",
              to: "sdb",
              v: <BathroomScene wall="#cfd8d2" floor="#4b5563" wood="#c79a6b" tile={[60, 60]} />,
              tag: "Clé en main",
            },
            {
              t: "Chauffe-eau",
              d: "Remplacement, ballon thermodynamique, détartrage et entretien.",
              to: "depannage",
              v: <BoilerScene accent="#0369a1" />,
              tag: "Pose en 24 h",
            },
          ].map((s) => (
            <Btn
              key={s.t}
              to={s.to}
              tone="light"
              className="group flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left ring-nuit/8"
            >
              <Photo className="h-28 rounded-none" caption={s.tag}>
                {s.v}
              </Photo>
              <span className="block p-3.5">
                <span className="block text-[13px] font-bold text-nuit">{s.t}</span>
                <span className="mt-1 block text-[10.5px] leading-relaxed font-normal text-nuit/60">
                  {s.d}
                </span>
                <span className="mt-2.5 flex items-center gap-1 text-[10.5px] text-(--p)">
                  En savoir plus <ArrowRight className="size-3" />
                </span>
              </span>
            </Btn>
          ))}
        </div>
      </Section>

      {/* Salle de bain */}
      <Section className="grid gap-6 @min-[600px]:grid-cols-2 @min-[600px]:items-center">
        <Photo className="h-56" caption={`Douche à l'italienne · ${project.city}`}>
          <BathroomScene wall="#e6e1d8" floor="#3f4448" wood="#8a5a35" tile={[60, 90]} />
        </Photo>
        <div>
          <SectionHead
            kicker="Rénovation"
            title="Votre nouvelle salle de bain en 10 jours"
            intro="Un seul interlocuteur, de la dépose au dernier joint : plomberie, carrelage, électricité et meubles."
          />
          <ul className="mt-4 space-y-2">
            {[
              "Visite et plan 3D offerts",
              "Devis détaillé poste par poste",
              "Chantier protégé et nettoyé chaque soir",
              "Aides MaPrimeAdapt' pour les douches PMR",
            ].map((l) => (
              <li key={l} className="flex items-center gap-2 text-[11.5px] text-nuit/75">
                <span className="grid size-4.5 shrink-0 place-items-center rounded-full bg-(--p) text-(--op)">
                  <Check className="size-3" />
                </span>
                {l}
              </li>
            ))}
          </ul>
          <Btn to="sdb" tone="dark" className="mt-5">
            Composer mon projet <ArrowRight className="size-3.5" />
          </Btn>
        </div>
      </Section>

      {/* Chiffres */}
      <Section className="bg-(--d)">
        <Stats
          light
          items={[
            { v: "15 ans", l: "d'expérience à Thionville" },
            { v: "2 400+", l: "interventions réalisées" },
            { v: "1 h 10", l: "délai moyen en urgence" },
            { v: "4,9/5", l: "note moyenne Google" },
          ]}
        />
      </Section>

      {/* Avis */}
      <Section>
        <SectionHead kicker="Avis clients" title="Ils nous ont fait confiance" className="mb-5" />
        <Reviews reviews={homeReviews} count={132} />
      </Section>

      {/* Zone + FAQ */}
      <Section className="grid gap-6 bg-(--s) @min-[600px]:grid-cols-2">
        <div>
          <SectionHead
            kicker="Zone d'intervention"
            title="Thionville et 30 km autour"
            intro="Nos camionnettes sont équipées pour réparer dès le premier passage dans 9 cas sur 10."
          />
          <ZoneMap
            className="mt-4 h-44"
            towns={[
              project.city,
              "Yutz",
              "Hayange",
              "Florange",
              "Hettange",
              "Uckange",
              "Fameck",
              "Cattenom",
            ]}
          />
        </div>
        <div>
          <SectionHead kicker="Questions fréquentes" title="Bon à savoir" />
          <Faq
            className="mt-4"
            items={[
              {
                q: "Combien coûte un déplacement en urgence ?",
                a: "Le déplacement est de 49 € en journée et de 89 € le soir et le week-end. Le prix de la réparation est toujours annoncé avant de commencer.",
              },
              {
                q: "Intervenez-vous le dimanche ?",
                a: "Oui, une astreinte tourne 7 jours sur 7, de 7 h à 22 h.",
              },
              {
                q: "Mon assurance peut-elle prendre en charge la fuite ?",
                a: "Souvent, oui. On vous remet un rapport de recherche de fuite avec photos pour votre assureur.",
              },
              {
                q: "Proposez-vous le paiement en plusieurs fois ?",
                a: "Pour les rénovations, le règlement se fait en 3 fois : à la commande, au démarrage et à la réception.",
              },
            ]}
          />
        </div>
      </Section>

      <Section className="px-0 @min-[600px]:px-0">
        <CtaBand
          title="Une fuite, une panne ? On arrive."
          text="Décrivez votre problème, on vous rappelle dans les 15 minutes."
          cta={{ label: "Demander un dépannage", to: "urgence" }}
        />
      </Section>
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
    <SubPage eyebrow="Avis clients" title="Ils nous ont fait confiance">
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
          <p className="font-display text-[24px] font-bold">{info.phone}</p>
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
      info={info}
      navStyle="underline"
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
