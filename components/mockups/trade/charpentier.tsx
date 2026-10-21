"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  FileText,
  Hammer,
  Home as HomeIcon,
  Send,
  Sparkles,
  Trees,
  Warehouse,
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
  SubPage,
  Title,
  useMini,
  type SiteProps,
} from "./kit";

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
    a: "En ce moment, les visites se font sous une semaine et les chantiers démarrent sous 4 à 6 semaines (exemple).",
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

function Home() {
  const { project } = useMini();
  return (
    <>
      <div className="grid gap-5 px-4 pt-5 @min-[600px]:grid-cols-[1fr_1.1fr] @min-[600px]:px-8 @min-[600px]:pt-7">
        <div>
          <Eyebrow className="bg-(--s) text-(--p)">
            <Trees className="size-3" /> Charpente et ossature bois · {project.city}
          </Eyebrow>
          <Title className="mt-3">
            Votre projet bois,
            <br />
            une réponse tout de suite
          </Title>
          <p className="mt-3 text-[12px] leading-relaxed text-nuit/60">
            Posez votre question à l&apos;assistant : il répond, qualifie la demande et la transmet
            à l&apos;atelier avec un brouillon de devis.
          </p>
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
          <div className="mt-4 flex gap-2">
            <Btn to="charpente" tone="ghost" className="px-3 py-1.5 text-[11px]">
              Charpente
            </Btn>
            <Btn to="ossature" tone="ghost" className="px-3 py-1.5 text-[11px]">
              Ossature bois
            </Btn>
          </div>
        </div>
        <Chat />
      </div>
      <MiniFooter />
    </>
  );
}

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
    <SubPage eyebrow="Charpente" title="Trois façons de couvrir">
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
      cta={{ label: "Parler à l'assistant", page: "home" }}
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
