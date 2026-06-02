import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header, Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export function AdminLayout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/admin/dashboard';

  return (
    <div className="mesh-gradient min-h-screen">
      <Header
        title="AI-O ADMIN"
        icon={<span className="material-symbols-outlined text-primary">admin_panel_settings</span>}
        rightSlot={(
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-primary/5 transition-colors"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="material-symbols-outlined block leading-none text-on-surface-variant">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            {!isDashboard && (
              <Button variant="secondary" onClick={() => navigate('/admin/dashboard')}>Back to dashboard</Button>
            )}
            <Button
              variant="danger"
              className="bg-error text-on-error hover:opacity-90"
              onClick={() => { logout(); navigate('/auth/login'); }}
            >
              Log out
            </Button>
          </div>
        )}
      />
      <Outlet />
    </div>
  );
}