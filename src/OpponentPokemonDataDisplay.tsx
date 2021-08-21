import React from "react";
import { PokemonData } from "./types";

export const OpponentPokemonDataDisplay = (
  pokemonName,
  { pokemon }: PokemonData
) =>
  // pokemonName: string
  {
    // const pokemonName = "Wobb";
    console.log(pokemon);
    if (!pokemon) {
      return <div>.....</div>;
    }
    const keys = Object.keys(pokemon);

    const values = Object.values(pokemon);
    return (
      <div>
        <h3>{pokemonName}</h3>
        <ul>
          {keys.map((key, idx) =>
            key === "evs" || key === "ivs" ? null : (
              <li>{`${key} :${values[idx]}`}</li>
            )
          )}
          {/* <li>
          <a href={`https://www.smogon.com/dex/sm/pokemon/${pokemonName}/`}>
            Smogon Link
          </a>
        </li> */}
        </ul>
      </div>
    );
  };
