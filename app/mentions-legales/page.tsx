import { mentionsLegales } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site NEOBATYS : éditeur, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return <LegalPage title="Mentions légales" sections={mentionsLegales} />;
}
