import { KATEGORIEN, type KategorieKey } from '../../data/kalkulatorNav';

type Props = {
  selected: KategorieKey | null;
  onSelect: (key: KategorieKey) => void;
};

export default function KalkCategoryPicker({ selected, onSelect }: Props) {
  return (
    <div className="kalk-cat">
      <div className="kalk-cat__head">
        <span className="kalk-cat__num">01</span>
        <span className="kalk-cat__label">Kategorie</span>
        <span className="kalk-cat__hint">Wählen Sie den Bereich, der zu Ihrem Vorhaben passt</span>
      </div>
      <div className="kalk-cat__grid" role="radiogroup" aria-label="Kategorie">
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
              <span className="kalk-cat__opt-label">{cat.label}</span>
              <span className="kalk-cat__opt-desc">{cat.description}</span>
              <span className="kalk-cat__opt-count">{cat.leaves.length} Optionen</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
