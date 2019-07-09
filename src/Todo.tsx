import React, { useContext } from 'react';
import { TodoType } from './types';
import { TodoContext } from './Context';

/*
  Component Role(s)
  - Displays and modifies to-do
*/

const Todo: React.FC<{ todo: TodoType }> = ({ todo }) => {
  const { todoListDispatch } = useContext(TodoContext);
  
  const { todoId, todoListId, isDone, description } = todo;

  return (
    <div>
      <button
        color={isDone ? 'green' : 'grey'}
        onClick={
          () => todoListDispatch({
            type: 'modify',
            todo: {
              description,
              todoId,
              todoListId,
              isDone: !isDone,
            }
          })
        }
      >
        Mark as done
      </button>
      <button
        onClick={ () => todoListDispatch({ type: 'remove', todo }) }
      >
        Delete
      </button>
      <span>
        {isDone ? <s>{description}</s> : description}
      </span>
    </div>
  );
}

export default Todo;
