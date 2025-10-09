import React, { useDeferredValue, useState, useMemo, useEffect, JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  clearCartItems,
  clearShippingAddress,
  removeFromCart,
} from "../../slices/cartSlice.ts";
import { useGetPaginatedProductsQuery } from "../../slices/productsApiSlice";
import { updateProduct, clearProduct } from "../../slices/productSlice";
import { RootState, Product } from "../../types/redux.ts";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { HeaderPropsType } from "../../types/components.ts";
import { LIMIT, PAGE } from "../../constants/constants";
import { clearOrder } from "../../slices/orderSlice";
import { logout } from "../../slices/authSlice";
import { AppDispatch } from "../../store/store.ts";
import HeaderPresenter from "./HeaderPresenter";
import './main.scss';

const Header = (): JSX.Element => {
  const isDesktop = window.innerWidth >= 1400;
  const location = useLocation();
  const pathName = window.location.pathname.split("/")[1];
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const deferredValue = useDeferredValue(searchItem);

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data } = useGetPaginatedProductsQuery({ page: PAGE, limit: LIMIT });

  const electronics = data?.electronics;
  const casual = data?.casual;
  const products: Product[] | null = electronics && casual ? electronics.concat(casual) : null;

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async (): Promise<void> => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      dispatch(clearOrder());
      dispatch(clearCartItems());
      dispatch(clearShippingAddress());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseOffcanvas = (): void => setShowCanvas(false);
  const handleShowOffcanvas = (): void => setShowCanvas(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (location.pathname === "/" && Array.isArray(products)) {
      const value = e.target.value;
      setSearchItem(value);
    }
  };

  const filteredProducts: Product[] = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products?.filter((product) =>
      product.name.toLowerCase().includes(deferredValue.toLowerCase())
    );
  }, [deferredValue, products]);

  const removeFromCartHandler = (e: React.MouseEvent<HTMLElement>, id: string): void => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (deferredValue === "") {
      dispatch(clearProduct());
      return;
    }
    if (Array.isArray(filteredProducts)) {
      dispatch(updateProduct({ filteredProducts }));
      return;
    }
  }, [deferredValue, filteredProducts, dispatch]);

  const props: HeaderPropsType = {
    pathName,
    isDesktop,
    showCanvas,
    handleShowOffcanvas,
    handleCloseOffcanvas,
    logoutHandler,
    cartItems,
    userInfo,
    handleSearch,
    searchItem,
    removeFromCartHandler,
  };

  return <HeaderPresenter {...props} />;
};

export default Header;