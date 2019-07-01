import React, { useState } from 'react';
import TodoList from './TodoList';
import { TodoCtxtProvider } from './Context';
import { TodoType } from './types';
import './App.css'
import { Container } from 'semantic-ui-react';

/*
  Component Role(s)
  - Stores ToDos
  - Adds and modifies ToDo
*/

const App: React.FC = () => {
  const [todoList, setTodoList]: [TodoType[], Function] = useState([]);

  return (
    <Container>
      <TodoCtxtProvider value={{ todoList, setTodoList }}>
        <TodoList />
      </TodoCtxtProvider>
    </Container>
  );
}

export default App;
