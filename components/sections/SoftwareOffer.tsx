import { softwareOffer } from "@/content/offers";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";
import { OfferSection } from "./OfferSection";

export function SoftwareOffer({ showCta = true }: { showCta?: boolean }) {
  return (
    <OfferSection
      offer={softwareOffer}
      theme="dark"
      reverse
      showCta={showCta}
      visual={<DashboardMockup />}
    />
  );
}
