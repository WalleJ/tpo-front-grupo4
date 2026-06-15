function ProfileHeader({ profile, showAdminButton, onAdminDashboard, onEditProfile, onLogout }) {
  const resolvedAvatar = profile.avatarImage?.trim() || "/images/avatars/avatar1.png";
  return <section className="mb-lg"><div className="flex flex-col md:flex-row items-center md:items-end gap-md"><div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-primary/20 p-1 bg-surface"><img
    alt="Profile"
    className="w-full h-full object-cover rounded-lg"
    src={resolvedAvatar}
    onError={(event) => {
      if (event.currentTarget.src.endsWith("/images/avatars/avatar1.png")) return;
      event.currentTarget.src = "/images/avatars/avatar1.png";
    }}
  /></div><div className="text-center md:text-left flex-1"><span className="font-label-caps text-label-caps text-primary-fixed-dim bg-on-primary-fixed-variant px-3 py-1 rounded-full mb-base inline-block">{profile.roleLabel}</span><h1 className="font-headline-lg text-headline-lg text-on-surface">{profile.displayName}</h1><p className="font-body-md text-on-surface-variant inline-flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">location_on</span>{profile.location}</p></div><div className="flex gap-sm w-full md:w-auto">{showAdminButton ? <button
    type="button"
    onClick={onAdminDashboard}
    className="flex-1 md:flex-none px-md py-sm bg-primary text-on-primary font-label-caps text-label-caps rounded-xl hover:brightness-110 transition-all active:scale-95"
  >
              ADMIN DASHBOARD
            </button> : null}<button
    type="button"
    onClick={onEditProfile}
    className="flex-1 md:flex-none px-md py-sm bg-surface-container-high text-on-surface font-label-caps text-label-caps rounded-xl border border-outline-variant/30 hover:bg-surface-variant transition-all active:scale-95"
  >
            EDIT PROFILE
          </button><button
    type="button"
    onClick={onLogout}
    className="flex-1 md:flex-none px-md py-sm bg-error text-on-error font-label-caps text-label-caps rounded-xl hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-xs"
  ><span className="material-symbols-outlined text-[18px]">logout</span>LOGOUT
          </button></div></div></section>;
}
export {
  ProfileHeader
};
