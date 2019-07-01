import React from 'react';
import { TodoCtxtType, TodoCtxtConsumer } from './Context';
import { Button } from 'semantic-ui-react';
/*
  Component Role(s)
  - Displays and modifies to-do
*/

type TodoPropTypes = {
  idx: number
}

const Todo: React.FC<TodoPropTypes & TodoCtxtType> = ({ idx, todoList, setTodoList }) => {
  const childTodo = todoList[idx];
  const { description, isDone } = childTodo;

  const applyChildrenChange = (): void => {
    setTodoList(todoList.map( (ctxtTodo, i) => idx === i ? childTodo : ctxtTodo ));
  }
  
  return (
    <div>
      <Button
        color={isDone ? 'green' : 'grey'}
        onClick={
          () => {
            childTodo.isDone = !isDone;
            applyChildrenChange();
          }
        }
      >
        Mark as done
      </Button>
      <Button
        color="red"
        onClick={ () => setTodoList(todoList.filter( (_, i) => i !== idx )) }
      >
        Delete
      </Button>
      <span>
        {isDone ? <s>{description}</s> : description}
      </span>
    </div>
  );
}

export default ({ idx } : TodoPropTypes) => (
  <TodoCtxtConsumer>
    {
      ({ todoList, setTodoList }: TodoCtxtType) => (
        <Todo idx={idx} todoList={todoList} setTodoList={setTodoList} />
      )
    }
  </TodoCtxtConsumer>
);