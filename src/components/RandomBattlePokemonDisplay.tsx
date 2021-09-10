import React, { useEffect, useState } from "react";
import {
  RandomBattlePokemonDisplayProps,
  PokemonData,
  RandbatsPokemonData,
} from "../types";
import { Dex, Move } from "@pkmn/dex";
import { dexSearchPrepper } from "../functions";
import {
  HiddenPropertyText,
  PropertyBtn,
  MoveData,
  MoveProperty,
  MoveDescription,
  MoveBtn,
  AbilitiesDisplay,
  MovesDisplay,
  ItemsDisplay,
  MoveType,
} from "../styles/DataDisplayStyles";
console.log(Move);
const { Moves, Items, Abilities } = Dex.data;

export const RandomBattlePokemonDisplay = ({
  pokemon,
  isRandomBattle,
}: RandomBattlePokemonDisplayProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonData>({
    moves: [],
    abilities: [],
    items: [],
  });
  const [randbatsPokemonData, setRandbatsPokemonData] =
    useState<RandbatsPokemonData>({
      "": {
        level: 0,
        abilities: [],
        items: [],
        moves: [],
      },
    });

  useEffect(() => {
    console.log("isRandomBattle fetching");
    async function asyncFetchRandomPokemonData() {
      const fetchData = await fetch(
        `https://pkmn.github.io/randbats/data/${isRandomBattle}.json`
      );
      const response = await fetchData.json();
      setRandbatsPokemonData(response);
    }

    asyncFetchRandomPokemonData();
  }, [isRandomBattle]);
  useEffect(() => {
    if (randbatsPokemonData[pokemon]) {
      console.log("setpkdata");
      const { abilities, items, moves } = randbatsPokemonData[pokemon];
      setPokemonData({ abilities: abilities, items: items, moves: moves });
    }
  }, [pokemon, randbatsPokemonData]);
  const movesData = pokemonData.moves.map(
    (move) => Moves[dexSearchPrepper(move)]
  );
  if (randbatsPokemonData[pokemon]) {
  }
  return (
    <>
      <AbilitiesDisplay>
        Abilities:
        {pokemonData.abilities.map((x) => (
          <>
            <PropertyBtn>
              {x}
              <HiddenPropertyText>
                {Abilities[dexSearchPrepper(x)].shortDesc}
              </HiddenPropertyText>
            </PropertyBtn>
          </>
        ))}
      </AbilitiesDisplay>
      <ItemsDisplay>
        Items:
        {pokemonData.items.map((x) => (
          <PropertyBtn>
            {x}
            <HiddenPropertyText>
              {Items[dexSearchPrepper(x)].desc}
            </HiddenPropertyText>
          </PropertyBtn>
        ))}
      </ItemsDisplay>
      <MovesDisplay>
        Moves:
        {movesData.map((move) => (
          <MoveBtn>
            {move.name}
            <HiddenPropertyText>
              <MoveData>
                <MoveDescription>{move.shortDesc}</MoveDescription>
                <MoveType background={move.type}>{move.type}</MoveType>
                {typeof move.accuracy === "number" ? (
                  <MoveProperty>Accuracy: {move.accuracy}%</MoveProperty>
                ) : null}
                {move.priority ? (
                  <MoveProperty>Priority: {move.priority}</MoveProperty>
                ) : null}
                {move.basePower ? (
                  <MoveProperty>Power: {move.basePower}</MoveProperty>
                ) : null}
                <MoveProperty>Category: {move.category}</MoveProperty>
              </MoveData>
            </HiddenPropertyText>
          </MoveBtn>
        ))}
      </MovesDisplay>
    </>
  );
};
