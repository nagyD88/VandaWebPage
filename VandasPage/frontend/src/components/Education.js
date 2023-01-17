import React from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import dataContext from '../context/dataContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';



const Education = ({urlPart}) => {
  let url = 'https://localhost:7168/api/Education/level';
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const { colorTheme } = useContext(dataContext);
  
  console.log(data);

  const categorys = new Set();

  useEffect(() => {
    data.map((level) => categorys.add(level.categoryName));
    console.log('category');
    console.log(categorys);
  }, [data]);
  return (
    <>
      {data.map((level) => (
        <Link key={level.id} to={`/${urlPart}/${level.id}`}>
          <div className="level">
            <p>
              {level.name} 
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Education;
