import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-3">
        <Link href="/" className="shrink-0">
          <Image src="/logo.png" alt="JobPilot" width={55} height={15} />
        </Link>

        <div className="flex items-center gap-6 text-[10px] font-medium text-text-secondary">
          <span>Dashboard</span>
          <span>Privacy Policy</span>
          <span>Terms &amp; Condition</span>
        </div>
      </div>
    </footer>
  );
}
