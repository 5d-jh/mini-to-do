import React, { useState } from 'react';
import Todo from './Todo';
import { TodoCtxtConsumer, TodoCtxtType } from './Context';
import { TodoType } from './types';

/*
  Component Role(s)
  - Displays list of to-dos
*/

const TodoList: React.FC<TodoCtxtType> = ({ todoLists, setTodoLists, pickedListNo }) => {
  const [todoList, setTodoList] = useState(
    todoLists.filter(
      ({ listId }) => listId === pickedListNo
    ).slice()[0]
  );

  const applyChanges = (): void => {
    setTodoLists(todoLists.map(
      ctxtTodoList => ctxtTodoList.listId === pickedListNo ? todoList : ctxtTodoList
    ));
  }

  const addTodo = (description: String): void => {
    if (description.length !== 0) {
      setTodoList({
        listName: todoList.listName,
        listId: todoList.listId,
        listData: [
          {
            description,
            isDone: false,
            todoId: new Date().getTime()
          },
          ...todoList.listData
        ]
      });
      applyChanges();
    }
  }

  const [todoInput, setTodoInput] = useState(String);

  const handleOnSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();

    if (todoInput.length !== 0) {
      addTodo(todoInput);
    }

    setTodoInput('');
  }

  //Control functions for childrens
  const modify = (id: Number, todoData: TodoType): void => {
    setTodoList({
      listName: todoList.listName,
      listId: todoList.listId,
      listData: todoList.listData.map(
        (parentTodoData, i) => i === id ? todoData : parentTodoData
      )
    });
    applyChanges();
  };
  
  const remove = (id: Number): void => {
    setTodoList({
      listName: todoList.listName,
      listId: todoList.listId,
      listData: todoList.listData.filter(
        parentTodoData => parentTodoData.todoId !== id
      )
    });
    applyChanges();
  };

  return (
    <>
      <h1 className="list title">{todoList.listName}</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          value={todoInput}
          placeholder="Press Enter to add To-Do"
          onChange={ e => setTodoInput(e.target.value) }
          className="text-input"
        />
      </form>
      <div className="subtitle">
        To-Dos
      </div>
        <ul className="todo-lists">
        {
          todoList && todoList.listData.map(
            (todoData) => <Todo todoData={todoData} controls={{ modify, remove }} />
          )
        }
      </ul>
    </>
  );
}

export default () => (
  <TodoCtxtConsumer>
    {
      ({ todoLists, setTodoLists, pickedListNo }: TodoCtxtType) => (
        <TodoList todoLists={todoLists} setTodoLists={setTodoLists} pickedListNo={pickedListNo} />
      )
    }
  </TodoCtxtConsumer>
);