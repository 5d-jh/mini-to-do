import React, { useState, useContext, useRef, useEffect } from 'react';
import { TextInput, Button, IconButton } from '../styles';
import { TodoContext } from '../Context';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoListTitle: React.FC = () => {
  const { todoListInfosDispatch, selectedListInfo } = useContext(TodoContext);

  const [isOpened, setIsOpened] = useState(false);
  const [listName, setListName] = useState(selectedListInfo ? `${selectedListInfo.listName}` : '');

  useEffect(() => {
    selectedListInfo && setListName(`${selectedListInfo.listName}`)
  }, [selectedListInfo]);

  const handleOnSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();

    if (listName.length !== 0 && selectedListInfo) {
      todoListInfosDispatch({ 
        type: 'modify',
        todoListInfo: {
          listName,
          todoListId: selectedListInfo.todoListId
        }
      });
    }

    setIsOpened(false);
  }

  const ListNameInputElem = useRef({} as HTMLInputElement);
  useEffect(() => {
    isOpened === true && ListNameInputElem.current.focus();
  }, [isOpened]);
  
  return selectedListInfo && (
      isOpened ? (
        <ListTitle  style={{ display: 'inline-block' }}>
          <form onSubmit={handleOnSubmit}>
            <ListNameInput
              ref={ListNameInputElem}
              onChange={ e => setListName(e.target.value) }
              value={listName}
            />
          </form>
          <IconButton
            onClick={
              () => todoListInfosDispatch({
                type: 'remove',
                todoListInfo: selectedListInfo
              })
            }
            style={{
              display: 'inline-block'
            }}
          >
            <FontAwesomeIcon icon={faTrash} color="#EB2C2C" />
            Remove List
          </IconButton>
        </ListTitle>
    ) : (
      <Button onClick={ () => setIsOpened(true) }>
        <ListTitle>{listName}</ListTitle>
      </Button>
    )
  );
}

const ListNameInput = styled(TextInput)`
  padding: 4px 8px;
  width: 'auto';
  border: '2px dashed #707070';
`;

const ListTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 33px;
  font-weight: bold;
`;

export default TodoListTitle;