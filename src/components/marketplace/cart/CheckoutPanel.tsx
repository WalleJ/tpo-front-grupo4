import { useState } from 'react';
import type { PaymentMethod } from '@/types/marketplace.types';

interface CheckoutPanelProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentIndex: number | null;
  onSelectPayment: (index: number) => void;
  onOpenAddCard: () => void;
  onPurchase: () => void;
  processing: boolean;
}

export function CheckoutPanel({
  paymentMethods,
  selectedPaymentIndex,
  onSelectPayment,
  onOpenAddCard,
  onPurchase,
  processing
}: CheckoutPanelProps) {
  const [billingName, setBillingName] = useState('User Demo');
  const [billingEmail, setBillingEmail] = useState('user@example.com');
  const [billingAddress, setBillingAddress] = useState('');

  return (
    <div className="glass-panel rounded-2xl p-lg flex flex-col gap-md shadow-lg shadow-primary/5">
      <div className="flex items-center gap-sm pb-md border-b border-outline-variant/30">
        <span className="material-symbols-outlined text-primary">credit_card</span>
        <h4 className="font-headline-sm text-headline-sm">PAYMENT METHOD</h4>
      </div>

      <div className="space-y-sm">
        <label className="flex flex-col gap-xs">
          <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Full Name</span>
          <input value={billingName} onChange={(e) => setBillingName(e.target.value)} className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm" />
        </label>
        <label className="flex flex-col gap-xs">
          <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Email</span>
          <input value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm" />
        </label>
        <label className="flex flex-col gap-xs">
          <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Shipping Address</span>
          <input value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm" />
        </label>
      </div>

      <div className="space-y-sm">
        {paymentMethods.map((method, index) => (
          <label
            key={`${method.label}-${index}`}
            className={`flex items-center gap-sm p-sm rounded-xl border cursor-pointer transition-colors ${selectedPaymentIndex === index ? 'border-primary bg-primary/5' : 'border-outline-variant/30 bg-surface-container-low hover:border-primary/40'}`}
          >
            <input
              type="radio"
              checked={selectedPaymentIndex === index}
              onChange={() => onSelectPayment(index)}
              className="accent-primary w-4 h-4 shrink-0"
            />
            <span className="material-symbols-outlined text-primary">payments</span>
            <div className="flex-1 min-w-0">
              <div className="font-label-caps text-[11px] text-on-surface truncate">{method.label}</div>
              <div className="text-body-sm text-on-surface-variant">{method.detail}</div>
            </div>
          </label>
        ))}
      </div>

      <button type="button" onClick={onOpenAddCard} className="inline-flex items-center gap-xs text-primary font-label-caps text-label-caps hover:opacity-75 transition-opacity mt-xs w-fit">
        <span className="material-symbols-outlined text-[18px]">add_card</span>ADD NEW CARD
      </button>

      <button
        type="button"
        onClick={onPurchase}
        disabled={processing || selectedPaymentIndex == null}
        className="w-full font-headline-sm text-headline-sm py-md rounded-xl shadow-lg shadow-primary/20 bg-primary text-white hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-sm disabled:opacity-60"
      >
        <span className="material-symbols-outlined">shopping_bag</span>
        {processing ? 'Processing...' : 'Buy Now'}
      </button>
    </div>
  );
}