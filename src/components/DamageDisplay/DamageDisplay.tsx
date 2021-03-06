import React, { useEffect, useState } from 'react';
import {
  DamageContainer,
  DamageGroupContainer,
  TypeBox,
  TypeBoxContainer,
} from './DamageDisplay.styles';
import { damageCalculator } from '../../functions/damageFunctions';
import { LoadingScreen } from '../LoadingScreen';

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

interface EffectivnessProps {
  damage: '0' | '1/4' | '1/2' | '2' | '4';
  effectivenessArray: [string, number][];
}
const EffectivnessDisplay: React.FC<EffectivnessProps> = ({ damage, effectivenessArray }) => {
  return (
    <DamageGroupContainer>
      {effectivenessArray.length ? (
        <>
          <TypeBoxContainer>
            x{damage}:
            {effectivenessArray.map((x) => (
              <TypeBox key={x[0]} background={x[0]}>
                {x[0]}
              </TypeBox>
            ))}
          </TypeBoxContainer>
        </>
      ) : null}
    </DamageGroupContainer>
  );
};
interface DamageDisplayProps {
  typesArray: string[] | null;
}
const DamageDisplay: React.FC<DamageDisplayProps> = ({ typesArray }) => {
  const [damageObj, setDamageObj] = useState<DamageObj | null>(null);
  useEffect(() => {
    if (typesArray) {
      setDamageObj(damageCalculator(typesArray));
    }
  }, [typesArray]);
  if (!damageObj) {
    return (
      <DamageContainer>
        <LoadingScreen />;
      </DamageContainer>
    );
  }
  const noEffect = Object.entries(damageObj).filter((entry) => entry[1] === 0);
  const ineffective = Object.entries(damageObj).filter((entry) => entry[1] === 0.5);
  const superEffective = Object.entries(damageObj).filter((entry) => entry[1] === 2);
  const veryIneffective = Object.entries(damageObj).filter((entry) => entry[1] === 0.25);
  const superDuperEffective = Object.entries(damageObj).filter((entry) => entry[1] === 4);
  return (
    <DamageContainer>
      <EffectivnessDisplay damage={'0'} effectivenessArray={noEffect} />
      <EffectivnessDisplay damage={'1/4'} effectivenessArray={veryIneffective} />
      <EffectivnessDisplay damage={'1/2'} effectivenessArray={ineffective} />
      <EffectivnessDisplay damage={'2'} effectivenessArray={superEffective} />
      <EffectivnessDisplay damage={'4'} effectivenessArray={superDuperEffective} />
    </DamageContainer>
  );
};

export default DamageDisplay;
