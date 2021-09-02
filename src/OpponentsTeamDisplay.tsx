import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OpponentPokemonDataDisplay } from "./OpponentPokemonDataDisplay";
import { PokemonData, ActivePokemon, OpponentsProps } from "./types";

const DataDisplay = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
`;
const ButtonDisplay = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 150px;
  grid-column: 2;
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
  console.log("getCurrentPokemon", opponentsTeam);
  if (!opponentsTeam) {
    console.log("opponentsTeam is null");
    return {
      pokemon1: null,
      pokemon2: null,
    };
  }
  const activePokemon = opponentsTeam.filter((x) => x.includes("active"));
  const activePokemonFilteredName: string[] = activePokemonNames(activePokemon);
  console.log("getCurrentPokemon", activePokemonFilteredName[0]);

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
const pokemonNameFilter = (name: string): string => {
  if (name === "Not revealed") {
    return name;
  }
  const activePokemon = name.match(/^([\w-]+)/);
  const activePokemonName = activePokemon ? activePokemon[0] : name;

  return activePokemonName;
};
// converts string to just pokemon name for the button component
//  by pulling out first word
const getPokemonName = (nameStr: string): ActivePokemon => {
  if (nameStr.includes("Not revealed")) {
    return {
      pokemon1: null,
      pokemon2: null,
    };
  }
  const activePokemonName = pokemonNameFilter(nameStr);
  console.log({
    pokemon1: activePokemonName,
    pokemon2: null,
  });
  return {
    pokemon1: activePokemonName,
    pokemon2: null,
  };
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
  const [currentPokemon, setCurrentPokemon] = useState<ActivePokemon>({
    pokemon1: null,
    pokemon2: null,
  });

  useEffect(() => {
    setCurrentPokemon(getCurrentPokemon(opponentsTeam));
  }, [opponentsTeam]);

  useEffect(() => {
    // console.log("fetching", currentPokemon);
    fetch("https://pkmn.github.io/randbats/data/gen8randombattle.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPokemonData(data);
      });
  }, []);

  return !opponentsTeam ? (
    <div>empty</div>
  ) : (
    <DataDisplay>
      <ButtonDisplay>
        {opponentsTeam.map((x, idx) => (
          <Button
            key={pokemonNameFilter(x) + idx}
            onClick={() => {
              setCurrentPokemon(getPokemonName(x));
            }}
          >
            {pokemonNameFilter(x)}
          </Button>
        ))}
      </ButtonDisplay>
      {pokemonData ? (
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
