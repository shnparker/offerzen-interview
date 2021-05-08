import "./appbootstrap/monitoring";
import "./appbootstrap/apimock";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ErrorHandlerProvider } from "./contexts/ErrorStatusContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "@sentry/react";
import SomethingWentWrong from "./modules/errors/SomethingWentWrong";
import App from "./App";
import "./index.css";
import { SnackBarProvider } from "./contexts/SnackbarContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Final fallback for all other errors */}
        <ErrorBoundary fallback={SomethingWentWrong}>
          <ErrorHandlerProvider>
            <AuthProvider>
              <SnackBarProvider>
                <App />
              </SnackBarProvider>
            </AuthProvider>
          </ErrorHandlerProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
