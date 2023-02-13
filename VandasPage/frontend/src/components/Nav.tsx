import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Nav = () => {
  const { auth } = useContext(AuthContext);
  return (
    <nav className=" h-[6vh] flex flex-auto text-center group">
      <ul className="min-w-[800px] w-screen overflow-visible flex flex-auto flex-wrap justify-around bg-gradient-to-tl from-blue-500 font-normal default-text-shadow translate-y-[-170%] transition-all duration-[1500ms] group-hover:translate-y-[0%]">
        <li className={`p-1.5 cursor-pointer hover:bg-[#eae8e8] active:bg-gray-500 `}>
          <Link to="/">Home</Link>
        </li>
        {auth.admin && (
          <>
            <li className={`p-1.5 cursor-pointer hover:bg-[#eae8e8] active:bg-gray-500 `}>
              <Link to="preregister">Előregisztráció</Link>
            </li>
            <li className={`p-1.5 cursor-pointer hover:bg-[#eae8e8] active:bg-gray-500 `}>
              <Link to="User">Felhasználók</Link>
            </li>
            <li className={`p-1.5 cursor-pointer hover:bg-[#eae8e8] active:bg-gray-500 `}>
              <Link to="Educationchanger">Oktás Változtatás</Link>
            </li>
            <li className={`p-1.5 cursor-pointer hover:bg-[#eae8e8] active:bg-gray-500 `}>
              <Link to="sendEmail">Email küldés</Link>
            </li>
          </>
        )}

        <li className={`p-1.5 cursor-pointer hover:bg-[#eae8e8] active:bg-gray-500 `}>
          <Link to="questionnaire">Kérdőív</Link>
        </li>
        <li className={`p-1.5 cursor-pointer hover:bg-[#eae8e8] active:bg-gray-500 `}>
          <Link to="Education">Oktató felület</Link>
        </li>
        <li className={`p-1.5 cursor-pointer hover:bg-[#eae8e8] active:bg-gray-500 `}>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
