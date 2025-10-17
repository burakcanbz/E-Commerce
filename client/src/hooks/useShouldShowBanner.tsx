import { bottomNavigationPaths } from "../utils/helpers";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import type { CartItem, RootState } from "../types/redux";

const useShouldShowBanner = () => {
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.cartItems);
  const location: ReturnType<typeof useLocation> = useLocation();
  const shouldBottomNavigationShown: boolean = window.innerWidth <= 480;
  return shouldBottomNavigationShown && cartItems.length > 0 && bottomNavigationPaths.includes(location.pathname);
}

export default useShouldShowBanner;