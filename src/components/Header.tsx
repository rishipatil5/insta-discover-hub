import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft">
            <span className="font-display text-lg font-semibold leading-none">k</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">
            kiosk<span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="text-muted-foreground transition-colors hover:text-foreground">
            Discover
          </Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link to="/submit" activeProps={{ className: "text-foreground" }} className="text-muted-foreground transition-colors hover:text-foreground">
            Submit a shop
          </Link>
        </nav>

        <Link
          to="/submit"
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:bg-primary/90"
        >
          List your shop
        </Link>
      </div>
    </header>
  );
}
