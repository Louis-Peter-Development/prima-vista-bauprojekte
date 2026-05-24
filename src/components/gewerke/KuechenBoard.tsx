import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type KuechenType =
  | 'kuecheAlles'
  | 'kuecheKomplettkueche'
  | 'kuecheSingleMinikuechen'
  | 'kuecheBuerokueche'
  | 'kuecheEinbaukueche'
  | 'kuecheKuechenzeile'
  | 'kuecheArbeitsplatteSpuele'
  | 'kuecheDunstabzugshaube'
  | 'kuecheBodenDecken'
  | 'kuecheElektroBeleuchtung'
  | 'kuecheWasserinstallation';

type VariantDefinition = {
  value: KuechenType;
  label: string;
  detail: string;
  num: string;
};

const TYPES: VariantDefinition[] = [
  { value: 'kuecheAlles', label: 'Alles zu Küchen', detail: 'Alle Varianten', num: '01' },
  { value: 'kuecheKomplettkueche', label: 'Komplettküche', detail: 'Montage', num: '02' },
  { value: 'kuecheSingleMinikuechen', label: 'Single-/Miniküche', detail: 'Montage', num: '03' },
  { value: 'kuecheBuerokueche', label: 'Büroküche', detail: 'Montage', num: '04' },
  { value: 'kuecheEinbaukueche', label: 'Einbauküche', detail: 'Montage', num: '05' },
  { value: 'kuecheKuechenzeile', label: 'Küchenzeile', detail: 'Montage', num: '06' },
  { value: 'kuecheArbeitsplatteSpuele', label: 'Arbeitsplatte & Spüle', detail: 'Zusatzleistung', num: '07' },
  { value: 'kuecheDunstabzugshaube', label: 'Dunstabzugshaube', detail: 'Montage', num: '08' },
  { value: 'kuecheBodenDecken', label: 'Boden & Decken', detail: 'Küche', num: '09' },
  { value: 'kuecheElektroBeleuchtung', label: 'Elektro & Beleuchtung', detail: 'Küche', num: '10' },
  { value: 'kuecheWasserinstallation', label: 'Wasserinstallation', detail: 'Küche', num: '11' },
];

type Props = {
  activeType: KuechenType;
  onTypeChange: (value: KuechenType) => void;
};

export default function KuechenBoard({
  activeType,
  onTypeChange,
}: Props) {
  function chooseType(value: KuechenType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Küchenleistung</span>
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
