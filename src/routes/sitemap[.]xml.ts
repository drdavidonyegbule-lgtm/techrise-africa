import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { galleryImages } from "@/lib/gallery";
import danielPortrait from "@/assets/daniel-okpara-founder-tra-academy.jpg.asset.json";
import heroBoy from "@/assets/techrise-kids-bootcamp-young-coder-vr.jpg.asset.json";
import heroWoman from "@/assets/techrise-student-exploring-ai-tools.jpg.asset.json";
import flyer from "@/assets/techrise-kids-bootcamp-2026-flyer.jpg.asset.json";
import logo from "@/assets/techrise-africa-logo.png.asset.json";

const BASE_URL = "https://traacademy.org";

type SitemapImage = { src: string; title: string; caption?: string };

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Image URLs must be absolute and on the SAME domain as the page (traacademy.org).
const abs = (path: string) => (path.startsWith("http") ? path : `${BASE_URL}${path}`);

const entries: { path: string; changefreq: string; priority: string; images?: SitemapImage[] }[] = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    images: [
      { src: logo.url, title: "TRA Academy — TechRise Africa Hub logo", caption: "Skill. Innovate. Lead." },
      { src: heroBoy.url, title: "Young African coder building in mixed reality at TechRise Africa Kids Bootcamp" },
      { src: heroWoman.url, title: "TechRise Africa student exploring AI tools" },
      ...galleryImages.map((image) => ({ src: image.src, title: image.alt, caption: image.caption })),
    ],
  },
  {
    path: "/programs",
    changefreq: "weekly",
    priority: "0.9",
    images: [{ src: flyer.url, title: "TechRise Kids Bootcamp 2026 flyer", caption: "August cohort — coding, AI, digital marketing and business for ages 7–18+" }],
  },
  { path: "/register", changefreq: "weekly", priority: "0.8" },
  {
    path: "/about",
    changefreq: "monthly",
    priority: "0.6",
    images: [{ src: danielPortrait.url, title: "Daniel Okpara, Founder and CEO of TRA Academy", caption: "Founder of TRA Academy" }],
  },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().split("T")[0];
        const urls = entries
          .map((e) => {
            const images = (e.images ?? [])
              .map(
                (image) =>
                  `    <image:image>\n      <image:loc>${esc(abs(image.src))}</image:loc>\n      <image:title>${esc(image.title)}</image:title>${
                    image.caption ? `\n      <image:caption>${esc(image.caption)}</image:caption>` : ""
                  }\n    </image:image>`,
              )
              .join("\n");
            return `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>${images ? `\n${images}` : ""}\n  </url>`;
          })
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
