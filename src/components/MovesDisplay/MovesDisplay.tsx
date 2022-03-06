import React from 'react';
import {
  MoveBtn,
  MoveInfo,
  MoveType,
  MoveDescription,
  MoveProperty,
  MovesContainer,
} from './MovesDisplay.style';
import { HiddenPropertyText } from '../PokemonDataDisplay/DataDisplay.styles';
import { MoveData } from '@pkmn/dex-types';

interface MovesDisplayProps {
  moves: MoveData[];
}
const MovesDisplay: React.FC<MovesDisplayProps> = ({ moves }) => {
  return (
    <MovesContainer>
      Moves:
      {moves.map((move) => (
        <MoveBtn key={move.name}>
          {move.name}
          <HiddenPropertyText>
            <MoveInfo>
              <MoveDescription>{move.shortDesc}</MoveDescription>
              <MoveType background={move.type}>{move.type}</MoveType>
              {typeof move.accuracy === 'number' && (
                <MoveProperty>Accuracy: {move.accuracy}%</MoveProperty>
              )}
              {Boolean(move.priority) && <MoveProperty>Priority: {move.priority}</MoveProperty>}
              {Boolean(move.basePower) && <MoveProperty>Power: {move.basePower}</MoveProperty>}
              <MoveProperty>Category: {move.category}</MoveProperty>
            </MoveInfo>
          </HiddenPropertyText>
        </MoveBtn>
      ))}
    </MovesContainer>
  );
};
export default MovesDisplay;
