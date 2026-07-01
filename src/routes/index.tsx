import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, BrainCircuit, Code2, MessageCircle, Megaphone, Briefcase, Sparkles } from "lucide-react";
import heroBoy from "@/assets/hero-vr-boy.jpg.asset.json";
import heroWoman from "@/assets/hero-vr-woman.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechRise Africa — Practical Tech Academy" },
      { name: "description", content: "Premium practical tech academy equipping kids, teens, and young adults with elite coding, AI, and business skills to dominate the digital economy." },
      { property: "og:title", content: "TechRise Africa — Practical Tech Academy" },
      { property: "og:description", content: "Coding · AI · Digital Marketing · Business. Elite, practical tech education for the next generation of African builders." },
      { property: "og:url", content: "https://traacademy.org/" },
    ],
    links: [
      { rel: "canonical", href: "https://traacademy.org/" },
      // Preload LCP hero image for faster paint and better Core Web Vitals.
      { rel: "preload", as: "image", href: heroBoy.url, fetchpriority: "high" } as unknown as { rel: string; href: string },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "TechRise Africa",
          url: "https://traacademy.org/",
          email: "team.techrise26@gmail.com",
          telephone: "+234-812-981-5038",
          description:
            "Premium practical tech academy training kids, teens, and young adults in coding, AI, digital marketing, and business across Africa.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1st Floor, Jobanny Plaza, Elimgbu",
            addressLocality: "Port Harcourt",
            addressRegion: "Rivers State",
            addressCountry: "NG",
          },
          sameAs: ["https://wa.me/2348129815038"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "TechRise Africa",
          url: "https://traacademy.org/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-16">
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-cyber-lime)]">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome to TechRise Africa
            </span>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Building the next generation of African tech titans &amp; innovators
            </p>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              The Future Belongs to <span className="text-gradient">Those Who Build It.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              TechRise Africa Academy equips children, teenagers, and young adults with elite tech skills
              needed to build businesses, command AI, and dominate the digital economy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" id="admissions">
              <Link
                to="/programs"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-6 py-3.5 text-sm font-semibold text-white glow-violet transition-transform hover:scale-[1.02]"
              >
                View Current Programs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://wa.me/2348129815038?text=Hi%20TechRise%20Africa%2C%20I'd%20like%20to%20speak%20to%20an%20academic%20advisor."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> Speak to an Academic Advisor
              </a>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4">
              {[
                ["150", "Mentored seats"],
                ["4", "Core pillars"],
                ["30 days", "Intensive build"],
              ].map(([k, v]) => (
                <div key={v} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-2xl font-bold text-foreground">{k}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{v}</div>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[oklch(0.65_0.25_295/0.35)] via-transparent to-[oklch(0.68_0.24_0/0.3)] blur-3xl" />
            <div className="gradient-border overflow-hidden rounded-[2rem]">
              <img
                src={heroBoy.url}
                alt="Young African coder building in mixed reality at TechRise Africa Kids Bootcamp"
                className="aspect-[4/5] w-full object-cover"
                width={800}
                height={1000}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-44 overflow-hidden rounded-2xl glass glow-pink sm:block">
              <img
                src={heroWoman.url}
                alt="TechRise Africa student exploring AI tools"
                className="aspect-square w-full object-cover"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -right-2 top-6 glass rounded-2xl px-4 py-3">
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-cyber-lime)]">Now Active</div>
              <div className="text-sm font-semibold text-foreground">Kids Bootcamp 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              The school curriculum is lagging. <span className="text-gradient">We are the solution.</span>
            </h2>
          </div>
          <div className="space-y-5 text-lg text-muted-foreground">
            <p>
              Traditional education prepares the next generation for a world that no longer exists.
              At TechRise Africa, we believe <strong className="text-foreground">certificates alone don't move the world</strong> — skills and execution do.
            </p>
            <div className="gradient-border rounded-2xl p-6 text-base text-foreground/90">
              TechRise Africa is an emerging premium practical institute built to democratize tech
              education across the continent. We don't teach basic computer appreciation. We teach our
              students how to think logically, build systems, command artificial intelligence, and create
              sustainable economic value from a young age.
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-cyber-lime)]">
              Core Academy Pillars
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Four disciplines. <span className="text-gradient">One unfair advantage.</span>
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { icon: Code2, title: "Coding & Architecture", desc: "Moving from passive technology consumers to creators. Writing code and building the backend of apps.", tone: "violet" },
            { icon: Bot, title: "AI & Applied Automation", desc: "Teaching students how to leverage Artificial Intelligence tools to scale output and solve real issues.", tone: "pink" },
            { icon: Megaphone, title: "Digital Creative Architecture", desc: "Mastering digital marketing, brand storytelling, and capturing attention in a crowded market.", tone: "lime" },
            { icon: Briefcase, title: "Business & Monetization", desc: "We don't just teach tech — we teach the commercial logic to turn skill sets into bankable ventures.", tone: "violet" },
          ].map(({ icon: Icon, title, desc, tone }, i) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-3xl glass p-7 transition-all hover:-translate-y-1 ${
                i % 2 === 0 ? "md:translate-y-0" : "md:translate-y-6"
              }`}
            >
              <div
                className={`absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl transition-opacity opacity-30 group-hover:opacity-60 ${
                  tone === "violet"
                    ? "bg-[oklch(0.65_0.25_295)]"
                    : tone === "pink"
                      ? "bg-[oklch(0.68_0.24_0)]"
                      : "bg-[oklch(0.94_0.24_125)]"
                }`}
              />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
                  {(i + 1).toString().padStart(2, "0")}. {title}
                </h3>
                <p className="mt-3 max-w-xl text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-5 text-center text-sm text-foreground/90">
          Backed by the operational authority of{" "}
          <span className="font-semibold text-foreground">VGP Media Technologies</span> — a proven operator across multiple high-growth sectors.
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="gradient-border relative overflow-hidden rounded-[2rem] p-10 sm:p-14">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.65_0.25_295/0.25)] via-transparent to-[oklch(0.68_0.24_0/0.25)]" />
          <div className="grid items-center gap-6 md:grid-cols-[1.5fr_auto]">
            <div>
              <BrainCircuit className="h-8 w-8 text-[var(--color-cyber-lime)]" />
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Ready to give your child an unfair advantage in the digital age?
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Limited seats in the August Kids Bootcamp. Early-bird saves ₦15,000 — expires July 25th.
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-7 py-4 text-sm font-semibold text-white glow-violet"
            >
              Secure Your Slot <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
