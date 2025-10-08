import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice.js';
import cartSliceReducer from '../slices/cartSlice.ts';
import authSliceReducer from '../slices/authSlice.js';
import orderSliceReducer from '../slices/orderSlice.js';
import productSliceReducer from '../slices/productSlice.js';

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