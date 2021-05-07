import * as Sentry from "@sentry/react";
import { setLogger } from "react-query";

if (process.env.REACT_APP_APP_STAGE !== "development") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_APP_STAGE,
  });

  setLogger({
    log: (message: string) => {
      Sentry.captureMessage(message);
    },
    warn: (message: string) => {
      Sentry.captureMessage(message);
    },
    error: (error: string) => {
      Sentry.captureException(new Error(`API Call Error: ${error}`));
    },
  });
}
