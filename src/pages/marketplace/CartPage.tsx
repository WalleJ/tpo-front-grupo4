import { useRef } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const {
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
  } = useCheckoutFlow();

  return (
    <>
      <div ref={wrapperRef} className="cart-slide-wrapper pt-28">
        <main className="pb-16 px-gutter max-w-[1280px] mx-auto">
          <div className="mb-lg flex flex-col gap-xs">
            {view === 'checkout' ? (
              <button onClick={goBackToCart} className="inline-flex items-center gap-xs text-primary font-label-caps text-label-caps hover:opacity-75 transition-opacity mb-xs w-fit">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>Back to cart
              </button>
            ) : null}
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">{view === 'checkout' ? 'SECURE CHECKOUT' : 'CHECKOUT SUMMARY'}</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">{view === 'checkout' ? 'Order Details' : 'Shopping Cart'}</h2>
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
                    readOnly={view === 'checkout'}
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
                itemCount={items.length}
                subtotal={subtotal}
                shipping={shipping}
                taxes={taxes}
                discount={discount}
                total={total}
                onCheckout={view === 'cart' ? goToCheckout : undefined}
              />
              {view === 'checkout' ? (
                <CheckoutPanel
                  paymentMethods={paymentMethods}
                  selectedPaymentIndex={selectedPaymentIndex}
                  onSelectPayment={setSelectedPaymentIndex}
                  onOpenAddCard={addCardModal.open}
                  onPurchase={purchase}
                  processing={processing}
                />
              ) : null}
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
        onDownloadInvoice={() => {
          if (!successOrder) return;
          const content = `Order ID: ${successOrder.id}\nStatus: ${successOrder.status}`;
          const blob = new Blob([content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `invoice-${successOrder.id}.txt`;
          a.click();
          URL.revokeObjectURL(url);
        }}
        onSendInvoice={() => {
          window.alert('Invoice sent to your email.');
        }}
        onReturnToCart={closeSuccess}
      />

      <MarketplaceFooter />
    </>
  );
}