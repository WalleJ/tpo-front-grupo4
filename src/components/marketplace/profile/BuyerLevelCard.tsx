interface BuyerLevelCardProps {
  monthly: number;
  percent: number;
}

export function BuyerLevelCard({ monthly, percent }: BuyerLevelCardProps) {
  return (
    <div className="md:col-span-12 glass-panel rounded-xl p-md">
      <h2 className="font-headline-sm text-headline-sm mb-sm">Buyer Level</h2>
      <div className="h-3 w-full rounded-full bg-surface-container-low border border-outline-variant/30 overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-body-sm text-on-surface-variant mt-sm">{monthly}/50 purchases this month ({percent}% of monthly goal)</p>
    </div>
  );
}