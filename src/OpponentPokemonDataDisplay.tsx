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
  display: grid;

  font-size: 1.3rem;
  border: 5px solid black;
  align-items: center;
  justify-content: center;
`;
const Move = styled.div``;
const Ability = styled.div``;
const Item = styled.div``;
const MoveDisplay = styled.div`
  /* width: 100%; */
  display: grid;
  grid-template-columns: 1fr 1fr;

  border: 1px solid black;
`;
const ItemsDisplay = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  width: 100%;
  border: 1px solid black;
`;
const AbilitiesDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  border: 1px solid black;
`;
const moveFetchPrepper = (move: string) => {
  return move.replace(" ", "-").toLowerCase();
};
const pokeAPIUrlGenerator = (query: string, version = "v2", type = "move") => {
  return `https://pokeapi.co/api/${version}/${type}/${query}`;
};

export const OpponentPokemonDataDisplay = (
  props: OpponentPokemonDataDisplayProps
) => {
  const pokemon: ActivePokemon = props.pokemon;
  const pokemonData: PokemonData = props.pokemonData;
  const [urls, setUrls] = useState<string[]>([]);
  const [moves, setMoves] = useAsyncMoveFetch(urls);

  useEffect(() => {
    if (pokemonData && pokemon.pokemon1) {
      console.log(pokemonData);
      console.log("url set");
      setUrls(
        pokemonData[pokemon.pokemon1].moves.map((x: string) =>
          pokeAPIUrlGenerator(moveFetchPrepper(x))
        )
      );
      // setMoves(urls);
    }
  }, [pokemon, pokemonData]);

  console.log(moves);
  // console.log("OpponentPokemonDataDisplay", pokemonData[pokemon.pokemon1]);
  if (pokemonData && pokemon.pokemon1 && pokemonData[pokemon.pokemon1]) {
    const { level, abilities, items, moves } = pokemonData[pokemon.pokemon1];
    console.log(level, abilities, items, moves);

    return (
      <PokemonScreen>
        <OuterBox>
          <InnerBox>
            <div>
              <a
                href={`https://www.smogon.com/dex/sm/pokemon/${pokemon.pokemon1}/`}
              >
                {pokemon.pokemon1}
              </a>
            </div>
            <AbilitiesDisplay>
              {abilities.map((x) => (
                <Ability>{x}</Ability>
              ))}
            </AbilitiesDisplay>
            <ItemsDisplay>
              {items.map((x) => (
                <Item>{x}</Item>
              ))}
            </ItemsDisplay>
            <MoveDisplay>
              {moves.map((x) => (
                <Move>{x}</Move>
              ))}
            </MoveDisplay>
          </InnerBox>
        </OuterBox>
      </PokemonScreen>
    );
  }
  return <div> Noooooooooo</div>;
};
