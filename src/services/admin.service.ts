import type { AdminRecord, AdminStatCard, AdminTab } from '@/types/admin.types';

const recordsByTab: Record<AdminTab, AdminRecord[]> = {
  users: [
    { id: 1, title: 'admin', subtitle: 'admin@aio.com - ADMIN' },
    { id: 2, title: 'user', subtitle: 'user@aio.com - USER' }
  ],
  products: [
    { id: 1, title: 'Nexus-9 Core Hub', subtitle: '$599.00 - Category #1' },
    { id: 2, title: 'AI-O Core Hub', subtitle: '$1249.00 - Category #2' }
  ],
  categories: [
    { id: 1, title: 'CORE NODE', subtitle: '12 products' },
    { id: 2, title: 'ACOUSTIC', subtitle: '8 products' }
  ],
  promos: [
    { id: 1, title: 'Discount #1', subtitle: '15% - Product #2 - ACTIVE' },
    { id: 2, title: 'Discount #2', subtitle: '10% - Product #3 - ACTIVE' }
  ],
  orders: [
    { id: 881, title: 'Order #881', subtitle: 'CREATED - $599.00' },
    { id: 882, title: 'Order #882', subtitle: 'PENDING - $1249.00' }
  ]
};

export const adminService = {
  async getStats(): Promise<AdminStatCard[]> {
    return [
      { label: 'Users', value: 431, tab: 'users' },
      { label: 'Products', value: 67, tab: 'products' },
      { label: 'Categories', value: 18, tab: 'categories' },
      { label: 'Promos and discounts', value: 12, tab: 'promos' },
      { label: 'Orders', value: 124, tab: 'orders' }
    ];
  },

  async listByTab(tab: AdminTab): Promise<AdminRecord[]> {
    return recordsByTab[tab];
  }
};