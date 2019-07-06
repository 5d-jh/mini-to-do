import React from 'react';
import { Button } from 'semantic-ui-react';
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
  const { isDone, description } = todoData;

  return (
    <div>
      <Button
        color={isDone ? 'green' : 'grey'}
        onClick={
          () => modify(todoData.todoId, { 
            description: todoData.description,
            todoId: todoData.todoId,
            isDone: !todoData.isDone
          })
        }
      >
        Mark as done
      </Button>
      <Button
        color="red"
        onClick={ () => remove(todoData.todoId) }
      >
        Delete
      </Button>
      <span>
        {isDone ? <s>{description}</s> : description}
      </span>
    </div>
  );
}

export default Todo;