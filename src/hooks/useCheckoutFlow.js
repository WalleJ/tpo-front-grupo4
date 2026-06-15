import { useEffect, useMemo, useState } from "react";
import { marketplaceService } from "@/services/marketplace.service";
const TAX_RATE = 0.105;
const SHIPPING_FLAT = 9.99;
function useCheckoutFlow() {
  const [view, setView] = useState("cart");
  const [items, setItems] = useState(() => marketplaceService.getInitialCartItems());
  const [paymentMethods, setPaymentMethods] = useState(() => marketplaceService.getProfile().paymentMethods);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [items]);
  const shipping = useMemo(() => items.length ? SHIPPING_FLAT : 0, [items.length]);
  const taxes = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const discount = useMemo(() => subtotal >= 250 ? 10 : 0, [subtotal]);
  const total = useMemo(() => Math.max(subtotal + shipping + taxes - discount, 0), [discount, shipping, subtotal, taxes]);
  useEffect(() => {
    marketplaceService.setCartItems(items);
  }, [items]);
  useEffect(() => {
    const unsubscribe = marketplaceService.onStateChange(() => {
      const profile = marketplaceService.getProfile();
      setPaymentMethods(profile.paymentMethods);
    });
    return unsubscribe;
  }, []);
  const increase = (itemId) => {
    setItems((prev) => prev.map((item) => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const decrease = (itemId) => {
    setItems(
      (prev) => prev.map((item) => item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item).filter((item) => item.quantity > 0)
    );
  };
  const remove = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };
  const goToCheckout = () => {
    if (!items.length) return;
    setView("checkout");
  };
  const goBackToCart = () => {
    setView("cart");
  };
  const addPaymentMethod = (method, saveInProfile) => {
    if (!saveInProfile) {
      setPaymentMethods((prev) => [...prev, method]);
      setSelectedPaymentIndex(paymentMethods.length);
      return;
    }
    const nextMethods = marketplaceService.appendProfilePaymentMethod(method);
    setPaymentMethods(nextMethods);
    setSelectedPaymentIndex(nextMethods.length - 1);
  };
  const purchase = async () => {
    if (selectedPaymentIndex == null) return false;
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1300));
    const order = marketplaceService.createOrderFromCart(items);
    marketplaceService.appendOrder(order);
    setSuccessOrder(order);
    marketplaceService.clearCart();
    setItems([]);
    setView("cart");
    setProcessing(false);
    return true;
  };
  const closeSuccess = () => {
    setSuccessOrder(null);
  };
  return {
    view,
    items,
    paymentMethods,
    selectedPaymentIndex,
    processing,
    successOrder,
    subtotal,
    shipping,
    taxes,
    discount,
    total,
    setSelectedPaymentIndex,
    increase,
    decrease,
    remove,
    goToCheckout,
    goBackToCart,
    addPaymentMethod,
    purchase,
    closeSuccess
  };
}
export {
  useCheckoutFlow
};
