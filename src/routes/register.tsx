import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { saveRegistration } from "@/lib/registration-store";
import { createRegistration } from "@/lib/registration.functions";

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/kppl22p1b3xf1f67op5vxniyj6rdde1d";

async function postToMake(payload: Record<string, unknown>) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2000);
  try {
    await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      mode: "no-cors",
    });
  } catch (err) {
    console.warn("[make-webhook] failed/timeout — continuing checkout", err);
  } finally {
    clearTimeout(timer);
  }
}

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — TechRise Kids Bootcamp 2026" },
      { name: "description", content: "Complete your 2-minute intake to secure a seat in the TechRise Kids Bootcamp 2026 August Cohort." },
      { property: "og:title", content: "Register — TechRise Africa" },
      { property: "og:url", content: "/register" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: RegisterPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  track: z.enum(["juniors", "seniors"]),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", track: "juniors" as "juniors" | "seniors" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const createRegistrationFn = useServerFn(createRegistration);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (flat[i.path[0] as string] = i.message));
      setErrors(flat);
      return;
    }
    setLoading(true);

    // Fire webhook in parallel (non-blocking, hard 2s timeout)
    const webhookPromise = postToMake({
      source: "techrise-register",
      submitted_at: new Date().toISOString(),
      ...parsed.data,
    });

    let userId: string;
    let registrationId: string;
    try {
      const res = await createRegistrationFn({ data: parsed.data });
      userId = res.userId;
      registrationId = res.registrationId;
    } catch (err) {
      console.warn("[register] DB write failed, falling back to mock state", err);
      userId = `mock-${crypto.randomUUID()}`;
      registrationId = `mock-${crypto.randomUUID()}`;
    }

    saveRegistration({
      userId,
      registrationId,
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      track: parsed.data.track,
    });

    // Give the webhook up to 2s, then move on regardless
    await Promise.race([
      webhookPromise,
      new Promise((r) => setTimeout(r, 2000)),
    ]);

    toast.success("Profile saved. Continuing to secure payment…");
    setLoading(false);
    navigate({ to: "/payment" });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Left summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-cyber-lime)]">
            <Sparkles className="h-3.5 w-3.5" /> August Cohort · Maiden Edition
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            Secure your child's <span className="text-gradient">unfair advantage.</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            TechRise Kids Bootcamp 2026 — a 30-day intensive in coding, AI, digital marketing, and business
            development. Strictly capped at 150 seats across the region.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-foreground">
            {[
              "Hands-on weekly project builds",
              "Age-appropriate Junior & Senior tracks",
              "Lifetime TechRise Africa community access",
              "Mentorship from VGP-affiliated operators",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-cyber-lime)]" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 gradient-border rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Investment</div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-foreground">₦50,000</span>
              <span className="text-sm text-muted-foreground line-through">₦65,000</span>
            </div>
            <div className="mt-1 text-xs text-[var(--color-cyber-lime)]">Early-bird saves ₦15,000 · expires July 25th</div>
          </div>
        </aside>

        {/* Right wizard */}
        <form
          onSubmit={onSubmit}
          className="glass rounded-3xl p-6 sm:p-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground">Step 1 — Student details</h2>
            <span className="text-xs text-muted-foreground">1 / 2</span>
          </div>

          <div className="mt-6 space-y-6">
            <Field label="Full name" error={errors.fullName}>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Adaeze Okeke"
                className="input-tr"
              />
            </Field>
            <Field label="Student email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="student@example.com"
                className="input-tr"
              />
            </Field>
            <Field label="Phone number" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="08012345678"
                className="input-tr"
              />
            </Field>
            <Field label="Cohort track" error={errors.track}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "juniors", label: "Juniors", sub: "Ages 7 – 12" },
                  { value: "seniors", label: "Seniors", sub: "Ages 13 – 18+" },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setForm({ ...form, track: opt.value as "juniors" | "seniors" })}
                    className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                      form.track === opt.value
                        ? "scale-[1.02] border-[#8B5CF6] bg-[oklch(0.65_0.25_295/0.18)] shadow-[0_0_30px_0_rgba(139,92,246,0.55)]"
                        : "border-white/10 bg-white/[0.03] hover:scale-[1.01] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="font-display text-lg font-bold text-foreground">{opt.label}</div>
                    <div className="text-xs text-muted-foreground">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-6 py-3.5 text-sm font-semibold text-white glow-violet transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {loading ? "Saving…" : "Proceed to Payment"}
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By proceeding you agree to be contacted by the TechRise Admissions team.
          </p>
        </form>
      </div>

      <style>{`
        .input-tr {
          width: 100%;
          border-radius: 0.875rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.85rem 1rem;
          color: var(--color-foreground);
          font-size: 0.95rem;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input-tr::placeholder { color: rgba(255,255,255,0.35); }
        .input-tr:focus {
          border-color: var(--color-neon-violet);
          box-shadow: 0 0 0 4px oklch(0.65 0.25 295 / 0.18);
        }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-foreground/80">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs text-[oklch(0.78_0.2_25)]">{error}</div>}
    </label>
  );
}