import type { SupportClaim } from '@/types/marketplace.types';

interface SupportClaimsCardProps {
  claims: SupportClaim[];
}

export function SupportClaimsCard({ claims }: SupportClaimsCardProps) {
  return (
    <div className="md:col-span-6 glass-panel rounded-xl p-md">
      <h2 className="font-headline-sm text-headline-sm mb-sm">Support Claims</h2>
      <div className="space-y-sm">
        {claims.map((claim) => (
          <div key={`${claim.dateTime}-${claim.title}`} className="p-sm rounded-xl border border-outline-variant/20 bg-surface-container-low">
            <div className="text-xs text-on-surface-variant mb-1">{claim.dateTime}</div>
            <div className="font-semibold text-on-surface">{claim.title}</div>
            <div className="text-body-sm text-primary">{claim.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}