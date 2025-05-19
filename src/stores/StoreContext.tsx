import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@clerk/clerk-react";
import { CardLanguage } from "src/types/CardLanguage";
import { SystemTheme } from "src/types/SystemTheme";

interface StoreContextProps {
  isSignedIn: boolean | undefined;
  preferredTheme: SystemTheme;
  navbarColor: string;
  setNavbarColor: React.Dispatch<React.SetStateAction<string>>;
  favouriteLanguage: CardLanguage;
  setFavouriteLanguage: React.Dispatch<React.SetStateAction<CardLanguage>>;
  cardDexLanguage: CardLanguage;
  setCardDexLanguage: React.Dispatch<React.SetStateAction<CardLanguage>>;
}

export const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider = ({ children }) => {
  const { isSignedIn } = useAuth();

  if ((Cookies.get("prefTheme") as SystemTheme) == undefined) {
    Cookies.set("prefTheme", SystemTheme.SYSTEM);
  }
  const themeCookie = Cookies.get("prefTheme") as SystemTheme;

  if ((Cookies.get("language") as CardLanguage) == undefined) {
    Cookies.set("language", CardLanguage.IT);
  }
  const _favouriteLanguage = Cookies.get("language") as CardLanguage;

  if ((Cookies.get("cardDexLanguage") as CardLanguage) == undefined) {
    Cookies.set("cardDexLanguage", CardLanguage.IT);
  }
  const _cardDexLanguage = Cookies.get("cardDexLanguage") as CardLanguage;

  // const [navbarColor, setNavbarColor] = useState("#2B7FFF") // default color blue
  const [navbarColor, setNavbarColor] = useState("#E56A44");
  const [favouriteLanguage, setFavouriteLanguage] = useState(_favouriteLanguage);
  const [cardDexLanguage, setCardDexLanguage] = useState(_cardDexLanguage);

  useEffect(() => {
    Cookies.set("language", favouriteLanguage);
  }, [favouriteLanguage]);

  useEffect(() => {
    Cookies.set("cardDexLanguage", cardDexLanguage);
  }, [cardDexLanguage])

  const props: StoreContextProps = {
    isSignedIn: isSignedIn,
    preferredTheme: themeCookie ? themeCookie : SystemTheme.SYSTEM,
    navbarColor: navbarColor,
    setNavbarColor: setNavbarColor,
    favouriteLanguage: favouriteLanguage ? favouriteLanguage: CardLanguage.IT,
    setFavouriteLanguage: setFavouriteLanguage,
    cardDexLanguage: cardDexLanguage,
    setCardDexLanguage: setCardDexLanguage
  };

  return <StoreContext.Provider value={props}>{children}</StoreContext.Provider>;
};
