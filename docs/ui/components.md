---
status: approved
last_updated: 2026-04-28
owner: Кристина
related: index.md, voice-and-tone.md, design-system/README.md, design-system/style.css, mockups/README.md, ../exec-plans/active/EP-web-skeleton.md, ../exec-plans/completed/EP-track-b-mockups.md, ../FRONTEND.md
---

# UI components — inventory

> **Inventory, not a library.** This file lists every distinct UI element that actually appears in the four Single-scenario MVP mockups (`mockups/workout.html`, `mockups/technique-popup.html`, `mockups/chat-empty.html`, `mockups/chat-active.html`) so the future `web/` skeleton has one place to look up "what already exists, with what tokens, where". Reusable React abstractions, prop shapes, and component-library decisions are owned by `EP-web-skeleton.md`, not here.

Authored at the close of `../exec-plans/completed/EP-track-b-mockups.md` (Phase 4); refreshed in Phase 5 of `../exec-plans/active/EP-web-skeleton.md` after the Lucent gaps closed (`.bottom-sheet` and the token-driven `.icon-btn` family landed in `design-system/style.css`, mockups re-rendered to consume them). Every component is cited to at least one mockup file with a line range; missing citation = the component does not exist yet and must not be added here.

Token vocabulary in the "Tokens" column references CSS variables defined in `design-system/style.css`. Composed Lucent classes (e.g. `.btn .btn--solid .btn--block`, `.icon-btn .icon-btn--md .icon-btn--accent`) are also defined in `design-system/style.css`.

## How to read each row

- **Name** — the class or section the mockup uses. Not a final React component name.
- **Purpose** — one sentence, what slot it fills on screen.
- **Tokens** — Lucent CSS variables / classes the mockup composes. Raw hex colors are forbidden; if you see a hex code in a future mockup, it is a bug.
- **Used in** — `mockups/<file>` + line range (1-indexed inclusive). Multiple citations allowed.
- **Don't use when** — the smallest set of "wrong slot" cases that would otherwise be tempting.

## 1. Layout / containers

| Name | Purpose | Tokens | Used in | Don't use when |
|---|---|---|---|---|
| Phone frame (`.phone`) | Mobile-first column container, max 390 px wide, centered for desktop preview. Every screen mockup wraps its content in this. | `--color-bg`, `min-height: 100vh`, `max-width: 390px` | `mockups/workout.html` lines 110–171; `mockups/technique-popup.html` lines 134–200; `mockups/chat-empty.html` lines 108–145; `mockups/chat-active.html` lines 190–282 | Inside the future `web/` app this becomes a route layout, not a component you place by hand. Don't reuse for desktop-first wide layouts. |
| Workout header block (`.workout-header`) | Top of workout screen — title + meta (date, exercise count, dot separator). | `--color-text`, `--color-text-secondary`, `--space-2xs`, `--space-xs`, `--radius-full` (dot) | `mockups/workout.html` lines 113–120; `mockups/technique-popup.html` lines 138–145 (underlay copy) | Don't reuse as a generic page header on chat or modal — those have their own header (`.chat-header`, `.bottom-sheet-head`). |
| Chat header (`.chat-header`) | Top bar of per-exercise chat — back chevron + centered exercise name + reserved right slot, with bottom border. 3-column 44 / 1fr / 44 grid for tap-target symmetry. | `--color-border`, `--color-text`, `--space-md`, `--space-sm`, `--space-xs` | `mockups/chat-empty.html` lines 113–120; `mockups/chat-active.html` lines 193–199 | Don't put the workout title here — workout screen uses `.workout-header`, not this. The right slot is reserved (currently empty by `Open Questions` of `../exec-plans/completed/EP-track-b-mockups.md`). |
| Feed area (`.feed`) — empty variant | Centered single-element placeholder column for first chat state. | `flex: 1`, `--space-xl`, `--space-lg` | `mockups/chat-empty.html` lines 127–135 | Don't render messages inside it — once the first AI message arrives, `chat-active.html` `.feed` (scrollable list) takes over instead. |
| Feed area (`.feed`) — active variant | Scrollable vertical list of `.row` message bubbles, top-to-bottom oldest-to-newest. | `flex: 1`, `overflow-y: auto`, `--space-md`, `--space-sm` | `mockups/chat-active.html` lines 217–258 | Don't reuse as a generic scroll container; spacing and bubble alignment are tuned for chat rows specifically. |
| Bottom-sheet scrim (`.bottom-sheet-scrim`) | Dark overlay over an underlay screen while a bottom sheet is open. Lucent component (`design-system/style.css` § BOTTOM SHEET). | `--alpha-black-40`, absolute inset-0, `z-index: 1` | `mockups/technique-popup.html` line 176 | Don't use as a generic dimmer for tooltips, drawer dimming, or partial blur effects — for those, choose a different alpha token explicitly. |
| Bottom sheet (`.bottom-sheet`) | Phone-first surface anchored to the bottom edge with rounded top corners and a 36 × 4 px drag-handle pill (`::before`). Replaces the centered-modal fallback used during `EP-track-b-mockups.md`. Lucent component. | `--color-surface`, `--color-shadow`, `--color-border` (drag handle), `--radius-lg` (top corners only), `--radius-pill` (drag handle), `--space-lg`, `env(safe-area-inset-bottom)` | `mockups/technique-popup.html` lines 179–198 | Don't use for confirmation dialogs requiring two equal-weight actions (Confirm + Cancel) — bottom sheet's vertical layout assumes single primary affordance + dismiss. Don't use as a generic modal — `dialog` (Lucent `.dialog`) is the right shape for tiny centered prompts. |

## 2. Content blocks

| Name | Purpose | Tokens | Used in | Don't use when |
|---|---|---|---|---|
| Exercise card (`.exercise-card`) | Row in workout exercise list — number circle, exercise name, info icon, chevron. Min height 64 px for thumb tap target. | `--color-surface`, `--color-surface-hover` (number circle bg), `--color-text`, `--color-text-secondary`, `--radius-md` (card), `--radius-full` (number), `--space-md`, `--space-2xs` | `mockups/workout.html` lines 126–139, 142–153, 156–167; `mockups/technique-popup.html` lines 148–155, 156–163, 164–171 (underlay copies) | Don't use for non-list contexts (e.g. featured-exercise hero card on a future home screen). The chevron implies "tap to enter chat", which is exclusive to the workout list per `../product-specs/workout.md`. |
| Empty-state placeholder (`.empty-state`) | Centered icon-on-circle + main placeholder line + per-exercise camera-angle hint. Used when chat has no messages yet. | `--color-surface` (icon wrap), `--color-text`, `--color-text-secondary`, `--radius-full`, `--space-md` | `mockups/chat-empty.html` lines 128–134 | Don't reuse on screens that already have content (workout, active chat). For "no workouts yet" or "no exercises" — author a separate empty-state per `EP-web-skeleton.md`; this one's strings are chat-specific (see `voice-and-tone.md` § 4). |
| Bottom-sheet head (`.bottom-sheet-head`) | Title + top-right close icon-button, in a single row. Mockup-local class composing the Lucent `.bottom-sheet` surface. | `--space-md` | `mockups/technique-popup.html` lines 181–186 | Don't reuse for a screen header — chat and workout have their own header components. |
| Bottom-sheet body (`.bottom-sheet-body`) | Prose body of a bottom sheet. Currently used for the technique paragraph. | `--color-text`, font-size 14 px, line-height 1.55 | `mockups/technique-popup.html` lines 190–192 | Don't render structured forms or lists here — body is plain prose by design. |
| Bottom-sheet actions (`.bottom-sheet-actions`) | Row reserved for the primary action button(s) at the bottom of the sheet. Composes Lucent `.btn .btn--solid .btn--block` with a mockup-local height bump for mobile. | `--radius-md` (mobile button override), Lucent `.btn` family | `mockups/technique-popup.html` lines 194–196 | Don't stack more than one primary action — bottom sheet pattern is single-affordance + dismiss. |
| Chat bubble — AI text (`.bubble.bubble--ai`) | Trainer-side message; left-aligned via `.row--ai`. Asymmetric corner (bottom-left tightened) marks speaker. | `--color-surface`, `--color-text`, `--radius-lg`, `--radius-xs` (tightened corner), `--space-sm`, `--space-md` | `mockups/chat-active.html` lines 234–241 (thinking variant), 245–249 (reply) | Don't use for system / status messages (queue-busy hint, error banner) — those need a distinct visual register the future `web/` defines via the queue-busy slot in `voice-and-tone.md` § 4. |
| Chat bubble — user text (`.bubble.bubble--user`) | User-side message; right-aligned via `.row--user`. Accent-fill marks "you said this". | `--color-accent`, `--color-text-on-accent`, `--radius-lg`, `--radius-xs` (tightened corner), `--space-sm`, `--space-md` | `mockups/chat-active.html` lines 252–256 | Don't use for AI replies. Don't use as a generic accent-filled call-out. |
| Chat bubble — user video (`.bubble.bubble--video`) | User message that is a video, not text. Bubble owns the size (65 % of row, max 240 px); thumbnail fills it. | `--color-accent` (inherited bg), 4 px padding, `box-sizing: border-box` | `mockups/chat-active.html` lines 222–231 | Don't add text inside this bubble — text lives in `.bubble.bubble--user`. The "container sizes child" pattern is mandatory: never put a fixed-pixel child inside (lesson recorded in `../exec-plans/completed/EP-track-b-mockups.md` Surprises & Discoveries). |
| Video thumbnail (`.video-thumb` + `.video-thumb-inner`) | Placeholder block for an embedded video, with a centered play icon and bottom-right duration chip. 9:16 aspect ratio. | `--color-surface-strong`, `--neutral-50` (gradient), `--alpha-white-85` (icon), `--alpha-black-40` (duration bg), `--neutral-1000` (duration fg), `--radius-md`, `--radius-xs` | `mockups/chat-active.html` lines 224–229 | Don't promote `--neutral-50` / `--neutral-1000` usage to other components — these are local primitives for the placeholder gradient and the duration chip; everywhere else use semantic color tokens. |
| AI thinking placeholder (`.thinking`) | Three-dot animated typing indicator beside the «Анализирую твой подход» line. CSS `@keyframes typing-bounce`, no JS. | `--color-text-secondary`, `--radius-full` (dots), 6 px dot, `--space-xs` gap | `mockups/chat-active.html` lines 234–241 | Don't use for generic loading states (network spinner, skeleton). This indicator is specifically "AI is composing a reply"; reusing it elsewhere blurs that meaning. |

## 3. Controls

| Name | Purpose | Tokens | Used in | Don't use when |
|---|---|---|---|---|
| Primary block button (`.btn.btn--solid.btn--block`) | Full-width primary action. Composed from Lucent classes; mockup-level CSS only overrides height (48 / 52 px) and corner radius for mobile target. | `--color-accent`, `--color-text-on-accent`, `--color-accent-hover`, `--radius-md` (mobile override), Lucent `.btn` family | `mockups/technique-popup.html` line 195 (Понятно); `mockups/chat-empty.html` line 142 (Загрузить видео) | Don't use for secondary actions. Don't use for icon-only entry points — those are circular icon buttons (below). Per `voice-and-tone.md` § 2 — labels in «ты» imperative («Загрузи»), never «вы» / collective. |
| Circular icon button — neutral (`.icon-btn .icon-btn--<sm\|md\|lg> .icon-btn--neutral`) | Round tap target wrapping a single Material Symbols Rounded icon, transparent background, secondary-text foreground. Sizes: `--sm` 32 px (sheet close), `--md` 40 px (workout-card info / chevron, chat input attach), `--lg` 44 px (chat header back). Lucent component (`design-system/style.css` § ICON BUTTONS). | `--radius-full`, `--color-text-secondary`, `.msr` icon class, sizes 32 / 40 / 44 px | `mockups/workout.html` lines 131–137, 135–137, 146–148, 149–151, 160–162, 163–165 (info + chevron, three cards); `mockups/technique-popup.html` lines 152–153, 160–161, 168–169 (underlay info + chevron), 183–185 (sheet close); `mockups/chat-empty.html` lines 114–116 (back); `mockups/chat-active.html` lines 194–196 (back), 273–275 (attach) | Don't load Material Symbols icons by SVG — the project uses the **font** (`design-system/README.md` § 4). Don't shrink below `--sm` (32 px) on phone — too small for sweaty-hand taps (`index.md` § Principles row 2). Don't author a fourth size — `--sm` / `--md` / `--lg` cover every current site; new sizes need a Lucent decision. |
| Circular icon button — accent send (`.icon-btn .icon-btn--md .icon-btn--accent`) | Variant of the circular icon button that signals primary "send" intent. Filled accent. Lucent component. | `--color-accent`, `--color-text-on-accent`, `--radius-full`, 40 × 40 px | `mockups/chat-active.html` lines 277–279 | Don't use for non-send actions. There is exactly one accent-filled circular button per screen by design. |
| Chat input bar (`.input-bar`) | Bottom row of the active chat: attach icon + text-input pill + accent send icon. Replaces the empty-chat «Загрузить видео» button after the first AI reply (`../exec-plans/completed/EP-track-b-mockups.md` Phase 3 Q1). | `--color-bg`, `--color-border` (top divider), `--space-sm`, `--space-md`, `--space-xs` | `mockups/chat-active.html` lines 272–280 | Don't render alongside the «Загрузить видео» block button on the same screen — the two states are mutually exclusive (cross-fade transition, see Q1 in `../exec-plans/completed/EP-track-b-mockups.md` Decision Log). |
| Text input pill (`.text-input`) | Pill-shaped placeholder field inside the chat input bar. Mockup is a static `<div>` with the placeholder string; in `web/` this becomes a real `<input>` / `<textarea>`. | `--color-surface`, `--color-text-secondary`, `--radius-pill`, `--space-sm`, `--space-md`, min-height 40 px | `mockups/chat-active.html` line 276 | Don't reuse for forms (login, profile) — those use Lucent `.field` (`design-system/style.css` § FIELDS) which has labels, focus / error states, and a different shape. |

## 4. Feedback / status

| Name | Purpose | Tokens | Used in | Don't use when |
|---|---|---|---|---|
| Three-dot animated typing indicator (`.dots`) | Three dots bouncing in sequence, 1.2 s loop, pure CSS `@keyframes`, no JS. | `--color-text-secondary`, `--radius-full`, 6 px dot, `gap: 4px` | `mockups/chat-active.html` lines 234–241 (composed inside `.thinking`) | Don't reuse for generic loading; see `.thinking` row above. |

## 5. Strings used by these components

For every user-facing label, placeholder, button text, hint, and AI-message string the mockups use, the canonical Russian wording lives in `voice-and-tone.md` § 4. Components do not own copy. If a future mockup or `web/` screen needs a string that is not in `voice-and-tone.md` § 4, the wording must be decided there first (new Decision Log row in `../exec-plans/completed/EP-track-b-mockups.md` or a follow-up plan), then consumed here — never inline-rewritten.

Address form invariant (`voice-and-tone.md` § 2): singular informal «ты», never «вы» / «ребята».

## 6. What this inventory deliberately omits

- **Lucent components not used by any current mockup** — `.btn--dim`, `.btn--ghost`, `.field` family, `.checkbox`, `.radio`, `.menu-item`, `.segmented`, `.tabs`, `.accordion`, `.slider`, `.progress`, `.avatar`, `.badge`, `.dialog`. They live in `design-system/style.css` and are available; they are simply not part of the Single-scenario MVP visual surface. They will reappear in this inventory only when a mockup or screen actually uses them.
- **Reusable React component shapes (props, state, files).** Owned by `EP-web-skeleton.md`. This file is design-side; that file is code-side.
- **Light theme variants.** Out of MVP scope (`index.md` § Principles row 3 — dark theme only).
- **Animations beyond the three-dot typing indicator.** No motion design system in MVP. Cross-fade between empty / active chat is a pure CSS `opacity` transition (`../exec-plans/completed/EP-track-b-mockups.md` Phase 3 Q1) — no animation library.

## 7. Cross-references

| For… | Read |
|---|---|
| Source of truth for tokens (colors, spacing, radii) | `design-system/style.css` (consumed verbatim by mockups via `<link>` and by future `web/` per `design-system/README.md`). |
| Mockup file conventions | `mockups/README.md`. |
| Why the technique pop-up is now a bottom sheet (not a centered modal) | `../exec-plans/active/EP-web-skeleton.md` Phase 5 closed the gap; original deferral context lives in `../exec-plans/completed/EP-track-b-mockups.md` Decision Log + Surprises & Discoveries. |
| Why a single token-driven `.icon-btn` family replaced the four ad-hoc circular icon buttons | `../exec-plans/active/EP-web-skeleton.md` Phase 5 (closure of the gap recorded in `../exec-plans/completed/EP-track-b-mockups.md` Surprises & Discoveries). |
| Why the chat active state replaces the «Загрузить видео» button with the input bar | `../exec-plans/completed/EP-track-b-mockups.md` Phase 3 Q1 Decision Log row. |
| Where the Russian strings come from | `voice-and-tone.md` § 4. |
| Where reusable React components will be defined | `../exec-plans/active/EP-web-skeleton.md` (Phase 4 ported domain types + route shells; component implementations land in Phase 2 of `../exec-plans/active/roadmap.md` thin-slice). |
