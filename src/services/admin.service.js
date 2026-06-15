import { storageService } from '@/services/storage.service';

const ADMIN_RECORDS_KEY = 'aio-admin-records';
const ADMIN_RECORDS_UPDATED_EVENT = 'aio-admin-records-updated';

const defaultRecordsByTab = {
  users: [
    { id: 1, username: 'admin', email: 'admin@aio.com', password: 'admin123', firstName: 'Admin', lastName: 'Main', roleId: 1 },
    { id: 2, username: 'user', email: 'user@aio.com', password: 'user123', firstName: 'User', lastName: 'Demo', roleId: 2 }
  ],
  products: [
    { id: 1, name: 'Nexus-9 Core Hub', description: 'Central control node', price: 599, stock: 12, active: true, sellerId: 1, categoryId: 1 },
    { id: 2, name: 'AI-O Core Hub', description: 'Premium smart hub', price: 1249, stock: 8, active: true, sellerId: 1, categoryId: 2 }
  ],
  categories: [
    { id: 1, name: 'CORE NODE', description: 'Central nodes', productCount: 12 },
    { id: 2, name: 'ACOUSTIC', description: 'Audio devices', productCount: 8 },
    { id: 3, name: 'SECURITY', description: 'Sensors and alarms', productCount: 10 }
  ],
  promos: [
    { id: 1, percentage: 15, active: true, productId: 2 },
    { id: 2, percentage: 10, active: true, productId: 3 },
    { id: 3, percentage: 5, active: true, productId: 1 }
  ],
  orders: [
    { id: 881, date: '2026-05-20T10:00', total: 599, status: 'CREATED', userId: 2, cartId: 41 },
    { id: 882, date: '2026-05-21T12:00', total: 1249, status: 'PENDING', userId: 2, cartId: 42 },
    { id: 883, date: '2026-05-22T14:00', total: 1848, status: 'CONFIRMED', userId: 2, cartId: 43 },
    { id: 884, date: '2026-05-23T16:00', total: 329, status: 'SHIPPED', userId: 2, cartId: 44 },
    { id: 885, date: '2026-05-24T18:00', total: 2100, status: 'DELIVERED', userId: 2, cartId: 45 },
    { id: 886, date: '2026-05-25T09:30', total: 89, status: 'CANCELLED', userId: 2, cartId: 46 }
  ]
};

function cloneRecords(records) {
  return JSON.parse(JSON.stringify(records));
}

function readRecords() {
  return storageService.get(ADMIN_RECORDS_KEY, cloneRecords(defaultRecordsByTab));
}

export const adminService = {
  getRecordsByTabSync() {
    return readRecords();
  },

  saveRecordsByTab(records) {
    storageService.set(ADMIN_RECORDS_KEY, records);
    globalThis.dispatchEvent(new CustomEvent(ADMIN_RECORDS_UPDATED_EVENT));
  },

  subscribeToRecordsChanges(callback) {
    const handler = () => callback();
    globalThis.addEventListener(ADMIN_RECORDS_UPDATED_EVENT, handler);
    globalThis.addEventListener('storage', handler);
    return () => {
      globalThis.removeEventListener(ADMIN_RECORDS_UPDATED_EVENT, handler);
      globalThis.removeEventListener('storage', handler);
    };
  },

  async getStats() {
    const recordsByTab = readRecords();
    return [
      { label: 'Users', value: recordsByTab.users.length, tab: 'users' },
      { label: 'Products', value: recordsByTab.products.length, tab: 'products' },
      { label: 'Categories', value: recordsByTab.categories.length, tab: 'categories' },
      { label: 'Promos and discounts', value: recordsByTab.promos.length, tab: 'promos' },
      { label: 'Orders', value: recordsByTab.orders.length, tab: 'orders' }
    ];
  },

  async listByTab(tab) {
    return readRecords()[tab];
  }
};
