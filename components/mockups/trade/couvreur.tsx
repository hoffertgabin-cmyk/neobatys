"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  FileText,
  House,
  LayoutDashboard,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Btn, Card, Choice, MiniSite, useMini, type SiteProps } from "./kit";

type Status = "Signé" | "Envoyé" | "Relance J+3" | "Relance J+7";
type Quote = { n: string; c: string; t: string; a: number; s: Status };

const initialQuotes: Quote[] = [
  { n: "2026-087", c: "M. et Mme B.", t: "Réfection toiture 120 m²", a: 18400, s: "Signé" },
  { n: "2026-088", c: "SCI Les Tilleuls", t: "Remplacement gouttières", a: 2350, s: "Relance J+3" },
  { n: "2026-089", c: "Mme D.", t: "Démoussage et hydrofuge", a: 1680, s: "Envoyé" },
  { n: "2026-090", c: "M. K.", t: "Pose de 2 fenêtres de toit", a: 3900, s: "Relance J+7" },
  { n: "2026-091", c: "Mairie (exemple)", t: "Réparation faîtage", a: 960, s: "Signé" },
  { n: "2026-092", c: "M. L.", t: "Isolation des combles", a: 6200, s: "Envoyé" },
  { n: "2026-093", c: "Mme P.", t: "Zinguerie et noues", a: 2780, s: "Relance J+3" },
];

const tone: Record<Status, string> = {
  Signé: "bg-emerald-100 text-emerald-800",
  Envoyé: "bg-slate-200 text-slate-700",
  "Relance J+3": "bg-amber-100 text-amber-800",
  "Relance J+7": "bg-amber-100 text-amber-800",
};

const euro = (n: number) => `${n.toLocaleString("fr-FR")} €`;

function Header({ title, action }: { title: string; action?: React.ReactNode }) {
  const { project } = useMini();
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-[10px] text-nuit/50">{project.brand} · Logiciel</p>
        <p className="font-display text-[17px] leading-tight font-bold text-(--d) @min-[600px]:text-[20px]">
          {title}
        </p>
      </div>
      {action}
    </div>
  );
}

function NewQuoteBtn() {
  return (
    <Btn to="nouveau" className="shrink-0 bg-(--a) px-3 py-1.5 whitespace-nowrap text-white">
      <Plus className="size-3.5" /> Nouveau
      <span className="hidden @min-[600px]:inline"> devis</span>
    </Btn>
  );
}

function Dashboard() {
  const signed = initialQuotes.filter((q) => q.s === "Signé");
  return (
    <div className="min-h-full bg-(--s) px-4 py-5 @min-[600px]:px-6">
      <Header title="Tableau de bord" action={<NewQuoteBtn />} />
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { l: "Devis ce mois", v: String(initialQuotes.length) },
          { l: "Signés", v: String(signed.length) },
          { l: "CA signé", v: euro(signed.reduce((s, q) => s + q.a, 0)) },
        ].map(({ l, v }) => (
          <Card key={l} className="p-3">
            <p className="text-[10px] text-nuit/55">{l}</p>
            <p className="mt-1 font-display text-[15px] font-bold whitespace-nowrap text-(--d) @min-[600px]:text-[22px]">
              {v}
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid gap-3 @min-[600px]:grid-cols-[1.4fr_1fr]">
        <Card className="p-0">
          <p className="flex items-center justify-between px-3 pt-3 text-[11px] font-bold text-nuit">
            Derniers devis
            <Btn to="devis" tone="ghost" className="px-2.5 py-1 text-[10px]">
              Tout voir
            </Btn>
          </p>
          {initialQuotes.slice(0, 4).map((q) => (
            <div
              key={q.n}
              className="flex items-center gap-2 border-t border-nuit/6 px-3 py-2.5 first-of-type:mt-2"
            >
              <FileText className="size-3.5 shrink-0 text-(--p)/60" />
              <span className="flex-1 truncate text-[11px] font-semibold text-nuit">{q.t}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold", tone[q.s])}>
                {q.s}
              </span>
            </div>
          ))}
        </Card>
        <div className="space-y-3">
          <div className="rounded-xl bg-(--d) p-3.5 text-white">
            <p className="flex items-center gap-1.5 text-[11px] font-bold">
              <Bell className="size-3.5 text-(--a)" /> 3 relances programmées
            </p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-white/65">
              Les clients qui n&apos;ont pas répondu sont relancés automatiquement.
            </p>
            <Btn to="relances" className="mt-2.5 bg-white/10 py-1.5 text-[10px] text-white">
              Régler les relances
            </Btn>
          </div>
          <Card className="p-3.5">
            <p className="text-[10px] text-nuit/55">Taux de signature</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-(--s)">
              <span className="block h-full w-[64%] rounded-full bg-(--a)" />
            </div>
            <p className="mt-1.5 text-[11px] font-bold text-(--d)">64 %</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Devis() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [filter, setFilter] = useState<"Tous" | "À relancer" | "Signés">("Tous");
  const [open, setOpen] = useState<string | null>(null);
  const shown = quotes.filter(
    (q) =>
      filter === "Tous" ||
      (filter === "Signés" ? q.s === "Signé" : q.s.startsWith("Relance") || q.s === "Envoyé"),
  );
  const q = quotes.find((x) => x.n === open);
  const update = (n: string, s: Status) =>
    setQuotes((all) => all.map((x) => (x.n === n ? { ...x, s } : x)));

  return (
    <div className="min-h-full bg-(--s) px-4 py-5 @min-[600px]:px-6">
      <Header title="Devis" action={<NewQuoteBtn />} />
      <Choice
        options={["Tous", "À relancer", "Signés"] as const}
        value={filter}
        onChange={setFilter}
        className="mt-3"
        activeClassName="bg-(--d) text-white ring-(--d)"
      />
      <div className="mt-3 grid gap-3 @min-[600px]:grid-cols-[1.4fr_1fr]">
        <Card className="p-0">
          {shown.map((x, i) => (
            <button
              key={x.n}
              type="button"
              onClick={() => setOpen(x.n)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-(--s)",
                i > 0 && "border-t border-nuit/6",
                open === x.n && "bg-(--s)",
              )}
            >
              <FileText className="size-3.5 shrink-0 text-(--p)/60" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold text-nuit">{x.t}</span>
                <span className="block text-[9px] text-nuit/50">
                  {x.n} · {x.c}
                </span>
              </span>
              <span className="text-[11px] text-nuit/70">{euro(x.a)}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold", tone[x.s])}>
                {x.s}
              </span>
            </button>
          ))}
        </Card>
        {q ? (
          <Card>
            <div className="flex items-start justify-between">
              <p className="text-[9px] font-semibold tracking-wide text-nuit/50 uppercase">
                Devis {q.n}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Fermer"
                className="text-nuit/40 hover:text-nuit"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-1 text-[13px] font-bold text-nuit">{q.t}</p>
            <p className="text-[10px] text-nuit/55">{q.c}</p>
            <p className="mt-2 font-display text-[20px] font-bold text-(--d)">{euro(q.a)} HT</p>
            <span
              className={cn(
                "mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold",
                tone[q.s],
              )}
            >
              {q.s}
            </span>
            {q.s !== "Signé" ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Btn
                  onClick={() => update(q.n, "Relance J+3")}
                  className="bg-(--a) py-1.5 text-[11px] text-white"
                >
                  <Send className="size-3.5" /> Relancer maintenant
                </Btn>
                <Btn
                  tone="ghost"
                  onClick={() => update(q.n, "Signé")}
                  className="py-1.5 text-[11px]"
                >
                  <Check className="size-3.5" /> Marquer signé
                </Btn>
              </div>
            ) : (
              <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <Check className="size-3.5" /> Facture d&apos;acompte prête à envoyer
              </p>
            )}
          </Card>
        ) : (
          <div className="grid place-items-center rounded-2xl border border-dashed border-nuit/15 p-4 text-center text-[11px] text-nuit/45">
            Cliquez sur un devis pour l&apos;ouvrir
          </div>
        )}
      </div>
    </div>
  );
}

const catalog = [
  { l: "Dépose et évacuation tuiles (m²)", p: 18 },
  { l: "Tuiles terre cuite posées (m²)", p: 62 },
  { l: "Écran sous-toiture (m²)", p: 14 },
  { l: "Gouttière zinc (ml)", p: 48 },
  { l: "Fenêtre de toit posée (u)", p: 1150 },
];

function Nouveau() {
  const [lines, setLines] = useState([
    { i: 1, q: 40 },
    { i: 3, q: 12 },
  ]);
  const [sent, setSent] = useState(false);
  const total = lines.reduce((s, l) => s + catalog[l.i].p * l.q, 0);
  if (sent) {
    return (
      <div className="grid min-h-full place-items-center bg-(--s) p-6 text-center">
        <div>
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="size-6" />
          </span>
          <p className="mt-3 text-[14px] font-bold text-nuit">Devis envoyé au client</p>
          <p className="mt-1 text-[11px] text-nuit/60">
            Total {euro(total)} HT. Une relance partira automatiquement dans 3 jours sans réponse.
          </p>
          <Btn to="devis" tone="dark" className="mt-4">
            Voir les devis
          </Btn>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-full bg-(--s) px-4 py-5 @min-[600px]:px-6">
      <Header title="Nouveau devis" />
      <Card className="mt-3 p-0">
        {lines.map((l, k) => (
          <div
            key={k}
            className="flex flex-wrap items-center gap-2 border-b border-nuit/6 px-3 py-2 @min-[600px]:flex-nowrap"
          >
            <select
              value={l.i}
              onChange={(e) =>
                setLines(lines.map((x, j) => (j === k ? { ...x, i: Number(e.target.value) } : x)))
              }
              className="min-w-0 basis-full rounded-md bg-(--s) px-2 py-1.5 text-[16px] text-nuit outline-none @min-[600px]:flex-1 @min-[600px]:basis-auto @min-[600px]:text-[11px]"
            >
              {catalog.map((c, i) => (
                <option key={c.l} value={i}>
                  {c.l}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={l.q}
              onChange={(e) =>
                setLines(
                  lines.map((x, j) =>
                    j === k ? { ...x, q: Math.max(1, Number(e.target.value)) } : x,
                  ),
                )
              }
              className="w-14 rounded-md bg-(--s) px-2 py-1.5 text-right text-[16px] outline-none @min-[600px]:text-[11px]"
              aria-label="Quantité"
            />
            <span className="ml-auto w-20 text-right text-[11px] font-semibold text-nuit">
              {euro(catalog[l.i].p * l.q)}
            </span>
            <button
              type="button"
              onClick={() => setLines(lines.filter((_, j) => j !== k))}
              aria-label="Supprimer la ligne"
              className="text-nuit/35 hover:text-red-600"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between px-3 py-2.5">
          <button
            type="button"
            onClick={() => setLines([...lines, { i: 0, q: 1 }])}
            className="flex items-center gap-1 text-[11px] font-semibold text-(--a)"
          >
            <Plus className="size-3.5" /> Ajouter une ligne
          </button>
          <span className="text-[12px] font-bold text-(--d)">Total HT {euro(total)}</span>
        </div>
      </Card>
      <div className="mt-3 flex justify-end gap-2">
        <Btn tone="light" to="devis">
          Annuler
        </Btn>
        <Btn onClick={() => setSent(true)} className="bg-(--a) text-white">
          <Send className="size-3.5" /> Enregistrer et envoyer
        </Btn>
      </div>
    </div>
  );
}

const clients = [
  { n: "M. et Mme B.", c: "Hayange", d: 2 },
  { n: "SCI Les Tilleuls", c: "Thionville", d: 1 },
  { n: "Mme D.", c: "Florange", d: 1 },
  { n: "M. K.", c: "Fameck", d: 3 },
  { n: "M. L.", c: "Uckange", d: 1 },
  { n: "Mme P.", c: "Algrange", d: 2 },
];

function Clients() {
  const [q, setQ] = useState("");
  const list = clients.filter((c) => `${c.n} ${c.c}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="min-h-full bg-(--s) px-4 py-5 @min-[600px]:px-6">
      <Header title="Clients" />
      <label className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-nuit/10 focus-within:ring-2 focus-within:ring-(--p)">
        <Search className="size-4 text-nuit/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un client ou une ville"
          className="min-w-0 flex-1 bg-transparent text-[16px] outline-none @min-[600px]:text-[12px]"
        />
      </label>
      <div className="mt-3 grid gap-2 @min-[600px]:grid-cols-2">
        {list.map((c) => (
          <Card key={c.n} className="flex items-center gap-3 p-3">
            <span className="grid size-9 place-items-center rounded-full bg-(--d) text-[11px] font-bold text-white">
              {c.n.replace(/[^A-Z]/g, "").slice(0, 2)}
            </span>
            <span className="flex-1">
              <span className="block text-[12px] font-bold text-nuit">{c.n}</span>
              <span className="block text-[10px] text-nuit/55">{c.c}</span>
            </span>
            <span className="text-[10px] font-semibold text-(--p)">{c.d} devis</span>
          </Card>
        ))}
        {list.length === 0 && <p className="text-[11px] text-nuit/50">Aucun client trouvé.</p>}
      </div>
    </div>
  );
}

function Relances() {
  const [on, setOn] = useState({ j3: true, j7: true, j15: false });
  const [msg, setMsg] = useState(
    "Bonjour, avez-vous pu consulter notre devis ? Nous restons disponibles pour en parler.",
  );
  const rows = [
    { k: "j3" as const, l: "3 jours après l'envoi", d: "Message court et poli" },
    { k: "j7" as const, l: "7 jours après l'envoi", d: "Rappel avec le devis joint" },
    { k: "j15" as const, l: "15 jours après l'envoi", d: "Proposition d'un appel" },
  ];
  return (
    <div className="min-h-full bg-(--s) px-4 py-5 @min-[600px]:px-6">
      <Header title="Relances automatiques" />
      <div className="mt-3 grid gap-3 @min-[600px]:grid-cols-2">
        <Card className="space-y-2.5">
          {rows.map((r) => (
            <div key={r.k} className="flex items-center justify-between gap-3">
              <span>
                <span className="block text-[12px] font-bold text-nuit">{r.l}</span>
                <span className="block text-[10px] text-nuit/55">{r.d}</span>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={on[r.k]}
                aria-label={r.l}
                onClick={() => setOn({ ...on, [r.k]: !on[r.k] })}
                className={cn(
                  "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                  on[r.k] ? "bg-(--a)" : "bg-nuit/15",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 size-4 rounded-full bg-white shadow transition-[left]",
                    on[r.k] ? "left-[18px]" : "left-0.5",
                  )}
                />
              </button>
            </div>
          ))}
        </Card>
        <Card>
          <p className="text-[10px] font-semibold text-nuit/70">Message de relance</p>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={3}
            className="mt-1 w-full resize-none rounded-lg bg-(--s) p-2.5 text-[16px] leading-relaxed outline-none focus:ring-2 focus:ring-(--p) @min-[600px]:text-[11px]"
          />
          <p className="mt-2 text-[10px] font-semibold text-nuit/50">Aperçu reçu par le client</p>
          <p className="mt-1 rounded-lg bg-(--d) p-2.5 text-[10px] leading-relaxed text-white/85">
            « {msg} »
          </p>
        </Card>
      </div>
    </div>
  );
}

export function CouvreurSite(props: SiteProps) {
  return (
    <MiniSite
      {...props}
      app
      icon={House}
      pages={[
        {
          id: "dashboard",
          label: "Tableau de bord",
          path: "/",
          render: () => <Dashboard />,
          icon: LayoutDashboard,
        },
        { id: "devis", label: "Devis", path: "/devis", render: () => <Devis />, icon: FileText },
        {
          id: "clients",
          label: "Clients",
          path: "/clients",
          render: () => <Clients />,
          icon: Users,
        },
        {
          id: "relances",
          label: "Relances",
          path: "/relances",
          render: () => <Relances />,
          icon: Bell,
        },
        {
          id: "nouveau",
          label: "Nouveau devis",
          path: "/devis/nouveau",
          render: () => <Nouveau />,
          inNav: false,
        },
      ]}
    />
  );
}
