"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Check,
  Clock,
  FileText,
  FolderDown,
  LayoutDashboard,
  Loader2,
  Mail,
  Minus,
  PenLine,
  Plus,
  Receipt,
  RotateCcw,
  Send,
  ShieldCheck,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { softwareTour } from "@/content/software";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ------------------------------------------------------------ Données d'exemple */

const library = [
  { id: "carrelage", label: "Pose carrelage sol", unit: "m²", price: 45 },
  { id: "ragreage", label: "Ragréage du support", unit: "m²", price: 18 },
  { id: "depose", label: "Dépose de l'ancien sol", unit: "m²", price: 14 },
  { id: "plinthes", label: "Plinthes assorties", unit: "ml", price: 12 },
  { id: "deplacement", label: "Déplacement", unit: "forfait", price: 40 },
] as const;

type ItemId = (typeof library)[number]["id"];
type Line = { id: ItemId; qty: number };

const VAT = 0.1;
const QUOTE = "D-2026-042";
const INVOICE = "F-2026-118";
const deposits = [30, 40, 50, 100] as const;

const euro = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const icons: LucideIcon[] = [FileText, PenLine, Receipt, BellRing, LayoutDashboard, FolderDown];

/* ------------------------------------------------------------------- Éléments */

/** Bouton qui fait avancer la démo, avec un halo pour attirer l'œil. */
function NextAction({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex items-center gap-2 rounded-full bg-chantier px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgb(249_115_22/0.8)] transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nuit"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-ping rounded-full bg-chantier/40 [animation-duration:1.8s]"
      />
      <span className="relative flex items-center gap-2">
        {children} <ArrowRight aria-hidden="true" className="size-4" />
      </span>
    </button>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl bg-white p-4 ring-1 ring-nuit/8", className)}>{children}</div>
  );
}

function ScreenTitle({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <p className="text-xs text-ardoise">{kicker}</p>
        <p className="text-lg font-bold text-nuit">{title}</p>
      </div>
      {aside}
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-chantier" : "bg-nuit/15",
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 size-4 rounded-full bg-white shadow transition-transform",
          on && "translate-x-5",
        )}
      />
    </button>
  );
}

/* ---------------------------------------------------------------------- Écrans */

type Totals = { ht: number; vat: number; ttc: number };

function QuoteScreen({
  lines,
  setLines,
  totals,
  next,
}: {
  lines: Line[];
  setLines: (l: Line[]) => void;
  totals: Totals;
  next: () => void;
}) {
  const setQty = (id: ItemId, qty: number) =>
    setLines(lines.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
  const missing = library.filter((i) => !lines.some((l) => l.id === i.id));
  return (
    <div className="space-y-3">
      <ScreenTitle
        kicker={`Devis ${QUOTE} · Client exemple`}
        title="Carrelage cuisine"
        aside={
          <span className="rounded-full bg-nuit/5 px-2.5 py-1 text-xs font-semibold text-ardoise-dark">
            Brouillon
          </span>
        }
      />
      <Panel className="p-0">
        <ul className="divide-y divide-nuit/6">
          {lines.map((l) => {
            const item = library.find((i) => i.id === l.id)!;
            return (
              <li key={l.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3">
                <span className="min-w-0 flex-1 basis-40">
                  <span className="block text-sm font-semibold text-nuit">{item.label}</span>
                  <span className="text-xs text-ardoise">
                    {euro(item.price)} / {item.unit}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Diminuer ${item.label}`}
                    onClick={() => setQty(l.id, l.qty - 1)}
                    className="grid size-8 place-items-center rounded-lg bg-sable text-nuit hover:bg-sable-dark"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums">
                    {l.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Augmenter ${item.label}`}
                    onClick={() => setQty(l.id, l.qty + 1)}
                    className="grid size-8 place-items-center rounded-lg bg-sable text-nuit hover:bg-sable-dark"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </span>
                <span className="ml-auto w-24 text-right text-sm font-bold tabular-nums">
                  {euro(item.price * l.qty)}
                </span>
                <button
                  type="button"
                  aria-label={`Retirer ${item.label}`}
                  disabled={lines.length < 2}
                  onClick={() => setLines(lines.filter((x) => x.id !== l.id))}
                  className="grid size-8 place-items-center rounded-lg text-ardoise hover:bg-sable hover:text-nuit disabled:opacity-30"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
        {missing.length > 0 && (
          <div className="border-t border-nuit/6 bg-sable/60 px-4 py-3">
            <p className="text-xs font-semibold text-ardoise-dark">
              Votre bibliothèque d&apos;ouvrages
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {missing.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  onClick={() =>
                    setLines([...lines, { id: i.id, qty: i.unit === "forfait" ? 1 : 20 }])
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-nuit ring-1 ring-nuit/10 hover:ring-chantier"
                >
                  <Plus className="size-3 text-chantier" /> {i.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Panel>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {["TVA 10 % rénovation", "Validité 30 jours", "Mentions légales"].map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-full bg-menthe px-2.5 py-1 text-xs font-medium text-emerald-800"
            >
              <Check className="size-3" /> {t}
            </span>
          ))}
        </div>
        <dl className="min-w-48 text-sm">
          <div className="flex justify-between text-ardoise-dark">
            <dt>Total HT</dt>
            <dd className="tabular-nums">{euro(totals.ht)}</dd>
          </div>
          <div className="flex justify-between text-ardoise-dark">
            <dt>TVA 10 %</dt>
            <dd className="tabular-nums">{euro(totals.vat)}</dd>
          </div>
          <div className="mt-1 flex justify-between border-t border-nuit/10 pt-1 text-base font-bold">
            <dt>Total TTC</dt>
            <dd className="tabular-nums">{euro(totals.ttc)}</dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-end">
        <NextAction onClick={next}>Envoyer au client</NextAction>
      </div>
    </div>
  );
}

function SignatureScreen({
  totals,
  signed,
  sign,
  next,
}: {
  totals: Totals;
  signed: boolean;
  sign: () => void;
  next: () => void;
}) {
  return (
    <div className="grid gap-5 @min-[560px]:grid-cols-[230px_1fr]">
      {/* Ce que voit le client */}
      <div className="mx-auto w-full max-w-[230px] rounded-[2rem] bg-nuit p-2 shadow-lift">
        <div className="overflow-hidden rounded-[1.6rem] bg-white">
          <div className="bg-sable px-4 pt-5 pb-3">
            <p className="text-[11px] text-ardoise">Téléphone du client</p>
            <p className="text-sm font-bold">Devis {QUOTE}</p>
            <p className="text-xs text-ardoise-dark">Carrelage cuisine</p>
          </div>
          <div className="space-y-3 p-4">
            <p className="flex justify-between text-sm">
              <span className="text-ardoise-dark">Total TTC</span>
              <span className="font-bold tabular-nums">{euro(totals.ttc)}</span>
            </p>
            <button
              type="button"
              onClick={sign}
              disabled={signed}
              aria-label={signed ? "Devis signé" : "Signer le devis"}
              className={cn(
                "relative grid h-24 w-full place-items-center rounded-xl border-2 border-dashed text-xs transition-colors",
                signed
                  ? "border-emerald-300 bg-menthe"
                  : "border-nuit/15 text-ardoise hover:border-chantier hover:text-nuit",
              )}
            >
              {signed ? (
                <svg viewBox="0 0 160 60" className="h-14 w-40 text-nuit" aria-hidden="true">
                  <path
                    d="M8 42 C 20 10, 30 10, 34 38 S 50 52, 58 26 S 76 8, 80 34 S 96 50, 108 28 C 116 16, 124 20, 128 34 S 140 44, 152 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="[stroke-dasharray:400] [stroke-dashoffset:400] motion-safe:animate-sign motion-reduce:[stroke-dashoffset:0]"
                  />
                </svg>
              ) : (
                <span className="flex flex-col items-center gap-1">
                  <PenLine className="size-5" /> Touchez pour signer
                </span>
              )}
            </button>
            <p
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold",
                signed ? "bg-emerald-600 text-white" : "bg-nuit/5 text-ardoise",
              )}
            >
              {signed ? (
                <>
                  <Check className="size-3.5" /> Bon pour accord
                </>
              ) : (
                "En attente de signature"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Ce que voit l'artisan */}
      <div className="space-y-3">
        <ScreenTitle kicker="Vos notifications" title="Suivi du devis" />
        <Panel className="space-y-3">
          <p className="flex items-start gap-2.5 text-sm">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ciel text-sky-700">
              <Mail className="size-3.5" />
            </span>
            <span>
              <span className="font-semibold">Devis envoyé</span> par e-mail et SMS
              <span className="block text-xs text-ardoise">À l&apos;instant</span>
            </span>
          </p>
          <p className="flex items-start gap-2.5 text-sm">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ciel text-sky-700">
              <FileText className="size-3.5" />
            </span>
            <span>
              <span className="font-semibold">Devis ouvert</span> par le client
              <span className="block text-xs text-ardoise">Il y a quelques secondes</span>
            </span>
          </p>
          {signed ? (
            <p className="flex items-start gap-2.5 rounded-lg bg-menthe p-2.5 text-sm text-emerald-900">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                <BellRing className="size-3.5" />
              </span>
              <span>
                <span className="font-semibold">Devis signé !</span> {euro(totals.ttc)} TTC
                <span className="block text-xs text-emerald-800/80">
                  Le PDF signé est rangé dans le dossier client.
                </span>
              </span>
            </p>
          ) : (
            <p className="rounded-lg bg-peche px-3 py-2.5 text-sm text-ardoise-dark">
              Jouez le client : touchez le cadre de signature sur le téléphone.
            </p>
          )}
        </Panel>
        {signed && (
          <div className="flex justify-end">
            <NextAction onClick={next}>Facturer l&apos;acompte</NextAction>
          </div>
        )}
      </div>
    </div>
  );
}

function InvoiceScreen({
  totals,
  deposit,
  setDeposit,
  invoiced,
  invoice,
  next,
}: {
  totals: Totals;
  deposit: number;
  setDeposit: (d: (typeof deposits)[number]) => void;
  invoiced: boolean;
  invoice: () => void;
  next: () => void;
}) {
  const amount = (totals.ttc * deposit) / 100;
  return (
    <div className="space-y-3">
      <ScreenTitle kicker={`Depuis le devis ${QUOTE}`} title="Nouvelle facture" />
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Montant à facturer">
        {deposits.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={deposit === d}
            disabled={invoiced}
            onClick={() => setDeposit(d)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 transition-colors disabled:cursor-default",
              deposit === d
                ? "bg-nuit text-white ring-nuit"
                : "bg-white text-ardoise-dark ring-nuit/10 hover:text-nuit",
            )}
          >
            {d === 100 ? "Facture totale" : `Acompte ${d} %`}
          </button>
        ))}
      </div>
      <Panel className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs text-ardoise">Facture n°</p>
            <p className="font-bold">{INVOICE}</p>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              invoiced ? "bg-ciel text-sky-800" : "bg-nuit/5 text-ardoise-dark",
            )}
          >
            {invoiced ? "Envoyée" : "Prête"}
          </span>
        </div>
        <p className="flex justify-between gap-3 border-y border-nuit/6 py-2.5 text-sm">
          <span>
            {deposit === 100 ? "Solde des travaux" : `Acompte de ${deposit} %`} · devis {QUOTE}
          </span>
          <span className="font-bold tabular-nums">{euro(amount)}</span>
        </p>
        <ul className="grid gap-1 text-xs text-ardoise-dark @min-[560px]:grid-cols-2">
          {[
            "Numérotation qui se suit",
            "SIRET : [SIRET]",
            "Échéance à 30 jours",
            "Pénalités et indemnité de 40 €",
            "Assurance professionnelle",
            "Format électronique conforme",
          ].map((m) => (
            <li key={m} className="flex items-center gap-1.5">
              <Check className="size-3 text-emerald-600" /> {m}
            </li>
          ))}
        </ul>
      </Panel>
      <div className="flex justify-end">
        {invoiced ? (
          <NextAction onClick={next}>Et si le client oublie de payer ?</NextAction>
        ) : (
          <button
            type="button"
            onClick={invoice}
            className="inline-flex items-center gap-2 rounded-full bg-nuit px-4 py-2.5 text-sm font-semibold text-white hover:bg-acier"
          >
            <Send className="size-4" /> Créer et envoyer la facture
          </button>
        )}
      </div>
    </div>
  );
}

const reminderSteps = [
  { id: "j7", day: "J+7", title: "Rappel courtois", def: true },
  { id: "j15", day: "J+15", title: "Second rappel", def: true },
  { id: "j30", day: "J+30", title: "Dernier avis avant mise en demeure", def: false },
] as const;

function RemindersScreen({ amount, next }: { amount: number; next: () => void }) {
  const [on, setOn] = useState<Record<string, boolean>>(
    Object.fromEntries(reminderSteps.map((r) => [r.id, r.def])),
  );
  return (
    <div className="space-y-3">
      <ScreenTitle kicker={`Facture ${INVOICE} · ${euro(amount)}`} title="Relances automatiques" />
      <div className="grid gap-3 @min-[560px]:grid-cols-[1fr_1.1fr]">
        <Panel className="space-y-3">
          <p className="flex items-center gap-3 text-sm">
            <span className="w-11 shrink-0 rounded-md bg-nuit/5 py-1 text-center text-xs font-bold">
              J0
            </span>
            <span className="flex-1">Facture envoyée</span>
            <Check className="size-4 text-emerald-600" />
          </p>
          {reminderSteps.map((r) => (
            <div key={r.id} className="flex items-center gap-3 text-sm">
              <span className="w-11 shrink-0 rounded-md bg-peche py-1 text-center text-xs font-bold text-chantier-dark">
                {r.day}
              </span>
              <span className={cn("flex-1", !on[r.id] && "text-ardoise line-through")}>
                {r.title}
              </span>
              <Toggle
                on={on[r.id]}
                label={`${r.title} à ${r.day}`}
                onChange={() => setOn({ ...on, [r.id]: !on[r.id] })}
              />
            </div>
          ))}
          <p className="text-xs text-ardoise">
            Les relances s&apos;arrêtent d&apos;elles-mêmes dès que le paiement arrive.
          </p>
        </Panel>
        <Panel className="bg-sable">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-ardoise-dark">
            <Mail className="size-3.5" /> E-mail envoyé à J+7
          </p>
          <div className="mt-2 rounded-lg bg-white p-3 text-sm leading-relaxed text-nuit/80 ring-1 ring-nuit/6">
            Bonjour,
            <br />
            Sauf erreur de notre part, la facture {INVOICE} de{" "}
            <strong className="text-nuit">{euro(amount)}</strong> reste à régler. Vous pouvez la
            payer en ligne en un clic :
            <span className="mt-2 block w-fit rounded-md bg-chantier px-3 py-1.5 text-xs font-semibold text-white">
              Payer la facture
            </span>
            <span className="mt-2 block">Merci et bonne journée !</span>
          </div>
        </Panel>
      </div>
      <div className="flex justify-end">
        <NextAction onClick={next}>Le client paie</NextAction>
      </div>
    </div>
  );
}

const months = [
  { m: "Mai", v: 14.2 },
  { m: "Juin", v: 17.8 },
  { m: "Juil.", v: 12.4 },
  { m: "Août", v: 8.1 },
  { m: "Sept.", v: 19.6 },
];

function DashboardScreen({ amount, next }: { amount: number; next: () => void }) {
  const base = { ca: 21480, cash: 15920, unpaid: 2340 };
  const october = (base.ca + amount) / 1000;
  const max = Math.max(...months.map((x) => x.v), october);
  return (
    <div className="space-y-3">
      <ScreenTitle
        kicker="Octobre 2026 · données d'exemple"
        title="Tableau de bord"
        aside={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-menthe px-2.5 py-1 text-xs font-semibold text-emerald-800">
            <Check className="size-3.5" /> Paiement reçu : {euro(amount)}
          </span>
        }
      />
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Facturé ce mois", v: euro(base.ca + amount), tone: "text-nuit" },
          { l: "Encaissé", v: euro(base.cash + amount), tone: "text-emerald-700" },
          { l: "En attente", v: euro(base.unpaid), tone: "text-chantier-dark" },
        ].map((k) => (
          <Panel key={k.l} className="p-3">
            <p className="text-xs text-ardoise">{k.l}</p>
            <p className={cn("mt-1 text-sm font-bold tabular-nums @min-[560px]:text-xl", k.tone)}>
              {k.v.replace(/,\d+/, "")}
            </p>
          </Panel>
        ))}
      </div>
      <Panel>
        <p className="text-xs font-semibold text-ardoise-dark">Chiffre d&apos;affaires (k€)</p>
        <div className="mt-3 flex h-28 items-end gap-2">
          {[...months, { m: "Oct.", v: october }].map((x, i, all) => (
            <div key={x.m} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <span className="text-[11px] text-ardoise tabular-nums">{x.v.toFixed(1)}</span>
              <span
                className={cn(
                  "w-full rounded-t-md transition-[height] duration-700",
                  i === all.length - 1 ? "bg-chantier" : "bg-nuit/12",
                )}
                style={{ height: `${(x.v / max) * 70}%` }}
              />
              <span className="text-[11px] text-ardoise">{x.m}</span>
            </div>
          ))}
        </div>
      </Panel>
      <div className="flex justify-end">
        <NextAction onClick={next}>Fin du mois : le comptable</NextAction>
      </div>
    </div>
  );
}

function ExportScreen({ restart }: { restart: () => void }) {
  const [format, setFormat] = useState("Format comptable (FEC)");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const run = () => {
    setState("busy");
    timer.current = setTimeout(() => setState("done"), 1100);
  };
  return (
    <div className="space-y-3">
      <ScreenTitle kicker="Octobre 2026" title="Export comptable" />
      <div className="grid gap-3 @min-[560px]:grid-cols-2">
        <Panel className="space-y-2.5">
          <p className="flex justify-between text-sm">
            <span className="text-ardoise-dark">Factures</span>
            <span className="font-semibold">14</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-ardoise-dark">Paiements reçus</span>
            <span className="font-semibold">11</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-ardoise-dark">Avoirs</span>
            <span className="font-semibold">1</span>
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1" role="group" aria-label="Format d'export">
            {["Format comptable (FEC)", "Excel"].map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={format === f}
                onClick={() => {
                  setFormat(f);
                  setState("idle");
                }}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold ring-1",
                  format === f
                    ? "bg-nuit text-white ring-nuit"
                    : "bg-white text-ardoise-dark ring-nuit/10",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Panel>
        <Panel className="flex flex-col justify-between gap-3 bg-sable">
          <p className="flex items-start gap-2 text-sm text-ardoise-dark">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            Factures électroniques : 14 transmises via une plateforme agréée.
          </p>
          {state === "done" ? (
            <p className="rounded-lg bg-menthe p-3 text-sm text-emerald-900">
              <span className="flex items-center gap-1.5 font-semibold">
                <Check className="size-4" /> export-octobre-2026 prêt
              </span>
              <span className="mt-0.5 block text-xs">
                Envoyé à votre comptable ({format}). Démonstration : rien n&apos;est envoyé.
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={run}
              disabled={state === "busy"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-nuit px-4 py-2.5 text-sm font-semibold text-white hover:bg-acier disabled:opacity-70"
            >
              {state === "busy" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FolderDown className="size-4" />
              )}
              Exporter pour le comptable
            </button>
          )}
        </Panel>
      </div>
      {state === "done" && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-nuit p-4 text-white">
          <p className="text-sm">
            <span className="font-semibold">Chantier bouclé.</span>{" "}
            <span className="text-ardoise-light">Du devis au comptable, sans rien retaper.</span>
          </p>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold hover:bg-white/15"
          >
            <RotateCcw className="size-4" /> Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- Section */

const startLines: Line[] = [
  { id: "carrelage", qty: 20 },
  { id: "ragreage", qty: 20 },
  { id: "plinthes", qty: 18 },
];

export function SoftwareTour() {
  const { steps } = softwareTour;
  const [step, setStep] = useState(0);
  const [lines, setLines] = useState<Line[]>(startLines);
  const [signed, setSigned] = useState(false);
  const [deposit, setDeposit] = useState<(typeof deposits)[number]>(30);
  const [invoiced, setInvoiced] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  const ht = lines.reduce((s, l) => s + library.find((i) => i.id === l.id)!.price * l.qty, 0);
  const totals = { ht, vat: ht * VAT, ttc: ht * (1 + VAT) };
  const amount = (totals.ttc * deposit) / 100;
  const current = steps[step];

  const goTo = (i: number) => {
    // Les étapes s'enchaînent : arriver plus loin valide celles d'avant.
    if (i >= 2) setSigned(true);
    if (i >= 3) setInvoiced(true);
    setStep(i);
    // Sur mobile : on remonte aux étapes pour lire l'explication puis l'écran.
    if (window.innerWidth < 1024) {
      stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      stepsRef.current
        ?.querySelectorAll("li")
        [i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };
  const restart = () => {
    setLines(startLines);
    setSigned(false);
    setDeposit(30);
    setInvoiced(false);
    setStep(0);
  };

  const screens = [
    <QuoteScreen key="q" lines={lines} setLines={setLines} totals={totals} next={() => goTo(1)} />,
    <SignatureScreen
      key="s"
      totals={totals}
      signed={signed}
      sign={() => setSigned(true)}
      next={() => goTo(2)}
    />,
    <InvoiceScreen
      key="i"
      totals={totals}
      deposit={deposit}
      setDeposit={setDeposit}
      invoiced={invoiced}
      invoice={() => setInvoiced(true)}
      next={() => goTo(3)}
    />,
    <RemindersScreen key="r" amount={amount} next={() => goTo(4)} />,
    <DashboardScreen key="d" amount={amount} next={() => goTo(5)} />,
    <ExportScreen key="e" restart={restart} />,
  ];

  return (
    <Section id="demo" theme="sand" pattern aria-labelledby="demo-titre">
      <SectionHeading
        id="demo-titre"
        eyebrow={softwareTour.eyebrow}
        title={softwareTour.title}
        subtitle={softwareTour.subtitle}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        {/* Étapes */}
        <div ref={stepsRef} className="min-w-0 scroll-mt-24 lg:sticky lg:top-28">
          <ol className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {steps.map((s, i) => {
              const I = icons[i];
              const active = i === step;
              return (
                <li key={s.id} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl text-left transition-colors",
                      "px-3 py-2 lg:px-4 lg:py-3",
                      active
                        ? "bg-nuit text-white shadow-lift"
                        : "bg-white text-nuit ring-1 ring-nuit/8 hover:ring-nuit/20",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-xl",
                        active
                          ? "bg-chantier text-white"
                          : i < step
                            ? "bg-menthe text-emerald-700"
                            : "bg-sable text-ardoise-dark",
                      )}
                    >
                      {i < step ? <Check className="size-4" /> : <I className="size-4" />}
                    </span>
                    <span className="text-sm font-semibold whitespace-nowrap">
                      <span
                        className={cn("mr-1.5", active ? "text-ardoise-light" : "text-ardoise")}
                      >
                        {i + 1}.
                      </span>
                      {s.label}
                    </span>
                  </button>
                  {active && (
                    <div className="mt-2 hidden space-y-3 rounded-2xl bg-white p-4 text-sm ring-1 ring-nuit/8 lg:block">
                      <StepText step={s} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          {/* Explication de l'étape, sous les pastilles sur mobile */}
          <div className="mt-3 space-y-3 rounded-2xl bg-white p-4 text-sm ring-1 ring-nuit/8 lg:hidden">
            <p className="font-bold text-nuit">{current.title}</p>
            <StepText step={current} />
          </div>
        </div>

        {/* Écran du logiciel */}
        <div className="min-w-0">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-nuit/8">
            <div className="flex items-center justify-between gap-3 border-b border-nuit/8 bg-nuit px-4 py-3 text-white">
              <span className="flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap">
                <span className="grid size-7 place-items-center rounded-lg bg-chantier">
                  <FileText className="size-4" />
                </span>
                Votre logiciel
              </span>
              <span className="truncate text-xs text-ardoise-light">{softwareTour.example}</span>
            </div>
            <div className="@container bg-sable/70 p-4 sm:p-6">
              <p className="sr-only" aria-live="polite">
                Étape {step + 1} sur {steps.length} : {current.title}
              </p>
              <div key={step} className="motion-safe:animate-tour-in">
                {screens[step]}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-nuit/8 px-4 py-3">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ardoise-dark hover:bg-sable disabled:opacity-30"
              >
                <ArrowLeft className="size-4" /> Précédent
              </button>
              <span className="flex gap-1.5" aria-hidden="true">
                {steps.map((s, i) => (
                  <span
                    key={s.id}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === step ? "w-6 bg-chantier" : "w-1.5 bg-nuit/15",
                    )}
                  />
                ))}
              </span>
              <button
                type="button"
                onClick={() => goTo(Math.min(step + 1, steps.length - 1))}
                disabled={step === steps.length - 1}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-nuit hover:bg-sable disabled:opacity-30"
              >
                Suivant <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function StepText({ step }: { step: (typeof softwareTour.steps)[number] }) {
  return (
    <>
      <p className="text-ardoise-dark">
        <span className="block text-xs font-semibold tracking-wide text-nuit uppercase">Vous</span>
        {step.you}
      </p>
      <p className="text-ardoise-dark">
        <span className="block text-xs font-semibold tracking-wide text-chantier-dark uppercase">
          Le logiciel
        </span>
        {step.software}
      </p>
      <p className="inline-flex items-center gap-1.5 rounded-full bg-menthe px-3 py-1 text-xs font-semibold text-emerald-800">
        <Clock className="size-3.5" /> {step.gain}
      </p>
    </>
  );
}
