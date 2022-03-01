import React from 'react';
import LoadingSVG from '../media/pokeball.svg';
import styled, { keyframes } from 'styled-components';
const spinning = keyframes`
    from {
        transform: rotate(359deg);
    }
    to {
        transform: rotate(0deg);
    }
  
  `;
const LoadingIcon = styled.img`
  animation: ${spinning} 4s infinite linear;
  height: 9rem;
  width: 9rem;
  grid-column: -1/ 4;
  margin: auto;
`;
export const LoadingScreen = () => {
  return <LoadingIcon src={LoadingSVG} alt="Loading" />;
};
