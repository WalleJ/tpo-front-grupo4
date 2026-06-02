export interface AdminStatCard {
  label: string;
  value: number;
  tab: AdminTab;
}

export type AdminTab = 'users' | 'products' | 'categories' | 'promos' | 'orders';

export interface AdminRecord {
  id: number;
  title?: string;
  subtitle?: string;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  roleId?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  active?: boolean;
  sellerId?: number;
  categoryId?: number;
  productCount?: number;
  percentage?: number;
  productId?: number;
  date?: string;
  total?: number;
  status?: string;
  userId?: number;
  cartId?: number;
}