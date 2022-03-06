import React from 'react';
import { ItemsContainer } from './Items.style';
import { PropertyBtn, HiddenPropertyText } from '../PokemonDataDisplay/DataDisplay.styles';
import { Dex } from '@pkmn/dex';
import { dexSearchPrepper } from '../../functions';

const Items = Dex.data.Items;
interface ItemsDisplayProps {
  items: string[];
}
const ItemsDisplay: React.FC<ItemsDisplayProps> = ({ items }) => {
  return (
    <ItemsContainer>
      Items:
      {items.map((item) => (
        <PropertyBtn key={item}>
          {item}
          <HiddenPropertyText>{Items[dexSearchPrepper(item)].desc}</HiddenPropertyText>
        </PropertyBtn>
      ))}
    </ItemsContainer>
  );
};

export default ItemsDisplay;
