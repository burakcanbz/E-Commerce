import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' ;
import { logout } from '../slices/authSlice';
import { BASE_URL } from '../constants/constants';


const baseQuery = fetchBaseQuery({baseUrl: BASE_URL,  credentials: 'include'})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};         

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({})
})