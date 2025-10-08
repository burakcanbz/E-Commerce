export interface CartItem {
    brand: string;
    category: string;
    countInStock: number;
    createdAt: string;
    description: string;
    image: string;
    name: string;
    numReviesws: number;
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
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface AuthRootState {
    auth: {
        userInfo: {
            _id: string;
            name: string;
            email: string;
            isAdmin: boolean;
            createdAt?: string;
            updatedAt?: string;
        } | null;
    };
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

interface OrderRootState {
    order: {
        orders: OrderItem[];
        paymentMethod: string | null;
    }
    
}

export type SearchedProducts = Omit<CartItem, 'qty'>;

interface ProductRootState {
    product: {
        searchedProducts: SearchedProducts[];
     }
}

interface CartRootState {
  cart: {
    cartItems: CartItem[];
    shippingAddress: shippingAddress | null;
    paymentMethod: string | null;
  };
}

export interface RootState {
    cart: CartRootState['cart'];
    auth: AuthRootState['auth'];
    order: OrderRootState['order'];
    product: ProductRootState['product'];
}