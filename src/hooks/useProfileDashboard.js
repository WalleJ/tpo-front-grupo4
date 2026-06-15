import { useEffect, useMemo, useState } from "react";
import { marketplaceService } from "@/services/marketplace.service";
function getOrderTotal(order) {
  return order.orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}
function useProfileDashboard() {
  const [profile, setProfile] = useState(() => marketplaceService.getProfile());
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  useEffect(() => {
    const unsubscribe = marketplaceService.onStateChange(() => {
      setProfile(marketplaceService.getProfile());
    });
    return unsubscribe;
  }, []);
  const selectedOrder = useMemo(
    () => profile.history.find((order) => order.id === selectedOrderId) ?? null,
    [profile.history, selectedOrderId]
  );
  const buyerLevel = useMemo(() => {
    const monthly = profile.history.length;
    const percent = Math.min(100, Math.round(monthly / 50 * 100));
    return { monthly, percent };
  }, [profile.history.length]);
  const deletePaymentMethod = (index) => {
    const nextProfile = marketplaceService.removeProfilePaymentMethod(index);
    setProfile(nextProfile);
  };
  const saveProfile = (nextProfile) => {
    marketplaceService.setProfile(nextProfile);
    setProfile(nextProfile);
  };
  return {
    profile,
    selectedOrder,
    selectedOrderId,
    buyerLevel,
    setSelectedOrderId,
    deletePaymentMethod,
    saveProfile,
    getOrderTotal
  };
}
export {
  useProfileDashboard
};
