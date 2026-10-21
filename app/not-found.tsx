import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Erreur 404"
      title="Cette page n'existe pas (ou plus)"
      subtitle="Pas de panique, le reste du chantier est en ordre."
      breadcrumb="Page introuvable"
    >
      <Button href="/" size="lg" arrow>
        Retour à l&apos;accueil
      </Button>
      <Button href="/contact" size="lg" variant="outline-light">
        Nous contacter
      </Button>
    </PageHero>
  );
}
