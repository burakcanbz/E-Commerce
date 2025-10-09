import { apiSlice } from "./apiSlice";
import { REVIEWS_URL } from "../constants/constants";
import { CreateReviewInput, Review } from "../types/redux"; // make sure Review type is defined in your redux types


export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<Review, CreateReviewInput>({
      query: ({ productId, review }) => ({
        url: `${REVIEWS_URL}/product/${productId}`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews" as const, id: productId },
      ],
    }),
    getProductReviews: builder.query<{ reviews: Review[] }, string>({
      query: (productId) => ({
        url: `${REVIEWS_URL}/product/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, productId) => [
        { type: "Reviews" as const, id: productId },
      ],
    }),
  }),
});

export const { useCreateReviewMutation, useGetProductReviewsQuery } = reviewsApiSlice;