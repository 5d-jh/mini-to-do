import React, { useState } from 'react';
import ToDo from './ToDo';
import ToDoType from './ToDoType';
import { Container, Input } from 'semantic-ui-react'
import './App.css'


const App: React.FC = () => {
  const [todoList, setTodoList]: [ToDoType[], Function] = useState([]);
  const [todoInput, setTodoInput]: [String, Function] = useState('');

  const addTodo = (e: any): void => {
    e.preventDefault();

    if (todoInput.length !== 0) {
      setTodoList([
        {
          description: todoInput,
          isDone: false
        },
        ...todoList
      ]);
    }
    
    setTodoInput('');
  }

  const modifyToDo = (idx: Number, modifiedData: ToDoType): Function => {
    return () => {
      setTodoList(todoList.map( (data, i) => i === idx ? modifiedData : data ));
    }
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
        { todoList.map((todo, i) => <ToDo data={todo} modifyToDo={modifyToDo} deleteToDo={deleteToDo} idx={i} key={i} /> ) }
      </div>
    </Container>
  );
}

export default App;
