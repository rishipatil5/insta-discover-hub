import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES } from "@/data/sellers";
import { supabase } from "@/integrations/supabase/client";
import { sendSubmissionNotification } from "@/api/send-notification";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit your shop — kiosk" },
      { name: "description", content: "List your Instagram-based small business in the kiosk directory." },
      { property: "og:title", content: "Submit your shop — kiosk" },
      { property: "og:description", content: "List your Instagram-based small business in the kiosk directory." },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    handle: "",
    category: CATEGORIES[0] as string,
    description: "",
    location: "",
    image_url: "",
    submitter_email: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await supabase.from("seller_submissions").insert({
      name: form.name.trim(),
      handle: form.handle.trim().replace(/^@/, ""),
      category: form.category,
      description: form.description.trim(),
      location: form.location.trim() || null,
      image_url: form.image_url.trim() || null,
      submitter_email: form.submitter_email.trim() || null,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }

    // Send notification emails to admins
    try {
      await sendSubmissionNotification({
        data: {
          name: form.name.trim(),
          handle: form.handle.trim().replace(/^@/, ""),
          category: form.category,
          description: form.description.trim(),
          location: form.location.trim() || null,
          image_url: form.image_url.trim() || null,
          submitter_email: form.submitter_email.trim() || null,
        },
      });
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Don't show error to user - submission was successful
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl">You're on the list</h1>
        <p className="mt-4 text-muted-foreground">
          Thanks, <strong className="text-foreground">{form.name}</strong>. We'll review @{form.handle} and publish it once approved.
        </p>
        <Link to="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Back to discover
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">List your shop</span>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Get discovered on kiosk.
      </h1>
      <p className="mt-4 text-muted-foreground text-balance">
        Free to list. We manually review every submission to keep the directory curated and lovely.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        <Field label="Shop name">
          <input required value={form.name} onChange={update("name")} placeholder="Fig & Flour" className={inputCls} />
        </Field>
        <Field label="Instagram handle" hint="without the @">
          <input required value={form.handle} onChange={update("handle")} placeholder="figandflour.co" className={inputCls} />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={update("category")} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Short description" hint="2 sentences max">
          <textarea required rows={3} value={form.description} onChange={update("description")} placeholder="Slow-fermented sourdough loaves baked weekly in a tiny kitchen…" className={inputCls} />
        </Field>
        <Field label="Location" hint="optional">
          <input value={form.location} onChange={update("location")} placeholder="Brooklyn, NY" className={inputCls} />
        </Field>
        <Field label="Cover image URL" hint="optional — paste a square photo link">
          <input type="url" value={form.image_url} onChange={update("image_url")} placeholder="https://…" className={inputCls} />
        </Field>
        <Field label="Your email" hint="required — we'll reply here">
          <input required type="email" value={form.submitter_email} onChange={update("submitter_email")} placeholder="you@example.com" className={inputCls} />
        </Field>

        {error && (
          <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:scale-[1.01] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit for review"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          By submitting, you agree to our gentle curation guidelines.
        </p>
      </form>
    </section>
  );
}

const inputCls = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
