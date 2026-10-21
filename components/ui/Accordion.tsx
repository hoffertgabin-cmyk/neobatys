"use client";

import { useId, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { question: string; answer: string };

/** Accordéon accessible (boutons + régions), une seule réponse ouverte à la fois. */
export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div
      className={cn(
        "divide-y divide-nuit/10 rounded-2xl bg-white shadow-soft ring-1 ring-nuit/5",
        className,
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-display text-base font-semibold text-nuit sm:px-7 sm:text-lg"
              >
                {item.question}
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full bg-sable transition-transform duration-300 ease-out",
                    isOpen && "rotate-45 bg-chantier",
                  )}
                >
                  <Plus aria-hidden="true" className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 leading-relaxed text-ardoise-dark sm:px-7">
                    {item.answer}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
