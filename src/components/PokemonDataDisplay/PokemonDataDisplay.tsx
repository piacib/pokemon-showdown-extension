import React, { useEffect, useState } from 'react';
import { isRandomBattleReturn } from '../../types';
import { dexSearchPrepper } from '../../functions';
import { RandomBattlePokemonDisplay } from './RandomBattlePokemonDisplay';
import { PropertiesContainer, PokemonName } from './DataDisplay.styles';
import DamageDisplay from '../DamageDisplay/DamageDisplay';
import TypeDisplay from '../TypesDisplay/TypesDisplay';
import StatsDisplay from '../StatsDisplay/StatsDisplay';
import OtherFormatsDisplay from './OtherFormatsDisplay';
import { Dex } from '@pkmn/dex';
const { Species } = Dex.data;

interface PokemonDataDisplayProps {
  pokemon: string;
  isRandomBattle: isRandomBattleReturn;
}
export const PokemonDataDisplay = ({ pokemon, isRandomBattle }: PokemonDataDisplayProps) => {
  const [typesArray, setTypesArray] = useState<string[] | null>(null);

  useEffect(() => {
    if (Dex.species.get(pokemon).exists) {
      setTypesArray(Species[dexSearchPrepper(pokemon)].types.map((x) => x.toLowerCase()));
    }
  }, [pokemon]);
  const regExPokemonName = pokemon.match(/^([\w]+)-/);
  return (
    <>
      <PokemonName href={`https://www.smogon.com/dex/ss/pokemon/${pokemon}/`}>
        {regExPokemonName ? regExPokemonName[1] : pokemon}
      </PokemonName>
      <TypeDisplay types={Species[dexSearchPrepper(pokemon)].types} />
      <DamageDisplay typesArray={typesArray} />
      <PropertiesContainer>
        {isRandomBattle ? (
          <RandomBattlePokemonDisplay pokemon={pokemon} isRandomBattle={isRandomBattle} />
        ) : null}
        {isRandomBattle === false ? <OtherFormatsDisplay pokemon={pokemon} /> : null}
      </PropertiesContainer>
      <StatsDisplay pokemon={pokemon} />
    </>
  );
};
