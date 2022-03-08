import styled from 'styled-components';
import { typeColorConverter } from '../PokemonDataDisplay/pokemonTypeColorConverter';
import { TypeColorInterface } from '../../types';

export const DamageContainer = styled.div`
  grid-row: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.95rem;
`;
export const DamageGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
`;
export const TypeBox = styled.div<TypeColorInterface>`
  background-color: ${(props) => typeColorConverter[props.background]};
  margin: 5px;

  padding: ${(props) => props.theme.padding.small} ${(props) => props.theme.padding.medium};
  border-radius: 10px;
`;
export const TypeBoxContainer = styled.div`
  height: 100%;
  width: 280px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
export const DamageMultiplier = styled.p`
  height: 100%;
  vertical-align: middle;
`;
