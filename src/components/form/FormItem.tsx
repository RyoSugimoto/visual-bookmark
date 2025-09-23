import type { PropsWithChildren } from 'react';

type FormItemProps = PropsWithChildren<{
  className?: string;
}>;

export default function FormItem({ children, className }: FormItemProps) {
  return <div className={`grid gap-2 ${className}`}>{children}</div>;
}
