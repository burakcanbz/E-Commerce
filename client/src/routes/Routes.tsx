import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import PrivateRoute from "../components/Auth/PrivateRoute";
import Loading from "../components/Common/Loading";

import type { ReactElement } from "react";

// Lazy load sayfalar
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

// Suspense wrapper
const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType<any>>
): ReactElement => (
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

// Router tanımı
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Ana sayfa */}
      <Route index element={<Home />} />

      {/* Public lazy sayfalar */}
      <Route path="/product/:id" element={withSuspense(ProductDetail)} />
      <Route path="/cart" element={withSuspense(Cart)} />
      <Route path="/login" element={withSuspense(Login)} />
      <Route path="/register" element={withSuspense(Register)} />
      <Route path="/category" element={withSuspense(CategoryPage)} />
      <Route path="/*" element={withSuspense(NotFound)} />

      {/* Private routes */}
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
