import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { ProductSlider } from '@/components/marketplace/ProductSlider';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: Readonly<FeaturedProductsProps>) {
  const navigate = useNavigate();

  const groups = useMemo(() => ({
    speakers: products.filter((item) => item.categoryKey === 'speaker'),
    displays: products.filter((item) => item.categoryKey === 'display'),
    streaming: products.filter((item) => item.categoryKey === 'streaming')
  }), [products]);

  return (
    <section className="py-xl max-w-[1280px] mx-auto px-gutter flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-sm mb-xs">
        <div>
          <h3 className="font-headline-lg text-headline-lg mb-xs">Featured Products</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Real devices with AI assistants for your home.</p>
        </div>
        <button
          onClick={() => navigate('/marketplace/store')}
          className="text-primary font-label-caps text-label-caps inline-flex items-center gap-xs hover:underline md:self-end"
        >
          <span>EXPLORE FULL CATALOG</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
      <ProductSlider title="Smart Speakers with AI Assistants" products={groups.speakers} onSelect={(id) => navigate(`/marketplace/product/${id}`)} />
      <ProductSlider title="Smart Displays" products={groups.displays} onSelect={(id) => navigate(`/marketplace/product/${id}`)} />
      <ProductSlider title="Streaming & Voice Control" products={groups.streaming} onSelect={(id) => navigate(`/marketplace/product/${id}`)} />
    </section>
  );
}