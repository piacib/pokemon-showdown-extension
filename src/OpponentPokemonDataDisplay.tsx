import React, { useEffect, useState } from "react";
import {
  ActivePokemon,
  PokemonData,
  OpponentPokemonDataDisplayProps,
} from "./types";
import "./AppDesign.css";
import styled from "styled-components";
import { useAsyncMoveFetch } from "./hooks/useAsyncMoveFetch";
import { Dex } from "@pkmn/dex";

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
  const [moves] = useAsyncMoveFetch(urls);
  console.log(Dex.data);
  useEffect(() => {
    if (pokemonData && pokemon.pokemon1) {
      setUrls(
        pokemonData[pokemon.pokemon1].moves.map((x: string) =>
          pokeAPIUrlGenerator(moveFetchPrepper(x))
        )
      );
      // setMoves(urls);
    }
  }, [pokemon, pokemonData]);
  if (pokemonData && pokemon.pokemon1 && pokemonData[pokemon.pokemon1]) {
    const { level, abilities, items, moves } = pokemonData[pokemon.pokemon1];

    return (
      <PokemonScreen>
        <OuterBox>
          <InnerBox>
            <div>
              <a
                href={`https://www.smogon.com/dex/ss/pokemon/${pokemon.pokemon1}/`}
              >
                {pokemon.pokemon1}
              </a>
              <div>
                {JSON.stringify(
                  Species[dexSearchPrepper(pokemon.pokemon1)].types
                )}
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
