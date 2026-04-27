---
status: deferred
last_updated: 2026-04-27
owner: Кристина
related: ../SECURITY.md, ../exec-plans/active/roadmap.md
---

# Security — future reference

**Status: deferred.** Future checklist, not active rules. Active rules at current phase: `docs/SECURITY.md`. Activate items below as they become relevant per phase trigger.

## Activation phases

- Phase 5 (closed testing, real users + cloud): Authorization, Video storage and deletion, Video transfer to AI, Age 18+ enforcement, secrets in secure store, HTTPS.
- Phase 6 (public beta): full OWASP Top 10, dependency scanner in CI, certificate pinning, incident response, GDPR.
- Phase 7 (billing): payment data — never stored locally; provider transaction ID only.

---

## Security principles (full list)

### 1. Data minimization

Collect only what features and lawful tracking require. No "just in case" collection.

### 2. Encryption in transit and at rest

- Mobile↔server: HTTPS / TLS 1.2+ only.
- Server-side data (DB, video storage, backups): encrypted at rest.
- Cloud video: private storage with short-lived signed URLs (5–15 min).

### 3. No secrets in code

- API keys (OpenAI, Apple, Google, payment providers) — secret store only (env vars on server, CI/CD secrets). Never in code or repo.
- Pre-commit secret scanner in CI.
- Leaked secret → immediate key rotation + audit of usage.

### 4. Least privilege

- Backend service has no root DB access.
- One user never sees another user's data.
- Distinct internal roles (admin, support, analytics) with separate accounts.

### 5. Audit log for sensitive actions

Logged: who, when, what, result. Examples: password change, account deletion, support staff data access, billing operations. Audit logs separate from regular logs, stricter protection, longer retention.

### 6. Secure by default

New user's video — private by default; security path is the default path.

### 7. OWASP Top 10 minimum baseline

- **Injection** — parameterized queries, ORM, no string concatenation with user input.
- **Broken auth** — standard auth libraries, no homemade crypto.
- **Sensitive data exposure** — encryption, no logging of sensitive fields.
- **XXE / SSRF** — safe parsers, URL allow/deny lists.
- **Broken access control** — server-side permission check on every request.
- **Security misconfig** — no default passwords, security headers (CSP, HSTS, X-Frame-Options).
- **XSS** — output escaping, CSP.
- **Insecure deserialization** — no `pickle` / Java serialization on untrusted input.
- **Known vulnerable components** — automated dependency scanner in CI.
- **Insufficient logging / monitoring** — alerts on suspicious activity.

---

## UPR sensitive data

| Type | Sensitivity | Protection |
|---|---|---|
| User email | medium | encryption at rest, not exposed to other users |
| Password | high | hash only (bcrypt / Argon2), never plaintext |
| Workout videos | high | private storage, owner-only access, encryption at rest |
| AI chat history | medium | per-user, no cross-user exposure |
| Workout data | medium | per-user |
| Payment data | critical | **never stored locally**; delegated to payment provider (Stripe / RevenueCat / Apple Pay / Google Pay). Store only transaction / subscription ID. |
| API keys (OpenAI etc.) | critical | secret store, not in code |
| Audit logs | medium | protected separately, longer retention |

---

## Authorization (Phase 5+)

- Standard mechanism: short-lived JWT + refresh token, or session-based.
- 2FA — at minimum optional; default for paid tier.
- Biometrics (Face ID / Touch ID / Android Biometric) — app entry option.
- Sign in with Apple — required by App Store on iOS.
- Sign in with Google — recommended.
- Account deletion from inside the app — required (App Store + GDPR).

---

## Video storage and deletion

1. Upload — authenticated user, own account only.
2. Storage — private cloud bucket (S3 / GCS), no public access.
3. Access — short-lived signed URLs (5–15 min).
4. Retention — per `../product-specs/exercise-chat.md`: free 2 months, paid unlimited.
5. User-initiated deletion — irreversible, physical (no soft delete).
6. Account deletion — all videos physically removed within 30 days.

---

## Video transfer to AI

Critical path: private video sent to external AI provider.

1. Only providers with signed DPA and non-training guarantees.
2. Transmit minimum: video + exercise context. No personal data (name, email).
3. Explicit user notice in UI (privacy policy + first-analysis prompt).
4. Prefer backend-mediated transmission over direct client→provider for control.

---

## Mobile app security

- Certificate pinning (Phase 6+).
- Reverse-engineering hardening: code obfuscation, integrity checks.
- Secure token storage: Keychain (iOS), EncryptedSharedPreferences / Keystore (Android). Never plain SharedPreferences / UserDefaults.
- Biometric app lock — settings option.
- Screenshot protection on sensitive screens (payments, profile): `FLAG_SECURE` on Android, blur on iOS app switcher.

---

## Compliance

### App Store / Google Play
- Privacy Policy required.
- App Privacy Manifest (iOS) filled honestly.
- In-app account deletion.

### GDPR (EU users)
- Access, rectification, erasure ("right to be forgotten"), portability (export).
- Explicit consent (no pre-checked boxes).

### Russian law (RU users)
- 152-ФЗ — Russian-citizen personal data on Russian servers. Solved via separate regional deploy if needed.

### Age restrictions

Strictly 18+. Deliberate product and legal decision excluding minor data handling.

- Registration: 18+ confirmation (date of birth + explicit declaration).
- App Store / Google Play age categories set accordingly.
- ToS and Privacy Policy: service not for under-18; underage account → block + data deletion.
- No parental-consent mechanisms or "kids mode".

Decision date: 2026-04-19.

---

## Incident response

1. Detection — monitoring + alerts + bug-bounty / external-report channel.
2. Containment — disable affected component, revoke compromised keys.
3. Analysis — what leaked, who is affected.
4. Notification — users and regulators within statutory deadlines (GDPR: 72h).
5. Postmortem — saved under `../exec-plans/completed/`.

---

## Regular security checks

- Dependency scanner — Dependabot / Snyk in CI on every PR.
- SAST in CI.
- Pen-test — minimum yearly, mandatory before public release.
- Bug bounty / responsible disclosure — at public launch.
