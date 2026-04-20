import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <span className="font-display text-lg font-semibold leading-none">k</span>
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              kiosk<span className="text-accent">.</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A curated directory of small Instagram shops worth following.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-accent">Discover sellers</Link></li>
            <li><Link to="/submit" className="hover:text-accent">Submit your shop</Link></li>
            <li><Link to="/about" className="hover:text-accent">About kiosk</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Note</h4>
          <p className="mt-4 text-sm text-muted-foreground">
            Kiosk doesn't process transactions. All purchases happen on Instagram, directly with the seller.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 border-t border-border/60 px-5 py-6 text-center text-xs text-muted-foreground md:flex-row md:gap-4 md:px-8">
        <span>© {new Date().getFullYear()} kiosk. Made with care for small shops.</span>
        <span className="hidden md:inline">·</span>
        <Link to="/admin" className="hover:text-foreground">Admin</Link>
      </div>
    </footer>
  );
}
