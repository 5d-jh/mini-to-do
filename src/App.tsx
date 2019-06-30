import React, { useState } from 'react';
import TodoList from './TodoList';
import ToDoType from './ToDoType';
import './App.css'
import TodoInput from './TodoInput';
import { Container } from 'semantic-ui-react';

/*
  Component Role(s)
  - Stores ToDos
  - Adds and modifies ToDo
*/

const App: React.FC = () => {
  const [todoList, setTodoList]: [ToDoType[], Function] = useState([]);

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

  const toggleDone = (idx: Number, modifiedData: ToDoType): Function => {
    return () => {
      setTodoList(todoList.map( (data, i) => i === idx ? modifiedData : data ));
    }
  }

  const deleteTodo = (idx: Number): Function => {
    return () => {
      setTodoList(todoList.filter((_, i) => i !== idx));
    }
  }

  return (
    <Container>
      <TodoInput addTodo={addTodo} />
      <TodoList todoList={todoList} setTodoList={setTodoList} toggleDone={toggleDone} deleteTodo={deleteTodo} />
    </Container>
  );
}

export default App;
