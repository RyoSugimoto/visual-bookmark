import type { PropsWithChildren } from 'react';

type Direction = 'vertical' | 'horizontal';
type GapSize = 'none' | 'sm' | 'default' | 'md' | 'lg';

type CardListItemProps = PropsWithChildren<{
  className?: string;
  direction?: Direction;
  gap?: GapSize;
}>;

const directions: Record<Direction, string> = {
  vertical: 'grid-flow-row',
  horizontal: 'grid-flow-col',
} as const;

const gaps: Record<GapSize, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  default: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
} as const;

export default function CardListItem({
  children,
  className,
  gap = 'none',
  direction = 'vertical',
}: CardListItemProps) {
  return (
    <div
      className={`content-start grid items-start ${gaps[gap]} ${directions[direction]} ${className}`}
    >
      {children}
    </div>
  );
}
