import React from "react";
import { NavLink } from "react-router";

interface AccessRequiredPageProps {}

export const AccessRequiredPage = ({}: AccessRequiredPageProps) => {
  return (
    <>
      Per visualizzare la pagina desiderata e' necessario effettuare un{" "}
      <NavLink to="/signin" className="text-blue-500 underline">
        Login
      </NavLink>{" "}
      o{" "}
      <NavLink to="/register" className="text-blue-500 underline">
        Registrarsi
      </NavLink>
    </>
  );
};
