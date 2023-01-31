import React, { useContext } from 'react';
import EducationMaterial from './EducationMaterial';
import DataContext from '../context/dataContext';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useParams } from 'react-router';
import AuthContext from '../context/AuthProvider';
import Education from './Education';



const Level = () => {
    
  const { id } = useParams();
  const url=`https://localhost:7168/api/education/level/${id}`
  const { colorTheme } = useContext(DataContext);
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const { auth } = useContext(AuthContext);
  console.log(data)
  console.log(url)
  return (
    <>
     
     <div><Education /></div>
     
      <h2>{data.name}</h2>
      {data?.educationalMaterials?.map((material) => (
        <EducationMaterial key={material.id} material={material} canDelete={false} />
      ))}
    </>
  );
};

export default Level;