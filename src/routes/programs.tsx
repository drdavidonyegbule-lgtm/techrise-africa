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
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
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
            <span className="pulse-lime inline-flex items-center gap-2 rounded-full bg-[oklch(0.94_0.24_125)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black">
              ● Now Active: Maiden Edition Spotlight
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

      {/* CATALOG */}
      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Upcoming <span className="text-gradient">tracks</span>
        </h2>
        <p className="mt-2 text-muted-foreground">Our expansion roadmap across audiences and disciplines.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Adults & Corporate Teams Program", tag: "Coming Soon", body: "Advanced applied training for working professionals and entire corporate teams.", icon: Briefcase },
            { title: "Continuous Mentorship Deep Tracks", tag: "Coming Soon", body: "Long-form, cohort-based mentorship for graduates building real ventures.", icon: GraduationCap },
            { title: "TechRise Schools Partnership", tag: "Planned", body: "Embedding our curriculum directly into partner schools across the continent.", icon: Users },
          ].map(({ title, tag, body, icon: Icon }) => (
            <div key={title} className="glass rounded-3xl p-6 opacity-70 transition-opacity hover:opacity-100">
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-muted-foreground" />
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONVERT */}
      <section className="mt-14">
        <Link
          to="/register"
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] p-8 text-white shadow-[0_0_50px_-12px_oklch(0.65_0.25_295/0.7)] sm:p-10"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Limited seats available</div>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Proceed to Online Registration</h3>
            <p className="mt-1 max-w-xl text-sm text-white/80">
              Two-minute intake. You'll select your track on the next screen.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold ring-1 ring-white/30 transition-transform group-hover:translate-x-1">
            <CheckCircle2 className="h-4 w-4" /> Start now <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
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