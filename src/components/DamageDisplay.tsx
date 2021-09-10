import React, { useEffect, useState } from "react";
import { Dex } from "@pkmn/dex";
import { DamageDisplayProps, DamageObj } from "../types";
import {
  DamageContainer,
  DamageGroupContainer,
  TypeBox,
  TypeBoxContainer,
} from "../styles/DamageDisplayStyles";

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
