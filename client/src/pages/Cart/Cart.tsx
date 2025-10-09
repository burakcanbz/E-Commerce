import { useEffect, JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart, removeFromCart, setCart } from "../../slices/cartSlice.ts";
import { RootState, Product } from "../../types/redux.ts";
import { AppDispatch } from "../../store/store.ts";
import { CartPropsType } from "../../types/components.ts";
import CartPresenter from "./CartPresenter.tsx";
import './main.scss';

const Cart = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { cartItems } = useSelector((state: RootState) => state.cart);

  const addToCartHandler = (product: Product, qty: number): void => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id: string): void => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = (): void => {
    navigate("/login?redirect=/shipping");
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsedCart = JSON.parse(stored);
      if (Array.isArray(parsedCart.cartItems)) {
        dispatch(setCart(parsedCart.cartItems));
      }
    }
  } catch (err) {
    console.error("Failed to load cart from localStorage", err);
    dispatch(setCart([]));
  }
}, [dispatch]);

  const props: CartPropsType = {
    cartItems,
    addToCartHandler,
    removeFromCartHandler,
    checkoutHandler,
  }

  return (
    <CartPresenter {...props} />
  )
};

export default Cart;