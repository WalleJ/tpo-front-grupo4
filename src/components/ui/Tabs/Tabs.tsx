import { cn } from '@/utils/helpers';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex-1 px-3 py-2 rounded-lg text-xs font-bold border border-[#b9cacb66]',
              active ? 'bg-[#006970] text-white' : 'bg-white/70'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}