import {
  ActivePokemon,
  PokemonData,
  OpponentPokemonDataDisplayProps,
} from "./types";
import "./AppDesign.css";
import styled from "styled-components";
import { Dex } from "@pkmn/dex";
import { DamageDisplay } from "./DamageDisplay";
import { useEffect, useState } from "react";
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
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 53px 1fr 1fr 1fr;
  grid-gap: 10px;
  font-size: 1.3rem;
  border: 5px solid black;
`;
const Move = styled.div`
  padding: 5px;
`;
const Ability = styled.div``;
const Item = styled.div`
  height: 1rem;
  width: fit-content;
`;
const TypeBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Type = styled.div`
  width: fit-content;
  padding: 5px;
  margin: 0.5em;
  border-radius: 20px;
`;
const MoveDisplay = styled.div`
  /* width: 100%; */
  grid-column: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ItemsDisplay = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1/2;
`;
const AbilitiesDisplay = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
`;
const PokemonName = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NotRevealed = styled.h3`
  text-align: center;
  line-height: 2;
`;
const dexSearchPrepper = (str: string): string => {
  return str.toLowerCase().replace(/\W+/g, "");
};
// const moveFetchPrepper = (move: string) => {
//   return move.replace(" ", "-").toLowerCase();
// };

const {
  Abilities,
  // Aliases,
  // Conditions,
  // Items,
  // Moves,
  Species,
  // Natures,
  Types,
  // FormatsData,
} = Dex.data;

export const OpponentPokemonDataDisplay = (
  props: OpponentPokemonDataDisplayProps
) => {
  const [typesArray, setTypesArray] = useState<string[] | null>(null);
  const pokemon: ActivePokemon = props.pokemon;
  const pokemonData: PokemonData = props.pokemonData;

  console.log(Types);
  useEffect(() => {
    if (pokemon.pokemon1) {
      setTypesArray(
        Species[dexSearchPrepper(pokemon.pokemon1)].types.map((x) =>
          x.toLowerCase()
        )
      );
    }
  }, [pokemon.pokemon1]);
  if (pokemonData && pokemon.pokemon1 && pokemonData[pokemon.pokemon1]) {
    const { abilities, items, moves } = pokemonData[pokemon.pokemon1];
    return (
      <>
        <OuterBox>
          <InnerBox>
            <PokemonName>
              <a
                href={`https://www.smogon.com/dex/ss/pokemon/${pokemon.pokemon1}/`}
              >
                {pokemon.pokemon1}
              </a>
              {/* <TypeBox>
                {Species[dexSearchPrepper(pokemon.pokemon1)].types.map((x) => (
                  <Type className={x.toLowerCase()}>{x}</Type>
                ))}
              </TypeBox> */}
            </PokemonName>
            <DamageDisplay typesArray={typesArray} />
            <AbilitiesDisplay>
              {abilities.map((x) => (
                <>
                  <Ability>{x}</Ability>
                </>
              ))}
            </AbilitiesDisplay>
            <ItemsDisplay>
              {items.map((x) => (
                <Item>{x}</Item>
              ))}
            </ItemsDisplay>
            <MoveDisplay>
              Moves
              {/* {pokemonData[pokemon.pokemon1].moves.map((x) => (
                <Move>{x}</Move>
              ))} */}
            </MoveDisplay>
          </InnerBox>
        </OuterBox>
      </>
    );
  }
  return (
    <OuterBox>
      <InnerBox>
        <NotRevealed>This Pokemon hasn't been revealed yet</NotRevealed>
      </InnerBox>
    </OuterBox>
  );
};
