import styled from 'styled-components';
import { TypeColorInterface } from '../../types';
import { typeColorConverter } from '../PokemonDataDisplay/pokemonTypeColorConverter';
import {
  HiddenPropertyText,
  HoverDisplay,
  PropertyDisplay,
} from '../PokemonDataDisplay/DataDisplay.styles';

export const MoveBtn = styled(HoverDisplay)`
  &:hover ${HiddenPropertyText} {
    bottom: 30px;
    right: 0;
    min-width: 170px;
    padding: ${(props) => props.theme.padding.medium};
    font-size: 1.1rem;
  }
`;
export const MoveInfo = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
`;
export const MoveProperty = styled.li`
  /* width: fit-content; */
  white-space: nowrap;
`;
export const MoveDescription = styled(MoveProperty)`
  white-space: initial;
`;
export const MovesContainer = styled(PropertyDisplay)`
  display: flex;
`;
export const MoveType = styled(MoveProperty)<TypeColorInterface>`
  background-color: ${(props) => typeColorConverter[props.background]};
  padding: ${(props) => props.theme.padding.small} ${(props) => props.theme.padding.medium};
  width: fit-content;
  margin: 0 auto;
`;
