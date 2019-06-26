import React, { useState } from 'react';
import ToDo from './ToDo';
import { Container, Input } from 'semantic-ui-react'
import './App.css'

const App: React.FC = () => {
  const [todoList, setTodoList]: [String[], Function] = useState([]);
  const [todoInput, setTodoInput]: [String, Function] = useState('');

  const addTodo = (e: any): void => {
    e.preventDefault();

    if (todoInput.length !== 0) {
      setTodoList([todoInput, ...todoList]);
    }
    
    setTodoInput('');
  }

  const deleteToDo = (idx: Number): Function => {
    return () => {
      setTodoList(todoList.filter((_, i) => i !== idx));
    }
  }

  return (
    <Container>
      <form onSubmit={addTodo}>
        <Input
          value={todoInput}
          placeholder="Press Enter to add To-Do"
          onChange={ ({ target: { value } }) => setTodoInput(value) }
        />
      </form>
      <div className="todo-lists">
        { todoList.map((todo, i) => <ToDo deleteToDo={deleteToDo} idx={i} key={i}>{todo}</ToDo> ) }
      </div>
    </Container>
  );
}

export default App;
