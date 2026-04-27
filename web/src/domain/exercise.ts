/**
 * Доменный тип Exercise (упражнение).
 *
 * Это TS-зеркало серверной модели `backend/app/db/models/exercise.py`.
 * Сейчас обе стороны пустые: серверная — `class Exercise(SQLModel, table=True): pass`,
 * клиентская — пустой объект. Поля появятся в Phase 2 (thin slice).
 *
 * Пример (НЕ актуально сейчас, для иллюстрации формы):
 *   {
 *     id: 'squat',
 *     name: 'Приседания',
 *     videoUrl: 'https://…',
 *   }
 */
export type Exercise = Record<string, never>;
