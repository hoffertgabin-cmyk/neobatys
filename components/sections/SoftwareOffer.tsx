import { softwareOffer } from "@/content/offers";
import { ConsoleMockup } from "@/components/mockups/ConsoleMockup";
import { OfferSection } from "./OfferSection";

export function SoftwareOffer({ showCta = true }: { showCta?: boolean }) {
  return (
    <OfferSection
      offer={softwareOffer}
      theme="dark"
      reverse
      showCta={showCta}
      visual={<ConsoleMockup />}
    />
  );
}
