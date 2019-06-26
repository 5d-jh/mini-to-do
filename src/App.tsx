import React, { useState } from 'react';
import ToDo from './ToDo';
import { Button, Container, Input } from 'semantic-ui-react'
import './App.css'

const App: React.FC = () => {
  const [todoList, setTodoList]: [String[], Function] = useState([]);
  const [todoInput, setTodoInput]: [String, Function] = useState('');

  return (
    <Container>
      <Input
        action={ <Button onClick={ () => { setTodoList([todoInput, ...todoList]) } }>Add</Button> }
        onChange={ ({ target: { value } }) => setTodoInput(value) }
      />
      <div className="todo-lists">
        { todoList.map(todo => <ToDo>{ todo }</ToDo> ) }
      </div>
    </Container>
  );
}

export default App;
