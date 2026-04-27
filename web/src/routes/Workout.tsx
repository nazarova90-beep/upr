import { useTranslation } from 'react-i18next';

export default function Workout() {
  const { t } = useTranslation();
  return (
    <section>
      <h1>{t('workout.title')}</h1>
      <p>Список упражнений появится в Phase 2 (thin slice).</p>
    </section>
  );
}
