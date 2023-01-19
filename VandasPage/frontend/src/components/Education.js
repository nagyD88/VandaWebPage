import React from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import dataContext from '../context/dataContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';




const Education = ({urlPart}) => {
  const { auth } = useAuth();
  let url = `https://localhost:7168/api/user/${auth.id}`;
  
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const { colorTheme, counter } = useContext(dataContext);
  console.log(data);

  
  
  return (
    <>
      {data?.levels?.map((level) => (
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
