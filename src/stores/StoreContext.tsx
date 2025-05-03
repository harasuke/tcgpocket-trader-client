import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@clerk/clerk-react";

interface StoreContextProps {
  isSignedIn: boolean | undefined;
  preferredTheme: "Dark" | "Light" | "System";
  navbarColor: string,
  setNavbarColor: React.Dispatch<React.SetStateAction<string>>
}

export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider = ({children}) => {
  const { isSignedIn } = useAuth();

  const themeCookie = Cookies.get("prefTheme");

  // const [navbarColor, setNavbarColor] = useState("#2B7FFF") // default color blue
  const [navbarColor, setNavbarColor] = useState("#E56A44")

  const props:StoreContextProps = {
    isSignedIn: isSignedIn,
    preferredTheme: themeCookie ? themeCookie : "System",
    navbarColor: navbarColor,
    setNavbarColor: setNavbarColor
  };

  return (<StoreContext.Provider value={props}>{children}</StoreContext.Provider>)
}