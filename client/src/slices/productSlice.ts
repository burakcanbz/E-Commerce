import { ProductRootState, Product } from './../types/redux';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: ProductRootState = {};

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product[]>) => {
            state.product = action.payload;
            return state;
        },
        updateProduct: (state, action: PayloadAction<{filteredProducts: Product[]}>) => {
            state.searchedProducts = action.payload.filteredProducts;
            return state;
        },
        clearProduct: (state, action: PayloadAction<void>) => {
            state.searchedProducts = [];
            return state;
        }
    }
})

export const { updateProduct, setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;