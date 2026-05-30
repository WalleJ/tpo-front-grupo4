import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { ProductSlider } from '@/components/marketplace/ProductSlider';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const navigate = useNavigate();

  const groups = useMemo(() => ({
    speakers: products.filter((item) => item.categoryKey === 'speaker'),
    displays: products.filter((item) => item.categoryKey === 'display'),
    streaming: products.filter((item) => item.categoryKey === 'streaming')
  }), [products]);

  return (
    <section className="py-xl max-w-[1280px] mx-auto px-gutter flex flex-col gap-xl">
      <div>
        <h3 className="font-headline-lg text-headline-lg mb-xs">Featured Products</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Real devices with AI assistants for your home.</p>
      </div>
      <ProductSlider title="Smart Speakers with AI Assistants" products={groups.speakers} onSelect={(id) => navigate(`/marketplace/product/${id}`)} />
      <ProductSlider title="Smart Displays" products={groups.displays} onSelect={(id) => navigate(`/marketplace/product/${id}`)} />
      <ProductSlider title="Streaming & Voice Control" products={groups.streaming} onSelect={(id) => navigate(`/marketplace/product/${id}`)} />
    </section>
  );
}