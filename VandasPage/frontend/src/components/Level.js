import React from 'react';
import EducationMaterial from './EducationMaterial';
import DataContext from '../context/dataContext';
import { useContext } from 'react';

const Level = ({ level }) => {
  const { colorTheme } = useContext(DataContext);
 


  return (
    <>
     
      <h2>{level.name}</h2>
      {level.educationalMaterials?.map((material) => (
        <EducationMaterial key={material.id} material={material} />
      ))}
    </>
  );
};

export default Level;
