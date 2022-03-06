import { Dex } from '@pkmn/dex';
import { dexSearchPrepper } from '../../functions';
import { AbilitiesDisplay, HiddenPropertyText, PropertyBtn } from './DataDisplay.styles';

interface OtherFormatsDisplayProps {
  pokemon: string;
}

export const OtherFormatsDisplay = ({ pokemon }: OtherFormatsDisplayProps) => {
  const abilities = Object.entries(Dex.species.get(pokemon).abilities).map((x) => x[1]);
  return (
    <AbilitiesDisplay>
      Abilities:
      {abilities.map((x) => (
        <>
          <PropertyBtn>
            {x}
            <HiddenPropertyText>
              {Dex.data.Abilities[dexSearchPrepper(x)].shortDesc}
            </HiddenPropertyText>
          </PropertyBtn>
        </>
      ))}
    </AbilitiesDisplay>
  );
};
