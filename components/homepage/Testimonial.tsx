import Image from "next/image";

export function Testimonial() {
  return (
    <section className="border border-border bg-surface px-8 py-14 text-center">
      <p className="text-[42px] font-semibold uppercase tracking-[0.22em] text-info-muted">
        Success Story
      </p>

      <blockquote className="mx-auto mt-7 max-w-[900px] text-3xl leading-[1.4] text-text-slate">
        &quot;I used to spend my evenings copy pasting resumes. Now I open my
        dashboard to see interviews waiting. It feels like cheating. Had 3 offers
        on the table simultaneously.&quot;
      </blockquote>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Image
          src="/images/user-icon.png"
          alt="Tom Wilson"
          width={44}
          height={44}
          className="rounded-full"
        />
        <div className="text-left">
          <p className="text-sm font-semibold text-text-primary">Tom Wilson</p>
          <p className="text-xs text-text-secondary">Junior Developer</p>
        </div>
      </div>
    </section>
  );
}
