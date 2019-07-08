import { createContext } from 'react';
import { TodoListType, TodoType } from './types';

export interface TodoCtxtType {
  todoListInfos: TodoListType[],
  todoListInfosDispatch: Function,
  todoList: TodoType[],
  todoListDispatch: Function
  selectedListInfo: TodoListType | null,
}

export const TodoContext = createContext<TodoCtxtType>({} as TodoCtxtType);