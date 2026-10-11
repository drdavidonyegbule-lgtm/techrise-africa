import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { galleryImages } from "@/lib/gallery";
import danielPortrait from "@/assets/daniel-okpara-founder-tra-academy.jpg.asset.json";

const BASE_URL = "https://traacademy.org";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0", images: galleryImages.map((image) => image.src) },
          { path: "/programs", changefreq: "weekly", priority: "0.9" },
          { path: "/register", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.6", images: [danielPortrait.url] },
        ];
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n${(e.images ?? []).map((image) => `    <image:image><image:loc>https://techrise-africa.lovable.app${image}</image:loc></image:image>`).join("\n")}\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
