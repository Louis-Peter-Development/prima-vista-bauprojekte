import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type GartenType =
  | 'gartenAlles'
  | 'gartenBeleuchtung'
  | 'gartenBlockstufen'
  | 'gartenCarport'
  | 'gartenHochbeete'
  | 'gartenGartenhaus'
  | 'gartenGartenmauern'
  | 'gartenGeraetehaus'
  | 'gartenPavillon'
  | 'gartenTerrassenHolz'
  | 'gartenTerrassenStein'
  | 'gartenUeberdachung'
  | 'gartenWintergarten'
  | 'gartenZaunanlagen'
  | 'gartenWasserwirtschaft';

type VariantDefinition = {
  value: GartenType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'gartenAlles', label: 'Alles zu Garten', detail: 'Alle Varianten', num: '01' },
  { value: 'gartenBeleuchtung', label: 'Beleuchtung', detail: 'Außenbereich', num: '02' },
  { value: 'gartenBlockstufen', label: 'Blockstufen', detail: 'Außenbereich', num: '03' },
  { value: 'gartenCarport', label: 'Carport', detail: 'Montage', num: '04' },
  { value: 'gartenHochbeete', label: 'Hochbeete', detail: 'Garten', num: '05' },
  { value: 'gartenGartenhaus', label: 'Gartenhaus', detail: 'Montage', num: '06' },
  { value: 'gartenGartenmauern', label: 'Gartenmauern', detail: 'Mauerwerk', num: '07' },
  { value: 'gartenGeraetehaus', label: 'Gerätehaus', detail: 'Montage', num: '08' },
  { value: 'gartenPavillon', label: 'Pavillon', detail: 'Montage', num: '09' },
  { value: 'gartenTerrassenHolz', label: 'Terrasse Holz', detail: 'Belag', num: '10' },
  { value: 'gartenTerrassenStein', label: 'Terrasse Stein', detail: 'Belag', num: '11' },
  { value: 'gartenUeberdachung', label: 'Überdachung', detail: 'Terrasse', num: '12' },
  { value: 'gartenWintergarten', label: 'Wintergarten', detail: 'Montage', num: '13' },
  { value: 'gartenZaunanlagen', label: 'Zaunanlagen', detail: 'Außenbereich', num: '14' },
  { value: 'gartenWasserwirtschaft', label: 'Wasserwirtschaft', detail: 'Anschlüsse', num: '15' },
];

type Props = {
  activeType: GartenType;
  onTypeChange: (value: GartenType) => void;
};

export default function GartenBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: GartenType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Außenleistung</span>
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
