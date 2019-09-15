import React from 'react';
import TodoList from './body-pane/TodoList';
import { TodoContextProvider } from './Context';
import LeftPane from './side-pane/LeftPane';
import styled from 'styled-components';

/*
  Component Role(s)
  - Stores and modifies selectedListInfo
  - Provides context
*/

const App: React.FC = () => {
  return (
    <Container>
      <TodoContextProvider>
        <LeftPaneWrapper>
          <LeftPane />
        </LeftPaneWrapper>
        <RightPaneWrapper>
          <TodoList />
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
