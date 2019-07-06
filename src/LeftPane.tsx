import React, { useState } from 'react';
import { TodoCtxtConsumer, TodoCtxtType } from './Context';
import { Button, Input } from 'semantic-ui-react';
import { TodoType } from './types';

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
      <form onSubmit={handleOnSubmit}>
        <Input
          value={listNameInput}
          placeholder="Press Enter to create list"
          onChange={ e => setListName(e.target.value) }
        />
      </form>
      <ul>
        {
          todoLists.map( todoList => (
            <li>
              <Button onClick={ () => setPickedListNo(todoList.listId) }>
                {todoList.listName}
              </Button>
            </li>
          ) )
        }
      </ul>
    </>
  );
}

export default ({ setPickedListNo }: LeftPanePropTypes) => (
  <TodoCtxtConsumer>
    {
      ({ todoLists, setTodoLists, pickedListNo }) => (
        <LeftPane todoLists={todoLists} setTodoLists={setTodoLists} pickedListNo={pickedListNo} setPickedListNo={setPickedListNo} />
      )
    }
  </TodoCtxtConsumer>
);