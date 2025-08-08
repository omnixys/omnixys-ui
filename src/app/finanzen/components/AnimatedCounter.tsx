'use client';
import CountUp from 'react-countup';

export interface AnimatedCounterProps {
  amount: number;
}

export default function AnimatedCounter({ amount }: AnimatedCounterProps) {
  return (
    <CountUp duration={2} decimals={2} end={amount} decimal="," prefix="$" />
  );
}
