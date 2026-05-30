import type { PaymentMethod } from '@/types/marketplace.types';

interface PaymentMethodsCardProps {
  methods: PaymentMethod[];
  onDeleteRequest: (index: number) => void;
}

export function PaymentMethodsCard({ methods, onDeleteRequest }: PaymentMethodsCardProps) {
  return (
    <div className="md:col-span-6 glass-panel rounded-xl p-md">
      <h2 className="font-headline-sm text-headline-sm mb-sm">Saved Payment Methods</h2>
      <div className="space-y-sm">
        {methods.length === 0 ? (
          <div className="p-sm rounded-xl border border-outline-variant/20 bg-surface-container-low text-body-sm text-on-surface-variant">No saved payment methods.</div>
        ) : (
          methods.map((method, index) => (
            <div key={`${method.label}-${index}`} className="p-sm rounded-xl border border-outline-variant/20 bg-surface-container-low flex items-center justify-between gap-sm">
              <div>
                <div className="font-label-caps text-[11px] text-on-surface">{method.label}</div>
                <div className="text-body-sm text-on-surface-variant">{method.detail}</div>
              </div>
              <button
                type="button"
                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
                onClick={() => onDeleteRequest(index)}
                aria-label="Remove payment method"
              >
                <span className="material-symbols-outlined text-[18px] leading-none">delete</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}