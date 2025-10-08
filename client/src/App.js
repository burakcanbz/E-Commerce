import { Profiler } from "react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { bottomNavigationPaths } from "./utils/helpers";
import Flag from "./components/Common/Flag";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import CardCheckoutBanner from "./components/Payment/CardCheckoutBanner";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const App = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const shouldBottomNavigationShown = window.innerWidth <= 480;

  function onRenderCallback(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) {
    if(process.env.NODE_ENV !== "development") return;
    console.log(`[Profiler: ${id}]`);
    console.log(`Phase: ${phase}`);
    console.log(`Actual render duration: ${actualDuration.toFixed(2)}ms`);
    console.log(`Base duration: ${baseDuration.toFixed(2)}ms`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
    console.log(`Interactions:`, interactions);
    console.log("---------------");
  }

  return (
    <Profiler onRender={onRenderCallback}>
      <ErrorBoundary>
        <div className="main-div">
          <div>
            <Flag side="left" />
            <Flag side="right" />
          </div>
          <Header />
          <main className="py-3" style={{ flexGrow: 1, marginTop: 120 }}>
            <Outlet />
          </main>
          {shouldBottomNavigationShown &&
          cartItems.length &&
          bottomNavigationPaths.includes(location.pathname) ? (
            <CardCheckoutBanner />
          ) : (
            <Footer />
          )}
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            limit={3}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </ErrorBoundary>
    </Profiler>
  );
};

export default App;
