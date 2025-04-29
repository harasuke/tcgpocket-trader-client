import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface StoreContextProps {
  isLoggedIn: boolean;
  preferredTheme: "Dark" | "Light" | "System";
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionCookie = Cookies.get("__session");
  const themeCookie = Cookies.get("prefTheme");

  useEffect(() => {
    setIsLoggedIn(!!sessionCookie);
  }, [])

  const props:StoreContextProps = {
    isLoggedIn: isLoggedIn,
    preferredTheme: themeCookie ? themeCookie : "System",
    setIsLoggedIn: setIsLoggedIn
  };

  return (<StoreContext.Provider value={props}>{children}</StoreContext.Provider>)
}