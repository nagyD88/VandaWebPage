import React from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
import DataContext from '../context/dataContext';
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const Education = ({ urlPart }) => {
  let url = "https://localhost:7168/api/Education/level";
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const { colorTheme, counter } = useContext(DataContext);

  console.log(data);

  const categorys = new Set();

  useEffect(() => {
    data?.map((level) => categorys.add(level.categoryName));
    console.log("category");
    console.log(categorys);
  }, [data, counter]);
  return (
    <>
      <ul className="course-list">
      {data.map((level) => (
        <li>
          <Link key={level.id} to={`/Education/${level.id}`}>
            {level.name}
          </Link>
        </li>
      ))}
      </ul>
      <button className="btn">New course</button>
      <button className="btn">New lesson</button>
      
    </>
  );
};

export default Education;
