---
status: in-progress
last_updated: 2026-04-27
owner: Кристина
related: ../product.md, exercise-chat.md, workout.md, ../exec-plans/active/roadmap.md, ../exec-plans/active/mvp-product-spec.md
---

# Exercise base

Set of strength exercises for which the app supports per-exercise video review. Each base entry → one per-exercise chat.

Two passes:

1. **Single-scenario MVP** (`roadmap.md` Phase 1) — 3 exercises hardcoded; no add / edit / delete.
2. **Full MVP** (`roadmap.md` Phase 4) — base grows to 20 exercises; admin tool for population.

---

## MVP: 3 starting exercises (Single-scenario MVP)

Hardcoded for first launch, in this order:

| # | id | name | Primary muscle | Camera angle |
|---|---|---|---|---|
| 1 | `romanian_deadlift` | **Румынская тяга со штангой** | hamstrings, glutes, lower back (pull, lower) | strict side |
| 2 | `dumbbell_biceps_curl` | **Подъём гантелей на бицепс** (classic grip, palms up entire range) | biceps, brachialis (isolation, arm) | side |
| 3 | `lat_pulldown_to_chest` | **Вертикальная тяга блока к груди** | lats, biceps secondary (pull, upper) | front or 3⁄4 (side blocked by torso/arms) |

### Technique text (`technique` field)

Final approved strings. Stored in DB (Track C) and used as AI context during analysis (Phase 2).

#### 1. `romanian_deadlift`

> Стой со штангой в опущенных руках, ноги на ширине таза, колени слегка согнуты. На вдохе медленно отводи таз назад и наклоняйся вперёд с прямой спиной — штанга едет вдоль ног. Опускайся, пока не почувствуешь сильное натяжение задней поверхности бедра (обычно штанга оказывается чуть ниже колен). На выдохе плавно вернись в исходное за счёт усилия ягодиц и бицепса бедра, а не за счёт спины. Вес берётся работой таза, а не сгибанием поясницы.

#### 2. `dumbbell_biceps_curl`

> Стой прямо, гантели в опущенных руках, ладони смотрят вверх. Локти прижаты к корпусу и **остаются неподвижными** на протяжении всего движения. На выдохе сгибай руки в локтях, поднимая гантели к плечам — двигаются только предплечья. В верхней точке коротко задержись и почувствуй сокращение бицепса. На вдохе медленно опусти гантели в исходное положение, контролируя движение, не «бросая». Корпус не раскачивается — если приходится помогать корпусом, вес слишком большой.

#### 3. `lat_pulldown_to_chest`

> Сядь в тренажёр, бёдра под валиками, возьмись за рукоять прямым широким хватом (шире плеч). Слегка отклонись назад (примерно 10-15 градусов), грудь подай вперёд, плечи опусти и отведи назад. На выдохе тяни рукоять к верху груди, сводя лопатки и ведя локти строго вниз — не за счёт сгибания рук, а за счёт работы спины. В нижней точке коснись рукоятью верха груди и почувствуй сокращение широчайших. На вдохе плавно отпусти вес обратно, сохраняя контроль и не давая плечам подняться к ушам.

### Why these three

Owner's deliberate selection (not "balanced for everyone"):

- All three — familiar movements for typical gym setup (barbell, dumbbells, lat-pulldown machine).
- Owner's "pull day" set — testing on familiar material makes wrong AI output easier to spot.
- All three suit video analysis: full body in frame, technique errors have visual signatures (path, angle, posture), Gemini-class models know them.

### Known limitations of this trio (Track B + Phase 2 inputs)

1. **All three are pulls.** No push movements (chest / shoulders / triceps) in Single-scenario MVP. Implication: any demo / marketing material reads as "pull-day tool", not universal AI coach. Acceptable for first hypothesis check; Full MVP (Phase 4) requires honest pull/push balance in 20-exercise base.
2. **Biceps used in 2 of 3** (isolated in #2, secondary in #3). Implication: when testing AI exercise recognition, verify it does **not** confuse biceps curl with lat pulldown based on biceps activation.
3. **Lat pulldown not filmable strictly from side** — user sits facing machine, bar comes from above, torso and arms occlude each other. Implication: "shoot from side" hint applies to two exercises only; lat pulldown needs separate "front or 3⁄4" guidance. Reflect in Track B mockups (per-exercise upload-screen hint) and Phase 2 AI system prompt (lat pulldown — different expected angle).

### Per-exercise fields (MVP)

Minimum needed to render a card and feed AI. Everything else (common mistakes, images, video reference, structured muscle groups, equipment, difficulty) → Full MVP / Phase 4.

| Field | Type | Content | Purpose |
|---|---|---|---|
| `id` | string / number | Technical identifier (e.g. `romanian_deadlift`) | Linking from workout table and chat to specific exercise |
| `name` | short string | User-visible name: "Румынская тяга", "Подъём на бицепс", "Вертикальная тяга блока к груди" | Workout-card label, chat header |
| `technique` | paragraph, 3–5 lines | Plain-language correct technique: starting position, key movement points, attention focus | (1) shown to user on exercise card / chat header (Track B decides exact placement); (2) sent to AI as "use this as the reference for video analysis" |

No `common_mistakes`, `image`, `muscle_group`, `equipment` in Single-scenario MVP. Reasons:
- Minimal `Exercise` table (Track C).
- Minimal exercise card mockup (Track B).
- AI gets prose context, no specially-constructed prompt around field structure.

Common-mistakes question: AI finds and describes them in the chat reply itself. Storing a reference list duplicates AI work; reconsider in Phase 4 (e.g. for analytics on most-frequent errors).

### Source of technique text

Owner-authored. Pattern: AI agent drafts 3–5 lines → owner edits to her voice.

- Legally clean: own text, no licensing.
- Fast and free.
- Stylistically consistent with app tone (`docs/ui/voice-and-tone.md` — Track B).
- Sufficient for Single-scenario MVP (validates AI on video, not knowledge-base quality). Professional source / consulting trainer — Phase 4 with 20-exercise base going to external users.

### Population

- DB seed (Phase 1 / Track C) creates three rows in `Exercise`.
- Hardcoded workout (`workout.md`) links to those three.
- No UI for add / edit / delete exercises in Single-scenario MVP.

---

## Full MVP: 20-exercise base (Phase 4)

Stub. To finalize when Single-scenario MVP works.

### To define

- Final list of 20 with honest pull / push / legs / core balance.
- Per-exercise fields: name, technique, target muscle groups, equipment, video reference, common mistakes.
- Source of technique text (in-house / licensed / consulting trainer).
- Categorization (muscle group, equipment, difficulty).
- User-built workouts from this base.
- Minimal admin tool (SQLAdmin) for base population.

### Open questions

- Final 20 exercises.
- Source of technique descriptions.
- Need for video references and source (in-house / stock / partnership).

Decisions deferred to Phase 4.

---

## Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-04-19 | Fixed 3 Single-scenario MVP exercises: Romanian deadlift, dumbbell biceps curl (classic grip), lat pulldown. Known trio limitations (all pulls, biceps × 2, different angles) accepted and recorded. | Chat, Phase 1 / Track A, step 1. |
| 2026-04-19 | Per-exercise fields in Single-scenario MVP minimized to `id`, `name`, `technique` (3–5 lines). No common mistakes, image, muscle group, equipment. Moves to Phase 4. | Chat, Phase 1 / Track A, step 2. |
| 2026-04-19 | Source of technique text for 3 MVP exercises: owner-authored (agent drafts → owner edits). Licensing + consulting trainer deferred to Phase 4. | Chat, Phase 1 / Track A, step 2. |
| 2026-04-19 | Final `technique` text approved for 3 MVP exercises. Used both as user-visible description and AI analysis context. | Chat, Phase 1 / Track A, step 3. |
