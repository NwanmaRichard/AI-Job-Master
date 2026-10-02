# Verify: Feature 4 database schema foundation · spec 0001 · updated 2026-10-02
_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual
- [ ] Sign in as user A, create one profile row, then query profile view and confirm only user A data is visible. Then sign in as user B and confirm user A data is not visible. -> AC-3
- [ ] Upload a resume for user A to `resumes/<user_a_id>/resume.pdf` and confirm upload succeeds. Attempt to read or delete user A file as user B and confirm access is denied. -> AC-2

## Commands
- [ ] Run `run-raw-sql` with `select table_name from information_schema.tables where table_schema='public' and table_name in ('profiles','agent_runs','jobs','agent_logs') order by table_name;` and confirm all four tables exist. -> AC-1
- [ ] Run `run-raw-sql` with `select c.relname, c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname='public' and c.relname in ('profiles','agent_runs','jobs','agent_logs') order by c.relname;` and confirm `relrowsecurity=true` for all rows. -> AC-3
- [ ] Run `run-raw-sql` with `select tablename, policyname, cmd from pg_policies where schemaname='public' and tablename in ('profiles','agent_runs','jobs','agent_logs') order by tablename, policyname;` and confirm each table has select, insert, update, and delete owner policies. -> AC-3
- [ ] Run `run-raw-sql` with `insert into public.jobs (user_id, source, title, company) values ('00000000-0000-0000-0000-000000000000','invalid','x','y');` as a controlled negative check and confirm check constraint rejection for invalid source. -> AC-4
- [ ] Run `run-raw-sql` with `select indexname from pg_indexes where schemaname='public' and tablename in ('jobs','agent_runs','agent_logs') order by indexname;` and confirm expected indexes exist. -> AC-4
- [ ] Run `list-buckets` and confirm `resumes` exists and `public=false`. -> AC-2

## Value sourcing coverage
- [ ] Validate `profiles.id` source is auth session id by creating profile through authenticated flow and confirming inserted id equals authenticated user id. -> AC-5
- [ ] Validate `jobs.source` source is ingestion path by saving one Adzuna search job and confirming `source='search'` in table. -> AC-5
- [ ] Validate `agent_runs.jobs_found` source is saved jobs count by running one search that stores N rows and confirming `jobs_found=N`. -> AC-5
- [ ] Validate dashboard trend source by inserting controlled `jobs.found_at` timestamps for one user and confirming trend query groups from `jobs.found_at` only. -> AC-5

## Acceptance criteria coverage
- AC-1 covered by commands 1
- AC-2 covered by manual 2 and command 6
- AC-3 covered by manual 1 and commands 2 to 3
- AC-4 covered by commands 4 to 5
- AC-5 covered by value sourcing coverage steps 1 to 4
