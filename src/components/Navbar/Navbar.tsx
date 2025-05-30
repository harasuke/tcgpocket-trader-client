import { NavLink, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { Dropdown, MenuProps } from "antd";
import { StoreContext } from "../../stores/StoreContext";
import useDropdownItems from "./UseDropdownItems";

const Navbar = () => {
  const { menuItems } = useDropdownItems();
  const storeContext = useContext(StoreContext);

  const { pathname, search, hash } = useLocation();

  const items: MenuProps["items"] = menuItems;

  return (
    <div
      className="navbar-transition sticky top-0 z-100 flex h-[--navbar-height] w-full flex-row justify-between"
      style={{
        backgroundColor: storeContext?.navbarColor,
      }}
    >
      <div className="m-3 self-center">
        <NavLink to="/">
          <img
            className="w-20 cursor-pointer"
            src="https://ptcgpocket.gg/wp-content/uploads/sites/51/2024/08/Pokemon-Trading-Card-Game-Pocket-Logo.webp"
          />
        </NavLink>
      </div>
      <div className="flex flex-row items-center">
        <NavLink
          to="/trades"
          className={({ isActive }) =>
            isActive ? "hero-font navbar-btn bg-gray-950" : "hero-font navbar-btn"
          }
        >
          Trades
        </NavLink>
        <NavLink
          to="/card-dex"
          className={({ isActive }) =>
            isActive ? "hero-font navbar-btn bg-gray-950" : "hero-font navbar-btn"
          }
        >
          My Card Dex
        </NavLink>

        {pathname != "/profile" && (
          <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <div className="mr-2 flex h-[2em] w-[2em] cursor-pointer items-center justify-center rounded-full bg-white">
              <UserOutlined />
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Navbar;
