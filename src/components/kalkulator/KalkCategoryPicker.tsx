import { useTranslation } from 'react-i18next';
import { KATEGORIEN, type KategorieKey } from '../../data/kalkulatorNav';

type Props = {
  selected: KategorieKey | null;
  onSelect: (key: KategorieKey) => void;
};

export default function KalkCategoryPicker({ selected, onSelect }: Props) {
  const { t } = useTranslation('kalk');
  return (
    <div className="kalk-cat">
      <div className="kalk-cat__head">
        <span className="kalk-cat__num">01</span>
        <span className="kalk-cat__label">{t('picker.categoryLabel')}</span>
        <span className="kalk-cat__hint">{t('picker.categoryHint')}</span>
      </div>
      <div className="kalk-cat__grid" role="radiogroup" aria-label={t('picker.categoryLabel')}>
        {KATEGORIEN.map((cat) => {
          const on = cat.key === selected;
          return (
            <button
              key={cat.key}
              type="button"
              role="radio"
              aria-checked={on}
              className={`kalk-cat__opt${on ? ' is-on' : ''}`}
              onClick={() => onSelect(cat.key)}
            >
              <span className="kalk-cat__opt-num">{cat.num}</span>
              <span className="kalk-cat__opt-label">{t(`categories.${cat.key}.label`)}</span>
              <span className="kalk-cat__opt-desc">{t(`categories.${cat.key}.description`)}</span>
              <span className="kalk-cat__opt-count">{t('picker.optionCount', { count: cat.leaves.length })}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
