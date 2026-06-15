import { AdminTableRow } from "@/components/admin/table/AdminTableRow";
function AdminTable({ records, onEdit, onDelete }) {
  return <div className="overflow-x-auto rounded-xl border border-outline-variant/40 bg-surface-container-lowest/80"><table className="w-full text-sm"><thead className="bg-surface-container text-xs uppercase tracking-wide text-on-surface-variant"><tr><th className="px-4 py-3 text-left">ID</th><th className="px-4 py-3 text-left">Title</th><th className="px-4 py-3 text-left">Subtitle</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody>{records.map((record) => <AdminTableRow key={record.id} record={record} onEdit={onEdit} onDelete={onDelete} />)}</tbody></table></div>;
}
export {
  AdminTable
};
