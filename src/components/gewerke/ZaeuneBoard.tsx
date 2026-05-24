import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type ZaeuneType =
  | 'zaeuneAluminium'
  | 'zaeuneHolz'
  | 'zaeuneGlas'
  | 'zaeuneMetall'
  | 'zaeuneDoppelstab'
  | 'zaeuneGabionen'
  | 'zaeuneSichtschutz'
  | 'zaeuneMaschendraht'
  | 'zaeuneSteck'
  | 'zaeuneVorgarten'
  | 'zaeuneSichtschutzstreifen';

type VariantDefinition = {
  value: ZaeuneType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'zaeuneAluminium', label: 'Aluminiumzaun', detail: 'Montage', num: '01' },
  { value: 'zaeuneHolz', label: 'Holzzaun', detail: 'Montage', num: '02' },
  { value: 'zaeuneGlas', label: 'Glaszaun', detail: 'Montage', num: '03' },
  { value: 'zaeuneMetall', label: 'Metallzaun', detail: 'Montage', num: '04' },
  { value: 'zaeuneDoppelstab', label: 'Doppelstabmatten', detail: 'Montage', num: '05' },
  { value: 'zaeuneGabionen', label: 'Gabionenzaun', detail: 'Montage', num: '06' },
  { value: 'zaeuneSichtschutz', label: 'Sichtschutzzaun', detail: 'Montage', num: '07' },
  { value: 'zaeuneMaschendraht', label: 'Maschendrahtzaun', detail: 'Montage', num: '08' },
  { value: 'zaeuneSteck', label: 'Steckzaun', detail: 'Montage', num: '09' },
  { value: 'zaeuneVorgarten', label: 'Vorgartenzaun', detail: 'Montage', num: '10' },
  { value: 'zaeuneSichtschutzstreifen', label: 'Sichtschutzstreifen', detail: 'Montage', num: '11' },
];

type Props = {
  activeType: ZaeuneType;
  onTypeChange: (value: ZaeuneType) => void;
};

export default function ZaeuneBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: ZaeuneType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Zaunleistung</span>
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
