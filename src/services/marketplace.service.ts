import { demoProfile } from '@/data/mock/profile.mock';
import { initialCartItems } from '@/data/mock/cart.mock';
import type { CartItem, PaymentMethod, PurchaseOrder, UserProfile } from '@/types/marketplace.types';

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

const CART_KEY = 'aio-marketplace-cart';
const PROFILE_KEY = 'aio-marketplace-profile';
const MARKETPLACE_EVENT = 'aio-marketplace-state-change';

function emitStateChange() {
  globalThis.dispatchEvent(new CustomEvent(MARKETPLACE_EVENT));
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return clone(fallback);
    return JSON.parse(raw) as T;
  } catch {
    return clone(fallback);
  }
}

function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  emitStateChange();
}

function normalizeProfile(profile: UserProfile): UserProfile {
  const avatarImage = profile.avatarImage?.trim() || '';
  const normalizedAvatar = avatarImage.startsWith('/images/avatars/') ? avatarImage : '/images/avatars/avatar1.png';

  return {
    ...profile,
    avatarImage: normalizedAvatar
  };
}

export const marketplaceService = {
  getInitialCartItems(): CartItem[] {
    return readStorage(CART_KEY, initialCartItems);
  },

  setCartItems(items: CartItem[]) {
    writeStorage(CART_KEY, items);
  },

  clearCart() {
    writeStorage(CART_KEY, []);
  },

  getProfile(): UserProfile {
    return normalizeProfile(readStorage(PROFILE_KEY, demoProfile));
  },

  setProfile(profile: UserProfile) {
    writeStorage(PROFILE_KEY, normalizeProfile(profile));
  },

  appendOrder(order: PurchaseOrder) {
    const profile = this.getProfile();
    const nextProfile = {
      ...profile,
      history: [order, ...profile.history]
    };
    this.setProfile(nextProfile);
    return nextProfile;
  },

  appendProfilePaymentMethod(method: PaymentMethod) {
    const profile = this.getProfile();
    const nextProfile = {
      ...profile,
      paymentMethods: [...profile.paymentMethods, method]
    };
    this.setProfile(nextProfile);
    return nextProfile.paymentMethods;
  },

  removeProfilePaymentMethod(index: number) {
    const profile = this.getProfile();
    const nextProfile = {
      ...profile,
      paymentMethods: profile.paymentMethods.filter((_, i) => i !== index)
    };
    this.setProfile(nextProfile);
    return nextProfile;
  },

  onStateChange(listener: () => void) {
    const handler = () => listener();
    globalThis.addEventListener(MARKETPLACE_EVENT, handler);
    globalThis.addEventListener('storage', handler);
    return () => {
      globalThis.removeEventListener(MARKETPLACE_EVENT, handler);
      globalThis.removeEventListener('storage', handler);
    };
  },

  createOrderFromCart(items: CartItem[]): PurchaseOrder {
    return {
      id: `ORD-${Date.now().toString().slice(-7)}`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'PROCESSING',
      orderItems: items.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    };
  },

  appendPaymentMethod(methods: PaymentMethod[], method: PaymentMethod): PaymentMethod[] {
    return [...methods, method];
  }
};