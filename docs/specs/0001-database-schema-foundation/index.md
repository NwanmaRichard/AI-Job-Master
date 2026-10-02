# 0001. Database schema foundation

**Date**: 2026-10-02
**Status**: Proposed

## Summary

This decision defines the first database and storage foundation for JobPilot. You need a stable data layer before profile save, job discovery, company research, and dashboard metrics can be built with confidence. The schema keeps user data isolated, tracks every agent run, and supports later features without rework. It also defines row level access and storage access so private user data stays private by default.

## Requirements

**User stories**:
- As a signed in job seeker, I want my profile and resume metadata stored safely so future job matching uses my latest data.
- As the job discovery agent, I want each search run and each found job persisted so users can review results later.
- As the system, I want audit friendly run logs so failures are observable and recoverable.
- As a signed in user, I want data isolation so I can never read or mutate another user account data.

**Acceptance criteria**:
- **AC-1**: The database includes `profiles`, `agent_runs`, `jobs`, and `agent_logs` with the required columns, relationships, and data types defined in project architecture.
- **AC-2**: The storage bucket `resumes` exists with authenticated access controls aligned to per user ownership.
- **AC-3**: Row level security is enabled on all four tables with policies that only allow authenticated users to operate on their own rows.
- **AC-4**: Table level constraints prevent invalid source values, maintain referential links, and support expected query patterns for upcoming features.
- **AC-5**: The schema supports the planned write paths for profile save, job ingestion, company research persistence, and agent logging without requiring ad hoc table changes.

## Decision

**Chosen option**: Option 2: Full foundation schema now in one coherent pass

Create the core schema and access rules now so the next implementation features can build against one stable data contract.

## Feature design

**Data model sketch**:

| Entity | Key fields | Required and nullable | Relationships | Constraints |
|---|---|---|---|---|
| `profiles` | `id`, `email`, profile fields, `resume_pdf_url`, `is_complete`, timestamps | `id` required, `email` required, most profile enrichment fields nullable until completion | `profiles.id` maps to auth user id; parent for `agent_runs`, `jobs`, `agent_logs` | primary key on `id` |
| `agent_runs` | `id`, `user_id`, `status`, search inputs, counters, timestamps | `id`, `user_id`, `status`, `started_at` required; `completed_at` nullable | many runs belong to one profile | `status` check in allowed set, FK `user_id -> profiles.id` |
| `jobs` | `id`, `run_id`, `user_id`, source fields, role and company fields, match outputs, `company_research`, `found_at` | `id`, `user_id`, `source`, `title`, `company`, `found_at` required; `run_id` nullable for imported jobs | many jobs belong to one profile, optional run link | `source` check in (`search`, `url`), FK to `profiles`, FK to `agent_runs` when present |
| `agent_logs` | `id`, `run_id`, `user_id`, `message`, `level`, optional `job_id`, `created_at` | `id`, `user_id`, `message`, `level`, `created_at` required; `run_id`, `job_id` nullable | many logs belong to one profile, optional run and job links | `level` check in (`info`, `success`, `warning`, `error`), FK links |

Supporting storage:
- Bucket `resumes` with path pattern `resumes/{user_id}/resume.pdf`.

Index plan:
- `jobs(user_id, found_at desc)`
- `jobs(user_id, match_score desc)`
- `agent_runs(user_id, started_at desc)`
- `agent_logs(user_id, created_at desc)`

**State transitions**:
- `agent_runs.status`: `running` to `completed` or `failed`
- `profiles.is_complete`: `false` to `true`, and back to `false` only if required fields become missing

**API surface**:
| Endpoint | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `/profile` save action | mutate | user id from session, profile payload | updated profile row, completion flag | authenticated | 400 invalid payload, 401 unauthenticated |
| `/api/agent/find` | POST | `jobTitle`, `location`, user id | run id, saved jobs count | authenticated | 400 invalid request, 502 upstream search fail |
| `/api/agent/research` | POST | `jobId`, user id | persisted company dossier | authenticated | 404 job not found, 500 research pipeline fail |
| agent log write helper | internal write | run id optional, job id optional, log level and message | inserted log row | authenticated server context | write failure if FK invalid |

**Value sourcing**:
| Action | Value produced or displayed | Source |
|---|---|---|
| profile save | `profiles.id` | authenticated session user id |
| profile save | completion percentage inputs | profile form payload fields |
| job ingestion | `jobs.source` | derived from ingestion path (`search` for Adzuna flow) |
| job ingestion | `jobs.match_score`, `match_reason`, skill arrays | matcher model output |
| company research save | `jobs.company_research` | synthesized dossier payload from research pipeline |
| run completion | `agent_runs.jobs_found` | count of successful `jobs` inserts linked to run |
| activity feed queries | user scoped recent rows | `user_id` filter from session user id |
| dashboard job trend queries | time grouped job events | `jobs.found_at` and user scoped filters |

**Key invariants**:
- Every user owned row in the four tables has a valid `user_id` linked to `profiles.id`.
- `jobs.source` is always `search` or `url`.
- `agent_logs.level` is always one of the allowed severity values.
- Company research data can be null before research, but once set it must remain valid JSON.
- All reads and writes in app code include user scoping.

**Security model**:
Authenticated users can only read and mutate rows where `user_id` equals their auth subject id. Service role operations are only allowed in trusted server contexts for internal workflows. Resume storage object access is authenticated and restricted to the owning user path. This feature handles personal profile and resume metadata, so strict user isolation is mandatory.

**Configuration required**:
- `NEXT_PUBLIC_INSFORGE_URL`: backend base URL used by clients and server helpers.
- `NEXT_PUBLIC_INSFORGE_ANON_KEY`: public client key used to initialize InsForge SDK contexts.

**Critical test scenarios**:
- Happy path: apply migration set, insert a valid profile plus run plus jobs plus logs, then query by user and get expected rows, verifies **AC-1** and **AC-5**.
- Failure case: attempt insert with invalid `jobs.source` or broken FK link and confirm database rejects write, verifies **AC-4**.
- Auth permission: signed in user A cannot read or mutate rows owned by user B due to row level policies, verifies **AC-3** and **AC-2**.

## Build plan

1. Create migration set for `profiles`, `agent_runs`, `jobs`, and `agent_logs` with keys, required columns, enum style checks, and FK relationships, satisfies **AC-1** and **AC-4**.
2. Add row level security enablement and owner scoped policies for select, insert, update, and delete on all four tables, satisfies **AC-3**.
3. Create `resumes` storage bucket and owner scoped bucket policies for authenticated access, satisfies **AC-2**.
4. Add supporting indexes for expected read paths on jobs, runs, and logs, satisfies **AC-4** and **AC-5**.
5. Run migration verification checks with seed rows for valid and invalid cases, then record expected query behavior for upcoming features, satisfies **AC-5**.

## Consequences

**Positive**:
- Upcoming features can build directly against a known stable schema.
- Access control is enforced at the data layer from day one.
- Logging and run tracking are available for debugging and analytics.

**Negative and tradeoffs**:
- Initial migration review takes longer than a minimal one table setup.
- Future schema changes still need disciplined migrations as product understanding grows.

**Neutral**:
- Some optional columns will stay null until later features are shipped.

## Follow-up

- [ ] Add a concise migration runbook in project docs so future contributors apply and verify schema changes the same way.

## Rationale

Reasoning and options: see `rationale.md`.
