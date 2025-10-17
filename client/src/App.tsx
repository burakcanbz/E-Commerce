import { Outlet } from "react-router-dom";

import CardCheckoutBanner from "./components/Payment/CardCheckoutBanner.tsx";
import AppyLayout from "./AppyLayout.tsx";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

import type { JSX } from "react";
import useShouldShowBanner from "./hooks/useShouldShowBanner.tsx";

const App = (): JSX.Element => {
  const shouldShowBanner = useShouldShowBanner();

  return (
    <AppyLayout>
      <Header />
      <main className="py-3" style={{ flexGrow: 1, marginTop: 120 }}>
        <Outlet />
      </main>
      {shouldShowBanner ? <CardCheckoutBanner /> : <Footer />}
    </AppyLayout>
  );
};

export default App;