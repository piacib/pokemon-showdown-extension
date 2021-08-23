import React from "react";
import { PokemonData } from "./types";
import "./AppDesign.css";
import styled from "styled-components";

const PokemonScreen = styled.div`
  position: relative;
  width: 500px;
  height: 250px;
`;
const OuterBox = styled.div`
  width: 495px;
  height: 245px;
  border: borderLineWidth solid lineColor;
`;
const InnerBox = styled.div`
  width: 495px;
  height: 245px;
`;
export const OpponentPokemonDataDisplay = (
  // pokemonName: string,
  { pokemon }: PokemonData
) =>
  // pokemonName: string
  {
    // const pokemonName = "Wobb";
    console.log(pokemon);
    // if (!pokemon) {
    //   return <div>...</div>;
    // }
    // const keys = Object.keys(pokemon);
    //
    // const values = Object.values(pokemon);
    return (
      <PokemonScreen>
        <OuterBox>
          <div className="upper-line line horizontal-line"></div>
          <div className="lower-line line horizontal-line"></div>
          <InnerBox>
            {/* <div className="inner-box content-container center typewriter"> */}

            {/* <ul>
              {keys.map((key, idx) =>
                key === "evs" || key === "ivs" || key === "level" ? null : (
                  <li>{`${key} :${values[idx]}`}</li>
                )
              )}
              <li>
          <a href={`https://www.smogon.com/dex/sm/pokemon/${pokemonName}/`}>
            Smogon Link
          </a>
        </li>
            </ul> */}
          </InnerBox>

          {/* </div> */}
        </OuterBox>
      </PokemonScreen>
    );
  };
