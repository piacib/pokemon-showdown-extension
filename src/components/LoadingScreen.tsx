import React from 'react';
import LoadingSVG from '../media/loading.svg';
import styled from 'styled-components';
const LoadingIcon = styled.img``;
export const LoadingScreen = () => {
  return <LoadingIcon src={LoadingSVG} alt="Loading" />;
};
