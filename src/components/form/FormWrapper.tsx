import type { PropsWithChildren } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/card';

type FormWrapperProps = PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
}>;

export default function FromWrapper({
  children,
  title,
  description,
  className,
}: FormWrapperProps) {
  return (
    <Card className={`max-w-screen-sm mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
