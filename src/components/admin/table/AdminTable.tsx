import type { AdminRecord } from '@/types/admin.types';
import { AdminTableRow } from '@/components/admin/table/AdminTableRow';

interface AdminTableProps {
  records: AdminRecord[];
  onEdit: (record: AdminRecord) => void;
  onDelete: (record: AdminRecord) => void;
}

export function AdminTable({ records, onEdit, onDelete }: AdminTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#b9cacb66] bg-white/70">
      <table className="w-full text-sm">
        <thead className="bg-[#f0edee] text-xs uppercase tracking-wide text-[#3b494b]">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Subtitle</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <AdminTableRow key={record.id} record={record} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}