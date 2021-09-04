"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.OpponentPokemonDataDisplay = void 0;
require("./AppDesign.css");
var styled_components_1 = require("styled-components");
var dex_1 = require("@pkmn/dex");
var OuterBox = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  grid-column: 1/4;\n  grid-row: 3/4;\n  border: 5px solid black;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  width: 100%;\n  grid-column: 1/4;\n  grid-row: 3/4;\n  border: 5px solid black;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var InnerBox = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 550px;\n  height: 240px;\n  display: grid;\n  font-size: 1.3rem;\n  border: 5px solid black;\n  align-items: center;\n  justify-content: center;\n"], ["\n  width: 550px;\n  height: 240px;\n  display: grid;\n  font-size: 1.3rem;\n  border: 5px solid black;\n  align-items: center;\n  justify-content: center;\n"])));
var Move = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 5px;\n"], ["\n  padding: 5px;\n"])));
var Ability = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var Item = styled_components_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""])));
var Type = styled_components_1["default"].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: fit-content;\n  padding: 5px;\n  margin: 0.5em;\n  border-radius: 20px;\n"], ["\n  width: fit-content;\n  padding: 5px;\n  margin: 0.5em;\n  border-radius: 20px;\n"])));
var MoveDisplay = styled_components_1["default"].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  /* width: 100%; */\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n"], ["\n  /* width: 100%; */\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n"])));
var ItemsDisplay = styled_components_1["default"].div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  grid-template-columns: 1fr 1fr;\n  display: grid;\n  width: 100%;\n"], ["\n  grid-template-columns: 1fr 1fr;\n  display: grid;\n  width: 100%;\n"])));
var AbilitiesDisplay = styled_components_1["default"].div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  width: 100%;\n"], ["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  width: 100%;\n"])));
var NotRevealed = styled_components_1["default"].h3(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  text-align: center;\n  line-height: 2;\n"], ["\n  text-align: center;\n  line-height: 2;\n"])));
var dexSearchPrepper = function (str) {
    return str.toLowerCase().replace(/\W+/g, "");
};
// const moveFetchPrepper = (move: string) => {
//   return move.replace(" ", "-").toLowerCase();
// };
var _a = dex_1.Dex.data, Abilities = _a.Abilities, 
// Aliases,
// Conditions,
// Items,
// Moves,
Species = _a.Species, 
// Natures,
Types = _a.Types;
var damageAdjustor = function (objectEntries) {
    if (!objectEntries[1]) {
        return [objectEntries[0], 1];
    }
    return [objectEntries[0], (objectEntries[1] - 3) / -objectEntries[1]];
};
// creates damage obj from arr of entries in type.damageTaken object
var damageCalculatorOneType = function (type) {
    var damageTaken = Object.entries(Types[type].damageTaken);
    var damageConverted = damageTaken.map(function (x) { return damageAdjustor(x); });
    return Object.fromEntries(damageConverted);
};
exports.OpponentPokemonDataDisplay = function (props) {
    var pokemon = props.pokemon;
    var pokemonData = props.pokemonData;
    console.log(Types);
    if (pokemonData && pokemon.pokemon1 && pokemonData[pokemon.pokemon1]) {
        var typesArray = Species[dexSearchPrepper(pokemon.pokemon1)].types.map(function (x) { return x.toLowerCase(); });
        console.log(typesArray.length);
        var _a = pokemonData[pokemon.pokemon1], abilities = _a.abilities, items = _a.items, moves = _a.moves;
        return (React.createElement(React.Fragment, null,
            React.createElement(OuterBox, null,
                React.createElement(InnerBox, null,
                    React.createElement("div", null,
                        React.createElement("a", { href: "https://www.smogon.com/dex/ss/pokemon/" + pokemon.pokemon1 + "/" }, pokemon.pokemon1),
                        React.createElement("div", null, Species[dexSearchPrepper(pokemon.pokemon1)].types.map(function (x) { return (React.createElement(Type, { className: x.toLowerCase() }, x)); }))),
                    React.createElement(AbilitiesDisplay, null, abilities.map(function (x) { return (React.createElement(React.Fragment, null,
                        React.createElement(Ability, null, x))); })),
                    React.createElement(ItemsDisplay, null, items.map(function (x) { return (React.createElement(Item, null, x)); })),
                    React.createElement(MoveDisplay, null, pokemonData[pokemon.pokemon1].moves.map(function (x) { return (React.createElement(Move, null, x)); }))))));
    }
    return (React.createElement(OuterBox, null,
        React.createElement(InnerBox, null,
            React.createElement(NotRevealed, null, "This Pokemon hasn't been revealed yet"))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
