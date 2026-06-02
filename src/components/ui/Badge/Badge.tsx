import type { PropsWithChildren } from 'react';

export function Badge({ children }: PropsWithChildren) {
  return <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-bold">{children}</span>;
}