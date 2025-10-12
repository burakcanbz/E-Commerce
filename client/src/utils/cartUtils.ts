import type { CartRootState } from "../types/redux";

const addDecimals = (num: number) => {
    return (num * 100 / 100).toFixed(2)
}

export const updateCart = (state: CartRootState) => {
    //Calculate items price
    state.itemsPrice = Number(addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)));
 
    //Calculate shipping price
    state.shippingPrice = Number(addDecimals(state.itemsPrice > 100 ? 0 : 10));

    //Calculate tax price
    state.taxPrice = Number(addDecimals(Number((0.15 * state.itemsPrice))));

    //Calculate total price
    state.totalPrice = Number((
      Number(state.itemsPrice) + 
      Number(state.shippingPrice)  +
      Number(state.taxPrice)
    ).toFixed(2));
    
    //Save to local storage
    localStorage.setItem('cart', JSON.stringify(state))
    
    return state
}