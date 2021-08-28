import React, { useEffect, useState } from "react";
import {
  ActivePokemon,
  PokemonData,
  OpponentPokemonDataDisplayProps,
} from "./types";
import "./AppDesign.css";
import styled from "styled-components";
import { useAsyncMoveFetch } from "./hooks/useAsyncMoveFetch";

const PokemonScreen = styled.div`
  position: relative;
  width: 415px;
  height: 275px;
`;
const OuterBox = styled.div`
  width: 100%;
  height: 100%;
  border: 5px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InnerBox = styled.div`
  width: 400px;
  height: 260px;
  display: flex;
  border: 5px solid black;
  align-items: center;
  justify-content: center;
`;
const moveFetchPrepper = (move: string) => {
  return move.replace(" ", "-").toLowerCase();
};
const pokeAPIUrlGenerator = (query: string, version = "v2", type = "move") => {
  return `https://pokeapi.co/api/${version}/${type}/${query}`;
};

export const OpponentPokemonDataDisplay = (
  props: OpponentPokemonDataDisplayProps
) =>
  // pokemonName: string,
  // pokemonName: string
  {
    const pokemon: ActivePokemon = props.pokemon;
    const pokemonData: PokemonData = props.pokemonData;

    const [urls, setUrls] = useState<string[]>([]);

    console.log(pokemon);
    useEffect(() => {
      if (pokemonData && pokemon.pokemon1) {
        console.log("url set");
        setUrls(
          pokemonData[pokemon.pokemon1].moves.map((x: string) =>
            pokeAPIUrlGenerator(moveFetchPrepper(x))
          )
        );
      }
    }, [pokemon, pokemonData]);

    const [moves, setMoves] = useAsyncMoveFetch([]);

    // console.log("OpponentPokemonDataDisplay", pokemonData[pokemon.pokemon1]);
    if (pokemonData && pokemon.pokemon1 && pokemonData[pokemon.pokemon1]) {
      const { level, abilities, items, moves } = pokemonData[pokemon.pokemon1];
      console.log(level, abilities, items, moves);
      const keys = Object.keys(pokemonData[pokemon.pokemon1]);
      const values = Object.values(pokemonData[pokemon.pokemon1]);

      return (
        <PokemonScreen>
          <OuterBox>
            <InnerBox>
              <ul>
                <li>
                  <a
                    href={`https://www.smogon.com/dex/sm/pokemon/${pokemon.pokemon1}/`}
                  >
                    {pokemon.pokemon1}
                  </a>
                </li>

                <li>{level}</li>
                <li>{abilities}</li>
                <li>{items}</li>
                <li>{moves}</li>

                {/* {keys.map((key, idx) =>
                  key === "level" ? null : <li id={key}>{`${values[idx]}`}</li>
                )} */}
              </ul>
            </InnerBox>
          </OuterBox>
        </PokemonScreen>
      );
    }
    return <div> Noooooooooo</div>;
  };
