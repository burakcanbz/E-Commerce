export const BASE_URL: string | undefined = import.meta.env.VITE_BASE_URL;
export const PRODUCTS_URL: string = '/api/products';
export const USERS_URL: string = '/api/users';
export const ORDERS_URL: string = '/api/orders';
export const PAYMENT_URL: string = '/api/payment';
export const REVIEWS_URL: string = '/api/reviews';
export const PAGE: number  = Number(import.meta.env.VITE_PAGE) || 1;
export const LIMIT: number = Number(import.meta.env.VITE_LIMIT) || 10;