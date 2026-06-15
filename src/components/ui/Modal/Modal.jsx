function Modal({ isOpen, title, subtitle, onClose, children, footer, maxWidthClass = "max-w-2xl" }) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 modal-backdrop px-4 py-6 md:p-8 overflow-y-auto"><button
    type="button"
    onClick={onClose}
    className="absolute inset-0 w-full h-full"
    aria-label="Close modal"
  /><div className={`${maxWidthClass} mx-auto relative`}><div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl"><div className="flex items-start justify-between gap-3 mb-5"><div>{subtitle ? <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">{subtitle}</p> : null}<h3 className="text-2xl font-bold">{title}</h3></div><button type="button" onClick={onClose} className="w-9 h-9 rounded-lg border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container">✕</button></div>{children}{footer}</div></div></div>;
}
export {
  Modal
};
