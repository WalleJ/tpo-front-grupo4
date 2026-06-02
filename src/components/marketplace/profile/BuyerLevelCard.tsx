interface BuyerLevelCardProps {
  monthly: number;
  percent: number;
}

export function BuyerLevelCard({ monthly, percent }: Readonly<BuyerLevelCardProps>) {
  return (
    <div className="md:col-span-12 glass-panel rounded-xl p-md flex flex-col gap-md">
      <div className="flex items-center gap-sm">
        <span className="material-symbols-outlined text-primary">military_tech</span>
        <h2 className="font-headline-sm text-headline-sm leading-none">Buyer Level</h2>
      </div>
      <div className="space-y-sm">
        <div className="flex items-baseline justify-between">
          <span className="text-body-sm text-on-surface-variant">Purchases in month</span>
          <span className="font-label-caps text-label-caps text-primary">{monthly}/50</span>
        </div>
        <div className="h-3 w-full rounded-full bg-surface-container-low border border-outline-variant/30 overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-body-sm text-on-surface-variant">{percent}% of monthly goal</p>
      </div>
    </div>
  );
}