import { Link } from "react-router-dom";
import { formatMoney } from "@/utils/formatters";
function ProductCard({ product, onAddToCart }) {
  const specs = product.specs.slice(0, 4);
  return <div className="group flex flex-col glass-panel rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"><div className="relative h-64 bg-surface-container-highest flex items-center justify-center p-md overflow-hidden"><img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} alt={product.title} /><div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20"><span className="font-label-caps text-[10px] text-primary">{product.badge}</span></div></div><div className="p-md flex flex-col flex-1"><div className="flex justify-between items-start mb-xs"><h3 className="font-headline-sm text-on-surface">{product.title}</h3><span className="font-bold text-headline-sm text-primary-fixed-dim">{formatMoney(product.priceValue)}</span></div><p className="text-body-sm text-on-surface-variant mb-md">{product.description}</p><div className="grid grid-cols-2 gap-y-2 mb-md pt-md border-t border-outline-variant/20">{specs.map((spec) => <div key={`${product.id}-${spec}`} className="flex items-center gap-xs justify-center"><span className="material-symbols-outlined text-[16px] text-outline">check_circle</span><span className="font-label-caps text-[11px] text-on-surface-variant">{spec}</span></div>)}</div><div className="mt-auto flex items-center justify-between gap-sm"><Link to={`/marketplace/product/${product.id}`} className="bg-surface text-on-surface px-md py-2 rounded-lg font-label-caps border border-outline-variant hover:bg-surface-container transition-all active:scale-95">
            View Details
          </Link><button
    type="button"
    onClick={onAddToCart}
    className="bg-primary/5 hover:bg-primary text-primary hover:text-white px-md py-2 rounded-lg font-label-caps transition-all active:scale-95"
  >
            Add to Cart
          </button></div></div></div>;
}
export {
  ProductCard
};
