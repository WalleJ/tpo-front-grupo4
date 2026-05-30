import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AdminRecord, AdminTab } from '@/types/admin.types';
import { adminService } from '@/services/admin.service';
import { Tabs, Button } from '@/components/ui';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminCrudModal } from '@/components/admin/AdminCrudModal';
import { AdminTable } from '@/components/admin/table/AdminTable';
import { AdminFilters } from '@/components/admin/AdminFilters';
import { useModal } from '@/hooks/useModal';

const adminTabs: { id: AdminTab; label: string }[] = [
  { id: 'users', label: 'Users' },
  { id: 'products', label: 'Products' },
  { id: 'categories', label: 'Categories' },
  { id: 'promos', label: 'Promos and discounts' },
  { id: 'orders', label: 'Orders' }
];

export function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [search, setSearch] = useState('');
  const [editingRecord, setEditingRecord] = useState<AdminRecord | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<AdminRecord | null>(null);
  const editModal = useModal();
  const deleteModal = useModal();

  const activeTab = (searchParams.get('tab') as AdminTab) || 'users';

  useEffect(() => {
    adminService.listByTab(activeTab).then(setRecords);
  }, [activeTab]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return records;
    return records.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(q));
  }, [records, search]);

  const tabLabel = adminTabs.find((tab) => tab.id === activeTab)?.label ?? activeTab;

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-8 md:py-12 space-y-6">
      <section className="glass-panel rounded-2xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-widest text-[#006970] font-bold mb-2">Administration area</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Administrative listings</h2>
        <p className="text-[#3b494b] max-w-3xl">Use this page to browse, create, update, and remove records across all available modules from a single place.</p>
      </section>

      <section className="glass-panel rounded-2xl p-3 md:p-4">
        <Tabs tabs={adminTabs} activeTab={activeTab} onChange={(tab) => setSearchParams({ tab })} />
      </section>

      <section className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-xl font-semibold">{tabLabel} management</h3>
          <div className="flex gap-3">
            <AdminSearchBar value={search} onChange={setSearch} />
            <Button onClick={() => { setEditingRecord(null); editModal.open(); }}>New</Button>
          </div>
        </div>
        <AdminFilters activeTab={activeTab} />
        <AdminTable
          records={filtered}
          onEdit={(item) => {
            setEditingRecord(item);
            editModal.open();
          }}
          onDelete={(item) => {
            setDeleteRecord(item);
            deleteModal.open();
          }}
        />
      </section>

      <AdminCrudModal
        isOpen={editModal.isOpen}
        tabLabel={tabLabel}
        record={editingRecord}
        onClose={editModal.close}
        onSave={(payload) => {
          setRecords((prev) => {
            const index = prev.findIndex((item) => item.id === payload.id);
            if (index === -1) return [...prev, payload];
            const copy = [...prev];
            copy[index] = payload;
            return copy;
          });
          editModal.close();
        }}
      />

      <AdminCrudModal
        isOpen={deleteModal.isOpen}
        tabLabel="record"
        record={deleteRecord}
        onClose={deleteModal.close}
        onSave={() => {
          if (deleteRecord) {
            setRecords((prev) => prev.filter((item) => item.id !== deleteRecord.id));
          }
          deleteModal.close();
        }}
      />
    </main>
  );
}