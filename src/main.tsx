import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { StoreProvider } from "./stores/StoreContext";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
  throw new Error("Clerk key on .env file not found");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/signin">
      <StoreProvider>
        <App />
      </StoreProvider>
    </ClerkProvider>
  </StrictMode>,
);
