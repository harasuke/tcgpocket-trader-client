import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import TradesPage from './pages/TradesPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import React from 'react';
import RegisterPage from './pages/RegisterPage';


let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/signin" element={<SignInPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/trades" element={<TradesPage/>}/>
      <Route path="/offers" element={<OffersPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router}/>
}

export default App
