import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types/product.types';
import { productService } from '@/services/product.service';
import { ProductCard } from '@/components/product/ProductCard';
import { MarketplaceFooter } from '@/components/layouts/MarketplaceFooter';

export function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    productService.list().then(setProducts);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products.filter((item) => item.inStore);
    return products.filter((item) => item.inStore && `${item.title} ${item.description}`.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <>
      <main className="max-w-[1280px] mx-auto px-margin pt-28">
        <section className="mb-lg">
          <h2 className="font-headline-lg text-headline-lg mb-sm">Hardware Catalog</h2>
          <div className="relative group cyber-glow-focus rounded-xl bg-surface-container-low border border-outline-variant/50">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent border-none pl-12 pr-4 py-4" placeholder="Search products" type="text" />
          </div>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md mb-xl">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </main>
      <MarketplaceFooter />
    </>
  );
}