"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowLeft, Check, RotateCw, Star, type LucideIcon } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Socle des mini-sites d'exemple : navigation entre pages, barre d'adresse,
 * boutons, champs et formulaires. Les couleurs viennent du `theme` du projet
 * via des variables CSS : --p (principale), --op (texte sur principale),
 * --d (sombre), --s (clair), --a (appoint).
 *
 * Sous 600 px de large (fenêtre agrandie sur mobile), les mises en page
 * passent sur une colonne grâce aux requêtes de conteneur (@min-[600px]:…).
 */

export type PageDef = {
  id: string;
  label: string;
  path: string;
  render: () => ReactNode;
  /** Affichée dans le menu (par défaut : oui, sauf l'accueil). */
  inNav?: boolean;
  icon?: LucideIcon;
};

export type SiteProps = { project: Project; interactive: boolean; width: number; height: number };

type MiniCtx = {
  page: string;
  /** Paramètre facultatif passé à la page (onglet, élément choisi…). */
  param?: string;
  go: (id: string, param?: string) => void;
  interactive: boolean;
  project: Project;
};

type Entry = { id: string; param?: string };

const Ctx = createContext<MiniCtx | null>(null);

export function useMini() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMini doit être utilisé dans <MiniSite>");
  return ctx;
}

export function themeVars(project: Project) {
  const t = project.theme;
  return {
    "--p": t.primary,
    "--op": t.onPrimary,
    "--d": t.dark,
    "--s": t.soft,
    "--a": t.accent,
  } as CSSProperties;
}

/* ----------------------------------------------------------------- Cadre */

export function MiniSite({
  project,
  pages,
  cta,
  icon: Icon,
  interactive,
  width,
  height,
  app = false,
}: {
  project: Project;
  pages: PageDef[];
  /** Page ouverte par le bouton d'action de l'en-tête. */
  cta?: { label: string; page: string };
  icon: LucideIcon;
  interactive: boolean;
  width: number;
  height: number;
  /** Logiciel (barre latérale) plutôt que site vitrine. */
  app?: boolean;
}) {
  const [history, setHistory] = useState<Entry[]>([{ id: pages[0].id }]);
  const { id: page, param } = history[history.length - 1];
  const bodyRef = useRef<HTMLDivElement>(null);
  const current = pages.find((p) => p.id === page) ?? pages[0];
  const nav = pages.filter((p) => p.inNav ?? p.id !== pages[0].id);

  const go = (id: string, next?: string) => {
    if (id !== page || next !== param) setHistory((h) => [...h, { id, param: next }]);
    bodyRef.current?.scrollTo({ top: 0 });
  };
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));

  const body = (
    <div
      ref={bodyRef}
      data-mini-body
      className={cn(
        "relative min-h-0 flex-1",
        interactive ? "overflow-y-auto overscroll-contain" : "overflow-hidden",
      )}
    >
      <div key={`${page}-${param ?? ""}`} className="min-h-full">
        {current.render()}
      </div>
    </div>
  );

  return (
    <Ctx.Provider value={{ page, param, go, interactive, project }}>
      <div
        aria-hidden={interactive ? undefined : true}
        inert={!interactive}
        style={{ ...themeVars(project), width, height }}
        className="@container flex flex-col overflow-hidden bg-white font-sans text-nuit"
      >
        {/* Barre du navigateur */}
        <div className="flex h-9 shrink-0 items-center gap-2.5 border-b border-nuit/8 bg-[#f3f4f6] px-3">
          <span className="hidden gap-1.5 @min-[600px]:flex">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <button
            type="button"
            onClick={back}
            disabled={history.length < 2}
            aria-label="Page précédente"
            className="grid size-6 place-items-center rounded-md text-nuit/60 hover:bg-white disabled:opacity-30"
          >
            <ArrowLeft className="size-3.5" />
          </button>
          <span className="mx-auto flex h-6 min-w-0 flex-1 items-center justify-center rounded-md bg-white px-3 text-[10px] text-nuit/55 ring-1 ring-nuit/8 @min-[600px]:max-w-[50%]">
            <span className="truncate">
              {project.domain}
              <span className="text-nuit/85">{current.path}</span>
            </span>
          </span>
          <button
            type="button"
            onClick={() => setHistory([{ id: pages[0].id }])}
            aria-label="Revenir à l'accueil"
            className="grid size-6 place-items-center rounded-md text-nuit/60 hover:bg-white"
          >
            <RotateCw className="size-3.5" />
          </button>
        </div>

        {app ? (
          <div className="flex min-h-0 flex-1">
            <aside className="flex w-14 shrink-0 flex-col items-center gap-2 bg-(--d) py-4 @min-[600px]:w-44 @min-[600px]:items-stretch @min-[600px]:px-3">
              <span className="mb-3 flex items-center gap-2 @min-[600px]:px-1">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-(--a) text-white">
                  <Icon className="size-4.5" />
                </span>
                <span className="hidden text-[12px] leading-tight font-bold text-white @min-[600px]:block">
                  {project.brand}
                </span>
              </span>
              {pages
                .filter((p) => p.inNav !== false)
                .map((p) => {
                  const I = p.icon ?? Icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => go(p.id)}
                      aria-current={p.id === page ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg p-2.5 text-[11px] font-semibold transition-colors",
                        p.id === page
                          ? "bg-white/15 text-white"
                          : "text-white/50 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <I className="size-4 shrink-0" />
                      <span className="hidden @min-[600px]:inline">{p.label}</span>
                    </button>
                  );
                })}
            </aside>
            {body}
          </div>
        ) : (
          <>
            <div className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 @min-[600px]:px-8">
              <button
                type="button"
                onClick={() => go(pages[0].id)}
                className="flex items-center gap-2"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-(--p) text-(--op)">
                  <Icon className="size-4.5" />
                </span>
                <span className="font-display text-[14px] font-bold text-(--d)">
                  {project.brand}
                </span>
              </button>
              <span className="flex items-center gap-1">
                {nav.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => go(p.id)}
                    aria-current={p.id === page ? "page" : undefined}
                    className={cn(
                      "hidden rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors @min-[600px]:inline",
                      p.id === page ? "bg-(--s) text-(--d)" : "text-nuit/60 hover:text-nuit",
                    )}
                  >
                    {p.label}
                  </button>
                ))}
                {cta && (
                  <button
                    type="button"
                    onClick={() => go(cta.page)}
                    className="ml-2 rounded-full bg-(--d) px-3.5 py-1.5 text-[11px] font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90"
                  >
                    {cta.label}
                  </button>
                )}
              </span>
            </div>
            {/* Menu en onglets sur petit écran */}
            <div className="flex shrink-0 gap-1 overflow-x-auto px-4 pb-2 @min-[600px]:hidden">
              {nav.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => go(p.id)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold",
                    p.id === page ? "bg-(--d) text-white" : "bg-(--s) text-nuit/65",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {body}
          </>
        )}
      </div>
    </Ctx.Provider>
  );
}

/* ------------------------------------------------------------ Éléments */

/** Fait défiler le corps du mini-site jusqu'à l'élément (site d'une seule page). */
export function scrollToSection(el: HTMLElement | null, offset = 44) {
  const body = el?.closest<HTMLElement>("[data-mini-body]");
  if (el && body) body.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
}

export function Stars({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5 text-amber-400", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-3", i < value ? "fill-current" : "text-nuit/15")} />
      ))}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-display text-[26px] leading-[1.06] font-bold tracking-tight text-(--d) @min-[600px]:text-[30px]",
        className,
      )}
    >
      {children}
    </p>
  );
}

type BtnTone = "primary" | "dark" | "light" | "ghost";
const btnTones: Record<BtnTone, string> = {
  primary: "bg-(--p) text-(--op) hover:brightness-110",
  dark: "bg-(--d) text-white hover:opacity-90",
  light: "bg-white text-(--d) ring-1 ring-nuit/10 hover:bg-(--s)",
  ghost: "bg-(--s) text-(--d) hover:brightness-95",
};

export function Btn({
  children,
  tone = "primary",
  className,
  onClick,
  type = "button",
  to,
  param,
}: {
  children: ReactNode;
  tone?: BtnTone;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Page à ouvrir au clic. */
  to?: string;
  /** Paramètre transmis à la page ouverte. */
  param?: string;
}) {
  const { go } = useMini();
  return (
    <button
      type={type}
      onClick={() => {
        onClick?.();
        if (to) go(to, param);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold transition-[filter,opacity,background-color]",
        btnTones[tone],
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Groupe de choix (un seul ou plusieurs). */
export function Choice<T extends string>({
  options,
  value,
  onChange,
  className,
  itemClassName,
  activeClassName = "bg-(--p) text-(--op) ring-(--p)",
  inactiveClassName = "bg-white text-nuit/65 ring-nuit/10 hover:text-nuit",
}: {
  options: readonly T[];
  value: T | T[];
  onChange: (v: T) => void;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}) {
  const isOn = (o: T) => (Array.isArray(value) ? value.includes(o) : value === o);
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={isOn(o)}
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full px-3 py-1.5 text-[11px] font-semibold ring-1 transition-colors",
            isOn(o) ? activeClassName : inactiveClassName,
            itemClassName,
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Field({
  label,
  placeholder,
  defaultValue,
  textarea = false,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  textarea?: boolean;
  type?: string;
}) {
  const cls =
    "mt-1 w-full rounded-lg bg-white px-3 py-2 text-[16px] text-nuit @min-[600px]:text-[12px] ring-1 ring-nuit/12 outline-none placeholder:text-nuit/35 focus:ring-2 focus:ring-(--p)";
  return (
    <label className="block">
      <span className="text-[10px] font-semibold text-nuit/70">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={cn(cls, "resize-none")}
        />
      ) : (
        <input type={type} placeholder={placeholder} defaultValue={defaultValue} className={cls} />
      )}
    </label>
  );
}

/** Formulaire factice : affiche une confirmation à l'envoi, rien n'est transmis. */
export function DemoForm({
  children,
  submitLabel,
  success,
  className,
}: {
  children: ReactNode;
  submitLabel: ReactNode;
  success: { title: string; text: string };
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className={cn("flex flex-col items-center justify-center text-center", className)}>
        <span className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="size-6" />
        </span>
        <p className="mt-3 text-[14px] font-bold text-nuit">{success.title}</p>
        <p className="mt-1 max-w-[260px] text-[11px] leading-relaxed text-nuit/60">
          {success.text}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-3 text-[11px] font-semibold text-(--p) underline underline-offset-2"
        >
          Faire une autre demande
        </button>
        <p className="mt-3 text-[9px] text-nuit/40">
          Démonstration : aucune donnée n&apos;est envoyée.
        </p>
      </div>
    );
  }
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {children}
      <button
        type="submit"
        className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-(--d) py-2.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white p-4 ring-1 ring-nuit/8", className)}>{children}</div>
  );
}

/** Pied de page commun : rappelle qu'il s'agit d'un site d'exemple. */
export function MiniFooter() {
  const { project } = useMini();
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-2 bg-(--d) px-4 py-3 text-[10px] text-white/60 @min-[600px]:px-8">
      <span className="font-semibold text-white">
        {project.brand} · {project.city}
      </span>
      <span>Site d&apos;exemple réalisé par NEOBATYS</span>
    </div>
  );
}

/** Page secondaire : en-tête titré + contenu. */
export function SubPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-full bg-(--s)">
      <div className="px-4 pt-5 @min-[600px]:px-8 @min-[600px]:pt-6">
        <Eyebrow className="bg-white text-(--p) ring-1 ring-nuit/8">{eyebrow}</Eyebrow>
        <Title className="mt-3">{title}</Title>
        {intro && (
          <p className="mt-2 max-w-[460px] text-[12px] leading-relaxed text-nuit/60">{intro}</p>
        )}
      </div>
      <div className="px-4 pt-4 @min-[600px]:px-8">{children}</div>
      <MiniFooter />
    </div>
  );
}
