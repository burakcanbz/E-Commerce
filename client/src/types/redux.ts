export interface CartItem {
    brand: string;
    category: string;
    countInStock: number;
    createdAt: string;
    description: string;
    image: string;
    name: string;
    numReviews: number;
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
    user: string;
    _v: number;
    _id: string;
}


export interface OrderRootState {
    orders: OrderItem[];
    paymentMethod: string | null;
}

export type Product = Omit<CartItem, 'qty'>;

export interface ProductRootState {
    product?: Product[];
    searchedProducts?: Product[];
}

export interface CartRootState {
    cartItems: CartItem[];
    shippingAddress: shippingAddress | null;
    paymentMethod: string | null;
}

export interface RootState {
    cart: CartRootState;
    auth: AuthRootState;
    order: OrderRootState;
    product: ProductRootState;
}