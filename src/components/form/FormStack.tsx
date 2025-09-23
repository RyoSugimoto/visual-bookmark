import type { PropsWithChildren } from 'react';

type FormStackProps = PropsWithChildren<{
  className?: string;
}>;

export default function FormStack({ children, className }: FormStackProps) {
  return <div className={`grid gap-4 ${className}`}>{children}</div>;
}
