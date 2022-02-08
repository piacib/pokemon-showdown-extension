import { ActivePokemon } from '../../types';
const activePokemonRegEx = (name: string): string => {
  const nameMatched = name.match(/[^(]+/);
  const activePokemonName = nameMatched ? nameMatched[0] : '';
  return activePokemonName.slice(0, activePokemonName.length - 1);
};
const activePokemonNames = (arr: string[]): string[] => {
  // takes in active pokemon (potentailly 2 for double battles)
  // and returns name with up  sliced off
  return arr.map((x) => activePokemonRegEx(x));
};
export const getCurrentPokemon = (opponentsTeam: string[] | null): ActivePokemon => {
  if (!opponentsTeam) {
    return {
      pokemon1: null,
      pokemon2: null,
    };
  }
  const activePokemon = opponentsTeam.filter((x) => x.includes('active'));
  const activePokemonFilteredName: string[] = activePokemonNames(activePokemon);

  if (activePokemon.length === 1) {
    return {
      pokemon1: activePokemonFilteredName[0],
      pokemon2: null,
    };
  }
  return {
    pokemon1: activePokemonFilteredName[0],
    pokemon2: activePokemonFilteredName[1],
  };
};
export const pokemonNameFilter = (name: string): string => {
  if (name === 'Not revealed') {
    return name;
  }
  const parenthesis = name.match(/\(([^)]+)\)/);

  const activePokemon = name.match(
    // /^([\w-]+)/
    /[^(]+/,
  );
  let activePokemonName = activePokemon ? activePokemon[0] : name;
  if (activePokemonName[activePokemonName.length - 1] === ' ') {
    activePokemonName = activePokemonName.slice(0, activePokemonName.length - 1);
  }
  const regex = new RegExp(`(${activePokemonName}.*){2}`);
  if (parenthesis) {
    if (name.match(regex)) {
      return parenthesis[1];
    }
  }

  return activePokemonName;
};
// converts string to just pokemon name for the button component
//  by pulling out first word
export const getPokemonName = (nameStr: string): ActivePokemon => {
  if (nameStr.includes('Not revealed')) {
    return {
      pokemon1: null,
      pokemon2: null,
    };
  }
  const activePokemonName = pokemonNameFilter(nameStr);
  return {
    pokemon1: activePokemonName,
    pokemon2: null,
  };
};
export const testTeam = [
  'Slowking (fainted)',
  'Type: Null',
  'Stoutland (active)',
  'Lycanroc (Lycanroc-Dusk) (91%)',
  'Scizor (91%)',
  'Not revealed',
  'Aggron',
  'Indeedee-F',
  'Regice',
  'Runerigus',
  'Landorus-Therian',
  'Heatmor',
  'Jirachi',
];
export const testResults = [
  'Slowking',
  'Type: Null',
  'Stoutland',
  'Lycanroc-Dusk',
  'Scizor',
  'Not revealed',
  'Aggron',
  'Indeedee-F',
  'Regice',
  'Runerigus',
  'Landorus-Therian',
  'Heatmor',
  'Jirachi',
];
