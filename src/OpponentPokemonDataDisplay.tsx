import React from "react";
import { PokemonData } from "./types";

export const OpponentPokemonDataDisplay = ({ pokemon }: PokemonData) => {
  console.log(pokemon);
  if (!pokemon) {
    return <div>.....</div>;
  }
  const keys = Object.keys(pokemon);

  const values = Object.values(pokemon);
  return (
    <div>
      <ul>
        {keys.map((key, idx) => (
          <li>{`${key} :${values[idx]}`}</li>
        ))}
      </ul>
    </div>
  );
};
