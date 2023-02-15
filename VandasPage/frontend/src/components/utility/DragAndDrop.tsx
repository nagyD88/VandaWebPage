import React from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { StrictModeDroppable as Droppable } from '../../utils/StrictModeDroppable';
import EducationMaterial from '../EducationMaterial';
import AreYouSure from '../modallContent/AreYouSure';
import Dashboard from './Dashboard';

type Props = {
  handleOnDragEnd: (result: any) => Promise<void>;
  ListOfItems: any[] | undefined;
  type: string;
  handleOnClick?:(ID: any) => Promise<void>;
};
const DragAndDrop = ({ handleOnDragEnd, ListOfItems, type, handleOnClick}: Props) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="educationMaterials">
        {(provided) => (
          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {ListOfItems?.map((item) => {
              return (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={item.index}
                >
                  {(provided) => (
                    <article
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {type === 'education' && (
                        <>
                          <Dashboard
                            children={
                              <AreYouSure
                                levelID={item.id}
                                handleOnClick={handleOnClick}
                                message={'Biztos le akarod törölni?'}
                                hideModal={undefined}
                              /> // kell neki hidemodal?
                            }
                          />
                          <Link
                            key={item.id}
                            className='text-white'
                            to={`/Educationchanger/${item.id}`}
                          >
                            <div className="level">
                              <p>{item.name}</p>
                            </div>
                          </Link>
                        </>
                      )}
                      {type === 'level' && (
                        <>
                          <EducationMaterial
                            key={item.id}
                            material={item}
                            canDelete={true}
                          />
                        </>
                      )}
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
  );
};

export default DragAndDrop;
