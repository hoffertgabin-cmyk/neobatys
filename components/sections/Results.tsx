import {
  ArrowRight,
  Check,
  Clock,
  PiggyBank,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { results } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

// Mini-illustrations des cartes (données fictives), décoratives
function ClientsVisual() {
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs text-ardoise-dark ring-1 ring-nuit/8">
        <Search className="size-3.5" /> plombier près de chez moi
      </p>
      <div className="rounded-2xl bg-white p-3 ring-1 ring-nuit/8">
        <p className="text-sm font-semibold">Votre entreprise</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-ardoise-dark">
          <span className="flex text-amber-500">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-3 fill-current" />
            ))}
          </span>
          4,9 · avis Google
        </p>
        <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
          <Check className="size-3" /> Nouvelle demande de devis
        </p>
      </div>
    </div>
  );
}

const flow = [
  { title: "Appel reçu", text: "Pendant le chantier" },
  { title: "Analysé", text: "Besoin · urgence" },
  { title: "Devis préparé", text: "Avec vos tarifs" },
  { title: "Rendez-vous calé", text: "Validé par vous" },
];

function AiVisual() {
  return (
    <ol className="grid gap-2 sm:grid-cols-4">
      {flow.map((step, i) => (
        <li key={step.title} className="relative rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          <span className="text-[11px] text-ardoise-light">0{i + 1}</span>
          <p className="mt-1 text-sm font-semibold">{step.title}</p>
          <p className="text-[11px] text-ardoise-light">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

function CostsVisual() {
  return (
    <div className="flex items-center gap-3">
      <ul className="flex-1 space-y-1.5 text-xs text-ardoise-dark">
        {["Logiciel de devis", "Standard téléphonique", "Agence web", "Relances à la main"].map(
          (t) => (
            <li
              key={t}
              className="rounded-lg bg-white/70 px-2.5 py-1.5 line-through decoration-nuit/30"
            >
              {t}
            </li>
          ),
        )}
      </ul>
      <ArrowRight className="size-4 shrink-0 text-ardoise" />
      <span className="rounded-2xl bg-white px-3 py-4 text-center text-xs font-semibold ring-1 ring-nuit/8">
        1 seul
        <br />
        interlocuteur
      </span>
    </div>
  );
}

function TimeVisual() {
  return (
    <div className="space-y-2">
      <p className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-xs text-ardoise-dark ring-1 ring-nuit/8">
        « Salle de bain 6 m², dépose et pose faïence »
      </p>
      <p className="ml-auto w-fit rounded-2xl rounded-br-sm bg-nuit px-3 py-2 text-xs font-semibold text-white">
        Devis PDF prêt <Check className="inline size-3.5 text-emerald-400" />
      </p>
    </div>
  );
}

function CashVisual() {
  return (
    <div className="rounded-2xl bg-white p-3 text-xs ring-1 ring-nuit/8">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Facture n° 2026-041</span>
        <span className="tabular-nums">1 250 €</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
          Relance J+7
        </span>
        <ArrowRight className="size-3 text-ardoise" />
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
          Réglée
        </span>
      </div>
    </div>
  );
}

const cardStyles: Record<string, { Icon: typeof Star; tone: string; visual: React.ReactNode }> = {
  clients: { Icon: TrendingUp, tone: "bg-lavande", visual: <ClientsVisual /> },
  ia: { Icon: Sparkles, tone: "bg-nuit text-white lg:col-span-2", visual: <AiVisual /> },
  couts: { Icon: PiggyBank, tone: "bg-menthe", visual: <CostsVisual /> },
  temps: { Icon: Clock, tone: "bg-peche", visual: <TimeVisual /> },
  tresorerie: { Icon: Wallet, tone: "bg-rose", visual: <CashVisual /> },
};

/** Grille des leviers : clients, IA, coûts, temps, trésorerie. */
export function Results() {
  return (
    <Section id="resultats" theme="sand" aria-labelledby="resultats-titre">
      <SectionHeading
        id="resultats-titre"
        align="left"
        eyebrow={results.eyebrow}
        title={results.title}
        subtitle={results.subtitle}
      />
      <Stagger as="ul" className="mt-14 grid gap-4 lg:grid-cols-3">
        {results.cards.map((card, i) => {
          const { Icon, tone, visual } = cardStyles[card.id];
          const dark = card.id === "ia";
          return (
            <StaggerItem
              as="li"
              key={card.id}
              className={cn(
                "flex flex-col justify-between gap-8 rounded-3xl p-7 ring-1 ring-nuit/5 sm:p-8",
                tone,
              )}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-xl",
                      dark ? "bg-white/10 text-chantier-light" : "bg-white text-nuit shadow-soft",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span
                    className={cn(
                      "text-sm tabular-nums",
                      dark ? "text-ardoise-light" : "text-ardoise",
                    )}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl tracking-[-0.03em]">{card.title}</h3>
                <p
                  className={cn(
                    "mt-2 max-w-xl leading-relaxed",
                    dark ? "text-ardoise-light" : "text-ardoise-dark",
                  )}
                >
                  {card.text}
                </p>
              </div>
              <div aria-hidden="true">{visual}</div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
