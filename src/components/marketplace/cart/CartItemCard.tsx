import type { CartItem } from '@/types/marketplace.types';

interface CartItemCardProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  readOnly?: boolean;
}

export function CartItemCard({ item, onIncrease, onDecrease, onRemove, readOnly }: Readonly<CartItemCardProps>) {
  if (readOnly) {
    return (
      <div className="glass-panel rounded-xl p-md flex flex-col md:flex-row gap-md items-center">
        <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
          <img alt={item.title} className="w-full h-full object-cover" src={item.image} />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start gap-sm mb-xs">
            <h3 className="font-headline-sm text-headline-sm truncate">{item.title}</h3>
            <span className="font-headline-sm text-headline-sm shrink-0 text-primary-fixed-dim">${(item.unitPrice * item.quantity).toFixed(2)}</span>
          </div>
          <p className="text-on-surface-variant font-body-sm text-body-sm mb-sm two-line-clamp">{item.description}</p>
          <div className="flex items-center gap-xs flex-wrap">
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Qty:</span>
            <span className="font-label-caps text-label-caps bg-surface-container-low border border-outline-variant/30 px-sm py-xs rounded-lg">{String(item.quantity).padStart(2, '0')}</span>
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase ml-xs">Unit:</span>
            <span className="text-body-sm text-on-surface-variant">${item.unitPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl p-md flex flex-col md:flex-row gap-md items-center group hover:border-primary/40 transition-colors">
      <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
        <img alt={item.title} className="w-full h-full object-cover" src={item.image} />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-xs gap-sm">
          <h3 className="font-headline-sm text-headline-sm">{item.title}</h3>
          <span className="font-headline-sm text-headline-sm text-primary-fixed-dim">${(item.unitPrice * item.quantity).toFixed(2)}</span>
        </div>
        <p className="text-on-surface-variant font-body-sm text-body-sm mb-md">{item.description}</p>
        <div className="flex items-center gap-md flex-wrap">
          <div className="flex items-center gap-sm bg-surface-container-low border border-outline-variant/30 px-sm py-xs rounded-lg">
            <button type="button" onClick={onDecrease} disabled={readOnly} className="material-symbols-outlined text-on-surface-variant hover:text-primary disabled:opacity-50">remove</button>
            <span className="font-label-caps text-label-caps w-4 text-center">{String(item.quantity).padStart(2, '0')}</span>
            <button type="button" onClick={onIncrease} disabled={readOnly} className="material-symbols-outlined text-on-surface-variant hover:text-primary disabled:opacity-50">add</button>
          </div>
          <button type="button" onClick={onRemove} className="flex items-center gap-xs text-on-surface-variant hover:text-error transition-colors font-label-caps text-label-caps">
            <span className="material-symbols-outlined text-[18px]">delete</span>REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}