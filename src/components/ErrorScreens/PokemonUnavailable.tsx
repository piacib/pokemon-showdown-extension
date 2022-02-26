import React from 'react';
import styled from 'styled-components';
const PokemonUnavailableContainer = styled.div`
  grid-row: 3 / end;
`;
export const PokemonUnavailable = () => {
  return <PokemonUnavailableContainer>Pokemon Unavailable</PokemonUnavailableContainer>;
};
