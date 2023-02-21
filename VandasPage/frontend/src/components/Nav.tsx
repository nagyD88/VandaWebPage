import React, { useEffect } from "react";
import {  NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useState } from "react";
import { useQuery } from "react-query";
import api from "../hooks/api";
import { LevelType } from "../model/LevelType";

const Nav = () => {
  let url = 'https://localhost:7168/api/Education/level';
  const { auth } = useContext(AuthContext);
  let [firstLevelID, setFirstLevelID]=useState<number>()
  


  const getLevels = async () => {
    const response = await api.get<LevelType[]>(url);
    return response.data;
  };
  const { isLoading, isError, error, data } = useQuery(
    'levels',
    getLevels
  );
  useEffect(() => {
    if(data !== undefined){
      setFirstLevelID(data[0].id);
    }
  
    
  }, [])
  
  let activeStyle = {
    backgroundColor: "gray"
  };

  return (
    <nav className=" h-[6vh] flex flex-auto text-center group">
      <ul className="min-w-[800px] w-screen overflow-visible flex flex-auto flex-wrap justify-around bg-[#003f5f] font-normal text-slate-200 default-text-shadow">
        <li
          className={`border-spacing-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
        >
          <NavLink className={"navBar"}
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </li>
        {auth.admin && (
          <>
            <li
              className={`border-spacing-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500`}
            >
              <NavLink className={"navBar"}
                to="preregister"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Előregisztráció
              </NavLink>
            </li>
            <li
              className={`border-spacing-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
            >
              <NavLink className={"navBar"}
                to="User"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Felhasználók
              </NavLink>
            </li>
            <li
              className={`border-spacing-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
            >
              <NavLink className={"navBar"}
                to={`EducationAdmin/${firstLevelID}`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Oktás Változtatás
              </NavLink>
            </li>
            <li
              className={`border-spacing-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
            >
              <NavLink className={"navBar"}
                to="sendEmail"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Email küldés
              </NavLink>
            </li>
          </>
        )}

        <li
          className={`border-spacing-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
        >
          <NavLink className={"navBar"}
            to="questionnaire"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Kérdőív
          </NavLink>
        </li>
        <li
          className={`border-spacing-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
        >
          <NavLink className={"navBar"}
            to={`Education/${firstLevelID}`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Oktató felület
          </NavLink>
        </li>
        <li
          className={`border-spacing-1.5 cursor-pointer hover:bg-[#eae8e885] active:bg-gray-500 `}
        >
          <NavLink className={"navBar"} to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
