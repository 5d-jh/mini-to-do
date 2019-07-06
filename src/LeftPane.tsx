import React, { useState } from 'react';
import { TodoCtxtConsumer, TodoCtxtType } from './Context';
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
      <h2 className="user title">Homer</h2>
      <div className="subtitle">
        Groups
      </div>
      <form onSubmit={handleOnSubmit}>
        <input
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

export default ({ setPickedListNo }: LeftPanePropTypes) => (
  <TodoCtxtConsumer>
    {
      ({ todoLists, setTodoLists, pickedListNo }) => (
        <LeftPane todoLists={todoLists} setTodoLists={setTodoLists} pickedListNo={pickedListNo} setPickedListNo={setPickedListNo} />
      )
    }
  </TodoCtxtConsumer>
);