import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  outerBorderWidth: '5px',
  outerBorderColor: 'solid',
  outerBorderStyle: 'black',
  backgroundColor: '#c5bfbf',
  secondaryBorderMargin: '0.25rem',
  padding: {
    medium: '.25rem',
    small: '.1rem',
    large: '.5rem',
  },
  color: {
    typeColors: {
      Normal: 'rgb(168, 167, 120)',
      Ground: 'rgb(224, 192, 104)',
      Rock: 'rgb(163, 140, 33)',
      Bug: 'rgb(114, 159, 62)',
      Ghost: 'rgb(123, 98, 163)',
      Steel: 'rgb(158, 183, 184)',
      Fighting: 'rgb(192, 48, 40)',
      Fire: 'rgb(247, 125, 37)',
      Flying: 'rgb(168, 143, 239)',
      Water: 'rgb(69, 146, 196)',
      Poison: 'rgb(185, 127, 201)',
      Grass: 'rgb(155, 204, 80)',
      Electric: 'rgb(248, 208, 48)',
      Psychic: 'rgb(243, 102, 185)',
      Ice: 'rgb(152, 216, 216)',
      Dragon: 'rgb(112, 56, 248)',
      Dark: 'rgb(112, 88, 72)',
      Fairy: 'rgb(238, 153, 172)',
      '???': 'rgb(117, 117, 117)',
    },
  },
};
export { theme };
