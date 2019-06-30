import React from 'react';
import { TodoType } from './types';
import { Button } from 'semantic-ui-react';

interface ToDoPropTypes {
  data: TodoType
  idx: Number,
  deleteToDo: Function,
  modifyToDo: Function
}

const ToDo: React.FC<ToDoPropTypes> = ({ data, idx, deleteToDo, modifyToDo }: ToDoPropTypes) => {
  const { description, isDone } = data;

  return (
    <div>
      <Button
        color={data.isDone ? 'green' : 'grey'}
        onClick={ modifyToDo(idx, { description, isDone: !isDone }) }
      >
        O
      </Button>
      <Button
        color="red"
        onClick={ deleteToDo(idx) }
      >
        X
      </Button>
      <span>
        {isDone ? <s>{description}</s> : description}
      </span>
    </div>
  );
}

export default ToDo;