import { Circle } from 'lucide-react';
import type { PropsWithChildren } from 'react';

type FormSectionHeadingProps = PropsWithChildren<{
  className?: string;
}>;

export default function FormSectionHeading({
  children,
  className,
}: FormSectionHeadingProps) {
  return (
    <h3 className={`font-bold flex gap-2 items-center ${className}`}>
      <span className="text-primary">
        <Circle size="1em" strokeWidth={4} />
      </span>
      {children}
    </h3>
  );
}
