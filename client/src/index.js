import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";
import { browserTracingIntegration } from "@sentry/browser";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Suspense } from "react";

import store from "./store/store";
import router from "./routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

Sentry.init({
  dsn: "https://ef9fc40e86c03c7a2a23a08dfffab19d@o4510103155834880.ingest.de.sentry.io/4510103191748688",
  sendDefaultPii: true,
  integrations: [browserTracingIntegration()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <Suspense fallback={<div></div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);

reportWebVitals();
