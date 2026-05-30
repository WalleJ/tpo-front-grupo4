import { Modal, Button } from '@/components/ui';
import type { PurchaseOrder } from '@/types/marketplace.types';

interface OrderDetailModalProps {
  isOpen: boolean;
  order: PurchaseOrder | null;
  total: number;
  onClose: () => void;
}

export function OrderDetailModal({ isOpen, order, total, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Detail" subtitle="Read-only order information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
        <div className="rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm">Order ID: {order.id}</div>
        <div className="rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm">Date: {order.date}</div>
        <div className="rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm">Status: {order.status}</div>
        <div className="rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm">Items: {order.orderItems.length}</div>
        <div className="rounded-xl border border-outline-variant/50 bg-surface-container px-md py-sm md:col-span-2">Total: ${total.toFixed(2)}</div>
      </div>
      <div className="flex justify-end pt-md">
        <Button variant="secondary" onClick={onClose}>CLOSE</Button>
      </div>
    </Modal>
  );
}