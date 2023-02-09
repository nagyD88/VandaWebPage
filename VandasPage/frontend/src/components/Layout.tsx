import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className={`App`}>
      <Header />
      <div className="mainPart">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
