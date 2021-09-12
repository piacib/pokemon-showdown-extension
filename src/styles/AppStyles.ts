import styled, { keyframes } from "styled-components";

export const RefreshButton = styled.button`
  grid-column: 3/4;
  background-color: transparent;
  grid-row: 1;
  border: none;
  position: relative;
  justify-self: end;
  align-self: center;
  border-radius: 50%;
  width: 4em;
  height: 4em;
`;
export const Button = styled.button`
  width: 150px;
  border: none;
  height: 40px;
  grid-row: 1;
  grid-column: 2;
  border-radius: 20px;
  font-size: inherit;
  justify-self: center;
  background-color: rgb(237, 85, 100);
  align-self: center;
`;
export const AppDisplay = styled.div`
  background-color: #282c34a4;
  background-color: #c5bfbf;
  display: grid;
  grid-column-gap: 10px;
  grid-template-rows: 75px 61px 32px auto;
  width: 600px;
  height: 400px;
  padding: 0 0.25em;
  overflow: hidden;
`;
const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

/* The typewriter cursor effect */
const blinkCaret = keyframes`
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: var(--line-color);
  }
`;
export const TypeWriterContainer = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  margin: auto;
  * {
    height: 1em;
    width: fit-content;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: 0.25em solid black; /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    /* letter-spacing: 0.15em; Adjust as needed */
    animation: ${typing} 3.5s steps(40, end),
      ${blinkCaret} 1.5s step-end infinite;
  }
`;
export const Refresh = styled.img`
  width: 100%;
`;
