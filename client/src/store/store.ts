import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice.ts';
import cartSliceReducer from '../slices/cartSlice.ts';
import authSliceReducer from '../slices/authSlice.ts';
import orderSliceReducer from '../slices/orderSlice.ts';
import productSliceReducer from '../slices/productSlice.ts';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        order: orderSliceReducer,
        product: productSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;