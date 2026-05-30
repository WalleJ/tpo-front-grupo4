import { useEffect, useState } from 'react';
import type { Product } from '@/types/product.types';
import { productService } from '@/services/product.service';
import { HeroSection } from '@/components/marketplace/HeroSection';
import { FeaturedProducts } from '@/components/marketplace/FeaturedProducts';
import { NewsletterSection } from '@/components/marketplace/NewsletterSection';
import { MarketplaceFooter } from '@/components/layouts/MarketplaceFooter';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.list().then(setProducts);
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={products} />
      <NewsletterSection />
      <MarketplaceFooter />
    </>
  );
}