function formatProfileDateTime(value) {
  const [datePart, timePart = ""] = String(value || "").split(" ");
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return value;
  const formattedDate = `${day}/${month}/${year}`;
  return timePart ? `${formattedDate} ${timePart}` : formattedDate;
}
function LoginSessionsCard({ sessions }) {
  return <div className="md:col-span-6 glass-panel rounded-xl p-md flex flex-col gap-md"><div className="flex items-center gap-sm"><span className="material-symbols-outlined text-primary">login</span><h2 className="font-headline-sm text-headline-sm leading-none">Login Sessions</h2></div><div className="space-y-sm">{sessions.map((session) => <div key={`${session.dateTime}-${session.detail}`} className="p-sm rounded-xl border border-outline-variant/20 bg-surface-container-low flex flex-col gap-1"><div className="font-label-caps text-[11px] text-on-surface">{formatProfileDateTime(session.dateTime)}</div><div className="text-body-sm text-on-surface-variant">{session.detail}</div></div>)}</div></div>;
}
export {
  LoginSessionsCard
};
