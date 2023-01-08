import React from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import dataContext from '../context/dataContext';
import { useContext } from 'react';
import EducationMaterial from './EducationMaterial';
const Education = () => {
  let url = 'https://localhost:7168/api/education';
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const { colorTheme } = useContext(dataContext);
  console.log(data);

  return (
    <>
      <div>Education</div>
      {data.map(material => (
                <EducationMaterial key={material.id} material={material} />
            ))}
    </>
  );
};

export default Education;
