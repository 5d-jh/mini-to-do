import React from 'react';
import ToDo from './ToDo';
import ToDoType from './ToDoType';

/*
  Component Role(s)
  - Displays ToDos from parent component
*/

type TodoListPropTypes = {
  todoList: ToDoType[],
  setTodoList: Function,
  toggleDone: Function,
  deleteTodo: Function
};

const TodoList: React.FC<TodoListPropTypes> = ({ todoList, setTodoList, toggleDone, deleteTodo }) => {
  return (
    <ul className="todo-lists">
      { todoList.map((todo, i) => <ToDo data={todo} modifyToDo={toggleDone} deleteToDo={deleteTodo} idx={i} key={i} /> ) }
    </ul>
  );
}

export default TodoList;