import React from 'react';
import pokeball from '../media/pokeball.svg';
import { Sprites } from '@pkmn/img';
interface SpriteImageProps {
  name: string;
  buttonSize?: number;
  maxButtonWidth?: number;
}
const SpriteImage: React.FC<SpriteImageProps> = ({
  name,
  buttonSize = 40,
  maxButtonWidth = 50,
}) => {
  const ButtonSizePX = `${buttonSize}px`;
  if (name === 'Not revealed') {
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

  if (url === 'https://play.pokemonshowdown.com/sprites/gen5/0.png') {
    return (
      <img
        src={url}
        alt={'question mark'}
        style={{
          width: ButtonSizePX,
          height: ButtonSizePX,
        }}
      ></img>
    );
  }
  const width = `${(w / h) * buttonSize}px`;
  return (
    <img
      src={url}
      alt={name}
      style={{ width: width, height: ButtonSizePX, maxWidth: `${maxButtonWidth}px` }}
    ></img>
  );
};
export default SpriteImage;
