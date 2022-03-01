import React, { useEffect, useState } from 'react';
import { PokemonData, RandbatsPokemonData, isRandomBattleReturn } from '../../types';
import { Dex } from '@pkmn/dex';
import { dexSearchPrepper } from '../../functions';
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
} from './DataDisplay.styles';
const { Moves, Items, Abilities } = Dex.data;
interface RandomBattlePokemonDisplayProps {
  pokemon: string;
  isRandomBattle: isRandomBattleReturn;
}

export const RandomBattlePokemonDisplay: React.FC<RandomBattlePokemonDisplayProps> = ({
  pokemon,
  isRandomBattle,
}) => {
  const [pokemonData, setPokemonData] = useState<PokemonData>({
    moves: [],
    abilities: [],
    items: [],
  });
  const [randbatsPokemonData, setRandbatsPokemonData] = useState<RandbatsPokemonData>({
    '': {
      level: 0,
      abilities: [],
      items: [],
      moves: [],
    },
  });
  // fetchs random pokemon data only on startup
  useEffect(() => {
    async function asyncFetchRandomPokemonData() {
      const fetchData = await fetch(`https://pkmn.github.io/randbats/data/${isRandomBattle}.json`);
      const response = await fetchData.json();
      setRandbatsPokemonData(response);
    }
    asyncFetchRandomPokemonData();
  }, [isRandomBattle]);
  // sets pokemon data when new pokemon is selected
  useEffect(() => {
    if (randbatsPokemonData[pokemon]) {
      const { abilities, items, moves } = randbatsPokemonData[pokemon];
      setPokemonData({ abilities: abilities, items: items, moves: moves });
    }
  }, [pokemon, randbatsPokemonData]);
  const movesData = pokemonData.moves.map((move) => Moves[dexSearchPrepper(move)]);
  return (
    <>
      <AbilitiesDisplay>
        Abilities:
        {pokemonData.abilities.map((ability) => (
          <PropertyBtn key={ability}>
            {ability}
            <HiddenPropertyText>
              {Abilities[dexSearchPrepper(ability)].shortDesc}
            </HiddenPropertyText>
          </PropertyBtn>
        ))}
      </AbilitiesDisplay>
      <ItemsDisplay>
        Items:
        {pokemonData.items.map((item) => (
          <PropertyBtn key={item}>
            {item}
            <HiddenPropertyText>{Items[dexSearchPrepper(item)].desc}</HiddenPropertyText>
          </PropertyBtn>
        ))}
      </ItemsDisplay>
      <MovesDisplay>
        Moves:
        {movesData.map((move) => (
          <MoveBtn key={move.name}>
            {move.name}
            <HiddenPropertyText>
              <MoveData>
                <MoveDescription>{move.shortDesc}</MoveDescription>
                <MoveType background={move.type}>{move.type}</MoveType>
                {typeof move.accuracy === 'number' && (
                  <MoveProperty>Accuracy: {move.accuracy}%</MoveProperty>
                )}
                {Boolean(move.priority) && <MoveProperty>Priority: {move.priority}</MoveProperty>}
                {Boolean(move.basePower) && <MoveProperty>Power: {move.basePower}</MoveProperty>}
                <MoveProperty>Category: {move.category}</MoveProperty>
              </MoveData>
            </HiddenPropertyText>
          </MoveBtn>
        ))}
      </MovesDisplay>
    </>
  );
};
