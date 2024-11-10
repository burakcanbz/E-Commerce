import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("order")
  ? JSON.parse(localStorage.getItem("order"))
  : { orders: [], paymentMethod: "Stripe" };

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action) {
      const order = action.payload;

      const existOrder = state.orders.find(
        (currentItem) =>
          currentItem.paymentResult._id === order.paymentResult._id
      );

      if (existOrder) {
        // update
        state.orders = state.orders.map((x) =>
          x.paymentResult._id === existOrder.paymentResult._id ? order : x
        );
      } else {
        state.orders = [...state.orders, order];
      }
      localStorage.setItem('order', JSON.stringify(state))

      return state;
    },
    setPaidAmount: (state, action) => {
        const { orderId, paidAmount } = action.payload; // Destructure the orderId and amount from the payload

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
      return state;
    },


  },
});

export const { setOrder, setPaidAmount } = orderSlice.actions;

export default orderSlice.reducer;
