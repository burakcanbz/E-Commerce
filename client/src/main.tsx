import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import store from "./store/store";
import router from "./routes/Routes.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);
