import { createContext } from 'react';
import { TodoType } from './types';

export interface TodoCtxtType {
  todoList: Array<TodoType>,
  setTodoList: Function
}

const context = createContext<TodoCtxtType>({
  todoList: Array<TodoType>(), setTodoList: Function
});

export const TodoCtxtProvider = context.Provider;
export const TodoCtxtConsumer = context.Consumer;