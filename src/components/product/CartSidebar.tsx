interface CartSidebarProps {
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    unitPrice: number;
  }>;
  shipping: number;
  taxes: number;
  discount: number;
  total: number;
  onCheckout?: () => void;
  checkoutLabel?: string;
}

export function CartSidebar({
  items,
  shipping,
  taxes,
  discount,
  total,
  onCheckout,
  checkoutLabel = 'Checkout'
}: Readonly<CartSidebarProps>) {
  return (
    <div className="glass-panel rounded-2xl p-lg flex flex-col gap-md shadow-lg shadow-primary/5 sticky top-24">
      <div className="flex items-center gap-sm pb-md border-b border-outline-variant/30">
        <span className="material-symbols-outlined text-primary">receipt_long</span>
        <h4 className="font-headline-sm text-headline-sm">ORDER SUMMARY</h4>
      </div>

      <div className="flex flex-col gap-sm" id="order-summary-lines">
        {items.length === 0 ? (
          <div className="text-on-surface-variant text-body-sm">No items yet.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex justify-between items-center gap-2">
              <span className="text-on-surface-variant font-label-caps text-[10px] uppercase truncate">
                {item.title} x{item.quantity}
              </span>
              <span className="text-body-sm font-medium">${(item.unitPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col gap-xs mt-xs border-t border-outline-variant/20 pt-sm">
        <div className="flex justify-between items-center gap-2">
          <span className="text-on-surface-variant font-label-caps text-[10px] uppercase truncate">Shipping</span>
          <span className="text-body-sm font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-on-surface-variant font-label-caps text-[10px] uppercase truncate">Taxes</span>
          <span className="text-body-sm font-medium">${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center gap-2 text-primary">
          <span className="text-on-surface-variant font-label-caps text-[10px] uppercase truncate">Discount</span>
          <span className="text-body-sm font-medium">-${discount.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-md pt-md border-t border-primary/20 flex justify-between items-baseline">
        <span className="font-label-caps text-label-caps text-primary uppercase">TOTAL</span>
        <div className="font-bold text-3xl tracking-tighter text-primary">${total.toFixed(2)}</div>
      </div>

      {onCheckout ? (
        <div className="flex flex-col mt-md">
          <button onClick={onCheckout} className="w-full font-label-caps text-label-caps py-md rounded-xl shadow-lg bg-primary text-white hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-sm">
            {checkoutLabel} <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <div className="mt-md bg-surface-container-low rounded-lg p-sm border border-outline-variant/20">
            <div className="flex items-start gap-sm">
              <span className="material-symbols-outlined text-[16px] text-primary mt-1">info</span>
              <p className="font-body-sm text-[11px] leading-relaxed text-on-surface-variant">
                By completing this purchase, you agree to AI-O&apos;s terms and conditions. Orders are processed within 1–2 business days.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}