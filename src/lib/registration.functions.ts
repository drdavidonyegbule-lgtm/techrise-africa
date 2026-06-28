import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const createSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255).toLowerCase(),
  phone: z.string().trim().min(7).max(30),
  track: z.enum(["juniors", "seniors"]),
});

const paymentSchema = z.object({
  registrationId: z.string().uuid(),
  method: z.enum(["paystack", "bank_transfer"]),
  reference: z.string().min(4).max(80),
  status: z.enum(["approved", "pending_verification"]),
  receipt: z
    .object({
      filename: z.string().min(1).max(120),
      contentType: z.string().min(1).max(80),
      base64: z.string().min(10),
    })
    .optional(),
});

function toBase64Url(input: string) {
  // btoa is available in the Workers runtime
  const b64 = typeof btoa !== "undefined" ? btoa(input) : Buffer.from(input, "utf-8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sendGmail(to: string, subject: string, htmlBody: string, textBody: string) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey || !gmailKey) {
    console.warn("[email] Skipping send — Gmail connector not linked yet.");
    return { sent: false, reason: "connector_not_linked" as const };
  }

  const boundary = `tr_${Math.random().toString(36).slice(2)}`;
  const rfc2822 = [
    `From: TechRise Africa <team.techrise@gmail.com>`,
    `To: ${to}`,
    `Reply-To: team.techrise@gmail.com`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    textBody,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    htmlBody,
    "",
    `--${boundary}--`,
  ].join("\r\n");

  const raw = toBase64Url(rfc2822);

  const res = await fetch(
    "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
      },
      body: JSON.stringify({ raw }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("[email] Gmail send failed", res.status, body);
    return { sent: false, reason: "send_failed" as const };
  }
  return { sent: true as const };
}

function welcomeEmail(name: string, track: "juniors" | "seniors") {
  const trackLabel = track === "juniors" ? "Juniors (Ages 7–12)" : "Seniors (Ages 13–18+)";
  const subject = "Welcome to TechRise Africa — Registration Received";
  const text = `Hi ${name},\n\nThanks for registering for the TechRise Kids Bootcamp 2026 (${trackLabel}).\n\nWe've saved your details. The next step is payment — once your slot is confirmed we'll send full onboarding instructions.\n\nNeed help? Reply to this email or message us on WhatsApp: https://wa.me/2348129815038\n\n— TechRise Africa\nteam.techrise@gmail.com`;
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#0B0813">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">
    <h1 style="font-size:22px;margin:0 0 12px">Welcome to TechRise Africa</h1>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thanks for registering for the <strong>TechRise Kids Bootcamp 2026</strong> — ${trackLabel}.</p>
    <p>We've saved your details. The next step is payment — once your slot is confirmed we'll send full onboarding instructions.</p>
    <p style="margin:24px 0">
      <a href="https://wa.me/2348129815038" style="background:#8B5CF6;color:#fff;text-decoration:none;padding:12px 20px;border-radius:9999px;display:inline-block">Confirm on WhatsApp</a>
    </p>
    <p style="color:#64748b;font-size:12px">team.techrise@gmail.com · TechRise Africa</p>
  </div></body></html>`;
  return { subject, text, html };
}

function paymentEmail(name: string, reference: string, method: "paystack" | "bank_transfer") {
  const approved = method === "paystack";
  const subject = approved
    ? "Payment Confirmed — Your TechRise Seat is Secured"
    : "Payment Received — Verification in Progress";
  const intro = approved
    ? "Your payment has been confirmed and your seat in the TechRise Kids Bootcamp 2026 is officially secured."
    : "We've received your transfer proof. Our admissions team will verify within 24 hours and email you a final confirmation.";
  const text = `Hi ${name},\n\n${intro}\n\nReference: ${reference}\n\nWhatsApp: https://wa.me/2348129815038\n\n— TechRise Africa\nteam.techrise@gmail.com`;
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#0B0813">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">
    <h1 style="font-size:22px;margin:0 0 12px">${approved ? "You're in 🎉" : "Payment received"}</h1>
    <p>Hi <strong>${name}</strong>,</p>
    <p>${intro}</p>
    <p style="background:#f1f5f9;padding:12px 16px;border-radius:8px;font-family:monospace">Reference: ${reference}</p>
    <p style="margin:24px 0">
      <a href="https://wa.me/2348129815038" style="background:#8B5CF6;color:#fff;text-decoration:none;padding:12px 20px;border-radius:9999px;display:inline-block">Chat with Admissions</a>
    </p>
    <p style="color:#64748b;font-size:12px">team.techrise@gmail.com · TechRise Africa</p>
  </div></body></html>`;
  return { subject, text, html };
}

export const createRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();

    let userId = existing?.id as string | undefined;
    if (!userId) {
      const { data: inserted, error } = await supabaseAdmin
        .from("users")
        .insert({
          email: data.email,
          full_name: data.fullName,
          phone: data.phone,
          role: "student",
        })
        .select("id")
        .single();
      if (error || !inserted) throw new Error(error?.message || "Could not create user");
      userId = inserted.id;
    } else {
      await supabaseAdmin
        .from("users")
        .update({ full_name: data.fullName, phone: data.phone })
        .eq("id", userId);
    }

    const { data: reg, error: rErr } = await supabaseAdmin
      .from("bootcamp_registrations")
      .insert({
        user_id: userId!,
        track: data.track,
        payment_status: "pending_verification",
        amount: 50000,
      })
      .select("id")
      .single();
    if (rErr || !reg) throw new Error(rErr?.message || "Could not start registration");

    // Fire-and-forget welcome email
    try {
      const { subject, text, html } = welcomeEmail(data.fullName, data.track);
      await sendGmail(data.email, subject, html, text);
    } catch (e) {
      console.error("[email] welcome send error", e);
    }

    return { userId: userId!, registrationId: reg.id };
  });

export const recordPayment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => paymentSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let receiptPath: string | null = null;
    if (data.receipt) {
      const bytes = Uint8Array.from(atob(data.receipt.base64), (c) => c.charCodeAt(0));
      const ext = data.receipt.filename.split(".").pop() || "bin";
      receiptPath = `${data.registrationId}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabaseAdmin.storage
        .from("receipts")
        .upload(receiptPath, bytes, {
          upsert: true,
          contentType: data.receipt.contentType,
        });
      if (upErr) throw new Error(upErr.message);
    }

    const { data: updated, error } = await supabaseAdmin
      .from("bootcamp_registrations")
      .update({
        payment_method: data.method,
        reference_id: data.reference,
        payment_status: data.status,
        ...(receiptPath ? { receipt_url: receiptPath } : {}),
      })
      .eq("id", data.registrationId)
      .select("user_id")
      .single();
    if (error || !updated) throw new Error(error?.message || "Could not record payment");

    const { data: user } = await supabaseAdmin
      .from("users")
      .select("email, full_name")
      .eq("id", updated.user_id)
      .single();

    if (user?.email) {
      try {
        const { subject, text, html } = paymentEmail(user.full_name || "there", data.reference, data.method);
        await sendGmail(user.email, subject, html, text);
      } catch (e) {
        console.error("[email] payment send error", e);
      }
    }

    return { ok: true as const };
  });