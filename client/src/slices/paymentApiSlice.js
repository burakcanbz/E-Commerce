import { apiSlice } from "./apiSlice";
import { PAYMENT_URL } from "../constants";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payOrder: builder.mutation({
      query: (payInfo) => ({
        url: `${PAYMENT_URL}/payment-intent`,
        method: "POST",
        body: payInfo,
      }),
    }),

    getConfig: builder.query({
      query: () => ({
        url: `${PAYMENT_URL}/config`,
      }),
      keepUnusedDataFor: 5, 
    }),
  }),
});

export const { usePayOrderMutation, useGetConfigQuery } = paymentApiSlice;
