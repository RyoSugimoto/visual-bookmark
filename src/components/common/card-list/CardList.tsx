import type { PropsWithChildren } from 'react';

type GapSize = 'none' | 'sm' | 'default' | 'md' | 'lg';

type CardListProps = PropsWithChildren<{
  className?: string;
  gapX?: GapSize;
  gapY?: GapSize;
}>;

const gapsX: Record<GapSize, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  default: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
} as const;

const gapsY: Record<GapSize, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  default: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
} as const;

export default function CardList({
  children,
  className,
  gapX = 'default',
  gapY = 'default',
}: CardListProps) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 items-stretch ${gapsX[gapX]} ${gapsY[gapY]} ${className}`}
    >
      {children}
    </div>
  );
}
