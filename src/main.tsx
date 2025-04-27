import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { MainStore } from "./stores/MainStore.js";
import Cookies from "js-cookie";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
  throw new Error("Clerk key on .env file not found");
}

const sessionCookie = Cookies.get("__session");
const themeCookie = Cookies.get("prefTheme");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/signin">
      <MainStore.Provider
        value={{
          isLoggedIn: sessionCookie === undefined ? false : true,
          preferredTheme: themeCookie === undefined ? "System" : themeCookie,
        }}
      >
        <App />
      </MainStore.Provider>
    </ClerkProvider>
  </StrictMode>,
);
