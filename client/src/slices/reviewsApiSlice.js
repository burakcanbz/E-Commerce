import { apiSlice } from "./apiSlice";
import { REVIEWS_URL } from "../constants";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ productId, review }) => {
        return {
          url: `${REVIEWS_URL}/product/${productId}`,
          method: "POST",
          body: review,
        };
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: productId },
      ],
    }),
    getProductReviews: builder.query({
      query: (productId) => ({
        url: `${REVIEWS_URL}/product/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, productId) => [
        { type: "Reviews", id: productId },
      ],
    }),
  }),
});

export const { useCreateReviewMutation, useGetProductReviewsQuery } =
  reviewsApiSlice;
