import React from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import dataContext from '../context/dataContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../utils/StrictModeDroppable';
import api from '../hooks/api';
import AddLevel from './AddLevel';
import Dashboard from './Dashboard';
import AreYouSure from './AreYouSure';



const EducationChanger = ({ urlPart }) => {
  let dataURL = 'https://localhost:7168/api/Education/level';
  const { data, fError, fLoading } = useAxiosFetch(dataURL);
  const { colorTheme, counter, setCounter } = useContext(dataContext);
  const [levels, setLevels] = useState(data || []);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const categorys = new Set();

  useEffect(() => {
    data.map((level) => categorys.add(level.categoryName));

  }, [data, counter]);

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
  }, [counter]);

  const handleOnDragEnd = async (result) => {
    if (!result?.destination) return;
    const Levels = Array.from(levels);
    const [reorderedItem] = Levels.splice(result.source.index, 1);
    Levels.splice(result.destination.index, 0, reorderedItem);
    setLevels(Levels);
    const iDs = new Array();
    Levels.map((level) => iDs.push({ id: level.id }));
    const levelsJSON = JSON.stringify(iDs);

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await api.patch(
      '/Education/level/changeorder',
      levelsJSON,
      config
    );
    
  };

  const handleOnClick = async (levelID) => {
    const response = await api.delete(`/Education/level/${levelID}`);
    setCounter(counter+1);
    
  }


  return (
    <>
      <Dashboard children={<AddLevel />} />

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
                        <Dashboard
                          children={
                            <AreYouSure
                              levelID = {level.id}
                              handleOnClick={handleOnClick}
                              messege={'Biztos le akarod törölni?'}
                            />
                          }
                        />
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
