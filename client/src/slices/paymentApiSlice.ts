import { apiSlice } from "./apiSlice";
import { PAYMENT_URL } from "../constants/constants";
import { PaymentResponse, RefundResponse } from "../types/redux";
import { PaymentData } from "../types/payment";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payOrder: builder.mutation<PaymentResponse, PaymentData>({
      query: (data) => ({
        url: `${PAYMENT_URL}`,
        method: "POST",
        body: { paymentInfo: data },
      }),
    }),
    cancelOrder: builder.query<RefundResponse, void>({
      query: () => ({
        url: `${PAYMENT_URL}/refundPayment`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { usePayOrderMutation, useCancelOrderQuery } = paymentApiSlice;