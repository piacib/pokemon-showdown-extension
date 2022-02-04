import React, { useEffect, useState } from "react";
import { DamageDisplayProps, DamageObj } from "../../types";
import {
  DamageContainer,
  DamageGroupContainer,
  TypeBox,
  TypeBoxContainer,
} from "../../styles/DamageDisplayStyles";
import { damageCalculator } from "../../functions/damageFunctions";
import { LoadingScreen } from "../LoadingScreen";

const labels = ["No Effect", "Ineffective", "Super effective"];
export const DamageDisplay: React.FC<DamageDisplayProps> = (props) => {
  const [damageObj, setDamageObj] = useState<DamageObj | null>(null);

  useEffect(() => {
    if (props.typesArray) {
      setDamageObj(damageCalculator(props.typesArray));
    }
  }, [props.typesArray]);
  if (!damageObj) {
    return (
      <DamageContainer>
        <LoadingScreen />;
      </DamageContainer>
    );
  }
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
                <TypeBox background={x[0]}>
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
