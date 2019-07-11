import React, { useState, useContext } from 'react';
import { TextInput, ListButton } from '../styles';
import { TodoContext } from '../Context';
import styled from 'styled-components';

const CreateList: React.FC = () => {
  const { todoListInfosDispatch } = useContext(TodoContext);

  const [isOpened, setIsOpened] = useState(false);
  const [listName, setListName] = useState('');

  const handleOnSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();

    if (listName.length !== 0) {
      todoListInfosDispatch({ 
        type: 'add',
        todoListInfo: {
          listName,
          todoListId: new Date().getTime()
        }
      });
    }

    setIsOpened(false);
    setListName('');
  }

  return (
    isOpened ? (
      <form onSubmit={handleOnSubmit}>
        <ListNameInput
          value={listName}
          onChange={ e => setListName(e.target.value) }
          className="text-input"
        />
      </form>
    ) : (
      <ListButton onClick={ () => setIsOpened(true) }>
        Create a list
      </ListButton>
    )
  );
}

const ListNameInput = styled(TextInput)`
  margin: 0;
  border: 2px dashed #707070;
`;

export default CreateList;