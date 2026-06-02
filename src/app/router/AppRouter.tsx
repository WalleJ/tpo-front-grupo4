import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { AdminLayout } from '@/app/layouts/AdminLayout';
import { MarketplaceLayout } from '@/app/layouts/MarketplaceLayout';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { RecoverPage } from '@/pages/auth/RecoverPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { ListingsPage } from '@/pages/admin/ListingsPage';
import { HomePage } from '@/pages/marketplace/HomePage';
import { StorePage } from '@/pages/marketplace/StorePage';
import { ProductPage } from '@/pages/marketplace/ProductPage';
import { CartPage } from '@/pages/marketplace/CartPage';
import { ProfilePage } from '@/pages/marketplace/ProfilePage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/recover" element={<RecoverPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/listings" element={<ListingsPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <MarketplaceLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/marketplace/home" element={<HomePage />} />
          <Route path="/marketplace/store" element={<StorePage />} />
          <Route path="/marketplace/product/:productId" element={<ProductPage />} />
          <Route path="/marketplace/cart" element={<CartPage />} />
          <Route path="/marketplace/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </>
  );
}
