import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' ;
import { logout } from './authSlice';
import { BASE_URL } from '../constants/constants';


const baseQuery = fetchBaseQuery({baseUrl: process.env.NODE_ENV === "development" ? BASE_URL : BASE_URL,  credentials: 'include'})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};         

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product', 'Order', 'User', 'Payment'],
    endpoints: (builder) => ({})
})