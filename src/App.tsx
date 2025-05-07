import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import OffersPage from "./pages/OffersPage";
import TradesPage from "./pages/TradesPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { CreateTradePage } from "./pages/CreateTradePage/CreateTradePage";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route key={location.pathname} path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route element={<ProtectedRoute to="/" condition={"notLoggedIn"} />}>
        <Route path="/signin" element={<SignInPage />} />
      </Route>
      <Route element={<ProtectedRoute to="/" condition={"loggedIn"} />}>
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/trades" element={<TradesPage />} />
      <Route element={<ProtectedRoute to="/access-required" condition={"notLoggedIn"} />}>
        <Route path="/trades/create-trade" element={<CreateTradePage />} />
        <Route path="/trades/wonder-trade" element={<>placeholder</>} />
      </Route>
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
