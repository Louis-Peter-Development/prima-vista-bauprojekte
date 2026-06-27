import { useTranslation } from 'react-i18next';
import type { KategorieDef } from '../../data/kalkulatorNav';

type Props = {
  category: KategorieDef;
  selected: string | null;
  onSelect: (key: string) => void;
};

export default function KalkLeafPicker({ category, selected, onSelect }: Props) {
  const { t } = useTranslation('kalk');
  const categoryLabel = t(`categories.${category.key}.label`);
  return (
    <div className="kalk-leaves">
      <div className="kalk-leaves__head">
        <span className="kalk-leaves__num">02</span>
        <span className="kalk-leaves__label">{categoryLabel}</span>
        <span className="kalk-leaves__hint">{t('picker.leafHint')}</span>
      </div>
      <ul className="kalk-leaves__grid" role="radiogroup" aria-label={categoryLabel}>
        {category.leaves.map((leaf, i) => {
          const on = leaf.key === selected;
          const num = String(i + 1).padStart(2, '0');
          const lead = t(`leaves.${category.key}.${leaf.key}.lead`, { defaultValue: '' });
          return (
            <li key={leaf.key} className={`kalk-leaves__item${on ? ' is-on' : ''}`}>
              <button
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => onSelect(leaf.key)}
              >
                <span className="kalk-leaves__item-num">{num}</span>
                <span className="kalk-leaves__item-body">
                  <span className="kalk-leaves__item-name">{t(`leaves.${category.key}.${leaf.key}.label`)}</span>
                  {lead && <span className="kalk-leaves__item-lead">{lead}</span>}
                </span>
                <span className="kalk-leaves__item-arrow" aria-hidden="true">{on ? '✓' : '›'}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
