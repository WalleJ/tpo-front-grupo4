import type { AdminTab } from '@/types/admin.types';

interface AdminFiltersProps {
  activeTab: AdminTab;
}

export function AdminFilters({ activeTab }: AdminFiltersProps) {
  return (
    <div className="text-xs text-[#3b494b] font-semibold">
      Active module: {activeTab.toUpperCase()}
    </div>
  );
}