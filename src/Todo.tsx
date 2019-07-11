import React, { useContext } from 'react';
import { TodoType } from './types';
import { TodoContext } from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from './styles';
import styled from 'styled-components';

/*
  Component Role(s)
  - Displays and modifies to-do
*/

const Todo: React.FC<{ todo: TodoType }> = ({ todo }) => {
  const { todoListDispatch } = useContext(TodoContext);
  
  const { todoId, todoListId, isDone, description } = todo;

  return (
    <TodoItem>
      <TodoButton
        onClick={
          () => todoListDispatch({
            type: 'modify',
            todo: {
              description,
              todoId,
              todoListId,
              isDone: !isDone,
            }
          })
        }
      >
        <FontAwesomeIcon icon={faCheck} color={todo.isDone ? '#1B7CDD' : '#707070'} />
      </TodoButton>
      <TodoDescription isDone={isDone}>
        {description}
      </TodoDescription>
      <RemoveButton
        onClick={ () => todoListDispatch({ type: 'remove', todo }) }
      >
        <FontAwesomeIcon icon={faTrash} color="#EB2C2C" />
      </RemoveButton>
    </TodoItem>
  );
}

const TodoItem = styled(Button)`
  :hover {
    background-color: white;
  }

  padding: 0;
  text-align: left;
  background-color: white;
  position: relative;
  width: 100%;
  margin: 2px 0;
`;

const TodoButton = styled(Button)`
  box-sizing: border-box;
`;

const RemoveButton = styled(TodoButton)`
  position: absolute;
  right: 0;
`;

const TodoDescription = styled.div<{ isDone: Boolean }>`
  text-decoration: ${ props => props.isDone ? 'line-through' : 'none' };
  color: ${ props => props.isDone ? '#AAAAAA' : 'black' };
  display: inline;
  padding: 0 10px;
  overflow-x: hidden;
`;

export default Todo;
