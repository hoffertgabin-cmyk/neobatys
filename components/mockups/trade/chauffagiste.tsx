"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  Check,
  Flame,
  Leaf,
  ShieldCheck,
  Thermometer,
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
} from "./blocks";
import { BoilerScene, HouseScene, VanScene } from "./scenes";

const days = [
  { d: "Lun", n: 14 },
  { d: "Mar", n: 15 },
  { d: "Mer", n: 16 },
  { d: "Jeu", n: 17 },
  { d: "Ven", n: 18 },
];
const slots = ["08:30", "10:00", "11:30", "14:00", "15:30", "17:00"];
/** Créneaux déjà pris, par jour (exemple). */
const taken: Record<number, string[]> = {
  14: ["08:30", "14:00"],
  15: ["10:00"],
  16: ["11:30", "15:30", "17:00"],
  18: ["08:30"],
};

const equipements = [
  "Chaudière gaz",
  "Chaudière fioul",
  "Pompe à chaleur",
  "Poêle à granulés",
] as const;
type Equipement = (typeof equipements)[number];

/** Widget de réservation : jour, créneau, type d'intervention, confirmation. */
function Booking({ compact = false }: { compact?: boolean }) {
  const { param } = useMini();
  const [day, setDay] = useState(15);
  const [slot, setSlot] = useState<string | null>(null);
  const [kind, setKind] = useState<Equipement>((param as Equipement) ?? "Chaudière gaz");
  const [done, setDone] = useState(false);
  const dayLabel = days.find((x) => x.n === day);

  if (done) {
    return (
      <Card className="flex min-h-[230px] flex-col items-center justify-center text-center">
        <span className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <CalendarCheck className="size-6" />
        </span>
        <p className="mt-3 text-[14px] font-bold text-nuit">Rendez-vous confirmé</p>
        <p className="mt-1 text-[11px] text-nuit/60">
          {kind} · {dayLabel?.d} {day} à {slot}
        </p>
        <p className="mt-2 flex items-center gap-1.5 rounded-full bg-(--s) px-3 py-1 text-[10px] font-semibold text-(--p)">
          <Bell className="size-3" /> Rappel par SMS la veille, puis dans 1 an
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setSlot(null);
          }}
          className="mt-3 text-[11px] font-semibold text-(--p) underline underline-offset-2"
        >
          Changer de créneau
        </button>
        <p className="mt-2 text-[9px] text-nuit/40">
          Démonstration : aucune donnée n&apos;est envoyée.
        </p>
      </Card>
    );
  }

  return (
    <Card className="shadow-[0_24px_50px_-20px_rgb(59_10_10/0.35)]">
      <p className="text-[13px] font-bold text-nuit">Réserver mon entretien</p>
      {!compact && (
        <Choice
          options={equipements}
          value={kind}
          onChange={setKind}
          className="mt-2.5"
          itemClassName="px-2.5 py-1 text-[10px]"
        />
      )}
      <p className="mt-3 text-[10px] font-semibold text-nuit/55">Septembre</p>
      <div className="mt-1.5 grid grid-cols-5 gap-1.5">
        {days.map((x) => (
          <button
            key={x.n}
            type="button"
            onClick={() => {
              setDay(x.n);
              setSlot(null);
            }}
            aria-pressed={day === x.n}
            className={cn(
              "rounded-lg py-1.5 text-center transition-colors",
              day === x.n ? "bg-(--p) text-white" : "bg-(--s) text-nuit/70 hover:text-nuit",
            )}
          >
            <span className="block text-[9px] opacity-75">{x.d}</span>
            <span className="block text-[13px] font-bold">{x.n}</span>
          </button>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {slots.map((s) => {
          const off = taken[day]?.includes(s);
          return (
            <button
              key={s}
              type="button"
              disabled={off}
              onClick={() => setSlot(s)}
              aria-pressed={slot === s}
              className={cn(
                "rounded-lg py-1.5 text-[11px] font-semibold ring-1 transition-colors",
                off && "cursor-not-allowed bg-nuit/4 text-nuit/25 line-through ring-transparent",
                !off && slot === s && "bg-(--d) text-white ring-(--d)",
                !off && slot !== s && "bg-white text-nuit/75 ring-nuit/10 hover:ring-(--p)",
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        disabled={!slot}
        onClick={() => setDone(true)}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-(--p) py-2.5 text-[12px] font-semibold text-white transition-opacity disabled:opacity-40"
      >
        <Check className="size-3.5" />
        {slot
          ? `Confirmer le ${dayLabel?.d.toLowerCase()} ${day} à ${slot}`
          : "Choisissez un créneau"}
      </button>
    </Card>
  );
}

const info: SiteInfo = {
  baseline: "Chauffage · PAC · Entretien",
  phone: "03 53 48 75 64",
  email: "rdv@exemple-chauffage-saint-avold.fr",
  address: "5 rue du Général Hirschauer, 57500 Saint-Avold",
  hours: "Lun–ven 8h–18h · Dépannage chauffage 6j/7",
  zone: "Saint-Avold, Forbach, Creutzwald",
  about:
    "Chauffagistes RGE depuis 2008 : entretien de chaudières, pompes à chaleur et poêles à granulés, avec rappel automatique chaque année.",
  labels: ["RGE QualiPAC", "Qualigaz", "Garantie décennale"],
  links: [
    { label: "Entretien de chaudière", page: "entretien" },
    { label: "Pompe à chaleur", page: "installation" },
    { label: "Contrats d'entretien", page: "contrats" },
    { label: "Prendre rendez-vous", page: "rdv" },
    { label: "Contact", page: "contact" },
  ],
  rating: { value: "4,8", count: 203 },
};

function Home() {
  const { project } = useMini();
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-(--d)">
        <HouseScene
          className="absolute inset-0"
          heatPump
          sky="evening"
          facade="#efe4d4"
          roof="#5b4a45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-(--d) via-(--d)/85 to-(--d)/20" />
        <div className="relative grid gap-5 px-4 py-7 @min-[600px]:grid-cols-[1fr_1.05fr] @min-[600px]:items-center @min-[600px]:px-8">
          <div className="text-white">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-(--p) px-2.5 py-1 text-[10px] font-semibold">
              <Flame className="size-3" /> Chauffagiste RGE à {project.city}
            </p>
            <p className="mt-4 font-display text-[30px] leading-[1.05] font-bold tracking-tight">
              Entretien de chaudière, réservé en 1 minute
            </p>
            <p className="mt-3 max-w-[300px] text-[12px] leading-relaxed text-white/70">
              Choisissez un créneau libre, recevez la confirmation par SMS et un rappel chaque
              année. Installation de pompes à chaleur avec MaPrimeRénov&apos;.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Btn to="installation" tone="light" className="ring-0">
                Pompe à chaleur
              </Btn>
              <Btn
                to="contrats"
                tone="light"
                className="bg-white/10 text-white ring-white/20 hover:bg-white/20"
              >
                Contrats dès 12 €/mois
              </Btn>
            </div>
            <div className="mt-5 flex items-center gap-2 text-[10.5px] text-white/70">
              <GoogleG className="size-4" /> <Stars />
              <span>
                <b className="text-white">4,8/5</b> · 203 avis
              </span>
            </div>
          </div>
          <div className="hidden @min-[600px]:block">
            <Booking compact />
          </div>
        </div>
      </div>

      <TrustStrip
        items={[
          { I: CalendarCheck, t: "RDV en ligne", d: "Créneaux en temps réel" },
          { I: Bell, t: "Rappel annuel", d: "On vous prévient chaque année" },
          { I: Leaf, t: "RGE QualiPAC", d: "Aides MaPrimeRénov' déduites" },
          { I: Wrench, t: "Dépannage 6j/7", d: "Sous 24 h pour les contrats" },
        ]}
      />

      <Section>
        <SectionHead
          kicker="Nos services"
          title="Votre chauffage entre de bonnes mains"
          intro="Entretien obligatoire, remplacement de chaudière ou passage à la pompe à chaleur : on vous accompagne de A à Z."
        />
        <div className="mt-5 grid gap-3 @min-[600px]:grid-cols-3">
          {[
            {
              t: "Entretien annuel",
              d: "Chaudière gaz, fioul, poêle à granulés. Attestation remise le jour même.",
              to: "entretien",
              v: <BoilerScene />,
              tag: "Dès 129 €",
            },
            {
              t: "Pompe à chaleur",
              d: "Étude, pose et mise en service. Jusqu'à 60 % d'économies sur la facture.",
              to: "installation",
              v: <HouseScene heatPump facade="#f1ebe1" roof="#5b4a45" />,
              tag: "Aides déduites",
            },
            {
              t: "Contrats d'entretien",
              d: "Visite annuelle, dépannage prioritaire et pièces incluses selon la formule.",
              to: "contrats",
              v: <BoilerScene accent="#ea580c" />,
              tag: "Dès 12 €/mois",
            },
          ].map((x) => (
            <Btn
              key={x.t}
              to={x.to}
              tone="light"
              className="flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left ring-nuit/8"
            >
              <Photo className="h-28 rounded-none" caption={x.tag}>
                {x.v}
              </Photo>
              <span className="block p-3.5">
                <span className="block text-[13px] font-bold text-nuit">{x.t}</span>
                <span className="mt-1 block text-[10.5px] leading-relaxed font-normal text-nuit/60">
                  {x.d}
                </span>
              </span>
            </Btn>
          ))}
        </div>
      </Section>

      {/* Rappel annuel */}
      <Section className="bg-(--s)">
        <div className="grid gap-6 @min-[600px]:grid-cols-2 @min-[600px]:items-center">
          <div>
            <SectionHead
              kicker="Zéro oubli"
              title="On vous rappelle avant la date d'entretien"
              intro="Une fois votre premier rendez-vous pris, on vous envoie un SMS un mois avant l'échéance avec un lien pour choisir le créneau suivant."
            />
            <Stats
              className="mt-5 @min-[600px]:grid-cols-3"
              items={[
                { v: "3 800", l: "chaudières suivies" },
                { v: "98 %", l: "de clients fidèles" },
                { v: "24 h", l: "dépannage contrat" },
              ]}
            />
          </div>
          <div className="space-y-2.5">
            <div className="ml-auto max-w-[260px] rounded-2xl rounded-br-sm bg-(--d) p-3.5 text-white shadow-xl">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold text-white/60">
                <Bell className="size-3 text-(--a)" /> SMS · {project.brand}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed">
                Bonjour, l&apos;entretien de votre chaudière arrive à échéance le 12 novembre.
                Choisissez votre créneau : rdv.exemple.fr/2026
              </p>
            </div>
            <div className="max-w-[220px] rounded-2xl rounded-bl-sm bg-white p-3 text-[11px] text-nuit/75 ring-1 ring-nuit/8">
              Merci, c&apos;est réservé pour mardi 10 h !
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 @min-[600px]:grid-cols-[1fr_1.1fr] @min-[600px]:items-center">
          <Photo className="h-48" caption="Nos techniciens sur la route">
            <VanScene brand={project.brand} phone={info.phone} baseline="Chauffage · PAC" />
          </Photo>
          <div>
            <SectionHead
              kicker="L'équipe"
              title="7 techniciens formés chaque année"
              intro="Des véhicules équipés de pièces d'origine pour réparer dès le premier passage. Interventions sur toutes les grandes marques de chaudières et de pompes à chaleur."
            />
            <Btn to="contact" tone="dark" className="mt-5">
              Nous contacter <ArrowRight className="size-3.5" />
            </Btn>
          </div>
        </div>
      </Section>

      <Section className="bg-(--s)">
        <SectionHead kicker="Avis clients" title="4,8/5 sur 203 avis" className="mb-5" />
        <Reviews
          rating="4,8"
          count={203}
          reviews={[
            {
              n: "Gérard S.",
              c: "Saint-Avold",
              when: "il y a 1 semaine",
              t: "Rendez-vous pris en ligne en 2 minutes, technicien à l'heure et très pro. Le rappel par SMS est bien pratique.",
            },
            {
              n: "Laura M.",
              c: "Forbach",
              when: "il y a 1 mois",
              t: "Pompe à chaleur installée en 3 jours, ils se sont occupés de tout le dossier MaPrimeRénov'.",
            },
            {
              n: "Didier K.",
              c: "Creutzwald",
              when: "il y a 3 mois",
              t: "Panne de chaudière un samedi, dépanné dans la matinée grâce au contrat. Au top.",
            },
          ]}
        />
      </Section>

      <Section className="grid gap-6 @min-[600px]:grid-cols-2">
        <div>
          <SectionHead kicker="Zone d'intervention" title="Saint-Avold et 30 km autour" />
          <ZoneMap
            className="mt-4 h-44"
            towns={[
              project.city,
              "Forbach",
              "Creutzwald",
              "Faulquemont",
              "Freyming",
              "Hombourg-Haut",
              "Carling",
              "Longeville",
            ]}
          />
        </div>
        <div>
          <SectionHead kicker="Questions fréquentes" title="Bon à savoir" />
          <Faq
            className="mt-4"
            items={[
              {
                q: "L'entretien de chaudière est-il obligatoire ?",
                a: "Oui, une fois par an pour les chaudières de 4 à 400 kW. L'attestation vous est remise le jour de la visite.",
              },
              {
                q: "Combien coûte une pompe à chaleur ?",
                a: "Entre 9 000 et 16 000 € avant aides selon la maison. MaPrimeRénov' et les CEE peuvent en financer une grande partie.",
              },
              {
                q: "Que comprend le contrat d'entretien ?",
                a: "La visite annuelle, le dépannage prioritaire et, selon la formule, le déplacement et les pièces.",
              },
            ]}
          />
        </div>
      </Section>

      <Section className="px-0 pt-0 @min-[600px]:px-0 @min-[600px]:pt-0">
        <CtaBand
          title="Votre entretien en 1 minute"
          text="Choisissez un créneau libre, on s'occupe du reste."
          cta={{ label: "Prendre rendez-vous", to: "rdv" }}
        />
      </Section>
      <MiniFooter />
    </>
  );
}

const checks: Record<Equipement, string[]> = {
  "Chaudière gaz": [
    "Nettoyage du corps de chauffe",
    "Contrôle des fumées et du CO",
    "Réglage du brûleur",
    "Attestation d'entretien",
  ],
  "Chaudière fioul": [
    "Ramonage et nettoyage",
    "Changement du gicleur",
    "Contrôle de combustion",
    "Attestation d'entretien",
  ],
  "Pompe à chaleur": [
    "Contrôle d'étanchéité du fluide",
    "Nettoyage des filtres",
    "Vérification du dégivrage",
    "Rapport de performance",
  ],
  "Poêle à granulés": [
    "Nettoyage du foyer et du conduit",
    "Contrôle de l'allumage",
    "Vérification des joints",
    "Attestation d'entretien",
  ],
};
const prix: Record<Equipement, number> = {
  "Chaudière gaz": 129,
  "Chaudière fioul": 159,
  "Pompe à chaleur": 189,
  "Poêle à granulés": 119,
};

function Entretien() {
  const [eq, setEq] = useState<Equipement>("Chaudière gaz");
  return (
    <SubPage
      eyebrow="Entretien annuel"
      title="Quel équipement avez-vous ?"
      intro="L'entretien annuel est obligatoire pour les chaudières. Choisissez votre équipement pour voir ce qui est fait."
      visual={<BoilerScene />}
    >
      <Choice options={equipements} value={eq} onChange={setEq} />
      <div className="mt-4 grid gap-3 @min-[600px]:grid-cols-[1.3fr_1fr]">
        <Card>
          <p className="text-[12px] font-bold text-nuit">Ce que comprend la visite</p>
          <ul className="mt-2 space-y-1.5">
            {checks[eq].map((c) => (
              <li key={c} className="flex items-center gap-2 text-[11px] text-nuit/70">
                <Check className="size-3.5 text-(--p)" /> {c}
              </li>
            ))}
          </ul>
        </Card>
        <div className="flex flex-col justify-between rounded-2xl bg-(--d) p-4 text-white">
          <div>
            <p className="text-[10px] text-white/55">À partir de</p>
            <p className="font-display text-[32px] font-bold">{prix[eq]} €</p>
            <p className="text-[10px] text-white/55">TTC, déplacement inclus</p>
          </div>
          <Btn to="rdv" param={eq} className="mt-3 bg-(--a) text-(--d)">
            <CalendarCheck className="size-3.5" /> Réserver ce créneau
          </Btn>
        </div>
      </div>
    </SubPage>
  );
}

const solutions = [
  {
    id: "gaz",
    t: "Chaudière gaz à condensation",
    I: Flame,
    cout: 2,
    eco: 2,
    aides: 1,
    d: "Le remplacement le plus simple, idéal si le gaz est déjà là.",
  },
  {
    id: "pac",
    t: "Pompe à chaleur air/eau",
    I: Leaf,
    cout: 3,
    eco: 3,
    aides: 3,
    d: "Jusqu'à 3 fois moins d'énergie consommée, éligible aux aides.",
  },
  {
    id: "granules",
    t: "Chaudière à granulés",
    I: Thermometer,
    cout: 3,
    eco: 3,
    aides: 2,
    d: "Combustible local et économique, demande un espace de stockage.",
  },
];

function Gauge({ v, label }: { v: number; label: string }) {
  return (
    <div>
      <p className="text-[9px] text-nuit/50">{label}</p>
      <div className="mt-0.5 flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("h-1.5 flex-1 rounded-full", i <= v ? "bg-(--p)" : "bg-nuit/10")}
          />
        ))}
      </div>
    </div>
  );
}

function Installation() {
  const [sel, setSel] = useState("pac");
  const s = solutions.find((x) => x.id === sel) ?? solutions[0];
  return (
    <SubPage
      eyebrow="Installation"
      title="Comparer les solutions"
      intro="Touchez une solution pour voir le détail."
      visual={<HouseScene heatPump facade="#f1ebe1" roof="#5b4a45" />}
    >
      <div className="grid gap-2.5 @min-[600px]:grid-cols-3">
        {solutions.map(({ id, t, I, cout, eco, aides }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSel(id)}
            aria-pressed={sel === id}
            className={cn(
              "rounded-xl bg-white p-3.5 text-left ring-1 transition-shadow",
              sel === id ? "shadow-lg ring-2 ring-(--p)" : "ring-nuit/8",
            )}
          >
            <span className="grid size-8 place-items-center rounded-lg bg-(--s) text-(--p)">
              <I className="size-4" />
            </span>
            <p className="mt-2 text-[11px] font-bold text-nuit">{t}</p>
            <div className="mt-2 space-y-1.5">
              <Gauge v={cout} label="Investissement" />
              <Gauge v={eco} label="Économies" />
              <Gauge v={aides} label="Aides possibles" />
            </div>
          </button>
        ))}
      </div>
      <Card className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[12px] font-bold text-nuit">{s.t}</p>
          <p className="mt-0.5 max-w-[360px] text-[11px] text-nuit/60">{s.d}</p>
        </div>
        <Btn to="contact" param={s.t} tone="dark">
          Étude gratuite
        </Btn>
      </Card>
    </SubPage>
  );
}

const formules = [
  {
    id: "essentiel",
    t: "Essentiel",
    p: 9,
    f: ["Entretien annuel", "Attestation", "Rappel automatique"],
  },
  {
    id: "serenite",
    t: "Sérénité",
    p: 15,
    f: ["Entretien annuel", "Dépannage sous 48 h", "Pièces d'usure incluses"],
  },
  {
    id: "premium",
    t: "Premium",
    p: 22,
    f: ["Tout Sérénité", "Dépannage sous 24 h, 7j/7", "Main-d'œuvre incluse"],
  },
];

function Contrats() {
  const [sel, setSel] = useState("serenite");
  const [ok, setOk] = useState(false);
  const f = formules.find((x) => x.id === sel) ?? formules[1];
  return (
    <SubPage
      eyebrow="Contrats d'entretien"
      title="Choisissez votre formule"
      intro="Tarifs donnés à titre d'exemple, sans engagement de durée."
    >
      <div className="grid gap-2.5 @min-[600px]:grid-cols-3">
        {formules.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => {
              setSel(x.id);
              setOk(false);
            }}
            aria-pressed={sel === x.id}
            className={cn(
              "relative rounded-xl p-3.5 text-left ring-1 transition-colors",
              sel === x.id ? "bg-(--d) text-white ring-(--d)" : "bg-white text-nuit ring-nuit/8",
            )}
          >
            {x.id === "serenite" && (
              <span className="absolute -top-2 right-3 rounded-full bg-(--a) px-2 py-0.5 text-[9px] font-bold text-(--d)">
                Le plus choisi
              </span>
            )}
            <p className="text-[12px] font-bold">{x.t}</p>
            <p className="mt-1 font-display text-[24px] font-bold">
              {x.p} €<span className="text-[11px] font-medium opacity-60"> /mois</span>
            </p>
            <ul className="mt-2 space-y-1">
              {x.f.map((l) => (
                <li
                  key={l}
                  className={cn(
                    "flex items-center gap-1.5 text-[10px]",
                    sel === x.id ? "text-white/75" : "text-nuit/60",
                  )}
                >
                  <ShieldCheck
                    className={cn("size-3", sel === x.id ? "text-(--a)" : "text-(--p)")}
                  />{" "}
                  {l}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
      <Card className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] text-nuit/70">
          {ok ? (
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <Check className="size-3.5" /> Demande de souscription « {f.t} » enregistrée
              (démonstration)
            </span>
          ) : (
            <>
              Formule choisie : <span className="font-bold text-nuit">{f.t}</span> · {f.p} € / mois
            </>
          )}
        </p>
        {!ok && <Btn onClick={() => setOk(true)}>Souscrire</Btn>}
      </Card>
    </SubPage>
  );
}

function Rdv() {
  return (
    <SubPage eyebrow="Prendre rendez-vous" title="Choisissez votre créneau">
      <div className="max-w-[420px]">
        <Booking />
      </div>
    </SubPage>
  );
}

const towns = [
  "Saint-Avold",
  "Freyming-Merlebach",
  "Creutzwald",
  "Faulquemont",
  "Longeville-lès-St-Avold",
  "Hombourg-Haut",
];

function Contact() {
  const { param } = useMini();
  return (
    <SubPage eyebrow="Contact" title="Une question, une panne ?">
      <div className="grid gap-3 @min-[600px]:grid-cols-[1.2fr_1fr]">
        <Card>
          <DemoForm
            submitLabel={
              <>
                <Wrench className="size-3.5" /> Être rappelé
              </>
            }
            success={{
              title: "Demande reçue",
              text: "Un technicien vous rappelle dans la journée.",
            }}
            className="min-h-[230px]"
          >
            <div className="grid gap-2.5 @min-[600px]:grid-cols-2">
              <Field label="Nom" placeholder="Votre nom" />
              <Field label="Téléphone" placeholder="06 XX XX XX XX" type="tel" />
            </div>
            <div className="mt-2.5">
              <Field
                label="Votre demande"
                textarea
                defaultValue={param ? `Étude pour : ${param}` : undefined}
                placeholder="Décrivez votre besoin"
              />
            </div>
          </DemoForm>
        </Card>
        <div className="rounded-2xl bg-(--d) p-4 text-white">
          <p className="text-[12px] font-bold">Secteur d&apos;intervention</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
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

export function ChauffagisteSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={Flame}
      info={info}
      cta={{ label: "Prendre rendez-vous", page: "rdv" }}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        { id: "entretien", label: "Entretien", path: "/entretien", render: () => <Entretien /> },
        {
          id: "installation",
          label: "Installation",
          path: "/installation",
          render: () => <Installation />,
        },
        { id: "contrats", label: "Contrats", path: "/contrats", render: () => <Contrats /> },
        { id: "contact", label: "Contact", path: "/contact", render: () => <Contact /> },
        {
          id: "rdv",
          label: "Rendez-vous",
          path: "/rendez-vous",
          render: () => <Rdv />,
          inNav: false,
        },
      ]}
    />
  );
}
