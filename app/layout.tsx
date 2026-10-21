import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { localBusinessJsonLd } from "@/lib/seo";
import { CONSENT_KEY, CONSENT_MAX_AGE_MS } from "@/lib/consent";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Sites internet et logiciel de gestion pour artisans à ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Création de sites internet et logiciel de devis et factures pour artisans du bâtiment, à Metz et alentours. Moins de paperasse, plus de chantiers.",
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "fr_FR", type: "website" },
  formatDetection: { telephone: false },
};

const bootScript = `(function(d){d.classList.add('js');try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}'));if(c&&Date.now()-c.at<${CONSENT_MAX_AGE_MS})d.classList.add('consent-set')}catch(e){}})(document.documentElement)`;

export const viewport: Viewport = {
  themeColor: "#0B1B2E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        {/* Avant l'affichage : active les animations (JS dispo) et masque le bandeau cookies si un choix existe */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <a
          href="#contenu"
          className="sr-only z-[100] rounded-full bg-chantier px-5 py-3 font-semibold text-nuit focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <SmoothScroll />
          <RevealObserver />
          <Navbar />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </MotionProvider>
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
