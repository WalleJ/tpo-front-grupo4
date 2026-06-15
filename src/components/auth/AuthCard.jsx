function AuthCard({ title, subtitle, icon, children }) {
  return <div className="glass-panel rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center gap-6"><div className="flex flex-col items-center gap-2 mb-2"><span className="text-primary text-5xl material-symbols-outlined">{icon}</span><h1 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">{title}</h1><span className="font-label-caps text-label-caps text-on-surface-variant text-xs">{subtitle}</span></div>{children}</div>;
}
export {
  AuthCard
};
