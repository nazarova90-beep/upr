/**
 * Доменные типы для чата с упражнением.
 *
 * Это TS-зеркало серверных моделей `backend/app/db/models/exercise_chat.py`
 * и `backend/app/db/models/chat_message.py`. Поля появятся в Phase 2.
 *
 * Пример формы (НЕ актуально сейчас):
 *   ExerciseChat = { id, exerciseId, createdAt }
 *   ChatMessage  = { id, chatId, role: 'user' | 'assistant', content, createdAt }
 */
export type ExerciseChat = Record<string, never>;
export type ChatMessage = Record<string, never>;
