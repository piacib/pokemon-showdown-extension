import React from "react";
// import { useTeams } from "./hooks/useTeams";
import pokeball from "./media/pokeball.svg";
import styled from "styled-components";
const ButtonSize = "2rem";
const ButtonDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 2;
  height: 100%;
`;

const Pokeball = styled.img`
  width: ${ButtonSize};
`;
const Button = styled.button`
  width: ${ButtonSize};
  height: ${ButtonSize};
  margin: 0.25em;
`;

const PokeballButton = () => {
  return (
    <Button>
      <Pokeball alt="pokeball button" src={pokeball} />
      <p className="search-text"></p>
    </Button>
  );
};
export const OpponentsTeamDisplay = () => {
  //   const team = useTeams();
  //   console.log(team);
  return (
    <ButtonDisplay>
      {[1, 2, 3, 4, 5, 6].map((x) => (
        <PokeballButton />
      ))}
    </ButtonDisplay>
  );
};
