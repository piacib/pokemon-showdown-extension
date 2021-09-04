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
  grid-template-columns: 1fr 280px;
  grid-template-rows: repeat(4, auto);
  justify-items: center;
  grid-gap: 10px;
  font-size: 1.3rem;
  border: 5px solid black;
  /* overflow-y: scroll; */
`;
const PropertyDisplay = styled.div`
  grid-column: 1/2;
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const HiddenPropertyText = styled.div`
  display: none;
`;
const Property = styled.div`
  padding: 5px;
  text-align: center;
  padding: 2px;
  margin: 2px;
  border: 2px solid black;
  font-size: 0.75rem;

  &:hover ${HiddenPropertyText} {
    display: block;
    position: absolute;
    max-width: 250px;
    text-align: start;
    font-size: 1.1rem;
    background: white;
    border: 1px solid black;
  }
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
  Items,
  Moves,
  Species,
  // Natures,
  // FormatsData,
} = Dex.data;

export const OpponentPokemonDataDisplay = (
  props: OpponentPokemonDataDisplayProps
) => {
  const [typesArray, setTypesArray] = useState<string[] | null>(null);
  const pokemon: ActivePokemon = props.pokemon;
  const pokemonData: PokemonData = props.pokemonData;

  console.log(Moves);
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
    console.log(Items);
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
            <PropertyDisplay>
              {abilities.map((x) => (
                <>
                  <Property>
                    {x}
                    <HiddenPropertyText>
                      {Abilities[dexSearchPrepper(x)].shortDesc}
                    </HiddenPropertyText>
                  </Property>
                </>
              ))}
            </PropertyDisplay>
            <PropertyDisplay>
              {items.map((x) => (
                <Property>
                  {x}
                  <HiddenPropertyText>
                    {Items[dexSearchPrepper(x)].desc}
                  </HiddenPropertyText>
                </Property>
                // <Item>{x}</Item>
              ))}
            </PropertyDisplay>
            <PropertyDisplay>
              {/* Moves */}
              {pokemonData[pokemon.pokemon1].moves.map((x) => (
                <Property>{x}</Property>
              ))}
            </PropertyDisplay>
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
