import type { PropsWithChildren } from 'react';
import { cn } from '@/utils/helpers';

interface CardProps extends PropsWithChildren {
  className?: string;
}

export function Card({ className, children }: CardProps) {
  return <article className={cn('glass-panel rounded-xl p-5', className)}>{children}</article>;
}