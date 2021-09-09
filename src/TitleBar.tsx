import React from "react";
import styled from "styled-components";
import loading from "./media/loading.svg";
import { TitleBarType } from "./types";
import { isDevelopmentMode } from "./functions";

const Title = styled.h1`
  height: 1em;
  grid-row: 1/2;
  grid-column: 1;
`;
const PokeButton = styled.button`
  grid-column: -1;
  background-color: transparent;
  border: 2px solid black;
  grid-row: 1;
  justify-self: end;
  align-self: center;
  width: 4em;
  height: 4em;
`;
export const TitleBar = ({
  sendPokemonMessage,
  sendTestMessage,
}: TitleBarType) => {
  console.log("isDevelopmentMode", isDevelopmentMode);
  return (
    <>
      <Title>PokeInfo</Title>
      <PokeButton
        onClick={isDevelopmentMode ? sendTestMessage : sendPokemonMessage}
      >
        <img alt="refresh" src={loading} className="pokeball-btn" />
      </PokeButton>
    </>
  );
};
