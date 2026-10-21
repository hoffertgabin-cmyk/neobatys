"use client";

import { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Navbar : transparente en haut de page, opaque + floutée au scroll,
 * masquée en descendant et réaffichée en remontant.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (menuOpen) return;
    if (y > prev && y > 320) setHidden(true);
    else if (y < prev - 4) setHidden(false);
  });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-3 z-50 transition-[transform,translate] duration-300 ease-out sm:top-4",
          hidden ? "-translate-y-[150%]" : "translate-y-0",
        )}
      >
        <nav
          aria-label="Navigation principale"
          className={cn(
            "mx-3 flex h-16 items-center justify-between gap-6 rounded-2xl bg-white/80 pr-2.5 pl-4 ring-1 ring-nuit/5 backdrop-blur-xl transition-shadow duration-300 sm:mx-auto sm:max-w-[1160px] sm:pl-5",
            scrolled ? "shadow-lift" : "shadow-soft",
          )}
        >
          <Logo theme="light" />
          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-nuit/70 transition-colors hover:bg-nuit/5 hover:text-nuit"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Button href="/contact" arrow className="hidden sm:inline-flex">
              Demander un devis
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="grid size-11 place-items-center rounded-xl bg-sable text-nuit ring-1 ring-nuit/5 lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
