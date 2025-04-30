import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Outlet } from "react-router";

enum _protectedCondition {
  loggedIn,
  notLoggedIn,
  notAuthorized,
}
type protectedCondition = keyof typeof _protectedCondition;

interface ProtectedRouteProps {
  condition: protectedCondition;
  to: string;
}

export const ProtectedRoute = ({ condition, to }: ProtectedRouteProps) => {
  const { isSignedIn } = useAuth();

  switch (condition) {
    case "loggedIn":
      return isSignedIn ? <Navigate to={to} replace={true} /> : <Outlet />;

    case "notLoggedIn":
      return !isSignedIn ? <Outlet /> : <Navigate to={to} replace={true} />;

    default:
      return <Outlet />;
  }
};
