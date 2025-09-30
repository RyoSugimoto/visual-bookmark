import type { PropsWithChildren } from 'react';

type GapSize = 'none' | 'xs' | 'sm' | 'default' | 'md' | 'lg';

type CardListProps = PropsWithChildren<{
  className?: string;
  gapX?: GapSize;
  gapY?: GapSize;
}>;

const gapsX: Record<GapSize, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  default: 'gap-x-4',
  md: 'gap-x-6',
  lg: 'gap-x-8',
} as const;

const gapsY: Record<GapSize, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  default: 'gap-y-4',
  md: 'gap-y-6',
  lg: 'gap-y-8',
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
