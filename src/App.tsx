import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import OffersPage from "./pages/OffersPage";
import TradesPage from "./pages/TradesPage/TradesPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AccessRequiredPage } from "./pages/AccessRequiredPage/AccessRequiredPage";
import { AllTrades } from "./pages/AllTrades/AllTrades";
import { CardDexPage } from "./pages/CardDexPage/CardDexPage";

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

      <Route path="/card-dex" element={<CardDexPage />} />

      <Route path="/trades" element={<TradesPage />} />
      <Route path="/trades/view" element={<AllTrades />} />

      <Route path="/offers" element={<OffersPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/access-required" element={<AccessRequiredPage />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
