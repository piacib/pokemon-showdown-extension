import styled from 'styled-components';
export const ButtonDisplay = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  display: flex;
  flex-direction: row;
  place-self: start;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`;
export const Button = styled.button`
  width: inherit;
  background: none;
  border: none;
  height: 40px;
  border-radius: 0;
`;
