import React from 'react';
import { useQuery, useMutation, useQueryClient} from "react-query"
import dataContext from '../context/dataContext';
import { useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../utils/StrictModeDroppable';
import api from '../hooks/api';
import AddLevel from './AddLevel';
import Dashboard from './Dashboard';
import AreYouSure from './AreYouSure';
import { LevelType } from '../model/LevelType';



const EducationChanger = () => {
  let url = `/education/level`;

  const getLevels = async () => {
    const response = await api.get<LevelType[]>(url)
    return response.data
  }

  const queryClient = useQueryClient()

  const { isLoading, isError, error , data } = useQuery('levels', getLevels)

  const { colorTheme, counter, setCounter } = useContext(dataContext);
  console.log(data)
  console.log(url)
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const updateOrder =async (levelsJSON)=> await api.patch(
    '/Education/level/changeorder',
    levelsJSON,
    config
  );


  const deleteLevel = async(levelID)=>await api.delete(`/Education/level/${levelID}`);

  const deleteLevelMutation = useMutation(deleteLevel, {
    onSuccess: () => {
        // Invalidates cache and refetch 
        queryClient.invalidateQueries('level')
    }
})

  const updateLevelOrderMutation = useMutation(updateOrder, {
    onSuccess: () => {
        // Invalidates cache and refetch 
        queryClient.invalidateQueries('level')
    }
})
  

  const handleOnDragEnd = async (result) => {
    if (!result?.destination) return;
    const Levels:LevelType[] = Array.from(data!);
    const [reorderedItem] = Levels.splice(result.source.index, 1);
    Levels.splice(result.destination.index, 0, reorderedItem);
    const iDs = new Array();
    Levels.map((level) => iDs.push({ id: level.id }));
    const levelsJSON = JSON.stringify(iDs);
    updateLevelOrderMutation.mutate(levelsJSON);
  };

  const handleOnClick = async (levelID) => {
    deleteLevelMutation.mutate(levelID)
  }


  return (
    <>
      <Dashboard children={<AddLevel hideModal={undefined}  />} /> 

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="levels">
          {(provided) => (
            <section
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data?.map((level) => {
                return (
                  <Draggable
                    key={level.id}
                    draggableId={level.id.toString()}
                    index={level.index}
                  >
                    {(provided) => (
                      <article
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Dashboard
                          children={
                            <AreYouSure
                              levelID={level.id}
                              handleOnClick={handleOnClick}
                              messege={'Biztos le akarod törölni?'} 
                              hideModal={undefined}/> // kell neki hidemodal?
                          }
                        />
                        <Link
                          key={level.id}
                          to={`/Educationchanger/${level.id}`}
                        >
                          <div className="level">
                            <p>{level.name}</p>
                          </div>
                        </Link>
                      </article>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default EducationChanger;
