import { Button } from "@/components/ui";
function AdminTableRow({ record, onEdit, onDelete }) {
  return <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors"><td className="px-4 py-3">#{record.id}</td><td className="px-4 py-3 font-semibold">{record.title}</td><td className="px-4 py-3 text-on-surface-variant">{record.subtitle}</td><td className="px-4 py-3 text-right"><div className="inline-flex gap-2"><Button variant="secondary" className="px-2 py-1" onClick={() => onEdit(record)}>Edit</Button><Button variant="danger" className="px-2 py-1" onClick={() => onDelete(record)}>Delete</Button></div></td></tr>;
}
export {
  AdminTableRow
};
