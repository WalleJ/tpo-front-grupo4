import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="mesh-gradient flex items-center justify-center min-h-screen p-4">
      <Outlet />
    </div>
  );
}