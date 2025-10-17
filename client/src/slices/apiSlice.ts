import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logout } from './authSlice';

type BaseQueryArgs = string | { url: string; method?: string; body?: any };

type BaseQueryCustomError = FetchBaseQueryError | { status: number; data: unknown } | undefined;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
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
  endpoints: () => ({}),
});