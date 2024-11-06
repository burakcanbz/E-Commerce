import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")) 
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {  // action.type is cart/addToCart
      const item = action.payload;

      const existItem = state.cartItems.find(
        (currentItem) => currentItem._id === item._id
      );

      if (existItem) { // update 
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
        updateCart(state);
    },
    
    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
        updateCart(state)
    },

    saveShippingAddress: (state, action) => {
        state.shippingAddress = action.payload;
        return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    }
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;
