import React from "react";
import styled from "styled-components";
import pokeball from "./media/pokeball.svg";
import { TitleBarType } from "./types";
const TitleBarDisplay = styled.div`
  display: grid;
  height: 100px;
  grid-column: 1 / end;
  grid-row: 1;
  margin-top: 1rem;
  width: 100%;
`;
const Title = styled.h1`
  grid-row: 1/2;
  justify-self: start;
  text-align: center;
  margin: 1rem 0 0rem 1.5rem;
  height: 1em;
`;
const BattleType = styled.h2`
  grid-row: 2/3;
  justify-self: start;
  margin: 0 0 0 1.5rem;
`;
const PokeButton = styled.button`
  grid-column: 2/3;
  grid-row: 1/3;
  justify-self: center;
  align-self: center;
`;

export const TitleBar = ({
  sendTestMessage,
  sendPokemonMessage,
  battleType,
}: TitleBarType) => {
  //   const battleType = "gen8OU";

  return (
    <TitleBarDisplay>
      <Title>Poke Info</Title>
      <BattleType>
        {battleType
          ? battleType
          : "this extension only works on pokemon showdown"}
      </BattleType>
      {/* <button onClick={sendTestMessage}>SEND Test MESSAGE</button> */}
      <PokeButton onClick={sendPokemonMessage}>
        <img alt="pokeball button" src={pokeball} className="pokeball-btn" />
        <p className="search-text">Search</p>
      </PokeButton>
    </TitleBarDisplay>
  );
};
