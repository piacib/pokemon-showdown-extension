import { PokemonResponse } from '../types';
import { makeRandomTeam } from './testTeam';
export const testDS: PokemonResponse = {
  opponentsTeam: makeRandomTeam(),
  usersTeam: makeRandomTeam(),
};
const addActive = (array: Array<string>) => {
  const idx = Math.round(Math.random() * array.length);
  array[idx - 1] += ' (active)';
  return array;
};
export const refreshTestObj = () => {
  const opponentsTeam = [
    'Tangrowth',
    'Arctovish',
    'Stunfisk',
    'Glalie',
    'Archeops',
    'Silvally-Flying',
  ];
  const usersTeam = [
    'Dragalge',
    'Jirachi',
    'Keldeo-Resolute',
    'Barraskewda',
    'Umbreon',
    'Garchomp',
  ];
  return {
    opponentsTeam: addActive(opponentsTeam),
    user: ['Slowking', 'Heracross', 'Stoutland', 'Amoonguss', 'Stoutland'],
    usersTeam: addActive(usersTeam),
    opponent: [
      'Aggron',
      'Indeedee-F',
      'Regice',
      'Runerigus',
      'Landorus-Therian',
      'Heatmor',
      'Jirachi',
    ],
  };
};
export const alolaTestObj = {
  user: ['Beartic', 'Marowak-Alola', 'Liepard', 'Marowak-Alola', 'Liepard', 'Vileplume'],
  opponent: ['Malamar', 'Rhyperior'],
  opponentsTeam: [
    'Corsola (Corsola-Galar)',
    'Marowak (Marowak-Alola) (active)',
    'Liepard (71.2%)',
    'Vileplume',
    'Not revealed',
    'Not revealed',
  ],
  usersTeam: [
    'Beartic',
    'Marowak (Marowak-Alola) (active)',
    'Liepard (71.2%)',
    'Vileplume',
    'Not revealed',
    'Not revealed',
  ],
};
