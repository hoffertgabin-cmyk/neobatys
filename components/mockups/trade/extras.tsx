"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Cookie, ImagePlus, Phone, X } from "lucide-react";
import credits from "@/content/maquettes-credits.json";
import { cn } from "@/lib/utils";
import { Btn, SubPage, useMini, type PageDef, type SiteInfo } from "./kit";

/**
 * Ce que l'on trouve sur un site livré à un client, ajouté à chaque mini-site
 * vitrine : bandeau cookies, boutons d'appel flottants, pages Conseils et
 * Mentions légales, galerie agrandissable, envoi de photos dans les formulaires.
 */

/* --------------------------------------------------------------- Photos */

/** Photo libre de droits de public/images/maquettes (voir credits.json). */
export function Pic({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 520px, 90vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/images/maquettes/${src}.jpg`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}

/* ------------------------------------------------- Calques au-dessus du site */

function Social({ kind }: { kind: "facebook" | "instagram" }) {
  return kind === "facebook" ? (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
      <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5 fill-none stroke-current stroke-2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" className="fill-current" />
    </svg>
  );
}

/** Icônes des réseaux sociaux du pied de page. */
export function SocialLinks() {
  return (
    <span className="flex gap-1.5">
      {(["facebook", "instagram"] as const).map((k) => (
        <span
          key={k}
          aria-label={k === "facebook" ? "Facebook" : "Instagram"}
          className="grid size-7 place-items-center rounded-full bg-white/10 text-white/80"
        >
          <Social kind={k} />
        </span>
      ))}
    </span>
  );
}

/** Pastille « Ouvert » des horaires. */
export function OpenNow({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="size-1.5 rounded-full bg-emerald-400" />
      <span className="font-semibold text-emerald-400">Ouvert</span>
      <Clock className="size-3 opacity-60" /> ferme à 18 h
    </span>
  );
}

function WhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3 1 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
    </svg>
  );
}

/** Boutons flottants (WhatsApp et appel) et bandeau cookies, posés sur le site. */
export function SiteOverlays({ info }: { info: SiteInfo }) {
  const { interactive, go } = useMini();
  const [consent, setConsent] = useState<null | "ok" | "no">(null);
  const [toast, setToast] = useState<string | null>(null);
  const say = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(null), 2200);
  };
  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute right-3 bottom-3 z-20 flex flex-col items-end gap-2 transition-[bottom]",
          interactive && consent === null && "bottom-[88px] @min-[600px]:bottom-14",
        )}
      >
        {toast && (
          <span className="rounded-lg bg-nuit px-3 py-2 text-[10px] font-medium text-white shadow-lg">
            {toast}
          </span>
        )}
        <span className="pointer-events-auto flex flex-col gap-2">
          <button
            type="button"
            aria-label="Nous écrire sur WhatsApp"
            onClick={() => say("WhatsApp s'ouvrirait ici (démonstration)")}
            className="grid size-10 place-items-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105"
          >
            <WhatsApp />
          </button>
          <button
            type="button"
            aria-label={`Appeler le ${info.phone}`}
            onClick={() => say(`Appel du ${info.phone} (démonstration)`)}
            className="grid size-10 place-items-center rounded-full bg-(--p) text-(--op) shadow-lg transition-transform hover:scale-105"
          >
            <Phone className="size-4.5" />
          </button>
        </span>
      </div>
      {interactive && consent === null && (
        <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 border-t border-nuit/10 bg-white/95 px-4 py-2.5 shadow-[0_-8px_24px_rgb(0_0_0/0.08)] backdrop-blur @min-[600px]:flex-row @min-[600px]:items-center @min-[600px]:px-6">
          <p className="flex flex-1 items-start gap-2 text-[10px] leading-relaxed text-nuit/65">
            <Cookie className="mt-0.5 size-4 shrink-0 text-(--ink)" />
            <span>
              <b className="text-nuit">Cookies :</b> nous mesurons l&apos;audience pour améliorer le
              site, uniquement avec votre accord.{" "}
              <button type="button" onClick={() => go("mentions")} className="underline">
                En savoir plus
              </button>
            </span>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setConsent("no")}
              className="flex-1 rounded-lg bg-(--s) px-4 py-1.5 text-[10.5px] font-semibold text-nuit"
            >
              Refuser
            </button>
            <button
              type="button"
              onClick={() => setConsent("ok")}
              className="flex-1 rounded-lg bg-(--d) px-4 py-1.5 text-[10.5px] font-semibold text-white"
            >
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ----------------------------------------------------------- Galerie */

export type GalleryItem = { src: string; t: string };

/** Grille de photos qui s'agrandissent au clic, avec navigation. */
export function Gallery({
  items,
  className,
  itemClassName,
}: {
  items: GalleryItem[];
  className?: string;
  itemClassName?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const cur = open === null ? null : items[open];
  return (
    <>
      <div className={cn("grid grid-cols-2 gap-2.5 @min-[600px]:grid-cols-3", className)}>
        {items.map((it, i) => (
          <button
            key={it.src + it.t}
            type="button"
            onClick={() => setOpen(i)}
            className={cn(
              "group relative h-28 overflow-hidden rounded-xl bg-nuit/5 text-left",
              itemClassName,
            )}
          >
            <Pic
              src={it.src}
              alt={it.t}
              sizes="240px"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2.5 pt-6 pb-2 text-[10px] font-semibold text-white">
              {it.t}
            </span>
          </button>
        ))}
      </div>
      {cur && open !== null && (
        <Lightbox
          item={cur}
          index={open}
          count={items.length}
          onClose={() => setOpen(null)}
          onMove={(d) => setOpen((open + d + items.length) % items.length)}
        />
      )}
    </>
  );
}

function Lightbox({
  item,
  index,
  count,
  onClose,
  onMove,
}: {
  item: GalleryItem;
  index: number;
  count: number;
  onClose: () => void;
  onMove: (d: number) => void;
}) {
  return (
    <LightboxPortal>
      <div className="absolute inset-0 z-40 flex flex-col bg-black/90 p-3">
        <div className="flex items-center justify-between text-[10.5px] text-white/70">
          <span>
            {index + 1} / {count} · <span className="font-semibold text-white">{item.t}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="grid size-8 place-items-center rounded-full bg-white/10 text-white"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="relative mt-2 flex-1 overflow-hidden rounded-lg">
          <Pic src={item.src} alt={item.t} className="object-contain" sizes="720px" />
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => onMove(-1)}
            aria-label="Photo précédente"
            className="grid size-8 place-items-center rounded-full bg-white/10 text-white"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            aria-label="Photo suivante"
            className="grid size-8 place-items-center rounded-full bg-white/10 text-white"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </LightboxPortal>
  );
}

/** La visionneuse couvre la fenêtre du mini-site (et non la page qui défile). */
function LightboxPortal({ children }: { children: ReactNode }) {
  const { overlayRoot } = useMini();
  return overlayRoot ? overlayRoot(children) : null;
}

/* ---------------------------------------------------------- Formulaires */

/** Champ « Ajouter des photos » : affiche les fichiers choisis, rien n'est envoyé. */
export function UploadField({ label = "Photos du chantier (facultatif)" }: { label?: string }) {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <label className="block">
      <span className="text-[10px] font-semibold text-nuit/70">{label}</span>
      <span className="mt-1 flex cursor-pointer items-center gap-2.5 rounded-lg border border-dashed border-nuit/20 bg-white px-3 py-2.5 text-[11px] text-nuit/55 hover:border-(--p)">
        <ImagePlus className="size-4 shrink-0 text-(--ink)" />
        {files.length
          ? `${files.length} photo${files.length > 1 ? "s" : ""} : ${files.join(", ")}`
          : "Ajoutez jusqu'à 5 photos pour un devis plus précis"}
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) =>
            setFiles(
              Array.from(e.target.files ?? [])
                .map((f) => f.name)
                .slice(0, 5),
            )
          }
        />
      </span>
    </label>
  );
}

/* ---------------------------------------------------- Pages ajoutées */

function Conseils() {
  const { info } = useMini();
  const articles = info?.articles ?? [];
  return (
    <SubPage
      eyebrow="Conseils"
      title="Nos conseils d'artisan"
      intro="Guides pratiques, prix indicatifs et bonnes pratiques, écrits par l'équipe."
    >
      <div className="grid gap-3 @min-[600px]:grid-cols-3">
        {articles.map((a, i) => (
          <ArticleCard key={a.t} index={i} />
        ))}
      </div>
    </SubPage>
  );
}

/** Carte d'article, réutilisée sur l'accueil. */
export function ArticleCard({ index }: { index: number }) {
  const { info } = useMini();
  const a = info?.articles?.[index];
  if (!a) return null;
  return (
    <Btn
      to="conseil"
      param={String(index)}
      tone="light"
      className="flex-col items-stretch gap-0 overflow-hidden rounded-xl p-0 text-left ring-nuit/8"
    >
      <span className="relative block h-28">
        <Pic src={a.img} alt={a.t} sizes="240px" />
      </span>
      <span className="block p-3">
        <span className="block text-[9.5px] font-semibold tracking-wide text-(--ink) uppercase">
          {a.cat} · {a.read} min de lecture
        </span>
        <span className="mt-1 block text-[12px] leading-snug font-bold text-nuit">{a.t}</span>
        <span className="mt-1 block text-[10px] leading-relaxed font-normal text-nuit/55">
          {a.d}
        </span>
      </span>
    </Btn>
  );
}

function Article() {
  const { info, param, project } = useMini();
  const a = info?.articles?.[Number(param ?? 0)];
  if (!a) return null;
  return (
    <SubPage eyebrow="Conseils" title={a.t} intro={`${a.cat} · ${a.read} min de lecture`}>
      <div className="grid gap-5 @min-[600px]:grid-cols-[1.5fr_1fr]">
        <article className="rounded-2xl bg-white p-4 ring-1 ring-nuit/8">
          <div className="relative h-40 overflow-hidden rounded-xl">
            <Pic src={a.img} alt={a.t} />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed font-semibold text-nuit/80">{a.d}</p>
          {a.body.map((p, i) => (
            <p key={i} className="mt-2.5 text-[11.5px] leading-relaxed text-nuit/65">
              {p}
            </p>
          ))}
        </article>
        <aside className="h-fit rounded-2xl bg-(--d) p-4 text-white">
          <p className="text-[13px] font-bold">Un projet ?</p>
          <p className="mt-1 text-[10.5px] leading-relaxed text-white/65">
            {project.brand} vous conseille gratuitement et vous envoie un devis détaillé.
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-[12px] font-bold">
            <Phone className="size-3.5 text-(--a)" /> {info?.phone}
          </p>
          <Btn to={info?.contactPage ?? "home"} className="mt-3 w-full">
            Demander un devis
          </Btn>
        </aside>
      </div>
    </SubPage>
  );
}

function Mentions() {
  const { project, info } = useMini();
  const rows: [string, string][] = [
    ["Éditeur", `${project.brand}, ${info?.address ?? project.city}`],
    ["Contact", `${info?.phone ?? ""} · ${info?.email ?? ""}`],
    ["Immatriculation", "SIRET et TVA intracommunautaire de l'entreprise"],
    ["Assurance décennale", "Nom de l'assureur et zone de couverture"],
    ["Hébergement", "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis"],
    ["Conception", "NEOBATYS"],
  ];
  return (
    <SubPage
      eyebrow="Mentions légales"
      title="Mentions légales et confidentialité"
      intro="Informations obligatoires pour tout site professionnel en France."
    >
      <div className="grid gap-3 @min-[600px]:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-nuit/8">
          <p className="text-[12px] font-bold text-nuit">Mentions légales</p>
          <dl className="mt-2 divide-y divide-nuit/6">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-2 py-2 text-[10.5px]">
                <dt className="font-semibold text-nuit/70">{k}</dt>
                <dd className="text-nuit/60">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-nuit/8">
          <p className="text-[12px] font-bold text-nuit">Données personnelles</p>
          <ul className="mt-2 space-y-2 text-[10.5px] leading-relaxed text-nuit/60">
            <li>
              Les informations des formulaires servent uniquement à répondre à votre demande et sont
              conservées 3 ans au plus.
            </li>
            <li>
              Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données à{" "}
              {info?.email}.
            </li>
            <li>
              Les cookies de mesure d&apos;audience ne sont déposés qu&apos;avec votre accord,
              modifiable à tout moment.
            </li>
          </ul>
        </div>
      </div>
      <details className="mt-3 rounded-2xl bg-white p-4 ring-1 ring-nuit/8">
        <summary className="cursor-pointer text-[12px] font-bold text-nuit">Crédits photos</summary>
        <p className="mt-2 text-[10.5px] leading-relaxed text-nuit/60">
          Photos d&apos;illustration sous licence libre (Wikimedia Commons). Sur le site livré,
          elles sont remplacées par les photos de vos chantiers.
        </p>
        <ul className="mt-2 divide-y divide-nuit/6 text-[10px]">
          {Object.values(credits).map((c) => (
            <li key={c.url} className="py-1.5 text-nuit/60">
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-nuit/75 underline-offset-2 hover:underline"
              >
                {c.title}
              </a>{" "}
              · {c.creator} · {c.license}
            </li>
          ))}
        </ul>
      </details>
    </SubPage>
  );
}

/** Pages ajoutées à tout site vitrine qui a des coordonnées. */
export function extraPages(info: SiteInfo | undefined): PageDef[] {
  if (!info) return [];
  return [
    ...(info.articles?.length
      ? [
          {
            id: "conseils",
            label: "Conseils",
            path: "/conseils",
            render: () => <Conseils />,
            inNav: false,
          },
          {
            id: "conseil",
            label: "Article",
            path: "/conseils/article",
            render: () => <Article />,
            inNav: false,
          },
        ]
      : []),
    {
      id: "mentions",
      label: "Mentions légales",
      path: "/mentions-legales",
      render: () => <Mentions />,
      inNav: false,
    },
  ];
}

/** Section « Nos conseils » de l'accueil : les trois derniers articles. */
export function ArticlesSection() {
  const { info } = useMini();
  if (!info?.articles?.length) return null;
  return (
    <section className="px-4 py-8 @min-[600px]:px-8 @min-[600px]:py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] text-(--ink) uppercase">Conseils</p>
          <p className="mt-2 font-display text-[22px] leading-[1.1] font-bold tracking-tight text-(--d)">
            Le blog de l&apos;artisan
          </p>
        </div>
        <Btn to="conseils" tone="ghost">
          Tous les articles <ArrowRight className="size-3.5" />
        </Btn>
      </div>
      <div className="mt-5 grid gap-3 @min-[600px]:grid-cols-3">
        {info.articles.map((a, i) => (
          <ArticleCard key={a.t} index={i} />
        ))}
      </div>
    </section>
  );
}
