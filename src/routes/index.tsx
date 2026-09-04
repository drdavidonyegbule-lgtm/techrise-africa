import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, BrainCircuit, ChevronLeft, ChevronRight, Code2, MessageCircle, Megaphone, Briefcase, Sparkles } from "lucide-react";
import heroBoy from "@/assets/hero-vr-boy.jpg.asset.json";
import heroWoman from "@/assets/hero-vr-woman.jpg.asset.json";
import galleryStudentLaptop from "@/assets/gallery-student-laptop.jpg.asset.json";
import galleryStudentsMentors from "@/assets/gallery-students-mentors.jpg.asset.json";
import galleryMentorSession from "@/assets/gallery-mentor-session.jpg.asset.json";
import galleryPassingOutDay from "@/assets/gallery-passing-out-day.jpg.asset.json";
import galleryTeamMentors from "@/assets/gallery-team-mentors.jpg.asset.json";
import gallerySpeakerCeremony from "@/assets/gallery-speaker-ceremony.jpg.asset.json";
import galleryKidsPassingOut from "@/assets/gallery-kids-passing-out.jpg.asset.json";

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
          telephone: "+234-812-402-3599",
          description:
            "Premium practical tech academy training kids, teens, and young adults in coding, AI, digital marketing, and business across Africa.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1st Floor, Jobanny Plaza, Elimgbu",
            addressLocality: "Port Harcourt",
            addressRegion: "Rivers State",
            addressCountry: "NG",
          },
          sameAs: ["https://wa.me/2348124023599"],
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
  const [current, setCurrent] = useState(0);

  const galleryImages = [
    { src: galleryStudentLaptop.url, alt: "TRA Academy student smiling while learning on a laptop during a practical session", caption: "Hands-on learning, real laptops, real progress" },
    { src: galleryStudentsMentors.url, alt: "TRA Academy students and mentors together during the August bootcamp", caption: "Building confidence from the first line of code" },
    { src: galleryMentorSession.url, alt: "Mentor guiding a TRA Academy student through a project on a laptop", caption: "One-on-one mentorship with industry experts" },
    { src: galleryPassingOutDay.url, alt: "Guests and mentors celebrating at TRA Academy August bootcamp passing out day", caption: "Celebrating every milestone" },
    { src: galleryTeamMentors.url, alt: "TRA Academy mentors and instructors in branded shirts at the passing out ceremony", caption: "The mentors behind the mission" },
    { src: gallerySpeakerCeremony.url, alt: "Guest speaker addressing TRA Academy students at the passing out ceremony", caption: "Inspiration from leaders who have done it" },
    { src: galleryKidsPassingOut.url, alt: "TRA Academy kids bootcamp cohort celebrating at the passing out day photo booth", caption: "Cohort culture: learn, build, rise together" },
  ];

  const nextSlide = useCallback(() => {
    setCurrent((i) => (i + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevSlide = useCallback(() => {
    setCurrent((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

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
                href="https://wa.me/2348124023599?text=Hi%20TechRise%20Africa%2C%20I'd%20like%20to%20speak%20to%20an%20academic%20advisor."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> Speak to an Academic Advisor
              </a>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
              {[
                ["150", "Mentored seats"],
                ["4", "Core pillars"],
                ["3-6", "months intensive"],
              ].map(([k, v]) => (
                <div key={v} className="glass flex flex-col-reverse rounded-2xl p-4 text-center">
                  <dt className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{v}</dt>
                  <dd className="font-display text-lg font-bold whitespace-nowrap text-foreground sm:text-xl md:text-2xl">{k}</dd>
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
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-neon-pink)]">Closed</div>
              <div className="text-sm font-semibold text-foreground">Kids Bootcamp 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SLIDER */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-cyber-lime)]">
              Inside the Academy
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Moments from <span className="text-gradient">TRA Academy</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous image"
              onClick={prevSlide}
              className="grid h-11 w-11 place-items-center rounded-full glass text-foreground transition-colors hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={nextSlide}
              className="grid h-11 w-11 place-items-center rounded-full glass text-foreground transition-colors hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] gradient-border">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {galleryImages.map(({ src, alt, caption }) => (
              <div key={alt} className="relative w-full flex-shrink-0">
                <img
                  src={src}
                  alt={alt}
                  className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
                  width={1280}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8">
                  <p className="font-display text-lg font-semibold text-white sm:text-xl">{caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {galleryImages.map(({ alt }, i) => (
            <button
              key={alt}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-8 bg-[var(--color-cyber-lime)]" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
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
                The August Kids Bootcamp is now closed.
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Our open tracks for adults, mentorship, and school partnerships are now accepting expressions of interest.
              </p>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-7 py-4 text-sm font-semibold text-white glow-violet"
            >
              View Open Tracks <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MASTERCLASS COHORT */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6" id="masterclass">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-cyber-lime)]">
            Cultivate Exceptional Mastery
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Join Our Intensive <span className="text-gradient">Masterclass Cohort</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-muted-foreground">
            Our specialized training is thoughtfully structured to fit seamlessly into your academic calendar, work schedule,
            and personal commitments — with personalized mentorship and hands-on learning designed to give you a complete,
            practical experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Weekday Operations */}
          <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[oklch(0.65_0.25_295)] opacity-20 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-cyber-lime)] ring-1 ring-white/10">
                Weekday Operations
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-foreground">Masterclass Schedule</h3>
              <ul className="mt-6 space-y-4">
                {[
                  { label: "Morning", time: "10:00 AM – 12:00 PM" },
                  { label: "Afternoon", time: "1:00 PM – 3:00 PM" },
                  { label: "Evening", time: "4:00 PM – 6:00 PM" },
                ].map(({ label, time }) => (
                  <li key={label} className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <span className="font-semibold text-foreground">{label}</span>
                    <span className="text-sm font-medium text-[var(--color-cyber-lime)]">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Weekend Intensive */}
          <div className="gradient-border relative overflow-hidden rounded-3xl p-8 sm:p-10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.65_0.25_295/0.2)] via-transparent to-[oklch(0.68_0.24_0/0.2)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-neon-pink)] ring-1 ring-white/10">
                Weekend Intensive
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-foreground">Saturday Sprint</h3>
              <div className="mt-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-foreground">Saturday</span>
                  <span className="text-sm font-medium text-[var(--color-neon-pink)]">9:00 AM – 5:00 PM</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-muted-foreground">
                <span className="rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">Flexible learning</span>
                <span className="rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">Expert mentorship</span>
                <span className="rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">Exceptional mastery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://wa.me/2348124023599?text=Hi%20TechRise%20Africa%2C%20I'd%20like%20to%20join%20the%20masterclass%20cohort."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-7 py-4 text-sm font-semibold text-white glow-violet transition-transform hover:scale-[1.02]"
          >
            Join the Masterclass Cohort
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
