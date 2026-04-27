---
id: EP-track-b-mockups
tier: ExecPlan
status: completed
last_updated: 2026-04-27
owner: Кристина
related: ../index.md, ../PLANS.md, ../active/roadmap.md, ../active/EP-mvp-product-spec.md, ../../ui/index.md, ../../ui/components.md, ../../ui/voice-and-tone.md, ../../ui/design-system/README.md, ../../ui/mockups/README.md, ../../product-specs/workout.md, ../../product-specs/exercise-chat.md, ../../product-specs/exercises-base.md, ../../product-specs/videosinstruction.md, ../../user-flows/upload-video-and-get-feedback.md, ../../FRONTEND.md, ../../product.md
---

# Plan: Track B — UI mockups for Single-scenario MVP

Closes Track B of Phase 1 in `../active/roadmap.md`. Produces the visual artifacts that the future `EP-web-skeleton.md` plan translates into React components: HTML mockups for the two screens of Single-scenario MVP plus the technique pop-up, a UI text principles doc (`voice-and-tone.md`), and a component inventory (`components.md`).

## Goal & Context

Phase 1 of the project (`docs/exec-plans/active/roadmap.md` § 5) runs four parallel tracks. Track A (product specs) and Track C (skeletons) are closed. Track D (frontend pivot to web + future `web/` skeleton) is in progress. Track B (UI mockups) is in progress only in the sense that the Lucent design system is loaded at `docs/ui/design-system/`; no screen-level mockups exist yet, no `components.md`, no `voice-and-tone.md`. This plan brings Track B to a closeable state.

The Single-scenario MVP user flow (`docs/user-flows/upload-video-and-get-feedback.md` § 7) lists three distinct visual artifacts: the Workout screen, the per-exercise Chat screen with two states (empty / active), and the technique pop-up over the Workout screen. Mockups must visualize those four states using **real Lucent CSS** so that the eventual `web/` build is a near-direct port (no second-pass redesign). Mockup format is static HTML files in `docs/ui/mockups/`, each importing `../design-system/style.css`. Open-questions list in the user-flow § 8 (chat empty→active transition, camera-angle hint placement, "не смог разобрать" wording, "one analysis in queue" UI behavior) is resolved in Phase 3 of this plan and written back into the user-flow's Decision Log. Mobile-first viewport (≈ 390 px wide), dark theme only — gym context (`docs/ui/index.md` § Principles).

After this plan closes, Phase 1 exit-trigger gains the "mockups for 2–3 key screens ready" checkbox; the remaining trigger ("`web/` skeleton runs locally on Mac Safari") is owned by `EP-web-skeleton.md` (separate plan, follow-up to `EP-pivot-to-web.md`). No code is written here.

## Phases

### Phase 1 — Voice & tone foundation

**Goal:** A single approved file `docs/ui/voice-and-tone.md` codifying UI-text principles, ready to consult while drafting strings inside the screen mockups.

**Done when:** `docs/ui/voice-and-tone.md` exists with status `approved`; all four mandatory sections present (Principles, Address form, AI tone, Error / placeholder vocabulary); `docs/ui/index.md` updated (folder-structure row TBD → status link).

**Steps:**

- [x] Read `docs/product.md` "Voice and tone" (or equivalent) and `docs/product-specs/exercise-chat.md` § "AI reply format" + "Exercise recognition" for already-fixed tone decisions; consolidate into a list of known invariants.
- [x] Decide and write the **address form** (single decision: «ты» informal vs «вы» formal). Recommendation: «ты», matching `docs/user-flows/upload-video-and-get-feedback.md` step 3 placeholder ("Загрузи видео…"). Record in Decision Log of this plan.
- [x] Draft `docs/ui/voice-and-tone.md` body sections:
  - **Principles** (calm, supportive, no gamification — pulled from `docs/ui/index.md` § Principles + `docs/product.md`).
  - **Address form** (singular «ты», never «вы»; never plural «ребята»).
  - **AI tone** (trainer-style, plain language, no rigid structure — verbatim from `exercise-chat.md` § "AI reply format"; add 2–3 short example replies).
  - **Error / placeholder vocabulary** (canonical Russian phrasings for: empty chat placeholder, "Анализирую твой подход…", "Не смог разобрать твой подход…", queue-busy hint — exact wording is fixed in Phase 3, this section reserves the slots and links to Phase 3 outcomes).
- [x] Add YAML header (`status: approved`, `last_updated`, `related`).
- [x] Update `docs/ui/index.md` § "Folder structure": `voice-and-tone.md` row TBD → approved + link.

### Phase 2 — Workout screen + technique pop-up mockups

**Goal:** Two viewable HTML mockups: `docs/ui/mockups/workout.html` (Workout screen) and `docs/ui/mockups/technique-popup.html` (technique pop-up over workout). Both open in any browser and visually demonstrate exactly the elements specified in `docs/product-specs/workout.md` § "Workout screen anatomy" and `docs/product-specs/exercises-base.md` § "Technique text".

**Done when:** Both files exist; opening either in Safari renders the screen at ~390 px width with Lucent dark theme; pop-up mockup uses the real `technique` text for `romanian_deadlift` (so it shows realistic length, not placeholder lorem ipsum); `docs/ui/index.md` § "Folder structure" lists the new `mockups/` directory.

**Steps:**

- [x] Create `docs/ui/mockups/` directory; add small `README.md` inside explaining: format (standalone HTML, mobile-first 390 px, imports `../design-system/style.css`), how to open (double-click in Finder, opens in default browser), what the directory is for (visual source of truth before web client exists).
- [x] Author `docs/ui/mockups/workout.html`:
  - `<!DOCTYPE html>`, `<meta name="viewport" content="width=390">`.
  - `<link rel="stylesheet" href="../design-system/style.css">`.
  - Google Fonts links for Manrope + Material Symbols Rounded (per `docs/ui/design-system/README.md`).
  - Phone-frame container (max-width 390 px, centered for desktop preview).
  - Header block: workout name "Вайбкодинговая тренировка", date "19.04.2026", counter "3 упражнения".
  - Three exercise cards in fixed order from `workout.md` (Romanian deadlift, lat pulldown, biceps curl). Card anatomy: sequence number, exercise name, info-icon (Material Symbols `info`), right-arrow (Material Symbols `chevron_right`).
  - Tokens used: `--color-bg`, `--color-surface`, `--color-text`, `--color-text-secondary`, `--space-md/lg`, `--radius-md`. **No raw hex colors** — only CSS variables from Lucent.
- [x] Author `docs/ui/mockups/technique-popup.html`:
  - Same boilerplate as workout.html; same 390 px container.
  - Underlay = workout screen at 50 % opacity (or just dimmed background `var(--alpha-black-40)` overlay).
  - Pop-up surface: `var(--color-surface)`, radius `var(--radius-lg)`, padding `var(--space-lg)`.
  - Title: "Румынская тяга со штангой".
  - Body: full `technique` paragraph for `romanian_deadlift` from `docs/product-specs/exercises-base.md` § 1.
  - Close affordance: "Понятно" button (primary accent, full-width) **and** top-right close icon (Material Symbols `close`). Decision in this plan's Decision Log: both, because button on phone is the cheap tap target, icon is the muscle-memory affordance.
  - Decision (record in Decision Log): pop-up format = **bottom sheet** (slide-up from bottom, rounded top corners) rather than centered modal. Reason: phone ergonomics (thumb reach), and the existing Lucent style.css already has bottom-sheet treatment (verify by reading style.css; if absent, fall back to centered modal and note the gap in Surprises & Discoveries).
  - **Verified 2026-04-27:** `docs/ui/design-system/style.css` has no bottom-sheet treatment (only `.dialog`, a 320 px centered modal). Per fallback rule above, the mockup uses a centered modal at 340 px max-width; gap recorded in `## Surprises & Discoveries` below.
- [x] Cross-link from specs: add a one-line "Mockup: `../ui/mockups/workout.html`" pointer under `docs/product-specs/workout.md` § "Visual decisions" and "Mockup: `../ui/mockups/technique-popup.html`" under "Exercise card anatomy".
- [x] Update `docs/ui/index.md` § "Folder structure": add `mockups/` row, status `in-progress`, list the two files.
- [x] Verify by opening both files in Safari (manual check by owner; phase considered done after owner sign-off in chat). _Sign-off: owner approved 2026-04-27 («отлично!»)._

### Phase 3 — Per-exercise chat mockups (empty + active)

**Goal:** Two viewable HTML mockups — `docs/ui/mockups/chat-empty.html` and `docs/ui/mockups/chat-active.html` — covering both visual states from `docs/user-flows/upload-video-and-get-feedback.md` step 3 vs step 7. All four open questions in user-flow § 8 are resolved and recorded.

**Done when:** Both HTML files exist and render at 390 px in Lucent dark theme; user-flow § 9 "Decision log" has four new rows (one per resolved open question); `voice-and-tone.md` § "Error / placeholder vocabulary" filled with the exact canonical strings now decided; `docs/ui/index.md` lists the new files.

**Steps:**

- [x] Decide answers to user-flow § 8 open questions (record each in this plan's Decision Log + the user-flow's Decision Log):
  - **Q1 — empty→active transition.** Recommendation: cross-fade. `Загрузить видео` button stays, text input + attach button fade in below it after first AI message. No animation library; pure CSS `opacity` transition.
  - **Q2 — camera-angle hint location.** Recommendation: inside empty-chat placeholder text, a second sentence under the main "Загрузи видео…" line. Per-exercise: deadlift / biceps → "Снимай сбоку"; lat pulldown → "Снимай спереди или в три четверти". Comes from `exercises-base.md` "Camera angle" column.
  - **Q3 — "не смог разобрать" wording.** Use `docs/user-flows/upload-video-and-get-feedback.md` § 4.1 verbatim: «Не смог разобрать твой подход. Попробуй переснять видео и загрузить ещё раз».
  - **Q4 — "one analysis in queue" UI in another chat.** Recommendation: «Загрузить видео» disabled (greyed out) + small system message below feed: «Дождись разбора предыдущего видео, иначе я запутаюсь». No tooltip (poor mobile pattern).
  - **Q1 actually decided:** the Q1 recommendation above conflicts with the chat-active step's "the original 'Загрузить видео' button is **replaced** by the attach icon" instruction. Resolved in favor of the latter (single bottom affordance, less mobile clutter): cross-fade, but the button is replaced — not joined — by the chat input bar. Recorded in Decision Log row "2026-04-27 / Q1".
- [x] Author `docs/ui/mockups/chat-empty.html`:
  - Same boilerplate as Phase 2 mockups.
  - Header: back chevron (Material Symbols `arrow_back_ios_new`) + exercise name "Румынская тяга со штангой" centered.
  - Empty feed area: large neutral icon (Material Symbols `videocam` or similar) + two-line placeholder: «Загрузи видео с выполнением упражнения, и я проверю технику выполнения» + per-exercise camera-angle line (Q2 above).
  - Bottom action: full-width primary button «Загрузить видео» (`var(--color-accent)`, radius `var(--radius-md)`).
  - **No** text input, **no** attach button — match user-flow step 3.
- [x] Author `docs/ui/mockups/chat-active.html`:
  - Same header as empty.
  - Feed (bottom-up):
    1. User message — embedded video thumbnail (placeholder `<div>` with play icon, no real video).
    2. AI placeholder message «Анализирую твой подход…» with three-dot animated indicator (CSS `@keyframes`, no JS).
    3. AI reply message — short trainer-style text from `exercise-chat.md` "AI reply format" (1–2 sentences invented for the mockup, marked with HTML comment as "demo content, not authored AI output").
    4. (Optional) User follow-up text bubble.
  - Bottom: text input field («Спроси что-нибудь о технике…»), attach icon (Material Symbols `attach_file`), send button (Material Symbols `arrow_upward`). Mention in HTML comment that the original "Загрузить видео" button is **replaced** by the attach icon in the active state.
- [x] Update `docs/ui/voice-and-tone.md` § "Error / placeholder vocabulary" with the four canonical strings decided in step 1.
- [x] Cross-link from specs: in `docs/product-specs/exercise-chat.md` § "Chat UI" add pointer to both mockups; in `docs/user-flows/upload-video-and-get-feedback.md` § 7 "Related screens" link each of the two chat states to its mockup file.
- [x] Append four rows to `docs/user-flows/upload-video-and-get-feedback.md` § 9 "Decision log" (Q1…Q4), each row sourced as "Track B (Phase 3 of `EP-track-b-mockups`)".
- [x] Update `docs/ui/index.md` § "Folder structure": `mockups/` row gains the two new files.
- [x] Verify by opening both files in Safari (manual check; phase done after owner sign-off). _Sign-off: owner approved 2026-04-27 («все отлично») after the chat-active video-bubble overflow fix landed (see § Surprises & Discoveries)._

### Phase 4 — Component inventory + close Track B

**Goal:** `docs/ui/components.md` written as a digest of components actually used across the four mockups; Phase 1 exit-trigger updated in `../active/roadmap.md`; this plan flipped to `completed` and moved to `completed/`.

**Done when:** `components.md` exists with status `approved`; every component listed has at least one mockup citation; `../active/roadmap.md` § 5 Phase 1 marks Track B as ✅ Closed `<date>`; `../index.md` table reflects the new state; `Outcomes & Retrospective` section of this plan is filled.

**Steps:**

- [x] Walk all four mockup HTML files; list every distinct UI element used (button-primary, button-icon, exercise-card, list-header, popup-bottom-sheet, chat-bubble-user, chat-bubble-ai, chat-input-bar, exercise-info-popup-trigger, …). Group into categories: layout, content, controls, feedback.
- [x] Author `docs/ui/components.md`:
  - For each component: name, purpose (one sentence), Lucent token usage (which CSS variables / classes), where it's used (mockup file + line range), when **not** to use it.
  - Header note: "Components are an inventory, not a library. Reusable React abstractions are decided in `EP-web-skeleton.md`, not here."
- [x] Update `docs/ui/index.md` § "Folder structure": `components.md` row TBD → approved + link.
- [x] Update `docs/exec-plans/active/roadmap.md` § 5 Phase 1: Track B status `🔄 In progress` → `✅ Closed 2026-04-27 (completed/EP-track-b-mockups.md)`. Decision Log row added in § 8.
- [x] Flip this plan's YAML `status: active` → `status: completed`. `## Outcomes & Retrospective` filled below.
- [x] Move file: `docs/exec-plans/active/EP-track-b-mockups.md` → `docs/exec-plans/completed/EP-track-b-mockups.md`. `docs/exec-plans/index.md` updated (row moved Active → Plans / completed, `Closed` set to 2026-04-27).

## Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-27 | Mockup format = standalone HTML files in `docs/ui/mockups/`, importing Lucent's `style.css` directly. Not Figma. | Owner is non-developer working through agent; agent authors HTML, not Figma. HTML mockups use the same CSS the eventual `web/` client will use, eliminating a redesign pass. Boring tech first. |
| 2026-04-27 | Mockup viewport = 390 px wide, mobile-first. Desktop preview = same 390 px container centered on neutral background. | Gym context = phone usage; primary target Safari iOS. Desktop is preview-only at this stage. |
| 2026-04-27 | Dark theme only in mockups. | `docs/ui/index.md` § Principles fixes dark theme as required for gym lighting. Light theme not in MVP. |
| 2026-04-27 | `components.md` authored at end (Phase 4), not start. | Inventory-after-use beats abstract-component-library-first. Avoids speccing components no screen ends up needing. |
| 2026-04-27 | `voice-and-tone.md` authored at start (Phase 1). | Mockup strings need approved tone before they are written. Avoids retro-fixing copy in 4 HTML files later. |
| 2026-04-27 | Address form = «ты» (informal singular). | Matches existing user-flow placeholder strings («Загрузи видео…»); supportive coach tone (`docs/ui/index.md` § Principles); no «вы» or «ребята». |
| 2026-04-27 | Open Questions in `upload-video-and-get-feedback.md` § 8 are resolved inside Phase 3 of this plan, not deferred. | These four are explicitly tagged as Track B inputs in the user-flow doc. Track B is this plan. Resolving here closes the corresponding Decision Log rows in user-flow doc in the same commit. |
| 2026-04-27 | Plan approved by owner. Execution proceeds phase by phase via fresh-chat agent runs (one chat per phase). | Per `AGENTS.md` planning workflow + `PLANS.md` § 5 owner workflow. |
| 2026-04-27 | Technique pop-up close affordances = **both** "Понятно" full-width primary button **and** top-right close icon. | Mobile target ergonomics: button is the cheap tap target on phone, icon is the muscle-memory dismiss affordance. (Phase 2 of this plan.) |
| 2026-04-27 | Technique pop-up format = **centered modal** (downgraded from bottom sheet). | Bottom sheet was the preferred form (phone-thumb reach), but Lucent `style.css` has no bottom-sheet treatment — only `.dialog` (320 px centered). Per the fallback rule in Phase 2 step 3, the mockup uses a centered modal at 340 px max-width. Gap recorded in § "Surprises & Discoveries". Promotion to bottom sheet is deferred to `EP-web-skeleton.md`. |
| 2026-04-27 | Workout-screen exercise card anatomy in mockup = `[#] [name] [info-icon] [chevron]` arranged horizontally; number rendered as a 32 px circle on `--color-surface-hover`. | Numbered circle keeps "1/2/3" visually distinct from name without consuming a separate row, and reuses an existing token without inventing a new one. (Phase 2 of this plan.) |
| 2026-04-27 | **Q1** — Empty→active chat transition: cross-fade. After the first AI reply, the full-width «Загрузить видео» button is **replaced** by the chat input bar (text field + attach paperclip + send arrow). The attach icon becomes the new upload affordance. Pure CSS `opacity` transition, no animation library. | Resolves the contradiction inside Phase 3 step 1 (Q1 said "button stays") vs Phase 3 step 3 ("button replaced"). Single bottom affordance keeps the mobile bottom uncluttered; the user-flow's "Text input + attach button appear" wording (§ 3 step 7) is preserved — the attach icon is exactly the appearing attach button. (Phase 3 of this plan.) |
| 2026-04-27 | **Q2** — Camera-angle hint lives inside the empty-chat placeholder, second line, in `--color-text-secondary`. Per-exercise canonical strings: deadlift / biceps → «Снимай сбоку»; lat pulldown → «Снимай спереди или в три четверти». | Option (a) of user-flow § 8 Q2: hint co-located with the action it modifies (load video → from this angle). AI-system-message option (b) defers the hint until *after* upload, which is too late. Strings recorded in `voice-and-tone.md` § 4 + § 4.1. (Phase 3 of this plan.) |
| 2026-04-27 | **Q3** — Canonical "AI cannot analyze" wording: «Не смог разобрать твой подход. Попробуй переснять видео и загрузить ещё раз». No mockup variants. | Verbatim from user-flow § 4.1; matches voice-and-tone.md § 1 row 5 ("honesty about limits") and § 2 (singular «ты»). No reason to invent a second variant when the existing one already passes the tone bar. (Phase 3 of this plan.) |
| 2026-04-27 | **Q4** — "One analysis in queue" UI in another chat: «Загрузить видео» rendered disabled (greyed) + system message below the feed «Дождись разбора предыдущего видео, иначе я запутаюсь». No tooltip. | Tooltips are a poor mobile pattern (no hover, easy-to-miss long-press). A visible system message + disabled button gives both a why and a what. Wording personifies AI ("иначе я запутаюсь") to match the trainer-tone register from voice-and-tone.md § 3. (Phase 3 of this plan.) Not rendered as a separate mockup file in Phase 3 — recorded as a string in `voice-and-tone.md` § 4 and reserved for the web client to compose against existing chat-active layout. |

## Surprises & Discoveries

| Date | Discovery | Implication / next step |
|---|---|---|
| 2026-04-27 | Lucent `docs/ui/design-system/style.css` has **no** bottom-sheet component (only a 320 px centered `.dialog`). | Phase 2 fallback rule triggered: `technique-popup.html` ships with a centered modal. When `EP-web-skeleton.md` wires Lucent into `web/`, add a `.bottom-sheet` (or equivalent) treatment to `style.css` and re-render the technique pop-up in the web client to match the original ergonomic intent. |
| 2026-04-27 | Lucent ships a `.btn` family but no dedicated `.icon-btn` / circular icon-button (the existing `.icon-btn` in `style.css` is style-guide layout, not a token-driven component). | The two info / chevron / close affordances in the mockups are styled inline using existing Lucent tokens (`--color-surface-hover`, `--radius-full`). Promote to a reusable component class when authoring `components.md` (Phase 4) and consuming in `web/`. |
| 2026-04-27 | Safari on macOS blocks loading `style.css` from a sibling directory (`../design-system/style.css`) over `file://` by default — page renders without colors, fonts, or icons; Chrome loads it without complaint. | Documented the gotcha in `docs/ui/mockups/README.md` § "Safari gotcha" with two fixes (Develop → Disable Local File Restrictions, or `python3 -m http.server`). When the `web/` skeleton lands (`EP-web-skeleton.md`), Vite's dev server makes this irrelevant. |
| 2026-04-27 | First Safari render of `chat-active.html` showed the user-video bubble's thumbnail overflowing the bubble's right edge. Cause: thumbnail had a fixed `width: 220px` while the bubble was clamped by a percentage `max-width: 70%`; on a 358 px row those constraints fought (228 px content vs ≤ 250.6 px container, but flex-item sizing in Safari pushed the thumbnail past the bubble). | Reversed the sizing direction: bubble now sets the size (`width: 65%; max-width: 240px`), thumbnail fills it (`width: 100%`). Added an inner `.video-thumb-inner` absolute layer to keep the play-icon centering separate from the aspect-ratio sizing. General lesson: inside flex/percent containers, prefer "container sizes child" over "child sizes container", and never mix fixed-pixel children with percentage-clamped parents on small viewports. |

## Open Questions

- ~~**Bottom sheet vs centered modal for technique pop-up.**~~ **Resolved 2026-04-27 (Phase 2):** centered modal (fallback). Lucent `style.css` has no bottom-sheet treatment; gap deferred to `EP-web-skeleton.md`. See Decision Log + Surprises & Discoveries.
- ~~**Realistic AI reply text in `chat-active.html`.**~~ **Resolved 2026-04-27 (Phase 4 retrospective):** keep the existing 1–2 invented trainer-style sentences as **design-only demo content**. Same string is already cited as a tone exemplar in `../../ui/voice-and-tone.md` § 3 ("Good — specific + supportive"), which makes it tone-canonical for design purposes. Replacement with a real Gemini output is deferred to a content pass after Phase 2 thin-slice produces real outputs; that pass owns its own (small) plan, not this one.
- ~~**Per-exercise chat header — info-icon affordance.**~~ **Deferred 2026-04-27 (Phase 4 retrospective)** to Phase 2 thin-slice feedback per `../active/roadmap.md` § 5. Mockups ship without the icon (`row-icon-btn`-shaped second slot is reserved in `chat-empty.html` lines 131–132 and `chat-active.html` lines 226–227). If thin-slice usage shows users miss the affordance, the slot is already there to populate; no mockup re-author needed.

## Related documents

| Path | Role |
|---|---|
| `../active/roadmap.md` | Track B closure target. § 5 Phase 1 + § 8 Decision Log updated by Phase 4. |
| `../active/EP-mvp-product-spec.md` | Parent plan; references Track B as a required closure for Phase 1 exit trigger. |
| `../../ui/index.md` | Folder structure updated by Phases 1–4 as new files appear. |
| `../../ui/design-system/README.md` | Source of truth for Lucent CSS variables consumed by the mockups. |
| `../../product-specs/workout.md` | Source for Workout-screen anatomy (Phase 2). Cross-linked back via "Mockup:" pointer. |
| `../../product-specs/exercise-chat.md` | Source for chat structure + AI tone (Phases 1, 3). Cross-linked. |
| `../../product-specs/exercises-base.md` | Source for exercise names, technique text, camera angles (Phases 2, 3). |
| `../../user-flows/upload-video-and-get-feedback.md` | Source of two chat states + § 8 open questions (Phase 3). Decision Log appended in Phase 3. |
| `../../FRONTEND.md` | Confirms web stack + mobile-first viewport target. |
| `../../ui/components.md` | Authored in Phase 4. Inventory of UI elements actually used across the four mockups. |

## Outcomes & Retrospective

_Closed 2026-04-27._

### What shipped

- **Voice & tone foundation** — `../../ui/voice-and-tone.md` (status `approved`). Address form («ты»), AI tone invariants, anti-patterns, and a canonical-strings table whose six rows underwrite every Russian string the four mockups use.
- **Four HTML mockups** at 390 px in Lucent dark theme:
  - `../../ui/mockups/workout.html` — workout screen (header + 3 exercise cards from `workout.md`).
  - `../../ui/mockups/technique-popup.html` — technique pop-up over the workout screen, with the real `romanian_deadlift` paragraph from `exercises-base.md`.
  - `../../ui/mockups/chat-empty.html` — empty per-exercise chat (icon + placeholder + camera-angle hint + full-width «Загрузить видео»).
  - `../../ui/mockups/chat-active.html` — active per-exercise chat with every bubble type (user video, AI thinking, AI reply, user follow-up) and the bottom input bar.
- **Mockup README** — `../../ui/mockups/README.md` (format, how to open, Safari `file://` gotcha + workarounds).
- **Component inventory** — `../../ui/components.md` (status `approved`). Inventory grouped into Layout / Content / Controls / Feedback; every entry cited to a mockup file + line range.
- **Open-question closure in `../../user-flows/upload-video-and-get-feedback.md`** — four Decision-Log rows added (Q1 empty→active transition, Q2 camera-angle hint location, Q3 "не смог разобрать" wording, Q4 queue-busy UI in another chat).
- **Cross-links written into product specs** — `workout.md` (Visual decisions + Exercise card anatomy), `exercise-chat.md` (Chat UI), and the user-flow's "Related screens" now point at the corresponding mockup files.
- **`../../ui/index.md` folder structure** updated for `mockups/`, `voice-and-tone.md`, and `components.md`. **`../active/roadmap.md`** § 5 Phase 1 marks Track B `✅ Closed 2026-04-27`; § 8 Decision Log gains a closure row.

### What was dropped or deferred

| Item | Status | Inheritor |
|---|---|---|
| Bottom-sheet treatment for technique pop-up | Deferred — Lucent `style.css` has no bottom-sheet component yet; mockup uses centered `.modal` (340 px) instead. | `EP-web-skeleton.md` (add `.bottom-sheet` to `style.css`, re-render the technique pop-up). |
| Token-driven `.icon-btn` Lucent component | Deferred — current mockups inline-style 32–44 px circular icon buttons (`.exercise-icon-btn`, `.header-icon-btn`, `.input-icon-btn`, `.modal-close`). | `EP-web-skeleton.md` (promote to a single Lucent class consumed by all four sites). |
| Replace demo AI reply text in `chat-active.html` with a real Gemini output | Deferred — string is already tone-canonical (cited in `voice-and-tone.md` § 3). | Post-Phase-2 content pass (future small plan, not this one). |
| Info-icon affordance in chat header (re-open technique pop-up from chat) | Deferred — slot reserved in both chat mockups; populate only if thin-slice (`../active/roadmap.md` Phase 2) feedback flags the gap. | Phase 2 of the roadmap. |
| Queue-busy "one analysis in queue" rendered as a separate mockup file | Dropped — string lives in `voice-and-tone.md` § 4 (Q4 row), reserved for the web client to compose against the existing chat-active layout. | `EP-web-skeleton.md`. |

### Lessons

1. **CSS-first mockups eliminate a redesign pass.** HTML mockups that import the Lucent `style.css` directly mean the eventual `web/` build is a near-port, not a re-author. Reusing this pattern for any future screen plan is a default decision unless evidence forces otherwise.
2. **Voice-and-tone first, components last was the correct ordering.** Phase 1 (voice-and-tone) before Phases 2–3 (mockups) avoided retro-fixing copy across four files. Phase 4 (components) after the mockups avoided speccing components no screen ended up needing. Both orderings appeared in the Decision Log up front (2026-04-27 rows) and held under execution; keep this shape for similar surface plans.
3. **Inside flex / percent containers, "container sizes child" beats "child sizes container".** The chat-active video-bubble overflow bug (Surprises & Discoveries 2026-04-27) generalised: never mix a fixed-pixel child with a percentage-clamped parent on a 390 px viewport. Carries directly into the React port — same CSS pattern, same trap.
4. **Lucent gaps must be recorded with named inheritors at the moment of detection.** The bottom-sheet and `.icon-btn` gaps would have silently drifted otherwise. Pattern: a Decision Log row in the source plan, a row in Surprises & Discoveries, and an explicit naming of the plan that owns the fix (`EP-web-skeleton.md` in both cases).
5. **Resolve open questions in the consuming plan, not the producing doc.** All four user-flow open questions were resolved here (Track B is the consumer of those decisions); the user-flow's Decision Log got back-pointers, not duplicate decisions. Keeps source-of-truth single.
6. **Safari `file://` gotcha matters only at the mockup stage.** Documented in `mockups/README.md`; the Vite dev server makes it irrelevant in `web/`. No carryover beyond the README.

### Phase 1 exit-trigger contribution

`../active/roadmap.md` § 5 Phase 1 exit trigger reads: "mockups for 2–3 key screens ready, specs closed, `web/` skeleton runs locally on Mac Safari." Track B closure delivers the **mockups** clause (four screens — exceeds the 2–3 minimum). Specs were closed earlier (Track A, 2026-04-19). The remaining clause — `web/` skeleton on Mac Safari — is owned by `EP-web-skeleton.md` (a follow-up to `EP-pivot-to-web.md`); not this plan.
