import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/sites-internet", priority: 0.9 },
  { path: "/logiciel", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/mentions-legales", priority: 0.2 },
  { path: "/politique-de-confidentialite", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
