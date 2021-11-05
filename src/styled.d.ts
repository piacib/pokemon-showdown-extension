import {TypeName} from '@pkmn/types'
// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
      outerBorder: string;
      secondaryBorderMargin: string;
      backgroundColor: string;
      color: {
        typeColors: {
          [key: string]:string,
          [TypeName]: string;
           }
      }
  }
}