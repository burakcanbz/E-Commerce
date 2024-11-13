import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import router from "./routes/Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);

reportWebVitals();
