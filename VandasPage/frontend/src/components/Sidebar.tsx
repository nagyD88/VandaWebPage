import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import EducationAdmin from "./EducationAdmin";
import EducationUser from "./EducationUser";
import LevelChanger from "./LevelChanger";

const Sidebar = () => {
  const { auth } = useContext(AuthContext);
  const PATH_ADMIN = "http://localhost:3000/Educationchanger";
  const PATH_USER = "http://localhost:3000/Education";

  let activeStyle = {
    backgroundColor: "gray",
  };

  return (
    <>
      <AuthProvider>
        <Routes>
          {window.location.href === PATH_ADMIN && (
          <Route path="EducationUser">
            <Route index element={<EducationUser />} />
            <Route path=":id" element={<LevelChanger />} />
            </Route>)}
          {window.location.href === PATH_USER && (
            <Route path="EducationAdmin">
              <Route index element={<EducationAdmin />} />
              <Route path=":id" element={<EducationAdmin />} />
            </Route>
          )}
        </Routes>
      </AuthProvider>
    </>
  );
};

export default Sidebar;
