import React, { useEffect, useState } from "react";
import { PokemonData } from "./types";
import "./AppDesign.css";
import styled from "styled-components";

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

export const OpponentPokemonDataDisplay = (
  // pokemonName: string,
  { pokemon }: PokemonData
) =>
  // pokemonName: string
  {
    const [pokemonData, setPokemonData] = useState<PokemonData>({});

    useEffect(() => {
      console.log("fetching");
      fetch("https://pkmn.github.io/randbats/data/gen8randombattle.json")
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setPokemonData(data);
        });
    }, []);
    console.log("OpponentPokemonDataDisplay", pokemonData[pokemon].moves);

    // const keys = Object.keys(pokemonData[pokemon]);
    // const values = Object.values(pokemonData[pokemon]);
    return pokemonData[pokemon] ? (
      <PokemonScreen>
        <OuterBox>
          <InnerBox>
            {/* <div className="inner-box content-container center typewriter"> */}
            {/* <pre>{JSON.stringify(pokemonData[pokemon])}</pre> */}
            <ul>
              <li>{pokemon}</li>
              {Object.keys(pokemonData[pokemon]).map((key, idx) =>
                key === "evs" || key === "ivs" || key === "level" ? null : (
                  <li id={key}>{`${
                    Object.values(pokemonData[pokemon])[idx]
                  }`}</li>
                )
              )}
              <li>
                <a href={`https://www.smogon.com/dex/sm/pokemon/${pokemon}/`}>
                  Smogon Link
                </a>
              </li>
            </ul>
          </InnerBox>

          {/* </div> */}
        </OuterBox>
      </PokemonScreen>
    ) : (
      <div> Noooooooooo</div>
    );
  };
