import React, { useState, useContext } from 'react';
import { TodoContext } from './Context';
import { SubTitle, TextInput } from './styles';
import styled from 'styled-components';

const LeftPane: React.FC<{ setSelectedListInfo: Function }> = ({ setSelectedListInfo }) => {
  const { todoListInfos, todoListInfosDispatch, selectedListInfo } = useContext(TodoContext);

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
      <ListWrapper>
        {
          todoListInfos.map( ({ todoListId, listName }) => (
            <ListButtonWrapper key={`${todoListId}`}>
              <ListColor />
              <ListButton
                id={`${todoListId}`}
                name={`${listName}`}
                key={`${todoListId}`}
                isSelected={selectedListInfo && selectedListInfo.todoListId === todoListId}
                onClick={ ({ currentTarget }) => setSelectedListInfo({
                  todoListId: Number(currentTarget.id),
                  listName: currentTarget.name
                }) }
              >
                {listName}
              </ListButton>
            </ListButtonWrapper>
          ) )
        }
      </ListWrapper>
    </>
  );
}

const ListWrapper = styled.div`
  div + div {
    margin-top: 3px;
  }
`;

const UserTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: bold;
  color: #707070;
`;

const ListButtonWrapper = styled.div`
  div ~ button {
    margin-left: 9px;
  }

  display: flex;
  flex-direction: row;
  height: 35px;
`;
const ListColor = styled.div`
  margin: auto 0;
  background-color: #1B7CDD;
  border: 3px solid #86BBF0;
  width: 1.5em;
  height: calc(1.5em - 2.7px);
  border-radius: 50%;
  box-sizing: border-box;
`;
const ListButton = styled.button<{ isSelected: Boolean | null }>`
  :hover {
    background-color: #F5F5F5;
  }

  cursor: pointer;

  overflow-x: hidden;
  margin: 0;
  box-sizing: border-box;
  padding: 4px 8px;
  background-color: ${ props => props.isSelected ? '#F0F0F0' : 'white' };
  font-weight: ${ props => props.isSelected ? 'bold' : 'medium' };
  border: none;
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 20px;
  border-radius: 8px;
`;

export default LeftPane;