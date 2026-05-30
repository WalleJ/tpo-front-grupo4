interface CartSidebarProps {
  itemCount: number;
  subtotal: number;
  shipping: number;
  taxes: number;
  discount: number;
  total: number;
  onCheckout?: () => void;
  checkoutLabel?: string;
}

export function CartSidebar({
  itemCount,
  subtotal,
  shipping,
  taxes,
  discount,
  total,
  onCheckout,
  checkoutLabel = 'Checkout'
}: CartSidebarProps) {
  return (
    <div className="glass-panel rounded-2xl p-lg flex flex-col gap-md shadow-lg shadow-primary/5 sticky top-24">
      <div className="flex items-center gap-sm pb-md border-b border-outline-variant/30">
        <span className="material-symbols-outlined text-primary">receipt_long</span>
        <h4 className="font-headline-sm text-headline-sm">ORDER SUMMARY</h4>
      </div>
      <div className="flex justify-between text-body-sm">
        <span>Items</span>
        <span>{itemCount}</span>
      </div>
      <div className="flex justify-between text-body-sm">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-body-sm">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-body-sm">
        <span>Taxes</span>
        <span>${taxes.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-body-sm text-primary">
        <span>Discount</span>
        <span>-${discount.toFixed(2)}</span>
      </div>
      <div className="mt-md pt-md border-t border-primary/20 flex justify-between items-baseline">
        <span className="font-label-caps text-label-caps text-primary uppercase">TOTAL</span>
        <div className="font-bold text-3xl tracking-tighter text-primary">${total.toFixed(2)}</div>
      </div>
      {onCheckout ? (
        <button onClick={onCheckout} className="w-full font-label-caps text-label-caps py-md rounded-xl shadow-lg bg-primary text-white hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-sm">
          {checkoutLabel} <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      ) : null}
    </div>
  );
}