import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Instagram, MapPin, Check, X, Trash2, LogOut, ShieldCheck } from "lucide-react";

type Submission = {
  id: string;
  name: string;
  handle: string;
  category: string;
  description: string;
  image_url: string | null;
  location: string | null;
  submitter_email: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — kiosk" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({ to: "/admin/login" });
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin");
    if (!isAdmin) {
      throw redirect({ to: "/admin/login", search: { unauthorized: 1 } });
    }
  },
  component: AdminPage,
});

type Tab = "pending" | "approved" | "rejected";

function AdminPage() {
  const [tab, setTab] = useState<Tab>("pending");
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>("");

  const load = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setEmail(user?.email ?? "");
    const { data } = await supabase
      .from("seller_submissions")
      .select("*")
      .eq("status", tab)
      .order("created_at", { ascending: false });
    setItems((data as Submission[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [tab]);

  const setStatus = async (id: string, status: "approved" | "rejected") => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase
      .from("seller_submissions")
      .update({ status, reviewed_at: new Date().toISOString(), reviewer_id: user?.id ?? null })
      .eq("id", id);
    setItems((prev) => prev.filter((s) => s.id !== id));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this submission permanently?")) return;
    await supabase.from("seller_submissions").delete().eq("id", id);
    setItems((prev) => prev.filter((s) => s.id !== id));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <ShieldCheck className="h-3.5 w-3.5" /> Admin
          </span>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Review submissions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Signed in as {email}</p>
        </div>
        <Button variant="outline" onClick={logout} className="rounded-full">
          <LogOut className="mr-1.5 h-4 w-4" /> Sign out
        </Button>
      </div>

      <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1">
        {(["pending", "approved", "rejected"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {!loading && items.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border bg-card/50 py-16 text-center">
            <p className="font-display text-xl">Nothing here yet</p>
            <p className="mt-1 text-sm text-muted-foreground">No {tab} submissions.</p>
          </div>
        )}
        {items.map((s) => (
          <article key={s.id} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft md:flex-row">
            <div className="flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary md:h-32 md:w-32">
              {s.image_url ? (
                <img src={s.image_url} alt={s.name} className="h-32 w-full object-cover md:h-full md:w-32" />
              ) : (
                <Instagram className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-semibold">{s.name}</h2>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{s.category}</span>
              </div>
              <a
                href={`https://instagram.com/${s.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                <Instagram className="h-3.5 w-3.5" /> @{s.handle}
              </a>
              <p className="mt-2 text-sm text-foreground/80">{s.description}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                {s.location && (
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{s.location}</span>
                )}
                {s.submitter_email && <span>📧 {s.submitter_email}</span>}
                <span>🗓 {new Date(s.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 md:flex-col">
              {tab !== "approved" && (
                <Button onClick={() => setStatus(s.id, "approved")} className="rounded-full">
                  <Check className="mr-1 h-4 w-4" /> Approve
                </Button>
              )}
              {tab !== "rejected" && (
                <Button variant="outline" onClick={() => setStatus(s.id, "rejected")} className="rounded-full">
                  <X className="mr-1 h-4 w-4" /> Reject
                </Button>
              )}
              <Button variant="ghost" onClick={() => remove(s.id)} className="rounded-full text-destructive hover:text-destructive">
                <Trash2 className="mr-1 h-4 w-4" /> Delete
              </Button>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">← Back to site</Link>
      </p>
    </section>
  );
}
