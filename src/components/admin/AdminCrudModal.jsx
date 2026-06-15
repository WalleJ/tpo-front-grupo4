import { useForm } from "react-hook-form";
import { Modal, Button, Input } from "@/components/ui";
function AdminCrudModal({ isOpen, tabLabel, record, onClose, onSave }) {
  const { register, handleSubmit, reset } = useForm({
    values: {
      title: record?.title ?? "",
      subtitle: record?.subtitle ?? ""
    }
  });
  const submit = handleSubmit((data) => {
    onSave({ id: record?.id ?? Date.now(), ...data });
    reset();
  });
  return <Modal
    isOpen={isOpen}
    title={record ? `Edit ${tabLabel}` : `Create ${tabLabel}`}
    subtitle={record ? "Edit record" : "New record"}
    onClose={onClose}
    footer={<div className="flex items-center justify-end gap-2 pt-4"><Button variant="secondary" onClick={onClose} type="button">Cancel</Button><Button onClick={submit} type="button">Save</Button></div>}
  ><form className="space-y-4" onSubmit={submit}><Input label="Title" {...register("title", { required: true })} /><Input label="Subtitle" {...register("subtitle", { required: true })} /></form></Modal>;
}
export {
  AdminCrudModal
};
