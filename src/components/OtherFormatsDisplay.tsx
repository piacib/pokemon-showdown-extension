import { Dex } from "@pkmn/dex";
import { dexSearchPrepper } from "../functions";
import {
  AbilitiesDisplay,
  HiddenPropertyText,
  PropertyBtn,
} from "../styles/DataDisplayStyles";
import { OtherFormatsDisplayProps } from "../types";

export const OtherFormatsDisplay = ({ pokemon }: OtherFormatsDisplayProps) => {
  const abilities = Object.entries(Dex.species.get(pokemon).abilities).map(
    (x) => x[1]
  );
  console.log(
    Object.entries(abilities).map(
      (x) => Dex.data.Abilities[dexSearchPrepper(x[1])].shortDesc
    )
  );

  return (
    <>
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
    </>
  );
};
