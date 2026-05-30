export interface Product {
  id: string;
  category: string;
  categoryKey: string;
  assistantKey: string;
  connectivityKeys: string[];
  title: string;
  description: string;
  priceValue: number;
  oldPrice?: string;
  image: string;
  badge: string;
  inStore: boolean;
  specs: string[];
}