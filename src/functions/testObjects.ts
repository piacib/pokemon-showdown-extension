import { makeRandomTeam } from './testTeam';
export const testDS = {
  opponentsTeam: makeRandomTeam(),
  user: ['Slowking', 'Heracross', 'Stoutland', 'Amoonguss', 'Stoutland'],
  usersTeam: makeRandomTeam(),
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
