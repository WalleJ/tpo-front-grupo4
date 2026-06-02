import { Button } from '@/components/ui';
import type { AdminRecord } from '@/types/admin.types';

interface AdminRecordCardProps {
  record: AdminRecord;
  onEdit: (record: AdminRecord) => void;
  onDelete: (record: AdminRecord) => void;
}

export function AdminRecordCard({ record, onEdit, onDelete }: AdminRecordCardProps) {
  return (
    <article className="rounded-xl border border-outline-variant/40 p-4 bg-surface-container-lowest/80 flex items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="font-semibold truncate">{record.title}</p>
        <p className="text-on-surface-variant truncate">{record.subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="px-2 py-1" onClick={() => onEdit(record)}>Edit</Button>
        <Button variant="danger" className="px-2 py-1" onClick={() => onDelete(record)}>Delete</Button>
      </div>
    </article>
  );
}