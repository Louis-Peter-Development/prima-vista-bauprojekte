import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type WasserType =
  | 'wasserAlles'
  | 'wasserBadezimmer'
  | 'wasserGaesteWc'
  | 'wasserKueche'
  | 'wasserWaschmaschine'
  | 'wasserKeller'
  | 'wasserGarten'
  | 'wasserSpuelkasten'
  | 'wasserHauptstrang';

type VariantDefinition = {
  value: WasserType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'wasserAlles', label: 'Alles zu Wasser', detail: 'Alle Varianten', num: '01' },
  { value: 'wasserBadezimmer', label: 'Badezimmer', detail: 'Wasserinstallation', num: '02' },
  { value: 'wasserGaesteWc', label: 'Gäste-WC', detail: 'Wasserinstallation', num: '03' },
  { value: 'wasserKueche', label: 'Küche', detail: 'Wasserinstallation', num: '04' },
  { value: 'wasserWaschmaschine', label: 'Waschmaschine', detail: 'Anschluss', num: '05' },
  { value: 'wasserKeller', label: 'Keller', detail: 'Wasserinstallation', num: '06' },
  { value: 'wasserGarten', label: 'Garten', detail: 'Wasserinstallation', num: '07' },
  { value: 'wasserSpuelkasten', label: 'Spülkasten', detail: 'Austausch', num: '08' },
  { value: 'wasserHauptstrang', label: 'Hauptstrang', detail: 'Leitung', num: '09' },
];

type Props = {
  activeType: WasserType;
  onTypeChange: (value: WasserType) => void;
};

export default function WasserBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: WasserType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Sanitärleistung</span>
          <span className="kalk-board__hint">Wählen Sie den gewünschten Kalkulator</span>
        </div>
        <div className="haus-types" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {TYPES.map((type) => (
            <button
              key={type.num}
              type="button"
              className={`haus-types__opt${type.value === activeType ? ' is-on' : ''}`}
              onClick={() => chooseType(type.value)}
              aria-pressed={type.value === activeType}
              style={{ flex: '1 1 calc(33.333% - 12px)', minWidth: '180px' }}
            >
              <span className="haus-types__label">{type.label}</span>
              <span className="haus-types__detail" style={{ fontSize: '13px', lineHeight: '1.4' }}>{type.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
