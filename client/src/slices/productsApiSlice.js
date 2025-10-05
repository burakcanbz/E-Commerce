import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getPaginatedProducts: builder.query({
      query: ({ page, limit }) => ({
        url: `${PRODUCTS_URL}/paginated?page=${page}&limit=${limit}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductCategories : builder.query({
        query: () => ({
            url: `${PRODUCTS_URL}/categories`,
        }),
        keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCategorizedProducts: builder.query({
      query: ({ category, page, limit }) => ({
        url: `${PRODUCTS_URL}/categorized?category=${category}&page=${page}&limit=${limit}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllProductsByCategory: builder.query({
      query: (category) => ({
        url: `${PRODUCTS_URL}/category?category=${category}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTopRatedProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/topRatedProducts`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetPaginatedProductsQuery,
  useGetProductCategoriesQuery,
  useGetProductDetailsQuery,
  useGetCategorizedProductsQuery,
  useGetAllProductsByCategoryQuery,
  useGetTopRatedProductsQuery,
} = productsApiSlice;
