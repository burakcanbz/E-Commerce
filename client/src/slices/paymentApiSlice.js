import { apiSlice } from "./apiSlice";
import { PAYMENT_URL } from "../constants";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payOrder: builder.mutation({
      query: (data) => ({
        url: `${PAYMENT_URL}`,
        method: "POST",
        body: {paymentInfo: data},
      }),
    }),
    cancelOrder: builder.query({
      query: () => ({
        url: `${PAYMENT_URL}/refundPayment`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { usePayOrderMutation, useCancelOrderQuery } = paymentApiSlice;
