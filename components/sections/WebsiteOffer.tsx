import { websiteOffer } from "@/content/offers";
import { SiteMockup } from "@/components/mockups/SiteMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { OfferSection } from "./OfferSection";

export function WebsiteOffer({ showCta = true }: { showCta?: boolean }) {
  return (
    <OfferSection
      offer={websiteOffer}
      theme="light"
      showCta={showCta}
      visual={
        <div className="relative pb-8">
          <SiteMockup />
          <PhoneMockup className="absolute -right-2 -bottom-6 hidden w-[170px] sm:block lg:-right-6" />
        </div>
      }
    />
  );
}
