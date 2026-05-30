import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { productService } from '@/services/product.service';
import { ProductDetail } from '@/components/product/ProductDetail';
import { MarketplaceFooter } from '@/components/layouts/MarketplaceFooter';

export function ProductPage() {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    productService.getById(productId).then(setProduct);
  }, [productId]);

  if (!product) {
    return <div className="pt-24 px-gutter">Product not found.</div>;
  }

  return (
    <>
      <ProductDetail product={product} />
      <MarketplaceFooter />
    </>
  );
}