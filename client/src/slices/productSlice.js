import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload;
            return state;
        },
        updateProduct: (state, action) => {
            state.searchedProducts = action.payload;
            return state;
        },
        clearProduct: (state, action) => {
            state.searchedProducts = [];
            return state;
        }
    }
})

export const { updateProduct, setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;