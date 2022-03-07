import React from 'react';
import { Type, TypeContainer } from './TypessDisplay.style';

interface TypesDisplayProps {
  types: string[];
}
const TypesDisplay: React.FC<TypesDisplayProps> = ({ types }) => {
  return (
    <TypeContainer>
      {types.map((x) => (
        <Type key={x} background={x}>
          {x}
        </Type>
      ))}
    </TypeContainer>
  );
};

export default TypesDisplay;
