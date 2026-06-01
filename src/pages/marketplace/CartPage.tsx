import { useEffect, useRef, useState } from 'react';
import { MarketplaceFooter } from '@/components/layouts/MarketplaceFooter';
import { useModal } from '@/hooks/useModal';
import { useCheckoutFlow } from '@/hooks/useCheckoutFlow';
import { CartSidebar } from '@/components/product/CartSidebar';
import { CartItemCard } from '@/components/marketplace/cart/CartItemCard';
import { SecureCheckoutBanner } from '@/components/marketplace/cart/SecureCheckoutBanner';
import { CheckoutPanel } from '@/components/marketplace/cart/CheckoutPanel';
import { AddCardModal } from '@/components/marketplace/cart/AddCardModal';
import { PurchaseSuccessOverlay } from '@/components/marketplace/cart/PurchaseSuccessOverlay';

export function CartPage() {
  const addCardModal = useModal();
  const [isInvoicePopupOpen, setIsInvoicePopupOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cartPanelRef = useRef<HTMLDivElement | null>(null);
  const checkoutPanelRef = useRef<HTMLDivElement | null>(null);
  const {
    view,
    items,
    paymentMethods,
    selectedPaymentIndex,
    processing,
    successOrder,
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
  } = useCheckoutFlow();

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (view !== 'checkout') {
      wrapperRef.current.style.minHeight = '0px';
      return;
    }
    const checkoutPanel = checkoutPanelRef.current;
    if (!checkoutPanel) return;
    wrapperRef.current.style.minHeight = `${checkoutPanel.offsetHeight}px`;
  }, [view, items.length, paymentMethods.length]);

  return (
    <>
      <div className="pt-28">
        <main ref={wrapperRef} className="pb-16 px-gutter max-w-[1280px] mx-auto cart-slide-wrapper relative">
          <div
            ref={cartPanelRef}
            className={`w-full cart-panel-transition ${
              view === 'checkout'
                ? 'absolute inset-0 -translate-x-full opacity-0 pointer-events-none'
                : 'relative translate-x-0 opacity-100'
            }`}
          >
            <div className="mb-lg flex flex-col gap-xs">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">CHECKOUT SUMMARY</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Shopping Cart</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
              <div className="lg:col-span-8 flex flex-col gap-md">
                <SecureCheckoutBanner />
                {items.length ? (
                  items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onIncrease={() => increase(item.id)}
                      onDecrease={() => decrease(item.id)}
                      onRemove={() => remove(item.id)}
                      readOnly={false}
                    />
                  ))
                ) : (
                  <div className="glass-panel rounded-xl p-lg text-center">
                    <p className="font-headline-sm mb-xs">Your cart is empty</p>
                    <p className="text-on-surface-variant text-body-sm">Add products from Store to start your order.</p>
                  </div>
                )}
              </div>
              <div className="lg:col-span-4 flex flex-col gap-md">
                <CartSidebar
                  items={items}
                  shipping={shipping}
                  taxes={taxes}
                  discount={discount}
                  total={total}
                  onCheckout={goToCheckout}
                />
              </div>
            </div>
          </div>

          <div
            ref={checkoutPanelRef}
            className={`w-full cart-panel-transition ${
              view === 'checkout'
                ? 'relative translate-x-0 opacity-100'
                : 'absolute inset-0 translate-x-full opacity-0 pointer-events-none'
            }`}
          >
            <div className="mb-lg flex flex-col gap-xs">
              <button onClick={goBackToCart} className="inline-flex items-center gap-xs text-primary font-label-caps text-label-caps hover:opacity-75 transition-opacity mb-xs w-fit">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>Back to cart
              </button>
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">SECURE CHECKOUT</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Order Details</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
              <div className="lg:col-span-8 flex flex-col gap-md">
                <SecureCheckoutBanner />
                {items.length ? (
                  items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onIncrease={() => increase(item.id)}
                      onDecrease={() => decrease(item.id)}
                      onRemove={() => remove(item.id)}
                      readOnly
                    />
                  ))
                ) : (
                  <div className="glass-panel rounded-xl p-lg text-center">
                    <p className="font-headline-sm mb-xs">Your cart is empty</p>
                    <p className="text-on-surface-variant text-body-sm">Add products from Store to start your order.</p>
                  </div>
                )}
              </div>
              <div className="lg:col-span-4 flex flex-col gap-md">
                <CheckoutPanel
                  paymentMethods={paymentMethods}
                  selectedPaymentIndex={selectedPaymentIndex}
                  shipping={shipping}
                  taxes={taxes}
                  discount={discount}
                  total={total}
                  onSelectPayment={setSelectedPaymentIndex}
                  onOpenAddCard={addCardModal.open}
                  onPurchase={purchase}
                  processing={processing}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddCardModal
        isOpen={addCardModal.isOpen}
        onClose={addCardModal.close}
        onAdd={(method, saveInProfile) => addPaymentMethod(method, saveInProfile)}
      />

      <PurchaseSuccessOverlay
        isOpen={Boolean(successOrder)}
        onDownloadInvoice={() => {}}
        onSendInvoice={() => {
          setIsInvoicePopupOpen(true);
        }}
        onReturnToCart={closeSuccess}
      />

      {isInvoicePopupOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-md">
          <button
            type="button"
            className="absolute inset-0 bg-on-surface/45"
            aria-label="Close invoice popup"
            onClick={() => setIsInvoicePopupOpen(false)}
          />
          <div className="relative w-full max-w-lg glass-panel-white rounded-2xl border border-outline-variant/40 shadow-2xl p-lg">
            <div className="flex items-start justify-between gap-md mb-sm">
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-widest text-primary mb-1">PURCHASE COMPLETE</p>
                <h3 className="font-headline-sm text-headline-sm">Invoice sent by email</h3>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-lg border border-outline-variant/40 hover:bg-surface-container-low"
                onClick={() => setIsInvoicePopupOpen(false)}
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              We sent your invoice to the email associated with your profile. Please check your inbox and spam folder.
            </p>
            <div className="mt-md flex justify-end">
              <button
                type="button"
                className="font-label-caps text-label-caps py-sm px-md rounded-lg bg-primary text-white hover:brightness-110 active:scale-95 transition-all"
                onClick={() => setIsInvoicePopupOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <MarketplaceFooter />
    </>
  );
}