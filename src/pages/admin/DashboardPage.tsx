import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { AdminStatCard as AdminStatCardType } from '@/types/admin.types';
import { adminService } from '@/services/admin.service';
import { AdminStatCard } from '@/components/admin/AdminStatCard';

const activity = [
  'Order #912 changed from CREATED to CONFIRMED.',
  'Promotion WINTER20 was created with weekly validity.',
  'The admin user updated the price of AI-O Core Hub.',
  'Category SMART LIVING was added to the catalog.',
  'Stock synchronized successfully for 24 products.',
  'Order #908 completed with status DELIVERED.'
];

export function DashboardPage() {
  const [stats, setStats] = useState<AdminStatCardType[]>([]);

  useEffect(() => {
    const refreshStats = () => {
      adminService.getStats().then(setStats);
    };

    refreshStats();

    const unsubscribe = adminService.subscribeToRecordsChanges(refreshStats);
    globalThis.addEventListener('focus', refreshStats);

    return () => {
      unsubscribe();
      globalThis.removeEventListener('focus', refreshStats);
    };
  }, []);

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-8 md:py-12 space-y-6">
      <section className="glass-panel rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Control center</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Administration dashboard</h2>
            <p className="text-on-surface-variant max-w-2xl">Use this dashboard to monitor activity and access every management module from one place.</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <Link to="/admin/listings?tab=users" className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold bg-surface-container-lowest border border-outline-variant/40 text-primary hover:bg-surface-container">Go to listings</Link>
            <Link to="/marketplace/home" className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold bg-primary/20 text-primary hover:bg-primary/25">Enter Home as user</Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((card) => <AdminStatCard key={card.tab} {...card} />)}
      </section>
      <section className="glass-panel rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-5">Recent activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-on-surface-variant">
          {activity.map((item) => (
            <article key={item} className="rounded-xl border border-outline-variant/30 dark:border-outline-variant/50 p-4 bg-surface-container-lowest dark:bg-surface-container-high">{item}</article>
          ))}
        </div>
      </section>
    </main>
  );
}