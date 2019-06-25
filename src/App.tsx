import React, { useState } from 'react';
import { Button, Container, Input } from 'semantic-ui-react'
import './App.css'

const App: React.FC = () => {
  const [todos, setTodos]: [String[], any] = useState([]);
  const [todoInput, setTodoInput]: [String, any] = useState('');

  return (
    <Container>
      <Input
        action={ <Button onClick={ () => { setTodos([todoInput, ...todos]) } }>Add</Button> }
        onChange={ ({ target: { value } }) => setTodoInput(value) }
      />
      <div className="todo-lists">
        { todos.map(todo => <div>{todo}</div>) }
      </div>
    </Container>
  );
}

export default App;
