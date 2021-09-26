import { createGlobalStyle } from "styled-components";
// import theme from "./theme";
export const GlobalStyle = createGlobalStyle`
  html {
  font-size: 20px;
}
body {
  margin: 0;
  width: 650px;
}
h1,
h2,
div,
button {
  font-family: var(--font-family2);
}
#root {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border:5px solid black;
  background-color: #c5bfbf;
}

h1 {
  font-family: var(--font-family);
}
`;
