import {
  OpponentPokemonDataDisplayProps,
  Stats,
  OtherFormatsDisplayProps,
  RandbatsPokemonData,
  RandomBattlePokemonDisplayProps,
  TypeColorObjType,
  TypeColorInterface,
} from "./types";
import "./AppDesign.css";
import styled from "styled-components";
import { Dex } from "@pkmn/dex";
import { DamageDisplay } from "./DamageDisplay";
import { useEffect, useState } from "react";
import { typeColorConverter } from "./pokemonTypeColorConverter";
// STYLED COMPONENTS CSS //

const PropertyDisplay = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const HiddenPropertyText = styled.div`
  display: none;
`;
const PropertyBtn = styled.div`
  padding: 5px;
  text-align: center;
  margin: 2px;
  border: 2px solid black;
  font-size: 0.9rem;
  position: relative;

  &:hover ${HiddenPropertyText} {
    display: block;
    position: absolute;
    top: 30px;
    right: 0;
    max-width: 250px;
    min-width: 150px;
    padding: 5px;
    text-align: start;
    font-size: 1.1rem;
    background: white;
    z-index: 2;
    border: 1px solid black;
  }
`;
const MoveData = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
`;
const MoveProperty = styled.li`
  /* width: fit-content; */
  white-space: nowrap;
`;
const MoveDescription = styled(MoveProperty)`
  white-space: initial;
`;
const MoveBtn = styled.div`
  padding: 5px;
  text-align: center;
  margin: 2px;
  border: 2px solid black;
  font-size: 0.9rem;
  position: relative;

  &:hover ${HiddenPropertyText} {
    display: block;
    position: absolute;
    bottom: 30px;
    right: 0;
    /* max-width: 250px; */
    min-width: 170px;
    padding: 5px;
    text-align: start;
    font-size: 1.1rem;
    background: white;
    z-index: 2;
    border: 1px solid black;
  }
`;
const PokemonName = styled.a`
  justify-self: start;
  margin-left: 1rem;
  grid-row: 3;
  grid-column: 1/2;
  font-size: 2rem;
  height: fit-content;
  text-align: start;
`;
const NotRevealed = styled.h3`
  text-align: center;
  line-height: 2;
  /* grid-row: 1/-1; */
  /* grid-column: 1/-1; */
`;
const MovesDisplay = styled(PropertyDisplay)`
  /* grid-row: 1/-1; */
  /* grid-column: 2; */
  display: flex;
`;
const AbilitiesDisplay = styled(PropertyDisplay)`
  /* height: fit-content; */
  /* grid-row: 1; */
  /* grid-column: 1; */
`;
const ItemsDisplay = styled(PropertyDisplay)`
  /* grid-row: 2; */
  /* grid-column: 1; */
`;
const PropertiesContainer = styled.div`
  grid-row: 4;
  grid-column: 2/4;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TypeDisplay = styled.div`
  grid-row: 3;
  grid-column: 1;
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-self: end;
`;
const Type = styled.div`
  margin: 0 5px;
  padding: 1px 15px;
  border-radius: 20px;

  display: flex;
  align-items: center;
`;
const StatsDisplay = styled.div`
  /* border: 1px solid black; */
  grid-row: 2;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: wrap;
  font-size: 1.2em;
  height: 60px;
  /* width: 150px; */
  /* position: absolute;
  top: 60px;
  left: 345px; */
`;
const StatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60px;
`;
const StatName = styled.div``;
const StatValue = styled.div``;

const MoveType = styled(MoveProperty)<TypeColorInterface>`
  background-color: ${(props) => typeColorConverter[props.background]};
  padding: 2px 6px;
  width: fit-content;
  margin: 0 auto;
`;
const dexSearchPrepper = (str: string): string => {
  return str.toLowerCase().replace(/\W+/g, "");
};

const {
  Abilities,
  // Aliases,
  Moves,
  Items,
  Species,
} = Dex.data;

const RandomBattlePokemonDisplay = ({
  pokemon,
  isRandomBattle,
}: RandomBattlePokemonDisplayProps) => {
  const [randbatsPokemonData, setRandbatsPokemonData] =
    useState<RandbatsPokemonData>({
      "": {
        level: 0,
        abilities: [],
        items: [],
        moves: [],
      },
    });

  useEffect(() => {
    console.log("isRandomBattle fetching");
    async function asyncFetchRandomPokemonData() {
      const fetchData = await fetch(
        `https://pkmn.github.io/randbats/data/${isRandomBattle}.json`
      );
      const response = await fetchData.json();
      setRandbatsPokemonData(response);
      await console.log("pokemonData", randbatsPokemonData);
    }

    asyncFetchRandomPokemonData();
  }, [isRandomBattle]);
  if (randbatsPokemonData[pokemon]) {
    const { abilities, items, moves } = randbatsPokemonData[pokemon];
    const movesData = moves.map((move) => Moves[dexSearchPrepper(move)]);
    console.log(movesData);
    return (
      <>
        <AbilitiesDisplay>
          Abilities:
          {abilities.map((x) => (
            <>
              <PropertyBtn>
                {x}
                <HiddenPropertyText>
                  {Abilities[dexSearchPrepper(x)].shortDesc}
                </HiddenPropertyText>
              </PropertyBtn>
            </>
          ))}
        </AbilitiesDisplay>
        <ItemsDisplay>
          Items:
          {items.map((x) => (
            <PropertyBtn>
              {x}
              <HiddenPropertyText>
                {Items[dexSearchPrepper(x)].desc}
              </HiddenPropertyText>
            </PropertyBtn>
          ))}
        </ItemsDisplay>
        <MovesDisplay>
          Moves:
          {movesData.map((move) => (
            <MoveBtn>
              {move.name}
              <HiddenPropertyText>
                <MoveData>
                  <MoveDescription>{move.shortDesc}</MoveDescription>
                  <MoveType background={move.type}>{move.type}</MoveType>
                  {typeof move.accuracy === "number" ? (
                    <MoveProperty>Accuracy: {move.accuracy}%</MoveProperty>
                  ) : null}
                  {move.priority ? (
                    <MoveProperty>Priority: {move.priority}</MoveProperty>
                  ) : null}
                  {move.basePower ? (
                    <MoveProperty>Power: {move.basePower}</MoveProperty>
                  ) : null}
                  <MoveProperty>{move.category}</MoveProperty>
                </MoveData>
              </HiddenPropertyText>
            </MoveBtn>
          ))}
        </MovesDisplay>
      </>
    );
  }
  return <div>loading</div>;
};

const OtherFormatsDisplay = ({ pokemon }: OtherFormatsDisplayProps) => {
  const abilities = Object.entries(Dex.species.get(pokemon).abilities).map(
    (x) => x[1]
  );
  console.log(
    Object.entries(abilities).map(
      (x) => Abilities[dexSearchPrepper(x[1])].shortDesc
    )
  );

  return (
    <>
      <AbilitiesDisplay>
        Abilities:
        {abilities.map((x) => (
          <>
            <PropertyBtn>
              {x}
              <HiddenPropertyText>
                {Abilities[dexSearchPrepper(x)].shortDesc}
              </HiddenPropertyText>
            </PropertyBtn>
          </>
        ))}
      </AbilitiesDisplay>
    </>
  );
};
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
  console.log(Dex.species.get("add"));
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
          <Type className={x.toLowerCase()}>{x}</Type>
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
