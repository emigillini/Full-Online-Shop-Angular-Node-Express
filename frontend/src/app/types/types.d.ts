export interface BrandType {
  id: number;
  description: string;
}

export interface NewProduct {
  price: number;
  stock: number;
  image?: string | null;
  detail?: string | null;
  model: number | null;
  brand: number | null;
  size: number | null;
  color: number | null;
}

export interface Product {
  id: number;
  price: number;
  stock: number;
  image: string | null;
  detail: string | null;
  model: ShoeModelType | null;
  brand: BrandType | null;
  size: SizeType | null;
  color: ColorType | null;
}

export interface Cart {
  id: number;
  user: User;
  products: IProduct[];
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: number;
  quantity: number;
  product: Product;
}
export interface NewItem {
  product_id: number;
  quantity?: number;
}

export interface AddProductResponse {
  message: string;
  cart: Cart;
}

export interface RemoveItemRequest {
  product_id: number;
  quantity?: number;
}

export interface RemoveItemResponse {
  message: string;
  cart: Cart;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
  identification_number?: number;
  phone?: number;
  adress?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  identification_number?: number;
  password?: string;
  is_admin: boolean;
  adress?: string;
}
export interface UserLogin {
  username: string;
  email: string;
  password: string;
}

export interface UserRegistrationResponse {
  user: User;
  message: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  is_admin: boolean;
  expires_in: number;
}

export interface LogoutResponse {
  success: string;
}

export interface Purchase {
  id: number;
  invoice_number: string;
  date: string;
  user: User;
  total: number;
  cart: Cart;
  payment_type: number;
  delivery: Delivery;
}

export interface PurchaseConfirmationResponse {
  message: string;
  purchase: Purchase;
  delivery: Delivery;
}
export type DeliveryStatus = 'Pending' | 'Transit' | 'Complete';
export type Color = 'Red' | 'Blue' | 'White' | 'Black';
export type Model = 'Model A' | 'Model B' | 'Model C' | 'Model D' | 'Model E';
export type Size = 5 | 6 | 7 | 8;

export interface Delivery {
  id: number;
  purchase: Purchase;
  tracking_number: string;
  delivery_address: string;
  estimated_date: string | null;
  delivery_date: string | null;
  delivery_status: DeliveryStatus;
}

export interface DeliveryHistory {
  id: number;
  description: DeliveryStatus;
  change_date: string;
}

export interface DeliveryStatusResponse {
  message: string;
  delivery: Delivery;
  delivery_history: DeliveryHistory[];
}

export interface UpdateDeliveryStatusRequest {
  delivery_id: number;
  delivery_status: DeliveryStatus;
}

export interface PaymentTypes {
  id: number;
  description: string;
}
export interface EmailData {
  subject: string;
  message: string;
  toEmail: string;
}
export interface EmailResponse {
  status: 'success' | 'error';
  message?: string;
}
export interface PasswordResetRequestResponse {
  success: boolean;
  message: string;
}

export interface PasswordResetConfirmResponse {
  success: boolean;
  message: string;
  uid: string;
  token: string;
}
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  new_password: string;
  confirm_password: string;
}

export interface Conversation {
  id: number;
  name: string;
  user: User;
  open: boolean;
  created_at: string;
  closed_at?: string;
}

export interface NewConversation {
  name: string;
}

export interface Message {
  id: number;
  user: User;
  content: string;
  created_at: string;
  conversation: number;
}
export interface NewMessage {
  content: string;
  conversationId: number;
}
export interface CacheEntry<T> {
  data: T;
  expiry: number;
}
