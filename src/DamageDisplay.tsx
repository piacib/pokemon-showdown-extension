import React, { useEffect, useState } from "react";
import { Dex } from "@pkmn/dex";
import styled from "styled-components";

const DamageContainer = styled.div`
  grid-column: 2/3;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid black;
  height: 100%;
`;
const DamageGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;
const TypeBox = styled.div`
  margin: 5px;
  padding: 2px 5px;
  border-radius: 10px;
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
  const entries0 = Object.entries(damageObj).filter((entry) => entry[1] === 0);
  const entries25 = Object.entries(damageObj).filter(
    (entry) => entry[1] === 0.25
  );
  const entries12 = Object.entries(damageObj).filter(
    (entry) => entry[1] === 0.5
  );
  const entries2 = Object.entries(damageObj).filter((entry) => entry[1] === 2);
  const entries4 = Object.entries(damageObj).filter((entry) => entry[1] === 4);
  const label = ["0", "1/4", "1/2", "2", "4"];
  return (
    <DamageContainer>
      {[entries0, entries25, entries12, entries2, entries4].map(
        (array, idx) => (
          <DamageGroupContainer>
            {array.length ? (
              <>
                x{label[idx]}:
                {array.map((x) => (
                  <TypeBox className={x[0].toLowerCase()}>{x[0]}</TypeBox>
                ))}
              </>
            ) : null}
          </DamageGroupContainer>
        )
      )}
    </DamageContainer>
  );
};
