"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, Phone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pic } from "./extras";
import { Btn, Stars, useMini } from "./kit";

/**
 * Sections réutilisées par les pages d'accueil des mini-sites : réassurance,
 * avis, zone d'intervention, FAQ, étapes, bandeau d'appel… Comme sur les vrais
 * sites d'artisans, chaque métier les assemble dans son propre ordre.
 */

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-4 py-8 @min-[600px]:px-8 @min-[600px]:py-10", className)}>
      {children}
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  intro,
  center = false,
  light = false,
  className,
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
  /** Texte clair sur fond sombre. */
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto max-w-[480px] text-center", className)}>
      <p
        className={cn(
          "text-[10px] font-bold tracking-[0.16em] uppercase",
          light ? "text-(--a)" : "text-(--ink)",
        )}
      >
        {kicker}
      </p>
      <p
        className={cn(
          "mt-2 font-display text-[22px] leading-[1.1] font-bold tracking-tight @min-[600px]:text-[24px]",
          light ? "text-white" : "text-(--d)",
        )}
      >
        {title}
      </p>
      {intro && (
        <p
          className={cn(
            "mt-2 text-[11.5px] leading-relaxed",
            light ? "text-white/65" : "text-nuit/60",
            center ? "mx-auto" : "max-w-[440px]",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Image pleine de son cadre, avec légende facultative en bas à gauche. */
export function Photo({
  children,
  src,
  alt,
  caption,
  className,
}: {
  children?: ReactNode;
  /** Photo de public/images/maquettes ; à défaut, l'illustration passée en enfant. */
  src?: string;
  alt?: string;
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-nuit/5", className)}>
      {src ? <Pic src={src} alt={alt ?? (typeof caption === "string" ? caption : "")} /> : children}
      {caption && (
        <span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-1 text-[9.5px] font-medium text-white backdrop-blur-sm">
          {caption}
        </span>
      )}
    </div>
  );
}

/** Bandeau de réassurance juste sous le hero. */
export function TrustStrip({
  items,
  className,
}: {
  items: { I: LucideIcon; t: string; d: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-3 border-b border-nuit/6 bg-white px-4 py-4 @min-[600px]:grid-cols-4 @min-[600px]:px-8",
        className,
      )}
    >
      {items.map(({ I, t, d }) => (
        <div key={t} className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--s) text-(--ink)">
            <I className="size-4" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[11px] font-bold text-nuit">{t}</span>
            <span className="block text-[9.5px] text-nuit/55">{d}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** Pastilles de labels (dessins génériques, pas les logos officiels). */
export function Seals({ labels, className }: { labels: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {labels.map((l) => (
        <li
          key={l}
          className="grid size-14 place-items-center rounded-full border-2 border-dashed border-(--p)/35 bg-white p-1 text-center text-[8px] leading-tight font-bold tracking-wide text-(--d) uppercase"
        >
          {l}
        </li>
      ))}
    </ul>
  );
}

export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z"
      />
      <path
        fill="#34A853"
        d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z"
      />
      <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9l3.7-2.8Z" />
      <path
        fill="#EA4335"
        d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4Z"
      />
    </svg>
  );
}

export type Review = { n: string; c: string; t: string; when: string; s?: number };

const avatarColors = ["#2563eb", "#16a34a", "#d97706", "#db2777", "#7c3aed", "#0891b2"];

/** Avis façon widget Google : note globale + cartes. */
export function Reviews({
  reviews,
  rating = "4,9",
  count = 87,
  className,
}: {
  reviews: Review[];
  rating?: string;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 @min-[600px]:grid-cols-[150px_1fr]", className)}>
      <div className="flex flex-col items-start rounded-xl bg-white p-4 ring-1 ring-nuit/8 @min-[600px]:items-center @min-[600px]:text-center">
        <GoogleG className="size-6" />
        <p className="mt-2 text-[26px] leading-none font-bold text-nuit">{rating}</p>
        <Stars className="mt-1.5" />
        <p className="mt-1.5 text-[9.5px] text-nuit/55">Basé sur {count} avis</p>
        <span className="mt-3 rounded-full bg-(--s) px-2.5 py-1 text-[9.5px] font-semibold text-(--d)">
          Laisser un avis
        </span>
      </div>
      <div className="grid gap-2.5 @min-[600px]:grid-cols-3">
        {reviews.map((r, i) => (
          <div key={r.n} className="rounded-xl bg-white p-3 ring-1 ring-nuit/8">
            <div className="flex items-center gap-2">
              <span
                className="grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
              >
                {r.n[0]}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[10.5px] font-bold text-nuit">{r.n}</span>
                <span className="block text-[9px] text-nuit/45">
                  {r.when} · {r.c}
                </span>
              </span>
              <GoogleG className="ml-auto size-3.5 shrink-0" />
            </div>
            <Stars value={r.s ?? 5} className="mt-2" />
            <p className="mt-1.5 text-[10.5px] leading-relaxed text-nuit/70">{r.t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Faq({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState(0);
  return (
    <div className={cn("divide-y divide-nuit/8 rounded-xl bg-white ring-1 ring-nuit/8", className)}>
      {items.map((it, i) => (
        <div key={it.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[11.5px] font-semibold text-nuit"
          >
            {it.q}
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-nuit/40 transition-transform",
                open === i && "rotate-180",
              )}
            />
          </button>
          {open === i && (
            <p className="-mt-1 px-4 pb-3 text-[11px] leading-relaxed text-nuit/65">{it.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function Steps({
  items,
  light = false,
  className,
}: {
  items: { t: string; d: string }[];
  light?: boolean;
  className?: string;
}) {
  return (
    <ol className={cn("grid gap-3 @min-[600px]:grid-cols-4", className)}>
      {items.map((s, i) => (
        <li key={s.t} className="relative">
          <span
            className={cn(
              "font-display text-[28px] leading-none font-bold",
              light ? "text-(--a)" : "text-(--ink)",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className={cn("mt-1.5 text-[12px] font-bold", light ? "text-white" : "text-nuit")}>
            {s.t}
          </p>
          <p
            className={cn(
              "mt-1 text-[10.5px] leading-relaxed",
              light ? "text-white/60" : "text-nuit/60",
            )}
          >
            {s.d}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function Stats({
  items,
  light = false,
  className,
}: {
  items: { v: string; l: string }[];
  light?: boolean;
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-2 gap-4 @min-[600px]:grid-cols-4", className)}>
      {items.map((s) => (
        <div key={s.l}>
          <dt
            className={cn(
              "font-display text-[26px] leading-none font-bold",
              light ? "text-white" : "text-(--d)",
            )}
          >
            {s.v}
          </dt>
          <dd className={cn("mt-1 text-[10px]", light ? "text-white/60" : "text-nuit/55")}>
            {s.l}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Carte stylisée de la zone d'intervention : rivière, routes, communes. */
export function ZoneMap({
  towns,
  className,
}: {
  /** La première commune est le siège, au centre. */
  towns: string[];
  className?: string;
}) {
  const pos = [
    [240, 150],
    [170, 92],
    [320, 96],
    [140, 190],
    [330, 206],
    [250, 236],
    [96, 128],
    [392, 150],
  ];
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-[#eef1ec] ring-1 ring-nuit/8",
        className,
      )}
    >
      <svg
        viewBox="0 0 480 300"
        preserveAspectRatio="xMidYMid slice"
        className="block size-full"
        aria-hidden="true"
      >
        <rect width="480" height="300" fill="#eef1ec" />
        <g fill="#dfe8d8">
          <ellipse cx="80" cy="60" rx="70" ry="40" />
          <ellipse cx="420" cy="260" rx="90" ry="50" />
          <ellipse cx="400" cy="40" rx="50" ry="26" />
        </g>
        <path
          d="M200 -10 C230 60 180 110 220 160 S 300 230 270 310"
          stroke="#a9cbe6"
          strokeWidth="9"
          fill="none"
        />
        <g stroke="#fff" strokeWidth="5" fill="none">
          <path d="M-10 140 C120 150 200 140 240 150 S 380 170 490 150" />
          <path d="M120 -10 L170 92 L240 150 L250 236 L240 310" />
          <path d="M490 60 L320 96 L240 150 L140 190 L-10 250" />
        </g>
        <g stroke="#f4d58d" strokeWidth="2" fill="none">
          <path d="M-10 140 C120 150 200 140 240 150 S 380 170 490 150" />
        </g>
        <circle
          cx="240"
          cy="150"
          r="118"
          fill="var(--p)"
          fillOpacity="0.08"
          stroke="var(--p)"
          strokeOpacity="0.45"
          strokeDasharray="5 5"
        />
        {towns.slice(0, pos.length).map((t, i) => {
          const [x, y] = pos[i];
          return (
            <g key={t}>
              <circle
                cx={x}
                cy={y}
                r={i === 0 ? 7 : 4}
                fill={i === 0 ? "var(--p)" : "var(--d)"}
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x={x + 9}
                y={y + 3.5}
                fontSize={i === 0 ? 12 : 10}
                fontWeight={i === 0 ? 700 : 600}
                fill="#1f2937"
                paintOrder="stroke"
                stroke="#eef1ec"
                strokeWidth="3"
              >
                {t}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Bandeau d'appel à l'action de fin de page. */
export function CtaBand({
  title,
  text,
  cta,
  className,
}: {
  title: string;
  text: string;
  cta: { label: string; to: string };
  className?: string;
}) {
  const { info } = useMini();
  return (
    <div
      className={cn(
        "relative mx-4 overflow-hidden rounded-2xl bg-(--p) px-5 py-6 text-(--op) @min-[600px]:mx-8 @min-[600px]:flex @min-[600px]:items-center @min-[600px]:justify-between @min-[600px]:gap-6 @min-[600px]:px-8",
        className,
      )}
    >
      <div className="absolute -top-16 -right-10 size-48 rounded-full bg-white/10" />
      <div className="relative">
        <p className="font-display text-[20px] leading-tight font-bold">{title}</p>
        <p className="mt-1 text-[11px] opacity-80">{text}</p>
      </div>
      <div className="relative mt-4 flex flex-wrap gap-2 @min-[600px]:mt-0 @min-[600px]:shrink-0">
        <Btn to={cta.to} tone="dark">
          {cta.label}
        </Btn>
        {info && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-[12px] font-semibold">
            <Phone className="size-3.5" /> {info.phone}
          </span>
        )}
      </div>
    </div>
  );
}
