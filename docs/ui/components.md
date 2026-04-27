---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: index.md, voice-and-tone.md, design-system/README.md, design-system/style.css, mockups/README.md, ../exec-plans/active/EP-track-b-mockups.md, ../FRONTEND.md
---

# UI components — inventory

> **Inventory, not a library.** This file lists every distinct UI element that actually appears in the four Single-scenario MVP mockups (`mockups/workout.html`, `mockups/technique-popup.html`, `mockups/chat-empty.html`, `mockups/chat-active.html`) so the future `web/` skeleton has one place to look up "what already exists, with what tokens, where". Reusable React abstractions, prop shapes, and component-library decisions are owned by `EP-web-skeleton.md`, not here.

Authored at the close of `../exec-plans/active/EP-track-b-mockups.md` (Phase 4). Every component is cited to at least one mockup file with a line range; missing citation = the component does not exist yet and must not be added here.

Token vocabulary in the "Tokens" column references CSS variables defined in `design-system/style.css`. Composed Lucent classes (e.g. `.btn .btn--solid .btn--block`) are also defined in `design-system/style.css`.

## How to read each row

- **Name** — the class or section the mockup uses. Not a final React component name.
- **Purpose** — one sentence, what slot it fills on screen.
- **Tokens** — Lucent CSS variables / classes the mockup composes. Raw hex colors are forbidden; if you see a hex code in a future mockup, it is a bug.
- **Used in** — `mockups/<file>` + line range (1-indexed inclusive). Multiple citations allowed.
- **Don't use when** — the smallest set of "wrong slot" cases that would otherwise be tempting.

## 1. Layout / containers

| Name | Purpose | Tokens | Used in | Don't use when |
|---|---|---|---|---|
| Phone frame (`.phone`) | Mobile-first column container, max 390 px wide, centered for desktop preview. Every screen mockup wraps its content in this. | `--color-bg`, `min-height: 100vh`, `max-width: 390px` | `mockups/workout.html` lines 124–185; `mockups/technique-popup.html` lines 188–256; `mockups/chat-empty.html` lines 121–158; `mockups/chat-active.html` lines 219–311 | Inside the future `web/` app this becomes a route layout, not a component you place by hand. Don't reuse for desktop-first wide layouts. |
| Workout header block (`.workout-header`) | Top of workout screen — title + meta (date, exercise count, dot separator). | `--color-text`, `--color-text-secondary`, `--space-2xs`, `--space-xs`, `--radius-full` (dot) | `mockups/workout.html` lines 127–134; `mockups/technique-popup.html` lines 192–199 (underlay copy) | Don't reuse as a generic page header on chat or modal — those have their own header (`.chat-header`, `.modal-head`). |
| Chat header (`.chat-header`) | Top bar of per-exercise chat — back chevron + centered exercise name + reserved right slot, with bottom border. 3-column 44 / 1fr / 44 grid for tap-target symmetry. | `--color-border`, `--color-text`, `--space-md`, `--space-sm`, `--space-xs` | `mockups/chat-empty.html` lines 126–133; `mockups/chat-active.html` lines 222–228 | Don't put the workout title here — workout screen uses `.workout-header`, not this. The right slot is reserved (currently empty by `Open Questions` of `EP-track-b-mockups.md`). |
| Feed area (`.feed`) — empty variant | Centered single-element placeholder column for first chat state. | `flex: 1`, `--space-xl`, `--space-lg` | `mockups/chat-empty.html` lines 140–148 | Don't render messages inside it — once the first AI message arrives, `chat-active.html` `.feed` (scrollable list) takes over instead. |
| Feed area (`.feed`) — active variant | Scrollable vertical list of `.row` message bubbles, top-to-bottom oldest-to-newest. | `flex: 1`, `overflow-y: auto`, `--space-md`, `--space-sm` | `mockups/chat-active.html` lines 246–287 | Don't reuse as a generic scroll container; spacing and bubble alignment are tuned for chat rows specifically. |
| Modal scrim (`.scrim`) | Dark overlay over an underlay screen while a modal is open. | `--alpha-black-40`, absolute inset-0 | `mockups/technique-popup.html` lines 229–230 (the `<div class="scrim"></div>`) | Don't use as a generic dimmer for tooltips, drawer dimming, or partial blur effects — for those, choose a different alpha token explicitly. |
| Modal wrap (`.modal-wrap`) | Centers a modal over the scrim, with safe-area padding. | `--space-md`, absolute inset-0, flex center | `mockups/technique-popup.html` lines 232–254 | Don't use for non-modal floating elements (toasts, snackbars). |

## 2. Content blocks

| Name | Purpose | Tokens | Used in | Don't use when |
|---|---|---|---|---|
| Exercise card (`.exercise-card`) | Row in workout exercise list — number circle, exercise name, info icon, chevron. Min height 64 px for thumb tap target. | `--color-surface`, `--color-surface-hover` (number circle bg), `--color-text`, `--color-text-secondary`, `--radius-md` (card), `--radius-full` (number), `--space-md`, `--space-2xs` | `mockups/workout.html` lines 140–153, 156–167, 170–181; `mockups/technique-popup.html` lines 202–225 (underlay copies) | Don't use for non-list contexts (e.g. featured-exercise hero card on a future home screen). The chevron implies "tap to enter chat", which is exclusive to the workout list per `../product-specs/workout.md`. |
| Empty-state placeholder (`.empty-state`) | Centered icon-on-circle + main placeholder line + per-exercise camera-angle hint. Used when chat has no messages yet. | `--color-surface` (icon wrap), `--color-text`, `--color-text-secondary`, `--radius-full`, `--space-md` | `mockups/chat-empty.html` lines 141–147 | Don't reuse on screens that already have content (workout, active chat). For "no workouts yet" or "no exercises" — author a separate empty-state per `EP-web-skeleton.md`; this one's strings are chat-specific (see `voice-and-tone.md` § 4). |
| Modal (`.modal`) | Centered card surface for the technique pop-up — title + close icon + body paragraph + primary action button. Width clamped to 340 px on phone. | `--color-surface`, `--color-shadow` (box-shadow), `--radius-lg`, `--space-lg`, `--space-md` | `mockups/technique-popup.html` lines 234–253 | Don't reuse for confirmation dialogs requiring two actions (Confirm + Cancel). The current shape assumes single primary affordance + dismiss. **Fallback shape** — promotion to bottom sheet is deferred per `EP-track-b-mockups.md` Surprises & Discoveries (Lucent has no bottom-sheet treatment yet). |
| Modal head (`.modal-head`) | Modal title + top-right close icon, in a single row. | `--space-md` | `mockups/technique-popup.html` lines 236–241 | Don't reuse for a screen header — chat and workout have their own header components. |
| Modal body (`.modal-body`) | Scrollable text body of a modal. Currently used for the technique paragraph. | `--color-text`, font-size 14 px, line-height 1.55 | `mockups/technique-popup.html` lines 245–247 | Don't render structured forms or lists here — body is plain prose by design. |
| Chat bubble — AI text (`.bubble.bubble--ai`) | Trainer-side message; left-aligned via `.row--ai`. Asymmetric corner (bottom-left tightened) marks speaker. | `--color-surface`, `--color-text`, `--radius-lg`, `--radius-xs` (tightened corner), `--space-sm`, `--space-md` | `mockups/chat-active.html` lines 263–270 (thinking variant), 274–278 (reply) | Don't use for system / status messages (queue-busy hint, error banner) — those need a distinct visual register the future `web/` defines via the queue-busy slot in `voice-and-tone.md` § 4. |
| Chat bubble — user text (`.bubble.bubble--user`) | User-side message; right-aligned via `.row--user`. Accent-fill marks "you said this". | `--color-accent`, `--color-text-on-accent`, `--radius-lg`, `--radius-xs` (tightened corner), `--space-sm`, `--space-md` | `mockups/chat-active.html` lines 281–285 | Don't use for AI replies. Don't use as a generic accent-filled call-out. |
| Chat bubble — user video (`.bubble.bubble--video`) | User message that is a video, not text. Bubble owns the size (65 % of row, max 240 px); thumbnail fills it. | `--color-accent` (inherited bg), 4 px padding, `box-sizing: border-box` | `mockups/chat-active.html` lines 251–260 | Don't add text inside this bubble — text lives in `.bubble.bubble--user`. The "container sizes child" pattern is mandatory: never put a fixed-pixel child inside (lesson recorded in `EP-track-b-mockups.md` Surprises & Discoveries). |
| Video thumbnail (`.video-thumb` + `.video-thumb-inner`) | Placeholder block for an embedded video, with a centered play icon and bottom-right duration chip. 9:16 aspect ratio. | `--color-surface-strong`, `--neutral-50` (gradient), `--alpha-white-85` (icon), `--alpha-black-40` (duration bg), `--neutral-1000` (duration fg), `--radius-md`, `--radius-xs` | `mockups/chat-active.html` lines 252–259 | Don't promote `--neutral-50` / `--neutral-1000` usage to other components — these are local primitives for the placeholder gradient and the duration chip; everywhere else use semantic color tokens. |
| AI thinking placeholder (`.thinking`) | Three-dot animated typing indicator beside the «Анализирую твой подход» line. CSS `@keyframes typing-bounce`, no JS. | `--color-text-secondary`, `--radius-full` (dots), 6 px dot, `--space-xs` gap | `mockups/chat-active.html` lines 263–270 | Don't use for generic loading states (network spinner, skeleton). This indicator is specifically "AI is composing a reply"; reusing it elsewhere blurs that meaning. |

## 3. Controls

| Name | Purpose | Tokens | Used in | Don't use when |
|---|---|---|---|---|
| Primary block button (`.btn.btn--solid.btn--block`) | Full-width primary action. Composed from Lucent classes; mockup-level CSS only overrides height (48 / 52 px) and corner radius for mobile target. | `--color-accent`, `--color-text-on-accent`, `--color-accent-hover`, `--radius-md` (mobile override), Lucent `.btn` family | `mockups/technique-popup.html` line 250 (Понятно); `mockups/chat-empty.html` line 155 (Загрузить видео) | Don't use for secondary actions. Don't use for icon-only entry points — those are circular icon buttons (below). Per `voice-and-tone.md` § 2 — labels in «ты» imperative («Загрузи»), never «вы» / collective. |
| Circular icon button — neutral (`.exercise-icon-btn`, `.header-icon-btn`, `.input-icon-btn`, `.modal-close`) | 32–44 px round tap target wrapping a single Material Symbols Rounded icon. Multiple sites: workout-card info / chevron, chat header back, modal close, input-bar attach. | `--radius-full`, `--color-text-secondary` (default fg), `--color-text` (chat-header back fg), `--color-surface-hover` (modal-close bg), `.msr` icon class | `mockups/workout.html` lines 145–151 (info + chevron); `mockups/technique-popup.html` lines 238–240 (close); `mockups/chat-empty.html` lines 127–129 (back); `mockups/chat-active.html` lines 223–225 (back), 302–304 (attach) | Don't load Material Symbols icons by SVG — the project uses the **font** (`design-system/README.md` § 4). Don't shrink below 32 px on phone — too small for sweaty-hand taps (`index.md` § Principles row 2). Promotion to a Lucent `.icon-btn` token-driven component is recorded in `EP-track-b-mockups.md` Surprises & Discoveries. |
| Circular icon button — accent send (`.input-icon-btn--send`) | Variant of the circular icon button that signals primary "send" intent. Filled accent. | `--color-accent`, `--color-text-on-accent`, `--radius-full`, 40 × 40 px | `mockups/chat-active.html` lines 306–308 | Don't use for non-send actions. There is exactly one accent-filled circular button per screen by design. |
| Chat input bar (`.input-bar`) | Bottom row of the active chat: attach icon + text-input pill + accent send icon. Replaces the empty-chat «Загрузить видео» button after the first AI reply (`EP-track-b-mockups.md` Phase 3 Q1). | `--color-bg`, `--color-border` (top divider), `--space-sm`, `--space-md`, `--space-xs` | `mockups/chat-active.html` lines 301–309 | Don't render alongside the «Загрузить видео» block button on the same screen — the two states are mutually exclusive (cross-fade transition, see Q1 in `EP-track-b-mockups.md` Decision Log). |
| Text input pill (`.text-input`) | Pill-shaped placeholder field inside the chat input bar. Mockup is a static `<div>` with the placeholder string; in `web/` this becomes a real `<input>` / `<textarea>`. | `--color-surface`, `--color-text-secondary`, `--radius-pill`, `--space-sm`, `--space-md`, min-height 40 px | `mockups/chat-active.html` lines 305–305 | Don't reuse for forms (login, profile) — those use Lucent `.field` (`design-system/style.css` § FIELDS) which has labels, focus / error states, and a different shape. |

## 4. Feedback / status

| Name | Purpose | Tokens | Used in | Don't use when |
|---|---|---|---|---|
| Three-dot animated typing indicator (`.dots`) | Three dots bouncing in sequence, 1.2 s loop, pure CSS `@keyframes`, no JS. | `--color-text-secondary`, `--radius-full`, 6 px dot, `gap: 4px` | `mockups/chat-active.html` lines 263–270 (composed inside `.thinking`) | Don't reuse for generic loading; see `.thinking` row above. |

## 5. Strings used by these components

For every user-facing label, placeholder, button text, hint, and AI-message string the mockups use, the canonical Russian wording lives in `voice-and-tone.md` § 4. Components do not own copy. If a future mockup or `web/` screen needs a string that is not in `voice-and-tone.md` § 4, the wording must be decided there first (new Decision Log row in `EP-track-b-mockups.md` or a follow-up plan), then consumed here — never inline-rewritten.

Address form invariant (`voice-and-tone.md` § 2): singular informal «ты», never «вы» / «ребята».

## 6. What this inventory deliberately omits

- **Lucent components not used by any current mockup** — `.btn--dim`, `.btn--ghost`, `.field` family, `.checkbox`, `.radio`, `.menu-item`, `.segmented`, `.tabs`, `.accordion`, `.slider`, `.progress`, `.avatar`, `.badge`. They live in `design-system/style.css` and are available; they are simply not part of the Single-scenario MVP visual surface. They will reappear in this inventory only when a mockup or screen actually uses them.
- **Reusable React component shapes (props, state, files).** Owned by `EP-web-skeleton.md`. This file is design-side; that file is code-side.
- **Light theme variants.** Out of MVP scope (`index.md` § Principles row 3 — dark theme only).
- **Animations beyond the three-dot typing indicator.** No motion design system in MVP. Cross-fade between empty / active chat is a pure CSS `opacity` transition (`EP-track-b-mockups.md` Phase 3 Q1) — no animation library.

## 7. Cross-references

| For… | Read |
|---|---|
| Source of truth for tokens (colors, spacing, radii) | `design-system/style.css` (consumed verbatim by mockups via `<link>` and by future `web/` per `design-system/README.md`). |
| Mockup file conventions | `mockups/README.md`. |
| Why the technique pop-up is a centered modal, not a bottom sheet | `EP-track-b-mockups.md` Decision Log + Surprises & Discoveries (Lucent has no bottom-sheet treatment). |
| Why the chat active state replaces the «Загрузить видео» button with the input bar | `EP-track-b-mockups.md` Phase 3 Q1 Decision Log row. |
| Where the Russian strings come from | `voice-and-tone.md` § 4. |
| Where reusable React components will be defined | `EP-web-skeleton.md` (planned, not yet authored). Driven by `../exec-plans/active/EP-pivot-to-web.md` "Future work". |
