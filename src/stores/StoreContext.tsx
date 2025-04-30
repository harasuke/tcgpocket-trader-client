import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@clerk/clerk-react";

interface StoreContextProps {
  isSignedIn: boolean | undefined;
  preferredTheme: "Dark" | "Light" | "System";
}

export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider = ({children}) => {
  const { isSignedIn } = useAuth();

  const themeCookie = Cookies.get("prefTheme");

  const props:StoreContextProps = {
    isSignedIn: isSignedIn,
    preferredTheme: themeCookie ? themeCookie : "System",
  };

  return (<StoreContext.Provider value={props}>{children}</StoreContext.Provider>)
}