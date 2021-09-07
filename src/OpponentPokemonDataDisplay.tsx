import { OpponentPokemonDataDisplayProps,Stats, OtherFormatsDisplayProps ,RandbatsPokemonData, RandomBattlePokemonDisplayProps } from "./types";
import "./AppDesign.css";
import styled from "styled-components";
import { Dex } from "@pkmn/dex";
import { DamageDisplay } from "./DamageDisplay";
import { useEffect, useState } from "react";
// STYLED COMPONENTS CSS //
const OuterBox = styled.div`
  width: 550px;
  height: 380px;
  grid-column: 1/4;
  grid-row: 3/4;
  /* border: 5px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InnerBox = styled.div`
  width: 550px;
  height: 380px;
  display: grid;
  grid-template-columns: 1fr 1fr 280px;
  grid-template-rows: repeat(10, auto);
  justify-items: center;
  margin: 5px;
  font-size: 1.2rem;
  /* border: 5px solid black; */
`;
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
const Property = styled.div`
  padding: 5px;
  text-align: center;
  margin: 2px;
  border: 2px solid black;
  font-size: 0.9rem;

  &:hover ${HiddenPropertyText} {
    display: block;
    position: absolute;
    max-width: 250px;
    text-align: start;
    font-size: 1.1rem;
    background: white;
    border: 1px solid black;
  }
`;
const PokemonName = styled.a`
  justify-self: start;
  margin-left: 1rem;
  grid-row: 1/2;
  grid-column: 1/2;
  font-size: 2rem;
  height: fit-content;
  text-align: start;
`;
const NotRevealed = styled.h3`
  text-align: center;
  line-height: 2;
  grid-row: 1/-1;
  grid-column: 1/-1;
`;
const MovesDisplay = styled(PropertyDisplay)`
  grid-row: 1/-1;
  grid-column: 2;
  display: flex;
`;
const AbilitiesDisplay = styled(PropertyDisplay)`
  /* height: fit-content; */
  grid-row: 1;
  grid-column: 1;
`;
const ItemsDisplay = styled(PropertyDisplay)`
  grid-row: 2;
  grid-column: 1;
`;
const PropertiesContainer = styled.div`
  grid-row: 2;
  grid-column: 1/-2;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TypeDisplay = styled.div`
  grid-row: 1/2;
  grid-column: 2;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const Type = styled.div`
  margin: 0 5px;
  padding: 1px 15px;
  border-radius: 20px;

  display: flex;
  align-items: center;
`;

const dexSearchPrepper = (str: string): string => {
  return str.toLowerCase().replace(/\W+/g, "");
};

const { Abilities, Aliases, Items, Moves, Species } = Dex.data;

const RandomBattlePokemonDisplay = ({
  pokemon, isRandomBattle, stats
}: RandomBattlePokemonDisplayProps) => {
  const [randbatsPokemonData, setRandbatsPokemonData] = useState<RandbatsPokemonData>({
    "": {
      level: 0,
      abilities: [],
      items: [],
      moves: [],
    },
  });
  const {abilities,items,moves } = randbatsPokemonData[pokemon]
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
  return (
    <PropertiesContainer>
      <AbilitiesDisplay>
        Abilities:
        {abilities.map((x) => (
          <>
            <Property>
              {x}
              <HiddenPropertyText>
                {Abilities[dexSearchPrepper(x)].shortDesc}
              </HiddenPropertyText>
            </Property>
          </>
        ))}
      </AbilitiesDisplay>
      <ItemsDisplay>
        Items:
        {items.map((x) => (
          <Property>
            {x}
            <HiddenPropertyText>
              {Items[dexSearchPrepper(x)].desc}
            </HiddenPropertyText>
          </Property>
        ))}
      </ItemsDisplay>
      <MovesDisplay>
        Moves:
        {moves.map((x) => (
          <Property>{x}</Property>
        ))}
      </MovesDisplay>
    </PropertiesContainer>
  );
};

 
const OtherFormatsDisplay = ({
  pokemon,
  stats
}: OtherFormatsDisplayProps) => {  
  const abilities = Dex.species.get(pokemon).abilities
  return <> 
  <div>{pokemon}</div>
<div>  {JSON.stringify(stats)}</div>
<div>{JSON.stringify(abilities)}</div> 
</>
};

export const OpponentPokemonDataDisplay = ({
  pokemon,
  isRandomBattle,
}: OpponentPokemonDataDisplayProps) => {
  const [typesArray, setTypesArray] = useState<string[] | null>(null);
  const [stats,setStats] = useState<Stats>({
    hp:  0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0
})
  useEffect(()=> {

    if (pokemon.pokemon1) {
      setStats(Dex.species.get(pokemon.pokemon1).baseStats)
      // console.log('stats',stats);
    }
  },[pokemon.pokemon1])

  useEffect(() => {
    if (pokemon.pokemon1) {
      setTypesArray(
        Species[dexSearchPrepper(pokemon.pokemon1)].types.map((x) =>
          x.toLowerCase()
        )
      );
    }
  }, [pokemon.pokemon1]);
   
    if (pokemon.pokemon1) {    
    return (
      <>
        <OuterBox>
          <InnerBox>
            <PokemonName
              href={`https://www.smogon.com/dex/ss/pokemon/${pokemon.pokemon1}/`}
            >
              {pokemon.pokemon1}
            </PokemonName>

            <TypeDisplay>
              {Species[dexSearchPrepper(pokemon.pokemon1)].types.map((x) => (
                <Type className={x.toLowerCase()}>{x}</Type>
              ))}
            </TypeDisplay>

            <DamageDisplay typesArray={typesArray} />

            {(isRandomBattle) ? (
              <RandomBattlePokemonDisplay
               pokemon={pokemon.pokemon1}
               isRandomBattle={isRandomBattle}
               stats={stats}
              />
            ) : null}
            {(isRandomBattle === false) ? 
            <OtherFormatsDisplay stats={stats} pokemon={pokemon.pokemon1}/> : null }
            </InnerBox>
        </OuterBox>
      </>
    );
  }
  return (
    <OuterBox>
      <InnerBox>
        <NotRevealed>This Pokemon hasn't been revealed yet</NotRevealed>
      </InnerBox>
    </OuterBox>
  );
};
