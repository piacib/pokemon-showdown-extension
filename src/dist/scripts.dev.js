"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPokemon = void 0;
var moves = document.getElementsByClassName("battle-history");

var getPokemonName = function getPokemonName(arr) {
  return arr.map(function (x) {
    return x.match(/(?<=<strong>)(.*?)(?=<)/);
  });
};

var getHTML = function getHTML(arr) {
  return arr.map(function (x) {
    return x.innerHTML;
  });
};

var getPokemon = function getPokemon() {
  var filteredArray = Array.from(moves).filter(function (history) {
    return history.classList.length === 1;
  });
  var sentOutFiltered = filteredArray.filter(function (entry) {
    return entry.innerHTML.includes("sent out");
  });
  var goFiltered = filteredArray.filter(function (entry) {
    return entry.innerHTML.includes("Go!");
  });
  var sentOutFilteredHTML = getHTML(sentOutFiltered);
  var goFilteredHTML = getHTML(goFiltered);
  return {
    user: getPokemonName(goFilteredHTML),
    opponent: getPokemonName(sentOutFilteredHTML)
  };
};

exports.getPokemon = getPokemon;