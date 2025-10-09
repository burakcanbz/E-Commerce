import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";
import { CartRootState, CartItem, shippingAddress } from "../types/redux.ts";

const initialState: CartRootState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Credit Card", itemsPrice: 0, shippingPrice: 0, taxPrice: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (currentItem) => currentItem._id === item._id
      );

      if (existItem) {
        // update
        state.cartItems = state.cartItems?.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
      return  updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems?.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action: PayloadAction<shippingAddress>) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCartItems: (state, action: PayloadAction<void>) => {
      state.cartItems = [];
      return updateCart(state);
    },

    clearShippingAddress: (state, action: PayloadAction<void>) => {
      state.shippingAddress = {};
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  setCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  clearShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
