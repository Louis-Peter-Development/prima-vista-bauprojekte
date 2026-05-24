import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type RohbauType =
  | 'rohbauAlles'
  | 'rohbauAbbruch'
  | 'rohbauEstrich'
  | 'rohbauStahltraeger'
  | 'rohbauVerputzen'
  | 'rohbauLichtschaechte'
  | 'rohbauSchornstein'
  | 'rohbauMauerwerk'
  | 'rohbauPflastern';

type VariantDefinition = {
  value: RohbauType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'rohbauAlles', label: 'Alles zu Rohbau', detail: 'Alle Varianten', num: '01' },
  { value: 'rohbauAbbruch', label: 'Abbruch', detail: 'Leistungen', num: '02' },
  { value: 'rohbauEstrich', label: 'Estrich', detail: 'Verlegung', num: '03' },
  { value: 'rohbauStahltraeger', label: 'Stahlträger', detail: 'Einbau', num: '04' },
  { value: 'rohbauVerputzen', label: 'Verputzen', detail: 'Wände', num: '05' },
  { value: 'rohbauLichtschaechte', label: 'Lichtschächte', detail: 'Montage', num: '06' },
  { value: 'rohbauSchornstein', label: 'Schornstein', detail: 'Bau', num: '07' },
  { value: 'rohbauMauerwerk', label: 'Mauerwerk', detail: 'Herstellen', num: '08' },
  { value: 'rohbauPflastern', label: 'Pflastern', detail: 'Außenbereich', num: '09' },
];

type Props = {
  activeType: RohbauType;
  onTypeChange: (value: RohbauType) => void;
};

export default function RohbauBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: RohbauType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Rohbauleistung</span>
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
