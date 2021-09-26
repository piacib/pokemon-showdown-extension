import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OpponentPokemonDataDisplay } from "./OpponentPokemonDataDisplay";
import { ActivePokemon, OpponentsProps } from "../types";
import { Sprites } from "@pkmn/img";
import pokeball from "../media/pokeball.svg";
import { OpponentsTeamUnavailable } from "./OpponentsTeamUnavailable";
import { PokemonUnavailable } from "./PokemonUnavailable";

const ButtonDisplay = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  display: flex;
  flex-direction: row;
  place-self: start;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
  width: 300px;
`;
const Button = styled.button`
  /* font-size: 10px; */
  width: inherit;
  background: none;
  border: none;

  height: 40px;
  border-radius: 0;
  margin: 0.15em;
`;

const activePokemonRegEx = (name: string): string => {
  const nameMatched = name.match(/[^(]+/);
  const activePokemonName = nameMatched ? nameMatched[0] : "";
  return activePokemonName.slice(0, activePokemonName.length - 1);
};
const activePokemonNames = (arr: string[]): string[] => {
  // takes in active pokemon (potentailly 2 for double battles)
  // and returns name with up  sliced off
  return arr.map((x) => activePokemonRegEx(x));
};

const getCurrentPokemon = (opponentsTeam: string[] | null): ActivePokemon => {
  if (!opponentsTeam) {
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
const pokemonNameFilter = (name: string): string => {
  if (name === "Not revealed") {
    return name;
  }
  const parenthesis = name.match(/\(([^)]+)\)/);

  const activePokemon = name.match(
    // /^([\w-]+)/
    /[^(]+/
  );
  let activePokemonName = activePokemon ? activePokemon[0] : name;
  if (activePokemonName[activePokemonName.length - 1] === " ") {
    activePokemonName = activePokemonName.slice(
      0,
      activePokemonName.length - 1
    );
  }
  const regex = new RegExp(`(${activePokemonName}.*){2}`);
  if (parenthesis) {
    if (name.match(regex)) {
      return parenthesis[1];
    }
  }

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
  return {
    pokemon1: activePokemonName,
    pokemon2: null,
  };
};

type Name = {
  name: string;
};

const SpriteImage: React.FC<Name> = ({ name }) => {
  const ButtonSize = 40;
  const ButtonSizePX = `${ButtonSize}px`;
  if (name === "Not revealed") {
    return (
      <img
        src={pokeball}
        alt={name}
        style={{
          width: ButtonSizePX,
          height: ButtonSizePX,
        }}
      ></img>
    );
  }
  const { url, w, h } = Sprites.getPokemon(name.toLowerCase(), {
    gen: 7,
    shiny: false,
  });

  if (url === "https://play.pokemonshowdown.com/sprites/gen5/0.png") {
    return (
      <img
        src={url}
        alt={"question mark"}
        style={{
          width: ButtonSizePX,
          height: ButtonSizePX,
        }}
      ></img>
    );
  }
  const width = `${(w / h) * ButtonSize}px`;
  return (
    <img
      src={url}
      alt={name}
      style={{ width: width, height: ButtonSizePX, maxWidth: "50px" }}
    ></img>
  );
};

//fetches latest pokemon data from auto updating dataset
export const OpponentsTeamDisplay = ({
  opponentsTeam,
  isRandomBattle,
}: OpponentsProps) => {
  const [currentPokemon, setCurrentPokemon] = useState<ActivePokemon>(
    getCurrentPokemon(opponentsTeam)
  );

  useEffect(() => {
    setCurrentPokemon(getCurrentPokemon(opponentsTeam));
  }, [opponentsTeam]);

  return !opponentsTeam ? (
    <>
      <ButtonDisplay>
        <SpriteImage name={pokemonNameFilter("")} />
        <SpriteImage name={pokemonNameFilter("")} />
        <SpriteImage name={pokemonNameFilter("")} />
        <SpriteImage name={pokemonNameFilter("")} />
        <SpriteImage name={pokemonNameFilter("")} />
        <SpriteImage name={pokemonNameFilter("")} />
      </ButtonDisplay>
      <OpponentsTeamUnavailable />
    </>
  ) : (
    <>
      <ButtonDisplay>
        {opponentsTeam.map((x, idx) => (
          <Button
            key={pokemonNameFilter(x) + idx}
            onClick={() => {
              setCurrentPokemon(getPokemonName(x));
            }}
          >
            <SpriteImage name={pokemonNameFilter(x)} />
          </Button>
        ))}
      </ButtonDisplay>

      {currentPokemon.pokemon1 ? (
        <OpponentPokemonDataDisplay
          pokemon={currentPokemon.pokemon1}
          isRandomBattle={isRandomBattle}
        />
      ) : (
        <PokemonUnavailable />
      )}
    </>
  );
};
