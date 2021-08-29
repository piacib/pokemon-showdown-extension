import React, { useEffect, useState } from "react";
import pokeball from "./media/pokeball.svg";
import styled from "styled-components";
import { OpponentPokemonDataDisplay } from "./OpponentPokemonDataDisplay";
import { PokemonData, ActivePokemon } from "./types";
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
const activePokemonNames = (arr: string[]): string[] => {
  // takes in active pokemon (potentailly 2 for double battles)
  // and returns name with active sliced off
  return arr.map((x) => x.slice(0, x.length - 9));
};

const getCurrentPokemon = (opponentsTeam: string[] | null): ActivePokemon => {
  if (!opponentsTeam) {
    console.log("opponentsTeam is null", opponentsTeam);
    return {
      pokemon1: null,
      pokemon2: null,
    };
  }
  const activePokemon = opponentsTeam.filter((x) => x.includes("active"));
  const activePokemonFilteredName: string[] = activePokemonNames(activePokemon);

  if (activePokemon.length === 1) {
    return {
      pokemon1: activePokemonFilteredName[0],
      pokemon2: null,
    };
  }
  return {
    pokemon1: activePokemonFilteredName[0],
    pokemon2: activePokemonFilteredName[1],
  };
};
interface OpponentsProps {
  opponentsTeam: string[] | null;
}
interface PokeballButtonProps {
  pokemon: string;
}
// converts string to just pokemon name for the button component
//  by pullingout first word
const getPokemonName = (nameStr: string): ActivePokemon => {
  if (nameStr.includes("Not revealed")) {
    return {
      pokemon1: null,
      pokemon2: null,
    };
  }
  const activePokemon = nameStr.match(/^([\w\-]+)/);
  const activePokemonName = activePokemon ? activePokemon[0] : null;
  console.log({
    pokemon1: activePokemonName,
    pokemon2: null,
  });
  return {
    pokemon1: activePokemonName,
    pokemon2: null,
  };
};
const PokeballButton = ({ pokemon }: PokeballButtonProps) => {
  return <Button>{pokemon}</Button>;
};
//fetches latest pokemon data from auto updating dataset
export const OpponentsTeamDisplay = ({ opponentsTeam }: OpponentsProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonData>({
    "": {
      level: 0,
      abilities: [],
      items: [],
      moves: [],
    },
  });
  const [currentPokemon, setCurrentPokemon] = useState<ActivePokemon>(
    getCurrentPokemon(opponentsTeam)
  );
  console.log("currentPokemon", currentPokemon);
  useEffect(() => {
    console.log("fetching");
    fetch("https://pkmn.github.io/randbats/data/gen8randombattle.json")
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("git data", data);
        setPokemonData(data);
      });
  }, []);

  return !opponentsTeam ? (
    <div>empty</div>
  ) : (
    <DataDisplay>
      <ButtonDisplay>
        {opponentsTeam.map((x) => (
          <Button
            onClick={() => {
              console.log([x]);
              setCurrentPokemon(getPokemonName(x));
            }}
          >
            {x}
          </Button>
        ))}
      </ButtonDisplay>
      {pokemonData && opponentsTeam ? (
        <OpponentPokemonDataDisplay
          pokemonData={pokemonData}
          pokemon={currentPokemon}
        />
      ) : (
        <div>loading</div>
      )}
    </DataDisplay>
  );
};
