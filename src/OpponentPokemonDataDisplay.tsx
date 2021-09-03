import React, { useEffect, useState } from "react";
import {
  ActivePokemon,
  PokemonData,
  OpponentPokemonDataDisplayProps,
} from "./types";
import "./AppDesign.css";
import styled from "styled-components";
import { Dex } from "@pkmn/dex";

const PokemonScreen = styled.div`
  position: relative;
  width: 100%;
  height: 275px;
`;
const OuterBox = styled.div`
  width: 100%;
  grid-column: 1/4;
  grid-row: 3/4;
  border: 5px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const InnerBox = styled.div`
  width: 550px;
  height: 240px;
  display: grid;

  font-size: 1.3rem;
  border: 5px solid black;
  align-items: center;
  justify-content: center;
`;
const Move = styled.div`
  padding: 5px;
`;
const Ability = styled.div``;
const Item = styled.div``;
const Type = styled.div`
  width: fit-content;
  padding: 5px;
  margin: 0.5em;
  border-radius: 20px;
`;
const MoveDisplay = styled.div`
  /* width: 100%; */
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ItemsDisplay = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  width: 100%;
`;
const AbilitiesDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;
const NotRevealed = styled.h3`
  text-align: center;
  line-height: 2;
`;
const dexSearchPrepper = (str: string): string => {
  return str.toLowerCase().replace(/\W+/g, "");
};
const moveFetchPrepper = (move: string) => {
  return move.replace(" ", "-").toLowerCase();
};
const pokeAPIUrlGenerator = (query: string, version = "v2", type = "move") => {
  return `https://pokeapi.co/api/${version}/${type}/${query}`;
};
const {
  Abilities,
  // Aliases,
  // Conditions,
  // Items,
  // Moves,
  Species,
  // Natures,
  // Types,
  // FormatsData,
} = Dex.data;
export const OpponentPokemonDataDisplay = (
  props: OpponentPokemonDataDisplayProps
) => {
  const pokemon: ActivePokemon = props.pokemon;
  const pokemonData: PokemonData = props.pokemonData;
  const [urls, setUrls] = useState<string[]>([]);
  // const [moves] = useAsyncMoveFetch(urls);

  if (pokemonData && pokemon.pokemon1 && pokemonData[pokemon.pokemon1]) {
    const { abilities, items, moves } = pokemonData[pokemon.pokemon1];

    return (
      <>
        <OuterBox>
          <InnerBox>
            <div>
              <a
                href={`https://www.smogon.com/dex/ss/pokemon/${pokemon.pokemon1}/`}
              >
                {pokemon.pokemon1}
              </a>
              <div>
                {Species[dexSearchPrepper(pokemon.pokemon1)].types.map((x) => (
                  <Type className={x.toLowerCase()}>{x}</Type>
                ))}
              </div>
            </div>
            <AbilitiesDisplay>
              {abilities.map((x) => (
                <>
                  <Ability>{x}</Ability>

                  {/* <div>
                    {JSON.stringify(Abilities[dexSearchPrepper(x)].shortDesc)}
                  </div> */}
                </>
              ))}
            </AbilitiesDisplay>
            <ItemsDisplay>
              {items.map((x) => (
                <Item>{x}</Item>
              ))}
            </ItemsDisplay>
            <MoveDisplay>
              {pokemonData[pokemon.pokemon1].moves.map((x) => (
                <Move>{x}</Move>
              ))}
            </MoveDisplay>
          </InnerBox>
        </OuterBox>
      </>
    );
  }
  return (
    <OuterBox>
      <InnerBox>
        <NotRevealed> This Pokemon hasn't been revealed yet</NotRevealed>
      </InnerBox>
    </OuterBox>
  );
};
