import type { KategorieDef } from '../../data/kalkulatorNav';

type Props = {
  category: KategorieDef;
  selected: string | null;
  onSelect: (key: string) => void;
};

export default function KalkLeafPicker({ category, selected, onSelect }: Props) {
  return (
    <div className="kalk-leaves">
      <div className="kalk-leaves__head">
        <span className="kalk-leaves__num">02</span>
        <span className="kalk-leaves__label">{category.label}</span>
        <span className="kalk-leaves__hint">Detail-Rechner auswählen</span>
      </div>
      <ul className="kalk-leaves__grid" role="radiogroup" aria-label={category.label}>
        {category.leaves.map((leaf, i) => {
          const on = leaf.key === selected;
          const num = String(i + 1).padStart(2, '0');
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
                  <span className="kalk-leaves__item-name">{leaf.label}</span>
                  {leaf.lead && <span className="kalk-leaves__item-lead">{leaf.lead}</span>}
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
