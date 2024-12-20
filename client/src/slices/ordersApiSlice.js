import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order },
            }),
        }),
        paySelectedOrder: builder.mutation({
            query: ({ amount, orderId }) => {
                return{
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { amount },
            }},
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myOrders`,
            }),
            keepUnusedDataFor: 5,
        })
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery,  usePaySelectedOrderMutation, useGetOrdersQuery } = ordersApiSlice;