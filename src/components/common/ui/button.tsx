import type * as React from 'react';
import { Button as ShadcnButton } from '@/components/lib/shadcn/ui/button';

type ButtonProps = React.ComponentProps<typeof ShadcnButton>;

const VARIANTS: Record<ButtonProps['variant'], string> = {
  secondary: '',
  default: '',
  outline: '',
  destructive:
    'dark:text-destructive-foreground dark:hover:text-destructive-foreground dark:bg-input/10 dark:border dark:border-current dark:hover:bg-input/20',
  ghost: '',
  link: '',
};

/**
 * * shadcn/uiのスタイルをカスタマイズしたコンポーネント
 */
export default function Button({ children, ...props }: ButtonProps) {
  const styleKey = props.variant;

  return (
    <ShadcnButton {...props} className={`${VARIANTS[styleKey]}`}>
      {children}
    </ShadcnButton>
  );
}
