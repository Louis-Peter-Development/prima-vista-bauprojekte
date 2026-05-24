import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type HeizmethodenType =
  | 'heizmethodenHeizkoerper'
  | 'heizmethodenHeizstraenge'
  | 'heizmethodenFussbodenheizung'
  | 'heizmethodenWaermepumpe'
  | 'heizmethodenGasHeizung'
  | 'heizmethodenPelletofen'
  | 'heizmethodenSaunaofen';

type VariantDefinition = {
  value: HeizmethodenType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'heizmethodenHeizkoerper', label: 'Heizkörper', detail: 'Montage & Material', num: '01' },
  { value: 'heizmethodenHeizstraenge', label: 'Heizstränge', detail: 'Aufputz / Unterputz', num: '02' },
  { value: 'heizmethodenFussbodenheizung', label: 'Fußbodenheizung', detail: 'Flächenheizung', num: '03' },
  { value: 'heizmethodenWaermepumpe', label: 'Wärmepumpe', detail: 'Luft-Wärmepumpe', num: '04' },
  { value: 'heizmethodenGasHeizung', label: 'Gas-Heizung', detail: 'Brennwerttechnik', num: '05' },
  { value: 'heizmethodenPelletofen', label: 'Pelletofen', detail: 'Pelletwärme', num: '06' },
  { value: 'heizmethodenSaunaofen', label: 'Saunaofen', detail: 'Sauna & Zubehör', num: '07' },
];

type Props = {
  activeType: HeizmethodenType;
  onTypeChange: (value: HeizmethodenType) => void;
};

export default function HeizmethodenBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: HeizmethodenType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Heizleistung</span>
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
