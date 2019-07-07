import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList';
import { TodoCtxtProvider } from './Context';
import { TodoListType } from './types';
import './App.css'
import LeftPane from './LeftPane';

/*
  Component Role(s)
  - Stores ToDos
  - Adds and modifies ToDo
*/

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState(Array<TodoListType>());
  const [todoList, setTodoList] = useState({} as TodoListType);
  const [pickedListNo, setPickedListNo] = useState<Number | null>(null);

  //Update todoLists as todoData changes
  const applyChanges = useCallback((todoList: TodoListType): void => {
    setTodoLists(todoLists.map(
      ctxtTodoList => ctxtTodoList.listId === pickedListNo ? todoList : ctxtTodoList
    ));
  }, [todoLists, pickedListNo]);

  //Change todoList as pickedListNo changes
  useEffect(() => {
    setTodoList(todoLists.filter(
      todoList => todoList.listId === pickedListNo
    )[0]);
  }, [pickedListNo, setTodoList, todoLists]);

  return (
    <div className="container">
      <TodoCtxtProvider value={{ todoLists, setTodoLists, pickedListNo }}>
        <div className="left-pane">
          <LeftPane setPickedListNo={setPickedListNo} />
        </div>
        <div className="right-pane">
          {
            pickedListNo && todoList ? (
              <TodoList applyChanges={applyChanges} initialTodoList={todoList}  />
            ) : null
          }
        </div>
      </TodoCtxtProvider>
    </div>
  );
}

export default App;
