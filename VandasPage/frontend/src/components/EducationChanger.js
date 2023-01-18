import React from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import dataContext from '../context/dataContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../utils/StrictModeDroppable';
import api from '../hooks/api';


const EducationChanger = ({ urlPart }) => {
  let dataURL = 'https://localhost:7168/api/Education/level';
  const { data, fError, fLoading } = useAxiosFetch(dataURL);
  const { colorTheme } = useContext(dataContext);
  const [levels, setLevels] = useState(data || [])
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("levels: ",levels);
  console.log("data: ",data);

  const categorys = new Set();

  useEffect(() => {
    data.map((level) => categorys.add(level.categoryName));
    console.log('category');
    console.log(categorys);
  }, [data]);


 

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (url) => {
      try {
        const response = await api.get(url);
        if (isMounted) {
          setLevels(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setLevels([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData(dataURL);
  }, []);

  const handleOnDragEnd = async (result) => {
    if (!result?.destination) return;
    const Levels = Array.from(levels);
    const [reorderedItem] = Levels.splice(result.source.index, 1);
    Levels.splice(result.destination.index, 0, reorderedItem);
    setLevels(Levels);
    const iDs=new Array();
    Levels.map((level)=>iDs.push({id:level.id}))
    const levelsJSON = JSON.stringify(iDs);
    console.log(levelsJSON);
    const config = {headers:{ "Content-Type" : "application/json" }}
    const response = await api.patch('/Education/level/changeorder', levelsJSON, config);
    console.log("response :", response);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="levels">
          {(provided) => (
            <section
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {levels.map((level) => {
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
                        <Link
                          key={level.id}
                          to={`/${urlPart}/${level.id}`}
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
