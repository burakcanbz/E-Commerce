import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";

const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Shipping = lazy(() => import("../pages/Shipping"));
const Payment = lazy(() => import("../pages/Payment"));
const PlaceOrder = lazy(() => import("../pages/PlaceOrder"));
const Order = lazy(() => import("../pages/Order"));
const OrderPayment = lazy(() => import("../pages/OrderPayment"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Technology = lazy(() => import("../pages/Technology"));
const Casual = lazy(() => import("../pages/Casual"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />

      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/electronics" element={<Technology />} />
      <Route path="/casual" element={<Casual />} />
      <Route path="/*" element={<NotFound />} />

      <Route element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/orderPayment" element={<OrderPayment />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

export default router;
