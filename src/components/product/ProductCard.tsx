import { Link } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { formatMoney } from '@/utils/formatters';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col glass-panel rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300">
      <div className="relative h-64 bg-surface-container-highest flex items-center justify-center p-md overflow-hidden">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} alt={product.title} />
      </div>
      <div className="p-md flex flex-col flex-1">
        <div className="flex justify-between items-start mb-xs">
          <h3 className="font-headline-sm text-on-surface">{product.title}</h3>
          <span className="font-bold text-headline-sm text-primary-fixed-dim">{formatMoney(product.priceValue)}</span>
        </div>
        <p className="text-body-sm text-on-surface-variant mb-md">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-sm">
          <Link to={`/marketplace/product/${product.id}`} className="bg-surface text-on-surface px-md py-2 rounded-lg font-label-caps border border-outline-variant">View Details</Link>
        </div>
      </div>
    </div>
  );
}