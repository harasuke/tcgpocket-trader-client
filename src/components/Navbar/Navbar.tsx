import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import {
  useSignUp,
  SignInButton,
  SignUp,
  useSignIn,
  SignedOut,
  SignedIn,
} from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Dropdown, MenuProps } from "antd";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <SignedOut>
          <li>
            <NavLink to="/signin">Log In</NavLink>
          </li>
        </SignedOut>
      ),
    },
    {
      key: "2",
      label: (
        <SignedOut>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </SignedOut>
      ),
    },
    {
      key: "3",
      label: (
        <SignedIn>
          <li>
            <NavLink to="/profile">Settings</NavLink>
          </li>
        </SignedIn>
      ),
    },
    {
      key: "4",
      label: (
        <SignedIn>
          <li>
            <button onClick={() => null}>Logout</button>
          </li>
        </SignedIn>
      ),
    }
  ];

  return (
    <div className="relative top-0 flex w-full flex-row justify-between bg-blue-500">
      <div className="m-3 self-center">
        <img
          className="w-20"
          src="https://ptcgpocket.gg/wp-content/uploads/sites/51/2024/08/Pokemon-Trading-Card-Game-Pocket-Logo.webp"
        ></img>
      </div>
      <div className="flex flex-row items-center">
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "navbar-btn bg-gray-950" : "navbar-btn")}
        >
          Register
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "navbar-btn bg-gray-950" : "navbar-btn")}
        >
          Home
        </NavLink>
        <NavLink
          to="/trades"
          className={({ isActive }) => (isActive ? "navbar-btn bg-gray-950" : "navbar-btn")}
        >
          Trades
        </NavLink>
        <NavLink
          to="/offers"
          className={({ isActive }) => (isActive ? "navbar-btn bg-gray-950" : "navbar-btn")}
        >
          Offers
        </NavLink>
        <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
          <div className="mr-2 h-[2em] w-[auto]">
            <UserOutlined />
          </div>
        </Dropdown>

        {/*
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "" : "")}>
          <UserOutlined
            tabIndex={0}
            className="profile-btn"
            onMouseOver={(e) => e.currentTarget.focus()}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 100)}
          ></UserOutlined>
        </NavLink>
        {open && (
          <ul className="profile-dropdown absolute top-[80%] right-0 m-2 rounded-md bg-white shadow-md">
            <SignedOut>
              <li>
                <NavLink to="/signin">
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  yolo
                </NavLink>
              </li>
            </SignedOut>
          </ul>
        )}
        */}
      </div>
    </div>
  );
};

export default Navbar;
