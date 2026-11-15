"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ArrowLeft, Check, Lock, RotateCw, Star } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import credits from "@/content/maquettes-credits.json";

type Credit = { title: string; creator: string; license: string; url: string };

/**
 * Socle des maquettes de sites (format bureau 1280 × 800).
 *
 * Chaque métier dessine lui-même son en-tête, ses pages et son pied de page,
 * pour avoir sa propre allure ; ce fichier ne fournit que le cadre du
 * navigateur, la navigation entre pages et quelques éléments neutres.
 *
 * Sous 900 px de large (fenêtre agrandie sur téléphone), les pages passent
 * en mise en page mobile grâce aux requêtes de conteneur (@min-[900px]:…).
 */

export const SITE_WIDTH = 1280;
export const SITE_HEIGHT = 800;

export type SiteProps = { project: Project; interactive: boolean; width: number; height: number };

export type SitePage = {
  id: string;
  label: string;
  path: string;
  render: () => ReactNode;
  /** Affichée dans le menu (par défaut : oui, sauf l'accueil). */
  inNav?: boolean;
};

type SiteCtx = {
  page: string;
  /** Paramètre facultatif passé à la page (problème choisi, filtre…). */
  param?: string;
  go: (id: string, param?: string) => void;
  interactive: boolean;
  project: Project;
  pages: SitePage[];
  nav: SitePage[];
};

const Ctx = createContext<SiteCtx | null>(null);

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite doit être utilisé dans <SiteFrame>");
  return ctx;
}

type Entry = { id: string; param?: string };

/** Cadre de navigateur + navigation entre les pages du site d'exemple. */
export function SiteFrame({
  project,
  interactive,
  width,
  height,
  pages,
  header,
  style,
  className,
}: SiteProps & {
  pages: SitePage[];
  /** En-tête du site, dessiné par le métier (reste visible au défilement). */
  header: ReactNode;
  /** Variables de couleurs et de polices du métier. */
  style?: CSSProperties;
  className?: string;
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

  return (
    <Ctx.Provider value={{ page, param, go, interactive, project, pages, nav }}>
      <div
        aria-hidden={interactive ? undefined : true}
        inert={!interactive}
        style={{ ...style, width, height }}
        className={cn(
          "@container flex flex-col overflow-hidden bg-white text-[15px] text-(--ink-text) antialiased",
          className,
        )}
      >
        {/* Barre du navigateur */}
        <div className="flex h-10 shrink-0 items-center gap-3 border-b border-black/8 bg-[#f6f6f6] px-3 font-[system-ui] @min-[900px]:px-4">
          <span className="hidden gap-2 @min-[900px]:flex">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </span>
          <button
            type="button"
            onClick={back}
            disabled={history.length < 2}
            aria-label="Page précédente"
            className="grid size-7 place-items-center rounded-md text-black/55 hover:bg-black/5 disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </button>
          <span className="mx-auto flex h-7 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-3 text-[12.5px] text-black/50 ring-1 ring-black/6 @min-[900px]:max-w-[440px]">
            <Lock className="size-3 shrink-0" />
            <span className="truncate">
              {project.domain}
              <span className="text-black/80">{current.path === "/" ? "" : current.path}</span>
            </span>
          </span>
          <button
            type="button"
            onClick={() => setHistory([{ id: pages[0].id }])}
            aria-label="Revenir à l'accueil"
            className="grid size-7 place-items-center rounded-md text-black/55 hover:bg-black/5"
          >
            <RotateCw className="size-3.5" />
          </button>
        </div>
        <div
          ref={bodyRef}
          className={cn(
            "relative min-h-0 flex-1",
            interactive ? "overflow-y-auto overscroll-contain" : "overflow-hidden",
          )}
        >
          {header}
          <div key={`${page}-${param ?? ""}`}>{current.render()}</div>
        </div>
      </div>
    </Ctx.Provider>
  );
}

/** Lien interne du site d'exemple (bouton qui ouvre une page). */
export function Go({
  to,
  param,
  className,
  children,
  label,
}: {
  to: string;
  param?: string;
  className?: string;
  children: ReactNode;
  /** Nom accessible si le contenu n'est pas du texte. */
  label?: string;
}) {
  const { go } = useSite();
  return (
    <button type="button" aria-label={label} onClick={() => go(to, param)} className={className}>
      {children}
    </button>
  );
}

/** Photo libre de droits de public/images/maquettes (crédits : content/maquettes-credits.json). */
export function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 640px, 90vw",
  priority = false,
  position,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Cadrage (object-position), ex. « 50% 30% ». */
  position?: string;
}) {
  return (
    <Image
      src={`/images/maquettes/${src}.jpg`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={position ? { objectPosition: position } : undefined}
      className={cn("object-cover", className)}
    />
  );
}

export function Stars({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5 text-[#f4b400]", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-[1em]", i < value ? "fill-current" : "opacity-25")} />
      ))}
    </span>
  );
}

/** Logo Google (avis). */
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

/** Formulaire d'exemple : affiche une confirmation à l'envoi, rien n'est transmis. */
export function DemoForm({
  children,
  submit,
  success,
  className,
  submitClassName,
}: {
  children: ReactNode;
  submit: ReactNode;
  success: { title: string; text: string };
  className?: string;
  submitClassName?: string;
}) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div
        role="status"
        className={cn("flex flex-col items-start justify-center gap-3 py-6", className)}
      >
        <span className="grid size-12 place-items-center rounded-full bg-[#2f8f5b] text-white">
          <Check className="size-6" />
        </span>
        <p className="text-[22px] font-bold tracking-tight">{success.title}</p>
        <p className="max-w-[380px] text-[15px] leading-relaxed opacity-70">{success.text}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-[14px] font-semibold underline underline-offset-4"
        >
          Faire une autre demande
        </button>
        <p className="text-[12px] opacity-50">
          Site d&apos;exemple : aucune donnée n&apos;est envoyée.
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
      <button type="submit" className={submitClassName}>
        {submit}
      </button>
    </form>
  );
}

/** Choix unique sous forme de boutons (problème, créneau…). */
export function Pick<T extends string>({
  options,
  value,
  onChange,
  className,
  itemClassName,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  /** Classes de chaque bouton ; l'état choisi passe par aria-pressed:… */
  itemClassName?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={itemClassName}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** Crédits des photos libres de droits utilisées par un site d'exemple. */
export function PhotoCredits({ photos }: { photos: string[] }) {
  return (
    <ul className="divide-y divide-black/8 border-y border-black/8">
      {photos.map((key) => {
        const c = (credits as Record<string, Credit>)[key];
        if (!c) return null;
        return (
          <li key={key} className="py-4 text-[15px] leading-relaxed">
            <b>{c.title}</b>
            <span className="block text-black/60">
              {c.creator}, licence {c.license} :{" "}
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                source
              </a>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
