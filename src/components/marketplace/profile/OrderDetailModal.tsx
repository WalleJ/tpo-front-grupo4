import type { PurchaseOrder } from '@/types/marketplace.types';

interface OrderDetailModalProps {
  isOpen: boolean;
  order: PurchaseOrder | null;
  total: number;
  onClose: () => void;
}

function formatProfileDateTime(value: string) {
  const [datePart, timePart = ''] = String(value || '').split(' ');
  const [year, month, day] = datePart.split('-');
  if (!year || !month || !day) return value;
  const formattedDate = `${day}/${month}/${year}`;
  return timePart ? `${formattedDate} ${timePart}` : formattedDate;
}

export function OrderDetailModal({ isOpen, order, total, onClose }: Readonly<OrderDetailModalProps>) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[77] flex items-center justify-center p-md">
      <button type="button" className="absolute inset-0 bg-on-surface/45" onClick={onClose} aria-label="Close order detail popup" />
      <div className="relative w-full max-w-2xl glass-panel-white rounded-2xl border border-outline-variant/40 shadow-2xl p-lg">
        <div className="flex items-start justify-between gap-md mb-md">
          <div>
            <h3 className="font-headline-md text-headline-md">Order Detail</h3>
            <p className="text-body-sm text-on-surface-variant mt-xs">Read-only order information.</p>
          </div>
          <button type="button" className="p-2 rounded-lg hover:bg-primary/5 transition-colors" onClick={onClose} aria-label="Close order detail popup">
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          <label className="flex flex-col gap-xs">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Order ID</span>
            <input type="text" disabled value={order.id} className="w-full rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm text-on-surface-variant" />
          </label>
          <label className="flex flex-col gap-xs">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Date</span>
            <input type="text" disabled value={formatProfileDateTime(order.date)} className="w-full rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm text-on-surface-variant" />
          </label>
          <label className="flex flex-col gap-xs">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Status</span>
            <input type="text" disabled value={order.status} className="w-full rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm text-on-surface-variant" />
          </label>
          <label className="flex flex-col gap-xs">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Order Items</span>
            <input type="text" disabled value={String(order.orderItems.length)} className="w-full rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm text-on-surface-variant" />
          </label>
          <label className="flex flex-col gap-xs md:col-span-2">
            <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Total</span>
            <input type="text" disabled value={`$${total.toFixed(2)}`} className="w-full rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm text-on-surface-variant" />
          </label>
        </div>

        <div className="flex justify-end pt-md">
          <button type="button" onClick={onClose} className="px-md py-sm rounded-xl border border-outline-variant/40 font-label-caps text-label-caps hover:bg-surface-container-low transition-colors">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}