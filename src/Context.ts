import { createContext } from 'react';
import { TodoListType } from './types';

export interface TodoCtxtType {
  todoLists: TodoListType[],
  setTodoLists: Function,
  pickedListNo: Number | null,
}

const context = createContext<TodoCtxtType>(<TodoCtxtType>{});

export const TodoCtxtProvider = context.Provider;
export const TodoCtxtConsumer = context.Consumer;