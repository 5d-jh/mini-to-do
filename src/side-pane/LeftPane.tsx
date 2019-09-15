import React, { useContext } from 'react';
import { TodoContext } from '../Context';
import { SubTitle, ListButton } from '../styles';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';
import CreateList from './CreateList';

const LeftPane: React.FC = () => {
  const { todoListInfos, selectedListInfo, setSelectedListInfo } = useContext(TodoContext);

  return (
    <>
      <UserTitle>Homer</UserTitle>
      <SubTitle>Groups</SubTitle>
      
      <ListWrapper>
        {
          todoListInfos.map( ({ todoListId, listName }) => (
            <ListButtonWrapper key={`${todoListId}`}>
              <div>
                <ListIcon icon={faCircle} color="#1B7CDD" style={{ height: '100%', margin: 'auto' }} />
              </div>
              <ListButton
                id={`${todoListId}`}
                name={`${listName}`}
                key={`${todoListId}`}
                isSelected={selectedListInfo && selectedListInfo.todoListId === todoListId}
                onClick={ ({ currentTarget }) => setSelectedListInfo({
                  todoListId: Number(currentTarget.id),
                  listName: currentTarget.name
                }) }
              >
                {listName}
              </ListButton>
            </ListButtonWrapper>
          ) )
        }
        <ListButtonWrapper>
          <div>
            <ListIcon icon={faPlus} color="#23BC35" style={{ height: '100%' , margin: 'auto' }} />
          </div>
          <CreateList />
        </ListButtonWrapper>
      </ListWrapper>
    </>
  );
}

const ListWrapper = styled.div`
  div + div {
    margin-top: 3px;
  }
`;

const UserTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: bold;
  color: #707070;
`;

const ListButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 35px;
`;

const ListIcon = styled(FontAwesomeIcon)`
  height: 100%;
  margin: auto;
  padding-right: 0.3em;
`;

export default LeftPane;