export interface CartItem {
    brand: string;
    category: string;
    countInStock: number;
    createdAt: string;
    description: string;
    image: string;
    name: string;
    numReviews: number;
    product?: string;
    price: number;
    qty: number;
    rating: number;
    review: string[];
    updatedAt: string;
    user: string;
    _v: number;
    _id: string;
}

export interface shippingAddress {
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}

export interface UserInfo {
    _id: string;
    name: string;
    email: string;
    image: string;
};

export interface AuthRootState {
    userInfo: UserInfo | null;
}

export interface OrderItem {
    createdAt: string;
    isPaid: boolean;
    paidAt?: string | null;
    itemsPrice: number;
    orderItems: CartItem[];
    paidAmount: number;
    paymentMethod: string;
    shippingAddress: shippingAddress;
    shippingPrice: number;
    status: string;
    taxPrice: number;
    totalPrice: number;
    updatedAt: string;
    user: UserInfo;
    _v: number;
    _id: string;
}

export interface OrderCreateInput {
    orderItems: Omit<CartItem, 'qty'>[];
    shippingAddress: shippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

export interface OrderPayInput {
    orderId: string;
    paidAmount: number;
}

export interface OrderRootState {
    orders: OrderItem[];
    paymentMethod: string | null;
}

export type Product = Omit<CartItem, 'qty'> ;

export interface ProductRootState {
    product?: Product[];
    searchedProducts?: Product[];
}

export interface CartRootState {
    cartItems: CartItem[];
    shippingAddress: shippingAddress | null;
    paymentMethod: string | null;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

export interface RootState {
    cart: CartRootState;
    auth: AuthRootState;
    order: OrderRootState;
    product: ProductRootState;
}

export interface Review {
    _id: string;
    user: Omit<UserInfo, 'image'>;
    product: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    _v: number;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
  status?: string;
}

export interface RefundResponse {
  success: boolean;
  refundedAmount?: number;
  message?: string;
}

export interface PaginatedProductsParams {
  page: number;
  limit: number;
}

export interface CategorizedProductsParams {
  category: string;
  page: number;
  limit: number;
}

export interface CreateReviewInput {
  productId: string;
  review: {
    rating: number;
    comment: string;
  };
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  image?: string;
  password?: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  token?: string;
}