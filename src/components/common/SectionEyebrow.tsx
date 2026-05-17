import type { ReactNode } from 'react';

type SectionEyebrowProps = {
  children: ReactNode;
  onDark?: boolean;
};

export default function SectionEyebrow({ children, onDark = false }: SectionEyebrowProps) {
  return (
    <div className={`eyebrow${onDark ? ' eyebrow--on-dark' : ''}`}>
      <span className="rule-red"></span>&nbsp;&nbsp;{children}
    </div>
  );
}
