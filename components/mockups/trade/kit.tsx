"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  RotateCw,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { displayFonts, type DisplayFont } from "./fonts";
import { extraPages, OpenNow, Pic, SiteOverlays, SocialLinks } from "./extras";

/**
 * Socle des mini-sites d'exemple : navigation entre pages, barre d'adresse,
 * boutons, champs et formulaires. Les couleurs viennent du `theme` du projet
 * via des variables CSS : --p (principale), --op (texte sur principale),
 * --d (sombre), --s (clair), --a (appoint), --ink (texte coloré sur fond clair).
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

/** Coordonnées et repères affichés dans le bandeau du haut et le pied de page. */
export type SiteInfo = {
  /** Sous le nom, dans le logo (ex. « Plomberie · Chauffage »). */
  baseline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  zone: string;
  /** Présentation courte du pied de page. */
  about: string;
  /** Labels et garanties (RGE, Qualibat, décennale…). */
  labels: string[];
  /** Liens « Nos prestations » du pied de page. */
  links: { label: string; page: string; param?: string }[];
  rating?: { value: string; count: number };
  /** Page du formulaire de devis (par défaut : l'accueil). */
  contactPage?: string;
  /** Articles de la page Conseils. */
  articles?: Article[];
};

export type Article = {
  t: string;
  /** Chapeau. */
  d: string;
  cat: string;
  /** Minutes de lecture. */
  read: number;
  /** Photo de public/images/maquettes, sans extension. */
  img: string;
  body: string[];
};

type MiniCtx = {
  page: string;
  /** Paramètre facultatif passé à la page (onglet, élément choisi…). */
  param?: string;
  go: (id: string, param?: string) => void;
  interactive: boolean;
  project: Project;
  info?: SiteInfo;
  /** Page d'accueil du site. */
  home: string;
  /** Affiche un calque (visionneuse…) par-dessus la fenêtre du site. */
  overlayRoot?: (children: ReactNode) => ReactNode;
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
    "--ink": t.ink ?? t.primary,
  } as CSSProperties;
}

/* ----------------------------------------------------------------- Cadre */

export function MiniSite({
  project,
  cta,
  icon: Icon,
  interactive,
  width,
  height,
  app = false,
  info,
  logo,
  topbar = true,
  navStyle = "pill",
  darkHeader = false,
  font = "sans",
  pages: sitePages,
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
  info?: SiteInfo;
  /** Logo propre au site (par défaut : pictogramme + nom + baseline). */
  logo?: ReactNode;
  /** Bandeau d'infos au-dessus de l'en-tête (téléphone, horaires, zone). */
  topbar?: boolean;
  /** Style du menu : pastilles, souligné ou capitales. */
  navStyle?: "pill" | "underline" | "caps";
  /** En-tête sombre (couleur --d) plutôt que blanc. */
  darkHeader?: boolean;
  /** Police des titres. */
  font?: DisplayFont;
}) {
  const pages = app ? sitePages : [...sitePages, ...extraPages(info)];
  const [history, setHistory] = useState<Entry[]>([{ id: pages[0].id }]);
  const [overlayEl, setOverlayEl] = useState<HTMLDivElement | null>(null);
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
    <div ref={setOverlayEl} className="relative flex min-h-0 flex-1 flex-col">
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
      {info && !app && <SiteOverlays info={info} />}
    </div>
  );
  const overlayRoot = (children: ReactNode) =>
    overlayEl ? createPortal(children, overlayEl) : null;

  return (
    <Ctx.Provider
      value={{ page, param, go, interactive, project, info, home: pages[0].id, overlayRoot }}
    >
      <div
        aria-hidden={interactive ? undefined : true}
        inert={!interactive}
        style={{
          ...themeVars(project),
          ...(displayFonts[font] && { "--font-display": displayFonts[font] }),
          width,
          height,
        }}
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
            {topbar && info && (
              <div className="flex h-7 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-(--d) px-4 text-[10px] text-white/75 @min-[600px]:px-8">
                <span className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-semibold text-white">
                    <Phone className="size-3 text-(--a)" /> {info.phone}
                  </span>
                  <span className="hidden items-center gap-1.5 @min-[600px]:flex">
                    <Clock className="size-3 text-(--a)" /> {info.hours}
                  </span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="hidden items-center gap-1.5 @min-[600px]:flex">
                    <MapPin className="size-3 text-(--a)" /> {info.zone}
                  </span>
                  {info.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-white">{info.rating.value}</span>
                      <span className="hidden @min-[480px]:inline">
                        ({info.rating.count} avis Google)
                      </span>
                    </span>
                  )}
                </span>
              </div>
            )}
            <div
              className={cn(
                "relative z-10 flex h-14 shrink-0 items-center justify-between gap-3 px-4 @min-[600px]:px-8",
                darkHeader
                  ? "bg-(--d) text-white"
                  : "bg-white shadow-[0_1px_0_rgb(0_0_0/0.06),0_6px_16px_-10px_rgb(0_0_0/0.18)]",
              )}
            >
              <button
                type="button"
                onClick={() => go(pages[0].id)}
                className="flex min-w-0 items-center gap-2 text-left"
                aria-label={`${project.brand}, accueil`}
              >
                {logo ?? (
                  <>
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-(--p) text-(--op)">
                      <Icon className="size-4.5" />
                    </span>
                    <span className="min-w-0 leading-none">
                      <span
                        className={cn(
                          "block truncate font-display text-[14px] font-bold",
                          darkHeader ? "text-white" : "text-(--d)",
                        )}
                      >
                        {project.brand}
                      </span>
                      {info && (
                        <span
                          className={cn(
                            "mt-1 block truncate text-[8.5px] font-semibold tracking-[0.14em] uppercase",
                            darkHeader ? "text-white/55" : "text-nuit/45",
                          )}
                        >
                          {info.baseline}
                        </span>
                      )}
                    </span>
                  </>
                )}
              </button>
              <span className="flex items-center gap-1">
                {nav.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => go(p.id)}
                    aria-current={p.id === page ? "page" : undefined}
                    className={cn(
                      "hidden text-[11px] font-medium whitespace-nowrap transition-colors @min-[600px]:inline",
                      navStyle === "pill" && "rounded-full px-3 py-1.5",
                      navStyle === "pill" &&
                        (p.id === page
                          ? darkHeader
                            ? "bg-white/12 text-white"
                            : "bg-(--s) text-(--d)"
                          : darkHeader
                            ? "text-white/65 hover:text-white"
                            : "text-nuit/60 hover:text-nuit"),
                      navStyle !== "pill" &&
                        "relative px-2.5 py-1.5 after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-(--p) after:opacity-0 after:transition-opacity",
                      navStyle === "caps" &&
                        "text-[10px] font-semibold tracking-[0.12em] uppercase",
                      navStyle !== "pill" &&
                        (p.id === page
                          ? cn("after:opacity-100", darkHeader ? "text-white" : "text-(--d)")
                          : darkHeader
                            ? "text-white/65 hover:text-white"
                            : "text-nuit/60 hover:text-nuit"),
                    )}
                  >
                    {p.label}
                  </button>
                ))}
                {cta && (
                  <button
                    type="button"
                    onClick={() => go(cta.page)}
                    className={cn(
                      "ml-2 rounded-full px-3.5 py-2 text-[11px] font-semibold whitespace-nowrap transition-[filter,opacity] hover:brightness-110",
                      darkHeader ? "bg-(--p) text-(--op)" : "bg-(--d) text-white",
                    )}
                  >
                    {cta.label}
                  </button>
                )}
              </span>
            </div>
            {/* Menu en onglets sur petit écran */}
            <div className="flex shrink-0 gap-1 overflow-x-auto px-4 py-2 @min-[600px]:hidden">
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

/** Pied de page : coordonnées, prestations, horaires et mentions, comme sur un vrai site. */
export function MiniFooter() {
  const { project, info, go } = useMini();
  const year = 2026;
  if (!info) {
    return (
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 bg-(--d) px-4 py-3 text-[10px] text-white/60 @min-[600px]:px-8">
        <span className="font-semibold text-white">
          {project.brand} · {project.city}
        </span>
        <span>Site d&apos;exemple réalisé par NEOBATYS</span>
      </div>
    );
  }
  return (
    <footer className="mt-8 bg-(--d) text-[10px] text-white/60">
      <div className="grid gap-6 px-4 pt-7 pb-6 @min-[600px]:grid-cols-[1.4fr_1fr_1.1fr_1fr] @min-[600px]:px-8">
        <div>
          <p className="font-display text-[15px] font-bold text-white">{project.brand}</p>
          <p className="mt-0.5 text-[8.5px] font-semibold tracking-[0.14em] text-white/45 uppercase">
            {info.baseline}
          </p>
          <p className="mt-3 leading-relaxed">{info.about}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {info.labels.map((l) => (
              <li
                key={l}
                className="rounded border border-white/15 px-1.5 py-0.5 text-[8.5px] font-semibold tracking-wide text-white/75 uppercase"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wide text-white uppercase">Prestations</p>
          <ul className="mt-2.5 space-y-1.5">
            {info.links.map((l) => (
              <li key={l.label}>
                <button
                  type="button"
                  onClick={() => go(l.page, l.param)}
                  className="text-left hover:text-white"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wide text-white uppercase">Contact</p>
          <ul className="mt-2.5 space-y-1.5">
            <li className="flex gap-1.5">
              <MapPin className="mt-px size-3 shrink-0 text-(--a)" /> {info.address}
            </li>
            <li className="flex gap-1.5 font-semibold text-white">
              <Phone className="mt-px size-3 shrink-0 text-(--a)" /> {info.phone}
            </li>
            <li className="flex gap-1.5">
              <Mail className="mt-px size-3 shrink-0 text-(--a)" /> {info.email}
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wide text-white uppercase">Horaires</p>
          <OpenNow className="mt-2.5" />
          <p className="mt-1.5 leading-relaxed">{info.hours}</p>
          <p className="mt-2 leading-relaxed">Intervention : {info.zone}</p>
          <div className="mt-3">
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-[9px] @min-[600px]:px-8">
        <span className="flex flex-wrap gap-x-2">
          <span>
            © {year} {project.brand}
          </span>
          {info.articles?.length ? (
            <button type="button" onClick={() => go("conseils")} className="hover:text-white">
              Conseils
            </button>
          ) : null}
          <button type="button" onClick={() => go("mentions")} className="hover:text-white">
            Mentions légales
          </button>
          <button type="button" onClick={() => go("mentions")} className="hover:text-white">
            Confidentialité et cookies
          </button>
        </span>
        <span>Site d&apos;exemple réalisé par NEOBATYS</span>
      </div>
    </footer>
  );
}

/** Page secondaire : bandeau avec fil d'Ariane, titre, visuel facultatif, puis contenu. */
export function SubPage({
  eyebrow,
  title,
  intro,
  visual,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Photo (nom dans public/images/maquettes) ou illustration à droite du titre. */
  visual?: ReactNode;
  children: ReactNode;
}) {
  const { go, home } = useMini();
  return (
    <div className="min-h-full bg-(--s)">
      <div className="relative overflow-hidden border-b border-nuit/6 bg-white">
        <div
          className={cn(
            "px-4 pt-4 pb-5 @min-[600px]:px-8 @min-[600px]:pt-5 @min-[600px]:pb-6",
            visual && "@min-[600px]:w-[58%]",
          )}
        >
          <p className="flex items-center gap-1.5 text-[9.5px] text-nuit/45">
            <button type="button" onClick={() => go(home)} className="hover:text-nuit">
              Accueil
            </button>
            <span>/</span>
            <span className="font-medium text-nuit/70">{eyebrow}</span>
          </p>
          <Title className="mt-2.5">{title}</Title>
          {intro && (
            <p className="mt-2 max-w-[460px] text-[12px] leading-relaxed text-nuit/60">{intro}</p>
          )}
        </div>
        {visual && (
          <div className="absolute inset-y-0 right-0 hidden w-[42%] @min-[600px]:block">
            {typeof visual === "string" ? <Pic src={visual} alt="" sizes="320px" /> : visual}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/0 to-transparent" />
          </div>
        )}
      </div>
      <div className="px-4 pt-5 @min-[600px]:px-8">{children}</div>
      <MiniFooter />
    </div>
  );
}
