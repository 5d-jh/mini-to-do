import React, { useState } from 'react';
import TodoList from './TodoList';
import { TodoCtxtProvider } from './Context';
import { TodoListType } from './types';
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
    <div className="container">
      <TodoCtxtProvider value={{ todoLists, setTodoLists, pickedListNo }}>
        <div className="left-pane">
          <LeftPane setPickedListNo={setPickedListNo} />
        </div>
        <div className="right-pane">
          {pickedListNo ? <TodoList /> : null}
        </div>
      </TodoCtxtProvider>
    </div>
  );
}

export default App;
