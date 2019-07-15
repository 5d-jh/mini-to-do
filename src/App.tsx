import React, { useState } from 'react';
import TodoList from './body-pane/TodoList';
import { TodoContextProvider } from './Context';
import { TodoListType } from './types';
import LeftPane from './side-pane/LeftPane';
import styled from 'styled-components';

/*
  Component Role(s)
  - Stores and modifies selectedListInfo
  - Provides context
*/

const App: React.FC = () => {
  const [selectedListInfo, setSelectedListInfo] = useState<TodoListType | null>(null);

  return (
    <Container>
      <TodoContextProvider value={{ selectedListInfo }}>
        <LeftPaneWrapper>
          <LeftPane setSelectedListInfo={setSelectedListInfo} />
        </LeftPaneWrapper>
        <RightPaneWrapper>
          {
            selectedListInfo ? (
              <TodoList />
            ) : '👈 Select a to-do list to begin with.'
          }
        </RightPaneWrapper>
      </TodoContextProvider>
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
