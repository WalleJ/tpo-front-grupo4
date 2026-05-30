import { MarketplaceFooter } from '@/components/layouts/MarketplaceFooter';
import { useModal } from '@/hooks/useModal';
import { useProfileDashboard } from '@/hooks/useProfileDashboard';
import { ProfileHeader } from '@/components/marketplace/profile/ProfileHeader';
import { BuyerLevelCard } from '@/components/marketplace/profile/BuyerLevelCard';
import { PaymentMethodsCard } from '@/components/marketplace/profile/PaymentMethodsCard';
import { SupportClaimsCard } from '@/components/marketplace/profile/SupportClaimsCard';
import { PurchaseHistoryTable } from '@/components/marketplace/profile/PurchaseHistoryTable';
import { OrderDetailModal } from '@/components/marketplace/profile/OrderDetailModal';
import { OrderItemsModal } from '@/components/marketplace/profile/OrderItemsModal';
import { DeletePaymentMethodModal } from '@/components/marketplace/profile/DeletePaymentMethodModal';

export function ProfilePage() {
  const orderDetailModal = useModal();
  const orderItemsModal = useModal();
  const deletePaymentModal = useModal<number>();

  const {
    profile,
    selectedOrder,
    buyerLevel,
    setSelectedOrderId,
    deletePaymentMethod,
    getOrderTotal
  } = useProfileDashboard();

  return (
    <>
      <main className="pt-28 pb-16 px-gutter max-w-[1280px] mx-auto">
        <ProfileHeader profile={profile} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
          <BuyerLevelCard monthly={buyerLevel.monthly} percent={buyerLevel.percent} />
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

      <MarketplaceFooter />
    </>
  );
}