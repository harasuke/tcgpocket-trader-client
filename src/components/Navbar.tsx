import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useSignUp, SignInButton, SignUp, useSignIn} from "@clerk/clerk-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="top-0 flex w-full flex-row justify-between bg-blue-500">
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
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "" : "")}>
          <UserOutlined className="profile-btn"></UserOutlined>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
