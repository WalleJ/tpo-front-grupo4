function AdminFilters({ activeTab }) {
  return <div className="text-xs text-on-surface-variant font-semibold">
      Active module: {activeTab.toUpperCase()}</div>;
}
export {
  AdminFilters
};
