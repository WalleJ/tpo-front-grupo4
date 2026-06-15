function formatProfileDateTime(value) {
  const [datePart, timePart = ""] = String(value || "").split(" ");
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return value;
  const formattedDate = `${day}/${month}/${year}`;
  return timePart ? `${formattedDate} ${timePart}` : formattedDate;
}
function SupportClaimsCard({ claims }) {
  return <div className="md:col-span-12 glass-panel rounded-xl p-md flex flex-col gap-md"><div className="flex items-center gap-sm"><span className="material-symbols-outlined text-primary">support_agent</span><h2 className="font-headline-sm text-headline-sm leading-none">Support Claims</h2></div><div className="space-y-sm">{claims.map((claim) => <div key={`${claim.dateTime}-${claim.title}`} className="p-sm rounded-xl border border-outline-variant/20 bg-surface-container-low flex flex-col gap-1"><div className="font-label-caps text-[11px] text-on-surface">{formatProfileDateTime(claim.dateTime)}</div><div className="flex items-start justify-between gap-sm"><div className="text-body-sm text-on-surface-variant two-line-clamp flex-1 min-w-0">{claim.title}</div><div className="flex items-center gap-xs text-primary shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-primary" /><span>{claim.status}</span></div></div></div>)}</div></div>;
}
export {
  SupportClaimsCard
};
