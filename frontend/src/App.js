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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/Login" element={<Login />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <ToastContainer position="top-right"></ToastContainer>

      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <div>
      <div>{/* <Navbar /> */}</div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
export default App;
