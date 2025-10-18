import { PRODUCTS_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

import type { CategorizedProductsParams, PaginatedProductsParams, Product } from "../types/redux"; 
import type { PaginatedProductsType } from "../types/redux";

type Category = string;

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getPaginatedProducts: builder.query<PaginatedProductsType, PaginatedProductsParams>({
      query: ({ page, limit }) => ({
        url: `${PRODUCTS_URL}/paginated?page=${page}&limit=${limit}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductCategories: builder.query<Category[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}/categories`,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query<Product, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCategorizedProducts: builder.query<Product[], CategorizedProductsParams>({
      query: ({ category, page, limit }) => ({
        url: `${PRODUCTS_URL}/categorized?category=${category}&page=${page}&limit=${limit}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllProductsByCategory: builder.query<Product[], string>({
      query: (category) => ({
        url: `${PRODUCTS_URL}/category?category=${category}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTopRatedProducts: builder.query<Product[], void>({
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