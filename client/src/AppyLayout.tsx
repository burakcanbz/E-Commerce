import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import "./App.scss";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <div className="main-div">
      {children}
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
);

export default AppLayout;