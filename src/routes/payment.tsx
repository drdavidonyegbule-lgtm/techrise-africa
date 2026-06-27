import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Building2, Copy, CreditCard, FileUp, Loader2, Lock, ShieldCheck, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { clearRegistration, loadRegistration, type StoredRegistration } from "@/lib/registration-store";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Payment — TechRise Africa" },
      { name: "description", content: "Complete your TechRise Kids Bootcamp 2026 payment via Paystack or bank transfer." },
      { property: "og:title", content: "Payment — TechRise Africa" },
      { property: "og:url", content: "/payment" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/payment" }],
  }),
  component: PaymentPage,
});

const PAYSTACK_URL = "https://paystack.shop/pay/vgp";

function PaymentPage() {
  const navigate = useNavigate();
  const [reg, setReg] = useState<StoredRegistration | null>(null);
  const [method, setMethod] = useState<"paystack" | "bank_transfer">("paystack");

  useEffect(() => {
    const r = loadRegistration();
    if (!r) {
      toast.error("Please complete the registration form first.");
      navigate({ to: "/register" });
      return;
    }
    setReg(r);
  }, [navigate]);

  if (!reg) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Secure checkout
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            Confirm &amp; pay.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Hi <span className="text-foreground font-medium">{reg.fullName}</span> — you're almost in.
          </p>

          <div className="mt-8 glass rounded-3xl p-6">
            <h3 className="font-display text-lg font-bold text-foreground">Order summary</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <Row k="Program" v="TechRise Kids Bootcamp 2026" />
              <Row k="Track" v={reg.track === "juniors" ? "Juniors (7–12)" : "Seniors (13–18+)"} />
              <Row k="Cohort" v="3 – 30 August" />
              <Row k="Contact" v={reg.email} />
            </dl>

            <div className="mt-6 rounded-2xl border border-white/10 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Early-bird price</span>
                <span className="text-xs text-muted-foreground line-through">₦65,000</span>
              </div>
              <div className="mt-1 font-display text-4xl font-bold text-foreground">₦50,000</div>
              <div className="mt-2 text-xs text-[var(--color-cyber-lime)]">
                Early bird expires <span className="font-semibold">July 25th</span>. Secure your child's slot today and instantly save ₦15,000.
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-[var(--color-cyber-lime)]" /> Verified by VGP Media Technologies
            </div>
          </div>
        </aside>

        {/* Payment selector */}
        <section>
          <div className="glass mb-6 grid grid-cols-2 rounded-full p-1">
            {[
              { id: "paystack", label: "Paystack" },
              { id: "bank_transfer", label: "Bank Transfer" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id as "paystack" | "bank_transfer")}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  method === m.id
                    ? "bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] text-white shadow-[0_0_25px_-6px_oklch(0.65_0.25_295/0.7)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {method === "paystack" ? <PaystackPanel reg={reg} /> : <BankPanel reg={reg} />}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Need help?{" "}
            <a
              href="https://wa.me/2348129815038"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Chat with admissions on WhatsApp
            </a>{" "}
            or{" "}
            <Link to="/register" className="text-foreground hover:underline">
              edit details
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium text-foreground">{v}</dd>
    </div>
  );
}

function PaystackPanel({ reg }: { reg: StoredRegistration }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const reference = `TR-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`.toUpperCase();
      await supabase
        .from("bootcamp_registrations")
        .update({
          payment_method: "paystack",
          reference_id: reference,
          payment_status: "approved",
        })
        .eq("id", reg.registrationId);

      const url = `${PAYSTACK_URL}?email=${encodeURIComponent(reg.email)}&amount=50000&currency=NGN&reference=${reference}`;
      window.open(url, "_blank", "noopener,noreferrer");
      navigate({ to: "/payment/success", search: { ref: reference } });
    } catch (err) {
      console.error(err);
      toast.error("Could not start Paystack checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          <CreditCard className="h-6 w-6 text-[var(--color-neon-violet)]" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">Pay Online via Paystack</h3>
          <p className="text-sm text-muted-foreground">
            Card, bank, USSD, transfer — instant confirmation.
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        <li>• Charged in Naira (₦50,000)</li>
        <li>• Receipt emailed automatically by Paystack</li>
        <li>• Slot confirmed the moment payment succeeds</li>
      </ul>

      <button
        onClick={handlePay}
        disabled={loading}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-6 py-3.5 text-sm font-semibold text-white glow-violet disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
        Pay ₦50,000 via Paystack
      </button>
    </div>
  );
}

function BankPanel({ reg }: { reg: StoredRegistration }) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  function pickFile(f: File | null) {
    if (!f) return;
    const ok = ["image/png", "image/jpeg", "image/webp", "application/pdf"].includes(f.type);
    if (!ok) {
      toast.error("Please upload an image (PNG/JPG/WEBP) or PDF.");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      toast.error("File must be under 8MB.");
      return;
    }
    setFile(f);
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  async function submit() {
    if (!file) {
      toast.error("Upload your payment proof to continue.");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${reg.registrationId}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("receipts").upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (upErr) throw upErr;

      const reference = `TR-BT-${Date.now().toString(36)}`.toUpperCase();
      await supabase
        .from("bootcamp_registrations")
        .update({
          payment_method: "bank_transfer",
          receipt_url: path,
          reference_id: reference,
          payment_status: "pending_verification",
        })
        .eq("id", reg.registrationId);

      navigate({ to: "/payment/success", search: { ref: reference, method: "bank" } });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          <Building2 className="h-6 w-6 text-[var(--color-neon-pink)]" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">Direct Bank Transfer</h3>
          <p className="text-sm text-muted-foreground">Transfer to the account below, then upload proof.</p>
        </div>
      </div>

      <div className="mt-6 gradient-border rounded-2xl p-5">
        <BankRow k="Bank name" v="Moniepoint MFB" />
        <BankRow k="Account name" v="VGP Media Technologies" />
        <BankRow k="Account number" v="6018873172" onCopy={() => copy("6018873172")} mono />
        <BankRow k="Amount" v="₦50,000" />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          pickFile(e.dataTransfer.files?.[0] ?? null);
        }}
        onClick={() => inputRef.current?.click()}
        className={`mt-6 cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver
            ? "border-[var(--color-neon-violet)] bg-[oklch(0.65_0.25_295/0.08)]"
            : "border-white/15 hover:border-white/30 bg-white/[0.02]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
        />
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/5">
          <FileUp className="h-6 w-6 text-foreground" />
        </div>
        <div className="mt-4 font-semibold text-foreground">
          {file ? file.name : "Upload Payment Proof"}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {file ? `${(file.size / 1024).toFixed(0)} KB` : "Drag &amp; drop or click — PNG, JPG, WEBP, PDF (max 8MB)"}
        </div>
      </div>

      <button
        onClick={submit}
        disabled={uploading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-6 py-3.5 text-sm font-semibold text-white glow-violet disabled:opacity-60"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        Complete Registration
      </button>
    </div>
  );
}

function BankRow({ k, v, onCopy, mono }: { k: string; v: string; onCopy?: () => void; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 py-2 last:border-0">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div>
      <div className="flex items-center gap-2">
        <span className={`font-semibold text-foreground ${mono ? "font-mono tracking-wider" : ""}`}>{v}</span>
        {onCopy && (
          <button onClick={onCopy} className="rounded-md p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground" aria-label="Copy">
            <Copy className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// Keep referenced — prevent treeshake of `clearRegistration` if we add a reset link later.
void clearRegistration;