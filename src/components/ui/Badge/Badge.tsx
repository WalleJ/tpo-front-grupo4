import type { PropsWithChildren } from 'react';

export function Badge({ children }: PropsWithChildren) {
  return <span className="text-xs px-3 py-1 rounded-full bg-[#00f0ff33] text-[#006970] font-bold">{children}</span>;
}