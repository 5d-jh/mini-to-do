import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

const ToDo: React.FC = ({ children }) => {
  const [isDone, setDone]: [Boolean, Function] = useState(false);

  return (
    <div>
      <Button color={isDone ? 'green' : 'grey'} onClick={ () => setDone(!isDone) }>
        O
      </Button>
      <span>
        { isDone ? <s>{ children }</s> : children }
      </span>
    </div>
  )
}

export default ToDo;