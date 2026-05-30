export interface AdminStatCard {
  label: string;
  value: number;
  tab: AdminTab;
}

export type AdminTab = 'users' | 'products' | 'categories' | 'promos' | 'orders';

export interface AdminRecord {
  id: number;
  title: string;
  subtitle: string;
}