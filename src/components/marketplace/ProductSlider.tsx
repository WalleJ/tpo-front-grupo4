import { useState } from 'react';
import type { Product } from '@/types/product.types';

interface ProductSliderProps {
  title: string;
  products: Product[];
  onSelect: (id: string) => void;
}

export function ProductSlider({ title, products, onSelect }: ProductSliderProps) {
  const [index, setIndex] = useState(0);

  if (!products.length) return null;

  const next = () => setIndex((prev) => (prev + 1) % products.length);
  const prev = () => setIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <div className="relative group">
      <div className="flex justify-between items-center mb-md">
        <h4 className="font-headline-md text-headline-md">{title}</h4>
        <div className="flex gap-xs">
          <button className="prev-btn p-2 rounded-full border border-outline-variant/30" onClick={prev}>◀</button>
          <button className="next-btn p-2 rounded-full border border-outline-variant/30" onClick={next}>▶</button>
        </div>
      </div>
      <div className="slider-container flex gap-md overflow-x-auto snap-x snap-mandatory pb-4">
        {products.map((product, i) => (
          <button key={product.id} onClick={() => onSelect(product.id)} className={`text-left slider-item min-w-[320px] md:min-w-[400px] snap-center glass-panel-white rounded-2xl p-md border border-outline-variant/30 shadow-sm ${i !== index ? 'opacity-60' : ''}`}>
            <div className="aspect-video rounded-xl bg-surface-container mb-md overflow-hidden">
              <img alt={product.title} className="w-full h-full object-cover" src={product.image} />
            </div>
            <h5 className="font-headline-sm mb-xs">{product.title}</h5>
            <p className="text-body-sm text-on-surface-variant">{product.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}