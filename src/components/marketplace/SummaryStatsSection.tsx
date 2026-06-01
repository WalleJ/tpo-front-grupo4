import { useMemo } from 'react';
import type { Product } from '@/types/product.types';

interface SummaryStatsSectionProps {
  products: Product[];
}

export function SummaryStatsSection({ products }: Readonly<SummaryStatsSectionProps>) {
  const stats = useMemo(() => {
    const topAssistantCount = new Set(products.map((item) => item.assistantKey)).size || 1;
    const hasMatter = products.some((item) => item.connectivityKeys.includes('matter'));
    return [
      { title: 'Top Assistants', value: String(topAssistantCount) },
      { title: 'Real Products', value: `${Math.max(products.length, 1)}+` },
      { title: 'Compatibility', value: hasMatter ? 'Matter' : 'Multi-protocol' },
      { title: 'Voice Control', value: '24/7' }
    ];
  }, [products]);

  return (
    <section className="border-y border-outline-variant/20 bg-surface-container-low py-md">
      <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-md text-center">
        {stats.map((stat) => (
          <article key={stat.title}>
            <p className="font-display text-headline-md text-primary">{stat.value}</p>
            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">{stat.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
