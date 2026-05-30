import type { Product } from '@/types/product.types';
import { formatMoney } from '@/utils/formatters';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start pt-24 pb-16 max-w-[1280px] mx-auto px-gutter">
      <div className="lg:col-span-7">
        <div className="glass-panel rounded-xl overflow-hidden relative aspect-square md:aspect-[4/3] flex items-center justify-center p-lg">
          <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
        </div>
      </div>
      <div className="lg:col-span-5 space-y-lg">
        <section>
          <span className="font-label-caps text-label-caps text-primary tracking-widest mb-xs block">{product.category}</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">{product.title}</h1>
          <p className="font-body-lg text-on-surface-variant">{product.description}</p>
        </section>
        <div className="flex items-baseline gap-sm">
          <span className="font-display text-headline-lg font-bold text-primary-fixed-dim">{formatMoney(product.priceValue)}</span>
          {product.oldPrice ? <span className="font-label-caps text-label-caps text-outline line-through">{product.oldPrice}</span> : null}
        </div>
      </div>
    </div>
  );
}