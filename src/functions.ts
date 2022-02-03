import { isRandomBattleReturn } from "./types";
export const isDevelopmentMode = process.env.NODE_ENV === "development";
const randomDataBattleTypes = [
  "gen8randombattle",
  "gen8randomdoublesbattle",
  "gen8randombattlenodmax",
  "gen7randombattle",
  "gen7randomdoublesbattle",
  "gen7letsgorandombattle",
  "gen6randombattle",
  "gen5randombattle",
  "gen4randombattle",
  "gen3randombattle",
  "gen2randombattle",
  "gen1randombattle",
];

export const getBattleType = (url: string) => {
  const battleType = url.match(/(?<=-).+?(?=-)/g);
  if (!battleType) {
    return "No Battle Type Found";
  }
  return randomDataBattleTypes.includes(battleType[0])
    ? battleType[0]
    : "Not a random battle";
};
export const isRandomBattle = (url: string): isRandomBattleReturn => {
  const battleType = url.match(/(?<=-).+?(?=-)/g);
  if (!battleType) {
    return null;
  }
  return randomDataBattleTypes.includes(battleType[0]) ? battleType[0] : false;
};
export const dexSearchPrepper = (str: string): string => {
  return str.toLowerCase().replace(/\W+/g, "");
};
