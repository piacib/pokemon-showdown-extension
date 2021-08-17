const moves = document.getElementsByClassName("battle-history");
const getPokemonName = (arr) => {
  return arr.map((x) => x.match(/(?<=<strong>)(.*?)(?=<)/));
};
const getHTML = (arr) => {
  return arr.map((x) => x.innerHTML);
};
export const getPokemon = () => {
  let filteredArray = Array.from(moves).filter(
    (history) => history.classList.length === 1
  );
  let sentOutFiltered = filteredArray.filter((entry) =>
    entry.innerHTML.includes("sent out")
  );
  let goFiltered = filteredArray.filter((entry) =>
    entry.innerHTML.includes("Go!")
  );
  let sentOutFilteredHTML = getHTML(sentOutFiltered);
  let goFilteredHTML = getHTML(goFiltered);
  return {
    user: getPokemonName(goFilteredHTML),
    opponent: getPokemonName(sentOutFilteredHTML),
  };
};
