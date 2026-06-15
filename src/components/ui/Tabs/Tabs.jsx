import { cn } from "@/utils/helpers";
function Tabs({ tabs, activeTab, onChange }) {
  return <div className="flex flex-wrap gap-2">{tabs.map((tab) => {
    const active = tab.id === activeTab;
    return <button
      key={tab.id}
      onClick={() => onChange(tab.id)}
      className={cn(
        "flex-1 px-3 py-2 rounded-lg text-xs font-bold border border-outline-variant/40 transition-colors",
        active ? "bg-primary text-on-primary border-primary/40" : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
      )}
    >{tab.label}</button>;
  })}</div>;
}
export {
  Tabs
};
