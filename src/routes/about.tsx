import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageCircle, Quote, Target, Users } from "lucide-react";

const pageUrl = "https://traacademy.org/about";

const foundingStory = `In July 2026, TRA Academy was born from a shared vision between Founder Daniel Okpara and Co-Founder Great Gold: to bridge the gap between raw talent and elite achievement. What began as a bold ambition swiftly materialized just one month later. In August 2026, the academy officially opened its doors, launching an intensive flagship holiday bootcamp designed to challenge, equip, and elevate the next generation.

The debut program brought together an initial cohort of over 30 high-potential young leaders—spanning children, teenagers, and young adults—under the guidance of top-tier industry mentors and senior technology advisors. Through dedicated hands-on mentorship, these experts walk alongside each student, guiding them step-by-step from foundational concepts to building their first functional digital products and securing their first real-world projects.`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TRA Academy — Founded by Daniel Okpara & Great Gold" },
      {
        name: "description",
        content:
          "In July 2026, Daniel Okpara and Great Gold founded TRA Academy. By August 2026 the academy launched its flagship holiday bootcamp for high-potential youth and young adults across Africa.",
      },
      { property: "og:title", content: "About TRA Academy — Founded by Daniel Okpara & Great Gold" },
      {
        property: "og:description",
        content:
          "In July 2026, Daniel Okpara and Great Gold founded TRA Academy. By August 2026 the academy launched its flagship holiday bootcamp for high-potential youth and young adults across Africa.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: pageUrl },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "EducationalOrganization",
              "@id": "https://traacademy.org/#organization",
              name: "TRA Academy",
              alternateName: ["TechRise Africa Academy", "TRA Academy Nigeria"],
              url: "https://traacademy.org",
              logo: "https://traacademy.org/assets/techrise-logo.png",
              foundingDate: "2026-07",
              startDate: "2026-08",
              description: foundingStory,
              founder: [
                {
                  "@type": "Person",
                  "@id": "https://traacademy.org/#daniel-okpara",
                  name: "Daniel Okpara",
                  jobTitle: "Founder",
                  description:
                    "Daniel Okpara is the Founder of TRA Academy. In July 2026 he co-founded the academy with Great Gold to bridge the gap between raw talent and elite achievement in African tech education.",
                },
                {
                  "@type": "Person",
                  "@id": "https://traacademy.org/#great-gold",
                  name: "Great Gold",
                  jobTitle: "Co-Founder",
                  description:
                    "Great Gold is the Co-Founder of TRA Academy. In July 2026 he co-founded the academy with Daniel Okpara and helped launch its inaugural holiday bootcamp in August 2026.",
                },
              ],
              sameAs: ["https://wa.me/2348124023599"],
            },
            {
              "@type": "Person",
              "@id": "https://traacademy.org/#daniel-okpara",
              name: "Daniel Okpara",
              jobTitle: "Founder",
              worksFor: { "@id": "https://traacademy.org/#organization" },
              url: pageUrl,
              description:
                "Daniel Okpara is the Founder of TRA Academy, a premium African practical tech institute launched in July 2026 and opened in August 2026.",
            },
            {
              "@type": "Person",
              "@id": "https://traacademy.org/#great-gold",
              name: "Great Gold",
              jobTitle: "Co-Founder",
              worksFor: { "@id": "https://traacademy.org/#organization" },
              url: pageUrl,
              description:
                "Great Gold is the Co-Founder of TRA Academy, a premium African practical tech institute launched in July 2026 and opened in August 2026.",
            },
            {
              "@type": "Article",
              headline: "About TRA Academy — Founded by Daniel Okpara & Great Gold",
              url: pageUrl,
              author: [
                { "@id": "https://traacademy.org/#daniel-okpara" },
                { "@id": "https://traacademy.org/#great-gold" },
              ],
              publisher: { "@id": "https://traacademy.org/#organization" },
              datePublished: "2026-07",
              description: foundingStory,
              about: [
                { "@type": "Thing", name: "Daniel Okpara" },
                { "@type": "Thing", name: "Great Gold" },
                { "@type": "EducationalOrganization", name: "TRA Academy" },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: AboutPage,
});

const faqs = [
  {
    q: "Is TRA Academy only for children?",
    a: "While our August cohort is specialized for Kids & Teenagers (Ages 7–18+), TRA Academy runs specialized, advanced programs for adults and corporate teams throughout the year.",
  },
  {
    q: "Does my child need prior tech or math skills to join the Bootcamp?",
    a: "No. We build the foundation from the absolute ground up. If they can use a phone or a computer to watch videos, they are ready to learn how to build them.",
  },
  {
    q: "What happens when the Bootcamp ends?",
    a: "Bootcamp graduates become part of the TRA Academy Alumni network, giving them access to advanced follow-up tracks, community meetups, and continuous mentorship.",
  },
];

const phases = [
  { phase: "Phase 01", title: "Eneka — Origin Hub", body: "Our maiden bootcamp campus inside RCCG The Faithful God Parish, Unity Estate." },
  { phase: "Phase 02", title: "Regional Expansion", body: "Hubs across the South-South and South-East, plus a Lagos creator studio." },
  { phase: "Phase 03", title: "Pan-African Network", body: "Partnership campuses across West, East, and Southern Africa, plus a live LMS." },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      {/* Hero */}
      <header className="max-w-4xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cyber-lime)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-cyber-lime)] ring-1 ring-[var(--color-cyber-lime)]/20">
          About TRA Academy
        </span>
        <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
          A Premium African{" "}
          <span className="text-gradient">Practical Tech Institute.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          We exist to close the gap between Africa's young talent and the skills the global digital economy
          actually rewards. We don't teach computer appreciation — we teach execution.
        </p>
      </header>

      {/* Mission strip */}
      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <MissionCard
          icon={<Target className="h-5 w-5" />}
          title="Our Mission"
          body="Equip African youth with elite, hands-on tech skills that translate directly into income, impact, and independence."
        />
        <MissionCard
          icon={<Users className="h-5 w-5" />}
          title="Our Approach"
          body="Small cohorts, senior mentors, and real projects. Every student builds something tangible before the program ends."
        />
        <MissionCard
          icon={<Quote className="h-5 w-5" />}
          title="Our Promise"
          body="Foundational concepts to functional products — then to first paying clients. We walk the full journey with you."
        />
      </section>

      {/* Founding story */}
      <section className="mt-20 max-w-4xl">
        <div className="relative glass rounded-[2rem] p-7 sm:p-10 lg:p-12">
          <div className="absolute -top-3 left-8 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-neon-violet)] to-[var(--color-neon-pink)] text-white shadow-lg">
            <Quote className="h-6 w-6" />
          </div>
          <div className="pt-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-violet)]">
              Our Founding Story
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
              From vision to classroom in 30 days.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-[1.85] text-foreground/90 sm:text-lg">
              <p>
                In July 2026, TRA Academy was born from a shared vision between Founder{" "}
                <span className="font-semibold text-[var(--color-cyber-lime)]">Daniel Okpara</span>{" "}
                and Co-Founder{" "}
                <span className="font-semibold text-[var(--color-cyber-lime)]">Great Gold</span>: to bridge
                the gap between raw talent and elite achievement. What began as a bold ambition swiftly
                materialized just one month later. In August 2026, the academy officially opened its doors,
                launching an intensive flagship holiday bootcamp designed to challenge, equip, and elevate the
                next generation.
              </p>
              <p>
                The debut program brought together an initial cohort of over 30 high-potential young
                leaders—spanning children, teenagers, and young adults—under the guidance of top-tier industry
                mentors and senior technology advisors. Through dedicated hands-on mentorship, these experts
                walk alongside each student, guiding them step-by-step from foundational concepts to building
                their first functional digital products and securing their first real-world projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="mt-20">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-cyber-lime)]">
              Leadership
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Meet the founders.
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <FounderCard
            name="Daniel Okpara"
            role="Founder"
            bio="Daniel co-founded TRA Academy in July 2026 to turn Africa's raw tech talent into elite, market-ready builders."
          />
          <FounderCard
            name="Great Gold"
            role="Co-Founder"
            bio="Great Gold helped launch the academy's inaugural bootcamp and drives its expansion across regions and partnerships."
          />
        </div>
      </section>

      {/* Roadmap */}
      <section className="mt-20">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-violet)]">
            Growth Roadmap
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Where we are headed.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {phases.map((s, i) => (
            <div key={s.phase} className="glass group relative rounded-3xl p-6 transition-colors hover:bg-white/[0.07]">
              <div className="absolute left-6 top-0 h-1 w-12 -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--color-neon-violet)] to-[var(--color-neon-pink)]" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-bold text-[var(--color-neon-violet)] ring-1 ring-white/10">
                0{i + 1}
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-neon-violet)]">
                {s.phase}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact grid */}
      <section className="mt-20">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-cyber-lime)]">
            Get in Touch
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Contact us.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <ContactCard
            icon={<MapPin className="h-5 w-5" />}
            title="Office Location"
            body={
              <>
                1st Floor, Jobanny Plaza,
                <br />
                Elimgbu, Rivers State.
                <br />
                Port Harcourt.
              </>
            }
          />
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            title="Official Email"
            body={
              <a href="mailto:team.techrise26@gmail.com" className="hover:text-foreground">
                team.techrise26@gmail.com
              </a>
            }
          />
          <ContactCard
            icon={<MessageCircle className="h-5 w-5" />}
            title="WhatsApp Admissions"
            body={
              <>
                <a
                  href="https://wa.me/2348124023599"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-foreground"
                >
                  0812 402 3599
                </a>
                <a
                  href="https://wa.me/2349036849219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-foreground"
                >
                  0903 684 9219
                </a>
              </>
            }
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24 max-w-4xl">
        <div className="text-center md:text-left">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-neon-violet)]">
            Help Center
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Frequently asked <span className="text-gradient">questions.</span>
          </h2>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MissionCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-6 transition-colors hover:bg-white/[0.07]">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-neon-violet)]/20 to-[var(--color-neon-pink)]/20 text-[var(--color-neon-violet)] ring-1 ring-white/10">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function FounderCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="glass flex flex-col rounded-3xl p-6 sm:flex-row sm:items-start sm:gap-5">
      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-neon-violet)] to-[var(--color-neon-pink)] font-display text-xl font-bold text-white shadow-lg">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="mt-4 sm:mt-0">
        <h3 className="font-display text-xl font-bold text-foreground">{name}</h3>
        <div className="mt-1 text-sm font-semibold text-[var(--color-cyber-lime)]">{role}</div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6 text-center transition-colors hover:bg-white/[0.07]">
      <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-neon-violet)]/20 to-[var(--color-neon-pink)]/20 text-[var(--color-neon-violet)] ring-1 ring-white/10">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-5 py-5 text-sm leading-relaxed text-muted-foreground">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}
