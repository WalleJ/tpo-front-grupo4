import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/helpers';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-on-primary',
    secondary: 'border border-[#b9cacb] hover:bg-[#e5e2e3]',
    danger: 'bg-[#8d2f39] text-white'
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