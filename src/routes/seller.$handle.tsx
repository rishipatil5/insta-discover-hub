import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SELLERS } from "@/data/sellers";

export const Route = createFileRoute("/seller/$handle")({
  loader: ({ params }) => {
    const seller = SELLERS.find((s) => s.handle === params.handle);
    if (!seller) throw notFound();
    return { seller };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.seller.name} — kiosk` },
          { name: "description", content: loaderData.seller.description },
          { property: "og:title", content: `${loaderData.seller.name} on kiosk` },
          { property: "og:description", content: loaderData.seller.description },
          { property: "og:image", content: loaderData.seller.image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.seller.image },
        ]
      : [],
  }),
  component: SellerPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center md:px-8">
      <h1 className="font-display text-4xl">Shop not found</h1>
      <Link to="/" className="mt-6 inline-block text-accent underline">Back to discover</Link>
    </div>
  ),
});

function SellerPage() {
  const { seller } = Route.useLoaderData();
  const igUrl = `https://instagram.com/${seller.handle}`;
  const gallery = seller.gallery ?? [seller.image];

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to directory
      </Link>

      <div className="mt-8 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img src={gallery[0]} alt={seller.name} className="aspect-[4/3] w-full object-cover" />
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {gallery.slice(1, 4).map((g: string, i: number) => (
                <div key={i} className="overflow-hidden rounded-2xl">
                  <img src={g} alt="" className="aspect-square w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="md:col-span-5 md:sticky md:top-24 md:self-start">
          <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-widest text-foreground">
            {seller.category}
          </span>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight tracking-tight text-balance md:text-6xl">
            {seller.name}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">@{seller.handle}{seller.location && ` · ${seller.location}`}</p>

          <p className="mt-6 text-lg text-foreground/80">{seller.description}</p>

          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:scale-[1.01] hover:bg-primary/90"
          >
            Visit Instagram store
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Purchases happen on Instagram, directly with the shop.
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold">How to buy</h3>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>1. Tap "Visit Instagram store" above.</li>
              <li>2. Browse their feed and saved highlights.</li>
              <li>3. DM them to order, or use links in their bio.</li>
            </ol>
          </div>
        </aside>
      </div>
    </article>
  );
}
