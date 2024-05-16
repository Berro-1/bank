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
import AllAccounts from "./pages/userDashboard/mainPage/allAccounts.js"
import AllTransactionsPage from "./pages/userDashboard/allTransactions/allTransactions.jsx";
import LoansPage from "./pages/userDashboard/Loans/Loans.jsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/allAccounts" element={<AllAccounts />} />
        <Route path="/transactions" element={<AllTransactionsPage />} />
        <Route path="/loans" element={<LoansPage />} />
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
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
export default App;
