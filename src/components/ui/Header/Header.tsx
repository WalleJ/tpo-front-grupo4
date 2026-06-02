import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  icon?: ReactNode;
  rightSlot?: ReactNode;
}

export function Header({ title, icon, rightSlot }: Readonly<HeaderProps>) {
  return (
    <header className="sticky top-0 z-40 bg-[#fcf8f9cc] backdrop-blur-xl border-b border-[#b9cacb66]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-xl font-bold tracking-tight text-[#006970]">{title}</h1>
        </div>
        {rightSlot}
      </div>
    </header>
  );
}