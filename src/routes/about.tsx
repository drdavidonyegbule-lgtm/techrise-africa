import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageCircle } from "lucide-react";

const pageUrl = "https://traacademy.org/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TRA Academy — Founded by Daniel Okpara & Great Gold" },
      {
        name: "description",
        content:
          "TRA Academy was established in July 2026 by Founder Daniel Okpara and Co-Founder Great Gold. Discover the vision, founding story, and contact details of Africa's premium practical tech institute.",
      },
      { property: "og:title", content: "About TRA Academy — Founded by Daniel Okpara & Great Gold" },
      {
        property: "og:description",
        content:
          "Founded in July 2026 by Daniel Okpara and Great Gold, TRA Academy launched in August 2026 with its inaugural holiday bootcamp for high-potential youth and young adults.",
      },
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
              "@type": "Organization",
              "@id": "https://traacademy.org/#organization",
              name: "TRA Academy",
              alternateName: "TechRise Africa Academy",
              url: "https://traacademy.org",
              logo: "https://traacademy.org/assets/techrise-logo.png",
              foundingDate: "2026-07",
              description:
                "TRA Academy was established in July 2026 under the leadership of Founder Daniel Okpara and Co-Founder Great Gold. The institution officially launched its operations in August 2026 with its inaugural holiday bootcamp, tailored specifically for high-potential youth and young adults.",
              founder: [
                {
                  "@type": "Person",
                  "@id": "https://traacademy.org/#daniel-okpara",
                  name: "Daniel Okpara",
                  jobTitle: "Founder",
                },
                {
                  "@type": "Person",
                  "@id": "https://traacademy.org/#great-gold",
                  name: "Great Gold",
                  jobTitle: "Co-Founder",
                },
              ],
            },
            {
              "@type": "Person",
              "@id": "https://traacademy.org/#daniel-okpara",
              name: "Daniel Okpara",
              jobTitle: "Founder",
              worksFor: { "@id": "https://traacademy.org/#organization" },
              url: pageUrl,
            },
            {
              "@type": "Person",
              "@id": "https://traacademy.org/#great-gold",
              name: "Great Gold",
              jobTitle: "Co-Founder",
              worksFor: { "@id": "https://traacademy.org/#organization" },
              url: pageUrl,
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
