import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Briefcase, CheckCircle2, GraduationCap, Users } from "lucide-react";
import flyer from "@/assets/bootcamp-flyer.jpg.asset.json";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Admissions — TechRise Africa" },
      { name: "description", content: "TechRise Kids Bootcamp 2026 (August Cohort) — a 1-month practical incubator for ages 7–18+. Limited to 150 seats." },
      { property: "og:title", content: "Programs & Admissions — TechRise Africa" },
      { property: "og:description", content: "Maiden Edition Kids Bootcamp 2026 — intensive 1-month build. Limited seats." },
      { property: "og:url", content: "https://traacademy.org/programs" },
    ],
    links: [{ rel: "canonical", href: "https://traacademy.org/programs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "TechRise Kids Bootcamp 2026",
          description:
            "A 1-month practical incubator for ages 7–18+ covering coding, AI, digital marketing, and business. Limited to 150 seats.",
          provider: {
            "@type": "EducationalOrganization",
            name: "TechRise Africa",
            sameAs: "https://traacademy.org/",
          },
          educationalLevel: "Beginner to Intermediate",
          inLanguage: "en",
          offers: {
            "@type": "Offer",
            price: "50000",
            priceCurrency: "NGN",
            availability: "https://schema.org/LimitedAvailability",
            url: "https://traacademy.org/register",
          },
        }),
      },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 glass rounded-2xl border border-[oklch(0.68_0.24_0/0.35)] bg-[oklch(0.68_0.24_0/0.12)] p-4 text-center sm:p-5">
        <p className="text-sm font-semibold text-foreground sm:text-base">
          Announcement: The August Kids Bootcamp is now <span className="text-[var(--color-neon-pink)]">Closed</span>. All upcoming tracks below are officially <span className="text-[var(--color-cyber-lime)]">Open</span> for expression of interest.
        </p>
      </div>

      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-cyber-lime)]">
          Programs &amp; Admissions
        </span>
        <h1 className="mt-3 font-display text-5xl font-extrabold leading-tight text-foreground sm:text-6xl">
          Where serious students <span className="text-gradient">become builders.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          A structured ladder of practical programs — starting with our maiden Kids Bootcamp and expanding into
          adult and corporate training across the continent.
        </p>
      </header>

      {/* SPOTLIGHT */}
      <section className="mt-12 gradient-border overflow-hidden rounded-[2rem]">
        <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
          <div className="relative p-8 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.68_0.24_0/0.2)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--color-neon-pink)] ring-1 ring-[oklch(0.68_0.24_0/0.4)]">
              ● Closed: Maiden Edition Spotlight
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl">
              TechRise Kids Bootcamp 2026 <span className="text-gradient">(August Cohort)</span>
            </h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              An intensive 1-month practical incubator for Ages 7–18+
            </p>
            <p className="mt-5 text-muted-foreground">
              For the month of August, we are opening our doors for our highly anticipated first edition,
              engineered specifically to weaponize your child's holiday screen time.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Users, title: "Strict 150-Student Cap", body: "Capped at strictly 150 students across the region to guarantee premium, high-focused mentoring." },
                { icon: GraduationCap, title: "Age-Appropriate Tracks", body: "Separated into Juniors (Ages 7–12) and Seniors (Ages 13–18+) so no one is left behind." },
                { icon: Briefcase, title: "Hands-on Portfolios", body: "They don't just take notes — they build real projects every week you can view and test." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="glass rounded-2xl p-4">
                  <Icon className="h-5 w-5 text-[var(--color-neon-violet)]" />
                  <h3 className="mt-3 font-display text-sm font-bold text-foreground">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[oklch(0.94_0.24_125/0.4)] bg-[oklch(0.94_0.24_125/0.08)] p-4">
              <Award className="h-6 w-6 shrink-0 text-[var(--color-cyber-lime)]" />
              <div className="text-sm">
                <div className="font-semibold text-foreground">Bonus</div>
                <div className="text-muted-foreground">Lifetime TechRise Africa Community Membership</div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 text-sm">
              <Meta label="Age" value="7 to 18+" />
              <Meta label="Dates" value="3 – 30 August" />
              <Meta label="Location" value="RCCG Faithful God Parish, Eneka" />
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden md:min-h-full">
            <img src={flyer.url} alt="TechRise Kids Bootcamp 2026 flyer" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[oklch(0.13_0.04_295/0.3)] to-[oklch(0.13_0.04_295)]/80 md:bg-gradient-to-l md:via-transparent" />
          </div>
        </div>
      </section>

      {/* TRAINING PATHWAYS */}
      <section className="mt-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neon-violet)]">
          Training Pathways
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Choose a pathway that matches your <span className="text-gradient">career goals</span>
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Then specialize through focused practical training.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* 01 Web & Software Development */}
          <div className="glass gradient-border rounded-3xl p-7 transition-transform hover:-translate-y-1">
            <span className="font-display text-sm font-bold text-[var(--color-cyber-lime)]">01</span>
            <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Web &amp; Software Development
            </h3>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-foreground">Comprehensive Full-Stack Options</h4>
                <p className="mt-1 text-foreground/80">
                  Frontend (8–12 weeks) focuses on UI/UX and React, while Backend (8–10 weeks) specializes in
                  Laravel and database design.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Specialized Mobile &amp; Game Dev</h4>
                <p className="mt-1 text-foreground/80">
                  Professional tracks for Mobile App Development and Mobile Game Development, both spanning
                  10–14 weeks for full project completion.
                </p>
              </div>
            </div>
          </div>

          {/* 02 Emerging Technologies */}
          <div className="glass gradient-border rounded-3xl p-7 transition-transform hover:-translate-y-1">
            <span className="font-display text-sm font-bold text-[var(--color-cyber-lime)]">02</span>
            <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Emerging Technologies
            </h3>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-foreground">Leading the AI &amp; Web3 Revolution</h4>
                <p className="mt-1 text-foreground/80">
                  Cutting-edge tracks in Artificial Intelligence (NLP, Computer Vision) and Smart Contract/Web3
                  development for blockchain enthusiasts.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Automated Software Development</h4>
                <p className="mt-1 text-foreground/80">
                  Specialized 8–12 week course focusing on CI/CD pipelines, API-driven systems, and workflow
                  automation.
                </p>
              </div>
            </div>
          </div>

          {/* 03 Engineering & Industrial Tech */}
          <div className="glass gradient-border rounded-3xl p-7 transition-transform hover:-translate-y-1">
            <span className="font-display text-sm font-bold text-[var(--color-cyber-lime)]">03</span>
            <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-foreground">
              Engineering &amp; Industrial Tech
            </h3>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-foreground">Hands-on Industrial Training</h4>
                <p className="mt-1 text-foreground/80">
                  Focus on precision manufacturing and industrial logic with PLC and SCADA systems to CNC
                  Machine operation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Robotics &amp; 3D Design</h4>
                <p className="mt-1 text-foreground/80">
                  Most intensive offering (12–16 weeks) involving practical electronics and circuit design in
                  Embedded Systems &amp; Robotics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* WHO IT'S FOR + PHILOSOPHY */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-7">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
              Who these programs are for
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              Students and graduates • Career switchers • Entrepreneurs • Developers • Tech enthusiasts •
              Engineers • Professionals seeking practical upskilling.
            </p>
          </div>
          <div className="glass rounded-3xl p-7">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
              Learning philosophy
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              TRA Academy combines structured instruction, practical application and industry-relevant
              workflows so learners can leave each program with skills they can actually use.
            </p>
          </div>
        </div>
      </section>

      {/* COURSE CATALOG */}
      <section className="mt-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-cyber-lime)]">
          Current program catalog
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Course <span className="text-gradient">catalog</span>
        </h2>

        <div className="mt-8 glass overflow-hidden rounded-3xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-4 sm:px-7">Course name</th>
                <th className="px-5 py-4 text-right sm:px-7">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ["Digital Marketing & Virtual Story Telling", "6–9 weeks"],
                ["Frontend Web Development", "8–12 weeks"],
                ["Backend Web Development (Laravel)", "8–10 weeks"],
                ["Smart Contract & Web3 Development", "10–14 weeks"],
                ["Embedded Systems & Robotics Training", "12–16 weeks"],
                ["Professional Mobile App Development", "10–14 weeks"],
                ["Mobile Game Development", "10–14 weeks"],
                ["Cybersecurity Training", "8–12 weeks"],
                ["3D Design & Printing", "6–10 weeks"],
                ["CNC Machine Training", "8–12 weeks"],
                ["Programming Language Training (Python, JS, etc.)", "6–12 weeks"],
                ["Telegram API & Bot Development", "6–8 weeks"],
                ["Automated Software Development", "8–12 weeks"],
                ["Artificial Intelligence & Applied Automation (AI) Training", "10–14 weeks"],
                ["Industrial Automation (PLC, SCADA, DCS)", "10–14 weeks"],
              ].map(([name, duration]) => (
                <tr key={name} className="transition-colors hover:bg-white/5">
                  <td className="px-5 py-4 font-medium text-foreground sm:px-7">{name}</td>
                  <td className="px-5 py-4 text-right font-semibold text-[var(--color-cyber-lime)] sm:px-7">
                    {duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CATALOG */}
      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Upcoming <span className="text-gradient">tracks</span>
        </h2>
        <p className="mt-2 text-muted-foreground">Our expansion roadmap across audiences and disciplines.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Adults & Corporate Teams Program", tag: "Open", body: "Advanced applied training for working professionals and entire corporate teams.", icon: Briefcase },
            { title: "Continuous Mentorship Deep Tracks", tag: "Open", body: "Long-form, cohort-based mentorship for graduates building real ventures.", icon: GraduationCap },
            { title: "TechRise Schools Partnership", tag: "Open", body: "Embedding our curriculum directly into partner schools across the continent.", icon: Users },
          ].map(({ title, tag, body, icon: Icon }) => (
            <div key={title} className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-[var(--color-neon-violet)]" />
                <span className="rounded-full bg-[oklch(0.94_0.24_125/0.15)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-cyber-lime)] ring-1 ring-[oklch(0.94_0.24_125/0.4)]">
                  {tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-foreground/80">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONVERT */}
      <section className="mt-14">
        <a
          href="https://wa.me/2348124023599?text=Hi%20TechRise%20Africa%2C%20I'm%20interested%20in%20mastering%20a%20digital%20and%20tech%20skill."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] p-8 text-white shadow-[0_0_50px_-12px_oklch(0.65_0.25_295/0.7)] sm:p-10"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Limited seats available</div>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Master a Digital and Tech Skill</h3>
            <p className="mt-1 max-w-xl text-sm text-white/80">
              Intensive, limited-capacity program. Cohort size strictly limited to 150 participants.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold ring-1 ring-white/30 transition-transform group-hover:translate-x-1">
            <CheckCircle2 className="h-4 w-4" /> Start now <ArrowRight className="h-4 w-4" />
          </div>
        </a>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold text-foreground">{value}</div>
    </div>
  );
}
