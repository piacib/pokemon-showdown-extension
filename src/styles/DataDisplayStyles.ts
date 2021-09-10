import styled from "styled-components";
import { typeColorConverter } from "../pokemonTypeColorConverter";
import { TypeColorInterface } from "../types";
export const PropertyDisplay = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
export const HiddenPropertyText = styled.div`
  display: none;
`;
export const PropertyBtn = styled.div`
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
export const MoveBtn = styled.div`
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
  margin-left: 1rem;
  grid-row: 3;
  grid-column: 1/2;
  font-size: 2rem;
  height: fit-content;
  text-align: start;
`;
export const PropertiesContainer = styled.div`
  grid-row: 4;
  grid-column: 2/4;
  height: 200px;
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
`;
export const Type = styled.div`
  margin: 0 5px;
  padding: 1px 15px;
  border-radius: 20px;

  display: flex;
  align-items: center;
`;
export const StatsDisplay = styled.div`
  grid-row: 2;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: wrap;
  font-size: 1.2em;
  height: 60px;
`;
export const StatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60px;
`;
export const StatName = styled.div``;
export const StatValue = styled.div``;
