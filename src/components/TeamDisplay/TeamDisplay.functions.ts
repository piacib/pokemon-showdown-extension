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

export const getPokemonName = (nameStr: string): null | string => {
  if (nameStr.includes('Not revealed')) {
    return null;
  }
  const activePokemonName = pokemonNameFilter(nameStr);
  return activePokemonName;
};
export const getCurrentPokemon = (opponentsTeam: string[] | null): null | string => {
  if (!opponentsTeam || !opponentsTeam.length) {
    return null;
  }
  const activePokemon = opponentsTeam.filter((x) => x.includes('active'));
  if (!activePokemon.length) {
    return null;
  }
  const activePokemonFilteredName = getPokemonName(activePokemon[0]);
  return activePokemonFilteredName;
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
