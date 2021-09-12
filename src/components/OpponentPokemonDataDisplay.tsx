import { OpponentPokemonDataDisplayProps, Stats } from "../types";
import { Dex } from "@pkmn/dex";
import { DamageDisplay } from "./DamageDisplay";
import { useEffect, useState } from "react";
import { dexSearchPrepper } from "../functions";
import { RandomBattlePokemonDisplay } from "./RandomBattlePokemonDisplay";
import {
  PropertiesContainer,
  TypeDisplay,
  Type,
  StatsDisplay,
  StatBox,
  StatName,
  StatValue,
  PokemonName,
} from "../styles/DataDisplayStyles";
import { OtherFormatsDisplay } from "./OtherFormatsDisplay";
const {
  // Abilities,
  // Aliases,
  // Moves,
  // Items,
  Species,
} = Dex.data;

export const OpponentPokemonDataDisplay = ({
  pokemon,
  isRandomBattle,
}: OpponentPokemonDataDisplayProps) => {
  const [typesArray, setTypesArray] = useState<string[] | null>(null);
  const [stats, setStats] = useState<Stats>({
    hp: 0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
  });
  useEffect(() => {
    if (Dex.species.get(pokemon).exists) {
      setStats(Dex.species.get(pokemon).baseStats);
      setTypesArray(
        Species[dexSearchPrepper(pokemon)].types.map((x) => x.toLowerCase())
      );
    }
  }, [pokemon]);

  return (
    <>
      <PokemonName href={`https://www.smogon.com/dex/ss/pokemon/${pokemon}/`}>
        {pokemon}
      </PokemonName>

      <TypeDisplay>
        {Species[dexSearchPrepper(pokemon)].types.map((x) => (
          <Type background={x}>{x}</Type>
        ))}
      </TypeDisplay>

      <DamageDisplay typesArray={typesArray} />
      <PropertiesContainer>
        {isRandomBattle ? (
          <RandomBattlePokemonDisplay
            pokemon={pokemon}
            isRandomBattle={isRandomBattle}
          />
        ) : null}
        {isRandomBattle === false ? (
          <OtherFormatsDisplay pokemon={pokemon} />
        ) : null}
      </PropertiesContainer>
      <StatsDisplay>
        {Object.entries(stats).map((x) => (
          <StatBox>
            <StatName>{x[0]}:</StatName>
            <StatValue>{x[1]}</StatValue>
          </StatBox>
        ))}
      </StatsDisplay>
    </>
  );
};
