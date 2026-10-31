import { websiteOffer } from "@/content/offers";
import { OfferSection } from "./OfferSection";

export function WebsiteOffer({ showCta = true }: { showCta?: boolean }) {
  return <OfferSection offer={websiteOffer} theme="sand" showCta={showCta} />;
}
