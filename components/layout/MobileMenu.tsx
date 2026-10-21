"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Phone, X } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { site, telHref } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      // Garde le focus dans le menu
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="menu-mobile"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-nuit text-white lg:hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-blueprint-dark mask-fade"
          />
          <div className="relative container-site flex h-18 items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center rounded-full ring-1 ring-white/15"
            >
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">Fermer le menu</span>
            </button>
          </div>
          <nav
            aria-label="Navigation mobile"
            className="relative container-site flex flex-1 flex-col pt-6 pb-10"
          >
            <ul className="flex flex-col">
              {mainNav.map((item, i) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block border-b border-white/10 py-4 font-display text-2xl font-semibold"
                  >
                    {item.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <Button href="/contact" size="lg" arrow onClick={onClose}>
                Demander un devis
              </Button>
              <Button
                href={telHref}
                size="lg"
                variant="outline-light"
                icon={<Phone aria-hidden="true" className="size-4" />}
              >
                {site.phone}
              </Button>
            </div>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
