import { useEffect, useState } from "react";
function EditProfileModal({ isOpen, initialData, onClose, onRequestConfirm }) {
  const [form, setForm] = useState(initialData);
  useEffect(() => {
    if (isOpen) {
      setForm(initialData);
    }
  }, [isOpen, initialData]);
  if (!isOpen) return null;
  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };
  return <div className="fixed inset-0 z-[75] flex items-center justify-center p-md"><button type="button" className="absolute inset-0 bg-on-surface/45" onClick={onClose} aria-label="Close edit profile popup" /><div className="relative w-full max-w-xl glass-panel-white rounded-2xl border border-outline-variant/40 shadow-2xl p-lg"><div className="flex items-start justify-between gap-md mb-md"><div><h3 className="font-headline-md text-headline-md">Edit Profile</h3><p className="text-body-sm text-on-surface-variant mt-xs">Update your user data.</p></div><button type="button" className="p-2 rounded-lg hover:bg-primary/5 transition-colors" onClick={onClose} aria-label="Close edit profile popup"><span className="material-symbols-outlined text-on-surface-variant">close</span></button></div><form
    className="space-y-sm"
    onSubmit={(event) => {
      event.preventDefault();
      onRequestConfirm(form);
    }}
  ><div className="grid grid-cols-1 md:grid-cols-2 gap-sm"><label className="flex flex-col gap-xs"><span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Username</span><input
    type="text"
    required
    value={form.username}
    onChange={(event) => setField("username", event.target.value)}
    className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
  /></label><label className="flex flex-col gap-xs"><span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Password</span><input
    type="password"
    required
    value={form.password}
    onChange={(event) => setField("password", event.target.value)}
    className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
  /></label><label className="flex flex-col gap-xs"><span className="font-label-caps text-[10px] uppercase text-on-surface-variant">First Name</span><input
    type="text"
    required
    value={form.firstName}
    onChange={(event) => setField("firstName", event.target.value)}
    className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
  /></label><label className="flex flex-col gap-xs"><span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Last Name</span><input
    type="text"
    required
    value={form.lastName}
    onChange={(event) => setField("lastName", event.target.value)}
    className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
  /></label><label className="flex flex-col gap-xs md:col-span-2"><span className="font-label-caps text-[10px] uppercase text-on-surface-variant">Email</span><input
    type="email"
    required
    value={form.email}
    onChange={(event) => setField("email", event.target.value)}
    className="w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
  /></label></div><div className="flex justify-end gap-sm pt-xs"><button type="button" onClick={onClose} className="px-md py-sm rounded-xl border border-outline-variant/40 font-label-caps text-label-caps hover:bg-surface-container-low transition-colors">
              CANCEL
            </button><button type="submit" className="px-md py-sm rounded-xl bg-primary text-on-primary font-label-caps text-label-caps active:scale-95 transition-all">
              SAVE CHANGES
            </button></div></form></div></div>;
}
export {
  EditProfileModal
};
