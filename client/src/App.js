import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { setCart } from "./slices/cartSlice";
import "react-toastify/dist/ReactToastify.css";

import Flag from "./components/Flag";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "cart") {
        const newCartValue = event.newValue ? JSON.parse(event.newValue) : [];
        dispatch(setCart(newCartValue.cartItems));
        
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const color = useSelector((state) => state.settings.settings);

  return (
    <ErrorBoundary>
      <div
        style={{
          backgroundColor: `rgba${color}`,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div className="d-none d-xl-block">
        <Flag side="left"/>
        <Flag side="right"/>
        </div>
        <Header />
        <main className="py-3 d-flex" style={{ flexGrow: 1, marginTop: 120 }}>
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
