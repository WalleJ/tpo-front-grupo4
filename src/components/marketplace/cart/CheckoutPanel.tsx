import { useState } from 'react';
import type { PaymentMethod } from '@/types/marketplace.types';

interface CheckoutPanelProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentIndex: number | null;
  shipping: number;
  taxes: number;
  discount: number;
  total: number;
  onSelectPayment: (index: number) => void;
  onOpenAddCard: () => void;
  onPurchase: () => void;
  processing: boolean;
}

export function CheckoutPanel({
  paymentMethods,
  selectedPaymentIndex,
  shipping,
  taxes,
  discount,
  total,
  onSelectPayment,
  onOpenAddCard,
  onPurchase,
  processing
}: Readonly<CheckoutPanelProps>) {
  const [billingName, setBillingName] = useState('User Demo');
  const [billingEmail, setBillingEmail] = useState('user@example.com');
  const [billingTaxId, setBillingTaxId] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [isPurchaseWaveActive, setIsPurchaseWaveActive] = useState(false);

  const handlePurchaseClick = () => {
    if (processing || selectedPaymentIndex == null) return;
    setIsPurchaseWaveActive(true);
    onPurchase();
  };

  return (
    <>
      <div className="glass-panel rounded-2xl p-lg flex flex-col gap-md shadow-lg shadow-primary/5">
        <div className="flex items-center gap-sm pb-md border-b border-outline-variant/30">
          <span className="material-symbols-outlined text-primary">receipt</span>
          <h4 className="font-headline-sm text-headline-sm">PURCHASE DETAILS</h4>
        </div>

        <div className="flex flex-col gap-sm">
          <label className="flex flex-col gap-xs">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Full Name</span>
            <input
              value={billingName}
              onChange={(e) => setBillingName(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-body-sm"
              placeholder="Name on invoice"
              autoComplete="name"
            />
          </label>

          <label className="flex flex-col gap-xs">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Email</span>
            <input
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-body-sm"
              placeholder="email@domain.com"
              autoComplete="email"
              type="email"
            />
          </label>

          <label className="flex flex-col gap-xs">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Tax ID / DNI (optional)</span>
            <input
              value={billingTaxId}
              onChange={(e) => setBillingTaxId(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-body-sm"
              placeholder="XX-XXXXXXXX-X"
            />
          </label>

          <label className="flex flex-col gap-xs">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Shipping Address</span>
            <input
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-body-sm"
              placeholder="Street, City, Province"
              autoComplete="street-address"
            />
          </label>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-lg flex flex-col gap-md shadow-lg shadow-primary/5">
        <div className="flex items-center gap-sm pb-md border-b border-outline-variant/30">
          <span className="material-symbols-outlined text-primary">credit_card</span>
          <h4 className="font-headline-sm text-headline-sm">PAYMENT METHOD</h4>
        </div>

        <div className="space-y-sm" id="checkout-payment-methods">
          {paymentMethods.length === 0 ? (
            <div className="p-sm rounded-xl border border-outline-variant/20 bg-surface-container-low text-body-sm text-on-surface-variant">
              No saved payment methods. Add a new card below.
            </div>
          ) : (
            paymentMethods.map((method, index) => (
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
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                <div className="flex-1 min-w-0">
                  <div className="font-label-caps text-[11px] text-on-surface truncate">{method.label}</div>
                  <div className="text-body-sm text-on-surface-variant">{method.detail}</div>
                </div>
              </label>
            ))
          )}
        </div>

        <button type="button" onClick={onOpenAddCard} className="inline-flex items-center gap-xs text-primary font-label-caps text-label-caps hover:opacity-75 transition-opacity mt-xs w-fit">
          <span className="material-symbols-outlined text-[18px]">add_card</span>ADD NEW CARD
        </button>
      </div>

      <div className="glass-panel rounded-2xl p-md flex flex-col gap-sm shadow-sm">
        <div className="flex justify-between items-center gap-2">
          <span className="text-on-surface-variant font-label-caps text-[10px] uppercase">Shipping</span>
          <span className="text-body-sm font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-on-surface-variant font-label-caps text-[10px] uppercase">Taxes</span>
          <span className="text-body-sm font-medium">${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-on-surface-variant font-label-caps text-[10px] uppercase">Discount</span>
          <span className="text-body-sm font-medium">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-baseline pt-sm border-t border-primary/20">
          <span className="font-label-caps text-label-caps text-primary uppercase">TOTAL</span>
          <div className="font-bold text-2xl tracking-tighter text-primary">${total.toFixed(2)}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePurchaseClick}
        onAnimationEnd={() => setIsPurchaseWaveActive(false)}
        disabled={processing || selectedPaymentIndex == null}
        className={`w-full font-headline-sm text-headline-sm py-md rounded-xl shadow-lg shadow-primary/20 bg-primary text-white hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-sm disabled:opacity-60 ${isPurchaseWaveActive ? 'purchase-wave' : ''}`}
      >
        <span className="material-symbols-outlined">shopping_bag</span>
        {processing ? 'Processing...' : 'Buy Now'}
      </button>

      <div className="bg-surface-container-low rounded-lg p-sm border border-outline-variant/20">
        <div className="flex items-start gap-sm">
          <span className="material-symbols-outlined text-[16px] text-primary mt-1">info</span>
          <p className="font-body-sm text-[11px] leading-relaxed text-on-surface-variant">
            By completing this purchase, you agree to AI-O&apos;s terms and conditions. Orders are processed within 1–2 business days.
          </p>
        </div>
      </div>
    </>
  );
}