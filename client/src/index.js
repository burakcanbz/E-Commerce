import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense } from "react";

import store from "./store/store";
import router from "./routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Suspense fallback={<div></div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);

reportWebVitals();
