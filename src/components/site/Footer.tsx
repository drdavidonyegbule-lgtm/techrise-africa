import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[oklch(0.11_0.04_295)]/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-10 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The Future Belongs to Those Who Build It. Let's Get to Work.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Backed by VGP Media Technologies — proven operators across high-growth sectors.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/programs" className="hover:text-foreground">Programs</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link to="/register" className="hover:text-foreground">Enroll Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-neon-violet)]" />
                <a href="mailto:team.techrise@gmail.com" className="hover:text-foreground">
                  team.techrise@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-neon-violet)]" />
                <span>0812 981 5038 · 0903 684 9219</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-neon-violet)]" />
                <span>1st Floor, Jobanny Plaza, Elimgbu, Rivers State. Port Harcourt.</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Pay
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>VGP Media Technologies</li>
              <li>Moniepoint MFB</li>
              <li className="font-mono text-foreground">6018873172</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} TechRise Africa. All rights reserved.</span>
          <span className="text-[var(--color-cyber-lime)]">TechRise Africa · Building the Future.</span>
        </div>
      </div>
    </footer>
  );
}