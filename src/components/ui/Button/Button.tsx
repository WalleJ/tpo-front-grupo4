import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/helpers';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, children, ...props }: Readonly<ButtonProps>) {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-on-primary hover:opacity-90',
    secondary: 'border border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:bg-surface-container',
    danger: 'bg-error text-on-error hover:opacity-90'
  };

  return (
    <button
      className={cn('px-4 py-2 rounded-lg transition-colors text-xs font-semibold', variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}