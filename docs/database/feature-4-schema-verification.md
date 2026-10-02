# Feature 4 database verification record

Date: 2026-10-02
Spec: `docs/specs/0001-database-schema-foundation/index.md`

## Applied migration

- `db/migrations/0001_database_schema_foundation.sql`

## Verified backend state

- Tables created: `profiles`, `agent_runs`, `jobs`, `agent_logs`
- RLS enabled on all four tables
- Owner scoped table policies verified for select, insert, update, delete on all four tables
- Trigger verified: `trg_profiles_set_updated_at`
- Indexes verified:
  - `idx_jobs_user_found_at_desc`
  - `idx_jobs_user_match_score_desc`
  - `idx_agent_runs_user_started_at_desc`
  - `idx_agent_logs_user_created_at_desc`
- Private bucket verified: `resumes` with `public: false`
- Storage object RLS enabled on `storage.objects`
- Owner scoped storage policies verified:
  - `resumes_objects_select_own`
  - `resumes_objects_insert_own`
  - `resumes_objects_update_own`
  - `resumes_objects_delete_own`

## Expected query behavior

- User scoped queries on app tables only return rows where `user_id = auth.uid()`
- Insert and update on app tables require the same user ownership check
- Job source values outside `search` and `url` are rejected by check constraint
- Log level values outside `info`, `success`, `warning`, and `error` are rejected by check constraint
- Resume storage object operations are restricted to keys with first path segment equal to authenticated user id
