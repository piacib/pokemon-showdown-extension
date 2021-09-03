import React from "react";
import styled from "styled-components";
import pokeball from "./media/pokeball.svg";
import { TitleBarType } from "./types";
import { isDevelopmentMode } from "./functions";

const TitleBarDisplay = styled.div`
  display: grid;
  height: 100px;
  margin-top: 0.5rem;
  width: 100%;
`;
const Title = styled.h1`
  /* grid-row: 1/2; */
  /* grid-column: 2/3; */
  /* justify-self: end; */
  /* margin: 1rem 0 0rem 1.5rem; */
  height: 1em;
`;
const BattleType = styled.h2`
  /* grid-row: 2/3; */
  justify-self: start;
  margin: 0 0 0 0rem;
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
  battleType,
}: TitleBarType) => {
  return (
    <>
      <Title>PokeInfo</Title>
      <>
        {/* <BattleType>{battleType}</BattleType> */}
        <PokeButton
          onClick={isDevelopmentMode ? sendTestMessage : sendPokemonMessage}
        >
          <img alt="pokeball" src={pokeball} className="pokeball-btn" />
        </PokeButton>
      </>
    </>
  );
};
