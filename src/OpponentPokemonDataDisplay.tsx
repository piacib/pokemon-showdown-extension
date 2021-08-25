import React, { useEffect, useState } from "react";
import { PokemonData } from "./types";
import "./AppDesign.css";
import styled from "styled-components";
import { useAsyncMoveFetch } from "./hooks/useAsyncMoveFetch";

const PokemonScreen = styled.div`
  position: relative;
  width: 415px;
  height: 275px;
`;
const OuterBox = styled.div`
  width: 100%;
  height: 100%;
  border: 5px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InnerBox = styled.div`
  width: 400px;
  height: 260px;
  display: flex;
  border: 5px solid black;
  align-items: center;
  justify-content: center;
`;
const moveFetchPrepper = (move: string) => {
  return move.replace(" ", "-").toLowerCase();
};
const pokeAPIUrlGenerator = (query: string, version = "v2", type = "move") => {
  return `https://pokeapi.co/api/${version}/${type}/${query}`;
};
export const OpponentPokemonDataDisplay = (
  // pokemonName: string,
  { pokemon }: PokemonData,
  pokemonData: PokemonData
) =>
  // pokemonName: string
  {
    const urls = pokemonData[pokemon].moves.map((x: string) =>
      pokeAPIUrlGenerator(moveFetchPrepper(x))
    );
    const [moves, setMoves] = useAsyncMoveFetch(urls);

    console.log("OpponentPokemonDataDisplay", pokemonData[pokemon]);
    // const keys = Object.keys(pokemonData[pokemon]);
    // const values = Object.values(pokemonData[pokemon]);
    return pokemonData[pokemon] ? (
      <PokemonScreen>
        <OuterBox>
          <InnerBox>
            {/* <div className="inner-box content-container center typewriter"> */}
            {/* <pre>{JSON.stringify(pokemonData[pokemon])}</pre> */}
            <ul>
              <li>
                <a href={`https://www.smogon.com/dex/sm/pokemon/${pokemon}/`}>
                  {pokemon}
                </a>
              </li>
              {Object.keys(pokemonData[pokemon]).map((key, idx) =>
                key === "evs" || key === "ivs" || key === "level" ? null : (
                  <li id={key}>{`${
                    Object.values(pokemonData[pokemon])[idx]
                  }`}</li>
                )
              )}
            </ul>
          </InnerBox>

          {/* </div> */}
        </OuterBox>
      </PokemonScreen>
    ) : (
      <div> Noooooooooo</div>
    );
  };
