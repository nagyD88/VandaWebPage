import React from 'react';
import EducationMaterial from './EducationMaterial';

const Level = ({level}) => {

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
