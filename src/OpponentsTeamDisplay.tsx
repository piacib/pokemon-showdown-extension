import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OpponentPokemonDataDisplay } from "./OpponentPokemonDataDisplay";
import { PokemonData, ActivePokemon, OpponentsProps } from "./types";
import { Sprites } from "@pkmn/img";
import pokeball from "./media/pokeball.svg";
import { OpponentsTeamUnavailable } from "./OpponentsTeamUnavailable";

const ButtonDisplay = styled.div`
  grid-row: 2/3;
  grid-column: 1/4;
  display: flex;
  flex-direction: row;
  place-self: center;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
  /* width: 550px; */
`;
const Button = styled.button`
  font-size: 10px;
  width: inherit;
  background: none;
  height: 60px;
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
  return {
    pokemon1: activePokemonName,
    pokemon2: null,
  };
};

type Name = {
  name: string;
};
const SpriteImage: React.FC<Name> = ({ name }) => {
  const ButtonSize = 60;
  const ButtonSizePX = `${ButtonSize}px`;
  if (name === "Not revealed") {
    return (
      <img
        src={pokeball}
        alt={name}
        style={{
          width: ButtonSizePX,
          height: ButtonSizePX,
          imageRendering: "pixelated",
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
          width: "80px",
          height: "80px",
        }}
      ></img>
    );
  }
  const width = `${(w / h) * ButtonSize}px`;
  return (
    <img
      src={url}
      alt={name}
      style={{ width: width, height: ButtonSize }}
    ></img>
  );
};
// const spriteSrc = url;
// const spriteWidth = w;
// const spriteHeight = h;

//fetches latest pokemon data from auto updating dataset
export const OpponentsTeamDisplay = ({
  opponentsTeam,
  isRandomBattle,
}: OpponentsProps) => {
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
    if (isRandomBattle) {
      fetch(`https://pkmn.github.io/randbats/data/${isRandomBattle}.json`)
        .then((resp) => resp.json())
        .then((data) => {
          setPokemonData(data);
        });
    }
  }, [isRandomBattle]);

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
      {pokemonData ? (
        <OpponentPokemonDataDisplay
          pokemonData={pokemonData}
          pokemon={currentPokemon}
          isRandomBattle={isRandomBattle}
        />
      ) : (
        <div>loading</div>
      )}
    </>
  );
};
