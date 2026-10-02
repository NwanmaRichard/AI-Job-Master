import Link from "next/link";
import { SignupCta } from "@/components/analytics/AuthLinks";

export function BottomCta() {
  return (
    <section className="cta-gradient border border-border px-6 py-14 text-center">
      <h2 className="mx-auto max-w-[760px] text-6xl font-semibold leading-[1.05] tracking-[-0.02em] text-text-slate">
        Your next job search can feel a lot less overwhelming
      </h2>
      <p className="mx-auto mt-4 max-w-[640px] text-sm text-text-slate-medium">
        Set up your profile, upload your resume, and start finding matches in
        minutes.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <SignupCta
          href="/login"
          location="bottom_cta"
          className="home-btn home-btn-primary"
        >
          Get Started &gt;
        </SignupCta>
        <Link href="/find-jobs" className="home-btn home-btn-secondary">
          Find Your First Match
        </Link>
      </div>
    </section>
  );
}
