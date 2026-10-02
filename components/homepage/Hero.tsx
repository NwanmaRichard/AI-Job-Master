import Image from "next/image";
import Link from "next/link";
import { SignupCta } from "@/components/analytics/AuthLinks";

export function Hero() {
  return (
    <section className="border border-border bg-surface">
      <div className="hero-gradient flex flex-col items-center px-6 pb-14 pt-12">
        <h1 className="max-w-[530px] text-center text-[58px] font-semibold leading-[1.03] tracking-[-0.03em] text-text-slate">
          Job hunting is hard. Your tools should&apos;nt be.
        </h1>
        <p className="mt-5 max-w-[500px] text-center text-sm leading-6 text-text-slate-medium">
          Stop applying blind. JobPilot finds the jobs, researches the companies,
          and gives you everything you need to stand out.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <SignupCta
            href="/login"
            location="hero"
            className="home-btn home-btn-primary"
          >
            Get Started &gt;
          </SignupCta>
          <Link href="/find-jobs" className="home-btn home-btn-secondary">
            Find Your First Match
          </Link>
        </div>
      </div>

      <div className="bg-surface-secondary px-10 pb-8 pt-6">
        <div className="preview-shadow overflow-hidden rounded-[18px] border border-border bg-surface">
          <Image
            src="/images/dashboard-demo.png"
            alt="JobPilot dashboard preview"
            width={1024}
            height={549}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
