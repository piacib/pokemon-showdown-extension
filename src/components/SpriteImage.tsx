import React from "react";
import { Name } from '../types';
import pokeball from "../media/pokeball.svg";
import { Sprites } from "@pkmn/img";

const SpriteImage: React.FC<Name> = ({ name }) => {
    const ButtonSize = 40;
    const ButtonSizePX = `${ButtonSize}px`;
    if (name === "Not revealed") {
      return (
        <img
          src={pokeball}
          alt={name}
          style={{
            width: ButtonSizePX,
            height: ButtonSizePX,
          }}
        ></img>
      );
    }
    const { url, w, h } = Sprites.getPokemon(name.toLowerCase(), {
      gen: 7,
      shiny: false,
    });
  
    if (url === "https://play.pokemonshowdown.com/sprites/gen5/0.png") {
      return (
        <img
          src={url}
          alt={"question mark"}
          style={{
            width: ButtonSizePX,
            height: ButtonSizePX,
          }}
        ></img>
      );
    }
    const width = `${(w / h) * ButtonSize}px`;
    return (
      <img
        src={url}
        alt={name}
        style={{ width: width, height: ButtonSizePX, maxWidth: "50px" }}
      ></img>
    );
  };
export default SpriteImage;