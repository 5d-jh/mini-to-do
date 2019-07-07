import React from 'react';
import { TodoType } from './types';

/*
  Component Role(s)
  - Displays and modifies to-do
*/

type TodoPropTypes = {
  todoData: TodoType,
  controls: {
    modify(id: Number, todoData: TodoType): void,
    remove(id: Number): void
  }
}

const Todo: React.FC<TodoPropTypes> = ({ todoData, controls }) => {
  const { modify, remove } = controls;
  const { isDone, description, todoId } = todoData;

  return (
    <div>
      <button
        color={isDone ? 'green' : 'grey'}
        onClick={
          () => modify(todoData.todoId, { 
            description,
            todoId,
            isDone: !isDone
          })
        }
      >
        Mark as done
      </button>
      <button
        color="red"
        onClick={ () => remove(todoData.todoId) }
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