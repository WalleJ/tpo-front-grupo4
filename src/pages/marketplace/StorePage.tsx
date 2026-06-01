import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { productService } from '@/services/product.service';
import { marketplaceService } from '@/services/marketplace.service';
import { ProductCard } from '@/components/product/ProductCard';
import { MarketplaceFooter } from '@/components/layouts/MarketplaceFooter';

type StoreFilterState = {
  category: string;
  assistant: string;
  connectivity: string;
  maxPrice: string;
};

export function StorePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<StoreFilterState>({
    category: '',
    assistant: '',
    connectivity: '',
    maxPrice: ''
  });

  useEffect(() => {
    productService.list().then(setProducts);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const maxPrice = Number.parseFloat(filters.maxPrice);
    const hasMaxPrice = Number.isFinite(maxPrice) && maxPrice >= 0;

    return products.filter((item) => {
      if (!item.inStore) return false;

      const searchable = `${item.title} ${item.description} ${item.category}`.toLowerCase();
      const matchesQuery = !q || searchable.includes(q);
      const matchesCategory = !filters.category || item.categoryKey === filters.category;
      const matchesAssistant = !filters.assistant || item.assistantKey === filters.assistant;
      const matchesConnectivity = !filters.connectivity || item.connectivityKeys.includes(filters.connectivity);
      const matchesPrice = !hasMaxPrice || item.priceValue <= maxPrice;

      return matchesQuery && matchesCategory && matchesAssistant && matchesConnectivity && matchesPrice;
    });
  }, [products, query, filters]);

  const toggleFilter = (group: keyof Omit<StoreFilterState, 'maxPrice'>, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group] === value ? '' : value
    }));
  };

  const clearFilters = () => {
    setQuery('');
    setFilters({
      category: '',
      assistant: '',
      connectivity: '',
      maxPrice: ''
    });
  };

  const addToCart = (product: Product) => {
    const cart = marketplaceService.getInitialCartItems();
    const existing = cart.find((item) => item.id === product.id);

    const nextCart = existing
      ? cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [...cart, {
        id: product.id,
        title: product.title,
        description: product.description,
        image: product.image,
        quantity: 1,
        unitPrice: product.priceValue
      }];

    marketplaceService.setCartItems(nextCart);
    navigate('/marketplace/cart');
  };

  const getChipClassName = (active: boolean) => {
    const base = 'filter-chip px-sm py-1.5 rounded-full font-label-caps text-[11px] transition-colors';
    if (active) {
      return `${base} bg-primary-container/30 text-on-primary-container border border-primary/20`;
    }
    return `${base} bg-surface-variant text-on-surface-variant hover:bg-outline-variant/30`;
  };

  return (
    <>
      <main className="max-w-[1280px] mx-auto px-margin pt-28">
        <section className="mb-lg">
          <div className="flex flex-col gap-md">
            <div className="w-full max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-headline-lg mb-sm">Hardware Catalog</h2>
              <p className="text-on-surface-variant font-body-md mb-md">Find the perfect smart home device for your needs.</p>
              <div className="relative group cyber-glow-focus rounded-xl bg-surface-container-low border border-outline-variant/50 transition-all">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none pl-12 pr-4 py-4 focus:ring-0 font-body-md"
                  placeholder="Search products, brands, or categories..."
                  type="text"
                />
              </div>
            </div>

            <div className="mt-md p-md glass-panel rounded-2xl overflow-x-auto mx-auto" id="store-filter-panel">
              <div className="flex flex-wrap lg:flex-nowrap items-end gap-sm min-w-max">
                <div className="flex flex-col gap-xs shrink-0">
                  <p className="font-label-caps text-outline text-[10px] uppercase">Category</p>
                  <div className="flex gap-xs flex-wrap">
                    <button type="button" className={getChipClassName(filters.category === 'speaker')} onClick={() => toggleFilter('category', 'speaker')}>Speakers</button>
                    <button type="button" className={getChipClassName(filters.category === 'display')} onClick={() => toggleFilter('category', 'display')}>Displays</button>
                    <button type="button" className={getChipClassName(filters.category === 'streaming')} onClick={() => toggleFilter('category', 'streaming')}>Streaming</button>
                    <button type="button" className={getChipClassName(filters.category === 'climate')} onClick={() => toggleFilter('category', 'climate')}>Climate</button>
                  </div>
                </div>

                <div className="w-px h-10 bg-outline-variant/30 mx-1 hidden lg:block shrink-0" />

                <div className="flex flex-col gap-xs shrink-0">
                  <p className="font-label-caps text-outline text-[10px] uppercase">Assistant</p>
                  <div className="flex gap-xs flex-wrap">
                    <button type="button" className={getChipClassName(filters.assistant === 'siri')} onClick={() => toggleFilter('assistant', 'siri')}>Siri</button>
                    <button type="button" className={getChipClassName(filters.assistant === 'alexa')} onClick={() => toggleFilter('assistant', 'alexa')}>Alexa</button>
                    <button type="button" className={getChipClassName(filters.assistant === 'google')} onClick={() => toggleFilter('assistant', 'google')}>Google Assistant</button>
                  </div>
                </div>

                <div className="w-px h-10 bg-outline-variant/30 mx-1 hidden lg:block shrink-0" />

                <div className="flex flex-col gap-xs shrink-0">
                  <p className="font-label-caps text-outline text-[10px] uppercase">Connectivity</p>
                  <div className="flex gap-xs flex-wrap">
                    <button type="button" className={getChipClassName(filters.connectivity === 'matter')} onClick={() => toggleFilter('connectivity', 'matter')}>Matter</button>
                    <button type="button" className={getChipClassName(filters.connectivity === 'wifi')} onClick={() => toggleFilter('connectivity', 'wifi')}>Wi-Fi</button>
                    <button type="button" className={getChipClassName(filters.connectivity === 'zigbee')} onClick={() => toggleFilter('connectivity', 'zigbee')}>Zigbee</button>
                    <button type="button" className={getChipClassName(filters.connectivity === 'thread')} onClick={() => toggleFilter('connectivity', 'thread')}>Thread</button>
                  </div>
                </div>

                <div className="w-px h-10 bg-outline-variant/30 mx-1 hidden lg:block shrink-0" />

                <div className="flex flex-col gap-xs shrink-0 min-w-[150px]">
                  <label htmlFor="store-max-price" className="font-label-caps text-outline text-[10px] uppercase">Max Price (USD)</label>
                  <input
                    id="store-max-price"
                    type="number"
                    min="0"
                    step="1"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                    className="w-[150px] bg-surface-container-lowest border border-outline-variant/50 px-2 py-1.5 rounded-lg text-[13px] leading-tight focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="e.g. 140"
                  />
                </div>

                <div className="w-px h-10 bg-outline-variant/30 mx-1 hidden lg:block shrink-0" />

                <div className="flex flex-col gap-xs shrink-0">
                  <button
                    type="button"
                    id="store-clear-filters"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-outline-variant/40 hover:bg-surface-container transition-colors"
                    onClick={clearFilters}
                  >
                    <span className="material-symbols-outlined text-[16px] leading-none">filter_alt_off</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-sm px-xs">
              <p id="store-results-count" className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wide">
                Showing {filtered.length} product{filtered.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        </section>

        {filtered.length === 0 ? (
          <div className="col-span-full glass-panel rounded-2xl p-lg text-center mb-xl">
            <p className="font-headline-sm mb-xs">No products found</p>
            <p className="text-on-surface-variant text-body-sm">Try another search or clear active filters.</p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md mb-xl">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
          ))}
        </div>
      </main>
      <MarketplaceFooter />
    </>
  );
}