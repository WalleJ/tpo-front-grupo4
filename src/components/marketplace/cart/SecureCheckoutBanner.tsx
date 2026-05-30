export function SecureCheckoutBanner() {
  return (
    <div className="glass-panel rounded-xl px-md py-sm flex items-center gap-sm bg-primary-container/10 border-primary-container/30">
      <span className="material-symbols-outlined text-primary">lock</span>
      <div className="flex flex-col">
        <span className="font-label-caps text-[10px] leading-tight">SECURE CHECKOUT</span>
        <span className="font-label-caps text-label-caps">Your payment data is protected</span>
      </div>
    </div>
  );
}