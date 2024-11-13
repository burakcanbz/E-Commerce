import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";
import { ProductDetail } from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shipping from "../pages/Shipping";
import Payment from "../pages/Payment";
import PlaceOrder from "../pages/PlaceOrder";
import Order from "../pages/Order";
import OrderPayment from "../pages/OrderPayment";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<NotFound />} />

      <Route path="" element={<PrivateRoute />}>
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
