import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import PrivateRoute from "../components/Auth/PrivateRoute";

const ProductDetail = lazy(() => import("../pages/Product/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Login = lazy(() => import("../pages/Registration/Login"));
const Register = lazy(() => import("../pages/Registration/Register"));
const Shipping = lazy(() => import("../pages/Shipping/Shipping"));
const Payment = lazy(() => import("../pages/Payment/Payment"));
const PlaceOrder = lazy(() => import("../pages/Order/PlaceOrder"));
const Order = lazy(() => import("../pages/Order/Order"));
const OrderPayment = lazy(() => import("../pages/Payment/OrderPayment"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Technology = lazy(() => import("../pages/Category/Technology"));
const Casual = lazy(() => import("../pages/Category/Casual"));

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
        <Route path="/pay/:id" element={<OrderPayment />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

export default router;
