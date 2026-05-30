interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function AdminSearchBar({ value, onChange }: AdminSearchBarProps) {
  return (
    <div className="relative w-full md:max-w-sm">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search record"
        className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#b9cacb66] bg-white/80"
      />
    </div>
  );
}