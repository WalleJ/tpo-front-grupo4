import { useEffect, useState } from 'react';

interface PurchaseSuccessOverlayProps {
  isOpen: boolean;
  onReturnToCart: () => void;
  onDownloadInvoice: () => void;
  onSendInvoice: () => void;
}

export function PurchaseSuccessOverlay({
  isOpen,
  onReturnToCart,
  onDownloadInvoice,
  onSendInvoice
}: PurchaseSuccessOverlayProps) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (!isOpen) return;
    setSeconds(5);
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-surface/95 flex items-center justify-center p-lg">
      <div className="relative flex flex-col items-center gap-md max-w-sm w-full text-center glass-panel rounded-2xl p-lg">
        <div className="text-[88px] select-none leading-none">🎉</div>
        <div>
          <h2 className="font-display text-4xl font-bold mb-sm text-primary">Purchase Complete!</h2>
          <p className="text-on-surface-variant font-body-md text-body-md">Your order has been placed successfully. A confirmation will be sent to your email.</p>
        </div>
        <div className="flex flex-col gap-sm w-full mt-xs">
          <button onClick={onDownloadInvoice} className="w-full flex items-center justify-center gap-sm py-md px-lg rounded-xl bg-primary text-white font-label-caps text-label-caps">DOWNLOAD INVOICE</button>
          <button onClick={onSendInvoice} className="w-full flex items-center justify-center gap-sm py-md px-lg rounded-xl border border-primary text-primary font-label-caps text-label-caps">SEND INVOICE BY EMAIL</button>
          <button
            disabled={seconds > 0}
            onClick={onReturnToCart}
            className="w-full flex items-center justify-center gap-sm py-md px-lg rounded-xl bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps disabled:opacity-60"
          >
            {seconds > 0 ? `RETURN TO CART (${seconds})` : 'RETURN TO CART'}
          </button>
        </div>
      </div>
    </div>
  );
}