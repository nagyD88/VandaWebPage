import React from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import dataContext from '../context/dataContext';
import { useContext, useEffect } from 'react';
import Level from './Level';
import AddEducationMaterial from './AddEducationMaterial';
import AuthContext from '../context/AuthProvider';

const Education = () => {
  let url = 'https://localhost:7168/api/Education/level';
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const { colorTheme } = useContext(dataContext);
  const { auth } = useContext(AuthContext);
  console.log(data);

  const categorys = new Set();

  useEffect(() => {
    data.map((level) => categorys.add(level.categoryName));
    console.log("category")
    console.log(categorys);
  }, [data]);
  return (
    <>
      <div>Education</div>
      {auth.roles && <AddEducationMaterial/>}
      {data.map((level) => (
        <Level key={level.id} level={level} />
      ))}
    </>
  );
};

export default Education;
