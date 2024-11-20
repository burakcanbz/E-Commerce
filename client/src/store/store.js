import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';
import cartSliceReducer from '../slices/cartSlice';
import authSliceReducer from '../slices/authSlice';
import orderSliceReducer from '../slices/orderSlice';
import productSliceReducer from '../slices/productSlice';
import settingsSliceReducer from '../slices/settingsSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        order: orderSliceReducer,
        product: productSliceReducer,
        settings: settingsSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;