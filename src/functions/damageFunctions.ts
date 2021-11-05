import { Dex } from "@pkmn/dex";

const Types = Dex.data.Types;
const damageAdjustor = (objectEntries: [string, number]): [string, number] => {
  if (!objectEntries[1]) {
    return [objectEntries[0], 1];
  }
  return [
    objectEntries[0],
    Math.abs((objectEntries[1] - 3) / -objectEntries[1]),
  ];
};

// creates damage obj from arr of entries in type.damageTaken object
const damageCalculatorOneType = (type: string) => {
    const damageTaken = Object.entries(Types[type].damageTaken);
    const damageConverted = damageTaken.map((x) => damageAdjustor(x));
    return Object.fromEntries(damageConverted);
  };
  
export const damageCalculator = (typesArray: string[]) => {
    if (typesArray.length === 1) {
      return damageCalculatorOneType(typesArray[0]);
    }
    const type1 = damageCalculatorOneType(typesArray[0]);
    const type2 = damageCalculatorOneType(typesArray[1]);
    const types = Object.keys(type1);
    const damageObjectEntries = types.map((type) => [
      type,
      type1[type] * type2[type],
    ]);
    return Object.fromEntries(damageObjectEntries);
  };