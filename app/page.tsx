import type { Metadata } from "next";
import { faq } from "@/content/faq";
import { faqJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { TradesMarquee } from "@/components/sections/TradesMarquee";
import { PainPoints } from "@/components/sections/PainPoints";
import { AiServices } from "@/components/sections/AiServices";
import { WebsiteOffer } from "@/components/sections/WebsiteOffer";
import { SoftwareOffer } from "@/components/sections/SoftwareOffer";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { PricingTeaser } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Titre et description viennent du layout
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <TradesMarquee />
      <PainPoints />
      <AiServices />
      <SoftwareOffer />
      <WebsiteOffer />
      <Projects featured />
      <Process />
      <PricingTeaser />
      <Testimonials />
      <Faq />
      <FinalCta />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={websiteJsonLd()} />
    </>
  );
}
