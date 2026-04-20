import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — kiosk" },
      { name: "description", content: "Kiosk is a curated directory of small Instagram-based shops. No transactions, no commissions — just discovery." },
      { property: "og:title", content: "About kiosk" },
      { property: "og:description", content: "A curated directory of small Instagram-based shops. No transactions, no commissions — just discovery." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">About</span>
      <h1 className="mt-2 font-display text-5xl font-semibold leading-tight tracking-tight md:text-6xl text-balance">
        We believe small shops <span className="italic text-accent">deserve a stage.</span>
      </h1>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/80">
        <p>
          Some of the most interesting shops in the world don't have a website. They live entirely on Instagram — a baker in Brooklyn, a thrift curator in LA, a ceramicist in Portland — and finding them usually means stumbling on a friend's repost.
        </p>
        <p>
          <strong className="text-foreground">Kiosk</strong> is a curated directory built to fix that. We surface the best Instagram-based shops, organize them by category, and send you straight to the source. No checkout, no middleman, no commission. Just discovery.
        </p>
        <p>
          Every shop is hand-reviewed. If yours belongs here, we'd love to hear from you.
        </p>
      </div>

      <Link to="/submit" className="mt-12 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Submit your shop →
      </Link>
    </section>
  );
}
