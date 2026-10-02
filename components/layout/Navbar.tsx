import Image from "next/image";
import Link from "next/link";
import { SignupCta } from "@/components/analytics/AuthLinks";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/find-jobs", label: "Find Jobs" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  return (
    <header className="h-16 border-b border-border bg-surface">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6">
        <Link href="/" className="shrink-0">
          <Image src="/logo.png" alt="JobPilot" width={88} height={24} priority />
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium text-text-dark transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <SignupCta
          href="/login"
          location="navbar"
          className="home-btn home-btn-primary px-3 py-1.5 text-[10px]"
        >
          Start for free
        </SignupCta>
      </div>
    </header>
  );
}
