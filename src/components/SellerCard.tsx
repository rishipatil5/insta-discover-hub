import type { Seller } from "@/data/sellers";
import { Instagram, MapPin } from "lucide-react";

export function SellerCard({ seller }: { seller: Seller }) {
  return (
    <a
      href={`https://instagram.com/${seller.handle}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${seller.name} on Instagram`}
      className="group relative block overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={seller.image}
          alt={seller.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Top gradient for badge legibility */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-medium tracking-wide text-foreground backdrop-blur-sm">
            {seller.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-instagram px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-soft">
            <Instagram className="h-3 w-3" strokeWidth={2.4} />
            Instagram
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {seller.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">@{seller.handle}</p>
          </div>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-all group-hover:bg-instagram group-hover:text-white">
            <Instagram className="h-4 w-4" strokeWidth={2.2} />
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{seller.description}</p>
        {seller.location && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
            {seller.location}
          </p>
        )}
      </div>
    </a>
  );
}
