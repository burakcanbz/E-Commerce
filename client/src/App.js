import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Flag from "./components/Flag";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";

const App = () => {

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
          <Flag side="left" />
          <Flag side="right" />
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
