import { mockProducts } from '@/data/mock/products.mock';

export const productService = {
  async list() {
    return Promise.resolve(mockProducts);
  },
  async getById(id) {
    return Promise.resolve(mockProducts.find((item) => item.id === id) ?? null);
  }
};
