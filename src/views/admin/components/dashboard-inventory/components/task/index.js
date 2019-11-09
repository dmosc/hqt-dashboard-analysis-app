import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {TaskContainer} from './elements';

const Task = ({task: {id, content}, index}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {content}
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;
