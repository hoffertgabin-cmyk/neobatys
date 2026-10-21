"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";
import { sectionsCopy } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderBadge } from "@/components/ui/Badge";

/** Carrousel de témoignages : flèches, points, défilement auto en pause au survol/focus. */
export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  const go = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + count) % count, delta]),
    [count],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [paused, reduce, go]);

  const t = testimonials[index];

  return (
    <Section theme="light" aria-labelledby="temoignages-titre">
      <SectionHeading
        id="temoignages-titre"
        eyebrow={sectionsCopy.testimonials.eyebrow}
        title={sectionsCopy.testimonials.title}
      />
      <div
        role="region"
        aria-roledescription="carrousel"
        aria-label="Témoignages clients"
        className="relative mx-auto mt-14 max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="relative min-h-[300px] overflow-hidden rounded-3xl bg-sable p-8 ring-1 ring-nuit/5 sm:min-h-[260px] sm:p-12">
          <Quote
            aria-hidden="true"
            className="absolute top-5 right-5 size-10 text-chantier/20 sm:top-6 sm:right-6 sm:size-16"
          />
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <m.figure
              key={index}
              custom={direction}
              aria-roledescription="diapositive"
              aria-label={`${index + 1} sur ${count}`}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="pt-6 font-display text-xl leading-relaxed font-semibold text-nuit sm:pt-0 sm:pr-14 sm:text-2xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-full bg-nuit font-display font-bold text-chantier-light"
                >
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-ardoise-dark">
                    {t.trade} · {t.city}
                  </span>
                </span>
                {site.showPlaceholderBadges && t.placeholder && (
                  <PlaceholderBadge className="ml-auto text-ardoise-dark" />
                )}
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Afficher le témoignage ${i + 1}`}
                aria-current={i === index}
                className="grid size-11 place-items-center"
              >
                <span
                  className={cn(
                    "block size-2.5 rounded-full transition-[transform,translate,scale,background-color] duration-300",
                    i === index ? "scale-125 bg-chantier" : "bg-nuit/20",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-nuit/10 transition-colors hover:bg-sable"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
              <span className="sr-only">Témoignage précédent</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid size-11 place-items-center rounded-full bg-nuit text-white transition-colors hover:bg-acier"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
              <span className="sr-only">Témoignage suivant</span>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
