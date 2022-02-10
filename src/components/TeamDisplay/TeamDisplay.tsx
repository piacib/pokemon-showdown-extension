import React, { useEffect, useState } from 'react';
import { Button, ButtonDisplay } from './TeamDisplay.style';
import { OpponentPokemonDataDisplay } from '../PokemonDataDisplay/OpponentPokemonDataDisplay';
import { ActivePokemon, TeamProps } from '../../types';
import { OpponentsTeamUnavailable } from '../ErrorScreens/OpponentsTeamUnavailable';
import { PokemonUnavailable } from '../ErrorScreens/PokemonUnavailable';
import SpriteImage from '../SpriteImage';
import { getCurrentPokemon, pokemonNameFilter, getPokemonName } from './TeamDisplay.functions';
//fetches latest pokemon data from auto updating dataset
export const TeamDisplay = ({ team, isRandomBattle }: TeamProps) => {
  const [activePokemon, setActivePokemon] = useState<string | null>(getCurrentPokemon(team));
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [displayedPokemon, setDisplayedPokemon] = useState<string | null>(null);
  useEffect(() => {
    setActivePokemon(getCurrentPokemon(team));
  }, [team]);
  // swaps displayed pokemon between selected and active
  // such that when active is displayed it will automatically
  // chaange if the active pokemon is changed but continues
  // displaying the selected pokemon is user selects a
  // different pokemon
  useEffect(() => {
    if (selectedPokemon === null) {
      if (activePokemon) {
        setDisplayedPokemon(getPokemonName(activePokemon));
      }
    } else if (selectedPokemon === activePokemon) {
      setSelectedPokemon(null);
    } else {
      setDisplayedPokemon(selectedPokemon);
    }
  }, [selectedPokemon, activePokemon]);
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
              setSelectedPokemon(getPokemonName(x));
            }}
          >
            <SpriteImage name={pokemonNameFilter(x)} />
          </Button>
        ))}
      </ButtonDisplay>

      {displayedPokemon ? (
        <OpponentPokemonDataDisplay pokemon={displayedPokemon} isRandomBattle={isRandomBattle} />
      ) : (
        <PokemonUnavailable />
      )}
    </>
  );
};
