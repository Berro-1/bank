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
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/userDashboard/mainPage/mainPage.jsx";
import AllAccounts from "./pages/userDashboard/allAccounts/allAccounts";
import AllTransactionsPage from "./pages/userDashboard/allTransactions/allTransactions.jsx";
import LoansPage from "./pages/userDashboard/Loans/Loans.jsx";
import Cards from "./pages/userDashboard/cards/cards";
import Submissions from "./pages/userDashboard/submissions/submissions.jsx";
import Transfers from "./pages/userDashboard/transfers/transfers.jsx";
import AdminMainPage from "./pages/adminDashboard/mainPage/mainPage.jsx";
import AllUsers from "./pages/adminDashboard/allUsers/allUsers.jsx";
import ManageAccountPage from "./pages/adminDashboard/allUsers/manageAccount/manageAccount.jsx";
import AdminLoans from "./pages/adminDashboard/Loans/Loans.jsx";
import CreditCardSubmissionsPage from "./pages/adminDashboard/Submissions/Submissions.jsx";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.js";
import ServicesSection from "./pages/Services/Services.jsx";
import ServiceDetail from "./pages/Services/servicesDetails/serviceDetails.jsx";
import AboutUs from "./pages/aboutUs/aboutUs.jsx";
import ContactUsSection from "./pages/contactPage/contact.jsx";
import PendingUsers from "./pages/adminDashboard/pendingUsers/pendingUsers.jsx";
import ChatbotComponent from "./chatbotComponent.js";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<WithNavbarLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Services" element={<ServicesSection />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUsSection />} />
          <Route path="/Login" exact element={<Login />} />
        </Route>

        <Route element={<WithoutNavbarLayout />}>
          <Route
            path="/mainPage"
            element={
              <ProtectedRoute requiredRole="user">
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allAccounts"
            element={
              <ProtectedRoute requiredRole="user">
                <AllAccounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute requiredRole="user">
                <AllTransactionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loans"
            element={
              <ProtectedRoute requiredRole="user">
                <LoansPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cards"
            element={
              <ProtectedRoute requiredRole="user">
                <Cards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submissions"
            element={
              <ProtectedRoute requiredRole="user">
                <Submissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfers"
            element={
              <ProtectedRoute requiredRole="user">
                <Transfers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminMainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-account/:accountId"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageAccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Loans"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLoans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/credit-cards"
            element={
              <ProtectedRoute requiredRole="admin">
                <CreditCardSubmissionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pendingUsers"
            element={
              <ProtectedRoute requiredRole="admin">
                <PendingUsers />
              </ProtectedRoute>
            }
          />
        </Route>
      </>
    )
  );

  return (
    <div className="App h-full">
      <ToastContainer position="top-right"></ToastContainer>
      <ChatbotComponent />
      <RouterProvider router={router} />
    </div>
  );
}

const WithNavbarLayout = () => {
  return (
    <div className="text-gray-200 h-full">
      <div>
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

const WithoutNavbarLayout = () => {
  return (
    <div className="text-gray-200 h-full">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
