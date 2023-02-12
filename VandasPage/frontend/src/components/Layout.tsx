import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="absolute text-center h-screen">
      <Header />
      <div className="mainPart pl-64 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
