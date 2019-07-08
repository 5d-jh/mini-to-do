import React, { useReducer, useState } from 'react';
import TodoList from './TodoList';
import { TodoContext } from './Context';
import { TodoListType, TodoType } from './types';
import LeftPane from './LeftPane';
import styled from 'styled-components';

/*
  Component Role(s)
  - Stores ToDos
  - Adds and modifies ToDo
*/

const App: React.FC = () => {
  const [todoListInfos, todoListInfosDispatch] = useReducer((
    prevState: TodoListType[],
    action: {
      type: String,
      todoListInfo: TodoListType
    }
  ) => {
    switch(action.type) {
      case 'add':
        return action.todoListInfo ? [action.todoListInfo, ...prevState] : prevState;

      default:
        return prevState;
    }
  }, Array<TodoListType>());

  const [todoList, todoListDispatch] = useReducer((
    prevState: TodoType[],
    action: {
      type: 'add' | 'remove' | 'modify',
      todo: TodoType
    }
  ) => {
    switch(action.type) {
      case 'add':
        return action.todo ? [action.todo, ...prevState] : prevState;

      case 'remove':
        return action.todo ? (
          prevState.filter( todo => todo.todoId !== action.todo.todoId )
        ) : prevState;

      case 'modify':
        return action.todo ? (
          prevState.map(
            todo => todo.todoId === action.todo.todoId ? action.todo : todo
          )
        ) : prevState;

      default:
        return prevState;
    }
  }, Array<TodoType>());

  const [selectedListInfo, setSelectedListInfo] = useState<TodoListType | null>(null);

  return (
    <Container>
      <TodoContext.Provider value={{
        todoListInfos, todoListInfosDispatch,
        todoList, todoListDispatch,
        selectedListInfo
      }}>
        <LeftPaneWrapper>
          <LeftPane setSelectedListInfo={setSelectedListInfo} />
        </LeftPaneWrapper>
        <RightPaneWrapper>
          {
            selectedListInfo && todoList ? (
              <TodoList />
            ) : null
          }
        </RightPaneWrapper>
      </TodoContext.Provider>
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
