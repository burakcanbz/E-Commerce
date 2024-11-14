import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            state.searchedProducts = action.payload;
            return state;
        }
    }
})

export const { updateProduct } = productSlice.actions;

export default productSlice.reducer;