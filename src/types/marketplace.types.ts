export interface CartItem {
  id: string;
  title: string;
  description: string;
  image: string;
  quantity: number;
  unitPrice: number;
}

export interface PaymentMethod {
  label: string;
  detail: string;
}

export interface PurchaseOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface PurchaseOrder {
  id: string;
  date: string;
  status: string;
  orderItems: PurchaseOrderItem[];
}

export interface SupportClaim {
  dateTime: string;
  title: string;
  status: string;
}

export interface LoginSession {
  dateTime: string;
  detail: string;
}

export interface UserProfile {
  key: string;
  displayName: string;
  location: string;
  roleLabel: string;
  avatarImage: string;
  loginSessions: LoginSession[];
  paymentMethods: PaymentMethod[];
  supportClaims: SupportClaim[];
  history: PurchaseOrder[];
}