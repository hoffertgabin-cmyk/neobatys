"use client";

import { useId, useState } from "react";
import { computeTva } from "@/lib/tva";
import { cn } from "@/lib/utils";

type Labels = {
  title: string;
  amount: string;
  from: { ht: string; ttc: string };
  rate: string;
  rates: { value: number; label: string }[];
  results: { ht: string; tva: string; ttc: string };
  note: string;
};

const euro = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const field =
  "mt-2 block h-12 w-full rounded-xl bg-white px-4 text-base text-nuit ring-1 ring-nuit/15 focus:ring-2 focus:ring-chantier focus:outline-none";

/** Calculateur HT / TVA / TTC aux taux du bâtiment. Rien n'est envoyé : tout se calcule dans le navigateur. */
export function TvaCalculator({ labels }: { labels: Labels }) {
  const id = useId();
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState<"ht" | "ttc">("ht");
  const [rate, setRate] = useState(labels.rates[0].value);
  // Virgule française acceptée
  const value = Number(amount.replace(/\s/g, "").replace(",", "."));
  const result = Number.isFinite(value) && value >= 0 ? computeTva(value, rate, from) : null;

  return (
    <div className="mb-14 rounded-2xl bg-sable p-6 ring-1 ring-nuit/5 sm:p-8">
      <h2 className="text-2xl font-bold">{labels.title}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label htmlFor={`${id}-amount`} className="block text-sm font-semibold">
          {labels.amount}
          <input
            id={`${id}-amount`}
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={field}
          />
        </label>
        <fieldset>
          <legend className="text-sm font-semibold">{labels.rate}</legend>
          <div className="mt-2 flex gap-2">
            {labels.rates.map((r) => (
              <button
                key={r.value}
                type="button"
                aria-pressed={rate === r.value}
                onClick={() => setRate(r.value)}
                className={cn(
                  "h-12 flex-1 rounded-xl text-sm font-semibold ring-1 ring-nuit/15",
                  rate === r.value ? "bg-nuit text-white" : "bg-white text-nuit",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-5 flex gap-2" role="group" aria-label={labels.amount}>
        {(["ht", "ttc"] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={from === f}
            onClick={() => setFrom(f)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-nuit/15",
              from === f ? "bg-nuit text-white" : "bg-white text-nuit",
            )}
          >
            {labels.from[f]}
          </button>
        ))}
      </div>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
        {(["ht", "tva", "ttc"] as const).map((k) => (
          <div key={k} className="flex items-baseline justify-between rounded-xl bg-white p-4 ring-1 ring-nuit/5 sm:block">
            <dt className="text-xs font-semibold tracking-wide text-ardoise-dark uppercase">
              {labels.results[k]}
            </dt>
            <dd className="mt-1 text-lg font-bold tabular-nums sm:text-xl">
              {result ? euro(result[k]) : "-"}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-ardoise-dark">{labels.note}</p>
    </div>
  );
}
