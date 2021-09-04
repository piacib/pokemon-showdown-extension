import React from "react";
import styled from "styled-components";
import pokeball from "./media/pokeball.svg";
import { TitleBarType } from "./types";
import { isDevelopmentMode } from "./functions";

const Title = styled.h1`
  height: 1em;
`;
const PokeButton = styled.button`
  grid-column: 3/4;
  grid-row: 1/2;
  justify-self: end;
  align-self: start;
  width: 5em;
  height: 5em;
`;
export const TitleBar = ({
  sendPokemonMessage,
  sendTestMessage,
}: TitleBarType) => {
  console.log("isDevelopmentMode", isDevelopmentMode);
  return (
    <>
      <Title>PokeInfo</Title>
      <>
        <PokeButton
          onClick={isDevelopmentMode ? sendTestMessage : sendPokemonMessage}
        >
          <img alt="pokeball" src={pokeball} className="pokeball-btn" />
        </PokeButton>
      </>
    </>
  );
};
