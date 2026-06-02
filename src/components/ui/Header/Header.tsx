import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  icon?: ReactNode;
  rightSlot?: ReactNode;
}

export function Header({ title, icon, rightSlot }: Readonly<HeaderProps>) {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-xl font-bold tracking-tight text-primary">{title}</h1>
        </div>
        {rightSlot}
      </div>
    </header>
  );
}