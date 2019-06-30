import React, { useState } from 'react';
import { Input } from 'semantic-ui-react'

/*
  Component Role(s)
  - Takes string input and adds ToDo
*/

const TodoInput: React.FC<{ addTodo: Function }> = ({ addTodo }) => {
  const [todoInput, setTodoInput]: [String, Function] = useState('');

  const handleOnSubmit = (e: { preventDefault: Function }) => {
    e.preventDefault();

    if (todoInput.length !== 0) {
      addTodo(todoInput);
    }

    setTodoInput('');
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <Input
        value={todoInput}
        placeholder="Press Enter to add To-Do"
        onChange={ ({ target: { value } }) => setTodoInput(value) }
      />
    </form>
  )
}

export default TodoInput;