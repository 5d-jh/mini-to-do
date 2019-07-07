import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { TodoType, TodoListType } from './types';

/*
  Component Role(s)
  - Displays list of to-dos
*/

type TodoListPropTypes = {
  applyChanges(todoList: TodoListType): void,
  initialTodoList: TodoListType
};

const TodoList: React.FC<TodoListPropTypes> = ({ initialTodoList, applyChanges }) => {
  const [todoList, setTodoList] = useState(initialTodoList);

  //Apply children changes to parent state
  useEffect(() => {
    applyChanges(todoList);
  }, [todoList, applyChanges]);

  useEffect(() => {
    setTodoList(initialTodoList)
  }, [initialTodoList]);

  const addTodo = (description: String) => {
    if (description.length !== 0) {
      setTodoList(prevState => ({
        listName: todoList.listName,
        listId: todoList.listId,
        listData: [
          {
            description,
            isDone: false,
            todoId: new Date().getTime()
          },
          ...prevState.listData
        ]
      }));
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
        parentTodoData =>  parentTodoData.todoId === id ? todoData : parentTodoData
      )
    });
  };
  
  const remove = (id: Number): void => {
    setTodoList({
      listName: todoList.listName,
      listId: todoList.listId,
      listData: todoList.listData.filter(
        parentTodoData => parentTodoData.todoId !== id
      )
    });
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
          todoList.listData && todoList.listData.map(
            (todoData) => <Todo todoData={todoData} controls={{ modify, remove }} />
          )
        }
      </ul>
    </>
  );
}

export default TodoList;