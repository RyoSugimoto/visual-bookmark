import Link from 'next/link';
import type { PropsWithChildren } from 'react';

type MainNavItemProps = PropsWithChildren<{
  href: string;
  className?: string;
  attributes?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}>;

export default function MainNavItem({
  children,
  href,
  className,
  attributes,
}: MainNavItemProps) {
  return (
    <Link
      href={href}
      {...attributes}
      className={`px-2 py-2 flex items-center justify-center gap-1 leading-none relative  after:absolute after:w-full after:h-1 after:left-0 after:right-0 after:top-full after:bg-current after:opacity-0 hover:after:opacity-100 focus-within:after:opacity-100 after:transition-opacity ${className}`}
    >
      {children}
    </Link>
  );
}
