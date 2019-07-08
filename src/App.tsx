import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList';
import { TodoCtxtProvider } from './Context';
import { TodoListType } from './types';
import LeftPane from './LeftPane';
import styled from 'styled-components';

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
    <Container>
      <TodoCtxtProvider value={{ todoLists, setTodoLists, pickedListNo }}>
        <LeftPaneWrapper>
          <LeftPane setPickedListNo={setPickedListNo} />
        </LeftPaneWrapper>
        <RightPaneWrapper>
          {
            pickedListNo && todoList ? (
              <TodoList applyChanges={applyChanges} initialTodoList={todoList}  />
            ) : null
          }
        </RightPaneWrapper>
      </TodoCtxtProvider>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 10px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const LeftPaneWrapper = styled.div`
  width: 300px;
  padding-right: 15px;
`;
const RightPaneWrapper = styled.div`
  width: 100%;
  padding-left: 15px;
`;

export default App;
