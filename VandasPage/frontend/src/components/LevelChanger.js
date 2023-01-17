import React from 'react';
import EducationMaterial from './EducationMaterial';
import DataContext from '../context/dataContext';
import { useParams } from 'react-router';
import AddEducationMaterial from './AddEducationMaterial';
import AuthContext from '../context/AuthProvider';
import Education from './Education';
import Dashboard from './Dashboard';
import { useContext, useState, useEffect } from 'react';
import api from '../hooks/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../utils/StrictModeDroppable';
import useAxiosFetch from '../hooks/useAxiosFetch';
import axios from 'axios';

const Level = () => {
  const { id } = useParams();
  const url= `https://localhost:7168/api/education/level/${id}`
  
  const dataUrl = `education/level/${id}`;
  const { colorTheme, counter } = useContext(DataContext);
  const { data } = useAxiosFetch(url);
  
  const { auth } = useContext(AuthContext);
  const [materialData, setMaterialData] = useState(data||[]);
  const [eduMaterials, setEduMaterials] = useState(data.educationalMaterials || [])
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  


  useEffect(() => {
    let isMounted = true;

    const fetchData = async (url) => {
      try {
        const response = await api.get(url);
        if (isMounted) {
          setMaterialData(response.data);
          setEduMaterials(response.data.educationalMaterials);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setMaterialData([]);
          setEduMaterials([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData(dataUrl);
    console.log(counter);
  }, [counter, id]);

  const handleOnDragEnd = async (result) => {
    if (!result?.destination) return;
    const Materials = Array.from(eduMaterials);
    const [reorderedItem] = Materials.splice(result.source.index, 1);
    Materials.splice(result.destination.index, 0, reorderedItem);
    setEduMaterials(Materials);
    const materialsJSON = JSON.stringify(Materials);
    console.log(materialsJSON);
    const config = {headers:{ "Content-Type" : "application/json" }}
    const response = await api.patch('/Education/level/materials/changeorder', materialsJSON, config);
    console.log(response);
  };

  return (
    <>
      {auth.roles && (
        <Dashboard children={<AddEducationMaterial levelID={id} />} />
      )}
      <div>
        <Education />
      </div>
      <h2>{materialData.name}</h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="educationMaterials">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef} >
              {eduMaterials?.map((material) => {
                return (
                  <Draggable key={material.id} draggableId={material.id.toString()} index={material.index} >
                     {(provided) => (
                      <article ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                        <EducationMaterial key={material.id} material={material} />
                      </article>
                      )}
                  </Draggable>
                )})}
                {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default LevelChanger;
