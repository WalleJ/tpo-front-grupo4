import { Link } from 'react-router-dom';
import type { AdminStatCard as AdminStatCardType } from '@/types/admin.types';

export function AdminStatCard({ label, value, tab }: AdminStatCardType) {
  return (
    <Link to={`/admin/listings?tab=${tab}`} className="glass-panel rounded-xl p-5 border border-transparent hover:border-primary/40 transition-all group">
      <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">{label}</p>
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs mt-2 text-on-surface-variant group-hover:text-primary">View list</p>
    </Link>
  );
}