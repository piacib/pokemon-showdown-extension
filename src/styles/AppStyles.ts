import styled from "styled-components";
export const Title = styled.h1`
  height: 1em;
  width: fit-content;
  grid-row: 1/2;
  grid-column: 1/2;
`;
export const PokeButton = styled.button`
  grid-column: 3/4;
  background-color: transparent;
  border: 2px solid black;
  grid-row: 1;
  justify-self: end;
  align-self: center;
  width: 4em;
  height: 4em;
`;
export const Button = styled.button`
  width: 150px;
  height: 40px;
  grid-row: 1;
  grid-column: 2;
  border-radius: 20px;
  font-size: inherit;
  justify-self: center;
  background-color: rgb(237, 85, 100);
  align-self: center;
`;
