import type { PropsWithChildren, ReactNode } from 'react';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer?: ReactNode;
}

export function Modal({ isOpen, title, subtitle, onClose, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 modal-backdrop px-4 py-6 md:p-8 overflow-y-auto" onClick={onClose}>
      <div className="max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
        <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              {subtitle ? <p className="text-xs uppercase tracking-widest text-[#006970] font-bold mb-2">{subtitle}</p> : null}
              <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <button type="button" onClick={onClose} className="w-9 h-9 rounded-lg border border-[#b9cacb66] hover:bg-[#f0edee]">✕</button>
          </div>
          {children}
          {footer}
        </div>
      </div>
    </div>
  );
}