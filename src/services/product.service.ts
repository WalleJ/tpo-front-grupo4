import { mockProducts } from '@/data/mock/products.mock';
import type { Product } from '@/types/product.types';

export const productService = {
  async list(): Promise<Product[]> {
    return Promise.resolve(mockProducts);
  },
  async getById(id: string): Promise<Product | null> {
    return Promise.resolve(mockProducts.find((item) => item.id === id) ?? null);
  }
};