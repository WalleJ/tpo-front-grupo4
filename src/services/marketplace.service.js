import { demoProfile } from '@/data/mock/profile.mock';
import { initialCartItems } from '@/data/mock/cart.mock';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const CART_KEY = 'aio-marketplace-cart';
const PROFILE_KEY = 'aio-marketplace-profile';
const MARKETPLACE_EVENT = 'aio-marketplace-state-change';

function emitStateChange() {
  globalThis.dispatchEvent(new CustomEvent(MARKETPLACE_EVENT));
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return clone(fallback);
    return JSON.parse(raw);
  } catch {
    return clone(fallback);
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  emitStateChange();
}

function normalizeProfile(profile) {
  const avatarImage = profile.avatarImage?.trim() || '';
  const normalizedAvatar = avatarImage.startsWith('/images/avatars/') ? avatarImage : '/images/avatars/avatar1.png';

  return {
    ...profile,
    avatarImage: normalizedAvatar
  };
}

export const marketplaceService = {
  getInitialCartItems() {
    return readStorage(CART_KEY, initialCartItems);
  },

  setCartItems(items) {
    writeStorage(CART_KEY, items);
  },

  clearCart() {
    writeStorage(CART_KEY, []);
  },

  getProfile() {
    return normalizeProfile(readStorage(PROFILE_KEY, demoProfile));
  },

  setProfile(profile) {
    writeStorage(PROFILE_KEY, normalizeProfile(profile));
  },

  appendOrder(order) {
    const profile = this.getProfile();
    const nextProfile = {
      ...profile,
      history: [order, ...profile.history]
    };
    this.setProfile(nextProfile);
    return nextProfile;
  },

  appendProfilePaymentMethod(method) {
    const profile = this.getProfile();
    const nextProfile = {
      ...profile,
      paymentMethods: [...profile.paymentMethods, method]
    };
    this.setProfile(nextProfile);
    return nextProfile.paymentMethods;
  },

  removeProfilePaymentMethod(index) {
    const profile = this.getProfile();
    const nextProfile = {
      ...profile,
      paymentMethods: profile.paymentMethods.filter((_, i) => i !== index)
    };
    this.setProfile(nextProfile);
    return nextProfile;
  },

  onStateChange(listener) {
    const handler = () => listener();
    globalThis.addEventListener(MARKETPLACE_EVENT, handler);
    globalThis.addEventListener('storage', handler);
    return () => {
      globalThis.removeEventListener(MARKETPLACE_EVENT, handler);
      globalThis.removeEventListener('storage', handler);
    };
  },

  createOrderFromCart(items) {
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

  appendPaymentMethod(methods, method) {
    return [...methods, method];
  }
};
