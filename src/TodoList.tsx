import React, { useState } from 'react';
import Todo from './Todo';
import { Input } from 'semantic-ui-react';
import { TodoCtxtConsumer, TodoCtxtType } from './Context';

/*
  Component Role(s)
  - Displays list of to-dos
*/

const TodoList: React.FC<TodoCtxtType> = ({ todoList, setTodoList }) => {

  const addTodo = (description: String): void => {
    if (description.length !== 0) {
      setTodoList([
        {
          description,
          isDone: false
        },
        ...todoList
      ]);
    }
  }

  const [todoInput, setTodoInput]: [String, Function] = useState('');

  const handleOnSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();

    if (todoInput.length !== 0) {
      addTodo(todoInput);
    }

    setTodoInput('');
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <Input
          value={todoInput}
          placeholder="Press Enter to add To-Do"
          onChange={ e => setTodoInput(e.target.value) }
        />
      </form>
      <ul className="todo-lists">
        { todoList.map( (_, i: number) => <Todo idx={i} /> ) }
      </ul>
    </>
  );
}

export default () => (
  <TodoCtxtConsumer>
    {
      ({ todoList, setTodoList }: TodoCtxtType) => (
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      )
    }
  </TodoCtxtConsumer>
);