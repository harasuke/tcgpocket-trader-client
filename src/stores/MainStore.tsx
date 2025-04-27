import React, { createContext, useContext } from "react";

interface Store {
  isLoggedIn: boolean;
  preferredTheme: "Dark" | "Light" | "System";
}

export const MainStore = createContext<Store | undefined>(undefined);

export function useStoreContext() {
  const store = useContext(MainStore);

  if (store === undefined)
    throw new Error('useStoreContext must be used with MainStoreContext')

  return store;
}