import React, { useEffect, useState } from "react";
import pokeball from "./media/pokeball.svg";
import styled from "styled-components";
import { OpponentPokemonDataDisplay } from "./OpponentPokemonDataDisplay";
import { PokemonData } from "./types";
const DataDisplay = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
`;
const ButtonSize = "1rem";
const ButtonDisplay = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 150px;
  grid-column: 2;
`;

const Pokeball = styled.img`
  width: ${ButtonSize};
`;
const Button = styled.button`
  font-size: 16px;
  width: 150px;
  height: 40px;
  border-radius: 0;
  margin: 0.25em;
`;

const activePokemonNames = (arr: string[]) => {
  return arr.map((x) => x.slice(0, x.length - 9));
};
const getCurrentPokemon = (opponentsTeam: string[] | null): null | string[] => {
  if (!opponentsTeam) {
    return null;
  }

  const activePokemon = opponentsTeam.filter((x) => x.includes("active"));
  return activePokemonNames(activePokemon);
};
interface OpponentsProps {
  opponentsTeam: string[] | null;
}
interface PokeballButtonProps {
  pokemon: string;
}
const PokeballButton = ({ pokemon }: PokeballButtonProps) => {
  return <Button className="search-text">{pokemon}</Button>;
};
//fetches latest pokemon data from auto updating dataset
export const OpponentsTeamDisplay = ({ opponentsTeam }: OpponentsProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonData>({});
  useEffect(() => {
    console.log("fetching");
    fetch("https://pkmn.github.io/randbats/data/gen8randombattle.json")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPokemonData(data);
      });
  }, []);

  console.log("OpponentsTeamDisplay", opponentsTeam);
  return !opponentsTeam ? (
    <div>empty</div>
  ) : (
    <DataDisplay>
      <ButtonDisplay>
        {opponentsTeam.map((x) => (
          <PokeballButton pokemon={x} />
        ))}
      </ButtonDisplay>
      {pokemonData && opponentsTeam ? (
        <OpponentPokemonDataDisplay
          pokemonData={pokemonData}
          pokemon={getCurrentPokemon(opponentsTeam)}
        />
      ) : (
        <div>loading</div>
      )}
    </DataDisplay>
  );
};
