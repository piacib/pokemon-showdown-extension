import React from "react";
import styled from "styled-components";
const NotInBattleMessage = styled.h1`
  text-align: center;
  margin: auto 0;
  height: 100px;
  grid-row: 1/-1;
`;
export const NotInBattleErrorScreen = () => {
  return (
    <NotInBattleMessage>
      Start a Battle to use the Extension!
    </NotInBattleMessage>
  );
};
