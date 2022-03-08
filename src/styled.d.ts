import { TypeName } from '@pkmn/types';
// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    outerBorderWidth: string;
    outerBorderColor: string;
    outerBorderStyle: string;
    secondaryBorderMargin: string;
    backgroundColor: string;
    padding: {
      medium: string;
      small: string;
      large: string;
    };
    color: {
      typeColors: {
        [key: string]: string;
        [TypeName]: string;
      };
    };
  }
}
