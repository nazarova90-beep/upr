import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

export default function Chat() {
  const { t } = useTranslation();
  const { exerciseId } = useParams<{ exerciseId: string }>();

  if (!exerciseId) {
    return (
      <section>
        <h1>{t('chat.title')}</h1>
        <p>Упражнение не указано.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>{t('chat.title')}</h1>
      <p>Упражнение: {exerciseId}</p>
      <p>Чат появится в Phase 2 (thin slice).</p>
    </section>
  );
}
