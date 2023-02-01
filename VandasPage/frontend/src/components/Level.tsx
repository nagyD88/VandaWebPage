import React, { useContext } from 'react';
import EducationMaterial from './EducationMaterial';
import DataContext from '../context/dataContext';

import { useParams } from 'react-router';
import AuthContext from '../context/AuthProvider';
import Education from './Education';
import { useQuery } from "react-query"
import { LevelType } from '../model/LevelType';
import api from '../hooks/api';



const Level = () => {
    
  const { id } = useParams();
  const url=`/education/level/${id}`

  const getLevel = async () => {
    const response = await api.get<LevelType>(url)
    return response.data
  }

  const { isLoading, isError, error , data } = useQuery('level', getLevel )
  const { colorTheme } = useContext(DataContext);
  const { auth } = useContext(AuthContext);
  console.log(data)
  console.log(url)
  return (
    <>
    {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && isError && (
        <p className="statusMsg err">{error instanceof Error && error.message}</p>
      )}
      {!isLoading && !isError && (
    <>
     
     <div><Education /></div>
     
      <h2>{data?.name}</h2>
      {data?.educationalMaterials?.map((material) => (
        <EducationMaterial key={material.id} material={material} canDelete={false} />
      ))}
    </>
      )}
    </>
  );
};

export default Level;