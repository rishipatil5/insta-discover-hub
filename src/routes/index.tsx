import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, SELLERS, type Category } from "@/data/sellers";
import { SellerCard } from "@/components/SellerCard";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | "All">("All");

  const featured = useMemo(() => SELLERS.filter((s) => s.featured).slice(0, 3), []);

  const filtered = useMemo(() => {
    return SELLERS.filter((s) => {
      const matchCat = active === "All" || s.category === active;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.handle.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, active]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 md:grid-cols-12 md:gap-8 md:px-8 md:pb-24 md:pt-20">
          <div className="md:col-span-7 md:pt-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              A curated directory
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-balance md:text-7xl lg:text-[5.5rem]">
              Small shops,
              <br />
              <span className="italic text-accent">big personalities.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground text-balance">
              Discover home bakers, thrift curators, ceramicists, and resellers — all running their stores on Instagram. Tap a card, fall in love, follow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#discover" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:bg-primary/90">
                Browse shops
              </a>
              <a href="/submit" className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                List your shop →
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">{SELLERS.length}+</div>
                <div className="mt-0.5 text-xs uppercase tracking-widest">Shops listed</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">{CATEGORIES.length}</div>
                <div className="mt-0.5 text-xs uppercase tracking-widest">Categories</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">0%</div>
                <div className="mt-0.5 text-xs uppercase tracking-widest">Commission</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-accent/30 blur-3xl" />
              <div className="absolute -bottom-8 -right-4 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
              <img
                src={heroImg}
                alt="Curated artisan goods"
                className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift"
              />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-card p-4 shadow-lift md:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent" />
                  <div>
                    <div className="font-display text-sm font-semibold">Just joined</div>
                    <div className="text-xs text-muted-foreground">@figandflour.co</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Editor's pick</span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">Featured this week</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <SellerCard key={s.id} seller={s} />
          ))}
        </div>
      </section>

      {/* DISCOVER */}
      <section id="discover" className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">All shops</span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">Discover the directory</h2>
          </div>
          <div className="relative w-full md:w-80">
            <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shops, handles, vibes…"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm shadow-soft outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat as Category | "All")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s) => (
            <SellerCard key={s.id} seller={s} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-border bg-card/50 py-20 text-center">
            <p className="font-display text-2xl">No shops found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different search or category.</p>
          </div>
        )}
      </section>
    </>
  );
}
