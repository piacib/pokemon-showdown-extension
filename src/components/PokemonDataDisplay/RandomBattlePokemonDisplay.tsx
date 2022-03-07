import React, { useEffect, useState } from 'react';
import { PokemonData, isRandomBattleReturn } from '../../types';
import { Dex } from '@pkmn/dex';
import { dexSearchPrepper } from '../../functions';
import ItemsDisplay from '../ItemsDisplay/ItemsDisplay';
import MovesDisplay from '../MovesDisplay/MovesDisplay';
import AbilitiesDisplay from '../AbilitiesDisplay/AbilitiesDisplay';
const { Moves } = Dex.data;
type RandbatsPokemonData = {
  [key: string]: {
    level: Number;
    abilities: string[];
    items: string[];
    moves: string[];
  };
};
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
      <AbilitiesDisplay abilities={pokemonData.abilities} />
      <ItemsDisplay items={pokemonData.items} />
      <MovesDisplay moves={movesData} />
    </>
  );
};
