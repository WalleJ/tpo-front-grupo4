import type { AdminRecord } from '@/types/admin.types';
import { Button } from '@/components/ui';

interface AdminTableRowProps {
  record: AdminRecord;
  onEdit: (record: AdminRecord) => void;
  onDelete: (record: AdminRecord) => void;
}

export function AdminTableRow({ record, onEdit, onDelete }: AdminTableRowProps) {
  return (
    <tr className="border-b border-[#b9cacb33] hover:bg-white/60 transition-colors">
      <td className="px-4 py-3">#{record.id}</td>
      <td className="px-4 py-3 font-semibold">{record.title}</td>
      <td className="px-4 py-3 text-[#3b494b]">{record.subtitle}</td>
      <td className="px-4 py-3 text-right">
        <div className="inline-flex gap-2">
          <Button variant="secondary" className="px-2 py-1" onClick={() => onEdit(record)}>Edit</Button>
          <Button variant="danger" className="px-2 py-1" onClick={() => onDelete(record)}>Delete</Button>
        </div>
      </td>
    </tr>
  );
}