import React from "react";
import DataContext from '../context/dataContext';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LevelType } from "../model/LevelType";
import { useQuery } from "react-query"
import api from "../hooks/api";


const Education = () => {
  let url = "https://localhost:7168/api/Education/level";

  const getLevels = async () => {
    const response = await api.get<LevelType[]>(url)
    return response.data
  }
  const { isLoading, isError, error , data } = useQuery('user', getLevels )

  const { colorTheme } = useContext(DataContext);
  console.log("eduLevel: ",data)
  


  return (
    <>
    {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && isError && (
        <p className="statusMsg err">{error?.message}</p>
      )}
      {!isLoading && !isError && (
    <>
      <ul className="course-list">
      {data?.map((level) => (
        
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
      )}
    </>
  );
};

export default Education;
