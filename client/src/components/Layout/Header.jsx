import { useDeferredValue, useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  clearCartItems,
  clearShippingAddress,
  removeFromCart,
} from "../../slices/cartSlice.ts";
import { useGetPaginatedProductsQuery } from "../../slices/productsApiSlice";
import { updateProduct, clearProduct } from "../../slices/productSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { LIMIT, PAGE } from "../../constants/constants";
import { clearOrder } from "../../slices/orderSlice";
import { logout } from "../../slices/authSlice";
import HeaderPresenter from "./HeaderPresenter";
import './main.scss';

const Header = () => {
  const isDesktop = window.innerWidth >= 1400;
  const location = useLocation();
  const pathName = window.location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCanvas, setShowCanvas] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const deferredValue = useDeferredValue(searchItem);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useGetPaginatedProductsQuery({ page: PAGE, limit: LIMIT });

  const electronics = data?.electronics;
  const casual = data?.casual;
  const products = electronics && casual ? electronics.concat(casual) : null;

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearOrder());
      dispatch(clearCartItems());
      dispatch(clearShippingAddress());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseOffcanvas = () => setShowCanvas(false);
  const handleShowOffcanvas = () => setShowCanvas(true);

  const handleSearch = (e) => {
    if (location.pathname === "/" && Array.isArray(products)) {
      const value = e.target.value;
      setSearchItem(value);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products?.filter((product) =>
      product.name.toLowerCase().includes(deferredValue.toLowerCase())
    );
  }, [deferredValue, products]);

  const removeFromCartHandler = (e, id) => {
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

  const props = {
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
