import type { PurchaseOrder } from '@/types/marketplace.types';

interface PurchaseHistoryTableProps {
  history: PurchaseOrder[];
  getOrderTotal: (order: PurchaseOrder) => number;
  onViewDetail: (orderId: string) => void;
  onViewItems: (orderId: string) => void;
}

export function PurchaseHistoryTable({ history, getOrderTotal, onViewDetail, onViewItems }: PurchaseHistoryTableProps) {
  return (
    <div className="md:col-span-12 glass-panel rounded-xl p-md overflow-x-auto">
      <h2 className="font-headline-sm text-headline-sm mb-sm">Purchase History</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-outline-variant/30">
            <th className="pb-2">ORDER ID</th>
            <th className="pb-2">DATE</th>
            <th className="pb-2">STATUS</th>
            <th className="pb-2">ORDER ITEMS</th>
            <th className="pb-2">TOTAL</th>
            <th className="pb-2 text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {history.map((order) => (
            <tr key={order.id}>
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.date}</td>
              <td className="py-2">{order.status}</td>
              <td className="py-2">{order.orderItems.length}</td>
              <td className="py-2">${getOrderTotal(order).toFixed(2)}</td>
              <td className="py-2 text-right">
                <div className="inline-flex gap-2">
                  <button onClick={() => onViewDetail(order.id)} className="px-3 py-1 rounded-lg border border-outline-variant/40">Detail</button>
                  <button onClick={() => onViewItems(order.id)} className="px-3 py-1 rounded-lg border border-outline-variant/40">Items</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}