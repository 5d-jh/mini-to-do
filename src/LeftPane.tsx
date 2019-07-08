import React, { useState } from 'react';
import { TodoCtxtConsumer, TodoCtxtType } from './Context';
import { TodoType } from './types';
import { SubTitle, TextInput } from './styles';
import styled from 'styled-components';

type LeftPanePropTypes = {
  setPickedListNo: Function
}

const LeftPane: React.FC<LeftPanePropTypes & TodoCtxtType> = ({
  todoLists, setTodoLists, pickedListNo, setPickedListNo
}) => {
  const createTodoList = (listName: String) => {
    setTodoLists([
      {
        listName,
        listId: new Date().getTime(),
        listData: Array<TodoType>()
      }, ...todoLists
    ])
  }

  const [ listNameInput, setListName ] = useState(String);

  const handleOnSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();

    if (listNameInput.length !== 0) {
      createTodoList(listNameInput);
    }

    setListName('');
  }

  return (
    <>
      <UserTitle>Homer</UserTitle>
      <SubTitle>Groups</SubTitle>
      <form onSubmit={handleOnSubmit}>
        <TextInput
          value={listNameInput}
          placeholder="Press Enter to create list"
          onChange={ e => setListName(e.target.value) }
          className="text-input"
        />
      </form>
      <div className="group-list">
        {
          todoLists.map( todoList => (
            <div key={`${todoList.listId}`}>
              <button
                id={`${todoList.listId}`}
                key={`${todoList.listId}`}
                onClick={ e => setPickedListNo(Number(e.currentTarget.id)) }
              >
                {todoList.listName}
              </button>
            </div>
          ) )
        }
      </div>
    </>
  );
}

const UserTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: bold;
  color: #707070;
`;

export default ({ setPickedListNo }: LeftPanePropTypes) => (
  <TodoCtxtConsumer>
    {
      ({ todoLists, setTodoLists, pickedListNo }) => (
        <LeftPane todoLists={todoLists} setTodoLists={setTodoLists} pickedListNo={pickedListNo} setPickedListNo={setPickedListNo} />
      )
    }
  </TodoCtxtConsumer>
);