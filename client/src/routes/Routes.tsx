import { lazy, Suspense} from "react";
import type { ReactNode } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import PrivateRoute from "../components/Auth/PrivateRoute";
import Loading from "../components/Common/Loading";

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
const CategoryPage = lazy(() => import("../pages/Category/CategoryPage"));

const withSuspense = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.LazyExoticComponent<React.ComponentType<any>>
): ReactNode => (
  <Suspense
    fallback={
      <div
        style={{
          height: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading />
      </div>
    }
  >
    <Component />
  </Suspense>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />

      <Route path="/product/:id" element={withSuspense(ProductDetail)} />
      <Route path="/cart" element={withSuspense(Cart)} />
      <Route path="/login" element={withSuspense(Login)} />
      <Route path="/register" element={withSuspense(Register)} />
      <Route path="/category" element={withSuspense(CategoryPage)} />
      <Route path="/*" element={withSuspense(NotFound)} />

      <Route element={<PrivateRoute />}>
        <Route path="/shipping" element={withSuspense(Shipping)} />
        <Route path="/payment" element={withSuspense(Payment)} />
        <Route path="/placeorder" element={withSuspense(PlaceOrder)} />
        <Route path="/order/:id" element={withSuspense(Order)} />
        <Route path="/pay/:id" element={withSuspense(OrderPayment)} />
        <Route path="/profile" element={withSuspense(Profile)} />
      </Route>
    </Route>
  )
);

export default router;