import { Link } from 'react-router-dom';
import type { AdminStatCard as AdminStatCardType } from '@/types/admin.types';

export function AdminStatCard({ label, value, tab }: AdminStatCardType) {
  return (
    <Link to={`/admin/listings?tab=${tab}`} className="glass-panel rounded-xl p-5 hover:border-[#00697066] transition-all group">
      <p className="text-xs uppercase tracking-widest text-[#6a7a7b] mb-1">{label}</p>
      <p className="text-3xl font-bold text-[#006970]">{value}</p>
      <p className="text-xs mt-2 text-[#3b494b] group-hover:text-[#006970]">View list</p>
    </Link>
  );
}