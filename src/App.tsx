import React, { useState } from 'react';
import TodoList from './TodoList';
import { TodoCtxtProvider } from './Context';
import { TodoType, TodoListType } from './types';
import './App.css'
import { Container } from 'semantic-ui-react';
import LeftPane from './LeftPane';

/*
  Component Role(s)
  - Stores ToDos
  - Adds and modifies ToDo
*/

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState(Array<TodoListType>());
  const [pickedListNo, setPickedListNo] = useState<Number | null>(null);

  return (
    <Container>
      <TodoCtxtProvider value={{ todoLists, setTodoLists, pickedListNo }}>
        <LeftPane setPickedListNo={setPickedListNo} />
        {pickedListNo ? <TodoList /> : null}
      </TodoCtxtProvider>
    </Container>
  );
}

export default App;
