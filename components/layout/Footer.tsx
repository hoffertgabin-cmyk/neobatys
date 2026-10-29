import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { legalInfo } from "@/content/legal";
import { footerNav } from "@/content/navigation";
import { hasPhone, mailHref, site, telHref } from "@/content/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./CookieBanner";

const socials = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-wide text-white uppercase">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ardoise-light transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const activeSocials = socials.filter((s) => site.socials[s.key]);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-nuit text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-60"
      />
      <div className="relative container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ardoise-light">
            Sites internet, logiciel de gestion et IA pour les artisans du bâtiment.
          </p>
          {activeSocials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {activeSocials.map(({ key, label, Icon }) => (
                <li key={key}>
                  <a
                    href={site.socials[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                  >
                    <Icon className="size-4" />
                    <span className="sr-only">{label} (nouvel onglet)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <FooterColumn title="Nos offres" links={footerNav.offres} />
        <FooterColumn title="NEOBATYS" links={footerNav.entreprise} />
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white uppercase">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-ardoise-light">
            {hasPhone && (
              <li>
                <a href={telHref} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Phone aria-hidden="true" className="size-4 text-chantier" />
                  {site.phone}
                </a>
              </li>
            )}
            <li>
              <a href={mailHref} className="inline-flex items-center gap-2.5 hover:text-white">
                <Mail aria-hidden="true" className="size-4 text-chantier" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-xs text-ardoise-light md:flex-row md:items-center md:justify-between">
          <p>
            © {site.name} · {legalInfo.companyName}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
