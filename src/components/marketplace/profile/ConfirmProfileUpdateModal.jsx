function ConfirmProfileUpdateModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[76] flex items-center justify-center p-md"><button type="button" className="absolute inset-0 bg-on-surface/45" onClick={onClose} aria-label="Close confirm profile popup" /><div className="relative w-full max-w-md glass-panel-white rounded-2xl border border-outline-variant/40 shadow-2xl p-lg"><div className="flex items-start justify-between gap-md mb-sm"><h3 className="font-headline-sm text-headline-sm">Confirm profile update</h3><button type="button" className="p-2 rounded-lg hover:bg-primary/5 transition-colors" onClick={onClose} aria-label="Close confirm profile popup"><span className="material-symbols-outlined text-on-surface-variant">close</span></button></div><p className="text-body-sm text-on-surface-variant mb-md">Are you sure you want to save these profile changes?</p><div className="flex justify-end gap-sm"><button type="button" onClick={onClose} className="px-md py-sm rounded-xl border border-outline-variant/40 font-label-caps text-label-caps hover:bg-surface-container-low transition-colors">
            CANCEL
          </button><button type="button" onClick={onConfirm} className="px-md py-sm rounded-xl bg-primary text-on-primary font-label-caps text-label-caps active:scale-95 transition-all">
            CONFIRM
          </button></div></div></div>;
}
export {
  ConfirmProfileUpdateModal
};
