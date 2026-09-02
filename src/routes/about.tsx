import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageCircle } from "lucide-react";

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

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-cyber-lime)]">
          About TRA Academy
        </span>
        <h1 className="mt-3 font-display text-5xl font-extrabold leading-tight text-foreground sm:text-6xl">
          A Premium African <span className="text-gradient">Practical Tech Institute.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          We exist to close the gap between Africa's young talent and the skills the global digital economy
          actually rewards. We don't teach computer appreciation — we teach execution.
        </p>
      </header>

      {/* Founding story */}
      <section className="mt-14 max-w-3xl">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-cyber-lime)]">
            Our Founding Story
          </div>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            TRA Academy was established in July 2026 under the leadership of Founder{" "}
            <strong className="text-[var(--color-neon-violet)]">Daniel Okpara</strong> and Co-Founder{" "}
            <strong className="text-[var(--color-neon-violet)]">Great Gold</strong>. The institution officially
            launched its operations in August 2026 with its inaugural holiday bootcamp, tailored specifically for
            high-potential youth and young adults.
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          { phase: "Phase 01", title: "Eneka — Origin Hub", body: "Our maiden bootcamp campus inside RCCG The Faithful God Parish, Unity Estate." },
          { phase: "Phase 02", title: "Regional Expansion", body: "Hubs across the South-South and South-East, plus a Lagos creator studio." },
          { phase: "Phase 03", title: "Pan-African Network", body: "Partnership campuses across West, East, and Southern Africa, plus a live LMS." },
        ].map((s) => (
          <div key={s.phase} className="glass rounded-3xl p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-[var(--color-neon-violet)]">{s.phase}</div>
            <h3 className="mt-3 font-display text-xl font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </section>

      {/* Contact grid */}
      <section className="mt-14 grid gap-5 md:grid-cols-3">
        <ContactCard
          icon={<MapPin className="h-5 w-5" />}
          title="Office Location"
          body={<>1st Floor, Jobanny Plaza,<br />Elimgbu, Rivers State.<br />Port Harcourt.</>}
        />
        <ContactCard
          icon={<Mail className="h-5 w-5" />}
          title="Official Email"
          body={<a href="mailto:team.techrise26@gmail.com" className="hover:text-foreground">team.techrise26@gmail.com</a>}
        />
        <ContactCard
          icon={<MessageCircle className="h-5 w-5" />}
          title="WhatsApp Admissions"
          body={
            <>
              <a href="https://wa.me/2348124023599" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground">0812 402 3599</a>
              <a href="https://wa.me/2349036849219" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground">0903 684 9219</a>
            </>
          }
        />
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Frequently asked <span className="text-gradient">questions.</span>
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-[var(--color-neon-violet)] ring-1 ring-white/10">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
      <div className="mt-2 text-sm text-muted-foreground">{body}</div>
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
      >
        <span className="font-display text-base font-semibold text-foreground">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}
