import styled from 'styled-components';

export const SubTitle = styled.div`
  margin: 0 0 10px;
  padding: 10px 0;
  border-bottom: 1px solid gray;
  text-transform: uppercase;
`;

export const TextInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  margin: 10px 0;
  background: #F0F0F0;
  padding: 11px 0 11px 11px;
  font-size: 15px;
  border-radius: 6px;
  border: none;
`;

export const Button = styled.button`
  :hover {
    background-color: #F5F5F5;
  }

  overflow-x: hidden;
  margin: 0;
  box-sizing: border-box;
  padding: 4px 8px;
  border: none;
  font-size: 20px;
  border-radius: 8px;
`;

export const ListButton = styled(Button)<{ isSelected?: Boolean | null }>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: left;
  background-color: ${ props => props.isSelected ? '#F0F0F0' : 'white' };
  font-weight: ${ props => props.isSelected ? 'bold' : 'medium' };
`;