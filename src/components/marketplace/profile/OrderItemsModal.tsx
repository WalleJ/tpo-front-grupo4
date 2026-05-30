import { Modal, Button } from '@/components/ui';
import type { PurchaseOrder } from '@/types/marketplace.types';

interface OrderItemsModalProps {
  isOpen: boolean;
  order: PurchaseOrder | null;
  onClose: () => void;
}

export function OrderItemsModal({ isOpen, order, onClose }: OrderItemsModalProps) {
  if (!order) return null;

  const totalQty = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = order.orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Items" subtitle="Read-only order item detail">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-sm">Items: {order.orderItems.length}</div>
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-sm">Quantity: {totalQty}</div>
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-sm">Total: ${totalAmount.toFixed(2)}</div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant/30">
              <th className="py-sm px-sm">#</th>
              <th className="py-sm px-sm">PRODUCT</th>
              <th className="py-sm px-sm">QTY</th>
              <th className="py-sm px-sm">UNIT PRICE</th>
              <th className="py-sm px-sm">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={`${item.name}-${index}`} className="border-b border-outline-variant/20">
                <td className="py-sm px-sm">{index + 1}</td>
                <td className="py-sm px-sm">{item.name}</td>
                <td className="py-sm px-sm">{item.quantity}</td>
                <td className="py-sm px-sm">${item.unitPrice.toFixed(2)}</td>
                <td className="py-sm px-sm">${(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pt-md">
        <Button variant="secondary" onClick={onClose}>CLOSE</Button>
      </div>
    </Modal>
  );
}