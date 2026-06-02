import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketplaceFooter } from '@/components/layouts/MarketplaceFooter';
import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';
import { useProfileDashboard } from '@/hooks/useProfileDashboard';
import { ProfileHeader } from '@/components/marketplace/profile/ProfileHeader';
import { BuyerLevelCard } from '@/components/marketplace/profile/BuyerLevelCard';
import { LoginSessionsCard } from '@/components/marketplace/profile/LoginSessionsCard';
import { PaymentMethodsCard } from '@/components/marketplace/profile/PaymentMethodsCard';
import { SupportClaimsCard } from '@/components/marketplace/profile/SupportClaimsCard';
import { PurchaseHistoryTable } from '@/components/marketplace/profile/PurchaseHistoryTable';
import { OrderDetailModal } from '@/components/marketplace/profile/OrderDetailModal';
import { OrderItemsModal } from '@/components/marketplace/profile/OrderItemsModal';
import { DeletePaymentMethodModal } from '@/components/marketplace/profile/DeletePaymentMethodModal';
import { EditProfileModal } from '@/components/marketplace/profile/EditProfileModal';
import { ConfirmProfileUpdateModal } from '@/components/marketplace/profile/ConfirmProfileUpdateModal';
import type { ProfileData } from '@/types/marketplace.types';

function splitDisplayName(displayName: string) {
  const [firstName = '', ...lastParts] = displayName.trim().split(/\s+/);
  return {
    firstName: firstName || 'User',
    lastName: lastParts.join(' ') || 'Demo'
  };
}

function getInitialEditData(profileDisplayName: string, profileData?: ProfileData): ProfileData {
  if (profileData) return profileData;

  const { firstName, lastName } = splitDisplayName(profileDisplayName);
  return {
    username: firstName.toLowerCase() || 'user',
    email: 'user@aiohome.local',
    password: 'user',
    firstName,
    lastName
  };
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const orderDetailModal = useModal();
  const orderItemsModal = useModal();
  const deletePaymentModal = useModal<number>();
  const editProfileModal = useModal();
  const confirmProfileModal = useModal<ProfileData>();

  const {
    profile,
    selectedOrder,
    buyerLevel,
    setSelectedOrderId,
    deletePaymentMethod,
    saveProfile,
    getOrderTotal
  } = useProfileDashboard();

  const isAdmin = user?.role === 'ADMIN';
  const initialEditData = getInitialEditData(profile.displayName, profile.profileData);

  useEffect(() => {
    const hasOpenModal = editProfileModal.isOpen || confirmProfileModal.isOpen || orderDetailModal.isOpen || orderItemsModal.isOpen || deletePaymentModal.isOpen;
    document.body.classList.toggle('overflow-hidden', hasOpenModal);
    return () => document.body.classList.remove('overflow-hidden');
  }, [confirmProfileModal.isOpen, deletePaymentModal.isOpen, editProfileModal.isOpen, orderDetailModal.isOpen, orderItemsModal.isOpen]);

  return (
    <>
      <main className="pt-28 pb-16 px-gutter max-w-[1280px] mx-auto">
        <ProfileHeader
          profile={profile}
          showAdminButton={isAdmin}
          onAdminDashboard={() => {
            if (!isAdmin) return;
            navigate('/admin/dashboard');
          }}
          onEditProfile={() => editProfileModal.open()}
          onLogout={() => {
            logout();
            navigate('/auth/login');
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
          <BuyerLevelCard monthly={buyerLevel.monthly} percent={buyerLevel.percent} />
          <LoginSessionsCard sessions={profile.loginSessions} />
          <PaymentMethodsCard methods={profile.paymentMethods} onDeleteRequest={(index) => deletePaymentModal.open(index)} />
          <SupportClaimsCard claims={profile.supportClaims} />
          <PurchaseHistoryTable
            history={profile.history}
            getOrderTotal={getOrderTotal}
            onViewDetail={(orderId) => {
              setSelectedOrderId(orderId);
              orderDetailModal.open();
            }}
            onViewItems={(orderId) => {
              setSelectedOrderId(orderId);
              orderItemsModal.open();
            }}
            onDownloadInvoice={() => {}}
          />
        </div>
      </main>

      <OrderDetailModal
        isOpen={orderDetailModal.isOpen}
        order={selectedOrder}
        total={selectedOrder ? getOrderTotal(selectedOrder) : 0}
        onClose={orderDetailModal.close}
      />

      <OrderItemsModal
        isOpen={orderItemsModal.isOpen}
        order={selectedOrder}
        onClose={orderItemsModal.close}
      />

      <DeletePaymentMethodModal
        isOpen={deletePaymentModal.isOpen}
        onClose={deletePaymentModal.close}
        onConfirm={() => {
          if (typeof deletePaymentModal.payload === 'number') {
            deletePaymentMethod(deletePaymentModal.payload);
          }
          deletePaymentModal.close();
        }}
      />

      <EditProfileModal
        isOpen={editProfileModal.isOpen}
        initialData={initialEditData}
        onClose={editProfileModal.close}
        onRequestConfirm={(payload) => {
          confirmProfileModal.open(payload);
        }}
      />

      <ConfirmProfileUpdateModal
        isOpen={confirmProfileModal.isOpen}
        onClose={confirmProfileModal.close}
        onConfirm={() => {
          const payload = confirmProfileModal.payload;
          if (!payload) {
            confirmProfileModal.close();
            return;
          }

          saveProfile({
            ...profile,
            displayName: `${payload.firstName} ${payload.lastName}`.trim() || payload.username,
            profileData: payload
          });

          confirmProfileModal.close();
          editProfileModal.close();
        }}
      />

      <MarketplaceFooter />
    </>
  );
}