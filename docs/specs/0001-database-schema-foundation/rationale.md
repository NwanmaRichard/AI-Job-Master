# 0001. Database schema foundation rationale

## Context

JobPilot already has authentication and analytics setup, and Feature 4 is the next planned foundation step in the project build order. The next upcoming features all depend on durable data storage, including profile management, job ingestion, match scoring output, research dossiers, and activity tracking.

The project uses InsForge as the backend platform for auth, database, and storage. Because this is a single user product flow with private resume and profile data, every table write and read must stay scoped to the authenticated user. If this is not decided now, later features will each invent their own data shape and access rules, which creates migration churn and security risk.

This decision must set one coherent schema target now, including relationships, constraints, and access policies. The result should be simple to implement in one migration set, easy to query from upcoming server actions and route handlers, and strict enough to prevent cross user data leaks.

## Options considered

### Option 1: Minimal schema now, evolve per feature

Create only `profiles` now and defer other tables until each future feature starts.

**Pros**:
- Fastest first migration
- Low up front design effort

**Cons**:
- Repeated migration churn across each next feature
- High risk of inconsistent naming and relationships
- Delays policy design and security hardening

### Option 2: Full foundation schema now in one coherent pass

Define all core tables, storage bucket, row level policies, and key constraints now, based on the accepted architecture and build plan.

**Pros**:
- Gives all upcoming features a stable contract
- Reduces future rework and migration noise
- Lets security controls be designed once and reused

**Cons**:
- Slightly larger initial setup effort
- Needs careful review before apply

### Option 3: Split into many small schema slices by feature

Define a narrow schema slice at each feature boundary with independent migration files and later consolidation.

**Pros**:
- Each feature team can move in isolation
- Smaller review units per change

**Cons**:
- Harder to preserve a coherent data model
- More likely to duplicate concepts
- Consolidation work still required later

## Rationale

The project is still early, but the next four to six planned features all depend on the same core entities. A full foundation pass now is the best balance of speed and correctness. It keeps the schema boring, explicit, and close to the accepted project architecture while avoiding repeated refactors each sprint.

This also lets access control be defined once at the table layer, instead of bolting on user scoping later inside each query path. That lowers the chance of accidental cross user access and aligns with the product requirement that all data operations stay user scoped.

Option 1 looks faster for today but causes repeated redesign cost and fragile policy coverage. Option 3 can work in larger parallel teams, but this project currently benefits more from one clear baseline than from distributed migration ownership.
