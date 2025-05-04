import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { StoreProvider } from "./stores/StoreContext";
import { AnimatePresence } from "motion/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
  throw new Error("Clerk key on .env file not found");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/signin">
      <StoreProvider>
        <AnimatePresence mode="wait">
        {/* <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}> */}
        <DndProvider backend={HTML5Backend}>
          <App />
          </DndProvider>
        </AnimatePresence>
      </StoreProvider>
    </ClerkProvider>
  </StrictMode>,
);
