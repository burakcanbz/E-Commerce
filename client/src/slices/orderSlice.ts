import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit"; 
import type { OrderItem, OrderRootState } from "../types/redux";

const storedOrder = localStorage.getItem("order");

const initialState: OrderRootState = storedOrder ? (JSON.parse(storedOrder) as OrderRootState) : { orders: [], paymentMethod: "" };

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<OrderItem>) {
      const order = action.payload;

      const existOrder = state.orders.find(
        (currentItem) => 
          currentItem._id === order._id
      );

      if (existOrder) {
        // update
        state.orders = state.orders.map((x) =>
          x._id === existOrder._id ? order : x
        );
      } else {
        state.orders = [...state.orders, order];
      }
      localStorage.setItem('order', JSON.stringify(state))
    },

    setPaidAmount: (state, action: PayloadAction<OrderItem>) => {
        const { _id: orderId, paidAmount } = action.payload; // Destructure the orderId and amount from the payload

        state.orders = state.orders.map(order => {
          if (order._id === orderId) { 
            return {
              ...order,
              paidAmount
            };
          }
          return order; 
        });
      
      localStorage.setItem('order', JSON.stringify(state))
    },

    clearOrder: (state) => {
      state.orders = [];
      localStorage.setItem('order', JSON.stringify(state));
    }
  },
});

export const { setOrder, setPaidAmount, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;