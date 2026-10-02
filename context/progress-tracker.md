# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 - Profile Page
**Last completed:** 04 Database Schema
**Next:** 05 Profile Page - Full UI

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

_Add decisions here as they are made during implementation._

- Homepage implemented from `context/designs/landing-page.png` using local assets in `public/`.
- Root font switched to Inter via `next/font/google` and bound to `--font-sans` token.
- Auth uses InsForge SSR helpers with secure cookie-based session flow (`@insforge/sdk/ssr`) and middleware route protection.
- PostHog now tracks signup CTA clicks on the client plus OAuth start/success/failure on the server to avoid missing redirect-bound events.
- Feature 4 database foundation is now applied to InsForge with `profiles`, `agent_runs`, `jobs`, and `agent_logs` tables, RLS policies, indexes, and the private `resumes` bucket with owner scoped storage object policies.

---

## Notes

_Add notes here as the build progresses — workarounds, patterns, anything that differs from the context files._
