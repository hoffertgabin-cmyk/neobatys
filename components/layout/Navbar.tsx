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
          "fixed inset-x-0 top-0 z-50 transition-[transform,translate,scale,background-color,box-shadow] duration-300 ease-out",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-nuit/80 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav
          aria-label="Navigation principale"
          className="container-site flex h-18 items-center justify-between gap-6"
        >
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
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
              className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/15 lg:hidden"
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
