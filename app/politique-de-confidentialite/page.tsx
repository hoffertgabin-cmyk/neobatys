import { politiqueConfidentialite } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment NEOBATYS collecte et protège vos données personnelles (RGPD) et gère les cookies.",
  path: "/politique-de-confidentialite",
});

export default function PolitiqueConfidentialitePage() {
  return <LegalPage title="Politique de confidentialité" sections={politiqueConfidentialite} />;
}
