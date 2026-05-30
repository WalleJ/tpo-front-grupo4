import { Outlet, useNavigate } from 'react-router-dom';
import { Header, Badge, Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mesh-gradient min-h-screen">
      <Header
        title="AI-O ADMIN"
        icon={<span className="material-symbols-outlined text-[#006970]">admin_panel_settings</span>}
        rightSlot={(
          <div className="flex items-center gap-2">
            <Badge>ADMIN</Badge>
            <Button variant="secondary" onClick={() => { logout(); navigate('/auth/login'); }}>Log out</Button>
          </div>
        )}
      />
      <Outlet />
    </div>
  );
}