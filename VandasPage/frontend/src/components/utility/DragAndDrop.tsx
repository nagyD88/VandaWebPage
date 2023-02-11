import React from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../../utils/StrictModeDroppable';

type Props={
    handleOnDragEnd:()=>void,
    ListOfItems:any[],
    children:React.ReactElement
}
const DragAndDrop = ({handleOnDragEnd, ListOfItems, children}:Props) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="educationMaterials">
      {(provided) => (
        <section
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {ListOfItems.map(
            (item) => {
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
                      {children}
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
  )
}

export default DragAndDrop