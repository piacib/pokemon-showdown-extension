import React, { useEffect, useState } from 'react';
import { Button, ButtonDisplay } from './TeamDisplay.style';
import { OpponentPokemonDataDisplay } from '../PokemonDataDisplay/OpponentPokemonDataDisplay';
import { ActivePokemon, TeamProps } from '../../types';
import { OpponentsTeamUnavailable } from '../ErrorScreens/OpponentsTeamUnavailable';
import { PokemonUnavailable } from '../ErrorScreens/PokemonUnavailable';
import SpriteImage from '../SpriteImage';
import {
  getCurrentPokemon,
  pokemonNameFilter,
  getPokemonName,
  testTeam,
  testResults,
} from './TeamDisplay.functions';
//fetches latest pokemon data from auto updating dataset
export const TeamDisplay = ({ team, isRandomBattle }: TeamProps) => {
  const [currentPokemon, setCurrentPokemon] = useState<ActivePokemon>(getCurrentPokemon(team));
  const testFilter = testTeam.map((x) => pokemonNameFilter(x));
  console.log(testFilter.filter((x, idx) => x !== testResults[idx]));
  useEffect(() => {
    setCurrentPokemon(getCurrentPokemon(team));
  }, [team]);
  return !team ? (
    <>
      <ButtonDisplay>
        <SpriteImage name={pokemonNameFilter('')} />
        <SpriteImage name={pokemonNameFilter('')} />
        <SpriteImage name={pokemonNameFilter('')} />
        <SpriteImage name={pokemonNameFilter('')} />
        <SpriteImage name={pokemonNameFilter('')} />
        <SpriteImage name={pokemonNameFilter('')} />
      </ButtonDisplay>
      <OpponentsTeamUnavailable />
    </>
  ) : (
    <>
      <ButtonDisplay>
        {team.map((x, idx) => (
          <Button
            key={pokemonNameFilter(x) + idx}
            onClick={() => {
              setCurrentPokemon(getPokemonName(x));
            }}
          >
            <SpriteImage name={pokemonNameFilter(x)} />
          </Button>
        ))}
      </ButtonDisplay>

      {currentPokemon.pokemon1 ? (
        <OpponentPokemonDataDisplay
          pokemon={currentPokemon.pokemon1}
          isRandomBattle={isRandomBattle}
        />
      ) : (
        <PokemonUnavailable />
      )}
    </>
  );
};
