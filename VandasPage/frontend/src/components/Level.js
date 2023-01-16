import React from 'react';
import EducationMaterial from './EducationMaterial';
import DataContext from '../context/dataContext';
import { useContext } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useParams } from 'react-router';
import AddEducationMaterial from './AddEducationMaterial';
import AuthContext from '../context/AuthProvider';
import Education from './Education';
import Dashboard from './Dashboard';
import { useState, useEffect } from 'react';
import api from '../hooks/api';


const Level = () => {
  const { id } = useParams();
  const dataUrl=`education/level/${id}`
  const { colorTheme } = useContext(DataContext);
  
  const { auth } = useContext(AuthContext);
  const [materialData, setMaterialData]=useState([]);
  const [counter, setCounter]=useState(0);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (url) => {
      
      try {
        const response = await api.get(url);
        if (isMounted) {
          setMaterialData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setMaterialData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData(dataUrl);
    console.log(counter);
  }, [counter, id]);
  
  
  return (
    <>
     {auth.roles && <Dashboard children={<AddEducationMaterial counter={counter} setCounter={setCounter} levelID={id} />}/>}
     <div><Education/></div>
      <h2>{materialData.name}</h2>
      {materialData.educationalMaterials?.map((material) => (
        <EducationMaterial key={material.id} material={material} />
      ))}
    </>
  );
};

export default Level;
