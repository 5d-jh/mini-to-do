import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

interface ToDoPropTypes {
  children: Object,
  idx: Number,
  deleteToDo: Function
}

const ToDo: React.FC<ToDoPropTypes> = ({ children, idx, deleteToDo }: ToDoPropTypes) => {
  const [isDone, setDone]: [Boolean, Function] = useState(false);

  return (
    <div>
      <Button color={isDone ? 'green' : 'grey'} onClick={ () => setDone(!isDone) }>
        O
      </Button>
      <Button
        color="red"
        onClick={ deleteToDo(idx) }
      >
        X
      </Button>
      <span>
        {isDone ? <s>{children}</s> : children}
      </span>
    </div>
  );
}

export default ToDo;