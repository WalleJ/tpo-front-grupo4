import type { UserProfile } from '@/types/marketplace.types';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <section className="mb-lg">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-md">
        <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-primary/20 p-1 bg-surface">
          <img alt="Profile" className="w-full h-full object-cover rounded-lg" src={profile.avatarImage} />
        </div>
        <div className="text-center md:text-left flex-1">
          <span className="font-label-caps text-label-caps text-primary-fixed-dim bg-on-primary-fixed-variant px-3 py-1 rounded-full mb-base inline-block">{profile.roleLabel}</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">{profile.displayName}</h1>
          <p className="font-body-md text-on-surface-variant">{profile.location}</p>
        </div>
      </div>
    </section>
  );
}