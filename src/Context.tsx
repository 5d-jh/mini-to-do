import React, { createContext, useReducer } from 'react';
import { TodoListType, TodoType } from './types';

/*
  Component Role(s)
  - Stores to-dos
  - Adds and modifies a to-do
*/

export interface TodoCtxtType {
  todoListInfos: TodoListType[],
  todoListInfosDispatch: Function,
  todoList: TodoType[],
  todoListDispatch: Function
  selectedListInfo: TodoListType | null,
}

export const TodoContext = createContext<TodoCtxtType>({} as TodoCtxtType);

export const TodoContextProvider: React.FC<{ value?: Object }> = ({ children, value }) => {
  const [todoListInfos, todoListInfosDispatch] = useReducer((
    prevState: TodoListType[],
    action: {
      type: String,
      todoListInfo: TodoListType
    }
  ) => {
    switch(action.type) {
      case 'add':
        return action.todoListInfo ? [action.todoListInfo, ...prevState] : prevState;

      default:
        return prevState;
    }
  }, Array<TodoListType>());

  const [todoList, todoListDispatch] = useReducer((
    prevState: TodoType[],
    action: {
      type: 'add' | 'remove' | 'modify',
      todo: TodoType
    }
  ) => {
    switch(action.type) {
      case 'add':
        return action.todo ? [action.todo, ...prevState] : prevState;

      case 'remove':
        return action.todo ? (
          prevState.filter( todo => todo.todoId !== action.todo.todoId )
        ) : prevState;

      case 'modify':
        return action.todo ? (
          prevState.map(
            todo => todo.todoId === action.todo.todoId ? action.todo : todo
          )
        ) : prevState;

      default:
        return prevState;
    }
  }, Array<TodoType>());

  return (
    <TodoContext.Provider value={{
      todoListInfos, todoListInfosDispatch,
      todoList, todoListDispatch,
      selectedListInfo: null,
      ...value
    }}>
      {children}
    </TodoContext.Provider>
  );
}