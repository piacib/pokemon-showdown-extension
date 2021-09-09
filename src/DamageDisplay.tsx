import React, { useEffect, useState } from "react";
import { Dex } from "@pkmn/dex";
import styled from "styled-components";

const DamageContainer = styled.div`
  grid-row: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 240px;
`;
const DamageGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
`;
const TypeBox = styled.div`
  margin: 5px;
  padding: 2px 5px;
  border-radius: 10px;
`;
const TypeBoxContainer = styled.div`
  height: 100%;
  width: 280px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const DamageMultiplier = styled.p`
  height: 100%;
  vertical-align: middle;
`;
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
  console.log("type", type);
  const damageTaken = Object.entries(Types[type].damageTaken);
  const damageConverted = damageTaken.map((x) => damageAdjustor(x));
  return Object.fromEntries(damageConverted);
};
const damageCalculator = (typesArray: string[]) => {
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
interface DamageDisplayProps {
  typesArray: string[] | null;
}
type DamageObj = {
  Bug: number;
  Dark: number;
  Dragon: number;
  Electric: number;
  Fairy: number;
  Fighting: number;
  Fire: number;
  Flying: number;
  Ghost: number;
  Grass: number;
  Ground: number;
  Ice: number;
  Normal: number;
  Poison: number;
  Psychic: number;
  Rock: number;
  Steel: number;
  Water: number;
};
export const DamageDisplay = (props: DamageDisplayProps) => {
  const [damageObj, setDamageObj] = useState<DamageObj | null>(null);

  useEffect(() => {
    console.log(props.typesArray);
    console.log(props.typesArray);
    if (props.typesArray) {
      setDamageObj(damageCalculator(props.typesArray));
    }
  }, [props.typesArray]);
  if (!damageObj) {
    return <div>Loading...</div>;
  }
  const labels = ["No Effect", "Ineffective", "Super effective"];
  const noEffect = Object.entries(damageObj).filter((entry) => entry[1] === 0);
  const ineffective = Object.entries(damageObj).filter(
    (entry) => entry[1] === 0.25 || entry[1] === 0.5
  );
  const superEffective = Object.entries(damageObj).filter(
    (entry) => entry[1] === 2 || entry[1] === 4
  );
  console.log([noEffect, ineffective, superEffective]);
  return (
    <DamageContainer>
      {[noEffect, ineffective, superEffective].map((array, idx) => (
        <DamageGroupContainer>
          {Boolean(array.length) ? (
            <TypeBoxContainer>
              {labels[idx]}:
              {array.map((x) => (
                <TypeBox className={x[0].toLowerCase()}>
                  x{x[1]} {x[0]}
                </TypeBox>
              ))}
            </TypeBoxContainer>
          ) : null}
        </DamageGroupContainer>
      ))}
    </DamageContainer>
  );
};
