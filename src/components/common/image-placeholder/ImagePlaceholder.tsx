import type { PropsWithChildren } from 'react';

type Color = 'default';

type ImagePlaceholderProps = PropsWithChildren<{
  color?: Color;
}>;

export default function ImagePlaceholder({
  children,
  color = 'default',
}: ImagePlaceholderProps) {
  return (
    <span className="text-white bg-black aspect-square w-full grid place-items-center-safe p-4">
      {children}
    </span>
  );
}
