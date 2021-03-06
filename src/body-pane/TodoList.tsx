import React, { useState, useContext } from 'react';
import Todo from './Todo';
import TodoListTitle from './TodoListTitle';
import styled from 'styled-components';
import { SubTitle, TextInput } from '../styles';
import { TodoContext } from '../Context';

/*
  Component Role(s)
  - Displays list of to-dos
*/

const TodoList: React.FC = () => {
  const {
    todoList,
    todoListDispatch,
    selectedListInfo
  } = useContext(TodoContext);

  const [todoInput, setTodoInput] = useState(String);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoInput.length !== 0) {
      selectedListInfo && todoListDispatch({
        type: 'add',
        todo: {
          description: todoInput,
          isDone: false,
          todoId: new Date().getTime(),
          todoListId: selectedListInfo.todoListId
        }
      });
    }

    setTodoInput('');
  }

  return selectedListInfo ? (
    <>
      <TodoListTitle />
      <form onSubmit={handleOnSubmit}>
        <TextInput
          value={todoInput}
          placeholder="Press Enter to add To-Do"
          onChange={ e => setTodoInput(e.target.value) }
          className="text-input"
        />
      </form>
      <SubTitle>
        To-Dos
      </SubTitle>
      <TodoListWrapper>
        {
          todoList.map(
            todo => todo.todoListId === selectedListInfo.todoListId && !todo.isDone ? (
              <Todo todo={todo} />
            ) : null
          )
        }
      </TodoListWrapper>
      {
        todoList.filter( todo => todo.isDone ).length !== 0 && (
          <>
            <SubTitle>
              Done
            </SubTitle>
            <TodoListWrapper>
              {
                todoList.map(
                  todo => todo.todoListId === selectedListInfo.todoListId && todo.isDone ? (
                    <Todo todo={todo} />
                  ) : null
                )
              }
            </TodoListWrapper>
          </>
        )
      }
    </>
  ) : <>👈 Select a to-do list to begin with.</>;
}

const TodoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TodoList;