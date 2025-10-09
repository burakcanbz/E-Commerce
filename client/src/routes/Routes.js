import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App.tsx";
import Home from "../pages/Home/Home.tsx";
import PrivateRoute from "../components/Auth/PrivateRoute.tsx";
import Loading from "../components/Common/Loading";

const ProductDetail = lazy(() => import("../pages/Product/ProductDetail.tsx"));
const Cart = lazy(() => import("../pages/Cart/Cart.tsx"));
const Login = lazy(() => import("../pages/Registration/Login.tsx"));
const Register = lazy(() => import("../pages/Registration/Register.tsx"));
const Shipping = lazy(() => import("../pages/Shipping/Shipping.tsx"));
const Payment = lazy(() => import("../pages/Payment/Payment.tsx"));
const PlaceOrder = lazy(() => import("../pages/Order/PlaceOrder.tsx"));
const Order = lazy(() => import("../pages/Order/Order.tsx"));
const OrderPayment = lazy(() => import("../pages/Payment/OrderPayment.tsx"));
const Profile = lazy(() => import("../pages/Profile/Profile.tsx"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound.tsx"));
const CategoryPage = lazy(() => import("../pages/Category/CategoryPage.tsx"));

const withSuspense = (Component) => (
  <Suspense fallback={<div style={{height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loading /></div>}>
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