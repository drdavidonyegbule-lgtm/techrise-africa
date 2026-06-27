import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/about", label: "About Us" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`glass flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${
            scrolled ? "shadow-[0_8px_40px_-12px_rgba(139,92,246,0.45)]" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo className="h-8 w-auto" />
            <span className="sr-only">TechRise Africa</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "text-foreground bg-white/5" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/register"
              className="hidden rounded-full bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-6px_oklch(0.65_0.25_295/0.7)] transition-transform hover:scale-[1.02] sm:inline-flex"
            >
              Enroll Now
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-3 md:hidden">
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.68_0.24_0)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}