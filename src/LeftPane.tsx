import React, { useState, useContext } from 'react';
import { TodoContext } from './Context';
import { SubTitle, TextInput } from './styles';
import styled from 'styled-components';

const LeftPane: React.FC<{ setSelectedListInfo: Function }> = ({ setSelectedListInfo }) => {
  const { todoListInfos, todoListInfosDispatch } = useContext(TodoContext);

  const [ listNameInput, setListName ] = useState(String);

  const handleOnSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();

    if (listNameInput.length !== 0) {
      todoListInfosDispatch({ 
        type: 'add',
        todoListInfo: {
          listName: listNameInput,
          todoListId: new Date().getTime()
        }
      });
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
          todoListInfos.map( todoList => (
            <div key={`${todoList.todoListId}`}>
              <button
                id={`${todoList.todoListId}`}
                name={`${todoList.listName}`}
                key={`${todoList.todoListId}`}
                onClick={ e => setSelectedListInfo({
                  todoListId: Number(e.currentTarget.id),
                  listName: e.currentTarget.name
                }) }
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

export default LeftPane;