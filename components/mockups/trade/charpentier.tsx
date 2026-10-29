"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Bot,
  Check,
  FileText,
  Hammer,
  Home as HomeIcon,
  Send,
  ShieldCheck,
  Sparkles,
  Trees,
  Warehouse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  DemoForm,
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
  Stats,
  TrustStrip,
  ZoneMap,
} from "./blocks";
import { ArticlesSection, Gallery, Pic, UploadField } from "./extras";

type Msg = { from: "bot" | "me"; text: string };

/** Réponses scriptées de l'assistant, choisies par mots-clés. */
const intents: { k: RegExp; q: string; a: string }[] = [
  {
    k: /charpente|toit|toiture|traditionnel/i,
    q: "Refaire ma charpente",
    a: "Bien noté. Il s'agit d'une charpente neuve ou d'une rénovation ? Indiquez la surface au sol approximative et votre commune, je prépare une première estimation.",
  },
  {
    k: /extension|ossature|agrandi/i,
    q: "Une extension bois",
    a: "Une extension à ossature bois se monte en 2 à 4 semaines. Pour une première idée : quelle surface souhaitez-vous (en m²) et de plain-pied ou à l'étage ?",
  },
  {
    k: /carport|abri|préau|pergola/i,
    q: "Un carport",
    a: "Pour un carport 1 ou 2 voitures, comptez environ une semaine de fabrication à l'atelier. Souhaitez-vous une toiture plate ou à deux pans ?",
  },
  {
    k: /prix|co[uû]t|tarif|combien|devis/i,
    q: "Combien ça coûte ?",
    a: "Le prix dépend du bois, de la portée et de la couverture. Je peux transmettre votre demande à l'artisan, qui vous envoie un devis sous 48 h. Voulez-vous laisser votre numéro ?",
  },
  {
    k: /d[ée]lai|quand|disponib/i,
    q: "Quels délais ?",
    a: "En ce moment, les visites se font sous une semaine et les chantiers démarrent sous 4 à 6 semaines.",
  },
  {
    k: /0\d|\+33|num[ée]ro|t[ée]l/i,
    q: "",
    a: "Merci ! Votre demande est transmise à l'artisan avec le résumé de notre échange. Il vous rappelle rapidement. (Démonstration : rien n'est envoyé.)",
  },
];
const fallback =
  "Je suis l'assistant du site : je réponds aux questions sur les charpentes, extensions bois, carports, prix et délais. Pouvez-vous préciser votre projet ?";

function Chat() {
  const { project } = useMini();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: `Bonjour ! Je suis l'assistant de ${project.brand}. Quel est votre projet ?`,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (q: string) => {
    const t = q.trim();
    if (!t || typing) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setText("");
    setTyping(true);
    timer.current = setTimeout(() => {
      const hit = intents.find((i) => i.k.test(t));
      setMsgs((m) => [...m, { from: "bot", text: hit?.a ?? fallback }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="flex h-[300px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_50px_-20px_rgb(10_38_21/0.45)] ring-1 ring-nuit/8">
      <div className="flex items-center gap-2.5 bg-(--d) px-3.5 py-2.5 text-white">
        <span className="grid size-7 place-items-center rounded-full bg-(--a) text-(--d)">
          <Bot className="size-4" />
        </span>
        <span>
          <span className="block text-[11px] font-bold">Assistant IA</span>
          <span className="flex items-center gap-1 text-[9px] text-white/60">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Répond 24h/24
          </span>
        </span>
      </div>
      <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto bg-(--s) p-3">
        {msgs.map((m, i) => (
          <p
            key={i}
            className={cn(
              "max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed",
              m.from === "bot"
                ? "rounded-tl-sm bg-white text-nuit/80 ring-1 ring-nuit/6"
                : "ml-auto rounded-tr-sm bg-(--p) text-white",
            )}
          >
            {m.text}
          </p>
        ))}
        {typing && (
          <p
            className="flex w-14 justify-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 ring-1 ring-nuit/6"
            aria-label="L'assistant écrit"
          >
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="size-1.5 animate-bounce rounded-full bg-nuit/35"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}
          </p>
        )}
      </div>
      <div className="flex gap-1.5 overflow-x-auto border-t border-nuit/6 bg-white px-3 pt-2">
        {intents
          .filter((i) => i.q)
          .map((i) => (
            <button
              key={i.q}
              type="button"
              onClick={() => ask(i.q)}
              className="shrink-0 rounded-full bg-(--s) px-2.5 py-1 text-[10px] font-semibold text-(--p) hover:brightness-95"
            >
              {i.q}
            </button>
          ))}
      </div>
      <form
        className="flex gap-2 bg-white p-3 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(text);
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écrivez votre question…"
          aria-label="Votre message"
          className="min-w-0 flex-1 rounded-full bg-(--s) px-3 py-1.5 text-[16px] text-nuit outline-none placeholder:text-nuit/40 focus:ring-2 focus:ring-(--p) @min-[600px]:text-[11px]"
        />
        <button
          type="submit"
          aria-label="Envoyer"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-(--p) text-white"
        >
          <Send className="size-3.5" />
        </button>
      </form>
    </div>
  );
}

const pipeline = [
  { I: Sparkles, t: "L'IA qualifie la demande" },
  { I: FileText, t: "Devis préparé dans le logiciel" },
  { I: Check, t: "Vous validez et envoyez" },
];

const info: SiteInfo = {
  baseline: "Charpente · Ossature bois",
  phone: "03 53 48 93 15",
  email: "atelier@exemple-charpente-faulquemont.fr",
  address: "Lieu-dit La Scierie, 57380 Faulquemont",
  hours: "Lun–ven 7h30–17h30 · Assistant en ligne 24h/24",
  zone: "Moselle et nord Meurthe-et-Moselle",
  about:
    "Charpentiers depuis 1996 : charpentes traditionnelles taillées à l'atelier, extensions à ossature bois, carports et couverture.",
  labels: ["Qualibat", "Bois PEFC", "Garantie décennale"],
  links: [
    { label: "Charpente traditionnelle", page: "charpente" },
    { label: "Extensions bois", page: "ossature" },
    { label: "Carports et préaux", page: "ossature" },
    { label: "Contact", page: "contact" },
  ],
  contactPage: "contact",
  articles: [
    {
      t: "Extension bois : permis ou déclaration ?",
      d: "Les règles d'urbanisme selon la surface de votre projet.",
      cat: "Ossature bois",
      read: 3,
      img: "ossature",
      body: [
        "Jusqu'à 20 m², une déclaration préalable suffit, et jusqu'à 40 m² en zone urbaine couverte par un PLU.",
        "Au-delà, ou si la surface totale dépasse 150 m², un permis de construire et un architecte sont nécessaires.",
        "Nous préparons les plans et vous accompagnons dans les démarches.",
      ],
    },
    {
      t: "Traiter sa charpente : quand faut-il intervenir ?",
      d: "Insectes, champignons, humidité : les signes qui doivent alerter.",
      cat: "Charpente",
      read: 4,
      img: "charpente",
      body: [
        "De la sciure au pied des poutres ou des petits trous ronds signalent souvent des insectes xylophages.",
        "Un bois qui s'effrite ou sent le moisi peut être attaqué par la mérule : il faut agir vite.",
        "Un diagnostic gratuit permet de savoir s'il suffit de traiter ou s'il faut remplacer des pièces.",
      ],
    },
    {
      t: "Refaire sa toiture : tuiles, ardoises ou bac acier ?",
      d: "Durée de vie, poids, budget : comparatif des couvertures.",
      cat: "Couverture",
      read: 3,
      img: "toiture",
      body: [
        "La tuile terre cuite, la plus courante en Lorraine, dure plus de 50 ans.",
        "L'ardoise naturelle est très durable mais demande une charpente adaptée à son poids.",
        "Le bac acier est léger et économique, idéal pour les annexes, carports et bâtiments agricoles.",
      ],
    },
  ],
  rating: { value: "4,9", count: 47 },
};

function Home() {
  const { project } = useMini();
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-(--d)">
        <Pic src="charpente-hero" alt="Ossature bois en cours de montage" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-(--d) via-(--d)/80 to-(--d)/10" />
        <div className="relative grid gap-5 px-4 py-7 @min-[600px]:grid-cols-[1fr_0.95fr] @min-[600px]:items-center @min-[600px]:px-8">
          <div className="text-white">
            <p className="text-[10px] font-bold tracking-[0.18em] text-(--a) uppercase">
              Charpentier · {project.city}
            </p>
            <p className="mt-3 font-display text-[40px] leading-[0.95] font-bold tracking-tight uppercase">
              Charpente, ossature bois et extensions
            </p>
            <p className="mt-3 max-w-[290px] text-[12px] leading-relaxed text-white/70">
              Taillé dans notre atelier, monté par nos compagnons. Posez votre question à
              l&apos;assistant : il vous répond tout de suite, jour et nuit.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Btn to="contact" className="bg-(--a) px-5 py-2.5 text-(--d)">
                Demander un devis
              </Btn>
              <Btn
                to="ossature"
                tone="light"
                className="bg-white/10 px-5 py-2.5 text-white ring-white/20 hover:bg-white/20"
              >
                Extensions bois
              </Btn>
            </div>
          </div>
          <div className="hidden @min-[600px]:block">
            <Chat />
          </div>
        </div>
      </div>

      <TrustStrip
        items={[
          { I: Trees, t: "Bois local", d: "Sapin et chêne des Vosges" },
          { I: Warehouse, t: "Atelier de taille", d: "800 m² à Faulquemont" },
          { I: Award, t: "Qualibat", d: "Charpente et ossature" },
          { I: ShieldCheck, t: "Décennale", d: "Structure garantie 10 ans" },
        ]}
      />

      <Section>
        <SectionHead
          kicker="Savoir-faire"
          title="Du toit à l'extension, tout en bois"
          intro="Nous concevons, taillons et posons. Un seul interlocuteur pour la charpente, l'ossature et la couverture."
        />
        <div className="mt-5 grid gap-3 @min-[600px]:grid-cols-3">
          {[
            {
              t: "Charpente traditionnelle",
              d: "Neuve ou en rénovation, taillée à l'atelier, combles aménageables.",
              to: "charpente",
              v: "charpente",
            },
            {
              t: "Extensions ossature bois",
              d: "Pièce en plus, étage, garage : chantier sec et rapide.",
              to: "ossature",
              v: "ossature",
            },
            {
              t: "Couverture et zinguerie",
              d: "Tuiles, ardoises, bac acier et gouttières, posés par nos couvreurs.",
              to: "charpente",
              v: "toiture",
            },
          ].map((x) => (
            <Btn
              key={x.t}
              to={x.to}
              tone="light"
              className="flex-col items-stretch gap-0 overflow-hidden rounded-lg p-0 text-left ring-nuit/8"
            >
              <Photo src={x.v} alt={x.t} className="h-28 rounded-none" />
              <span className="block p-3.5">
                <span className="block text-[13px] font-bold text-nuit">{x.t}</span>
                <span className="mt-1 block text-[10.5px] leading-relaxed font-normal text-nuit/60">
                  {x.d}
                </span>
                <span className="mt-2.5 flex items-center gap-1 text-[10.5px] text-(--p)">
                  Découvrir <ArrowRight className="size-3" />
                </span>
              </span>
            </Btn>
          ))}
        </div>
      </Section>

      {/* Assistant */}
      <Section className="bg-(--s)">
        <div className="grid gap-6 @min-[600px]:grid-cols-[1fr_1fr] @min-[600px]:items-center">
          <div>
            <SectionHead
              kicker="Réponse immédiate"
              title="Une question à 22 h ? L'assistant répond."
              intro="Il connaît nos prestations, nos délais et nos fourchettes de prix. Il qualifie votre projet et le transmet à l'atelier avec un brouillon de devis."
            />
            <ol className="mt-4 space-y-2">
              {pipeline.map(({ I, t }, i) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-[11px] font-semibold text-nuit/80"
                >
                  <span className="grid size-7 place-items-center rounded-lg bg-(--d) text-(--a)">
                    <I className="size-3.5" />
                  </span>
                  <span className="text-nuit/35">0{i + 1}</span> {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="@min-[600px]:hidden">
            <Chat />
          </div>
          <Stats
            className="hidden @min-[600px]:grid @min-[600px]:grid-cols-2"
            items={[
              { v: "30 ans", l: "de charpente en Moselle" },
              { v: "12", l: "charpentiers et couvreurs" },
              { v: "48 h", l: "pour recevoir un devis" },
              { v: "1 200+", l: "toitures et extensions" },
            ]}
          />
        </div>
      </Section>

      <Section className="bg-(--d)">
        <SectionHead light kicker="Réalisations" title="Chantiers récents" className="mb-5" />
        <Gallery
          itemClassName="h-32"
          items={[
            { src: "charpente", t: "Charpente traditionnelle · Créhange" },
            { src: "ossature", t: "Maison ossature bois · Faulquemont" },
            { src: "toiture", t: "Couverture en tuiles · Boulay" },
            { src: "charpente-hero", t: "Levage d'une ossature · Bouzonville" },
            { src: "charpente-atelier", t: "Taille à l'atelier" },
            { src: "atelier", t: "Préparation des assemblages" },
          ]}
        />
      </Section>

      <Section>
        <SectionHead kicker="Avis clients" title="4,9/5 sur 47 avis" className="mb-5" />
        <Reviews
          count={47}
          reviews={[
            {
              n: "François M.",
              c: "Faulquemont",
              when: "il y a 3 semaines",
              t: "Extension bois de 25 m² montée en 3 semaines. Équipe sérieuse, finitions au top, devis respecté.",
            },
            {
              n: "Céline A.",
              c: "Créhange",
              when: "il y a 2 mois",
              t: "J'ai posé ma question à l'assistant un dimanche soir, rappelée le lundi matin avec une estimation. Bluffant.",
            },
            {
              n: "Bernard H.",
              c: "Boulay-Moselle",
              when: "il y a 5 mois",
              t: "Charpente refaite à neuf sur une maison de 1920. Un vrai travail de compagnons.",
            },
          ]}
        />
      </Section>

      <Section className="grid gap-6 bg-(--s) @min-[600px]:grid-cols-2">
        <div>
          <SectionHead kicker="Zone d'intervention" title="Toute la Moselle" />
          <ZoneMap
            className="mt-4 h-44"
            towns={[
              project.city,
              "Metz",
              "Saint-Avold",
              "Boulay",
              "Créhange",
              "Rémilly",
              "Morhange",
              "Pange",
            ]}
          />
        </div>
        <div>
          <SectionHead kicker="Questions fréquentes" title="Bon à savoir" />
          <Faq className="mt-4" items={faq} />
        </div>
      </Section>

      <ArticlesSection />

      <Section className="px-0 pt-8 @min-[600px]:px-0">
        <CtaBand
          title="Un projet bois ?"
          text="Visite gratuite sous une semaine, devis sous 48 h."
          cta={{ label: "Demander un devis", to: "contact" }}
        />
      </Section>
      <MiniFooter />
    </>
  );
}

const faq = [
  {
    q: "Faut-il un permis pour une extension bois ?",
    a: "Une déclaration préalable suffit jusqu'à 40 m² en zone urbaine (20 m² ailleurs). Au-delà, un permis de construire est nécessaire.",
  },
  {
    q: "Le bois résiste-t-il aussi bien que le parpaing ?",
    a: "Oui : une ossature bois bien conçue dure aussi longtemps, isole mieux et se construit plus vite.",
  },
  {
    q: "Quels sont vos délais ?",
    a: "Visite sous une semaine, démarrage des chantiers sous 4 à 6 semaines selon la saison.",
  },
];

const charpentes = [
  {
    t: "Traditionnelle",
    d: "Fermes, pannes et chevrons en chêne ou sapin, assemblées à l'atelier. Idéale pour les combles aménageables.",
    svg: (
      <>
        <path d="M20 110 L120 30 L220 110" />
        <path d="M120 30 V110 M70 70 L120 110 L170 70 M20 110 H220" />
      </>
    ),
  },
  {
    t: "Fermettes",
    d: "Fermes industrielles légères en W, rapides à poser. Le choix économique pour les combles perdus.",
    svg: (
      <>
        <path d="M20 110 L120 30 L220 110 H20" />
        <path d="M60 110 L85 78 L120 110 L155 78 L180 110" />
      </>
    ),
  },
  {
    t: "Lamellé-collé",
    d: "Grandes portées sans poteau pour les pièces de vie, garages et bâtiments agricoles.",
    svg: (
      <>
        <path d="M20 110 Q120 10 220 110" strokeWidth="6" />
        <path d="M20 110 H220" />
      </>
    ),
  },
];

function Charpente() {
  const [i, setI] = useState(0);
  const c = charpentes[i];
  return (
    <SubPage eyebrow="Charpente" title="Trois façons de couvrir" visual="charpente-atelier">
      <div className="flex gap-1.5">
        {charpentes.map((x, j) => (
          <button
            key={x.t}
            type="button"
            onClick={() => setI(j)}
            aria-pressed={i === j}
            className={cn(
              "flex-1 rounded-xl py-2 text-[11px] font-semibold ring-1",
              i === j ? "bg-(--d) text-white ring-(--d)" : "bg-white text-nuit/65 ring-nuit/8",
            )}
          >
            {x.t}
          </button>
        ))}
      </div>
      <Card className="mt-3 grid items-center gap-4 @min-[600px]:grid-cols-[1fr_1.1fr]">
        <svg
          viewBox="0 0 240 120"
          className="w-full"
          fill="none"
          stroke="var(--p)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {c.svg}
        </svg>
        <div>
          <p className="text-[13px] font-bold text-nuit">Charpente {c.t.toLowerCase()}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-nuit/60">{c.d}</p>
          <Btn to="contact" param={`Charpente ${c.t.toLowerCase()}`} tone="dark" className="mt-3">
            Demander une visite
          </Btn>
        </div>
      </Card>
    </SubPage>
  );
}

const ossatures = [
  {
    id: "extension",
    I: HomeIcon,
    t: "Extension",
    d: "De 15 à 40 m², sans gros œuvre lourd.",
    s: "2 à 4 semaines",
  },
  {
    id: "surelevation",
    I: Warehouse,
    t: "Surélévation",
    d: "Un étage en plus, léger pour la structure existante.",
    s: "4 à 6 semaines",
  },
  {
    id: "annexe",
    I: Hammer,
    t: "Annexe / atelier",
    d: "Bureau de jardin, atelier ou abri isolé.",
    s: "1 à 2 semaines",
  },
];

function Ossature() {
  const [sel, setSel] = useState("extension");
  const [m2, setM2] = useState(25);
  const o = ossatures.find((x) => x.id === sel) ?? ossatures[0];
  return (
    <SubPage
      eyebrow="Ossature bois"
      title="Agrandir avec le bois"
      intro="Choisissez un type de projet et une surface."
      visual="ossature"
    >
      <div className="grid gap-2.5 @min-[600px]:grid-cols-3">
        {ossatures.map(({ id, I, t, d }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSel(id)}
            aria-pressed={sel === id}
            className={cn(
              "rounded-xl bg-white p-3.5 text-left ring-1",
              sel === id ? "ring-2 ring-(--p)" : "ring-nuit/8",
            )}
          >
            <I className="size-5 text-(--p)" />
            <p className="mt-2 text-[12px] font-bold text-nuit">{t}</p>
            <p className="mt-0.5 text-[10px] text-nuit/55">{d}</p>
          </button>
        ))}
      </div>
      <Card className="mt-3">
        <label className="block">
          <span className="flex items-center justify-between text-[10px] font-semibold text-nuit/60">
            Surface souhaitée <span className="text-[13px] font-bold text-(--d)">{m2} m²</span>
          </span>
          <input
            type="range"
            min={10}
            max={60}
            value={m2}
            onChange={(e) => setM2(Number(e.target.value))}
            className="mt-1 w-full accent-(--p)"
          />
        </label>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-nuit/65">
            {o.t} de {m2} m² · chantier estimé : <span className="font-bold text-nuit">{o.s}</span>
          </p>
          <Btn to="contact" param={`${o.t} ossature bois, ${m2} m²`}>
            Étudier mon projet
          </Btn>
        </div>
      </Card>
    </SubPage>
  );
}

function Contact() {
  const { param } = useMini();
  return (
    <SubPage eyebrow="Contact" title="Parlons de votre projet">
      <div className="grid gap-3 @min-[600px]:grid-cols-[1.3fr_1fr]">
        <Card>
          <DemoForm
            submitLabel={
              <>
                <Send className="size-3.5" /> Envoyer
              </>
            }
            success={{
              title: "Demande transmise",
              text: "L'atelier vous recontacte pour organiser une visite.",
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
                placeholder="Décrivez votre projet"
              />
            </div>
            <div className="mt-2.5">
              <UploadField />
            </div>
          </DemoForm>
        </Card>
        <div className="rounded-2xl bg-(--d) p-4 text-white">
          <p className="text-[12px] font-bold">Atelier et secteur</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-white/65">
            Faulquemont, Créhange, Courcelles-Chaussy, Rémilly, Pange et alentours.
          </p>
        </div>
      </div>
    </SubPage>
  );
}

export function CharpentierSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      icon={Trees}
      info={info}
      font="condensed"
      navStyle="caps"
      cta={{ label: "Demander un devis", page: "contact" }}
      pages={[
        { id: "home", label: "Accueil", path: "/", render: () => <Home /> },
        { id: "charpente", label: "Charpente", path: "/charpente", render: () => <Charpente /> },
        {
          id: "ossature",
          label: "Ossature bois",
          path: "/ossature-bois",
          render: () => <Ossature />,
        },
        { id: "contact", label: "Contact", path: "/contact", render: () => <Contact /> },
      ]}
    />
  );
}
