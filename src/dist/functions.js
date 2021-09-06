"use strict";
exports.__esModule = true;
exports.getBattleType = exports.isDevelopmentMode = void 0;
exports.isDevelopmentMode = process.env.NODE_ENV === "development";
var pokeDataBattleTypes = [
    "gen8randombattle.json",
    "gen8randomdoublesbattle.json",
    "gen8randombattlenodmax.json",
    "gen7randombattle.json",
    "gen7randomdoublesbattle.json",
    "gen7letsgorandombattle.json",
    "gen6randombattle.json",
    "gen5randombattle.json",
    "gen4randombattle.json",
    "gen3randombattle.json",
    "gen2randombattle.json",
    "gen1randombattle.json",
];
exports.getBattleType = function (url) {
    var battleType = url.match(/(?<=-).+?(?=-)/g);
    return battleType ? battleType[0] : "";
};
