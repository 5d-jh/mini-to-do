import React, { useState } from 'react';

const ToDo: React.FC = ({ children }) => {
  const [isDone, setDone]: [Boolean, Function] = useState(false);

  return (
    <div>
      <button onClick={ () => setDone(!isDone) }>
        O
      </button>
      <span>
        { isDone ? <s>{ children }</s> : children }
      </span>
    </div>
  )
}

export default ToDo;