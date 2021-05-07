// Fetch wrapper to handle api requests and provides abstracted rest methods

import * as Sentry from "@sentry/react";
import { logout, getUser } from "../utils/authUtils";

async function apiClient<U>(endpoint: string, customConfig: RequestInit): Promise<U> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const user = getUser();

  // Add authorization token to all requests if present
  if (user?.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  return (
    window
      .fetch(endpoint, config)
      .then(async (response) => {
        //  Shouldn't be here, log em out
        if (response.status === 401) {
          logout();
          window.location.replace("/");
          return Promise.reject({ message: "Unauthorized: Please re-authenticate." });
        }

        // Return empty object to prevent app from bombing when API does not return data on 200's
        // This is a limitation with response.json()
        const data: U & { error?: string } = await response.json().catch(() => ({}));

        // 422 General errors, return them to the form, don't try and handle it with the ErrorStatusContext
        // so that the form can decide what to do with them
        if (response.status === 422) {
          return Promise.reject(data.error);
        }

        if (response.ok) {
          return data;
        }

        // Reject with the status code for the ErrorStatusContext
        return Promise.reject(response.status.toString());
      })
      // Catch everything else to sentry
      .catch((error) => {
        Sentry.captureException(error);
        return Promise.reject(error);
      })
  );
}

// GET Wrapper
async function GET<T>(endpoint: string, config?: RequestInit): Promise<T> {
  return await apiClient<T>(endpoint, { method: "GET", ...config });
}

// POST Wrapper
async function POST<T, U>(endpoint: string, body: T, config?: RequestInit): Promise<U> {
  return await apiClient<U>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    ...config,
  });
}

export { GET, POST };
