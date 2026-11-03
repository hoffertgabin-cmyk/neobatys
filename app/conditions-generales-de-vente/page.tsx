import { cgv } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente de NEOBATYS pour les artisans et entreprises du bâtiment : prix, paiement, propriété du site, données, responsabilité.",
  path: "/conditions-generales-de-vente",
});

export default function ConditionsGeneralesDeVentePage() {
  return <LegalPage title="Conditions générales de vente" sections={cgv} />;
}
