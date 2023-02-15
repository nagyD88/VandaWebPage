import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Nav = () => {
  const { auth } = useContext(AuthContext);

  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  let activeStyle = {
    backgroundColor: "gray"
  };

  return (
    <nav className=" h-[6vh] flex flex-auto text-center group">
      <ul className="min-w-[800px] w-screen overflow-visible flex flex-auto flex-wrap justify-around bg-[#003f5f] font-normal text-slate-200 default-text-shadow">
        <li
          className={`p-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
        >
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </li>
        {auth.admin && (
          <>
            <li
              className={`p-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500`}
            >
              <NavLink
                to="preregister"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Előregisztráció
              </NavLink>
            </li>
            <li
              className={`p-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
            >
              <NavLink
                to="User"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Felhasználók
              </NavLink>
            </li>
            <li
              className={`p-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
            >
              <NavLink
                to="Educationchanger"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Oktás Változtatás
              </NavLink>
            </li>
            <li
              className={`p-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
            >
              <NavLink
                to="sendEmail"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Email küldés
              </NavLink>
            </li>
          </>
        )}

        <li
          className={`p-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
        >
          <NavLink
            to="questionnaire"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Kérdőív
          </NavLink>
        </li>
        <li
          className={`p-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
        >
          <NavLink
            to="Education"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Oktató felület
          </NavLink>
        </li>
        <li
          className={`p-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
        >
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
