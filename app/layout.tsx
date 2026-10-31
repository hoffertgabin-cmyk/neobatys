import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
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
import { PageViewPing } from "@/components/seo/PageViewPing";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const defaultTitle = `${site.name} · Sites internet, logiciel et IA pour artisans du bâtiment`;
const description =
  "Sites internet, logiciel de devis et factures et assistants IA pour les artisans du bâtiment. Plus de clients, moins de coûts, moins de paperasse.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s · ${site.name}` },
  description,
  applicationName: site.name,
  // Hérités par l'accueil ; les autres pages les remplacent via pageMetadata (lib/seo.ts)
  openGraph: {
    title: defaultTitle,
    description,
    url: "/",
    siteName: site.name,
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description, images: ["/opengraph-image"] },
  formatDetection: { telephone: false },
};

const bootScript = `(function(d){d.classList.add('js');try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}'));if(c&&Date.now()-c.at<${CONSENT_MAX_AGE_MS})d.classList.add('consent-set')}catch(e){}})(document.documentElement)`;

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={geist.variable} suppressHydrationWarning>
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
        <PageViewPing />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
