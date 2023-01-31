import React from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
import DataContext from '../context/dataContext';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LevelType } from "../model/LevelType";

const Education = () => {
  let url = "https://localhost:7168/api/Education/level";
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const { colorTheme } = useContext(DataContext);
  
  


  return (
    <>
      <ul className="course-list">
      {data?.map((level: LevelType) => (
        
        <li>
          <>
          { console.log("level Id: ",level.id)}
          <Link key={level.id} to={`/Education/${level.id}`}>
            {level.name}
          </Link>
          </>
        </li>
      ))}
      </ul>
      <button className="btn">New course</button>
      <button className="btn">New lesson</button>
      
    </>
  );
};

export default Education;
