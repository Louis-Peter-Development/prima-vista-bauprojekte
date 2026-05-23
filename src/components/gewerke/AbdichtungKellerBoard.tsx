import { ABDICHTUNG_PACKAGES } from '../../data/abdichtungPakete';
import { scrollToCalculatorResult } from '../../utils/scrollToCalculatorResult';

export type AbdichtungType = 'abdichtungHorizontal' | 'abdichtungPerimeter' | 'abdichtungKeller' | 'abdichtung';

const TYPE_MAPPING: Record<AbdichtungType, string> = {
  abdichtungHorizontal: '01',
  abdichtungPerimeter: '02',
  abdichtungKeller: '03',
  abdichtung: '04',
};

const ID_MAPPING: Record<string, AbdichtungType> = {
  '01': 'abdichtungHorizontal',
  '02': 'abdichtungPerimeter',
  '03': 'abdichtungKeller',
  '04': 'abdichtung',
};

type Props = {
  activeType: AbdichtungType;
  onTypeChange: (value: AbdichtungType) => void;
};

export default function AbdichtungKellerBoard({
  activeType,
  onTypeChange,
}: Props) {
  const activeId = TYPE_MAPPING[activeType];

  function chooseType(value: AbdichtungType) {
    onTypeChange(value);
    scrollToCalculatorResult();
  }

  return (
    <div className="kalk-board">
      <div className="kalk-board__field reveal">
        <div className="kalk-board__field-head">
          <span className="kalk-board__num">01</span>
          <span className="kalk-board__label">Abdichtungssystem</span>
          <span className="kalk-board__hint">Wählen Sie Ihre Abdichtungsart</span>
        </div>
        <div className="haus-types">
          {ABDICHTUNG_PACKAGES.map((t) => (
            <button
              key={t.num}
              type="button"
              className={`haus-types__opt${t.num === activeId ? ' is-on' : ''}`}
              onClick={() => chooseType(ID_MAPPING[t.num]!)}
              aria-pressed={t.num === activeId}
            >
              <span className="haus-types__label">{t.eyebrow.replace('Abdichtung · ', '')}</span>
              <span className="haus-types__detail" style={{ fontSize: '13px', lineHeight: '1.4' }}>{t.lede.substring(0, 70)}...</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
