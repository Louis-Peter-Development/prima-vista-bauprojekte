import type { HTMLAttributes } from 'react';
import { useCounter, type CounterOptions } from '../hooks/useCounter';

type Props = CounterOptions & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export default function Counter({ target, decimals, prefix, suffix, duration, ...rest }: Props) {
  const [ref, text] = useCounter({ target, decimals, prefix, suffix, duration });
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} {...rest}>
      {text}
    </span>
  );
}
