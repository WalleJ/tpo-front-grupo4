import { useEffect, useState } from "react";
function formatProfileDateTime(value) {
  const [datePart, timePart = ""] = String(value || "").split(" ");
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) return value;
  const formattedDate = `${day}/${month}/${year}`;
  return timePart ? `${formattedDate} ${timePart}` : formattedDate;
}
function PurchaseHistoryTable({ history, getOrderTotal, onViewDetail, onViewItems, onDownloadInvoice }) {
  const [openMenuOrderId, setOpenMenuOrderId] = useState(null);
  useEffect(() => {
    const closeMenu = () => setOpenMenuOrderId(null);
    const handleEsc = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("click", closeMenu);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", closeMenu);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return <div className="md:col-span-12 glass-panel rounded-xl p-md overflow-hidden"><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-md"><div className="flex items-center gap-sm"><span className="material-symbols-outlined text-primary">rocket_launch</span><h2 className="font-headline-sm text-headline-sm leading-none">Purchase History</h2></div></div><div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b border-outline-variant/30 font-label-caps text-[10px] text-on-surface-variant"><th className="pb-base px-sm">ORDER ID</th><th className="pb-base px-sm">DATE</th><th className="pb-base px-sm">STATUS</th><th className="pb-base px-sm">ORDER ITEMS</th><th className="pb-base px-sm">TOTAL</th><th className="pb-base px-sm text-right">ACTIONS</th></tr></thead><tbody className="text-body-sm font-body-sm">{history.map((order) => {
    const itemCount = order.orderItems.reduce((acc, item) => acc + item.quantity, 0);
    return <tr key={order.id} className="border-b border-outline-variant/10 hover:bg-primary/5 transition-colors"><td className="py-md px-sm font-mono text-[12px]">{order.id}</td><td className="py-md px-sm text-on-surface-variant">{formatProfileDateTime(order.date)}</td><td className="py-md px-sm"><div className="flex items-center gap-xs text-primary"><div className="w-1.5 h-1.5 rounded-full bg-primary" />{order.status}</div></td><td className="py-md px-sm">{itemCount}</td><td className="py-md px-sm">${getOrderTotal(order).toFixed(2)}</td><td className="py-md px-sm text-right relative"><button
      type="button"
      className="material-symbols-outlined text-on-surface-variant hover:text-primary"
      onClick={(event) => {
        event.stopPropagation();
        setOpenMenuOrderId((current) => current === order.id ? null : order.id);
      }}
      aria-label="Open actions menu"
    >
                    more_vert
                  </button><div
      className={`${openMenuOrderId === order.id ? "" : "hidden "}absolute right-2 top-10 z-20 w-44 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xl shadow-primary/10 p-1 text-left`}
    ><button
      type="button"
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/5 text-sm"
      onClick={() => {
        setOpenMenuOrderId(null);
        onViewDetail(order.id);
      }}
    >
                      View Details
                    </button><button
      type="button"
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/5 text-sm"
      onClick={() => {
        setOpenMenuOrderId(null);
        onViewItems(order.id);
      }}
    >
                      View Items
                    </button><button
      type="button"
      className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/5 text-sm"
      onClick={() => {
        setOpenMenuOrderId(null);
        onDownloadInvoice?.(order.id);
      }}
    >
                      Download Invoice
                    </button></div></td></tr>;
  })}</tbody></table></div></div>;
}
export {
  PurchaseHistoryTable
};
