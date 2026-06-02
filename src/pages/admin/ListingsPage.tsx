import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AdminTab } from '@/types/admin.types';
import { Tabs, Button } from '@/components/ui';
import { useModal } from '@/hooks/useModal';

const adminTabs: { id: AdminTab; label: string }[] = [
  { id: 'users', label: 'Users' },
  { id: 'products', label: 'Products' },
  { id: 'categories', label: 'Categories' },
  { id: 'promos', label: 'Promos and discounts' },
  { id: 'orders', label: 'Orders' }
];

type FieldType = 'text' | 'email' | 'password' | 'number' | 'datetime-local' | 'checkbox' | 'select' | 'textarea' | 'relation-search';

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  fullWidth?: boolean;
  options?: readonly string[];
  relation?: 'role' | 'user' | 'category' | 'product' | 'cart';
}

interface EntityRecord {
  id: number;
  [key: string]: string | number | boolean;
}

interface ProductImage {
  id: number;
  url: string;
  name: string;
}

interface OrderItemRecord {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

const ORDER_STATUSES = ['CREATED', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const;

const fieldsByTab: Record<AdminTab, FieldConfig[]> = {
  users: [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'firstName', label: 'First name', type: 'text', required: true },
    { name: 'lastName', label: 'Last name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'roleId', label: 'Role ID', type: 'relation-search', required: true, relation: 'role' }
  ],
  products: [
    { name: 'name', label: 'Name', type: 'text', required: true, fullWidth: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'stock', label: 'Stock', type: 'number', required: true },
    { name: 'sellerId', label: 'Seller ID', type: 'relation-search', required: true, relation: 'user' },
    { name: 'categoryId', label: 'Category ID', type: 'relation-search', required: true, relation: 'category' },
    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, required: true },
    { name: 'active', label: 'Active', type: 'checkbox', required: true }
  ],
  categories: [
    { name: 'name', label: 'Name', type: 'text', required: true, fullWidth: true },
    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, required: true }
  ],
  promos: [
    { name: 'percentage', label: 'Percentage', type: 'number', required: true },
    { name: 'productId', label: 'Product ID', type: 'relation-search', required: true, relation: 'product' },
    { name: 'active', label: 'Active', type: 'checkbox', required: true }
  ],
  orders: [
    { name: 'date', label: 'Date', type: 'datetime-local', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: ORDER_STATUSES },
    { name: 'userId', label: 'User ID', type: 'relation-search', required: true, relation: 'user' },
    { name: 'cartId', label: 'Cart ID', type: 'relation-search', required: true, relation: 'cart' },
    { name: 'total', label: 'Total', type: 'number', required: true }
  ]
};

const initialRecordsByTab: Record<AdminTab, EntityRecord[]> = {
  users: [
    { id: 1, username: 'admin', email: 'admin@aio.com', password: 'admin123', firstName: 'Admin', lastName: 'Main', roleId: 1 },
    { id: 2, username: 'user', email: 'user@aio.com', password: 'user123', firstName: 'User', lastName: 'Demo', roleId: 2 }
  ],
  products: [
    { id: 1, name: 'Nexus-9 Core Hub', description: 'Central control node', price: 599, stock: 12, active: true, sellerId: 1, categoryId: 1 },
    { id: 2, name: 'AI-O Core Hub', description: 'Premium smart hub', price: 1249, stock: 8, active: true, sellerId: 1, categoryId: 2 }
  ],
  categories: [
    { id: 1, name: 'CORE NODE', description: 'Central nodes' },
    { id: 2, name: 'ACOUSTIC', description: 'Audio devices' },
    { id: 3, name: 'SECURITY', description: 'Sensors and alarms' }
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

const tabTitles: Record<AdminTab, string> = {
  users: 'User management',
  products: 'Product management',
  categories: 'Category management',
  promos: 'Promotions and discounts management',
  orders: 'Order management'
};

const tabSingulars: Record<AdminTab, string> = {
  users: 'user',
  products: 'product',
  categories: 'category',
  promos: 'discount',
  orders: 'order'
};

const initialOrderItems: OrderItemRecord[] = [
  { id: 1, orderId: 881, productId: 1, quantity: 1, unitPrice: 599 },
  { id: 2, orderId: 882, productId: 2, quantity: 1, unitPrice: 1249 },
  { id: 3, orderId: 883, productId: 1, quantity: 2, unitPrice: 599 },
  { id: 4, orderId: 883, productId: 2, quantity: 1, unitPrice: 1249 },
  { id: 5, orderId: 885, productId: 2, quantity: 1, unitPrice: 1249 },
  { id: 6, orderId: 885, productId: 1, quantity: 1, unitPrice: 599 }
];

const initialProductImages: Record<number, ProductImage[]> = {
  1: [],
  2: []
};

function toInputValue(value: string | number | boolean | undefined): string {
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (value === undefined) return '';
  return String(value);
}

function buildEmptyRecord(tab: AdminTab, existingRecords: EntityRecord[]): EntityRecord {
  const nextId = Math.max(0, ...existingRecords.map((record) => record.id)) + 1;
  const empty: EntityRecord = { id: nextId };

  fieldsByTab[tab].forEach((field) => {
    if (field.type === 'checkbox') {
      empty[field.name] = true;
      return;
    }
    if (field.type === 'number') {
      empty[field.name] = 0;
      return;
    }
    if (field.type === 'select') {
      empty[field.name] = 'CREATED';
      return;
    }
    empty[field.name] = '';
  });

  return empty;
}

function renderCardSummary(tab: AdminTab, record: EntityRecord): { title: string; subtitle: string } {
  if (tab === 'users') {
    const roleText = Number(record.roleId) === 1 ? 'ADMIN' : 'USER';
    return {
      title: String(record.username),
      subtitle: `${String(record.email)} - ${roleText}`
    };
  }

  if (tab === 'products') {
    return {
      title: String(record.name),
      subtitle: `$${Number(record.price).toFixed(2)} - Category #${String(record.categoryId)}`
    };
  }

  if (tab === 'categories') {
    return {
      title: String(record.name),
      subtitle: String(record.description)
    };
  }

  if (tab === 'promos') {
    const activeText = record.active ? 'ACTIVE' : 'INACTIVE';
    return {
      title: `Discount #${String(record.id)}`,
      subtitle: `${String(record.percentage)}% - Product #${String(record.productId)} - ${activeText}`
    };
  }

  return {
    title: `Order #${String(record.id)}`,
    subtitle: `${String(record.status)} - $${Number(record.total).toFixed(2)}`
  };
}

export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recordsByTab, setRecordsByTab] = useState<Record<AdminTab, EntityRecord[]>>(initialRecordsByTab);
  const [orderItems, setOrderItems] = useState<OrderItemRecord[]>(initialOrderItems);
  const [productImagesByProduct, setProductImagesByProduct] = useState<Record<number, ProductImage[]>>(initialProductImages);
  const [editingRecord, setEditingRecord] = useState<EntityRecord | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<EntityRecord | null>(null);
  const [orderItemForm, setOrderItemForm] = useState({ productId: '', quantity: '1' });
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const editModal = useModal();
  const deleteModal = useModal();
  const productImagesModal = useModal<number>();
  const deleteImageModal = useModal<number>();
  const orderItemsModal = useModal<number>();
  const addOrderItemModal = useModal();
  const deleteOrderItemModal = useModal<number>();

  useEffect(() => {
    return () => {
      Object.values(productImagesByProduct).flat().forEach((image) => {
        if (image.url.startsWith('blob:')) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, [productImagesByProduct]);

  const activeTab = (searchParams.get('tab') as AdminTab) || 'users';

  const records = recordsByTab[activeTab] ?? [];

  const calculateOrderTotal = (orderId: number) => {
    return orderItems
      .filter((item) => item.orderId === orderId)
      .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const syncOrderTotal = (orderId: number, nextItems: OrderItemRecord[]) => {
    const nextTotal = nextItems
      .filter((item) => item.orderId === orderId)
      .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    setRecordsByTab((current) => ({
      ...current,
      orders: (current.orders ?? []).map((record) => (
        Number(record.id) === Number(orderId)
          ? { ...record, total: nextTotal }
          : record
      ))
    }));
  };

  const getRelationOptions = (relation: FieldConfig['relation']) => {
    if (relation === 'role') {
      return [
        { value: '1', label: 'ADMIN' },
        { value: '2', label: 'USER' }
      ];
    }

    if (relation === 'user') {
      return (recordsByTab.users ?? []).map((record) => ({
        value: String(record.id),
        label: `${String(record.username ?? '')} - ${String(record.email ?? '')}`
      }));
    }

    if (relation === 'category') {
      return (recordsByTab.categories ?? []).map((record) => ({
        value: String(record.id),
        label: String(record.name ?? '')
      }));
    }

    if (relation === 'product') {
      return (recordsByTab.products ?? []).map((record) => ({
        value: String(record.id),
        label: String(record.name ?? '')
      }));
    }

    if (relation === 'cart') {
      const cartIds = [...new Set((recordsByTab.orders ?? []).map((record) => Number(record.cartId)).filter((id) => !Number.isNaN(id)))];
      return cartIds.map((id) => ({ value: String(id), label: `Cart #${id}` }));
    }

    return [];
  };

  const openCreate = () => {
    const next = buildEmptyRecord(activeTab, recordsByTab[activeTab] ?? []);
    setEditingRecord(next);

    const initialFormValues = Object.fromEntries(
      fieldsByTab[activeTab].map((field) => [field.name, toInputValue(next[field.name])])
    );

    setFormValues(initialFormValues);
    editModal.open();
  };

  const openEdit = (record: EntityRecord) => {
    setEditingRecord(record);
    const initialFormValues = Object.fromEntries(
      fieldsByTab[activeTab].map((field) => [field.name, toInputValue(record[field.name])])
    );
    setFormValues(initialFormValues);
    editModal.open();
  };

  const submitRecord = () => {
    if (!editingRecord) return;

    const nextRecord: EntityRecord = { id: editingRecord.id };
    fieldsByTab[activeTab].forEach((field) => {
      const raw = formValues[field.name] ?? '';
      if (field.type === 'number' || field.type === 'relation-search') {
        nextRecord[field.name] = Number(raw || 0);
        return;
      }
      if (field.type === 'checkbox') {
        nextRecord[field.name] = raw === 'true';
        return;
      }
      nextRecord[field.name] = raw;
    });

    setRecordsByTab((current) => {
      const currentTabRecords = current[activeTab] ?? [];
      const index = currentTabRecords.findIndex((record) => record.id === editingRecord.id);
      const nextTabRecords = index >= 0
        ? currentTabRecords.map((record) => (record.id === editingRecord.id ? nextRecord : record))
        : [...currentTabRecords, nextRecord];

      return {
        ...current,
        [activeTab]: nextTabRecords
      };
    });

    editModal.close();
  };

  const getCardSummary = (tab: AdminTab, record: EntityRecord) => {
    if (tab === 'orders') {
      return {
        title: `Order #${String(record.id)}`,
        subtitle: `${String(record.status)} - $${calculateOrderTotal(Number(record.id)).toFixed(2)}`
      };
    }

    if (tab === 'categories') {
      const productCount = (recordsByTab.products ?? []).filter(
        (p) => Number(p.categoryId) === Number(record.id)
      ).length;
      return {
        title: String(record.name),
        subtitle: `${productCount} products`
      };
    }

    return renderCardSummary(tab, record);
  };

  const selectedProductImages = productImagesModal.payload ? (productImagesByProduct[productImagesModal.payload] ?? []) : [];
  const selectedOrderItems = orderItemsModal.payload ? orderItems.filter((item) => item.orderId === orderItemsModal.payload) : [];
  const selectedOrderTotalQty = selectedOrderItems.reduce((sum, item) => sum + item.quantity, 0);
  const selectedOrderTotalAmount = selectedOrderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const nextOrderItemId = Math.max(0, ...orderItems.map((item) => item.id)) + 1;

  const productOptions = (recordsByTab.products ?? []).map((record) => ({
    id: Number(record.id),
    name: String(record.name ?? ''),
    price: Number(record.price ?? 0)
  }));

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-8 md:py-12">
      <section className="glass-panel rounded-2xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-widest text-[#006970] font-bold mb-2">Administration area</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Administrative listings</h2>
        <p className="text-[#3b494b] max-w-3xl">Use this page to browse, create, update, and remove records across all available modules from a single place.</p>
      </section>

      <section className="glass-panel rounded-2xl p-3 md:p-4">
        <Tabs tabs={adminTabs} activeTab={activeTab} onChange={(tab) => setSearchParams({ tab })} />
      </section>

      <section className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{tabTitles[activeTab]}</h3>
          <Button onClick={openCreate}>New</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 text-sm">
          {records.map((record) => {
            const summary = getCardSummary(activeTab, record);
            return (
              <article key={record.id} className="rounded-xl border border-[#b9cacb66] p-4 bg-white/70 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate" title={summary.title}>{summary.title}</p>
                  <p className="text-[#3b494b] truncate" title={summary.subtitle}>{summary.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {activeTab === 'products' ? (
                    <div className="bg-[#f0edee] border border-[#b9cacb66] rounded-lg w-9 h-9 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => productImagesModal.open(Number(record.id))}
                        className="w-7 h-7 rounded hover:bg-white inline-flex items-center justify-center leading-none"
                        aria-label="Open product images"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#006970]">imagesmode</span>
                      </button>
                    </div>
                  ) : null}
                  {activeTab === 'orders' ? (
                    <div className="bg-[#f0edee] border border-[#b9cacb66] rounded-lg w-9 h-9 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => orderItemsModal.open(Number(record.id))}
                        className="w-7 h-7 rounded hover:bg-white inline-flex items-center justify-center leading-none"
                        aria-label="Open order items"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#006970]">receipt_long</span>
                      </button>
                    </div>
                  ) : null}
                  <div className="bg-[#f0edee] border border-[#b9cacb66] rounded-lg w-9 h-9 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => openEdit(record)}
                      className="w-7 h-7 rounded hover:bg-white inline-flex items-center justify-center leading-none"
                      aria-label="Edit record"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#006970]">edit</span>
                    </button>
                  </div>
                  <div className="bg-[#f0edee] border border-[#b9cacb66] rounded-lg w-9 h-9 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteRecord(record);
                        deleteModal.open();
                      }}
                      className="w-7 h-7 rounded hover:bg-white inline-flex items-center justify-center leading-none"
                      aria-label="Delete record"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#006970]">delete</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {editModal.isOpen ? (
        <div className="fixed inset-0 z-[60] modal-backdrop px-4 py-6 md:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  {(() => {
                    const isEditing = (recordsByTab[activeTab] ?? []).some((r) => r.id === editingRecord?.id);
                    return (
                      <>
                        <p className="text-xs uppercase tracking-widest text-[#006970] font-bold mb-2">{isEditing ? 'Edit record' : 'New record'}</p>
                        <h3 className="text-2xl font-bold">{isEditing ? `Edit ${tabSingulars[activeTab]}` : `Create ${tabSingulars[activeTab]}`}</h3>
                      </>
                    );
                  })()}
                </div>
                <button type="button" onClick={editModal.close} className="w-9 h-9 rounded-lg border border-[#b9cacb66] hover:bg-[#f0edee] inline-flex items-center justify-center" aria-label="Close edit popup">
                  <span className="material-symbols-outlined text-[20px] text-[#3b494b]">close</span>
                </button>
              </div>

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitRecord();
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ...fieldsByTab[activeTab].filter((f) => f.type !== 'checkbox'),
                    ...fieldsByTab[activeTab].filter((f) => f.type === 'checkbox')
                  ].map((field) => {
                    if (field.type === 'checkbox') {
                      return (
                        <label key={field.name} className="rounded-xl border border-[#b9cacb66] p-3 flex items-center justify-between gap-3 md:col-span-2">
                          <span className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">{field.label}</span>
                          <input
                            type="checkbox"
                            checked={formValues[field.name] === 'true'}
                            onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: String(event.target.checked) }))}
                            className="w-5 h-5 rounded border-[#b9cacb66] text-[#006970] focus:ring-[#006970]"
                          />
                        </label>
                      );
                    }

                    if (field.type === 'select') {
                      return (
                        <label key={field.name} className="flex flex-col gap-2 md:col-span-2">
                          <span className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">{field.label}</span>
                          <select
                            value={formValues[field.name] ?? 'CREATED'}
                            onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))}
                            className="rounded-lg border border-[#b9cacb66] bg-white/90 px-3 py-2 text-sm focus:border-[#006970] focus:ring-[#006970]"
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </label>
                      );
                    }

                    if (field.type === 'textarea') {
                      return (
                        <label key={field.name} className={`flex flex-col gap-2 ${field.fullWidth ? 'md:col-span-2' : ''}`}>
                          <span className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">{field.label}</span>
                          <textarea
                            rows={3}
                            required={field.required}
                            value={formValues[field.name] ?? ''}
                            onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))}
                            className="rounded-lg border border-[#b9cacb66] bg-white/90 px-3 py-2 text-sm focus:border-[#006970] focus:ring-[#006970]"
                          />
                        </label>
                      );
                    }

                    if (field.type === 'relation-search') {
                      const listId = `relation-options-${activeTab}-${field.name}`;
                      const options = getRelationOptions(field.relation);
                      return (
                        <label key={field.name} className={`flex flex-col gap-2 ${field.fullWidth ? 'md:col-span-2' : ''}`}>
                          <span className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">{field.label}</span>
                          <input
                            type="search"
                            required={field.required}
                            list={listId}
                            value={formValues[field.name] ?? ''}
                            onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))}
                            className="rounded-lg border border-[#b9cacb66] bg-white/90 px-3 py-2 text-sm focus:border-[#006970] focus:ring-[#006970]"
                            placeholder="Search and select ID"
                          />
                          <datalist id={listId}>
                            {options.map((option) => (
                              <option key={`${listId}-${option.value}`} value={option.value} label={option.label} />
                            ))}
                          </datalist>
                        </label>
                      );
                    }

                    return (
                      <label key={field.name} className={`flex flex-col gap-2 ${field.fullWidth ? 'md:col-span-2' : ''}`}>
                        <span className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">{field.label}</span>
                        <input
                          type={field.type}
                          required={field.required}
                          value={formValues[field.name] ?? ''}
                          onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))}
                          className="rounded-lg border border-[#b9cacb66] bg-white/90 px-3 py-2 text-sm focus:border-[#006970] focus:ring-[#006970]"
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="secondary" type="button" onClick={editModal.close}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {deleteModal.isOpen ? (
        <div className="fixed inset-0 z-[60] modal-backdrop px-4 py-6 md:p-8 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8d2f39] font-bold mb-2">Confirmation required</p>
                  <h3 className="text-2xl font-bold">Delete record</h3>
                </div>
                <button type="button" onClick={deleteModal.close} className="w-9 h-9 rounded-lg border border-[#b9cacb66] hover:bg-[#f0edee] inline-flex items-center justify-center" aria-label="Close delete popup">
                  <span className="material-symbols-outlined text-[20px] text-[#3b494b]">close</span>
                </button>
              </div>

              <p className="text-[#3b494b] mb-6 whitespace-pre-line">
                {deleteRecord
                  ? `Are you sure you want to delete "${getCardSummary(activeTab, deleteRecord).title}"?\nThis action cannot be undone.`
                  : 'Are you sure?'}
              </p>

              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" type="button" onClick={deleteModal.close}>Cancel</Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => {
                    if (deleteRecord) {
                      setRecordsByTab((current) => ({
                        ...current,
                        [activeTab]: (current[activeTab] ?? []).filter((record) => record.id !== deleteRecord.id)
                      }));
                    }
                    deleteModal.close();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {productImagesModal.isOpen ? (
        <div className="fixed inset-0 z-[70] modal-backdrop px-4 py-6 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#006970] font-bold mb-2">Image management</p>
                  <h3 className="text-2xl font-bold">
                    {(() => {
                      const pid = productImagesModal.payload;
                      if (pid === null) return 'Product images';
                      const productName = String((recordsByTab.products ?? []).find((p) => p.id === pid)?.name ?? pid);
                      return `Images of ${productName}`;
                    })()}
                  </h3>
                </div>
                <button type="button" onClick={productImagesModal.close} className="w-9 h-9 rounded-lg border border-[#b9cacb66] hover:bg-[#f0edee] inline-flex items-center justify-center" aria-label="Close product images popup">
                  <span className="material-symbols-outlined text-[20px] text-[#3b494b]">close</span>
                </button>
              </div>

              <label className="flex flex-col gap-2 mb-5">
                <span className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">Upload images</span>
                <input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                  className="rounded-lg border border-[#b9cacb66] bg-white/90 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#006970] file:px-3 file:py-1.5 file:text-white file:font-semibold"
                  onChange={(event) => {
                    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith('image/'));
                    const productId = productImagesModal.payload;
                    if (productId === null || !files.length) return;

                    setProductImagesByProduct((current) => {
                      const currentImages = current[productId] ?? [];
                      const nextImages = files.map((file, index) => ({
                        id: Date.now() + index,
                        url: URL.createObjectURL(file),
                        name: file.name
                      }));

                      return {
                        ...current,
                        [productId]: [...currentImages, ...nextImages]
                      };
                    });
                    event.target.value = '';
                  }}
                />
              </label>

              <p className="text-xs text-[#3b494b] mb-3">Click a preview to open the image in a new tab.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {selectedProductImages.length === 0 ? (
                  <p className="text-sm text-[#3b494b] col-span-full">There are no uploaded images for this product yet.</p>
                ) : selectedProductImages.map((image, index) => (
                  <article key={image.id} className="relative rounded-xl overflow-hidden border border-[#b9cacb66] bg-white/80 group">
                    <button
                      type="button"
                      className="w-full h-28 block"
                      onClick={() => {
                        globalThis.open(image.url, '_blank');
                      }}
                    >
                      <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteImageModal.open(index)}
                      className="absolute top-1 right-1 w-7 h-7 rounded-md bg-[#8d2f39] text-white inline-flex items-center justify-center opacity-90 hover:opacity-100"
                      aria-label="Delete image"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </article>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-5">
                <Button variant="secondary" type="button" onClick={productImagesModal.close}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {deleteImageModal.isOpen ? (
        <div className="fixed inset-0 z-[80] modal-backdrop px-4 py-6 md:p-8 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8d2f39] font-bold mb-2">Confirmation required</p>
                  <h3 className="text-2xl font-bold">Delete image</h3>
                </div>
                <button type="button" onClick={deleteImageModal.close} className="w-9 h-9 rounded-lg border border-[#b9cacb66] hover:bg-[#f0edee] inline-flex items-center justify-center" aria-label="Close delete image popup">
                  <span className="material-symbols-outlined text-[20px] text-[#3b494b]">close</span>
                </button>
              </div>
              <p className="text-[#3b494b] mb-6 whitespace-pre-line">Are you sure you want to delete this image?{'\n'}This action cannot be undone.</p>
              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" type="button" onClick={deleteImageModal.close}>Cancel</Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => {
                    const productId = productImagesModal.payload;
                    const deleteIndex = deleteImageModal.payload;
                    if (productId === null || deleteIndex === null) {
                      deleteImageModal.close();
                      return;
                    }

                    setProductImagesByProduct((current) => {
                      const currentImages = current[productId] ?? [];
                      const imageToRemove = currentImages[deleteIndex];
                      if (imageToRemove?.url.startsWith('blob:')) {
                        URL.revokeObjectURL(imageToRemove.url);
                      }

                      return {
                        ...current,
                        [productId]: currentImages.filter((_, index) => index !== deleteIndex)
                      };
                    });
                    deleteImageModal.close();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {orderItemsModal.isOpen ? (
        <div className="fixed inset-0 z-[70] modal-backdrop px-4 py-6 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#006970] font-bold mb-2">Item management</p>
                  <h3 className="text-2xl font-bold">Order #{orderItemsModal.payload} items</h3>
                </div>
                <button type="button" onClick={orderItemsModal.close} className="w-9 h-9 rounded-lg border border-[#b9cacb66] hover:bg-[#f0edee] inline-flex items-center justify-center" aria-label="Close order items popup">
                  <span className="material-symbols-outlined text-[20px] text-[#3b494b]">close</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-xl border border-[#b9cacb66] bg-white/80 p-4 flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">Total order items</p>
                  <p className="text-2xl font-bold text-[#006970]">{selectedOrderItems.length}</p>
                </div>
                <div className="rounded-xl border border-[#b9cacb66] bg-white/80 p-4 flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">Total product quantity</p>
                  <p className="text-2xl font-bold text-[#006970]">{selectedOrderTotalQty}</p>
                </div>
                <div className="rounded-xl border border-[#b9cacb66] bg-white/80 p-4 flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">Order total</p>
                  <p className="text-2xl font-bold text-[#006970]">${selectedOrderTotalAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center justify-end mb-3">
                <button type="button" onClick={() => addOrderItemModal.open()} className="px-3 py-2 rounded-lg text-xs font-bold bg-[#006970] text-white inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  {' '}Add item
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#b9cacb66]">
                <table className="w-full text-sm">
                  <thead className="bg-[#f0edee] text-xs uppercase tracking-wide text-[#3b494b]">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold w-12">#</th>
                      <th className="px-4 py-3 text-left font-semibold">Product</th>
                      <th className="px-4 py-3 text-right font-semibold w-24">Quantity</th>
                      <th className="px-4 py-3 text-right font-semibold w-28">Unit price</th>
                      <th className="px-4 py-3 text-right font-semibold w-28">Total</th>
                      <th className="px-4 py-3 w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#b9cacb33]">
                    {selectedOrderItems.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-[#3b494b]">There are no items in this order.</td>
                      </tr>
                    ) : selectedOrderItems.map((item, index) => {
                      const product = (recordsByTab.products ?? []).find((record) => Number(record.id) === item.productId);
                      const productName = String(product?.name ?? `Product #${item.productId}`);
                      return (
                        <tr key={item.id} className="hover:bg-white/60 transition-colors">
                          <td className="px-4 py-3 text-[#3b494b] font-semibold">#{index + 1}</td>
                          <td className="px-4 py-3 max-w-[180px] truncate" title={productName}>{productName}</td>
                          <td className="px-4 py-3 text-right">{item.quantity}</td>
                          <td className="px-4 py-3 text-right">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right font-semibold">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <button type="button" onClick={() => deleteOrderItemModal.open(item.id)} className="w-7 h-7 rounded-md bg-[#8d2f39] text-white inline-flex items-center justify-center opacity-90 hover:opacity-100" aria-label="Delete order item">
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-end gap-2 pt-5">
                <Button variant="secondary" type="button" onClick={orderItemsModal.close}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {addOrderItemModal.isOpen ? (
        <div className="fixed inset-0 z-[80] modal-backdrop px-4 py-6 md:p-8 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#006970] font-bold mb-2">New item</p>
                  <h3 className="text-2xl font-bold">Add order item</h3>
                </div>
                <button type="button" onClick={addOrderItemModal.close} className="w-9 h-9 rounded-lg border border-[#b9cacb66] hover:bg-[#f0edee] inline-flex items-center justify-center" aria-label="Close add order item popup">
                  <span className="material-symbols-outlined text-[20px] text-[#3b494b]">close</span>
                </button>
              </div>

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const orderId = orderItemsModal.payload;
                  if (orderId === null) return;

                  const productId = Number(orderItemForm.productId);
                  const quantity = Number(orderItemForm.quantity);
                  if (!productId || !quantity || quantity < 1) return;

                  const product = productOptions.find((option) => option.id === productId);
                  const nextUnitPrice = product ? Number(product.price) : 0;

                  const nextItem: OrderItemRecord = {
                    id: nextOrderItemId,
                    orderId,
                    productId,
                    quantity,
                    unitPrice: nextUnitPrice
                  };

                  setOrderItems((current) => {
                    const nextItems = [...current, nextItem];
                    syncOrderTotal(orderId, nextItems);
                    return nextItems;
                  });

                  setOrderItemForm({ productId: '', quantity: '1' });
                  addOrderItemModal.close();
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">Product ID</span>
                    <input
                      type="search"
                      list="order-item-product-options"
                      required
                      value={orderItemForm.productId}
                      onChange={(event) => setOrderItemForm((current) => ({ ...current, productId: event.target.value }))}
                      className="rounded-lg border border-[#b9cacb66] bg-white/90 px-3 py-2 text-sm focus:border-[#006970] focus:ring-[#006970]"
                      placeholder="Search and select ID"
                    />
                    <datalist id="order-item-product-options">
                      {productOptions.map((option) => (
                        <option key={`product-option-${option.id}`} value={String(option.id)} label={option.name} />
                      ))}
                    </datalist>
                  </label>
                  <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-xs uppercase tracking-wide text-[#3b494b] font-semibold">Quantity</span>
                    <input
                      type="number"
                      min={1}
                      required
                      value={orderItemForm.quantity}
                      onChange={(event) => setOrderItemForm((current) => ({ ...current, quantity: event.target.value }))}
                      className="rounded-lg border border-[#b9cacb66] bg-white/90 px-3 py-2 text-sm focus:border-[#006970] focus:ring-[#006970]"
                    />
                  </label>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="secondary" type="button" onClick={addOrderItemModal.close}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {deleteOrderItemModal.isOpen ? (
        <div className="fixed inset-0 z-[90] modal-backdrop px-4 py-6 md:p-8 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8d2f39] font-bold mb-2">Confirmation required</p>
                  <h3 className="text-2xl font-bold">Delete item</h3>
                </div>
                <button type="button" onClick={deleteOrderItemModal.close} className="w-9 h-9 rounded-lg border border-[#b9cacb66] hover:bg-[#f0edee] inline-flex items-center justify-center" aria-label="Close delete order item popup">
                  <span className="material-symbols-outlined text-[20px] text-[#3b494b]">close</span>
                </button>
              </div>
              <p className="text-[#3b494b] mb-6 whitespace-pre-line">Are you sure you want to delete this order item?{'\n'}This action cannot be undone.</p>
              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" type="button" onClick={deleteOrderItemModal.close}>Cancel</Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => {
                    const orderId = orderItemsModal.payload;
                    const orderItemId = deleteOrderItemModal.payload;
                    if (orderId === null || orderItemId === null) {
                      deleteOrderItemModal.close();
                      return;
                    }

                    setOrderItems((current) => {
                      const nextItems = current.filter((item) => item.id !== orderItemId);
                      syncOrderTotal(orderId, nextItems);
                      return nextItems;
                    });
                    deleteOrderItemModal.close();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}