import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import Test from "./pages/testing/test";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/userDashboard/mainPage/mainPage.jsx";
import AllAccounts from "./pages/userDashboard/allAccounts/allAccounts.js"
import Cards from "./pages/userDashboard/cards/cards"
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/allAccounts" element={<AllAccounts />} />
        <Route path="/cards" element={<Cards />} />
      </Route>
    )
  );

  return (
    <div className="App h-full">
      <ToastContainer position="top-right"></ToastContainer>

      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <div className="bg-gray-800 text-gray-200 h-full">
      <div>
        <Navbar />
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};
export default App;
