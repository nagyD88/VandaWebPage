import React from 'react';
import EducationMaterial from './EducationMaterial';
import DataContext from '../context/dataContext';
import { useParams } from 'react-router';
import AddEducationMaterial from './modallContent/AddEducationMaterial';
import AuthContext from '../context/AuthProvider';
import Dashboard from './utility/Dashboard';
import { useContext } from 'react';
import api from '../hooks/api';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../utils/StrictModeDroppable';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import EducationChanger from './EducationChanger';
import { EducationMaterialtype } from '../model/EducationMaterialType';
import { LevelType } from '../model/LevelType';
import IsLoading from './utility/isLoading';

const LevelChanger = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const url = `/education/level/${id}`;

  const getLevel = async () => {
    const response = await api.get<LevelType>(
      `/education/level/${id}`
    );
    return response.data;
  };

  const { isLoading, isError, error, data } = useQuery(
    'level',
    getLevel
  );

  const { colorTheme } = useContext(DataContext);

  const { auth } = useContext(AuthContext);

  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const updateOrder = async (levelsJSON) =>
    await api.patch(
      '/Education/level/materials/changeorder',
      levelsJSON,
      config
    );

  const updateEduMaterialOrderMutation = useMutation(updateOrder, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('level');
    },
  });

  const handleOnDragEnd = async (result) => {
    if (!result?.destination) return;
    const Materials = Array.from(data?.educationalMaterials!);
    const [reorderedItem] = Materials.splice(result.source.index, 1);
    Materials.splice(result.destination.index, 0, reorderedItem);

    const materialsJSON = JSON.stringify(Materials);
    updateEduMaterialOrderMutation.mutate(materialsJSON);
  };

  return (
    <IsLoading
      children={
        <>
          <Dashboard
            children={
              <AddEducationMaterial levelID={id} hideModal={''} />
            }
          />
          <div>
            <EducationChanger />
          </div>
          <h2>{data?.name}</h2>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="educationMaterials">
              {(provided) => (
                <section
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data?.educationalMaterials?.map(
                    (material: EducationMaterialtype) => {
                      return (
                        <Draggable
                          key={material.id}
                          draggableId={material.id.toString()}
                          index={material.index}
                        >
                          {(provided) => (
                            <article
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <EducationMaterial
                                key={material.id}
                                material={material}
                                canDelete={true}
                              />
                            </article>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </section>
              )}
            </Droppable>
          </DragDropContext>
        </>
      }
      isError={isError}
      isLoading={isLoading}
      error={error as Error}
    />
  );
};

export default LevelChanger;
