import { Dex } from '@pkmn/dex';
import AbilitiesDisplay from '../AbilitiesDisplay/AbilitiesDisplay';

interface OtherFormatsDisplayProps {
  pokemon: string;
}

const OtherFormatsDisplay = ({ pokemon }: OtherFormatsDisplayProps) => {
  const abilities = Object.entries(Dex.species.get(pokemon).abilities).map((x) => x[1]);
  return <AbilitiesDisplay abilities={abilities} />;
};

export default OtherFormatsDisplay;
