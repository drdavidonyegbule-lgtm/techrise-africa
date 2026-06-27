import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { z } from "zod";
import { clearRegistration, loadRegistration } from "@/lib/registration-store";

const search = z.object({
  ref: z.string().optional(),
  method: z.string().optional(),
});

export const Route = createFileRoute("/payment/success")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Registration Received — TechRise Africa" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { ref, method } = useSearch({ from: "/payment/success" });
  const reg = loadRegistration();

  useEffect(() => {
    // Clear after read so refresh doesn't replay state.
    const t = setTimeout(() => clearRegistration(), 1000);
    return () => clearTimeout(t);
  }, []);

  const isBank = method === "bank";

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] glow-violet">
        <CheckCircle2 className="h-10 w-10 text-white" />
      </div>
      <span className="mt-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-cyber-lime)]">
        <Sparkles className="h-3.5 w-3.5" />
        {isBank ? "Registration received" : "Payment recorded"}
      </span>
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
        {isBank ? "We've received your proof." : "You're in."}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        {isBank
          ? "Our admissions team will verify your transfer within 24 hours and email you a confirmation. Reach out on WhatsApp for instant verification."
          : "Welcome aboard. Your seat in the TechRise Kids Bootcamp 2026 is being processed. Check your email for the official welcome pack."}
      </p>

      {ref && (
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm">
          <span className="text-muted-foreground">Reference</span>
          <span className="font-mono text-foreground">{ref}</span>
        </div>
      )}
      {reg && (
        <div className="mt-2 text-sm text-muted-foreground">
          Confirmation will be sent to{" "}
          <span className="text-foreground">{reg.email}</span>
        </div>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href="https://wa.me/2348129815038"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-6 py-3 text-sm font-semibold text-white glow-violet"
        >
          <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
        </a>
        <Link to="/" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground">
          Back to Home
        </Link>
      </div>
    </div>
  );
}