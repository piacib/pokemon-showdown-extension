import React from "react";
import styled from "styled-components";
const NotPokemonShowdownErrorScreenContainer = styled.div`
text-align: center;

`
export const NotPokemonShowdownErrorScreen = () => {
  return (
    <NotPokemonShowdownErrorScreenContainer>
      <h1>This Extension only works on </h1>
      <h1>
        <a href="https://play.pokemonshowdown.com/">Pokemon Showdown</a>
      </h1>
    </NotPokemonShowdownErrorScreenContainer>
  );
};
