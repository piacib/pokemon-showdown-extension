import styled from "styled-components";
import { typeColorConverter } from "../pokemonTypeColorConverter";
import { TypeColorInterface } from "../types";
export const PropertyDisplay = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: row;
  padding-bottom:10px;
  flex-wrap: wrap;
  align-items: center;
`;
const TypeColoredComponent = styled.div<TypeColorInterface>`
  background-color: ${(props) => typeColorConverter[props.background]};
`;
export const HiddenPropertyText = styled.div`
  display: none;
`;
const HoverDisplay = styled.div`
  padding: 5px;
  text-align: center;
  margin: 2px;
  border: 2px solid black;
  font-size: 0.8rem;
  position: relative;
  &:hover ${HiddenPropertyText} {
    display: block;
    position: absolute;
    text-align: start;
    background: white;
    z-index: 2;
    border: 1px solid black;
  }
`;
export const PropertyBtn = styled(HoverDisplay)`
  &:hover ${HiddenPropertyText} {
    top: 30px;
    right: 0;
    max-width: 250px;
    min-width: 150px;
    padding: 5px;
    font-size: inherit;
  }
`;
export const MoveBtn = styled(HoverDisplay)`
  &:hover ${HiddenPropertyText} {
    bottom: 30px;
    right: 0;
    min-width: 170px;
    padding: 5px;
    font-size: 1.1rem;
  }
`;
export const MoveData = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
`;
export const MoveProperty = styled.li`
  /* width: fit-content; */
  white-space: nowrap;
`;
export const MoveDescription = styled(MoveProperty)`
  white-space: initial;
`;

export const AbilitiesDisplay = styled(PropertyDisplay)``;
export const MovesDisplay = styled(PropertyDisplay)`
  display: flex;
`;
export const ItemsDisplay = styled(PropertyDisplay)``;

export const MoveType = styled(MoveProperty)<TypeColorInterface>`
  background-color: ${(props) => typeColorConverter[props.background]};
  padding: 2px 6px;
  width: fit-content;
  margin: 0 auto;
`;

export const PokemonName = styled.a`
  justify-self: start;
  grid-row: 3;
  grid-column: 1/2;
  font-size: 36px;
  height: fit-content;
  text-align: start;
`;
export const PropertiesContainer = styled.div`
  grid-row: 4;
  grid-column: 2/4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const TypeDisplay = styled.div`
  grid-row: 3;
  grid-column: 1;
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-self: end;
  height: 100%;
`;

export const Type = styled(TypeColoredComponent)`
  margin: 0 5px;
  padding: 1px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;
export const StatsDisplay = styled.div`
  grid-row: 2/4;
  grid-column: 2/4;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* border: 3px solid black; */
  flex-wrap: wrap;
  font-size: 1.2em;
  height: 70px;
`;
export const StatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60px;
`;
export const StatName = styled.div``;
export const StatValue = styled.div``;
