import { useClerk } from "@clerk/clerk-react";
import { MenuProps } from "antd";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../stores/StoreContext";

export default function useUserMenuItems() {
  const { signOut } = useClerk();
  const storeContext = useContext(StoreContext);

  let menuItems: MenuProps["items"] = [];

  if (!!storeContext?.isSignedIn)
    menuItems = [
      {
        key: "1",
        label: <NavLink to="/profile">Settings</NavLink>,
      },
      {
        key: "2",
        label: (
          <button
            onClick={() => {
              signOut({ redirectUrl: "/signin" });
            }}
          >
            Logout
          </button>
        ),
      },
    ];
  else
    menuItems = [
      {
        key: "1",
        label: <NavLink to="/signin">Log In</NavLink>,
      },
      {
        key: "2",
        label: <NavLink to="/register">Register</NavLink>,
      },
    ];

  return { menuItems };
}
