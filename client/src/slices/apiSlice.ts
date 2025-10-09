import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { logout } from './authSlice';
import { BASE_URL } from '../constants/constants';

type BaseQueryArgs = string | { url: string; method?: string; body?: any };

type BaseQueryCustomError = FetchBaseQueryError | { status: number; data: unknown } | undefined;

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === 'development' ? BASE_URL : BASE_URL,
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<BaseQueryArgs, unknown, BaseQueryCustomError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if ('error' in result && result.error && 'status' in result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'Order', 'User', 'Payment', "Reviews"],
  endpoints: (builder) => ({}),
});