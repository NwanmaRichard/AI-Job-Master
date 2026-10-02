# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

- `Homepage button system` — `app/globals.css`
  - Base class: `home-btn` (`inline-flex`, `rounded-sm`, `px-[14px] py-[7px]`, `text-[11px]`, `font-medium`)
  - Primary CTA: `home-btn home-btn-primary` (dark fill, white text, subtle dark hover)
  - Secondary CTA: `home-btn home-btn-secondary` (surface fill, border, muted hover)

- `Navbar` — `components/layout/Navbar.tsx`
  - Wrapper: `h-16 border-b border-border bg-surface`
  - Container: `mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6`
  - Nav link: `text-[11px] font-medium text-text-dark hover:text-accent`
  - CTA: `home-btn home-btn-primary px-3 py-1.5 text-[10px]`

- `Hero` — `components/homepage/Hero.tsx`
  - Section: `border border-border bg-surface`
  - Banner: `hero-gradient flex flex-col items-center px-6 pb-14 pt-12`
  - Heading: `text-[58px] font-semibold leading-[1.03] tracking-[-0.03em] text-text-slate`
  - Primary button: `home-btn home-btn-primary`
  - Secondary button: `home-btn home-btn-secondary`
  - Preview card: `preview-shadow rounded-[18px] border border-border bg-surface`

- `FeatureSplit` — `components/homepage/FeatureSplit.tsx`
  - Wrapper: `grid grid-cols-2 border border-border bg-surface`
  - Text panel: `flex h-full flex-col justify-center p-10`
  - Title: `text-5xl font-semibold leading-[1.1] tracking-[-0.02em] text-text-slate`
  - Body text: `text-sm leading-6 text-text-secondary`
  - Media panel: `bg-surface-secondary p-8` with `rounded-xl border border-border bg-surface`

- `Testimonial` — `components/homepage/Testimonial.tsx`
  - Wrapper: `border border-border bg-surface px-8 py-14 text-center`
  - Label: `text-[42px] font-semibold uppercase tracking-[0.22em] text-info-muted`
  - Quote: `text-3xl leading-[1.4] text-text-slate`

- `BottomCta` — `components/homepage/BottomCta.tsx`
  - Wrapper: `cta-gradient border border-border px-6 py-14 text-center`
  - Heading: `text-6xl font-semibold leading-[1.05] tracking-[-0.02em] text-text-slate`
  - Primary button: `home-btn home-btn-primary`
  - Secondary button: `home-btn home-btn-secondary`

- `Footer` — `components/layout/Footer.tsx`
  - Wrapper: `border-t border-border bg-surface`
  - Container: `mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-3`
  - Links: `text-[10px] font-medium text-text-secondary hover:text-text-primary`

- `Login card` — `app/(auth)/login/page.tsx`
  - Wrapper: `mx-auto flex min-h-screen w-full max-w-[1440px] items-center justify-center px-6 py-10`
  - Card: `surface-shadow w-full max-w-[440px] rounded-xl border border-border bg-surface p-6`
  - Signed-in state: heading + body copy with single CTA `home-btn home-btn-primary w-full justify-center py-2 text-xs`
  - Error message: `rounded-md border border-error bg-surface px-3 py-2 text-sm text-error`
  - OAuth buttons: `home-btn home-btn-secondary w-full justify-center py-2 text-xs` and `home-btn home-btn-primary w-full justify-center py-2 text-xs`

- `Auth tracking links` — `components/analytics/AuthLinks.tsx`
  - Signup CTA wrapper keeps link styling external and tracks click before navigation.
  - OAuth link wrapper preserves shared button classes from page-level usage.

- `Protected page placeholder shell` — `app/dashboard/page.tsx`, `app/profile/page.tsx`, `app/find-jobs/page.tsx`, `app/find-jobs/[id]/page.tsx`
  - Page wrapper: `mx-auto min-h-screen w-full max-w-[1440px] px-6 py-6`
  - Placeholder card: `surface-shadow rounded-xl border border-border bg-surface p-6`
  - Title: `text-base font-semibold text-text-primary`
  - Description text: `mt-2 text-sm text-text-secondary`

- `Feature 4 database schema foundation` — `db/migrations/0001_database_schema_foundation.sql`
  - No UI component was added or changed in this feature.
