import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants/constants';

import type { OrderItem, OrderCreateInput, OrderPayInput } from '../types/redux';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderItem, OrderCreateInput>({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),

    paySelectedOrder: builder.mutation<OrderItem, OrderPayInput>({
      query: ({ paidAmount, orderId }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { paidAmount },
      }),
      invalidatesTags: ['Order'],
    }),

    getOrderDetails: builder.query<OrderItem, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Order'],
    }),

    getOrders: builder.query<OrderItem[], void>({
      query: () => ({
        url: `${ORDERS_URL}/myOrders`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Order'],
    }),

    cancelOrder: builder.mutation<OrderItem, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePaySelectedOrderMutation,
  useGetOrdersQuery,
  useCancelOrderMutation,
} = ordersApiSlice;
