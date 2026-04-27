---
status: approved
last_updated: 2026-04-27
owner: Кристина
related: index.md, ../product.md, ../product-specs/exercise-chat.md, ../user-flows/upload-video-and-get-feedback.md, ../exec-plans/active/EP-track-b-mockups.md
---

# Voice and tone

UI-text principles for UPR. Source of truth for every Russian string in the product (mockups, UI labels, AI replies). Authored in Phase 1 of `../exec-plans/active/EP-track-b-mockups.md`. Mockup string drafting MUST consult this file before writing copy.

Out of scope: backend log strings, internal error codes, internal docs.

## 1. Principles

1. **Calm and supportive.** Default emotional register. User is in vulnerable context (gym, video of self). Strings never humiliate, never tease, never rush. (`../product.md` § 13 "Emotional safety".)
2. **No gamification language.** No badges / levels / streaks vocabulary. No «GG WP», «Pro Lifter», «достижение разблокировано», «опыт +10». (`index.md` § Principles.)
3. **Plain Russian, trainer-style.** No formal-documentary register, no marketing slogans. Avoid bureaucratic phrasing («осуществить загрузку видео»).
4. **Specific over generic.** Where a message can name the actual exercise, action, or constraint — it does. Generic «Что-то пошло не так» is a fallback, not a default. (`../product.md` § 11.)
5. **Honesty about limits.** When AI didn't see clearly or doesn't know — say so, don't fabricate confidence. (`../product.md` § 13 "Honesty".)
6. **Short.** Gym = phone, glanceable. Default: ≤ 1 sentence per UI label, ≤ 2 sentences per AI message paragraph. Long technique explanations live in dedicated surfaces (technique pop-up, etc.).
7. **Translation-ready.** All user-facing strings will become i18n keys (`../FRONTEND.md` i18n section, `index.md` § Principles row 6). No untranslatable wordplay; size buttons with slack for longer languages.

## 2. Address form

- **Singular informal «ты». Always.** Examples: «Загрузи видео», «Снимай сбоку», «Попробуй переснять».
- **Never «вы»** — neither formal-singular nor plural. Distance is wrong tone for this product.
- **Never «ребята», «друзья», «команда»** — collective address breaks the per-user feel.
- AI refers to itself in first person where natural («Анализирую твой подход», «Не смог разобрать»). No invented persona name (no «UPR думает…», no «Тренер Алекс отвечает…»).
- Decision sourced: `../exec-plans/active/EP-track-b-mockups.md` Decision Log (2026-04-27); matches existing user-flow placeholder «Загрузи видео…».

## 3. AI tone

Verbatim invariant from `../product-specs/exercise-chat.md` § "AI reply format":

> Trainer-style human tone, plain language, no rigid structure.

Annotated frame from video may accompany text. If user attached a comment to the video:

1. AI replies to that question first as a separate message.
2. Then general technique review + recommendations.

User comment is priority — addressed first.

Other invariants for AI replies:

- **Open with what the user is doing well.** Default supportive trainer tone (`../product.md` § 13 "Emotional safety").
- **Specific.** Point at the actual moment in the rep (frame, position, joint), not abstract «следи за техникой».
- **Honest about uncertainty.** If the angle / frame doesn't show the relevant detail — say so, ask for a different angle, don't fabricate.
- **No medical authority claims.** Health-related caution phrased as observation + suggestion, not diagnosis or prohibition (`../product.md` § 13 "Honesty").
- **Configurable persona is v2+.** MVP ships single supportive default (`../product.md` § 11, § 10).

### Example replies (demo content for tone calibration; not authored AI output)

**Good — specific + supportive:**

> Спина держится прямой на старте, это хорошо. На обратном движении штанга ушла вперёд от голеней — попробуй вести её ближе к ногам. Бёдра отводи назад чуть раньше, чем сгибаешь колени.

**Good — honest about limits:**

> С такого ракурса не видно стопы — сложно сказать, как ты распределяешь вес. Сними сбоку, и я посмотрю детально.

**Bad — generic + gamified:**

> ❌ Молодец, чемпион! Так держать! +10 XP к технике.

**Bad — humiliating + alarmist:**

> ❌ Так делать нельзя, ты травмируешь спину. Срочно прекрати.

## 4. Error / placeholder vocabulary

Canonical Russian phrasings for shared slots across mockups and screens. Each slot has exactly one canonical string. Variants are not provided. If a screen needs a different phrasing, it requires a new Decision Log entry, not an inline rewrite.

Slots marked **TBD** are filled in Phase 3 of `../exec-plans/active/EP-track-b-mockups.md` (open questions Q2 and Q4 of `../user-flows/upload-video-and-get-feedback.md` § 8); this file is updated in the same commit.

| Slot | Canonical string | Used in | Source / decided in |
|---|---|---|---|
| Empty-chat placeholder | «Загрузи видео с выполнением упражнения, и я проверю технику выполнения» | `mockups/chat-empty.html` (Phase 3) | `../user-flows/upload-video-and-get-feedback.md` § 3 step 3 |
| Empty-chat camera-angle hint | TBD (per-exercise: deadlift / biceps / lat pulldown) | `mockups/chat-empty.html` (Phase 3), second line under main placeholder | `../product-specs/exercises-base.md` § "Camera angle"; wording fixed Phase 3 Q2 of `EP-track-b-mockups.md` |
| AI thinking placeholder | «Анализирую твой подход…» | `mockups/chat-active.html` (Phase 3); active chat after video sent | `../product-specs/exercise-chat.md` § "AI is thinking" + `../user-flows/upload-video-and-get-feedback.md` § 3 step 5 |
| AI cannot analyze | «Не смог разобрать твой подход. Попробуй переснять видео и загрузить ещё раз» | active chat on AI failure (Phase 3 mockup branch) | `../user-flows/upload-video-and-get-feedback.md` § 4.1; confirmed Phase 3 Q3 of `EP-track-b-mockups.md` |
| Queue-busy hint (in another chat) | TBD | other-exercise chat while first analysis pending | `../user-flows/upload-video-and-get-feedback.md` § 4.3; wording fixed Phase 3 Q4 of `EP-track-b-mockups.md` |
| Upload network error (Phase 2 minimal) | «Не получилось загрузить, проверь интернет» | active chat on network failure during upload | `../user-flows/upload-video-and-get-feedback.md` § 5 |

Notes:

- All slots use the «ты» form per § 2.
- Strings in this table are the only allowed variants for these slots in mockups, copy reviews, and (later) i18n source files.

## 5. Anti-patterns

Forbidden across all UI strings (consolidates negative space from §§ 1–3):

- ❌ «вы», «ребята», «друзья», «команда».
- ❌ Gamification: «уровень», «опыт», «XP», «достижение», «стрик», «GG», «Pro Lifter», «прокачайся».
- ❌ Marketing slogans: «стань лучшей версией себя», «начни тренировку мечты».
- ❌ Bureaucratic phrasing: «осуществить загрузку», «произвести анализ».
- ❌ Fake urgency: «срочно», «немедленно», «прекрати», «успей сейчас».
- ❌ Confidence fabrication: AI never invents details it cannot see in the frame.
- ❌ Push-style copy inside in-app surfaces: «Не пропусти!», «Только сегодня!».
- ❌ Diagnostic / medical authority claims: «у тебя травма», «у тебя слабая спина».

## 6. Open items

- AI persona configuration UI (stricter / softer) — deferred to v2 (`../product.md` § 10 + § 11). The supportive baseline documented here remains the default regardless of future personas.
- Internationalization rollout (English / other) — out of MVP (`../product.md` § 9). § 1 row 7 above is preparation, not delivery.
- Phase 3 of `EP-track-b-mockups.md` will fill the two `TBD` rows in § 4. After that, this file moves from "approved with reserved slots" to "approved, complete" without a status change.
