import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="absolute text-center h-screen">
      <Header />
      <div className="flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
