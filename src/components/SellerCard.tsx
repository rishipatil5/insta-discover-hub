import type { Seller } from "@/data/sellers";

export function SellerCard({ seller }: { seller: Seller }) {
  return (
    <a
      href={`https://instagram.com/${seller.handle}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${seller.name} on Instagram`}
      className="group relative block overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={seller.image}
          alt={seller.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-medium tracking-wide text-foreground backdrop-blur-sm">
          {seller.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {seller.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">@{seller.handle}</p>
          </div>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{seller.description}</p>
      </div>
    </a>
  );
}
