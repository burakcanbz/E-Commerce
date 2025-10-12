import { Profiler, JSX } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { bottomNavigationPaths } from "./utils/helpers";
import { CartItem, RootState } from "./types/redux";
import CardCheckoutBanner from "./components/Payment/CardCheckoutBanner.tsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer.tsx";
import Flag from "./components/Common/Flag.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";


const App = (): JSX.Element => {
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.cartItems);
  const location: ReturnType<typeof useLocation> = useLocation();
  const shouldBottomNavigationShown: boolean = window.innerWidth <= 480;

  const onRenderCallback = (
    id: string,
    phase: "mount" | "update" | "nested-update", 
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions?: Set<any>
  ) => {
    if(process.env.NODE_ENV !== "development") return;
    // console.log(`[Profiler: ${id}]`);
    // console.log(`Phase: ${phase}`);
    // console.log(`Actual render duration: ${actualDuration.toFixed(2)}ms`);
    // console.log(`Base duration: ${baseDuration.toFixed(2)}ms`);
    // console.log(`Start time: ${startTime}`);
    // console.log(`Commit time: ${commitTime}`);
    // console.log(`Interactions:`, interactions);
    // console.log("---------------");
  }

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <ErrorBoundary>
        <div className="main-div">
          <Header />
          <main className="py-3" style={{ flexGrow: 1, marginTop: 120 }}>
            <Outlet />
          </main>
          {shouldBottomNavigationShown &&
          Boolean(cartItems.length) &&
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