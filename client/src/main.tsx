import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { browserTracingIntegration } from "@sentry/browser";
import * as Sentry from "@sentry/react";

import store from "./store/store";
import router from "./routes/Routes.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

Sentry.init({
  dsn: "https://ef9fc40e86c03c7a2a23a08dfffab19d@o4510103155834880.ingest.de.sentry.io/4510103191748688",
  sendDefaultPii: true,
  integrations: [browserTracingIntegration()],
  tracesSampleRate: 1.0,
  environment: import.meta.env.MODE ?? "production",
});

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
