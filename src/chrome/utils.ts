const getPokemonName = (arr: Array<string>) => {
  const pokemonArray = arr.map((x) => x.match(/(?<=<strong>)(.*?)(?=<)/));
  return pokemonArray.map((x) => (x ? x[0] : ''));
};
const filteredBattleHistory = (battleHistory: HTMLCollection) => {
  return Array.from(battleHistory).filter((history) => history.classList.length === 1);
};
const getHTML = (arr: Array<Element>) => {
  return arr.map((x) => x.innerHTML);
};
export const getPokemon = (battleHistory: HTMLCollection) => {
  //grabs pokemon names from chat and returns an object of the
  // user and opponents pokemon in the order they came out
  const filteredArray = filteredBattleHistory(battleHistory);
  const filterPokemonObj = {
    opponent: filteredArray.filter((entry) => entry.innerHTML.includes('sent out')),
    user: filteredArray.filter((entry) => entry.innerHTML.includes('Go!')),
  };
  const userHTML = getHTML(filterPokemonObj.user);
  const opponentHTML = getHTML(filterPokemonObj.opponent);
  console.log(opponentHTML);
  return {
    user: getPokemonName(userHTML),
    opponent: getPokemonName(opponentHTML),
  };
};
export const turnCount = (battleLog: Element | null) => {
  //UI dependent, if the ui changes within the battle log
  // and h2 tags are added then this may break

  if (!battleLog) {
    return;
  }
  const turnArray: HTMLCollection = battleLog.getElementsByTagName('h2');
  const turn = turnArray[turnArray.length - 1].innerHTML.slice(5);
  return Number(turn);
};
