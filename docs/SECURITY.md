---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: design-docs/security-future-reference.md, stack.md, exec-plans/active/roadmap.md
---

# Security — current phase

Active security rules for current phase (single-user MVP, local-only, no deploy, no registration).

Future checklist (GDPR, OWASP Top 10, certificate pinning, incident response, audit, 2FA, biometrics, cloud video retention) lives in `design-docs/security-future-reference.md` with status `deferred`. Activates at Phase 5 (closed testing).

## Current threat surface

- Single user — product owner.
- Local execution — backend and DB on owner's machine.
- No public API — nothing reachable from outside the laptop.
- Video stored locally via `storage/`.
- One outbound channel for data — Google Gemini Free Tier.

Effective surface: **secret leakage in repo** + **video transmission to external AI**.

## Active rules

### 1. Secrets — only in `.env`, never in commits

- API keys (Gemini etc.) in local `.env` only.
- `.env`, `secrets.json`, `*.key` — in `.gitignore`. Templates without values — in `*.env.example`.
- Leaked key → revoke at provider, issue new one. Do not rewrite git history.

### 2. Video and AI provider — informed compromise

- MVP: video sent to **Google Gemini Free Tier**. Free tier ToS allow training on user data.
- Acceptable while user = owner only, videos are owner's own.
- Before first external user (Phase 5): switch to **paid Gemini tier or alternative with DPA** (`stack.md` → "AI strategy"; `design-docs/security-future-reference.md`).

### 3. Age 18+ (product decision)

Product is for adults 18+. Currently a product, not technical, boundary. Implementation (confirmation form, registration block) lands in Phase 5 with registration.

### 4. Data minimization

No data collected beyond what's needed for video analysis and training tracking. No contacts, no precise geolocation, no full gallery access — only system picker on a specific file.

### 5. ORM for all DB queries

All SQLite queries via SQLModel/SQLAlchemy. No concatenated strings with user input — closes SQL injection by construction.

## Phase triggers

| Phase | Adds | Source |
|---|---|---|
| 5 (closed testing, registration + cloud) | HTTPS, secure token storage, account deletion, paid AI tier with DPA, S3 bucket without public access, 18+ enforcement | `design-docs/security-future-reference.md` → "Authorization", "Video storage and deletion", "Video transfer to AI", "Age restrictions" |
| 6 (public beta) | Full OWASP Top 10, dependency scanner in CI, certificate pinning, incident response, GDPR compliance | Entire `security-future-reference.md` becomes active |
| 7 (billing) | Payment data never stored locally — only provider transaction ID (Stripe / Apple / Google) | `security-future-reference.md` → "UPR sensitive data" |
